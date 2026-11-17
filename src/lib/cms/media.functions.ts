import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const uploadImage = createServerFn({ method: "POST" })
  .validator((input: FormData) => {
    if (!(input instanceof FormData)) throw new Error("Choose an image to upload.");
    return input;
  })
  .handler(async ({ data }) => (await import("./media.server")).uploadImage(data.get("file")));
export const listMedia = createServerFn({ method: "GET" }).handler(async () =>
  (await import("./media.server")).listMedia(),
);
export const deleteMedia = createServerFn({ method: "POST" })
  .validator(z.object({ name: z.string().regex(/^[a-f0-9-]+\.(png|jpg|gif|webp)$/) }))
  .handler(async ({ data }) => (await import("./media.server")).deleteMedia(data.name));
