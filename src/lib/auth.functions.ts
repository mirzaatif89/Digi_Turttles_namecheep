import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { loginSchema } from "./auth.schemas";
import { isAdminModule } from "./permissions";

const moduleSchema = z.object({ module: z.string().refine(isAdminModule, "Unknown admin module") });

/** The sole public session probe. The homepage invokes it after hydration, at idle. */
export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminSessionFromRequest } = await import("./auth.server");
  return getAdminSessionFromRequest();
});

export const loginAdmin = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    const { loginWithPassword } = await import("./auth.server");
    return loginWithPassword(data);
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutCurrentAdmin } = await import("./auth.server");
  await logoutCurrentAdmin();
  return { ok: true };
});

/** Route loaders use this server function; it calls the server-only `requirePermission` guard. */
export const loadAdminModule = createServerFn({ method: "GET" })
  .validator(moduleSchema)
  .handler(async ({ data }) => {
    const { loadPermittedModule } = await import("./admin.server");
    return loadPermittedModule(data.module);
  });

export const getAdminDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const { loadDashboard } = await import("./admin.server");
  return loadDashboard();
});
