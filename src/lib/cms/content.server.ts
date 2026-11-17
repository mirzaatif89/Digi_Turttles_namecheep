import { readStore } from "./store.server";
import type { SiteContentRaw } from "./site.functions";

export async function publicContent(): Promise<SiteContentRaw> {
  try {
    const store = await readStore();
    return {
      ok: true,
      settings: store.settings,
      items: Object.fromEntries(
        Object.entries(store.items).map(([key, items]) => [
          key,
          items
            .filter((item) => item.published)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((item) => ({ ...item.data, id: item.id })),
        ]),
      ),
    };
  } catch (error) {
    console.error("Unable to load Sitekeeper content", error);
    return { ok: false, settings: {}, items: {} };
  }
}
