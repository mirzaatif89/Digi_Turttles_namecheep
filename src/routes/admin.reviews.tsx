import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";
export const Route = createFileRoute("/admin/reviews")({
  loader: () => routeAdminModule("reviews"),
  component: Page,
});
function Page() {
  return <RoutedModulePage module="reviews" allowed={Route.useLoaderData().allowed} />;
}
