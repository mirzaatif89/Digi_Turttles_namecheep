import type { Pool, RowDataPacket } from "mysql2/promise";

export async function failedLoginCount(
  db: Pool,
  email: string,
  ipAddress: string,
): Promise<number> {
  const [rows] = await db.query<(RowDataPacket & { count: number })[]>(
    "SELECT COUNT(*) AS count FROM admin_login_events WHERE email = ? AND ip_address = ? AND was_successful = 0 AND created_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)",
    [email, ipAddress],
  );
  return Number(rows[0]?.count ?? 0);
}

export async function recordLoginEvent(
  db: Pool,
  event: {
    adminId: string | null;
    email: string;
    successful: boolean;
    ipAddress: string | null;
  },
): Promise<void> {
  await db.query(
    "INSERT INTO admin_login_events (admin_id, email, was_successful, ip_address) VALUES (?, ?, ?, ?)",
    [event.adminId, event.email, Number(event.successful), event.ipAddress],
  );
}

export type RecentLoginEvent = RowDataPacket & {
  id: string;
  email: string;
  was_successful: number;
  ip_address: string | null;
  created_at: Date;
  name: string | null;
};

export async function recentLoginEvents(db: Pool, limit = 8): Promise<RecentLoginEvent[]> {
  const [rows] = await db.query<RecentLoginEvent[]>(
    "SELECT e.id, e.email, e.was_successful, e.ip_address, e.created_at, u.name FROM admin_login_events e LEFT JOIN admin_users u ON e.admin_id = u.id ORDER BY e.created_at DESC LIMIT ?",
    [limit],
  );
  return rows;
}
