import type { Pool } from "mysql2/promise";
import { describe, expect, it, vi } from "vitest";
import { ensureEnvironmentSuperAdmin } from "./admins.server";

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
      if (sql.includes("SELECT state_value")) return [[{ state_value: stateValue }], []] as const;
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
    expect(connection.commit).toHaveBeenCalledOnce();
  });

  it("does not overwrite a password changed after the initial environment sync", async () => {
    const { calls, connection, db } = fakeDatabase("admin@example.test", "existing-admin");

    await ensureEnvironmentSuperAdmin(db, {
      id: "unused",
      name: "Site Admin",
      email: "admin@example.test",
      passwordHash: null,
    });

    expect(
      calls.some(({ sql }) => sql.includes("UPDATE admin_users") && sql.includes("password_hash")),
    ).toBe(false);
    expect(calls.some(({ sql }) => sql.includes("DELETE FROM admin_sessions"))).toBe(false);
    expect(connection.commit).toHaveBeenCalledOnce();
  });
});
