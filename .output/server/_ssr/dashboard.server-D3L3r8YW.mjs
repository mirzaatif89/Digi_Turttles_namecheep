//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.server-D3L3r8YW.js
var DASHBOARD_STAT_MODULES = [
	"services",
	"team",
	"projects",
	"courses",
	"blog",
	"messages",
	"leads",
	"media"
];
var dashboardModuleMeta = {
	services: {
		label: "Services",
		href: "/admin/services"
	},
	team: {
		label: "Team",
		href: "/admin/team"
	},
	projects: {
		label: "Portfolio",
		href: "/admin/projects"
	},
	courses: {
		label: "Courses",
		href: "/admin/courses"
	},
	blog: {
		label: "Blog posts",
		href: "/admin/blog"
	},
	messages: {
		label: "Messages",
		href: "/admin/messages"
	},
	leads: {
		label: "Leads",
		href: "/admin/leads"
	},
	media: {
		label: "Media files",
		href: "/admin/media"
	}
};
function dashboardVisibleModules(permissions) {
	return DASHBOARD_STAT_MODULES.filter((module) => permissions[module].view);
}
function emptyDashboardSnapshot(visibleModules = []) {
	return {
		stats: visibleModules.map((module) => ({
			module,
			...dashboardModuleMeta[module],
			value: 0,
			available: false,
			sparkline: []
		})),
		activity: [],
		contentHealth: visibleModules.filter((module) => [
			"services",
			"team",
			"projects",
			"courses",
			"blog"
		].includes(module)).map((module) => ({
			module,
			...dashboardModuleMeta[module],
			available: false,
			total: 0,
			published: 0,
			drafts: 0,
			missingImages: 0,
			missingSeo: 0
		})),
		inbox: [],
		recentActivity: [],
		system: {
			database: "unavailable",
			lastLoginAt: null,
			lastLoginIp: null,
			activeSessions: 0,
			serverTime: (/* @__PURE__ */ new Date()).toISOString()
		}
	};
}
var TABLE_CANDIDATES = {
	services: ["services"],
	team: ["team_members", "team"],
	projects: ["projects", "portfolio_items"],
	courses: ["courses"],
	blog: ["blog_posts", "posts"],
	messages: ["messages"],
	leads: ["leads"],
	media: ["media_files", "media"]
};
var CONTENT_MODULES = [
	"services",
	"team",
	"projects",
	"courses",
	"blog"
];
var SUPPORT_TABLES = [
	"audit_logs",
	"admin_users",
	"admin_login_events",
	"admin_sessions"
];
var ALL_TABLE_NAMES = [.../* @__PURE__ */ new Set([...Object.values(TABLE_CANDIDATES).flat(), ...SUPPORT_TABLES])];
var dashboardCache = /* @__PURE__ */ new Map();
function number(value) {
	return Number(value ?? 0) || 0;
}
function toIso(value) {
	if (!value) return null;
	const date = value instanceof Date ? value : new Date(value);
	return Number.isNaN(date.getTime()) ? null : date.toISOString();
}
function identifier(value) {
	return `\`${value}\``;
}
function hasColumn(metadata, table, column) {
	return Boolean(table && metadata.get(table)?.has(column));
}
function firstColumn(metadata, table, candidates) {
	return candidates.find((column) => hasColumn(metadata, table, column));
}
function tableForModule(metadata, module) {
	return TABLE_CANDIDATES[module].find((table) => metadata.has(table));
}
function permissionsCacheKey(permissions) {
	return JSON.stringify(Object.entries(permissions).map(([module, actions]) => [
		module,
		actions.view,
		actions.create
	]));
}
async function safeRows(db, statement, values = []) {
	try {
		const [rows] = await db.query(statement, values);
		return rows;
	} catch {
		return [];
	}
}
async function getMetadata(db) {
	try {
		const [rows] = await db.query("SELECT TABLE_NAME, COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN (?)", [ALL_TABLE_NAMES]);
		const metadata = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const columns = metadata.get(row.TABLE_NAME) ?? /* @__PURE__ */ new Set();
			columns.add(row.COLUMN_NAME);
			metadata.set(row.TABLE_NAME, columns);
		}
		return {
			metadata,
			connected: true
		};
	} catch {
		return {
			metadata: /* @__PURE__ */ new Map(),
			connected: false
		};
	}
}
function countQuery(table) {
	return `SELECT COUNT(*) AS count FROM ${identifier(table)}`;
}
function sparkQuery(table, createdAt) {
	return `SELECT DATE_FORMAT(${identifier(createdAt)}, '%Y-%m-%d') AS day, COUNT(*) AS value
    FROM ${identifier(table)}
    WHERE ${identifier(createdAt)} >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(${identifier(createdAt)})
    ORDER BY day ASC`;
}
function contentQuery(table, columns) {
	const has = (column) => columns.has(column);
	const published = has("is_published") ? "SUM(CASE WHEN `is_published` = 1 THEN 1 ELSE 0 END)" : has("status") ? "SUM(CASE WHEN LOWER(`status`) = 'published' THEN 1 ELSE 0 END)" : "0";
	const drafts = has("is_published") ? "SUM(CASE WHEN `is_published` = 0 THEN 1 ELSE 0 END)" : has("status") ? "SUM(CASE WHEN LOWER(`status`) IN ('draft', 'unpublished') THEN 1 ELSE 0 END)" : "0";
	const image = [
		"image",
		"image_url",
		"thumbnail",
		"cover_image",
		"featured_image"
	].find(has);
	const seoTitle = ["seo_title", "meta_title"].find(has);
	const seoDescription = ["seo_description", "meta_description"].find(has);
	return `SELECT COUNT(*) AS total, ${published} AS published, ${drafts} AS drafts,
    ${image ? `SUM(CASE WHEN ${identifier(image)} IS NULL OR TRIM(${identifier(image)}) = '' THEN 1 ELSE 0 END)` : "0"} AS missingImages, ${seoTitle || seoDescription ? `SUM(CASE WHEN ${[seoTitle, seoDescription].filter((column) => Boolean(column)).map((column) => `${identifier(column)} IS NULL OR TRIM(${identifier(column)}) = ''`).join(" OR ")} THEN 1 ELSE 0 END)` : "0"} AS missingSeo FROM ${identifier(table)}`;
}
async function statForModule(db, metadata, module) {
	const table = tableForModule(metadata, module);
	const base = {
		module,
		...dashboardModuleMeta[module]
	};
	if (!table) return {
		stat: {
			...base,
			value: 0,
			available: false,
			sparkline: []
		},
		health: CONTENT_MODULES.includes(module) ? {
			...base,
			available: false,
			total: 0,
			published: 0,
			drafts: 0,
			missingImages: 0,
			missingSeo: 0
		} : null
	};
	const columns = metadata.get(table) ?? /* @__PURE__ */ new Set();
	const createdAt = firstColumn(metadata, table, ["created_at", "createdAt"]);
	const count = safeRows(db, countQuery(table));
	const spark = createdAt ? safeRows(db, sparkQuery(table, createdAt)) : Promise.resolve([]);
	const health = CONTENT_MODULES.includes(module) ? safeRows(db, contentQuery(table, columns)) : Promise.resolve([]);
	const [countRows, sparkRows, healthRows] = await Promise.all([
		count,
		spark,
		health
	]);
	const sparkline = sparkRows.map((row) => ({
		day: row.day,
		value: number(row.value)
	}));
	const healthRow = healthRows[0];
	return {
		stat: {
			...base,
			value: number(countRows[0]?.count),
			available: true,
			sparkline
		},
		health: CONTENT_MODULES.includes(module) ? {
			...base,
			available: true,
			total: number(healthRow?.total),
			published: number(healthRow?.published),
			drafts: number(healthRow?.drafts),
			missingImages: number(healthRow?.missingImages),
			missingSeo: number(healthRow?.missingSeo)
		} : null
	};
}
function activityQuery(table, createdAt) {
	return `SELECT DATE_FORMAT(${identifier(createdAt)}, '%Y-%m-%d') AS day, COUNT(*) AS value
    FROM ${identifier(table)}
    WHERE ${identifier(createdAt)} >= DATE_SUB(CURDATE(), INTERVAL 29 DAY)
    GROUP BY DATE(${identifier(createdAt)}) ORDER BY day ASC`;
}
function lastThirtyDays() {
	const today = /* @__PURE__ */ new Date();
	return Array.from({ length: 30 }, (_, index) => {
		const day = new Date(today);
		day.setDate(today.getDate() - (29 - index));
		return {
			day: day.toISOString().slice(0, 10),
			messages: 0,
			leads: 0,
			logins: 0
		};
	});
}
function mergeActivity(messages, leads, logins) {
	const days = lastThirtyDays();
	const byDay = new Map(days.map((day) => [day.day, day]));
	const hasInboxActivity = [...messages, ...leads].some((row) => number(row.value) > 0);
	const add = (rows, key) => {
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
function inboxQuery(table, metadata) {
	const id = firstColumn(metadata, table, ["id"]);
	const createdAt = firstColumn(metadata, table, ["created_at", "createdAt"]);
	if (!id || !createdAt) return null;
	const title = firstColumn(metadata, table, [
		"name",
		"full_name",
		"subject",
		"title"
	]);
	const detail = firstColumn(metadata, table, [
		"email",
		"company",
		"message",
		"phone"
	]);
	const unread = hasColumn(metadata, table, "is_read") ? "CASE WHEN `is_read` = 0 OR `is_read` IS NULL THEN 1 ELSE 0 END" : hasColumn(metadata, table, "read_at") ? "CASE WHEN `read_at` IS NULL THEN 1 ELSE 0 END" : hasColumn(metadata, table, "status") ? "CASE WHEN LOWER(`status`) IN ('new', 'unread') THEN 1 ELSE 0 END" : "0";
	return `SELECT ${identifier(id)} AS id, ${title ? identifier(title) : "'New item'"} AS title,
    ${detail ? identifier(detail) : "''"} AS detail, ${identifier(createdAt)} AS createdAt,
    ${unread} AS unread FROM ${identifier(table)} ORDER BY ${identifier(createdAt)} DESC LIMIT 5`;
}
async function latestInbox(db, metadata, visibleModules) {
	const inboxModules = visibleModules.filter((module) => module === "messages" || module === "leads");
	return (await Promise.all(inboxModules.map(async (module) => {
		const table = tableForModule(metadata, module);
		const query = table ? inboxQuery(table, metadata) : null;
		const rows = query ? await safeRows(db, query) : [];
		const type = module === "messages" ? "message" : "lead";
		return rows.map((row) => ({
			id: `${module}-${row.id}`,
			type,
			title: row.title || (module === "messages" ? "New message" : "New lead"),
			detail: row.detail || "No additional details",
			createdAt: toIso(row.createdAt) ?? (/* @__PURE__ */ new Date()).toISOString(),
			unread: Boolean(number(row.unread))
		}));
	}))).flat().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
}
async function recentAuditActivity(db, metadata) {
	if (!metadata.has("audit_logs")) return [];
	const canJoin = metadata.has("admin_users") && hasColumn(metadata, "audit_logs", "admin_id");
	return (await safeRows(db, `SELECT a.id, a.module, a.action, a.summary, ${canJoin && hasColumn(metadata, "admin_users", "name") ? "u.name" : "NULL"} AS actor, a.created_at AS createdAt
      FROM \`audit_logs\` a ${canJoin ? "LEFT JOIN `admin_users` u ON a.`admin_id` = u.`id`" : ""} ORDER BY a.created_at DESC LIMIT 10`)).map((row) => ({
		id: String(row.id),
		module: row.module,
		action: row.action,
		summary: row.summary || `${row.action} ${row.module}`,
		actor: row.actor,
		createdAt: toIso(row.createdAt) ?? (/* @__PURE__ */ new Date()).toISOString()
	}));
}
async function systemStatus(db, metadata, connected) {
	const sessions = metadata.has("admin_sessions") ? safeRows(db, "SELECT COUNT(*) AS count FROM `admin_sessions` WHERE expires_at > NOW()") : Promise.resolve([]);
	const logins = metadata.has("admin_login_events") ? safeRows(db, "SELECT created_at AS createdAt, ip_address AS ipAddress FROM `admin_login_events` WHERE was_successful = 1 ORDER BY created_at DESC LIMIT 1") : Promise.resolve([]);
	const [sessionRows, loginRows] = await Promise.all([sessions, logins]);
	return {
		database: connected ? "connected" : "unavailable",
		lastLoginAt: toIso(loginRows[0]?.createdAt),
		lastLoginIp: loginRows[0]?.ipAddress ?? null,
		activeSessions: number(sessionRows[0]?.count),
		serverTime: (/* @__PURE__ */ new Date()).toISOString()
	};
}
async function buildDashboardSnapshot(db, permissions) {
	const visibleModules = dashboardVisibleModules(permissions);
	const { metadata, connected } = await getMetadata(db);
	if (!connected) return emptyDashboardSnapshot(visibleModules);
	const messageTable = visibleModules.includes("messages") ? tableForModule(metadata, "messages") : void 0;
	const leadTable = visibleModules.includes("leads") ? tableForModule(metadata, "leads") : void 0;
	const loginCreatedAt = firstColumn(metadata, "admin_login_events", ["created_at"]);
	const messageCreatedAt = firstColumn(metadata, messageTable, ["created_at", "createdAt"]);
	const leadCreatedAt = firstColumn(metadata, leadTable, ["created_at", "createdAt"]);
	const [statResults, messageActivity, leadActivity, loginActivity, inbox, recentActivity, system] = await Promise.all([
		Promise.all(visibleModules.map((module) => statForModule(db, metadata, module))),
		messageTable && messageCreatedAt ? safeRows(db, activityQuery(messageTable, messageCreatedAt)) : Promise.resolve([]),
		leadTable && leadCreatedAt ? safeRows(db, activityQuery(leadTable, leadCreatedAt)) : Promise.resolve([]),
		metadata.has("admin_login_events") && loginCreatedAt ? safeRows(db, activityQuery("admin_login_events", loginCreatedAt)) : Promise.resolve([]),
		latestInbox(db, metadata, visibleModules),
		recentAuditActivity(db, metadata),
		systemStatus(db, metadata, connected)
	]);
	return {
		stats: statResults.map((result) => result.stat),
		contentHealth: statResults.flatMap((result) => result.health ? [result.health] : []),
		activity: mergeActivity(messageActivity, leadActivity, loginActivity),
		inbox,
		recentActivity: recentActivity.filter((item) => item.module === "dashboard" || visibleModules.includes(item.module)),
		system
	};
}
/**
* A short, permission-keyed cache keeps dashboard navigation quick without sharing
* a more privileged admin's widgets with a restricted session.
*/
async function getDashboardSnapshot(db, permissions) {
	const key = permissionsCacheKey(permissions);
	const cached = dashboardCache.get(key);
	if (cached && cached.expiresAt > Date.now()) return cached.data;
	try {
		const data = await buildDashboardSnapshot(db, permissions);
		dashboardCache.set(key, {
			data,
			expiresAt: Date.now() + 15e3
		});
		return data;
	} catch {
		return emptyDashboardSnapshot(dashboardVisibleModules(permissions));
	}
}
/** Kept for the established auth dashboard loader; the redesigned dashboard uses getDashboardSnapshot. */
async function dashboardCounts(db, modules) {
	const { metadata } = await getMetadata(db);
	const legacyTables = {
		users: "admin_users",
		subscribers: "subscribers",
		messages: "messages",
		leads: "leads",
		blog: "blog_posts",
		projects: "projects",
		services: "services"
	};
	const counts = {};
	await Promise.all(modules.map(async (module) => {
		const table = legacyTables[module];
		if (!table || !metadata.has(table)) {
			counts[module] = 0;
			return;
		}
		const rows = await safeRows(db, countQuery(table));
		counts[module] = number(rows[0]?.count);
	}));
	return counts;
}
//#endregion
export { getDashboardSnapshot as i, dashboardVisibleModules as n, emptyDashboardSnapshot as r, dashboardCounts as t };
