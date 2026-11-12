import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/courses")({
  loader: () => routeAdminModule("courses"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="courses" allowed={Route.useLoaderData().allowed} />;
}
