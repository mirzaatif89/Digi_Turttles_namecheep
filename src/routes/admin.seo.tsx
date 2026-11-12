import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/seo")({
  loader: () => routeAdminModule("seo"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="seo" allowed={Route.useLoaderData().allowed} />;
}
