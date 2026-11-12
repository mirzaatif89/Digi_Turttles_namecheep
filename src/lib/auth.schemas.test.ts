import { describe, expect, it } from "vitest";
import { loginSchema, sanitizeRedirect } from "./auth.schemas";

describe("login schema", () => {
  it("requires a valid email and non-empty password", () => {
    expect(loginSchema.safeParse({ email: "not-an-email", password: "" }).success).toBe(false);
    expect(
      loginSchema.safeParse({ email: "admin@example.com", password: "password" }).success,
    ).toBe(true);
  });
});

describe("redirect sanitizer", () => {
  it("keeps same-origin paths only", () => {
    expect(sanitizeRedirect("/admin/messages?filter=unread")).toBe("/admin/messages?filter=unread");
    expect(sanitizeRedirect("//attacker.example")).toBe("/admin");
    expect(sanitizeRedirect("https://attacker.example")).toBe("/admin");
  });
});
