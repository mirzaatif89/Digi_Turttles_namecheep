import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/home")({
  loader: () => routeAdminModule("home"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="home" allowed={Route.useLoaderData().allowed} />;
}
