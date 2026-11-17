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

const ENV_ADMIN_STATE_KEY = "environment_super_admin_email";

export async function needsEnvironmentAdminPasswordSync(db: Pool, email: string): Promise<boolean> {
  const [states] = await db.query<(RowDataPacket & { state_value: string })[]>(
    "SELECT state_value FROM admin_bootstrap_state WHERE state_key = ? LIMIT 1",
    [ENV_ADMIN_STATE_KEY],
  );
  if (states[0]?.state_value !== email) return true;
  return (await findAdminByEmail(db, email)) === null;
}

export async function ensureEnvironmentSuperAdmin(
  db: Pool,
  admin: { id: string; name: string; email: string; passwordHash: string | null },
): Promise<void> {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(
      "INSERT IGNORE INTO admin_bootstrap_state (state_key, state_value) VALUES (?, '')",
      [ENV_ADMIN_STATE_KEY],
    );
    const [states] = await connection.query<(RowDataPacket & { state_value: string })[]>(
      "SELECT state_value FROM admin_bootstrap_state WHERE state_key = ? FOR UPDATE",
      [ENV_ADMIN_STATE_KEY],
    );
    const firstSync = states[0]?.state_value !== admin.email;
    const [users] = await connection.query<(RowDataPacket & { id: string })[]>(
      "SELECT id FROM admin_users WHERE email = ? LIMIT 1 FOR UPDATE",
      [admin.email],
    );
    const current = users[0];

    if (current) {
      if (firstSync) {
        if (!admin.passwordHash)
          throw new Error("The .env super-admin password must be synchronized before promotion.");
        await connection.query(
          "UPDATE admin_users SET name = ?, password_hash = ?, role = 'super_admin', is_active = 1, permissions = NULL WHERE id = ?",
          [admin.name, admin.passwordHash, current.id],
        );
        await connection.query("DELETE FROM admin_sessions WHERE admin_id = ?", [current.id]);
      } else {
        await connection.query(
          "UPDATE admin_users SET name = ?, role = 'super_admin', permissions = NULL WHERE id = ?",
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

    await connection.query("UPDATE admin_bootstrap_state SET state_value = ? WHERE state_key = ?", [
      admin.email,
      ENV_ADMIN_STATE_KEY,
    ]);
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
