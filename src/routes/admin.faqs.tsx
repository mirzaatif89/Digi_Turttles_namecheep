import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/faqs")({
  loader: () => routeAdminModule("faqs"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="faqs" allowed={Route.useLoaderData().allowed} />;
}
