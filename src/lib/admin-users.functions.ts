import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const listAdmins = createServerFn({ method: "GET" }).handler(async () =>
  (await import("./admin-users.server")).listAdmins(),
);
export const createAdmin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().trim().toLowerCase().email().max(254),
      password: z.string().min(8).max(128),
    }),
  )
  .handler(async ({ data }) => (await import("./admin-users.server")).createAdmin(data));
export const removeAdmin = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string().uuid() }))
  .handler(async ({ data }) => (await import("./admin-users.server")).removeAdmin(data.userId));
export const changePassword = createServerFn({ method: "POST" })
  .validator(z.object({ current: z.string().min(1).max(128), next: z.string().min(8).max(128) }))
  .handler(async ({ data }) => (await import("./admin-users.server")).changePassword(data));
