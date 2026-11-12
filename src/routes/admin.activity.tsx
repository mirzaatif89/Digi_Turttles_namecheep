import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/activity")({
  loader: () => routeAdminModule("activity"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="activity" allowed={Route.useLoaderData().allowed} />;
}
