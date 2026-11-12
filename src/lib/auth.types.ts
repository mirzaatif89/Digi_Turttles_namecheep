import type { AdminRole, PermissionMap } from "./permissions";

export type AdminSession = {
  user: { id: string; name: string; email: string; role: AdminRole };
  permissions: PermissionMap;
};
