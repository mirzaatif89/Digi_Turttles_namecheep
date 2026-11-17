import { describe, expect, it } from "vitest";
import { sanitizeRedirect } from "@/lib/auth.schemas";
import { ALL_SECTIONS, COLLECTIONS, mergeData } from "./schema";

describe("website content definitions", () => {
  it("gives every section a unique key that doesn't clash with fixed admin pages", () => {
    const keys = ALL_SECTIONS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const fixed of ["messages", "subscribers", "media", "users", "account"]) {
      expect(keys).not.toContain(fixed);
    }
  });

  it("uses a real field as each list's title", () => {
    for (const c of COLLECTIONS) {
      expect(c.fields.map((f) => f.name)).toContain(c.titleField);
    }
  });

  it("keeps an admin's saved empty value instead of restoring the default", () => {
    expect(mergeData({ title: "Default", text: "x" }, { title: "" })).toEqual({
      title: "",
      text: "x",
    });
  });
});

describe("login redirect", () => {
  it("only allows same-site paths after login", () => {
    expect(sanitizeRedirect("/admin/team")).toBe("/admin/team");
    expect(sanitizeRedirect("https://evil.example")).toBe("/admin");
    expect(sanitizeRedirect("//evil.example")).toBe("/admin");
    expect(sanitizeRedirect(undefined)).toBe("/admin");
  });
});
