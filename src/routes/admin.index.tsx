import { createFileRoute } from "@tanstack/react-router";
import { Dashboard, DashboardSkeleton } from "@/components/admin/Dashboard";
import { routeAdminModule } from "@/lib/admin.route";

export const Route = createFileRoute("/admin/")({
  loader: () => routeAdminModule("dashboard"),
  pendingComponent: DashboardSkeleton,
  component: AdminDashboard,
});

function AdminDashboard() {
  return <Dashboard access={Route.useLoaderData()} />;
}
