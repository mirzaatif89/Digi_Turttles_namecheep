import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Pool } from "mysql2/promise";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ db: null as unknown }));
vi.mock("@/lib/db.server", () => ({ getDb: async () => mocks.db }));

import {
  defaultStore,
  readMedia,
  readStore,
  removeMedia,
  saveMedia,
  updateStore,
} from "./store.server";

type MediaRow = { content_type: string; content: Buffer };
let directory = "";

describe("MySQL-backed Sitekeeper storage", () => {
  afterEach(async () => {
    if (directory) await rm(directory, { recursive: true, force: true });
    directory = "";
    vi.unstubAllEnvs();
    mocks.db = null;
  });

  it("migrates existing content and images, then persists changes in MySQL", async () => {
    directory = await mkdtemp(join(tmpdir(), "sitekeeper-db-test-"));
    vi.stubEnv("SITEKEEPER_DATA_DIR", directory);
    const legacy = defaultStore();
    legacy.settings["migration-test"] = { title: "Keep existing data" };
    const legacyImage = {
      name: "00000000-0000-4000-8000-000000000002.png",
      originalName: "legacy.png",
      type: "image/png",
      size: 12,
      created_at: new Date().toISOString(),
    };
    legacy.media.push(legacyImage);
    await mkdir(join(directory, "media"), { recursive: true });
    await writeFile(join(directory, "content.json"), JSON.stringify(legacy));
    await writeFile(join(directory, "media", legacyImage.name), Buffer.from("legacy image"));

    let content: ReturnType<typeof defaultStore> | null = null;
    let legacyMediaImported = 0;
    const media = new Map<string, MediaRow>();
    const query = async (sql: string, params: unknown[] = []) => {
      if (sql.startsWith("INSERT IGNORE INTO sitekeeper_store")) {
        if (!content) {
          content = JSON.parse(String(params[0])) as ReturnType<typeof defaultStore>;
          legacyMediaImported = Number(params[1] ?? 0);
        }
        return [{ affectedRows: 1 }, []] as const;
      }
      if (sql.includes("SELECT content, legacy_media_imported FROM sitekeeper_store")) {
        return [
          content ? [{ content, legacy_media_imported: legacyMediaImported }] : [],
          [],
        ] as const;
      }
      if (sql.startsWith("UPDATE sitekeeper_store SET legacy_media_imported")) {
        legacyMediaImported = 1;
        return [{ affectedRows: 1 }, []] as const;
      }
      if (sql.startsWith("UPDATE sitekeeper_store SET content")) {
        content = JSON.parse(String(params[0])) as ReturnType<typeof defaultStore>;
        return [{ affectedRows: 1 }, []] as const;
      }
      if (sql.startsWith("SELECT name FROM sitekeeper_media")) {
        return [media.has(String(params[0])) ? [{ name: params[0] }] : [], []] as const;
      }
      if (sql.startsWith("INSERT IGNORE INTO sitekeeper_media")) {
        media.set(String(params[0]), {
          content_type: String(params[1]),
          content: Buffer.from(params[2] as Uint8Array),
        });
        return [{ affectedRows: 1 }, []] as const;
      }
      if (sql.startsWith("INSERT INTO sitekeeper_media")) {
        media.set(String(params[0]), {
          content_type: String(params[1]),
          content: Buffer.from(params[2] as Uint8Array),
        });
        return [{ affectedRows: 1 }, []] as const;
      }
      if (sql.startsWith("SELECT content_type, content FROM sitekeeper_media")) {
        const row = media.get(String(params[0]));
        return [row ? [row] : [], []] as const;
      }
      if (sql.startsWith("DELETE FROM sitekeeper_media")) {
        media.delete(String(params[0]));
        return [{ affectedRows: 1 }, []] as const;
      }
      return [[], []] as const;
    };
    const connection = {
      query,
      beginTransaction: async () => {},
      commit: async () => {},
      rollback: async () => {},
      release: () => {},
    };
    mocks.db = {
      query,
      getConnection: async () => connection,
    } as unknown as Pool;

    expect((await readStore()).settings["migration-test"]).toEqual({
      title: "Keep existing data",
    });
    expect(await readMedia(legacyImage.name)).toEqual({
      type: "image/png",
      bytes: Buffer.from("legacy image"),
    });
    await updateStore((store) => {
      store.settings["test-storage"] = { title: "Saved in MySQL" };
    });
    expect((await readStore()).settings["test-storage"]).toEqual({ title: "Saved in MySQL" });

    const bytes = Buffer.from("stored image bytes");
    const image = {
      name: "00000000-0000-4000-8000-000000000001.png",
      originalName: "test.png",
      type: "image/png",
      size: bytes.length,
      created_at: new Date().toISOString(),
    };
    await saveMedia(image, bytes);
    expect(await readMedia(image.name)).toEqual({ type: "image/png", bytes });
    await removeMedia(image.name);
    expect(await readMedia(image.name)).toBeNull();
    expect((await readStore()).media).not.toContainEqual(image);
  });
});
