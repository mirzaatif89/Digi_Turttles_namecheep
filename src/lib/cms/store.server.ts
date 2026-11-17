import { mkdir, readFile, rename, rm, rmdir, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";
import type { Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import { getDb } from "@/lib/db.server";
import { COLLECTIONS, settingsDefaults } from "./schema";
import type { CmsStore, MediaFile } from "./types";

type StoreRow = RowDataPacket & {
  content: unknown;
  legacy_media_imported: number;
};
type MediaRow = RowDataPacket & { content_type: string; content: Buffer };

let schemaPromise: Promise<void> | undefined;

// Keep the legacy import source and tests outside the generated .output directory.
export function dataDirectory(): string {
  return resolve(process.env["SITEKEEPER_DATA_DIR"] || join(process.cwd(), ".data", "sitekeeper"));
}

export function defaultStore(): CmsStore {
  return {
    version: 1,
    settings: structuredClone(settingsDefaults()),
    items: Object.fromEntries(
      COLLECTIONS.map((collection) => [
        collection.key,
        collection.defaults.map((data, sort_order) => ({
          id: defaultId(collection.key, sort_order),
          data: { ...data },
          sort_order,
          published: true,
        })),
      ]),
    ),
    messages: [],
    subscribers: [],
    media: [],
    submissions: [],
  };
}

function defaultId(collection: string, index: number): string {
  const hex = createHash("sha256").update(`sitekeeper:${collection}:${index}`).digest("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-8${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

function validateStore(data: unknown): CmsStore {
  if (!data || typeof data !== "object")
    throw new Error("The Sitekeeper content record is invalid.");
  const store = data as Partial<CmsStore>;
  if (
    store.version !== 1 ||
    !store.settings ||
    !store.items ||
    !Array.isArray(store.messages) ||
    !Array.isArray(store.subscribers) ||
    !Array.isArray(store.media) ||
    !Array.isArray(store.submissions)
  )
    throw new Error("The Sitekeeper content record is invalid. Restore a backup before saving.");
  return store as CmsStore;
}

async function readFileStore(directory: string): Promise<CmsStore> {
  try {
    return validateStore(JSON.parse(await readFile(join(directory, "content.json"), "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return defaultStore();
    throw error;
  }
}

async function findLegacyStore(): Promise<{ store: CmsStore; directory: string }> {
  const candidates = [
    ...new Set([dataDirectory(), resolve(join(process.cwd(), ".data", "sitekeeper"))]),
  ];
  for (const directory of candidates) {
    try {
      await stat(join(directory, "content.json"));
      return { store: await readFileStore(directory), directory };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return { store: defaultStore(), directory: dataDirectory() };
}

async function createDatabaseSchema(db: Pool): Promise<void> {
  await db.query(`CREATE TABLE IF NOT EXISTS sitekeeper_store (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
    content JSON NOT NULL,
    legacy_media_imported TINYINT(1) NOT NULL DEFAULT 0,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
  await db.query(`CREATE TABLE IF NOT EXISTS sitekeeper_media (
    name VARCHAR(64) NOT NULL PRIMARY KEY,
    content_type VARCHAR(40) NOT NULL,
    content LONGBLOB NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
  await ensureDatabaseColumns(db, "sitekeeper_store", {
    content: "JSON NOT NULL",
    legacy_media_imported: "TINYINT(1) NOT NULL DEFAULT 0",
    updated_at: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  });
  await ensureDatabaseColumns(db, "sitekeeper_media", {
    content_type: "VARCHAR(40) NOT NULL",
    content: "LONGBLOB NOT NULL",
    created_at: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [existing] = await connection.query<StoreRow[]>(
      "SELECT content, legacy_media_imported FROM sitekeeper_store WHERE id = 1 FOR UPDATE",
    );
    if (!existing[0]) {
      const legacy = await findLegacyStore();
      await connection.query(
        "INSERT IGNORE INTO sitekeeper_store (id, content, legacy_media_imported) VALUES (1, ?, 0)",
        [JSON.stringify(legacy.store)],
      );
    }
    const [rows] = await connection.query<StoreRow[]>(
      "SELECT content, legacy_media_imported FROM sitekeeper_store WHERE id = 1 FOR UPDATE",
    );
    const row = rows[0];
    if (!row) throw new Error("Could not initialize the Sitekeeper database record.");
    const store = parseStore(row.content);
    if (!row.legacy_media_imported) {
      const candidates = [
        ...new Set([dataDirectory(), resolve(join(process.cwd(), ".data", "sitekeeper"))]),
      ];
      for (const media of store.media) {
        const [mediaRows] = await connection.query<RowDataPacket[]>(
          "SELECT name FROM sitekeeper_media WHERE name = ? LIMIT 1",
          [media.name],
        );
        if (mediaRows.length) continue;

        let bytes: Buffer | undefined;
        for (const directory of candidates) {
          try {
            bytes = await readFile(join(directory, "media", media.name));
            break;
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
          }
        }
        if (!bytes)
          throw new Error(
            `Could not migrate uploaded image "${media.name}" into MySQL because its server file is missing.`,
          );
        await connection.query(
          "INSERT IGNORE INTO sitekeeper_media (name, content_type, content) VALUES (?, ?, ?)",
          [media.name, media.type, bytes],
        );
      }
      await connection.query("UPDATE sitekeeper_store SET legacy_media_imported = 1 WHERE id = 1");
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/** A prior deployment may have created an earlier version of these tables. */
async function ensureDatabaseColumns(
  db: Pool,
  table: "sitekeeper_store" | "sitekeeper_media",
  columns: Record<string, string>,
): Promise<void> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT COLUMN_NAME AS column_name FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?",
    [table],
  );
  const existing = new Set(rows.map((row) => String(row["column_name"])));
  for (const [name, definition] of Object.entries(columns)) {
    if (!existing.has(name))
      await db.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${name}\` ${definition}`);
  }
}

async function ensureDatabaseSchema(db: Pool): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = createDatabaseSchema(db).catch((error: unknown) => {
      schemaPromise = undefined;
      throw error;
    });
  }
  return schemaPromise;
}

function parseStore(value: unknown): CmsStore {
  return validateStore(typeof value === "string" ? JSON.parse(value) : value);
}

async function readDatabaseStore(db: Pool): Promise<CmsStore> {
  await ensureDatabaseSchema(db);
  const [rows] = await db.query<StoreRow[]>(
    "SELECT content, legacy_media_imported FROM sitekeeper_store WHERE id = 1",
  );
  if (!rows[0]) throw new Error("The Sitekeeper database record is missing.");
  return parseStore(rows[0].content);
}

async function readDatabaseStoreForUpdate(connection: PoolConnection): Promise<CmsStore> {
  const [rows] = await connection.query<StoreRow[]>(
    "SELECT content, legacy_media_imported FROM sitekeeper_store WHERE id = 1 FOR UPDATE",
  );
  if (!rows[0]) throw new Error("The Sitekeeper database record is missing.");
  return parseStore(rows[0].content);
}

async function updateDatabaseStore<T>(change: (store: CmsStore) => T): Promise<T> {
  const db = await getDb();
  await ensureDatabaseSchema(db);
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const store = await readDatabaseStoreForUpdate(connection);
    const result = change(store);
    await connection.query("UPDATE sitekeeper_store SET content = ? WHERE id = 1", [
      JSON.stringify(store),
    ]);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/** An explicit directory selects the isolated file adapter used by storage tests. */
export async function readStore(directory?: string): Promise<CmsStore> {
  if (directory !== undefined) return readFileStore(directory);
  return readDatabaseStore(await getDb());
}

async function updateFileStore<T>(change: (store: CmsStore) => T, directory: string): Promise<T> {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const lock = join(directory, ".write-lock");
  const deadline = Date.now() + 5000;
  while (true) {
    try {
      await mkdir(lock);
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      try {
        if (Date.now() - (await stat(lock)).mtimeMs > 60_000) await rmdir(lock);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      if (Date.now() > deadline)
        throw new Error("Another content save is in progress. Please try again.");
      await new Promise((done) => setTimeout(done, 25));
    }
  }
  const temporary = join(directory, `${crypto.randomUUID()}.tmp`);
  try {
    const store = await readFileStore(directory);
    const result = change(store);
    await writeFile(temporary, JSON.stringify(store), { mode: 0o600 });
    await rename(temporary, join(directory, "content.json"));
    return result;
  } finally {
    await rm(temporary, { force: true });
    await rmdir(lock);
  }
}

export async function updateStore<T>(
  change: (store: CmsStore) => T,
  directory?: string,
): Promise<T> {
  if (directory !== undefined) return updateFileStore(change, directory);
  return updateDatabaseStore(change);
}

export async function saveMedia(media: MediaFile, bytes: Buffer): Promise<void> {
  const db = await getDb();
  await ensureDatabaseSchema(db);
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const store = await readDatabaseStoreForUpdate(connection);
    await connection.query(
      "INSERT INTO sitekeeper_media (name, content_type, content) VALUES (?, ?, ?)",
      [media.name, media.type, bytes],
    );
    store.media.unshift(media);
    await connection.query("UPDATE sitekeeper_store SET content = ? WHERE id = 1", [
      JSON.stringify(store),
    ]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function removeMedia(name: string): Promise<void> {
  const db = await getDb();
  await ensureDatabaseSchema(db);
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const store = await readDatabaseStoreForUpdate(connection);
    store.media = store.media.filter((media) => media.name !== name);
    await connection.query("DELETE FROM sitekeeper_media WHERE name = ?", [name]);
    await connection.query("UPDATE sitekeeper_store SET content = ? WHERE id = 1", [
      JSON.stringify(store),
    ]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function readMedia(name: string): Promise<{ type: string; bytes: Buffer } | null> {
  const db = await getDb();
  await ensureDatabaseSchema(db);
  const [rows] = await db.query<MediaRow[]>(
    "SELECT content_type, content FROM sitekeeper_media WHERE name = ? LIMIT 1",
    [name],
  );
  return rows[0] ? { type: rows[0].content_type, bytes: rows[0].content } : null;
}
