import { Clock3, Database, MonitorCheck, Users } from "lucide-react";
import type { DashboardSystemStatus } from "@/lib/dashboard.types";
import { relativeTime } from "@/lib/dashboard.utils";

export function SystemStatus({ status }: { status: DashboardSystemStatus }) {
  const online = status.database === "connected";
  return (
    <section className="admin-dashboard-panel" aria-labelledby="system-status-title">
      <div>
        <p className="admin-eyebrow">Workspace</p>
        <h2 id="system-status-title" className="mt-1 font-display text-lg font-semibold">
          System
        </h2>
      </div>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-[var(--admin-muted)]">
            <Database className="h-4 w-4 text-[var(--admin-teal)]" aria-hidden="true" /> Database
          </dt>
          <dd className={online ? "admin-dashboard-status-ok" : "admin-dashboard-status-muted"}>
            {online ? "Connected" : "Unavailable"}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-[var(--admin-muted)]">
            <MonitorCheck className="h-4 w-4 text-[var(--admin-teal)]" aria-hidden="true" /> Last
            login
          </dt>
          <dd className="text-right text-xs">{relativeTime(status.lastLoginAt)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-[var(--admin-muted)]">
            <Users className="h-4 w-4 text-[var(--admin-teal)]" aria-hidden="true" /> Active
            sessions
          </dt>
          <dd className="font-semibold tabular-nums">{status.activeSessions}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-[var(--admin-muted)]">
            <Clock3 className="h-4 w-4 text-[var(--admin-teal)]" aria-hidden="true" /> Server time
          </dt>
          <dd className="text-right text-xs">
            {new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(
              new Date(status.serverTime),
            )}
          </dd>
        </div>
      </dl>
      {status.lastLoginIp ? (
        <p className="mt-4 text-xs text-[var(--admin-muted)]">Last IP: {status.lastLoginIp}</p>
      ) : null}
    </section>
  );
}
