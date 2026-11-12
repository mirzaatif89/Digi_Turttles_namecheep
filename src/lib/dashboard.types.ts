import type { PermissionMap } from "./permissions";

export const DASHBOARD_STAT_MODULES = [
  "services",
  "team",
  "projects",
  "courses",
  "blog",
  "messages",
  "leads",
  "media",
] as const;

export type DashboardStatModule = (typeof DASHBOARD_STAT_MODULES)[number];

export const dashboardModuleMeta: Record<DashboardStatModule, { label: string; href: string }> = {
  services: { label: "Services", href: "/admin/services" },
  team: { label: "Team", href: "/admin/team" },
  projects: { label: "Portfolio", href: "/admin/projects" },
  courses: { label: "Courses", href: "/admin/courses" },
  blog: { label: "Blog posts", href: "/admin/blog" },
  messages: { label: "Messages", href: "/admin/messages" },
  leads: { label: "Leads", href: "/admin/leads" },
  media: { label: "Media files", href: "/admin/media" },
};

export type DashboardSparkPoint = { day: string; value: number };

export type DashboardStat = {
  module: DashboardStatModule;
  label: string;
  href: string;
  value: number;
  available: boolean;
  sparkline: DashboardSparkPoint[];
};

export type DashboardActivityPoint = {
  day: string;
  messages: number;
  leads: number;
  logins: number;
};

export type ContentHealthItem = {
  module: DashboardStatModule;
  label: string;
  href: string;
  available: boolean;
  total: number;
  published: number;
  drafts: number;
  missingImages: number;
  missingSeo: number;
};

export type InboxItem = {
  id: string;
  type: "message" | "lead";
  title: string;
  detail: string;
  createdAt: string;
  unread: boolean;
};

export type DashboardSystemStatus = {
  database: "connected" | "unavailable";
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  activeSessions: number;
  serverTime: string;
};

export type DashboardSnapshot = {
  stats: DashboardStat[];
  activity: DashboardActivityPoint[];
  contentHealth: ContentHealthItem[];
  inbox: InboxItem[];
  system: DashboardSystemStatus;
};

export function dashboardVisibleModules(permissions: PermissionMap): DashboardStatModule[] {
  return DASHBOARD_STAT_MODULES.filter((module) => permissions[module].view);
}

export function emptyDashboardSnapshot(
  visibleModules: readonly DashboardStatModule[] = [],
): DashboardSnapshot {
  return {
    stats: visibleModules.map((module) => ({
      module,
      ...dashboardModuleMeta[module],
      value: 0,
      available: false,
      sparkline: [],
    })),
    activity: [],
    contentHealth: visibleModules
      .filter((module) => ["services", "team", "projects", "courses", "blog"].includes(module))
      .map((module) => ({
        module,
        ...dashboardModuleMeta[module],
        available: false,
        total: 0,
        published: 0,
        drafts: 0,
        missingImages: 0,
        missingSeo: 0,
      })),
    inbox: [],
    system: {
      database: "unavailable",
      lastLoginAt: null,
      lastLoginIp: null,
      activeSessions: 0,
      serverTime: new Date().toISOString(),
    },
  };
}
