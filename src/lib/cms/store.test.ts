import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { defaultStore, readStore, updateStore } from "./store.server";

let directory: string;
beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), "digiturtle-cms-"));
});
afterEach(async () => {
  if (!directory.startsWith(join(tmpdir(), "digiturtle-cms-")))
    throw new Error("Invalid test directory");
  await rm(directory, { recursive: true, force: true });
});

describe("persistent content storage", () => {
  it("keeps seed item IDs stable until the first save", () => {
    expect(defaultStore().items["services"]).toEqual(defaultStore().items["services"]);
  });
  it("serializes concurrent saves without losing either change", async () => {
    await Promise.all(
      Array.from({ length: 8 }, (_, i) =>
        updateStore((store) => {
          store.settings[`test-${i}`] = { title: String(i) };
        }, directory),
      ),
    );
    const saved = await readStore(directory);
    for (let i = 0; i < 8; i++) expect(saved.settings[`test-${i}`]?.["title"]).toBe(String(i));
  });
  it("preserves deliberately empty collections across reads and writes", async () => {
    await updateStore((store) => {
      store.items["services"] = [];
    }, directory);
    expect((await readStore(directory)).items["services"]).toEqual([]);
  });
  it("does not overwrite the last saved snapshot if a mutation fails", async () => {
    await updateStore((store) => {
      store.settings["hero"] = { title: "Saved" };
    }, directory);
    await expect(
      updateStore((store) => {
        store.settings["hero"] = { title: "Broken" };
        throw new Error("Rejected");
      }, directory),
    ).rejects.toThrow("Rejected");
    expect((await readStore(directory)).settings["hero"]).toEqual({ title: "Saved" });
  });
  it("refuses to replace a corrupt content file with defaults", async () => {
    await writeFile(join(directory, "content.json"), "invalid-json");
    await expect(updateStore(() => {}, directory)).rejects.toThrow();
    expect(await readFile(join(directory, "content.json"), "utf8")).toBe("invalid-json");
  });
});
