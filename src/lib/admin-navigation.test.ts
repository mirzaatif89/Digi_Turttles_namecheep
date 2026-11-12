import { describe, expect, it } from "vitest";
import { visibleNavigation } from "./admin-navigation";
import { effectivePermissions } from "./permissions";

describe("sidebar visibility", () => {
  it("shows only modules with view permission", () => {
    const items = visibleNavigation(effectivePermissions("author")).flatMap((group) => group.items);
    expect(items.map((item) => item.module)).toEqual(["blog"]);
  });
});
