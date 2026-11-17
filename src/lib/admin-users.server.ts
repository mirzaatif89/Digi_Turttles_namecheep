import type { RowDataPacket } from "mysql2/promise";
import { getAdminSessionFromRequest, logoutCurrentAdmin } from "./auth.server";
import { getDb } from "./db.server";
import { PermissionDeniedError, requirePermission } from "./permissions.server";
import { canManageRole } from "./permissions";
import type { AdminUserRow } from "./repos/admins.server";

export async function listAdmins() {
  const session = await requirePermission("users", "view");
  const [rows] = await (
    await getDb()
  ).query<AdminUserRow[]>(
    "SELECT id, email, role, last_login_at FROM admin_users ORDER BY created_at ASC",
  );
  return rows.map((row) => ({
    id: row.id,
    email: row.email,
    role: row.role,
    isYou: row.id === session.user.id,
    lastSignIn: row.last_login_at?.toISOString() ?? null,
  }));
}

export async function createAdmin(input: { email: string; password: string }) {
  const session = await requirePermission("users", "create");
  if (!["super_admin", "admin"].includes(session.user.role)) throw new PermissionDeniedError();
  const db = await getDb();
  const bcrypt = await import("bcryptjs");
  try {
    await db.query(
      "INSERT INTO admin_users (id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, 'admin', 1)",
      [
        crypto.randomUUID(),
        input.email.split("@")[0]!.slice(0, 120),
        input.email,
        await bcrypt.hash(input.password, 12),
      ],
    );
  } catch (error) {
    if ((error as { code?: string }).code === "ER_DUP_ENTRY")
      throw new Error("An account already exists with this email.");
    throw error;
  }
  return { ok: true };
}

export async function removeAdmin(userId: string) {
  const session = await requirePermission("users", "delete");
  if (!["super_admin", "admin"].includes(session.user.role)) throw new PermissionDeniedError();
  if (userId === session.user.id) throw new Error("You cannot remove your own account.");
  const connection = await (await getDb()).getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query<AdminUserRow[]>(
      "SELECT id, role, is_active FROM admin_users ORDER BY id FOR UPDATE",
    );
    const target = rows.find((row) => row.id === userId);
    if (!target) throw new Error("Account not found.");
    if (!canManageRole(session.user.role, target.role)) throw new PermissionDeniedError();
    if (
      target.role === "super_admin" &&
      target.is_active &&
      !rows.some((row) => row.id !== userId && row.role === "super_admin" && row.is_active)
    )
      throw new Error("Keep at least one active super administrator.");
    await connection.query("DELETE FROM admin_users WHERE id = ?", [userId]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return { ok: true };
}

export async function changePassword(input: { current: string; next: string }) {
  const session = await getAdminSessionFromRequest();
  if (!session) throw new PermissionDeniedError();
  const db = await getDb();
  const [rows] = await db.query<(RowDataPacket & { password_hash: string })[]>(
    "SELECT password_hash FROM admin_users WHERE id = ?",
    [session.user.id],
  );
  const bcrypt = await import("bcryptjs");
  if (!rows[0] || !(await bcrypt.compare(input.current, rows[0].password_hash)))
    throw new Error("Current password is incorrect.");
  await db.query("UPDATE admin_users SET password_hash = ? WHERE id = ?", [
    await bcrypt.hash(input.next, 12),
    session.user.id,
  ]);
  await db.query("DELETE FROM admin_sessions WHERE admin_id = ?", [session.user.id]);
  await logoutCurrentAdmin();
  return { ok: true };
}
