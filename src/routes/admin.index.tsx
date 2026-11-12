import { createFileRoute } from "@tanstack/react-router";
import { Dashboard, DashboardSkeleton } from "@/components/admin/Dashboard";
import { routeAdminDashboard } from "@/lib/admin.route";

export const Route = createFileRoute("/admin/")({
  loader: () => routeAdminDashboard(),
  pendingComponent: DashboardSkeleton,
  component: AdminDashboard,
});

function AdminDashboard() {
  return <Dashboard data={Route.useLoaderData()} />;
}
