export const ADMIN_MODULES = [
  "dashboard",
  "home",
  "about",
  "theme",
  "navigation",
  "cta",
  "services",
  "courses",
  "projects",
  "team",
  "blog",
  "partners",
  "reviews",
  "faqs",
  "pages",
  "messages",
  "leads",
  "subscribers",
  "media",
  "seo",
  "analytics",
  "users",
  "roles",
  "settings",
  "activity",
  "backup",
] as const;

export const PERMISSION_ACTIONS = ["view", "create", "edit", "delete", "publish"] as const;

export const ADMIN_ROLES = [
  "super_admin",
  "admin",
  "editor",
  "author",
  "support",
  "viewer",
] as const;

export type AdminModule = (typeof ADMIN_MODULES)[number];
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];
export type AdminRole = (typeof ADMIN_ROLES)[number];
export type PermissionActions = Record<PermissionAction, boolean>;
export type PermissionMap = Record<AdminModule, PermissionActions>;
export type PermissionOverrides = Partial<Record<AdminModule, Partial<PermissionActions>>>;

const noActions = (): PermissionActions => ({
  view: false,
  create: false,
  edit: false,
  delete: false,
  publish: false,
});

export const emptyPermissionMap = (): PermissionMap =>
  Object.fromEntries(ADMIN_MODULES.map((module) => [module, noActions()])) as PermissionMap;

const grant = (
  modules: readonly AdminModule[],
  actions: readonly PermissionAction[],
): PermissionMap => {
  const map = emptyPermissionMap();
  for (const module of modules) for (const action of actions) map[module][action] = true;
  return map;
};

const allModules = [...ADMIN_MODULES];
const contentAndDesign: AdminModule[] = [
  "home",
  "about",
  "theme",
  "navigation",
  "cta",
  "services",
  "courses",
  "projects",
  "team",
  "blog",
  "partners",
  "reviews",
  "faqs",
  "pages",
];

/** Baseline role matrix. User-specific JSON overrides are merged by `effectivePermissions`. */
export const ROLE_DEFAULTS: Record<AdminRole, PermissionMap> = {
  super_admin: grant(allModules, PERMISSION_ACTIONS),
  admin: grant(allModules, PERMISSION_ACTIONS),
  editor: grant(["dashboard", ...contentAndDesign], ["view", "create", "edit", "publish"]),
  author: grant(["blog"], ["view", "create", "edit"]),
  support: grant(["messages", "leads", "subscribers"], ["view", "edit"]),
  viewer: grant(allModules, ["view"]),
};

export function isAdminRole(value: string): value is AdminRole {
  return (ADMIN_ROLES as readonly string[]).includes(value);
}

export function isAdminModule(value: string): value is AdminModule {
  return (ADMIN_MODULES as readonly string[]).includes(value);
}

/**
 * Keeps authorization deterministic and independently testable: role defaults
 * are copied first, then only known boolean per-user overrides are applied.
 */
export function effectivePermissions(
  role: AdminRole,
  overrides?: PermissionOverrides | null,
): PermissionMap {
  const defaults = ROLE_DEFAULTS[role];
  const result = emptyPermissionMap();
  for (const module of ADMIN_MODULES) result[module] = { ...defaults[module] };
  if (!overrides) return result;

  for (const module of ADMIN_MODULES) {
    const override = overrides[module];
    if (!override) continue;
    for (const action of PERMISSION_ACTIONS) {
      if (typeof override[action] === "boolean") result[module][action] = override[action];
    }
  }
  return result;
}

export function hasPermission(
  map: PermissionMap,
  module: AdminModule,
  action: PermissionAction,
): boolean {
  return map[module][action] === true;
}

/** Admins may manage users but cannot act on a super-admin account. */
export function canManageRole(actor: AdminRole, target: AdminRole): boolean {
  return actor === "super_admin" || target !== "super_admin";
}

/** Guard used by user-management mutations before an account can be disabled or deleted. */
export function preservesLastActiveSuperAdmin(
  activeSuperAdminCount: number,
  target: { role: AdminRole; isActive: boolean },
): boolean {
  return target.role !== "super_admin" || !target.isActive || activeSuperAdminCount > 1;
}
