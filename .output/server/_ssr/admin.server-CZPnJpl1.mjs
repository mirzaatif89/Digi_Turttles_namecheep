import { n as getDb } from "./db.server-BuqUzfMP.mjs";
import { r as recentLoginEvents } from "./auth.server-BAlYuJAD.mjs";
import { PermissionDeniedError, requirePermission } from "./permissions.server-DIKEW_ET.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.server-CZPnJpl1.js
var MODULE_TABLES = {
	users: "admin_users",
	messages: "messages",
	leads: "leads",
	subscribers: "subscribers",
	blog: "blog_posts",
	projects: "projects",
	services: "services"
};
/** Counts only known, existing tables; a not-yet-built content table is a safe zero. */
async function dashboardCounts(db, modules) {
	const tableNames = [...new Set(modules.map((module) => MODULE_TABLES[module]).filter((name) => Boolean(name)))];
	if (tableNames.length === 0) return {};
	const [existingRows] = await db.query("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN (?)", [tableNames]);
	const existing = new Set(existingRows.map((row) => row.TABLE_NAME));
	const counts = {};
	for (const module of modules) {
		const table = MODULE_TABLES[module];
		if (!table || !existing.has(table)) {
			counts[module] = 0;
			continue;
		}
		const [rows] = await db.query(`SELECT COUNT(*) AS count FROM \`${table}\``);
		counts[module] = Number(rows[0]?.count ?? 0);
	}
	return counts;
}
async function loadPermittedModule(module) {
	try {
		return {
			allowed: true,
			session: await requirePermission(module, "view")
		};
	} catch (error) {
		if (error instanceof PermissionDeniedError) return {
			allowed: false,
			session: null
		};
		throw error;
	}
}
async function loadDashboard() {
	const access = await loadPermittedModule("dashboard");
	if (!access.allowed) return {
		...access,
		counts: {},
		events: []
	};
	const db = await getDb();
	const visible = Object.keys(access.session.permissions).filter((module) => access.session.permissions[module].view);
	const [counts, events] = await Promise.all([dashboardCounts(db, visible), recentLoginEvents(db)]);
	return {
		...access,
		counts,
		events: events.map((event) => ({
			...event,
			created_at: event.created_at.toISOString()
		}))
	};
}
//#endregion
export { loadDashboard, loadPermittedModule };
