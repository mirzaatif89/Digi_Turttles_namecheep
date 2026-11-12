import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/about")({
  loader: () => routeAdminModule("about"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="about" allowed={Route.useLoaderData().allowed} />;
}
