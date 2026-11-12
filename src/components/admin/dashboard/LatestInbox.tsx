import { Inbox } from "lucide-react";
import type { InboxItem } from "@/lib/dashboard.types";
import { relativeTime } from "@/lib/dashboard.utils";

export function LatestInbox({ items }: { items: InboxItem[] }) {
  return (
    <section className="admin-dashboard-panel" aria-labelledby="latest-inbox-title">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="admin-eyebrow">Inbox</p>
          <h2 id="latest-inbox-title" className="mt-1 font-display text-lg font-semibold">
            Latest messages & leads
          </h2>
        </div>
        <Inbox className="h-5 w-5 text-[var(--admin-teal)]" aria-hidden="true" />
      </div>
      {items.length === 0 ? (
        <p className="mt-5 text-sm text-[var(--admin-muted)]">Nothing new to review.</p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--admin-border)]">
          {items.map((item) => (
            <li key={item.id} className={`py-3 ${item.unread ? "font-semibold" : ""}`}>
              <a
                href={item.type === "message" ? "/admin/messages" : "/admin/leads"}
                className="block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-teal)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate text-sm">{item.title}</p>
                  <time className="shrink-0 text-xs font-normal text-[var(--admin-muted)]">
                    {relativeTime(item.createdAt)}
                  </time>
                </div>
                <p className="mt-1 truncate text-xs font-normal text-[var(--admin-muted)]">
                  {item.detail}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
