import { mkdir, readFile, rename, rm, rmdir, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";
import { COLLECTIONS, settingsDefaults } from "./schema";
import type { CmsStore } from "./types";

// Keep uploads and content outside .output so a cPanel rebuild cannot erase them.
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

export async function readStore(directory = dataDirectory()): Promise<CmsStore> {
  try {
    const data = JSON.parse(await readFile(join(directory, "content.json"), "utf8")) as CmsStore;
    if (
      data.version !== 1 ||
      !data.settings ||
      !data.items ||
      !Array.isArray(data.messages) ||
      !Array.isArray(data.subscribers) ||
      !Array.isArray(data.media) ||
      !Array.isArray(data.submissions)
    )
      throw new Error("The Sitekeeper content file is invalid. Restore a backup before saving.");
    return data;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return defaultStore();
    throw error;
  }
}

/** A filesystem lock serializes writers across Node workers; readers see an atomic snapshot. */
export async function updateStore<T>(
  change: (store: CmsStore) => T,
  directory = dataDirectory(),
): Promise<T> {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const lock = join(directory, ".write-lock");
  const deadline = Date.now() + 5000;
  while (true) {
    try {
      await mkdir(lock);
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      // Recover a lock left by a terminated process. Writes below are local and synchronous.
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
    const store = await readStore(directory);
    const result = change(store);
    await writeFile(temporary, JSON.stringify(store), { mode: 0o600 });
    await rename(temporary, join(directory, "content.json"));
    return result;
  } finally {
    await rm(temporary, { force: true });
    await rmdir(lock);
  }
}
