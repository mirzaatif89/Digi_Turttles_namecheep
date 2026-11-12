import { createServerFn } from "@tanstack/react-start";

/** Kept in a tiny isolated chunk for the post-hydration public-nav session probe. */
export const getPublicAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminSessionFromRequest } = await import("./auth.server");
  return getAdminSessionFromRequest();
});
