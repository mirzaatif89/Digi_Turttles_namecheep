import { requirePermission } from "@/lib/permissions.server";
import { readMedia, readStore, removeMedia, saveMedia } from "./store.server";

function imageType(bytes: Buffer): { type: string; extension: string } | null {
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
    return { type: "image/png", extension: "png" };
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return { type: "image/jpeg", extension: "jpg" };
  if (["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString()))
    return { type: "image/gif", extension: "gif" };
  if (bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP")
    return { type: "image/webp", extension: "webp" };
  return null;
}

export async function uploadImage(file: FormDataEntryValue | null) {
  await requirePermission("media", "create");
  if (!(file instanceof File) || !file.size || file.size > 5 * 1024 * 1024)
    throw new Error("Choose a PNG, JPEG, GIF or WebP image smaller than 5 MB.");
  const bytes = Buffer.from(await file.arrayBuffer());
  const image = imageType(bytes);
  if (!image) throw new Error("Only PNG, JPEG, GIF and WebP images are supported.");
  const name = `${crypto.randomUUID()}.${image.extension}`;
  await saveMedia(
    {
      name,
      originalName: file.name.slice(0, 200),
      type: image.type,
      size: file.size,
      created_at: new Date().toISOString(),
    },
    bytes,
  );
  return { name };
}

export async function listMedia() {
  await requirePermission("media", "view");
  return (await readStore()).media;
}

export async function deleteMedia(name: string) {
  await requirePermission("media", "delete");
  await removeMedia(name);
  return { ok: true };
}

export async function publicImage(name: string): Promise<Response> {
  if (!/^[a-f0-9-]+\.(png|jpg|gif|webp)$/.test(name))
    return new Response("Not found", { status: 404 });
  const file = await readMedia(name);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(file.bytes), {
    headers: {
      "content-type": file.type,
      "content-length": String(file.bytes.length),
      "cache-control": "public, max-age=3600",
      "x-content-type-options": "nosniff",
      "content-security-policy": "default-src 'none'; sandbox",
    },
  });
}
