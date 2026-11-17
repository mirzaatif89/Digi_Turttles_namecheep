import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/services")({
  loader: () => routeAdminModule("services"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="services" allowed={Route.useLoaderData().allowed} />;
}
