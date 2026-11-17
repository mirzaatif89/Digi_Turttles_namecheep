import { createFileRoute } from "@tanstack/react-router";
import { Dashboard, DashboardSkeleton } from "@/components/admin/Dashboard";
import { routeAdminModule } from "@/lib/admin.route";
import { Dashboard as SitekeeperDashboard } from "@/components/admin/SitekeeperDashboard";
import { NoAccess } from "@/components/admin/NoAccess";

export const Route = createFileRoute("/admin/")({
  loader: () => routeAdminModule("dashboard"),
  pendingComponent: DashboardSkeleton,
  component: AdminDashboard,
});

function AdminDashboard() {
  return Route.useLoaderData().allowed ? <SitekeeperDashboard /> : <NoAccess />;
}
