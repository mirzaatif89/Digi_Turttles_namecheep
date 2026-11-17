import type { Pool, RowDataPacket } from "mysql2/promise";
import type { AdminRole, PermissionOverrides } from "../permissions";

export type AdminUserRow = RowDataPacket & {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: AdminRole;
  is_active: number;
  permissions: PermissionOverrides | string | null;
  last_login_at: Date | null;
  created_at: Date;
};

export async function findAdminByEmail(db: Pool, email: string): Promise<AdminUserRow | null> {
  const [rows] = await db.query<AdminUserRow[]>(
    "SELECT * FROM admin_users WHERE email = ? LIMIT 1",
    [email],
  );
  return rows[0] ?? null;
}

export async function findActiveAdminById(db: Pool, id: string): Promise<AdminUserRow | null> {
  const [rows] = await db.query<AdminUserRow[]>(
    "SELECT * FROM admin_users WHERE id = ? AND is_active = 1 LIMIT 1",
    [id],
  );
  return rows[0] ?? null;
}

const ENV_ADMIN_EMAIL_STATE_KEY = "environment_super_admin_email";
const ENV_ADMIN_PASSWORD_STATE_KEY = "environment_super_admin_password";

type EnvironmentAdminState = {
  email: string | null;
  passwordHash: string | null;
};

async function environmentAdminState(db: Pool): Promise<EnvironmentAdminState> {
  const [states] = await db.query<(RowDataPacket & { state_key: string; state_value: string })[]>(
    "SELECT state_key, state_value FROM admin_bootstrap_state WHERE state_key IN (?, ?)",
    [ENV_ADMIN_EMAIL_STATE_KEY, ENV_ADMIN_PASSWORD_STATE_KEY],
  );
  return {
    email:
      states.find((state) => state.state_key === ENV_ADMIN_EMAIL_STATE_KEY)?.state_value ?? null,
    passwordHash:
      states.find((state) => state.state_key === ENV_ADMIN_PASSWORD_STATE_KEY)?.state_value ?? null,
  };
}

export async function needsEnvironmentAdminCredentialSync(
  db: Pool,
  email: string,
  password: string,
): Promise<boolean> {
  const state = await environmentAdminState(db);
  if (state.email !== email || !state.passwordHash) return true;
  const bcrypt = await import("bcryptjs");
  if (!(await bcrypt.compare(password, state.passwordHash))) return true;
  return (await findAdminByEmail(db, email)) === null;
}

export async function ensureEnvironmentSuperAdmin(
  db: Pool,
  admin: {
    id: string;
    name: string;
    email: string;
    passwordHash: string | null;
    credentialsChanged: boolean;
  },
): Promise<void> {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(
      "INSERT IGNORE INTO admin_bootstrap_state (state_key, state_value) VALUES (?, ''), (?, '')",
      [ENV_ADMIN_EMAIL_STATE_KEY, ENV_ADMIN_PASSWORD_STATE_KEY],
    );
    const [states] = await connection.query<
      (RowDataPacket & { state_key: string; state_value: string })[]
    >(
      "SELECT state_key, state_value FROM admin_bootstrap_state WHERE state_key IN (?, ?) FOR UPDATE",
      [ENV_ADMIN_EMAIL_STATE_KEY, ENV_ADMIN_PASSWORD_STATE_KEY],
    );
    const lockedKeys = new Set(states.map((state) => state.state_key));
    if (
      !lockedKeys.has(ENV_ADMIN_EMAIL_STATE_KEY) ||
      !lockedKeys.has(ENV_ADMIN_PASSWORD_STATE_KEY)
    ) {
      throw new Error("Could not lock the environment super-admin state.");
    }
    const [users] = await connection.query<(RowDataPacket & { id: string })[]>(
      "SELECT id FROM admin_users WHERE email = ? LIMIT 1 FOR UPDATE",
      [admin.email],
    );
    const current = users[0];

    if (current) {
      if (admin.credentialsChanged) {
        if (!admin.passwordHash)
          throw new Error("The .env super-admin password must be synchronized before promotion.");
        await connection.query(
          "UPDATE admin_users SET name = ?, password_hash = ?, role = 'super_admin', is_active = 1, permissions = NULL WHERE id = ?",
          [admin.name, admin.passwordHash, current.id],
        );
        await connection.query("DELETE FROM admin_sessions WHERE admin_id = ?", [current.id]);
      } else {
        await connection.query(
          "UPDATE admin_users SET name = ?, role = 'super_admin', is_active = 1, permissions = NULL WHERE id = ?",
          [admin.name, current.id],
        );
      }
    } else {
      if (!admin.passwordHash)
        throw new Error("The .env super-admin account is missing and cannot be recreated.");
      await connection.query(
        "INSERT INTO admin_users (id, name, email, password_hash, role, is_active, permissions) VALUES (?, ?, ?, ?, 'super_admin', 1, NULL)",
        [admin.id, admin.name, admin.email, admin.passwordHash],
      );
    }

    if (admin.credentialsChanged) {
      await connection.query(
        "UPDATE admin_bootstrap_state SET state_value = ? WHERE state_key = ?",
        [admin.email, ENV_ADMIN_EMAIL_STATE_KEY],
      );
      await connection.query(
        "UPDATE admin_bootstrap_state SET state_value = ? WHERE state_key = ?",
        [admin.passwordHash, ENV_ADMIN_PASSWORD_STATE_KEY],
      );
      // An environment credential rotation is an explicit owner recovery action.
      // Remove old failed attempts so the newly configured password can be used immediately.
      await connection.query(
        "DELETE FROM admin_login_events WHERE email = ? AND was_successful = 0",
        [admin.email],
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function updateLastLogin(db: Pool, id: string): Promise<void> {
  await db.query("UPDATE admin_users SET last_login_at = NOW() WHERE id = ?", [id]);
}

/** Use this before a future user-deactivation/deletion mutation. */
export async function assertAnotherActiveSuperAdmin(
  db: Pool,
  excludingAdminId: string,
): Promise<boolean> {
  const [rows] = await db.query<(RowDataPacket & { count: number })[]>(
    "SELECT COUNT(*) AS count FROM admin_users WHERE role = 'super_admin' AND is_active = 1 AND id <> ?",
    [excludingAdminId],
  );
  return Number(rows[0]?.count ?? 0) > 0;
}
