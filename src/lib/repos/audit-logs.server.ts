import type { Pool } from "mysql2/promise";

export async function recordAuditLog(
  db: Pool,
  entry: {
    adminId: string;
    module: string;
    action: string;
    recordId?: string | null;
    summary: string;
    ipAddress: string;
  },
): Promise<void> {
  await db.query(
    "INSERT INTO audit_logs (admin_id, module, action, record_id, summary, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
    [
      entry.adminId,
      entry.module,
      entry.action,
      entry.recordId ?? null,
      entry.summary,
      entry.ipAddress,
    ],
  );
}
