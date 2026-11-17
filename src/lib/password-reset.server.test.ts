import { describe, expect, it } from "vitest";
import { createOtp, hashOtp } from "./password-reset.server";

describe("password reset OTP helpers", () => {
  it("creates a six digit code, including possible leading zeroes", () => {
    expect(createOtp()).toMatch(/^\d{6}$/);
  });

  it("binds a code hash to the reset request, email, and application secret", () => {
    const secret = "this-is-a-long-secret-for-password-reset-tests";
    const hash = hashOtp("reset-1", "admin@example.com", "123456", secret);
    expect(hash).toHaveLength(64);
    expect(hash).not.toBe(hashOtp("reset-1", "admin@example.com", "654321", secret));
    expect(hash).not.toBe(hashOtp("reset-2", "admin@example.com", "123456", secret));
  });
});
