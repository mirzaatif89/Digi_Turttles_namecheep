import type { Pool, RowDataPacket } from "mysql2/promise";

export type SessionRow = RowDataPacket & {
  id: string;
  admin_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
};

export async function createAdminSession(
  db: Pool,
  session: { id: string; adminId: string; tokenHash: string; expiresAt: Date },
): Promise<void> {
  await db.query(
    "INSERT INTO admin_sessions (id, admin_id, token_hash, expires_at) VALUES (?, ?, ?, ?)",
    [session.id, session.adminId, session.tokenHash, session.expiresAt],
  );
}

export async function findLiveSession(db: Pool, tokenHash: string): Promise<SessionRow | null> {
  const [rows] = await db.query<SessionRow[]>(
    "SELECT * FROM admin_sessions WHERE token_hash = ? AND expires_at > NOW() LIMIT 1",
    [tokenHash],
  );
  return rows[0] ?? null;
}

export async function deleteSessionByHash(db: Pool, tokenHash: string): Promise<void> {
  await db.query("DELETE FROM admin_sessions WHERE token_hash = ?", [tokenHash]);
}

export async function pruneExpiredSessions(db: Pool): Promise<void> {
  await db.query("DELETE FROM admin_sessions WHERE expires_at <= NOW()");
}
