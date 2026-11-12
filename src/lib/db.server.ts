import type { Pool } from "mysql2/promise";

let poolPromise: Promise<Pool> | undefined;
let dotenvLoaded = false;

async function loadEnvironment() {
  if (dotenvLoaded) return;
  dotenvLoaded = true;
  // This module is imported only from server-function handlers. Keeping dotenv
  // dynamic prevents it (and DB configuration) from entering browser chunks.
  const dotenv = await import("dotenv");
  dotenv.config({ quiet: true });
}

function required(name: "DB_HOST" | "DB_NAME" | "DB_USER" | "DB_PASSWORD"): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} for admin authentication.`);
  return value;
}

/** A process-wide MySQL pool. Never import this module from a client component. */
export async function getDb(): Promise<Pool> {
  if (!poolPromise) {
    poolPromise = (async () => {
      await loadEnvironment();
      const mysql = await import("mysql2/promise");
      const port = Number.parseInt(process.env["DB_PORT"] ?? "3306", 10);
      return mysql.createPool({
        host: required("DB_HOST"),
        port: Number.isFinite(port) ? port : 3306,
        database: required("DB_NAME"),
        user: required("DB_USER"),
        password: required("DB_PASSWORD"),
        charset: "utf8mb4",
        waitForConnections: true,
        connectionLimit: 8,
        enableKeepAlive: true,
      });
    })();
  }
  return poolPromise;
}

export async function getEnvironmentValue(name: "ADMIN_NAME" | "ADMIN_EMAIL" | "ADMIN_PASSWORD") {
  await loadEnvironment();
  return process.env[name] ?? "";
}
