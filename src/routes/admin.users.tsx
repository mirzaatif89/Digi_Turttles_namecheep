import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/users")({
  loader: () => routeAdminModule("users"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="users" allowed={Route.useLoaderData().allowed} />;
}
