import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardActivityPoint } from "@/lib/dashboard.types";

function dayLabel(day: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(day));
}

export default function ActivityChart({ points }: { points: DashboardActivityPoint[] }) {
  const hasInboxActivity = points.some((point) => point.messages > 0 || point.leads > 0);
  const hasLoginActivity = points.some((point) => point.logins > 0);
  if (!hasInboxActivity && !hasLoginActivity) {
    return (
      <div className="admin-dashboard-empty" role="status">
        Activity will appear here once messages, leads, or sign-ins are recorded.
      </div>
    );
  }

  return (
    <div>
      <div className="h-64" role="img" aria-label="Activity over the last 30 days">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 12, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="dashboardActivityFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--admin-teal)" stopOpacity={0.32} />
                <stop offset="100%" stopColor="var(--admin-teal)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--admin-border)" strokeDasharray="3 4" />
            <XAxis
              dataKey="day"
              tickFormatter={dayLabel}
              tick={{ fill: "var(--admin-muted)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={32}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--admin-muted)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <Tooltip
              labelFormatter={dayLabel}
              contentStyle={{
                borderColor: "var(--admin-border)",
                borderRadius: "12px",
                background: "var(--admin-surface-raised)",
                color: "var(--admin-text)",
              }}
            />
            {hasInboxActivity ? (
              <>
                <Area
                  type="monotone"
                  dataKey="messages"
                  name="Messages"
                  stroke="var(--admin-teal)"
                  fill="url(#dashboardActivityFill)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  name="Leads"
                  stroke="var(--admin-text)"
                  fill="none"
                  strokeWidth={1.5}
                />
              </>
            ) : (
              <Area
                type="monotone"
                dataKey="logins"
                name="Sign-ins"
                stroke="var(--admin-teal)"
                fill="url(#dashboardActivityFill)"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <details className="mt-3 text-sm text-[var(--admin-muted)]">
        <summary className="cursor-pointer font-semibold text-[var(--admin-text)]">
          View activity as a table
        </summary>
        <div className="mt-3 max-h-48 overflow-auto rounded-xl border border-[var(--admin-border)]">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-[var(--admin-surface-raised)] text-[var(--admin-text)]">
              <tr>
                <th className="px-3 py-2">Day</th>
                <th className="px-3 py-2">Messages</th>
                <th className="px-3 py-2">Leads</th>
                <th className="px-3 py-2">Sign-ins</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => (
                <tr key={point.day} className="border-t border-[var(--admin-border)]">
                  <td className="px-3 py-2">{dayLabel(point.day)}</td>
                  <td className="px-3 py-2">{point.messages}</td>
                  <td className="px-3 py-2">{point.leads}</td>
                  <td className="px-3 py-2">{point.logins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
