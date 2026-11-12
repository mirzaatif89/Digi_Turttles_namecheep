import type { Pool, RowDataPacket } from "mysql2/promise";
import type { AdminModule, PermissionMap } from "../permissions";
import {
  dashboardModuleMeta,
  dashboardVisibleModules,
  emptyDashboardSnapshot,
  type ContentHealthItem,
  type DashboardActivityPoint,
  type DashboardSnapshot,
  type DashboardSparkPoint,
  type DashboardStat,
  type DashboardStatModule,
  type InboxItem,
} from "../dashboard.types";

const TABLE_CANDIDATES: Record<DashboardStatModule, readonly string[]> = {
  services: ["services"],
  team: ["team_members", "team"],
  projects: ["projects", "portfolio_items"],
  courses: ["courses"],
  blog: ["blog_posts", "posts"],
  messages: ["messages"],
  leads: ["leads"],
  media: ["media_files", "media"],
};

const CONTENT_MODULES: readonly DashboardStatModule[] = [
  "services",
  "team",
  "projects",
  "courses",
  "blog",
];

const SUPPORT_TABLES = ["admin_users", "admin_login_events", "admin_sessions"];
const ALL_TABLE_NAMES = [
  ...new Set([...Object.values(TABLE_CANDIDATES).flat(), ...SUPPORT_TABLES]),
];

type ColumnRow = RowDataPacket & { TABLE_NAME: string; COLUMN_NAME: string };
type CountRow = RowDataPacket & { count: number | string };
type SparkRow = RowDataPacket & { day: string; value: number | string };
type ContentRow = RowDataPacket & {
  total: number | string;
  published: number | string;
  drafts: number | string;
  missingImages: number | string;
  missingSeo: number | string;
};
type ActivityRow = RowDataPacket & { day: string; value: number | string };
type InboxRow = RowDataPacket & {
  id: string | number;
  title: string | null;
  detail: string | null;
  createdAt: Date | string;
  unread: number | string;
};
type LoginRow = RowDataPacket & { createdAt: Date | string; ipAddress: string | null };

type TableMetadata = Map<string, Set<string>>;
type CachedSnapshot = { expiresAt: number; data: DashboardSnapshot };

const dashboardCache = new Map<string, CachedSnapshot>();

function number(value: number | string | null | undefined): number {
  return Number(value ?? 0) || 0;
}

