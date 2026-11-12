import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminModulePage } from "@/components/admin/AdminModulePage";
import { moduleTitle } from "@/lib/admin-navigation";
import { routeAdminModule } from "@/lib/admin.route";
import { isAdminModule } from "@/lib/permissions";

export const Route = createFileRoute("/admin/$module")({
  loader: async ({ params }) => {
    if (!isAdminModule(params.module)) throw notFound();
    return routeAdminModule(params.module);
  },
  component: AdminModule,
});

function AdminModule() {
  const data = Route.useLoaderData();
  const module = Route.useParams().module;
  if (!isAdminModule(module)) return null;
  return <AdminModulePage title={moduleTitle(module)} allowed={data.allowed} />;
}
