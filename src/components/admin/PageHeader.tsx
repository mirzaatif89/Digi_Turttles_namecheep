import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="admin-eyebrow">Digi Turtles / Admin</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">{title}</h2>
        {description && <p className="mt-1 text-sm text-[var(--admin-muted)]">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
