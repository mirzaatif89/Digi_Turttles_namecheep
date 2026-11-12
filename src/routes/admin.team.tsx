import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/team")({
  loader: () => routeAdminModule("team"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="team" allowed={Route.useLoaderData().allowed} />;
}
