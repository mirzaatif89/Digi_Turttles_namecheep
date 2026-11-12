import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/projects")({
  loader: () => routeAdminModule("projects"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="projects" allowed={Route.useLoaderData().allowed} />;
}
