import type { Pool, RowDataPacket } from "mysql2/promise";
import type { AdminModule } from "../permissions";

const MODULE_TABLES: Partial<Record<AdminModule, string>> = {
  users: "admin_users",
  messages: "messages",
  leads: "leads",
  subscribers: "subscribers",
  blog: "blog_posts",
  projects: "projects",
  services: "services",
};

/** Counts only known, existing tables; a not-yet-built content table is a safe zero. */
export async function dashboardCounts(
  db: Pool,
  modules: readonly AdminModule[],
): Promise<Partial<Record<AdminModule, number>>> {
  const tableNames = [
    ...new Set(
      modules
        .map((module) => MODULE_TABLES[module])
        .filter((name): name is string => Boolean(name)),
    ),
  ];
  if (tableNames.length === 0) return {};
  const [existingRows] = await db.query<(RowDataPacket & { TABLE_NAME: string })[]>(
    "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN (?)",
    [tableNames],
  );
  const existing = new Set(existingRows.map((row) => row.TABLE_NAME));
  const counts: Partial<Record<AdminModule, number>> = {};
  for (const module of modules) {
    const table = MODULE_TABLES[module];
    if (!table || !existing.has(table)) {
      counts[module] = 0;
      continue;
    }
    const [rows] = await db.query<(RowDataPacket & { count: number })[]>(
      `SELECT COUNT(*) AS count FROM \`${table}\``,
    );
    counts[module] = Number(rows[0]?.count ?? 0);
  }
  return counts;
}
