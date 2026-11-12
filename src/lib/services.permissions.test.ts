import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({ getAdminSessionFromRequest: vi.fn() }));

vi.mock("./auth.server", () => ({ getAdminSessionFromRequest: auth.getAdminSessionFromRequest }));

import { requirePermission } from "./permissions.server";
import { effectivePermissions } from "./permissions";

describe("services write permissions", () => {
  beforeEach(() => {
    auth.getAdminSessionFromRequest.mockReset();
    auth.getAdminSessionFromRequest.mockResolvedValue({
      user: { id: "viewer-id", name: "Viewer", email: "viewer@example.test", role: "viewer" },
      permissions: effectivePermissions("viewer"),
    });
  });

  it.each(["create", "delete"] as const)(
    "returns a 403 permission error for viewer %s",
    async (action) => {
      await expect(requirePermission("services", action)).rejects.toMatchObject({
        statusCode: 403,
      });
    },
  );
});
