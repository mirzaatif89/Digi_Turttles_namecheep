import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  ChartNoAxesCombined,
  Code2,
  Gem,
  GraduationCap,
  Megaphone,
  Palette,
  Plus,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { DataTable, type DataTableColumn } from "@/components/admin/DataTable";
import { EntityFormSheet } from "@/components/admin/EntityFormSheet";
import { NoAccess } from "@/components/admin/NoAccess";
import { PageHeader } from "@/components/admin/PageHeader";
import { routeAdminModule } from "@/lib/admin.route";
import {
  createService,
  deleteService,
  duplicateService,
  listServices,
  reorderService,
  setPublishedService,
  updateService,
} from "@/lib/services.functions";
import {
  SERVICE_ICON_NAMES,
  serviceInputSchema,
  type Service,
  type ServiceIconName,
  type ServiceInput,
} from "@/lib/services.schemas";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  Target,
  Megaphone,
  Bot,
  Search,
  Gem,
  GraduationCap,
  ChartNoAxesCombined,
  Palette,
  Code2,
};

const emptyService: ServiceInput = { title: "", text: "", icon: "Target" };

export const Route = createFileRoute("/admin/services")({
  validateSearch: (search) => ({ new: search["new"] === true || search["new"] === "1" }),
  loader: () => routeAdminModule("services"),
  component: ServicesPage,
});

