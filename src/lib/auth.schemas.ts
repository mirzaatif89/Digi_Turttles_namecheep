import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
  password: z.string().min(1, "Enter your password.").max(1024),
});

export const redirectSchema = z.string().max(2048).optional();

/** Only same-origin absolute paths are accepted; `//host` is deliberately rejected. */
export function sanitizeRedirect(value: string | undefined | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\"))
    return "/admin";
  return value;
}
