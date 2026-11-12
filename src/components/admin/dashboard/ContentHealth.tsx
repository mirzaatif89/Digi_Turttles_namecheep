import { ArrowRight, ImageOff, SearchCheck } from "lucide-react";
import type { ContentHealthItem } from "@/lib/dashboard.types";

function Meter({ value, total }: { value: number; total: number }) {
  const width = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="admin-dashboard-meter" aria-label={`${width}% published`}>
      <span style={{ width: `${width}%` }} />
    </div>
  );
}

export function ContentHealth({ items }: { items: ContentHealthItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="admin-dashboard-panel" aria-labelledby="content-health-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h2 id="content-health-title" className="mt-1 font-display text-lg font-semibold">
            Content health
          </h2>
        </div>
        <p className="text-xs text-[var(--admin-muted)]">A quick publishing check</p>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <a key={item.module} href={item.href} className="admin-dashboard-health-item">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">{item.label}</p>
              <ArrowRight className="h-4 w-4 text-[var(--admin-teal)]" aria-hidden="true" />
            </div>
            {!item.available ? (
              <p className="mt-3 text-sm text-[var(--admin-muted)]">Not set up yet</p>
            ) : (
              <>
                <div className="mt-3 flex justify-between text-xs text-[var(--admin-muted)]">
                  <span>{item.published} published</span>
                  <span>{item.drafts} draft</span>
                </div>
                <Meter value={item.published} total={item.total} />
                {(item.missingImages > 0 || item.missingSeo > 0) && (
                  <div className="mt-3 space-y-1.5 text-xs text-[var(--admin-muted)]">
                    {item.missingImages > 0 && (
                      <p className="flex items-center gap-1.5">
                        <ImageOff
                          className="h-3.5 w-3.5 text-[var(--admin-teal)]"
                          aria-hidden="true"
                        />
                        {item.missingImages} missing image{item.missingImages === 1 ? "" : "s"}
                      </p>
                    )}
                    {item.missingSeo > 0 && (
                      <p className="flex items-center gap-1.5">
                        <SearchCheck
                          className="h-3.5 w-3.5 text-[var(--admin-teal)]"
                          aria-hidden="true"
                        />
                        {item.missingSeo} missing SEO field{item.missingSeo === 1 ? "" : "s"}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
