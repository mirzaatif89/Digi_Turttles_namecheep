import { n as getDb } from "./db.server-BuqUzfMP.mjs";
import { r as recentLoginEvents } from "./auth.server-CAbGC1fK.mjs";
import { PermissionDeniedError, requirePermission } from "./permissions.server-BAvxkYBX.mjs";
import { t as dashboardCounts } from "./dashboard.server-D3L3r8YW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.server-rhLpymKx.js
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
