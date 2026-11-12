import { getDb } from "./db.server";
import { requirePermission, PermissionDeniedError } from "./permissions.server";
import type { AdminModule } from "./permissions";
import { dashboardCounts } from "./repos/dashboard.server";
import { recentLoginEvents } from "./repos/login-events.server";

export async function loadPermittedModule(module: AdminModule) {
  try {
    const session = await requirePermission(module, "view");
    return { allowed: true as const, session };
  } catch (error) {
    if (error instanceof PermissionDeniedError) return { allowed: false as const, session: null };
    throw error;
  }
}

export async function loadDashboard() {
  const access = await loadPermittedModule("dashboard");
  if (!access.allowed) return { ...access, counts: {}, events: [] };
  const db = await getDb();
  const visible = (Object.keys(access.session.permissions) as AdminModule[]).filter(
    (module) => access.session.permissions[module].view,
  );
  const [counts, events] = await Promise.all([dashboardCounts(db, visible), recentLoginEvents(db)]);
  return {
    ...access,
    counts,
    events: events.map((event) => ({ ...event, created_at: event.created_at.toISOString() })),
  };
}
