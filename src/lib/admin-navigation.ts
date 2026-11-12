import type { AdminModule, PermissionMap } from "./permissions";

export type AdminNavItem = { module: AdminModule; label: string; icon: string; badge?: "messages" };
export type AdminNavGroup = { label: string; items: AdminNavItem[] };

export const ADMIN_NAVIGATION: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [{ module: "dashboard", label: "Dashboard", icon: "LayoutDashboard" }],
  },
  {
    label: "Website design",
    items: [
      { module: "home", label: "Home Page", icon: "House" },
      { module: "about", label: "About & Philosophy", icon: "HeartHandshake" },
      { module: "theme", label: "Theme & Branding", icon: "Palette" },
      { module: "navigation", label: "Navigation & Footer", icon: "PanelTop" },
      { module: "cta", label: "Call-to-Action", icon: "MousePointerClick" },
    ],
  },
  {
    label: "Content",
    items: [
      { module: "services", label: "Services", icon: "BriefcaseBusiness" },
      { module: "courses", label: "Courses", icon: "GraduationCap" },
      { module: "projects", label: "Portfolio", icon: "FolderKanban" },
      { module: "team", label: "Team", icon: "UsersRound" },
      { module: "blog", label: "Blog", icon: "Newspaper" },
      { module: "partners", label: "Partners", icon: "Handshake" },
      { module: "reviews", label: "Reviews", icon: "MessageCircleHeart" },
      { module: "faqs", label: "FAQs", icon: "CircleHelp" },
      { module: "pages", label: "Pages", icon: "Files" },
    ],
  },
  {
    label: "Inbox",
    items: [
      { module: "messages", label: "Messages", icon: "Inbox", badge: "messages" },
      { module: "leads", label: "Leads", icon: "ContactRound" },
      { module: "subscribers", label: "Subscribers", icon: "MailCheck" },
    ],
  },
  {
    label: "Media & SEO",
    items: [
      { module: "media", label: "Media Library", icon: "Image" },
      { module: "seo", label: "SEO Settings", icon: "SearchCheck" },
      { module: "analytics", label: "Analytics & Scripts", icon: "ChartNoAxesCombined" },
    ],
  },
  {
    label: "Management",
    items: [
      { module: "users", label: "Users", icon: "UserCog" },
      { module: "roles", label: "Roles & Permissions", icon: "ShieldCheck" },
      { module: "settings", label: "Site Settings", icon: "Settings" },
      { module: "activity", label: "Activity Log", icon: "ScrollText" },
      { module: "backup", label: "Backup & Export", icon: "Archive" },
    ],
  },
];

export function visibleNavigation(permissions: PermissionMap): AdminNavGroup[] {
  return ADMIN_NAVIGATION.map((group) => ({
    ...group,
    items: group.items.filter((item) => permissions[item.module].view),
  })).filter((group) => group.items.length > 0);
}

export function moduleTitle(module: AdminModule): string {
  return (
    ADMIN_NAVIGATION.flatMap((group) => group.items).find((item) => item.module === module)
      ?.label ?? "Admin"
  );
}
