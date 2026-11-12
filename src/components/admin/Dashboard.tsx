import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { getDashboardData } from "@/lib/dashboard.functions";
import type { AdminSession } from "@/lib/auth.types";
import type { DashboardSnapshot } from "@/lib/dashboard.types";
import type { PermissionMap } from "@/lib/permissions";
import { filterDashboardSnapshot, smartSummary } from "@/lib/dashboard.utils";
import { NoAccess } from "./NoAccess";
import { ActivityChartSkeleton } from "./dashboard/ActivityChartSkeleton";
import { ContentHealth } from "./dashboard/ContentHealth";
import { DashboardStatCard } from "./dashboard/StatCard";
import { LatestInbox } from "./dashboard/LatestInbox";
import { QuickActions } from "./dashboard/QuickActions";
import { SystemStatus } from "./dashboard/SystemStatus";

const ActivityChart = lazy(() => import("./dashboard/ActivityChart"));

type DashboardAccess = { allowed: boolean; session: AdminSession | null };
type DashboardResponse =
  | {
      allowed: true;
      user: AdminSession["user"];
      permissions: PermissionMap;
      dashboard: DashboardSnapshot;
    }
  | { allowed: false };

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function today() {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

export function Dashboard({ access }: { access: DashboardAccess }) {
  const [result, setResult] = useState<DashboardResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!access.allowed) return;
    let active = true;
    getDashboardData()
      .then((data) => {
        if (active) setResult(data as DashboardResponse);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [access.allowed]);

  if (!access.allowed || result?.allowed === false) return <NoAccess />;
  if (!result) return failed ? <DashboardLoadError /> : <DashboardSkeleton />;

  const dashboard = filterDashboardSnapshot(result.dashboard, result.permissions);
  const canSeeInbox = result.permissions.messages.view || result.permissions.leads.view;

  return (
    <div className="admin-dashboard">
      <section className="admin-dashboard-hero" aria-labelledby="dashboard-greeting">
        <div>
          <p className="admin-eyebrow">Digi Turtles / Control room</p>
          <h1
            id="dashboard-greeting"
            className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl"
          >
            {greeting()}, {firstName(result.user.name)}
          </h1>
          <p className="mt-2 text-sm text-[var(--admin-muted)]">{today()}</p>
          <p className="mt-4 text-sm font-semibold text-[var(--admin-text)]">
            {smartSummary(dashboard)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.permissions.services.create ? (
            <Link to="/admin/services" search={{ new: true }} className="admin-primary-button">
              <Plus className="h-4 w-4" aria-hidden="true" /> New service
            </Link>
          ) : null}
          <a href="/" className="admin-secondary-button">
            View site <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        aria-label="Workspace statistics"
        className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {dashboard.stats.map((stat) => (
          <DashboardStatCard key={stat.module} stat={stat} />
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.8fr)]">
        <div className="space-y-6">
          <section className="admin-dashboard-panel" aria-labelledby="activity-title">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="admin-eyebrow">Last 30 days</p>
                <h2 id="activity-title" className="mt-1 font-display text-lg font-semibold">
                  Activity
                </h2>
              </div>
              <p className="text-xs text-[var(--admin-muted)]">Messages, leads, or sign-ins</p>
            </div>
            <div className="mt-4">
              <Suspense fallback={<ActivityChartSkeleton />}>
                <ActivityChart points={dashboard.activity} />
              </Suspense>
            </div>
          </section>
          <ContentHealth items={dashboard.contentHealth} />
        </div>
        <aside className="space-y-6" aria-label="Dashboard tools and status">
          <QuickActions permissions={result.permissions} />
          {canSeeInbox ? <LatestInbox items={dashboard.inbox} /> : null}
          <SystemStatus status={dashboard.system} />
        </aside>
      </div>
    </div>
  );
}

function DashboardLoadError() {
  return (
    <section className="admin-dashboard-panel" role="alert">
      <h1 className="font-display text-xl font-semibold">Dashboard is taking a moment</h1>
      <p className="mt-2 text-sm text-[var(--admin-muted)]">
        Refresh the page to try loading the latest workspace data again.
      </p>
    </section>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="admin-dashboard" aria-label="Loading dashboard" aria-busy="true">
      <div className="admin-dashboard-skeleton h-44" />
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="admin-dashboard-skeleton h-44" />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_0.8fr]">
        <div className="admin-dashboard-skeleton h-96" />
        <div className="admin-dashboard-skeleton h-96" />
      </div>
    </div>
  );
}
