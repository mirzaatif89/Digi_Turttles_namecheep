import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/backup")({
  loader: () => routeAdminModule("backup"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="backup" allowed={Route.useLoaderData().allowed} />;
}
