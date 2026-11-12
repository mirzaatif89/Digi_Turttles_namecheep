import { getAdminSessionFromRequest, type AdminSession } from "./auth.server";
import { hasPermission, type AdminModule, type PermissionAction } from "./permissions";

export class PermissionDeniedError extends Error {
  readonly statusCode = 403;
  constructor() {
    super("You do not have permission to access this area.");
  }
}

/** Server-only guard for future content mutations and every admin route loader. */
export async function requirePermission(
  module: AdminModule,
  action: PermissionAction,
): Promise<AdminSession> {
  const session = await getAdminSessionFromRequest();
  if (!session || !hasPermission(session.permissions, module, action))
    throw new PermissionDeniedError();
  return session;
}