function toIso(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function identifier(value: string): string {
  // `value` always comes from static candidates/columns below, never a request value.
  return `\`${value}\``;
}

function hasColumn(metadata: TableMetadata, table: string | undefined, column: string): boolean {
  return Boolean(table && metadata.get(table)?.has(column));
}

function firstColumn(metadata: TableMetadata, table: string | undefined, candidates: string[]) {
  return candidates.find((column) => hasColumn(metadata, table, column));
}

function tableForModule(metadata: TableMetadata, module: DashboardStatModule): string | undefined {
  return TABLE_CANDIDATES[module].find((table) => metadata.has(table));
}

function permissionsCacheKey(permissions: PermissionMap): string {
  return JSON.stringify(
    Object.entries(permissions).map(([module, actions]) => [module, actions.view, actions.create]),
  );
}

async function safeRows<T extends RowDataPacket>(
  db: Pool,
  statement: string,
  values: unknown[] = [],
): Promise<T[]> {
  try {
    const [rows] = await db.query<T[]>(statement, values);
    return rows;
  } catch {
    return [];
  }
}

async function getMetadata(db: Pool): Promise<{ metadata: TableMetadata; connected: boolean }> {
  try {
    const [rows] = await db.query<ColumnRow[]>(
      "SELECT TABLE_NAME, COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN (?)",
      [ALL_TABLE_NAMES],
    );
    const metadata: TableMetadata = new Map();
    for (const row of rows) {
      const columns = metadata.get(row.TABLE_NAME) ?? new Set<string>();
      columns.add(row.COLUMN_NAME);
      metadata.set(row.TABLE_NAME, columns);
    }
    return { metadata, connected: true };
  } catch {
    return { metadata: new Map(), connected: false };
  }
}

function countQuery(table: string): string {
  return `SELECT COUNT(*) AS count FROM ${identifier(table)}`;
}

function sparkQuery(table: string, createdAt: string): string {
  return `SELECT DATE_FORMAT(${identifier(createdAt)}, '%Y-%m-%d') AS day, COUNT(*) AS value
    FROM ${identifier(table)}
    WHERE ${identifier(createdAt)} >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(${identifier(createdAt)})
    ORDER BY day ASC`;
}

function contentQuery(table: string, columns: Set<string>): string {
  const has = (column: string) => columns.has(column);
  const published = has("is_published")
    ? "SUM(CASE WHEN `is_published` = 1 THEN 1 ELSE 0 END)"
    : has("status")
      ? "SUM(CASE WHEN LOWER(`status`) = 'published' THEN 1 ELSE 0 END)"
      : "0";
  const drafts = has("is_published")
    ? "SUM(CASE WHEN `is_published` = 0 THEN 1 ELSE 0 END)"
    : has("status")
      ? "SUM(CASE WHEN LOWER(`status`) IN ('draft', 'unpublished') THEN 1 ELSE 0 END)"
      : "0";
  const image = ["image", "image_url", "thumbnail", "cover_image", "featured_image"].find(has);
  const seoTitle = ["seo_title", "meta_title"].find(has);
  const seoDescription = ["seo_description", "meta_description"].find(has);
  const missingImage = image
    ? `SUM(CASE WHEN ${identifier(image)} IS NULL OR TRIM(${identifier(image)}) = '' THEN 1 ELSE 0 END)`
    : "0";
  const missingSeo =
    seoTitle || seoDescription
      ? `SUM(CASE WHEN ${[seoTitle, seoDescription]
          .filter((column): column is string => Boolean(column))
          .map((column) => `${identifier(column)} IS NULL OR TRIM(${identifier(column)}) = ''`)
          .join(" OR ")} THEN 1 ELSE 0 END)`
      : "0";
  return `SELECT COUNT(*) AS total, ${published} AS published, ${drafts} AS drafts,
    ${missingImage} AS missingImages, ${missingSeo} AS missingSeo FROM ${identifier(table)}`;
}

async function statForModule(
  db: Pool,
  metadata: TableMetadata,
  module: DashboardStatModule,
): Promise<{ stat: DashboardStat; health: ContentHealthItem | null }> {
  const table = tableForModule(metadata, module);
  const base = { module, ...dashboardModuleMeta[module] };
  if (!table) {
    return {
      stat: { ...base, value: 0, available: false, sparkline: [] },
      health: CONTENT_MODULES.includes(module)
        ? {
            ...base,
            available: false,
            total: 0,
            published: 0,
            drafts: 0,
            missingImages: 0,
            missingSeo: 0,
          }
        : null,
    };
  }

  const columns = metadata.get(table) ?? new Set<string>();
  const createdAt = firstColumn(metadata, table, ["created_at", "createdAt"]);
  const count = safeRows<CountRow>(db, countQuery(table));
  const spark = createdAt
    ? safeRows<SparkRow>(db, sparkQuery(table, createdAt))
    : Promise.resolve([]);
  const health = CONTENT_MODULES.includes(module)
    ? safeRows<ContentRow>(db, contentQuery(table, columns))
    : Promise.resolve([]);
  const [countRows, sparkRows, healthRows] = await Promise.all([count, spark, health]);

  const sparkline: DashboardSparkPoint[] = sparkRows.map((row) => ({
    day: row.day,
    value: number(row.value),
  }));
  const healthRow = healthRows[0];
  return {
    stat: { ...base, value: number(countRows[0]?.count), available: true, sparkline },
    health: CONTENT_MODULES.includes(module)
      ? {
          ...base,
          available: true,
          total: number(healthRow?.total),
          published: number(healthRow?.published),
          drafts: number(healthRow?.drafts),
          missingImages: number(healthRow?.missingImages),
          missingSeo: number(healthRow?.missingSeo),
        }
      : null,
  };
}

function activityQuery(table: string, createdAt: string): string {
  return `SELECT DATE_FORMAT(${identifier(createdAt)}, '%Y-%m-%d') AS day, COUNT(*) AS value
    FROM ${identifier(table)}
    WHERE ${identifier(createdAt)} >= DATE_SUB(CURDATE(), INTERVAL 29 DAY)
    GROUP BY DATE(${identifier(createdAt)}) ORDER BY day ASC`;
}

function lastThirtyDays(): DashboardActivityPoint[] {
  const today = new Date();
  return Array.from({ length: 30 }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (29 - index));
    return { day: day.toISOString().slice(0, 10), messages: 0, leads: 0, logins: 0 };
  });
}

