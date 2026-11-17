import { beforeEach, describe, expect, it, vi } from "vitest";
import { effectivePermissions } from "@/lib/permissions";
import type { AdminSession } from "@/lib/auth.types";
import { defaultStore } from "./store.server";
import type { CmsStore } from "./types";

const state = vi.hoisted(() => ({
  session: null as AdminSession | null,
  store: null as CmsStore | null,
}));
vi.mock("@/lib/auth.server", () => ({ getAdminSessionFromRequest: async () => state.session }));
vi.mock("./store.server", async (original) => ({
  ...(await original<typeof import("./store.server")>()),
  readStore: async () => state.store!,
  updateStore: async <T>(change: (store: CmsStore) => T) => change(state.store!),
}));
import { contentAction, getSetting, saveContent, saveSetting } from "./admin.server";
import { publicContent } from "./content.server";

beforeEach(() => {
  state.store = defaultStore();
  state.session = {
    user: { id: "test", name: "Admin", email: "test@example.test", role: "admin" },
    permissions: effectivePermissions("admin"),
  };
});

describe("CMS authorization and publication", () => {
  it("requires authentication for settings and writes", async () => {
    state.session = null;
    await expect(getSetting("hero")).rejects.toMatchObject({ statusCode: 403 });
    await expect(saveSetting("hero", { badge: "Unauthorized" })).rejects.toMatchObject({
      statusCode: 403,
    });
  });
  it("rejects viewer writes and edits to another role's section", async () => {
    state.session!.permissions = effectivePermissions("viewer");
    await expect(saveSetting("hero", { badge: "Unauthorized" })).rejects.toMatchObject({
      statusCode: 403,
    });
    state.session!.permissions = effectivePermissions("author");
    await expect(saveSetting("brand", { siteName: "Unauthorized" })).rejects.toMatchObject({
      statusCode: 403,
    });
  });
  it("allows draft creation without allowing an author to publish", async () => {
    state.session!.permissions = effectivePermissions("author");
    const input = { collection: "posts", id: null, value: { title: "A draft" }, published: false };
    const draft = await saveContent(input);
    expect(draft.published).toBe(false);
    await expect(
      contentAction({ collection: "posts", id: draft.id, action: "publish" }),
    ).rejects.toMatchObject({ statusCode: 403 });
    await expect(saveContent({ ...input, published: true })).rejects.toThrow(
      "permission to publish",
    );
  });
  it("reflects saved text immediately and excludes hidden items from the public site", async () => {
    await saveSetting("hero", { badge: "Updated badge" });
    const item = state.store!.items["services"]![0]!;
    await contentAction({ collection: "services", id: item.id, action: "publish" });
    const content = await publicContent();
    expect(content.settings["hero"]?.["badge"]).toBe("Updated badge");
    expect(content.items["services"]?.some((row) => row.id === item.id)).toBe(false);
  });
});
