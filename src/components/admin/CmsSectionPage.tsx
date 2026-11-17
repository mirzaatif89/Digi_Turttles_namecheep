import { findSection } from "@/lib/cms/schema";
import { canViewSection, MODULE_SECTIONS } from "@/lib/cms/access";
import type { AdminModule } from "@/lib/permissions";
import { useAdminSession } from "./AdminShell";
import { CollectionEditor } from "./CollectionEditor";
import { SettingsForm } from "./SettingsForm";
import { PageIntro } from "./fields";
import { NoAccess } from "./NoAccess";

export function CmsSectionPage({ section }: { section: string }) {
  const session = useAdminSession();
  const def = findSection(section);
  if (!def) return null;
  if (!canViewSection(session.permissions, section)) return <NoAccess />;
  if (def.kind === "collection") return <CollectionEditor key={def.key} def={def} />;
  return (
    <div className="space-y-6">
      <PageIntro title={def.label} description={def.description} />
      <SettingsForm
        key={def.key}
        settingsKey={def.key}
        fields={def.fields}
        defaults={def.defaults}
      />
    </div>
  );
}

export function CmsModulePage({ module }: { module: AdminModule }) {
  return (
    <div className="space-y-10">
      {MODULE_SECTIONS[module]?.map((key) => (
        <CmsSectionPage key={key} section={key} />
      ))}
    </div>
  );
}
