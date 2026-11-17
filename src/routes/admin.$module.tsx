import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminModulePage } from "@/components/admin/AdminModulePage";
import { moduleTitle } from "@/lib/admin-navigation";
import { routeAdminModule } from "@/lib/admin.route";
import { isAdminModule } from "@/lib/permissions";
import { findSection } from "@/lib/cms/schema";
import { sectionModule } from "@/lib/cms/access";
import { CmsSectionPage } from "@/components/admin/CmsSectionPage";
import { AccountPage } from "@/components/admin/SitekeeperAccount";
import { RoutedModulePage } from "@/components/admin/RoutedModulePage";

export const Route = createFileRoute("/admin/$module")({
  loader: async ({ params }) => {
    if (params.module === "account") return { allowed: true };
    if (findSection(params.module)) return routeAdminModule(sectionModule(params.module));
    if (!isAdminModule(params.module)) throw notFound();
    return routeAdminModule(params.module);
  },
  component: AdminModule,
});

function AdminModule() {
  const data = Route.useLoaderData();
  const module = Route.useParams().module;
  if (module === "account") return <AccountPage />;
  if (findSection(module)) return <CmsSectionPage section={module} />;
  if (!isAdminModule(module)) return null;
  return <RoutedModulePage module={module} allowed={data.allowed} />;
}
