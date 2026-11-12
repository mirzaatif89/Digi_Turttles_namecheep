import { Link } from "@tanstack/react-router";
import { Shell } from "lucide-react";

export function EmptyState({ title }: { title: string }) {
  return (
    <section className="admin-card flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--admin-teal)]/15 text-[var(--admin-teal)]">
        <Shell className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold">{title} is coming soon</h3>
      <p className="mt-2 max-w-md text-sm text-[var(--admin-muted)]">
        This module shell is ready. Content tools will arrive here without changing the control room
        around it.
      </p>
      <Link to="/admin" className="admin-primary-button mt-6">
        Back to Dashboard
      </Link>
    </section>
  );
}
