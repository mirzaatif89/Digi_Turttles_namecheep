import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/cta")({
  loader: () => routeAdminModule("cta"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="cta" allowed={Route.useLoaderData().allowed} />;
}
