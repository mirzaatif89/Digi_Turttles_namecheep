import type { AdminModule } from "@/lib/permissions";
import { moduleTitle } from "@/lib/admin-navigation";
import { AdminModulePage } from "./AdminModulePage";
import { MODULE_SECTIONS } from "@/lib/cms/access";
import { CmsModulePage } from "./CmsSectionPage";
import { NoAccess } from "./NoAccess";
import { MessagesPage } from "./SitekeeperMessages";
import { SubscribersPage } from "./SitekeeperSubscribers";
import { MediaPage } from "./SitekeeperMedia";
import { UsersPage } from "./SitekeeperUsers";

export function RoutedModulePage({ module, allowed }: { module: AdminModule; allowed: boolean }) {
  if (!allowed) return <NoAccess />;
  if (MODULE_SECTIONS[module]) return <CmsModulePage module={module} />;
  if (module === "messages") return <MessagesPage />;
  if (module === "subscribers") return <SubscribersPage />;
  if (module === "media") return <MediaPage />;
  if (module === "users") return <UsersPage />;
  return <AdminModulePage title={moduleTitle(module)} allowed={allowed} />;
}
