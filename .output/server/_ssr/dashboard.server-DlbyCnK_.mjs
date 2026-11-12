import { n as getDb } from "./db.server-BuqUzfMP.mjs";
import { PermissionDeniedError, requirePermission } from "./permissions.server-BAvxkYBX.mjs";
import { i as getDashboardSnapshot, n as dashboardVisibleModules, r as emptyDashboardSnapshot } from "./dashboard.server-D3L3r8YW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.server-DlbyCnK_.js
/** Server-only dashboard orchestration. Dashboard reads intentionally do not create audit records. */
async function loadDashboardData() {
	try {
		const session = await requirePermission("dashboard", "view");
		const visibleModules = dashboardVisibleModules(session.permissions);
		try {
			const db = await getDb();
			const dashboard = await getDashboardSnapshot(db, session.permissions);
			return {
				allowed: true,
				user: session.user,
				permissions: session.permissions,
				dashboard
			};
		} catch {
			return {
				allowed: true,
				user: session.user,
				permissions: session.permissions,
				dashboard: emptyDashboardSnapshot(visibleModules)
			};
		}
	} catch (error) {
		if (error instanceof PermissionDeniedError) return { allowed: false };
		throw error;
	}
}
//#endregion
export { loadDashboardData };
