import {
  deleteCookie,
  getCookie,
  getRequestIP,
  setCookie,
  setResponseHeader,
} from "@tanstack/react-start/server";
import { getDb, getEnvironmentValue } from "./db.server";
import {
  effectivePermissions,
  isAdminRole,
  type AdminRole,
  type PermissionMap,
  type PermissionOverrides,
} from "./permissions";
import type { AdminSession } from "./auth.types";
import {
  createFirstSuperAdmin,
  countAdmins,
  findActiveAdminById,
  findAdminByEmail,
  updateLastLogin,
  type AdminUserRow,
} from "./repos/admins.server";
import { recordLoginEvent, failedLoginCount } from "./repos/login-events.server";
import { ensureAdminSchema } from "./repos/schema.server";
import {
  createAdminSession,
  deleteSessionByHash,
  findLiveSession,
  pruneExpiredSessions,
} from "./repos/sessions.server";

const SESSION_COOKIE = "digiturtle_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;

export type { AdminSession } from "./auth.types";

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function uuid(): string {
  return crypto.randomUUID();
}

function newSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

async function hashToken(token: string): Promise<string> {
  const bytes = new TextEncoder().encode(token);
  return bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)));
}

function requestIp(): string {
  // Do not trust X-Forwarded-For unless the hosting proxy has made it trustworthy.
  return getRequestIP() ?? "unknown";
}

function decodeOverrides(value: AdminUserRow["permissions"]): PermissionOverrides | null {
  if (!value) return null;
  if (typeof value === "object") return value;
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" ? (parsed as PermissionOverrides) : null;
  } catch {
    return null;
  }
}

function toSession(user: AdminUserRow): AdminSession | null {
  if (!isAdminRole(user.role)) return null;
  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    permissions: effectivePermissions(user.role, decodeOverrides(user.permissions)),
  };
}

async function bootstrapFirstAdmin(): Promise<void> {
  const db = await getDb();
  await ensureAdminSchema(db);
  if ((await countAdmins(db)) > 0) return;

  const [name, email, password] = await Promise.all([
    getEnvironmentValue("ADMIN_NAME"),
    getEnvironmentValue("ADMIN_EMAIL"),
    getEnvironmentValue("ADMIN_PASSWORD"),
  ]);
  if (!name || !email || password.length < 8) {
    throw new Error(
      "Set ADMIN_NAME, ADMIN_EMAIL, and an ADMIN_PASSWORD of at least 8 characters to seed the first administrator.",
    );
  }
  const bcrypt = await import("bcryptjs");
  await createFirstSuperAdmin(db, {
    id: uuid(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: await bcrypt.hash(password, 12),
  });
}

let dummyHashPromise: Promise<string> | undefined;
async function dummyHash(): Promise<string> {
  if (!dummyHashPromise) {
    dummyHashPromise = import("bcryptjs").then((bcrypt) =>
      bcrypt.hash("DigiTurtles constant-time placeholder", 12),
    );
  }
  return dummyHashPromise;
}

function setAuthResponseHeaders(): void {
  setResponseHeader("cache-control", "no-store");
}

export async function getAdminSessionFromRequest(): Promise<AdminSession | null> {
  setAuthResponseHeaders();
  const token = getCookie(SESSION_COOKIE);
  if (!token) return null;
  const db = await getDb();
  await ensureAdminSchema(db);
  const session = await findLiveSession(db, await hashToken(token));
  if (!session) return null;
  const admin = await findActiveAdminById(db, session.admin_id);
  return admin ? toSession(admin) : null;
}

export async function loginWithPassword(input: {
  email: string;
  password: string;
}): Promise<{ ok: true; session: AdminSession } | { ok: false; error: string }> {
  setAuthResponseHeaders();
  await bootstrapFirstAdmin();
  const db = await getDb();
  await pruneExpiredSessions(db);
  const email = input.email.trim().toLowerCase();
  const ipAddress = requestIp();
  const bcrypt = await import("bcryptjs");
  const rateLimited = (await failedLoginCount(db, email, ipAddress)) >= 5;
  const admin = rateLimited ? null : await findAdminByEmail(db, email);
  const passwordHash = admin?.password_hash ?? (await dummyHash());
  const isValid =
    (await bcrypt.compare(input.password, passwordHash)) &&
    Boolean(admin?.is_active) &&
    !rateLimited;

  if (!isValid || !admin) {
    await recordLoginEvent(db, { adminId: null, email, successful: false, ipAddress });
    return { ok: false, error: "Invalid email or password" };
  }

  const session = toSession(admin);
  if (!session) {
    await recordLoginEvent(db, {
      adminId: admin.id,
      email,
      successful: false,
      ipAddress,
    });
    return { ok: false, error: "Invalid email or password" };
  }

  const token = newSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);
  await createAdminSession(db, {
    id: uuid(),
    adminId: admin.id,
    tokenHash: await hashToken(token),
    expiresAt,
  });
  await Promise.all([
    updateLastLogin(db, admin.id),
    recordLoginEvent(db, { adminId: admin.id, email, successful: true, ipAddress }),
  ]);
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env["NODE_ENV"] === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return { ok: true, session };
}

export async function logoutCurrentAdmin(): Promise<void> {
  setAuthResponseHeaders();
  const token = getCookie(SESSION_COOKIE);
  if (token) {
    const db = await getDb();
    await ensureAdminSchema(db);
    await deleteSessionByHash(db, await hashToken(token));
  }
  deleteCookie(SESSION_COOKIE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env["NODE_ENV"] === "production",
    path: "/",
  });
}
