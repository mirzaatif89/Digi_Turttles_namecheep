import type { AdminModule, PermissionMap } from "@/lib/permissions";
import { findSection, headingKey } from "./schema";

const MODULES: Record<string, AdminModule> = {
  brand: "theme",
  hero: "home",
  story: "home",
  about: "about",
  cta: "cta",
  footer: "navigation",
  seo: "seo",
  nav_links: "navigation",
  services: "services",
  courses: "courses",
  philosophy: "about",
  projects: "projects",
  team: "team",
  posts: "blog",
  partners: "partners",
  reviews: "reviews",
  faqs: "faqs",
};

export function sectionModule(key: string): AdminModule {
  const section = key.startsWith("section_") ? key.slice(8) : key;
  const module = MODULES[section];
  if (!module || !findSection(section)) throw new Error("Unknown website section.");
  return module;
}

export function settingDefinition(key: string) {
  const section = findSection(key.startsWith("section_") ? key.slice(8) : key);
  if (section?.kind === "singleton" && key === section.key) return section;
  if (section?.kind === "collection" && section.heading && key === headingKey(section.key))
    return section.heading;
  throw new Error("Unknown website setting.");
}

export function canViewSection(permissions: PermissionMap, key: string): boolean {
  return permissions[sectionModule(key)].view;
}

export const MODULE_SECTIONS: Partial<Record<AdminModule, string[]>> = {
  home: ["hero", "story"],
  about: ["about", "philosophy"],
  theme: ["brand"],
  navigation: ["nav_links", "footer"],
  cta: ["cta"],
  services: ["services"],
  courses: ["courses"],
  projects: ["projects"],
  team: ["team"],
  blog: ["posts"],
  partners: ["partners"],
  reviews: ["reviews"],
  faqs: ["faqs"],
  seo: ["seo"],
  settings: ["brand", "footer"],
};