function mergeActivity(
  messages: ActivityRow[],
  leads: ActivityRow[],
  logins: ActivityRow[],
): DashboardActivityPoint[] {
  const days = lastThirtyDays();
  const byDay = new Map(days.map((day) => [day.day, day]));
  const hasInboxActivity = [...messages, ...leads].some((row) => number(row.value) > 0);
  const add = (rows: ActivityRow[], key: "messages" | "leads" | "logins") => {
    for (const row of rows) {
      const point = byDay.get(row.day);
      if (point) point[key] = number(row.value);
    }
  };
  add(messages, "messages");
  add(leads, "leads");
  if (!hasInboxActivity) add(logins, "logins");
  return days;
}

function inboxQuery(table: string, metadata: TableMetadata): string | null {
  const id = firstColumn(metadata, table, ["id"]);
  const createdAt = firstColumn(metadata, table, ["created_at", "createdAt"]);
  if (!id || !createdAt) return null;
  const title = firstColumn(metadata, table, ["name", "full_name", "subject", "title"]);
  const detail = firstColumn(metadata, table, ["email", "company", "message", "phone"]);
  const unread = hasColumn(metadata, table, "is_read")
    ? "CASE WHEN `is_read` = 0 OR `is_read` IS NULL THEN 1 ELSE 0 END"
    : hasColumn(metadata, table, "read_at")
      ? "CASE WHEN `read_at` IS NULL THEN 1 ELSE 0 END"
      : hasColumn(metadata, table, "status")
        ? "CASE WHEN LOWER(`status`) IN ('new', 'unread') THEN 1 ELSE 0 END"
        : "0";
  return `SELECT ${identifier(id)} AS id, ${title ? identifier(title) : "'New item'"} AS title,
    ${detail ? identifier(detail) : "''"} AS detail, ${identifier(createdAt)} AS createdAt,
    ${unread} AS unread FROM ${identifier(table)} ORDER BY ${identifier(createdAt)} DESC LIMIT 5`;
}

async function latestInbox(
  db: Pool,
  metadata: TableMetadata,
  visibleModules: readonly DashboardStatModule[],
): Promise<InboxItem[]> {
  const inboxModules = visibleModules.filter(
    (module): module is "messages" | "leads" => module === "messages" || module === "leads",
  );
  const rowsByModule = await Promise.all(
    inboxModules.map(async (module) => {
      const table = tableForModule(metadata, module);
      const query = table ? inboxQuery(table, metadata) : null;
      const rows = query ? await safeRows<InboxRow>(db, query) : [];
      const type: InboxItem["type"] = module === "messages" ? "message" : "lead";
      return rows.map((row) => ({
        id: `${module}-${row.id}`,
        type,
        title: row.title || (module === "messages" ? "New message" : "New lead"),
        detail: row.detail || "No additional details",
        createdAt: toIso(row.createdAt) ?? new Date().toISOString(),
        unread: Boolean(number(row.unread)),
      }));
    }),
  );
  return rowsByModule
    .flat()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);
}

async function systemStatus(db: Pool, metadata: TableMetadata, connected: boolean) {
  const sessions = metadata.has("admin_sessions")
    ? safeRows<CountRow>(
        db,
        "SELECT COUNT(*) AS count FROM `admin_sessions` WHERE expires_at > NOW()",
      )
    : Promise.resolve([]);
  const logins = metadata.has("admin_login_events")
    ? safeRows<LoginRow>(
        db,
        "SELECT created_at AS createdAt, ip_address AS ipAddress FROM `admin_login_events` WHERE was_successful = 1 ORDER BY created_at DESC LIMIT 1",
      )
    : Promise.resolve([]);
  const [sessionRows, loginRows] = await Promise.all([sessions, logins]);
  return {
    database: connected ? ("connected" as const) : ("unavailable" as const),
    lastLoginAt: toIso(loginRows[0]?.createdAt),
    lastLoginIp: loginRows[0]?.ipAddress ?? null,
    activeSessions: number(sessionRows[0]?.count),
    serverTime: new Date().toISOString(),
  };
}

