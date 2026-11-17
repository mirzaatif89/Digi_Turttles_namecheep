import { queryOptions } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { COLLECTIONS, headingKey, mergeData, settingsDefaults, type Data } from "./schema";
import { getSiteContent, type SiteContentRaw, type SiteItem } from "./site.functions";

export const SITE_CONTENT_KEY = ["site-content"] as const;

export const siteContentQuery = queryOptions({
  queryKey: SITE_CONTENT_KEY,
  queryFn: () => getSiteContent(),
  staleTime: 30_000,
});

export type Site = {
  get(key: string): Data;
  heading(collection: string): Data;
  list(collection: string): SiteItem[];
};

/** Saved values win; defaults fill gaps. Lists fall back to defaults only if loading failed. */
export function resolveSite(raw: SiteContentRaw | undefined): Site {
  const defaults = settingsDefaults();
  return {
    get: (key) => mergeData(defaults[key] ?? {}, raw?.settings[key]),
    heading: (collection) =>
      mergeData(defaults[headingKey(collection)] ?? {}, raw?.settings[headingKey(collection)]),
    list: (collection) => {
      if (raw?.ok) return raw.items[collection] ?? [];
      const def = COLLECTIONS.find((c) => c.key === collection)?.defaults ?? [];
      return def.map((d, i) => ({ ...d, id: `default-${collection}-${i}` }));
    },
  };
}

export const SiteContext = createContext<Site>(resolveSite(undefined));
export const useSite = () => useContext(SiteContext);
