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

export async function countAdmins(db: Pool): Promise<number> {
  const [rows] = await db.query<(RowDataPacket & { count: number })[]>(
    "SELECT COUNT(*) AS count FROM admin_users",
  );
  return Number(rows[0]?.count ?? 0);
}

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

export async function createFirstSuperAdmin(
  db: Pool,
  admin: { id: string; name: string; email: string; passwordHash: string },
): Promise<void> {
  await db.query(
    "INSERT INTO admin_users (id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, 'super_admin', 1)",
    [admin.id, admin.name, admin.email, admin.passwordHash],
  );
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
