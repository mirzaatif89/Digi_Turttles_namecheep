import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/subscribers")({
  loader: () => routeAdminModule("subscribers"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="subscribers" allowed={Route.useLoaderData().allowed} />;
}
