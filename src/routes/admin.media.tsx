import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/media")({
  loader: () => routeAdminModule("media"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="media" allowed={Route.useLoaderData().allowed} />;
}
