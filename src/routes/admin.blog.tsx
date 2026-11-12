import { createFileRoute } from "@tanstack/react-router";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";
import { routeAdminModule } from "@/lib/admin.route";

export const Route = createFileRoute("/admin/blog")({
  loader: () => routeAdminModule("blog"),
  component: Page,
});

function Page() {
  return <RoutedModulePage module="blog" allowed={Route.useLoaderData().allowed} />;
}
