import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { routeAdminSession } from "@/lib/admin.route";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const session = await routeAdminSession();
    if (!session)
      throw redirect({
        href: `/login?redirect=${encodeURIComponent(location.pathname)}`,
      });
    return { adminSession: session };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { adminSession } = Route.useRouteContext();
  return (
    <AdminShell session={adminSession}>
      <Outlet />
    </AdminShell>
  );
}
