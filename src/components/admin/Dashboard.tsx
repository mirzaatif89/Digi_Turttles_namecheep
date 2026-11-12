import { Link } from "@tanstack/react-router";
import { BriefcaseBusiness, FileText, Inbox, Newspaper, UsersRound } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { NoAccess } from "./NoAccess";
import { PageHeader } from "./PageHeader";
import { StatCard } from "./StatCard";

type DashboardData = {
  allowed: boolean;
  session: {
    user: { name: string };
    permissions: Record<
      string,
      Partial<Record<"view" | "create" | "edit" | "delete" | "publish", boolean>>
    >;
  } | null;
  counts: Partial<Record<"users" | "messages" | "blog" | "projects" | "services", number>>;
  events: Array<{
    id: string;
    email: string;
    name: string | null;
    was_successful: number;
    ip_address: string | null;
    created_at: string;
  }>;
};

export function Dashboard({ data }: { data: DashboardData }) {
  if (!data.allowed || !data.session) return <NoAccess />;
  const cards = [
    { module: "users", label: "Admin users", icon: UsersRound, tone: "teal" as const },
    { module: "messages", label: "Messages", icon: Inbox, tone: "blue" as const },
    { module: "blog", label: "Blog posts", icon: Newspaper, tone: "green" as const },
    { module: "projects", label: "Portfolio items", icon: FileText, tone: "amber" as const },
    { module: "services", label: "Services", icon: BriefcaseBusiness, tone: "teal" as const },
  ].filter((card) => data.session?.permissions[card.module]?.view);
  return (
    <>
      <PageHeader
        title={`Welcome back, ${data.session.user.name}`}
        description="Here’s a quiet overview of your workspace."
      />
      <section
        aria-label="Overview statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {cards.map((card) => (
          <StatCard
            key={card.module}
            label={card.label}
            value={data.counts[card.module as keyof typeof data.counts] ?? 0}
            icon={card.icon}
            tone={card.tone}
          />
        ))}
      </section>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="admin-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-5 py-4">
            <div>
              <h3 className="font-display font-semibold">Recent login activity</h3>
              <p className="mt-0.5 text-xs text-[var(--admin-muted)]">
                The latest access attempts to this admin.
              </p>
            </div>
          </div>
          {data.events.length === 0 ? (
            <div className="p-5 text-sm text-[var(--admin-muted)]">
              No login activity has been recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-[var(--admin-border)]">
              {data.events.map((event) => (
                <div key={event.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{event.name ?? event.email}</p>
                    <p className="mt-0.5 text-xs text-[var(--admin-muted)]">
                      {event.was_successful ? "Successful sign in" : "Unsuccessful attempt"}
                      {event.ip_address ? ` · ${event.ip_address}` : ""}
                    </p>
                  </div>
                  <time
                    className="shrink-0 text-xs text-[var(--admin-muted)]"
                    dateTime={event.created_at}
                  >
                    {new Date(event.created_at).toLocaleString()}
                  </time>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="admin-card p-5">
          <h3 className="font-display font-semibold">Quick actions</h3>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">Jump to work you can access.</p>
          <div className="mt-5 grid gap-2">
            <QuickLink
              enabled={Boolean(data.session.permissions["messages"]?.view)}
              module="messages"
              label="Review messages"
            />
            <QuickLink
              enabled={Boolean(data.session.permissions["blog"]?.view)}
              module="blog"
              label="Open blog"
            />
            <QuickLink
              enabled={Boolean(data.session.permissions["users"]?.view)}
              module="users"
              label="Manage users"
            />
            {data.session.permissions["services"]?.create && (
              <Link to="/admin/services" search={{ new: true }} className="admin-quick-link">
                New service
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function QuickLink({
  enabled,
  module,
  label,
}: {
  enabled?: boolean;
  module: "messages" | "blog" | "users";
  label: string;
}) {
  if (!enabled) return null;
  return (
    <Link to="/admin/$module" params={{ module }} className="admin-quick-link">
      {label}
      <span aria-hidden>→</span>
    </Link>
  );
}

export function DashboardSkeleton() {
  return (
    <div aria-label="Loading dashboard" className="space-y-6">
      <div className="h-16 w-72 animate-pulse rounded-2xl bg-[var(--admin-skeleton)]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl bg-[var(--admin-skeleton)]" />
        ))}
      </div>
      <EmptyState title="Dashboard" />
    </div>
  );
}
