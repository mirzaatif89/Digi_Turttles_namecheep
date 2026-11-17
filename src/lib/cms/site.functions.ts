import { createServerFn } from "@tanstack/react-start";
import type { Data } from "./schema";

export type SiteItem = Data & { id: string };
export type SiteContentRaw = {
  ok: boolean;
  settings: Record<string, Data>;
  items: Record<string, SiteItem[]>;
};

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContentRaw> => {
    const { publicContent } = await import("./content.server");
    return publicContent();
  },
);
