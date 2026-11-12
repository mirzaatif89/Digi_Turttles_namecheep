import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";

export function NoAccess() {
  return (
    <section className="admin-card flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-500/15 text-red-400">
        <ShieldAlert className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold">
        You don’t have access to this area
      </h3>
      <p className="mt-2 max-w-md text-sm text-[var(--admin-muted)]">
        Ask a super administrator if you need an additional permission.
      </p>
      <Link to="/admin" className="admin-primary-button mt-6">
        Back to Dashboard
      </Link>
    </section>
  );
}
