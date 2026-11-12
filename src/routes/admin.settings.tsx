import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/settings")({
  loader: () => routeAdminModule("settings"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="settings" allowed={Route.useLoaderData().allowed} />;
}
