import { COLLECTIONS, SINGLETONS } from "@/lib/cms/schema";

export type AdminNavItem = {
  label: string;
  icon: string;
  /** Either a fixed admin page or a content section editor. */
  to:
    | "/admin"
    | "/admin/messages"
    | "/admin/subscribers"
    | "/admin/media"
    | "/admin/users"
    | "/admin/account"
    | "section";
  section?: string;
  badge?: "messages";
};
export type AdminNavGroup = { label: string; items: AdminNavItem[] };

const sectionItems = (group: "Website" | "Content"): AdminNavItem[] =>
  [...SINGLETONS, ...COLLECTIONS]
    .filter((s) => s.group === group)
    .map((s) => ({ label: s.label, icon: s.icon, to: "section" as const, section: s.key }));

export const ADMIN_NAV: AdminNavGroup[] = [
  { label: "Overview", items: [{ label: "Dashboard", icon: "LayoutDashboard", to: "/admin" }] },
  { label: "Website", items: sectionItems("Website") },
  { label: "Content", items: sectionItems("Content") },
  {
    label: "Inbox",
    items: [
      { label: "Messages", icon: "Inbox", to: "/admin/messages", badge: "messages" },
      { label: "Subscribers", icon: "MailCheck", to: "/admin/subscribers" },
    ],
  },
  { label: "Media", items: [{ label: "Media Library", icon: "Image", to: "/admin/media" }] },
  {
    label: "Management",
    items: [
      { label: "Admin Users", icon: "UserCog", to: "/admin/users" },
      { label: "My Account", icon: "KeyRound", to: "/admin/account" },
    ],
  },
];

export function navHref(item: AdminNavItem) {
  return item.to === "section" ? `/admin/${item.section}` : item.to;
}
