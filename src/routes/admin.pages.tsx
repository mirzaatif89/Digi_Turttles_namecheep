import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/pages")({
  loader: () => routeAdminModule("pages"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="pages" allowed={Route.useLoaderData().allowed} />;
}