function ServicesPage() {
  const { allowed } = Route.useLoaderData();
  const { new: createFromQuickAction } = Route.useSearch();
  const { adminSession } = Route.useRouteContext();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState<{ mode: "create" | "edit"; service?: Service } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = (await listServices()) as unknown;
      if (result instanceof Response)
        throw new Error("You do not have permission to view services.");
      setServices(result as Service[]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load services.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) void load();
  }, [allowed, load]);

  useEffect(() => {
    if (createFromQuickAction && adminSession.permissions.services.create)
      setSheet({ mode: "create" });
  }, [adminSession.permissions.services.create, createFromQuickAction]);

  const permissions = adminSession.permissions.services;
  const defaultValues = useMemo(
    () =>
      sheet?.mode === "edit" && sheet.service
        ? { title: sheet.service.title, text: sheet.service.text, icon: sheet.service.icon }
        : emptyService,
    [sheet],
  );

  const columns = useMemo<DataTableColumn<Service>[]>(
    () => [
      {
        id: "title",
        label: "Service",
        sortable: true,
        value: (service) => service.title,
        cell: (service) => {
          const Icon = ICONS[service.icon];
          return (
            <div className="flex min-w-48 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--admin-teal)_15%,transparent)] text-[var(--admin-teal)]">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold">{service.title}</p>
                <p className="line-clamp-1 text-xs text-[var(--admin-muted)]">{service.text}</p>
              </div>
            </div>
          );
        },
      },
      { id: "icon", label: "Icon", sortable: true, value: (service) => service.icon },
      {
        id: "status",
        label: "Status",
        sortable: true,
        value: (service) => (service.isPublished ? "Published" : "Draft"),
        cell: (service) => (
          <span
            className={`admin-status ${service.isPublished ? "admin-status-published" : "admin-status-draft"}`}
          >
            {service.isPublished ? "Published" : "Draft"}
          </span>
        ),
      },
      {
        id: "order",
        label: "Order",
        sortable: true,
        value: (service) => service.sortOrder,
        card: false,
      },
      {
        id: "updated",
        label: "Updated",
        sortable: true,
        value: (service) => service.updatedAt,
        cell: (service) => new Date(service.updatedAt).toLocaleDateString(),
        card: false,
      },
    ],
    [],
  );

  const mutate = async (work: () => Promise<unknown>, success: string) => {
    try {
      const result = await work();
      if (result instanceof Response) throw new Error("Your permission was denied.");
      await load();
      toast.success(success);
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The service could not be saved.");
      return false;
    }
  };

  if (!allowed) return <NoAccess />;

  return (
    <>
      <Toaster richColors position="top-right" />
      <PageHeader
        title="Services"
        description="Manage the agency services shown on the public website."
        actions={
          permissions.create ? (
            <button
              type="button"
              onClick={() => setSheet({ mode: "create" })}
              className="admin-primary-button"
            >
              <Plus className="h-4 w-4" />
              New service
            </button>
          ) : null
        }
      />
      <DataTable
        rows={services}
        columns={columns}
        searchText={(service) => `${service.title} ${service.text} ${service.icon}`}
        loading={loading}
        emptyTitle="No services match this view"
        canEdit={permissions.edit}
        canCreate={permissions.create}
        canPublish={permissions.publish}
        canDelete={permissions.delete}
        onEdit={(service) => setSheet({ mode: "edit", service })}
        onDuplicate={(service) =>
          void mutate(
            () => duplicateService({ data: { id: service.id } }),
            "Service duplicated as a draft.",
          )
        }
        onTogglePublished={(service) =>
          void mutate(
            () =>
              setPublishedService({ data: { id: service.id, isPublished: !service.isPublished } }),
            service.isPublished ? "Service unpublished." : "Service published.",
          )
        }
        onDelete={setPendingDelete}
        onMove={(service, direction) =>
          void mutate(
            () => reorderService({ data: { id: service.id, direction } }),
            "Service order updated.",
          )
        }
      />
      {sheet && (
        <EntityFormSheet<ServiceInput>
          open
          onOpenChange={(open) => {
            if (!open) setSheet(null);
          }}
          title={sheet.mode === "create" ? "New service" : "Edit service"}
          description="Use clear, client-facing language. Changes appear on the public site after publishing."
          schema={serviceInputSchema}
          defaultValues={defaultValues}
          resetKey={sheet.service?.id ?? "new"}
          submitLabel={sheet.mode === "create" ? "Create service" : "Save changes"}
          onSubmit={async (values) => {
            const saved = await mutate(
              () =>
                sheet.mode === "create"
                  ? createService({ data: values })
                  : updateService({ data: { id: sheet.service!.id, ...values } }),
              sheet.mode === "create" ? "Service created." : "Service updated.",
            );
            if (!saved) throw new Error("The service could not be saved.");
          }}
        >
          {(form) => {
            const selectedIcon = form.watch("icon");
            return (
              <>
                <label className="block">
                  <span className="admin-form-label">Title</span>
                  <input
                    {...form.register("title")}
                    className="admin-table-input mt-1.5"
                    maxLength={100}
                  />
                  <InlineError message={form.formState.errors.title?.message} />
                </label>
                <label className="block">
                  <span className="admin-form-label">Description</span>
                  <textarea
                    {...form.register("text")}
                    className="admin-table-input mt-1.5 min-h-28 resize-y py-2"
                    maxLength={300}
                  />
                  <InlineError message={form.formState.errors.text?.message} />
                </label>
                <fieldset>
                  <legend className="admin-form-label">Icon</legend>
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {SERVICE_ICON_NAMES.map((iconName) => {
                      const Icon = ICONS[iconName];
                      const selected = selectedIcon === iconName;
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() =>
                            form.setValue("icon", iconName, {
                              shouldDirty: true,
                              shouldValidate: true,
                            })
                          }
                          className={`admin-icon-picker ${selected ? "admin-icon-picker-active" : ""}`}
                          aria-pressed={selected}
                          title={iconName}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="sr-only">{iconName}</span>
                        </button>
                      );
                    })}
                  </div>
                  <InlineError message={form.formState.errors.icon?.message} />
                </fieldset>
              </>
            );
          }}
        </EntityFormSheet>
      )}
      <ConfirmDelete
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        itemName={pendingDelete?.title}
        loading={deleting}
        onConfirm={() => {
          if (!pendingDelete) return;
          setDeleting(true);
          void mutate(
            () => deleteService({ data: { id: pendingDelete.id } }),
            "Service deleted.",
          ).then(() => {
            setDeleting(false);
            setPendingDelete(null);
          });
        }}
      />
    </>
  );
}

function InlineError({ message }: { message: string | undefined }) {
  return message ? <p className="mt-1.5 text-xs text-red-300">{message}</p> : null;
}
