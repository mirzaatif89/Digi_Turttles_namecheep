import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/partners")({
  loader: () => routeAdminModule("partners"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="partners" allowed={Route.useLoaderData().allowed} />;
}
