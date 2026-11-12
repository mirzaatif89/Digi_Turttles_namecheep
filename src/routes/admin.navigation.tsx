import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/navigation")({
  loader: () => routeAdminModule("navigation"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="navigation" allowed={Route.useLoaderData().allowed} />;
}
