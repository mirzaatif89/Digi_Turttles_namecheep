import { getAdminDashboard, getAdminSession, loadAdminModule } from "./auth.functions";
import type { AdminSession } from "./auth.types";
import type { AdminModule } from "./permissions";

/**
 * TanStack server functions return their transport envelope during SSR in this
 * runtime. Route loaders therefore call the same server-only work directly on
 * SSR, then use the server function for client-side navigation.
 */
export async function routeAdminSession(): Promise<AdminSession | null> {
  if (import.meta.env.SSR) {
    const { getAdminSessionFromRequest } = await import("./auth.server");
    return getAdminSessionFromRequest();
  }
  return getAdminSession();
}

export async function routeAdminModule(module: AdminModule) {
  if (import.meta.env.SSR) {
    const { loadPermittedModule } = await import("./admin.server");
    return loadPermittedModule(module);
  }
  return loadAdminModule({ data: { module } });
}

export async function routeAdminDashboard() {
  if (import.meta.env.SSR) {
    const { loadDashboard } = await import("./admin.server");
    return loadDashboard();
  }
  return getAdminDashboard();
}
