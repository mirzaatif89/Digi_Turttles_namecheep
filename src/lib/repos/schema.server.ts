import type { Pool } from "mysql2/promise";
import { ADMIN_MODULES, ADMIN_ROLES, PERMISSION_ACTIONS, ROLE_DEFAULTS } from "../permissions";

let schemaPromise: Promise<void> | undefined;

/** Creates the small auth/admin foundation without a migration file. */
export async function ensureAdminSchema(db: Pool): Promise<void> {
  if (!schemaPromise) schemaPromise = createSchema(db);
  return schemaPromise;
}

async function createSchema(db: Pool): Promise<void> {
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

  const seedRows: Array<Array<string | number>> = [];
  for (const role of ADMIN_ROLES) {
    for (const module of ADMIN_MODULES) {
      const granted = ROLE_DEFAULTS[role][module];
      seedRows.push([
        role,
        module,
        Number(granted.view),
        Number(granted.create),
        Number(granted.edit),
        Number(granted.delete),
        Number(granted.publish),
      ]);
    }
  }
  const columns = "role, module, can_view, can_create, can_edit, can_delete, can_publish";
  await db.query(`INSERT IGNORE INTO role_permissions (${columns}) VALUES ?`, [seedRows]);
}

export const DEFAULT_PERMISSION_COLUMNS = PERMISSION_ACTIONS;
