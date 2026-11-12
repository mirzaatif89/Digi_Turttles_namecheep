import { ArrowRight, History } from "lucide-react";
import type { AuditActivity } from "@/lib/dashboard.types";
import { relativeTime } from "@/lib/dashboard.utils";

export function RecentActivity({ items }: { items: AuditActivity[] }) {
  return (
    <section className="admin-dashboard-panel" aria-labelledby="recent-activity-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="admin-eyebrow">Audit trail</p>
          <h2 id="recent-activity-title" className="mt-1 font-display text-lg font-semibold">
            Recent activity
          </h2>
        </div>
        <a href="/admin/activity" className="admin-dashboard-text-link">
          View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      {items.length === 0 ? (
        <div className="admin-dashboard-empty mt-5" role="status">
          <History className="h-5 w-5 text-[var(--admin-teal)]" aria-hidden="true" />
          No recent activity has been recorded yet.
        </div>
      ) : (
        <ol className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--admin-teal)]"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{item.actor ?? "An administrator"}</span>{" "}
                  {item.summary}
                </p>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  {relativeTime(item.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
