import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  serviceIdSchema,
  serviceInputSchema,
  servicePublishSchema,
  serviceReorderSchema,
  updateServiceSchema,
} from "./services.schemas";
import type { PermissionAction } from "./permissions";

async function requireServicesPermission(action: PermissionAction) {
  const { PermissionDeniedError, requirePermission } = await import("./permissions.server");
  try {
    return await requirePermission("services", action);
  } catch (error) {
    if (error instanceof PermissionDeniedError) {
      throw new Response("Forbidden", { status: 403, statusText: "Forbidden" });
    }
    throw error;
  }
}

async function auditServicesAction(
  session: Awaited<ReturnType<typeof requireServicesPermission>>,
  action: string,
  recordId: string | null,
  summary: string,
): Promise<void> {
  const [{ getRequestIP }, { getDb }, { recordAuditLog }] = await Promise.all([
    import("@tanstack/react-start/server"),
    import("./db.server"),
    import("./repos/audit-logs.server"),
  ]);
  await recordAuditLog(await getDb(), {
    adminId: session.user.id,
    module: "services",
    action,
    recordId,
    summary: summary.slice(0, 500),
    ipAddress: getRequestIP() ?? "unknown",
  });
}

export const listServices = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireServicesPermission("view");
  const [{ getDb }, repo] = await Promise.all([
    import("./db.server"),
    import("./repos/services.server"),
  ]);
  const services = await repo.listServices(await getDb());
  await auditServicesAction(session, "view", null, "Viewed services");
  return services;
});

export const createService = createServerFn({ method: "POST" })
  .validator(serviceInputSchema)
  .handler(async ({ data }) => {
    const session = await requireServicesPermission("create");
    const [{ getDb }, repo] = await Promise.all([
      import("./db.server"),
      import("./repos/services.server"),
    ]);
    const service = await repo.createService(await getDb(), data);
    repo.invalidatePublishedServicesCache();
    await auditServicesAction(session, "create", service.id, `Created service: ${service.title}`);
    return service;
  });

export const updateService = createServerFn({ method: "POST" })
  .validator(updateServiceSchema)
  .handler(async ({ data }) => {
    const session = await requireServicesPermission("edit");
    const [{ getDb }, repo] = await Promise.all([
      import("./db.server"),
      import("./repos/services.server"),
    ]);
    const service = await repo.updateService(await getDb(), data.id, data);
    if (!service) throw new Response("Service not found", { status: 404 });
    repo.invalidatePublishedServicesCache();
    await auditServicesAction(session, "update", service.id, `Updated service: ${service.title}`);
    return service;
  });

export const deleteService = createServerFn({ method: "POST" })
  .validator(serviceIdSchema)
  .handler(async ({ data }) => {
    const session = await requireServicesPermission("delete");
    const [{ getDb }, repo] = await Promise.all([
      import("./db.server"),
      import("./repos/services.server"),
    ]);
    const service = await repo.getService(await getDb(), data.id);
    if (!service) throw new Response("Service not found", { status: 404 });
    await repo.deleteService(await getDb(), data.id);
    repo.invalidatePublishedServicesCache();
    await auditServicesAction(session, "delete", data.id, `Deleted service: ${service.title}`);
    return { id: data.id };
  });

export const duplicateService = createServerFn({ method: "POST" })
  .validator(serviceIdSchema)
  .handler(async ({ data }) => {
    const session = await requireServicesPermission("create");
    const [{ getDb }, repo] = await Promise.all([
      import("./db.server"),
      import("./repos/services.server"),
    ]);
    const service = await repo.duplicateService(await getDb(), data.id);
    if (!service) throw new Response("Service not found", { status: 404 });
    repo.invalidatePublishedServicesCache();
    await auditServicesAction(
      session,
      "duplicate",
      service.id,
      `Duplicated service: ${service.title}`,
    );
    return service;
  });

export const setPublishedService = createServerFn({ method: "POST" })
  .validator(servicePublishSchema)
  .handler(async ({ data }) => {
    const session = await requireServicesPermission("publish");
    const [{ getDb }, repo] = await Promise.all([
      import("./db.server"),
      import("./repos/services.server"),
    ]);
    const service = await repo.setServicePublished(await getDb(), data.id, data.isPublished);
    if (!service) throw new Response("Service not found", { status: 404 });
    repo.invalidatePublishedServicesCache();
    await auditServicesAction(
      session,
      data.isPublished ? "publish" : "unpublish",
      service.id,
      `${data.isPublished ? "Published" : "Unpublished"} service: ${service.title}`,
    );
    return service;
  });

export const reorderService = createServerFn({ method: "POST" })
  .validator(serviceReorderSchema)
  .handler(async ({ data }) => {
    const session = await requireServicesPermission("edit");
    const [{ getDb }, repo] = await Promise.all([
      import("./db.server"),
      import("./repos/services.server"),
    ]);
    const service = await repo.reorderService(await getDb(), data.id, data.direction);
    if (!service) throw new Response("Service not found", { status: 404 });
    repo.invalidatePublishedServicesCache();
    await auditServicesAction(
      session,
      "reorder",
      service.id,
      `Reordered service: ${service.title}`,
    );
    return service;
  });

/** Read-only public data. It intentionally does not require an admin session. */
export const getPublishedServices = createServerFn({ method: "GET" }).handler(async () => {
  const [{ getDb }, { getPublishedServicesWithFallback }] = await Promise.all([
    import("./db.server"),
    import("./repos/services.server"),
  ]);
  return getPublishedServicesWithFallback(await getDb());
});

export { requireServicesPermission };
