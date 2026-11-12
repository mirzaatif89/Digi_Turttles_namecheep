import type { AdminModule } from "@/lib/permissions";
import { moduleTitle } from "@/lib/admin-navigation";
import { AdminModulePage } from "./AdminModulePage";

export function RoutedModulePage({ module, allowed }: { module: AdminModule; allowed: boolean }) {
  return <AdminModulePage title={moduleTitle(module)} allowed={allowed} />;
}
