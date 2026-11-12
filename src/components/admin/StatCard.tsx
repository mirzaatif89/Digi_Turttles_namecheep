import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "teal",
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: "teal" | "blue" | "green" | "amber";
}) {
  return (
    <article className="admin-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--admin-muted)]">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{value}</p>
        </div>
        <span className={`admin-stat-icon admin-stat-${tone}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}
