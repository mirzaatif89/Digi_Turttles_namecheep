import type { PermissionMap } from "./permissions";
import type { DashboardSnapshot } from "./dashboard.types";

export function relativeTime(value: string | null, now = new Date()): string {
  if (!value) return "Just now";
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "Just now";
  const seconds = Math.max(0, Math.floor((now.getTime() - timestamp) / 1000));
  if (seconds < 45) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

/** Defensive client-side shaping also keeps cached data harmless if permissions change mid-session. */
export function filterDashboardSnapshot(
  snapshot: DashboardSnapshot,
  permissions: PermissionMap,
): DashboardSnapshot {
  const canView = (module: string) =>
    module in permissions && permissions[module as keyof PermissionMap].view;

  return {
    ...snapshot,
    stats: snapshot.stats.filter((stat) => canView(stat.module)),
    contentHealth: snapshot.contentHealth.filter((item) => canView(item.module)),
    inbox: snapshot.inbox.filter((item) => canView(item.type === "message" ? "messages" : "leads")),
  };
}

export function smartSummary(snapshot: DashboardSnapshot): string {
  const find = (module: string) => snapshot.stats.find((stat) => stat.module === module);
  const messages = find("messages");
  const services =
    snapshot.contentHealth.find((item) => item.module === "services")?.published ?? 0;
  const drafts = snapshot.contentHealth.reduce((total, item) => total + item.drafts, 0);
  const parts: string[] = [];
  if (messages) {
    parts.push(`${messages.value} ${messages.value === 1 ? "new message" : "new messages"}`);
  }
  if (snapshot.contentHealth.length > 0) {
    parts.push(`${drafts} ${drafts === 1 ? "draft" : "drafts"}`);
  }
  if (snapshot.contentHealth.some((item) => item.module === "services")) {
    parts.push(`${services} ${services === 1 ? "service" : "services"} published`);
  }
  return parts.length > 0 ? parts.join(", ") : "Your workspace is ready to go.";
}
