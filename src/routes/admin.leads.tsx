import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/leads")({
  loader: () => routeAdminModule("leads"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="leads" allowed={Route.useLoaderData().allowed} />;
}
