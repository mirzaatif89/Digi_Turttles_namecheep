import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { collectionKey, dataInput, recordId } from "./inputs";

export const getSetting = createServerFn({ method: "GET" })
  .validator(z.object({ key: z.string().max(64) }))
  .handler(async ({ data }) => (await import("./admin.server")).getSetting(data.key));
export const saveSetting = createServerFn({ method: "POST" })
  .validator(z.object({ key: z.string().max(64), value: dataInput }))
  .handler(async ({ data }) => (await import("./admin.server")).saveSetting(data.key, data.value));
export const listContent = createServerFn({ method: "GET" })
  .validator(z.object({ collection: collectionKey }))
  .handler(async ({ data }) => (await import("./admin.server")).listContent(data.collection));
export const saveContent = createServerFn({ method: "POST" })
  .validator(
    z.object({
      collection: collectionKey,
      id: recordId.nullable(),
      value: dataInput,
      published: z.boolean(),
    }),
  )
  .handler(async ({ data }) => (await import("./admin.server")).saveContent(data));
export const contentAction = createServerFn({ method: "POST" })
  .validator(
    z.object({
      collection: collectionKey,
      id: recordId,
      action: z.enum(["delete", "duplicate", "publish", "up", "down"]),
    }),
  )
  .handler(async ({ data }) => (await import("./admin.server")).contentAction(data));
export const getCmsDashboard = createServerFn({ method: "GET" }).handler(async () =>
  (await import("./admin.server")).dashboard(),
);
