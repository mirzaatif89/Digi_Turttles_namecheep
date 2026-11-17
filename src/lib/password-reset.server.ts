import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { getRequestIP, setResponseHeader } from "@tanstack/react-start/server";
import type { RowDataPacket } from "mysql2/promise";
import { getDb } from "./db.server";
import { findAdminByEmail } from "./repos/admins.server";
import { ensureAdminSchema } from "./repos/schema.server";

const OTP_LENGTH = 6;
const OTP_MAX_ATTEMPTS = 5;
const OTP_TTL_MINUTES = 10;
const EMAIL_LIMIT = 3;
const IP_LIMIT = 10;

type PasswordResetRow = RowDataPacket & {
  id: string;
  admin_id: string;
  email: string;
  otp_hash: string;
  attempt_count: number;
  expires_at: Date;
};

function normalizedEmail(email: string): string {
  return email.trim().toLowerCase();
}

function resetSecret(): string {
  const secret = process.env["PASSWORD_RESET_SECRET"]?.trim() ?? "";
  if (secret.length < 32)
    throw new Error("Password recovery is not configured. Contact the site administrator.");
  return secret;
}

function smtpSettings() {
  const host = process.env["SMTP_HOST"]?.trim();
  const user = process.env["SMTP_USER"]?.trim();
  const password = process.env["SMTP_PASSWORD"];
  const from = process.env["SMTP_FROM"]?.trim() || user;
  const parsedPort = Number.parseInt(process.env["SMTP_PORT"] ?? "587", 10);
  const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 587;
  const secure = (process.env["SMTP_SECURE"] ?? "").toLowerCase() === "true" || port === 465;

  if (!host || !user || !password || !from)
    throw new Error("Password recovery email is not configured. Contact the site administrator.");
  return { host, port, secure, auth: { user, pass: password }, from };
}

export function createOtp(): string {
  return String(randomInt(0, 10 ** OTP_LENGTH)).padStart(OTP_LENGTH, "0");
}

export function hashOtp(resetId: string, email: string, otp: string, secret: string): string {
  return createHmac("sha256", secret).update(`${resetId}:${email}:${otp}`).digest("hex");
}

function hashesMatch(expected: string, actual: string): boolean {
  const left = Buffer.from(expected, "hex");
  const right = Buffer.from(actual, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

async function sendPasswordResetEmail(input: { email: string; otp: string }): Promise<void> {
  const nodemailer = await import("nodemailer");
  const smtp = smtpSettings();
  const transport = nodemailer.createTransport(smtp);
  await transport.sendMail({
    from: smtp.from,
    to: input.email,
    subject: "Your Digi Turtles admin password reset code",
    text: `Your Digi Turtles admin password reset code is ${input.otp}. It expires in ${OTP_TTL_MINUTES} minutes. If you did not request this, you can ignore this email.`,
    html: `<p>Your Digi Turtles admin password reset code is:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${input.otp}</p><p>This code expires in ${OTP_TTL_MINUTES} minutes. If you did not request it, you can ignore this email.</p>`,
  });
}

async function exceedsRequestLimit(
  db: Awaited<ReturnType<typeof getDb>>,
  email: string,
  ip: string,
) {
  const [rows] = await db.query<(RowDataPacket & { email_count: number; ip_count: number })[]>(
    `SELECT
      SUM(email = ?) AS email_count,
      SUM(requested_ip = ?) AS ip_count
     FROM admin_password_resets
     WHERE created_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)
       AND (email = ? OR requested_ip = ?)`,
    [email, ip, email, ip],
  );
  return (
    Number(rows[0]?.email_count ?? 0) >= EMAIL_LIMIT || Number(rows[0]?.ip_count ?? 0) >= IP_LIMIT
  );
}

export async function requestAdminPasswordReset(input: { email: string }) {
  setResponseHeader("cache-control", "no-store");
  const db = await getDb();
  await ensureAdminSchema(db);
  const email = normalizedEmail(input.email);
  const ip = getRequestIP() ?? "unknown";

  await db.query(
    "DELETE FROM admin_password_resets WHERE expires_at < DATE_SUB(NOW(), INTERVAL 1 DAY)",
  );

  if (await exceedsRequestLimit(db, email, ip)) return { ok: true };

  const admin = await findAdminByEmail(db, email);
  if (!admin?.is_active) return { ok: true };

  const otp = createOtp();
  const resetId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60_000);
  const otpHash = hashOtp(resetId, email, otp, resetSecret());
  await db.query(
    "INSERT INTO admin_password_resets (id, admin_id, email, otp_hash, requested_ip, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW(3))",
    [resetId, admin.id, email, otpHash, ip, expiresAt],
  );

  try {
    await sendPasswordResetEmail({ email, otp });
  } catch (error) {
    await db.query("DELETE FROM admin_password_resets WHERE id = ?", [resetId]);
    console.error("Password recovery email could not be sent.", error);
    throw new Error("Password recovery email could not be sent. Please try again later.");
  }
  return { ok: true };
}

export async function resetAdminPassword(input: {
  email: string;
  otp: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  setResponseHeader("cache-control", "no-store");
  const db = await getDb();
  await ensureAdminSchema(db);
  const email = normalizedEmail(input.email);
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query<PasswordResetRow[]>(
      `SELECT r.id, r.admin_id, r.email, r.otp_hash, r.attempt_count, r.expires_at
       FROM admin_password_resets r
       INNER JOIN admin_users u ON u.id = r.admin_id AND u.is_active = 1
       WHERE r.email = ?
       ORDER BY r.created_at DESC, r.id DESC
       LIMIT 1 FOR UPDATE`,
      [email],
    );
    const reset = rows[0];
    if (!reset || new Date(reset.expires_at).getTime() <= Date.now()) {
      await connection.rollback();
      return { ok: false, error: "The code is invalid or has expired. Request a new code." };
    }

    const submittedHash = hashOtp(reset.id, email, input.otp, resetSecret());
    if (!hashesMatch(reset.otp_hash, submittedHash)) {
      const attempts = Number(reset.attempt_count) + 1;
      if (attempts >= OTP_MAX_ATTEMPTS)
        await connection.query("DELETE FROM admin_password_resets WHERE admin_id = ?", [
          reset.admin_id,
        ]);
      else
        await connection.query("UPDATE admin_password_resets SET attempt_count = ? WHERE id = ?", [
          attempts,
          reset.id,
        ]);
      await connection.commit();
      return { ok: false, error: "The code is invalid or has expired. Request a new code." };
    }

    const bcrypt = await import("bcryptjs");
    await connection.query(
      "UPDATE admin_users SET password_hash = ? WHERE id = ? AND is_active = 1",
      [await bcrypt.hash(input.password, 12), reset.admin_id],
    );
    await connection.query("DELETE FROM admin_sessions WHERE admin_id = ?", [reset.admin_id]);
    await connection.query("DELETE FROM admin_password_resets WHERE admin_id = ?", [
      reset.admin_id,
    ]);
    await connection.query(
      "INSERT INTO audit_logs (admin_id, module, action, record_id, summary, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
      [
        reset.admin_id,
        "users",
        "password_reset",
        reset.admin_id,
        "Reset password using email verification code",
        getRequestIP() ?? "unknown",
      ],
    );
    await connection.commit();
    return { ok: true };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
