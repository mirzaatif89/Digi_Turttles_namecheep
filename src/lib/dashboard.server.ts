import { getDb } from "./db.server";
import { dashboardVisibleModules, emptyDashboardSnapshot } from "./dashboard.types";
import { PermissionDeniedError, requirePermission } from "./permissions.server";
import { getDashboardSnapshot } from "./repos/dashboard.server";

/** Server-only dashboard orchestration. Dashboard reads intentionally do not create audit records. */
export async function loadDashboardData() {
  try {
    const session = await requirePermission("dashboard", "view");
    const visibleModules = dashboardVisibleModules(session.permissions);
    try {
      const db = await getDb();
      const dashboard = await getDashboardSnapshot(db, session.permissions);
      return {
        allowed: true as const,
        user: session.user,
        permissions: session.permissions,
        dashboard,
      };
    } catch {
      return {
        allowed: true as const,
        user: session.user,
        permissions: session.permissions,
        dashboard: emptyDashboardSnapshot(visibleModules),
      };
    }
  } catch (error) {
    if (error instanceof PermissionDeniedError) return { allowed: false as const };
    throw error;
  }
}
