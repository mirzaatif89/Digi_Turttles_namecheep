import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/theme")({
  loader: () => routeAdminModule("theme"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="theme" allowed={Route.useLoaderData().allowed} />;
}
