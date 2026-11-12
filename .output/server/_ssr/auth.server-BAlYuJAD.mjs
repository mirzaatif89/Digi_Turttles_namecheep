import { i as effectivePermissions, n as ADMIN_ROLES, r as ROLE_DEFAULTS, s as isAdminRole, t as ADMIN_MODULES } from "./permissions-DHA-rRIr.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as getDb, r as getEnvironmentValue } from "./db.server-BuqUzfMP.mjs";
import { a as getRequestIP$1, c as setResponseHeader, i as getCookie, r as deleteCookie$1, s as setCookie$1 } from "./server-Dm4tG5de.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.server-BAlYuJAD.js
async function countAdmins(db) {
	const [rows] = await db.query("SELECT COUNT(*) AS count FROM admin_users");
	return Number(rows[0]?.count ?? 0);
}
async function findAdminByEmail(db, email) {
	const [rows] = await db.query("SELECT * FROM admin_users WHERE email = ? LIMIT 1", [email]);
	return rows[0] ?? null;
}
async function findActiveAdminById(db, id) {
	const [rows] = await db.query("SELECT * FROM admin_users WHERE id = ? AND is_active = 1 LIMIT 1", [id]);
	return rows[0] ?? null;
}
async function createFirstSuperAdmin(db, admin) {
	await db.query("INSERT INTO admin_users (id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, 'super_admin', 1)", [
		admin.id,
		admin.name,
		admin.email,
		admin.passwordHash
	]);
}
async function updateLastLogin(db, id) {
	await db.query("UPDATE admin_users SET last_login_at = NOW() WHERE id = ?", [id]);
}
async function failedLoginCount(db, email, ipAddress) {
	const [rows] = await db.query("SELECT COUNT(*) AS count FROM admin_login_events WHERE email = ? AND ip_address = ? AND was_successful = 0 AND created_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)", [email, ipAddress]);
	return Number(rows[0]?.count ?? 0);
}
async function recordLoginEvent(db, event) {
	await db.query("INSERT INTO admin_login_events (admin_id, email, was_successful, ip_address) VALUES (?, ?, ?, ?)", [
		event.adminId,
		event.email,
		Number(event.successful),
		event.ipAddress
	]);
}
async function recentLoginEvents(db, limit = 8) {
	const [rows] = await db.query("SELECT e.id, e.email, e.was_successful, e.ip_address, e.created_at, u.name FROM admin_login_events e LEFT JOIN admin_users u ON e.admin_id = u.id ORDER BY e.created_at DESC LIMIT ?", [limit]);
	return rows;
}
var schemaPromise;
/** Creates the small auth/admin foundation without a migration file. */
async function ensureAdminSchema(db) {
	if (!schemaPromise) schemaPromise = createSchema(db);
	return schemaPromise;
}
async function createSchema(db) {
	await db.query(`CREATE TABLE IF NOT EXISTS admin_users (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'viewer',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    permissions JSON NULL,
    last_login_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
	await db.query(`CREATE TABLE IF NOT EXISTS admin_sessions (
    id CHAR(36) NOT NULL PRIMARY KEY,
    admin_id CHAR(36) NOT NULL,
    token_hash CHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_sessions_user FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
    INDEX idx_admin_sessions_expiry (expires_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
	await db.query(`CREATE TABLE IF NOT EXISTS admin_login_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id CHAR(36) NULL,
    email VARCHAR(254) NOT NULL,
    was_successful TINYINT(1) NOT NULL,
    ip_address VARCHAR(45) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_login_events_user FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_admin_login_rate (email, ip_address, created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
	await db.query(`CREATE TABLE IF NOT EXISTS role_permissions (
    role VARCHAR(32) NOT NULL,
    module VARCHAR(64) NOT NULL,
    can_view TINYINT(1) NOT NULL DEFAULT 0,
    can_create TINYINT(1) NOT NULL DEFAULT 0,
    can_edit TINYINT(1) NOT NULL DEFAULT 0,
    can_delete TINYINT(1) NOT NULL DEFAULT 0,
    can_publish TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (role, module)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
	await db.query(`CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id CHAR(36) NULL,
    module VARCHAR(64) NOT NULL,
    action VARCHAR(64) NOT NULL,
    record_id VARCHAR(255) NULL,
    summary VARCHAR(500) NOT NULL,
    ip_address VARCHAR(45) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_logs_user FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_audit_logs_created (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
	const seedRows = [];
	for (const role of ADMIN_ROLES) for (const module of ADMIN_MODULES) {
		const granted = ROLE_DEFAULTS[role][module];
		seedRows.push([
			role,
			module,
			Number(granted.view),
			Number(granted.create),
			Number(granted.edit),
			Number(granted.delete),
			Number(granted.publish)
		]);
	}
	await db.query(`INSERT IGNORE INTO role_permissions (role, module, can_view, can_create, can_edit, can_delete, can_publish) VALUES ?`, [seedRows]);
}
async function createAdminSession(db, session) {
	await db.query("INSERT INTO admin_sessions (id, admin_id, token_hash, expires_at) VALUES (?, ?, ?, ?)", [
		session.id,
		session.adminId,
		session.tokenHash,
		session.expiresAt
	]);
}
async function findLiveSession(db, tokenHash) {
	const [rows] = await db.query("SELECT * FROM admin_sessions WHERE token_hash = ? AND expires_at > NOW() LIMIT 1", [tokenHash]);
	return rows[0] ?? null;
}
async function deleteSessionByHash(db, tokenHash) {
	await db.query("DELETE FROM admin_sessions WHERE token_hash = ?", [tokenHash]);
}
async function pruneExpiredSessions(db) {
	await db.query("DELETE FROM admin_sessions WHERE expires_at <= NOW()");
}
var auth_server_exports = /* @__PURE__ */ __exportAll({
	getAdminSessionFromRequest: () => getAdminSessionFromRequest,
	loginWithPassword: () => loginWithPassword,
	logoutCurrentAdmin: () => logoutCurrentAdmin
});
var SESSION_COOKIE = "digiturtle_admin_session";
var SESSION_SECONDS = 43200;
function bytesToHex(bytes) {
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function uuid() {
	return crypto.randomUUID();
}
function newSessionToken() {
	const bytes = /* @__PURE__ */ new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return bytesToHex(bytes);
}
async function hashToken(token) {
	const bytes = new TextEncoder().encode(token);
	return bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)));
}
function requestIp() {
	return getRequestIP$1() ?? "unknown";
}
function decodeOverrides(value) {
	if (!value) return null;
	if (typeof value === "object") return value;
	try {
		const parsed = JSON.parse(value);
		return parsed && typeof parsed === "object" ? parsed : null;
	} catch {
		return null;
	}
}
function toSession(user) {
	if (!isAdminRole(user.role)) return null;
	return {
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role
		},
		permissions: effectivePermissions(user.role, decodeOverrides(user.permissions))
	};
}
async function bootstrapFirstAdmin() {
	const db = await getDb();
	await ensureAdminSchema(db);
	if (await countAdmins(db) > 0) return;
	const [name, email, password] = await Promise.all([
		getEnvironmentValue("ADMIN_NAME"),
		getEnvironmentValue("ADMIN_EMAIL"),
		getEnvironmentValue("ADMIN_PASSWORD")
	]);
	if (!name || !email || password.length < 8) throw new Error("Set ADMIN_NAME, ADMIN_EMAIL, and an ADMIN_PASSWORD of at least 8 characters to seed the first administrator.");
	const bcrypt = await import("../_libs/bcryptjs.mjs").then((n) => n.t);
	await createFirstSuperAdmin(db, {
		id: uuid(),
		name: name.trim(),
		email: email.trim().toLowerCase(),
		passwordHash: await bcrypt.hash(password, 12)
	});
}
var dummyHashPromise;
async function dummyHash() {
	if (!dummyHashPromise) dummyHashPromise = import("../_libs/bcryptjs.mjs").then((n) => n.t).then((bcrypt) => bcrypt.hash("DigiTurtles constant-time placeholder", 12));
	return dummyHashPromise;
}
function setAuthResponseHeaders() {
	setResponseHeader("cache-control", "no-store");
}
async function getAdminSessionFromRequest() {
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
async function loginWithPassword(input) {
	setAuthResponseHeaders();
	await bootstrapFirstAdmin();
	const db = await getDb();
	await pruneExpiredSessions(db);
	const email = input.email.trim().toLowerCase();
	const ipAddress = requestIp();
	const bcrypt = await import("../_libs/bcryptjs.mjs").then((n) => n.t);
	const rateLimited = await failedLoginCount(db, email, ipAddress) >= 5;
	const admin = rateLimited ? null : await findAdminByEmail(db, email);
	const passwordHash = admin?.password_hash ?? await dummyHash();
	if (!(await bcrypt.compare(input.password, passwordHash) && Boolean(admin?.is_active) && !rateLimited) || !admin) {
		await recordLoginEvent(db, {
			adminId: null,
			email,
			successful: false,
			ipAddress
		});
		return {
			ok: false,
			error: "Invalid email or password"
		};
	}
	const session = toSession(admin);
	if (!session) {
		await recordLoginEvent(db, {
			adminId: admin.id,
			email,
			successful: false,
			ipAddress
		});
		return {
			ok: false,
			error: "Invalid email or password"
		};
	}
	const token = newSessionToken();
	const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1e3);
	await createAdminSession(db, {
		id: uuid(),
		adminId: admin.id,
		tokenHash: await hashToken(token),
		expiresAt
	});
	await Promise.all([updateLastLogin(db, admin.id), recordLoginEvent(db, {
		adminId: admin.id,
		email,
		successful: true,
		ipAddress
	})]);
	setCookie$1(SESSION_COOKIE, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: true,
		path: "/",
		maxAge: SESSION_SECONDS
	});
	return {
		ok: true,
		session
	};
}
async function logoutCurrentAdmin() {
	setAuthResponseHeaders();
	const token = getCookie(SESSION_COOKIE);
	if (token) {
		const db = await getDb();
		await ensureAdminSchema(db);
		await deleteSessionByHash(db, await hashToken(token));
	}
	deleteCookie$1(SESSION_COOKIE, {
		httpOnly: true,
		sameSite: "lax",
		secure: true,
		path: "/"
	});
}
//#endregion
export { getAdminSessionFromRequest as n, recentLoginEvents as r, auth_server_exports as t };
