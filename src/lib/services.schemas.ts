import { z } from "zod";

export const SERVICE_ICON_NAMES = [
  "Target",
  "Megaphone",
  "Bot",
  "Search",
  "Gem",
  "GraduationCap",
  "ChartNoAxesCombined",
  "Palette",
  "Code2",
] as const;

export type ServiceIconName = (typeof SERVICE_ICON_NAMES)[number];

export const serviceInputSchema = z.object({
  title: z.string().trim().min(2, "Use at least 2 characters.").max(100),
  text: z.string().trim().min(10, "Use at least 10 characters.").max(300),
  icon: z.enum(SERVICE_ICON_NAMES),
});

export const serviceIdSchema = z.object({
  id: z.string().uuid("Invalid service ID."),
});

export const updateServiceSchema = serviceInputSchema.extend({ id: serviceIdSchema.shape.id });

export const servicePublishSchema = serviceIdSchema.extend({ isPublished: z.boolean() });

export const serviceReorderSchema = serviceIdSchema.extend({
  direction: z.enum(["up", "down"]),
});

export type ServiceInput = z.infer<typeof serviceInputSchema>;

export type Service = ServiceInput & {
  id: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PublicService = Pick<Service, "id" | "title" | "text" | "icon" | "sortOrder">;