async function buildDashboardSnapshot(
  db: Pool,
  permissions: PermissionMap,
): Promise<DashboardSnapshot> {
  const visibleModules = dashboardVisibleModules(permissions);
  const { metadata, connected } = await getMetadata(db);
  if (!connected) return emptyDashboardSnapshot(visibleModules);

  const messageTable = visibleModules.includes("messages")
    ? tableForModule(metadata, "messages")
    : undefined;
  const leadTable = visibleModules.includes("leads")
    ? tableForModule(metadata, "leads")
    : undefined;
  const loginCreatedAt = firstColumn(metadata, "admin_login_events", ["created_at"]);
  const messageCreatedAt = firstColumn(metadata, messageTable, ["created_at", "createdAt"]);
  const leadCreatedAt = firstColumn(metadata, leadTable, ["created_at", "createdAt"]);

  // Once metadata is known, every independent dashboard read starts together.
  const [statResults, messageActivity, leadActivity, loginActivity, inbox, system] =
    await Promise.all([
      Promise.all(visibleModules.map((module) => statForModule(db, metadata, module))),
      messageTable && messageCreatedAt
        ? safeRows<ActivityRow>(db, activityQuery(messageTable, messageCreatedAt))
        : Promise.resolve([]),
      leadTable && leadCreatedAt
        ? safeRows<ActivityRow>(db, activityQuery(leadTable, leadCreatedAt))
        : Promise.resolve([]),
      metadata.has("admin_login_events") && loginCreatedAt
        ? safeRows<ActivityRow>(db, activityQuery("admin_login_events", loginCreatedAt))
        : Promise.resolve([]),
      latestInbox(db, metadata, visibleModules),
      systemStatus(db, metadata, connected),
    ]);

  return {
    stats: statResults.map((result) => result.stat),
    contentHealth: statResults.flatMap((result) => (result.health ? [result.health] : [])),
    activity: mergeActivity(messageActivity, leadActivity, loginActivity),
    inbox,
    system,
  };
}

/**
 * A short, permission-keyed cache keeps dashboard navigation quick without sharing
 * a more privileged admin's widgets with a restricted session.
 */
export async function getDashboardSnapshot(
  db: Pool,
  permissions: PermissionMap,
): Promise<DashboardSnapshot> {
  const key = permissionsCacheKey(permissions);
  const cached = dashboardCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.data;
  try {
    const data = await buildDashboardSnapshot(db, permissions);
    dashboardCache.set(key, { data, expiresAt: Date.now() + 15_000 });
    return data;
  } catch {
    return emptyDashboardSnapshot(dashboardVisibleModules(permissions));
  }
}

export function clearDashboardCache(): void {
  dashboardCache.clear();
}

/** Kept for the established auth dashboard loader; the redesigned dashboard uses getDashboardSnapshot. */
export async function dashboardCounts(
  db: Pool,
  modules: readonly AdminModule[],
): Promise<Partial<Record<AdminModule, number>>> {
  const { metadata } = await getMetadata(db);
  const legacyTables: Partial<Record<AdminModule, string>> = {
    users: "admin_users",
    subscribers: "subscribers",
    messages: "messages",
    leads: "leads",
    blog: "blog_posts",
    projects: "projects",
    services: "services",
  };
  const counts: Partial<Record<AdminModule, number>> = {};
  await Promise.all(
    modules.map(async (module) => {
      const table = legacyTables[module];
      if (!table || !metadata.has(table)) {
        counts[module] = 0;
        return;
      }
      const rows = await safeRows<CountRow>(db, countQuery(table));
      counts[module] = number(rows[0]?.count);
    }),
  );
  return counts;
}
