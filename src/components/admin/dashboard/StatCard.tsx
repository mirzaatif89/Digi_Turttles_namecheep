import {
  BriefcaseBusiness,
  FileImage,
  FileText,
  FolderKanban,
  GraduationCap,
  Inbox,
  Mail,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { DashboardStat, DashboardStatModule } from "@/lib/dashboard.types";

const icons: Record<DashboardStatModule, LucideIcon> = {
  services: BriefcaseBusiness,
  team: UsersRound,
  projects: FolderKanban,
  courses: GraduationCap,
  blog: FileText,
  messages: Inbox,
  leads: Mail,
  media: FileImage,
};

function Sparkline({ points }: { points: DashboardStat["sparkline"] }) {
  if (points.length === 0) return null;
  const values = points.map((point) => point.value);
  const maximum = Math.max(...values, 1);
  const denominator = Math.max(points.length - 1, 1);
  const polyline = points
    .map((point, index) => `${(index / denominator) * 100},${32 - (point.value / maximum) * 26}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 36"
      preserveAspectRatio="none"
      className="h-9 w-20 text-[var(--admin-teal)]"
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points={polyline}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardStatCard({ stat }: { stat: DashboardStat }) {
  const Icon = icons[stat.module];
  return (
    <a
      href={stat.href}
      className="admin-dashboard-stat group"
      aria-label={`Open ${stat.label}: ${stat.value}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="admin-dashboard-icon" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
        {stat.available ? <Sparkline points={stat.sparkline} /> : null}
      </div>
      <p className="mt-5 font-display text-3xl font-semibold tracking-tight tabular-nums">
        {stat.value}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--admin-text)]">{stat.label}</p>
      <p className="mt-2 text-xs text-[var(--admin-muted)]">
        {stat.available
          ? stat.sparkline.length > 0
            ? "Last 7 days"
            : "No recent trend"
          : "Not set up yet"}
      </p>
    </a>
  );
}
