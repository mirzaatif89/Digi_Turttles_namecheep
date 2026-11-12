import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/messages")({
  loader: () => routeAdminModule("messages"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="messages" allowed={Route.useLoaderData().allowed} />;
}
