import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/analytics")({
  loader: () => routeAdminModule("analytics"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="analytics" allowed={Route.useLoaderData().allowed} />;
}
