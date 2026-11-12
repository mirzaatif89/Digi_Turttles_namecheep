import { EmptyState } from "./EmptyState";
import { NoAccess } from "./NoAccess";
import { PageHeader } from "./PageHeader";

export function AdminModulePage({ title, allowed }: { title: string; allowed: boolean }) {
  if (!allowed) return <NoAccess />;
  return (
    <>
      <PageHeader title={title} description="Module workspace" />
      <EmptyState title={title} />
    </>
  );
}
