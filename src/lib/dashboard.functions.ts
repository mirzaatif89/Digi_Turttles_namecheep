import { createServerFn } from "@tanstack/react-start";

/** The dashboard's one client-facing data request. It is permission-guarded server-side. */
export const getDashboardData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadDashboardData } = await import("./dashboard.server");
  return loadDashboardData();
});
