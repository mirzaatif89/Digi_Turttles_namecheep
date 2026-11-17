import { requirePermission } from "@/lib/permissions.server";
import { sectionModule, settingDefinition } from "./access";
import { findSection, mergeData, type Data } from "./schema";
import { validateFields, validateSetting } from "./inputs";
import { readStore, updateStore } from "./store.server";

export async function getSetting(key: string) {
  await requirePermission(sectionModule(key), "view");
  const def = settingDefinition(key);
  return mergeData(def.defaults, (await readStore()).settings[key]);
}

export async function saveSetting(key: string, value: Data) {
  await requirePermission(sectionModule(key), "edit");
  const validated = validateSetting(key, value);
  await updateStore((store) => {
    store.settings[key] = { ...store.settings[key], ...validated };
  });
  return { ok: true };
}

export async function listContent(collection: string) {
  await requirePermission(sectionModule(collection), "view");
  return ((await readStore()).items[collection] ?? []).sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveContent(input: {
  collection: string;
  id: string | null;
  value: Data;
  published: boolean;
}) {
  const module = sectionModule(input.collection);
  await requirePermission(module, input.id ? "edit" : "create");
  const def = findSection(input.collection);
  if (def?.kind !== "collection") throw new Error("Unknown collection.");
  const validated = validateFields(def.fields, input.value);
  if (!validated[def.titleField]?.trim()) throw new Error("A title is required.");
  // Publication is checked against the current record, inside the serialized write.
  const session = await requirePermission(module, "view");
  return updateStore((store) => {
    const items = (store.items[input.collection] ??= []);
    const current = input.id ? items.find((item) => item.id === input.id) : undefined;
    if (input.id && !current) throw new Error("This item no longer exists. Refresh the list.");
    if (input.published !== (current?.published ?? false) && !session.permissions[module].publish)
      throw new Error("You do not have permission to publish content.");
    if (current) {
      current.data = validated;
      current.published = input.published;
      return current;
    }
    const item = {
      id: crypto.randomUUID(),
      data: validated,
      published: input.published,
      sort_order: Math.max(-1, ...items.map((item) => item.sort_order)) + 1,
    };
    items.push(item);
    return item;
  });
}

export async function contentAction(input: {
  collection: string;
  id: string;
  action: "delete" | "duplicate" | "publish" | "up" | "down";
}) {
  const module = sectionModule(input.collection);
  const permission =
    input.action === "delete"
      ? "delete"
      : input.action === "duplicate"
        ? "create"
        : input.action === "publish"
          ? "publish"
          : "edit";
  await requirePermission(module, permission);
  const def = findSection(input.collection);
  if (def?.kind !== "collection") throw new Error("Unknown collection.");
  return updateStore((store) => {
    const items = (store.items[input.collection] ??= []).sort(
      (a, b) => a.sort_order - b.sort_order,
    );
    const index = items.findIndex((item) => item.id === input.id);
    const item = items[index];
    if (!item) throw new Error("This item no longer exists. Refresh the list.");
    if (input.action === "delete") items.splice(index, 1);
    if (input.action === "publish") item.published = !item.published;
    if (input.action === "duplicate")
      items.push({
        ...item,
        id: crypto.randomUUID(),
        published: false,
        data: { ...item.data, [def.titleField]: `${item.data[def.titleField] ?? ""} (copy)` },
      });
    if (input.action === "up" || input.action === "down") {
      const target = index + (input.action === "up" ? -1 : 1);
      if (items[target]) [items[index], items[target]] = [items[target]!, item];
    }
    items.forEach((item, i) => {
      item.sort_order = i;
    });
    return { ok: true };
  });
}

export async function dashboard() {
  const session = await requirePermission("dashboard", "view");
  const store = await readStore();
  const messages = session.permissions.messages.view ? store.messages : [];
  const collections = Object.entries(store.items).filter(
    ([key]) => session.permissions[sectionModule(key)].view,
  );
  return {
    unread: messages.filter((m) => !m.is_read).length,
    messages: messages.length,
    subscribers: session.permissions.subscribers.view ? store.subscribers.length : 0,
    items: collections.reduce((count, [, items]) => count + items.length, 0),
    perCollection: Object.fromEntries(
      collections.map(([key, items]) => [
        key,
        { total: items.length, visible: items.filter((item) => item.published).length },
      ]),
    ),
    latest: messages.slice(0, 5),
  };
}
