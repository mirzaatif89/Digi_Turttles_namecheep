import { z } from "zod";
import { findSection, type Data, type Field } from "./schema";
import { settingDefinition } from "./access";

export const sectionKey = z
  .string()
  .max(64)
  .refine((key) => Boolean(findSection(key)), "Unknown section");
export const collectionKey = sectionKey.refine(
  (key) => findSection(key)?.kind === "collection",
  "Unknown collection",
);
export const dataInput = z
  .record(z.string().max(16000))
  .refine((data) => Object.keys(data).length <= 64, "Too many fields");
export const contactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1).max(4000),
});
export const subscriberInput = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
});
export const recordId = z.string().uuid();

function safeLink(value: string, image: boolean): boolean {
  if (!value) return true;
  if ([...value].some((character) => character <= " " || character === "\\")) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (!image && value.startsWith("#")) return true;
  try {
    const url = new URL(value);
    return (image ? ["https:", "http:"] : ["https:", "http:", "mailto:", "tel:"]).includes(
      url.protocol,
    );
  } catch {
    return false;
  }
}

export function validateFields(fields: Field[], data: Data): Data {
  const result: Data = {};
  for (const field of fields) {
    if (!(field.name in data)) continue;
    const value = data[field.name]!;
    if (
      (field.type === "url" || field.type === "image") &&
      !safeLink(value, field.type === "image")
    )
      throw new Error(`Enter a valid link for ${field.label}.`);
    result[field.name] = value;
  }
  return result;
}

export function validateSetting(key: string, data: Data): Data {
  return validateFields(settingDefinition(key).fields, data);
}
