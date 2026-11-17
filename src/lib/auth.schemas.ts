import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
  password: z.string().min(1, "Enter your password.").max(1024),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
});

export const passwordResetSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email address.").max(254),
    otp: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Enter the 6-digit code from your email."),
    password: z
      .string()
      .min(8, "Your new password must be at least 8 characters.")
      .max(128, "Your new password is too long."),
    confirmPassword: z.string().max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  });

export const redirectSchema = z.string().max(2048).optional();

/** Only same-origin absolute paths are accepted; `//host` is deliberately rejected. */
export function sanitizeRedirect(value: string | undefined | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\"))
    return "/admin";
  return value;
}
