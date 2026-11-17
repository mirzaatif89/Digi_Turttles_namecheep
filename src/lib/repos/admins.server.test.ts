import type { Pool } from "mysql2/promise";
import { describe, expect, it, vi } from "vitest";
import { ensureEnvironmentSuperAdmin, needsEnvironmentAdminCredentialSync } from "./admins.server";

type QueryCall = { sql: string; params: unknown[] };

function fakeDatabase(stateValue: string, adminId: string | null) {
  const calls: QueryCall[] = [];
  const connection = {
    beginTransaction: vi.fn(async () => {}),
    commit: vi.fn(async () => {}),
    rollback: vi.fn(async () => {}),
    release: vi.fn(),
    query: vi.fn(async (sql: string, params: unknown[] = []) => {
      calls.push({ sql, params });
      if (sql.includes("SELECT state_key, state_value")) {
        return [
          [
            { state_key: "environment_super_admin_email", state_value: stateValue },
            { state_key: "environment_super_admin_password", state_value: "stored-hash" },
          ],
          [],
        ] as const;
      }
      if (sql.includes("SELECT id FROM admin_users"))
        return [adminId ? [{ id: adminId }] : [], []] as const;
      return [{ affectedRows: 1 }, []] as const;
    }),
  };
  const db = { getConnection: async () => connection } as unknown as Pool;
  return { calls, connection, db };
}

describe("environment super-admin bootstrap", () => {
  it("promotes an existing account and syncs its .env password once", async () => {
    const { calls, connection, db } = fakeDatabase("", "existing-admin");

    await ensureEnvironmentSuperAdmin(db, {
      id: "unused",
      name: "Site Admin",
      email: "admin@example.test",
      passwordHash: "environment-password-hash",
      credentialsChanged: true,
    });

    expect(
      calls.some(
        ({ sql, params }) =>
          sql.includes("UPDATE admin_users") &&
          sql.includes("password_hash") &&
          params.includes("environment-password-hash"),
      ),
    ).toBe(true);
    expect(calls.some(({ sql }) => sql.includes("DELETE FROM admin_sessions"))).toBe(true);
    expect(calls.some(({ sql }) => sql.includes("DELETE FROM admin_login_events"))).toBe(true);
    expect(connection.commit).toHaveBeenCalledOnce();
  });

  it("does not overwrite a password changed after the initial environment sync", async () => {
    const { calls, connection, db } = fakeDatabase("admin@example.test", "existing-admin");

    await ensureEnvironmentSuperAdmin(db, {
      id: "unused",
      name: "Site Admin",
      email: "admin@example.test",
      passwordHash: null,
      credentialsChanged: false,
    });

    expect(
      calls.some(({ sql }) => sql.includes("UPDATE admin_users") && sql.includes("password_hash")),
    ).toBe(false);
    expect(calls.some(({ sql }) => sql.includes("DELETE FROM admin_sessions"))).toBe(false);
    expect(connection.commit).toHaveBeenCalledOnce();
  });

  it("detects a cPanel environment password change", async () => {
    const bcrypt = await import("bcryptjs");
    const storedHash = await bcrypt.hash("current-environment-password", 4);
    const query = vi.fn(async (sql: string) => {
      if (sql.includes("SELECT state_key, state_value")) {
        return [
          [
            { state_key: "environment_super_admin_email", state_value: "admin@example.test" },
            { state_key: "environment_super_admin_password", state_value: storedHash },
          ],
          [],
        ] as const;
      }
      if (sql.includes("SELECT * FROM admin_users")) return [[{ id: "admin-id" }], []] as const;
      throw new Error(`Unexpected query: ${sql}`);
    });
    const db = { query } as unknown as Pool;

    await expect(
      needsEnvironmentAdminCredentialSync(db, "admin@example.test", "new-environment-password"),
    ).resolves.toBe(true);
    await expect(
      needsEnvironmentAdminCredentialSync(db, "admin@example.test", "current-environment-password"),
    ).resolves.toBe(false);
  });
});
