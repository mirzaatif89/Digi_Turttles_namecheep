import { describe, expect, it } from "vitest";
import {
  canManageRole,
  effectivePermissions,
  hasPermission,
  preservesLastActiveSuperAdmin,
} from "./permissions";

describe("effectivePermissions", () => {
  it("merges known per-user overrides over role defaults", () => {
    const permissions = effectivePermissions("author", {
      blog: { publish: true },
      users: { view: true },
    });
    expect(hasPermission(permissions, "blog", "edit")).toBe(true);
    expect(hasPermission(permissions, "blog", "publish")).toBe(true);
    expect(hasPermission(permissions, "users", "view")).toBe(true);
  });

  it("does not grant an author unrelated default access", () => {
    expect(hasPermission(effectivePermissions("author"), "services", "view")).toBe(false);
  });
});

describe("super-admin protection", () => {
  it("does not let a non-super-admin manage a super-admin", () => {
    expect(canManageRole("admin", "super_admin")).toBe(false);
    expect(canManageRole("super_admin", "super_admin")).toBe(true);
  });

  it("keeps one active super-admin in place", () => {
    expect(preservesLastActiveSuperAdmin(1, { role: "super_admin", isActive: true })).toBe(false);
    expect(preservesLastActiveSuperAdmin(2, { role: "super_admin", isActive: true })).toBe(true);
  });
});
