import { uploadImage } from "./cms/media.functions";

export const MEDIA_PREFIX = "/api/public/media/";
export function mediaUrl(name: string) {
  return `${MEDIA_PREFIX}${encodeURIComponent(name)}`;
}
export async function uploadMedia(file: File): Promise<string> {
  if (
    !["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.type) ||
    file.size > 5 * 1024 * 1024
  )
    throw new Error("Choose a PNG, JPEG, GIF or WebP image smaller than 5 MB.");
  const data = new FormData();
  data.set("file", file);
  const result = await uploadImage({ data });
  return mediaUrl(result.name);
}
