import { describe, expect, it } from "vitest";
import {
  loginSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  sanitizeRedirect,
} from "./auth.schemas";

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

describe("password reset schemas", () => {
  it("requires an email address and a matching strong new password", () => {
    expect(passwordResetRequestSchema.safeParse({ email: "admin@example.com" }).success).toBe(true);
    expect(passwordResetRequestSchema.safeParse({ email: "nope" }).success).toBe(false);
    expect(
      passwordResetSchema.safeParse({
        email: "admin@example.com",
        otp: "123456",
        password: "a-safe-password",
        confirmPassword: "a-safe-password",
      }).success,
    ).toBe(true);
    expect(
      passwordResetSchema.safeParse({
        email: "admin@example.com",
        otp: "invalid",
        password: "a-safe-password",
        confirmPassword: "different-password",
      }).success,
    ).toBe(false);
  });
});
