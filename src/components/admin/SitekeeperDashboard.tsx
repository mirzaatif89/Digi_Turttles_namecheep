import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Inbox, Layers, MailCheck, MailOpen } from "lucide-react";
import { adminIcon } from "@/components/admin/icons";
import { getCmsDashboard } from "@/lib/cms/admin.functions";
import { canViewSection } from "@/lib/cms/access";
import { useAdminSession } from "./AdminShell";
import { COLLECTIONS, SINGLETONS } from "@/lib/cms/schema";

function useDashboard() {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => getCmsDashboard(),
  });
}

function Stat({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number | string;
  icon: typeof Inbox;
  tone: string;
}) {
  return (
    <div className="admin-card flex items-center gap-4 p-5">
      <span className={`admin-stat-icon ${tone}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-display text-2xl font-bold">{value}</p>
        <p className="text-sm text-[var(--admin-muted)]">{label}</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const session = useAdminSession();
  const { data, isLoading } = useDashboard();
  const v = (n: number | undefined) => (isLoading ? "…" : (n ?? 0));
  return (
    <div className="space-y-6">
      <section className="admin-card p-6 md:p-8">
        <p className="admin-eyebrow">Welcome back</p>
        <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
          Manage your whole website from here
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--admin-muted)]">
          Pick any section on the left to change its text, photos, buttons or links. Changes go live
          on the website as soon as you press save.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="admin-secondary-button">
            View website
          </a>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Unread messages" value={v(data?.unread)} icon={Inbox} tone="admin-stat-teal" />
        <Stat
          label="All messages"
          value={v(data?.messages)}
          icon={MailOpen}
          tone="admin-stat-blue"
        />
        <Stat
          label="Subscribers"
          value={v(data?.subscribers)}
          icon={MailCheck}
          tone="admin-stat-green"
        />
        <Stat label="Content items" value={v(data?.items)} icon={Layers} tone="admin-stat-amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="admin-card p-5 md:p-6">
          <h3 className="font-display text-lg font-bold">Website sections</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[...SINGLETONS, ...COLLECTIONS]
              .filter(
                (section) =>
                  section.key !== "hero" && canViewSection(session.permissions, section.key),
              )
              .map((s) => {
                const Icon = adminIcon(s.icon);
                const count = data?.perCollection[s.key];
                return (
                  <Link
                    key={s.key}
                    to="/admin/$module"
                    params={{ module: s.key }}
                    className="admin-quick-link"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-[var(--admin-teal)]" />
                      <span className="truncate">{s.label}</span>
                    </span>
                    {s.kind === "collection" && (
                      <span className="text-xs text-[var(--admin-muted)]">
                        {count ? `${count.visible}/${count.total}` : "0"}
                      </span>
                    )}
                  </Link>
                );
              })}
          </div>
        </section>

        <section className="admin-card p-5 md:p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Latest messages</h3>
            <Link to="/admin/messages" className="text-sm font-semibold text-[var(--admin-teal)]">
              See all
            </Link>
          </div>
          {data && data.latest.length === 0 && (
            <p className="mt-4 text-sm text-[var(--admin-muted)]">
              No messages yet. Messages from the website's contact form will appear here.
            </p>
          )}
          <ul className="mt-4 space-y-3">
            {data?.latest.map((m) => (
              <li key={m.id} className="rounded-xl border border-[var(--admin-border)] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{m.name}</p>
                  {!m.is_read && <span className="admin-status admin-status-published">New</span>}
                </div>
                <p className="truncate text-xs text-[var(--admin-muted)]">{m.email}</p>
                <p className="mt-1 line-clamp-2 text-sm">{m.message}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
