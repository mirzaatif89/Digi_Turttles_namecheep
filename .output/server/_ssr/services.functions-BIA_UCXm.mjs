import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { a as serviceReorderSchema, i as servicePublishSchema, n as serviceIdSchema, o as updateServiceSchema, r as serviceInputSchema } from "./services.schemas-U1PpKNTi.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.functions-BIA_UCXm.js
async function requireServicesPermission(action) {
	const { PermissionDeniedError, requirePermission } = await import("./permissions.server-BAvxkYBX.mjs");
	try {
		return await requirePermission("services", action);
	} catch (error) {
		if (error instanceof PermissionDeniedError) throw new Response("Forbidden", {
			status: 403,
			statusText: "Forbidden"
		});
		throw error;
	}
}
async function auditServicesAction(session, action, recordId, summary) {
	const [{ getRequestIP }, { getDb }, { recordAuditLog }] = await Promise.all([
		import("./server-DmcLDKF6.mjs").then((n) => n.o).then((n) => n.t),
		import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t),
		import("./audit-logs.server-dauuTjWu.mjs")
	]);
	await recordAuditLog(await getDb(), {
		adminId: session.user.id,
		module: "services",
		action,
		recordId,
		summary: summary.slice(0, 500),
		ipAddress: getRequestIP() ?? "unknown"
	});
}
var listServices_createServerFn_handler = createServerRpc({
	id: "9af72d1b1a3230650db36170d7c77424b773f9981ca91e85d1480f81afcced62",
	name: "listServices",
	filename: "src/lib/services.functions.ts"
}, (opts) => listServices.__executeServer(opts));
var listServices = createServerFn({ method: "GET" }).handler(listServices_createServerFn_handler, async () => {
	const session = await requireServicesPermission("view");
	const [{ getDb }, repo] = await Promise.all([import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t), import("./services.server-Ct2AdoTe.mjs")]);
	const services = await repo.listServices(await getDb());
	await auditServicesAction(session, "view", null, "Viewed services");
	return services;
});
var createService_createServerFn_handler = createServerRpc({
	id: "9a8b142d3e44e62c5cf5619965af8b4e3d832477cd746582cb97b44635bf6c51",
	name: "createService",
	filename: "src/lib/services.functions.ts"
}, (opts) => createService.__executeServer(opts));
var createService = createServerFn({ method: "POST" }).validator(serviceInputSchema).handler(createService_createServerFn_handler, async ({ data }) => {
	const session = await requireServicesPermission("create");
	const [{ getDb }, repo] = await Promise.all([import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t), import("./services.server-Ct2AdoTe.mjs")]);
	const service = await repo.createService(await getDb(), data);
	repo.invalidatePublishedServicesCache();
	await auditServicesAction(session, "create", service.id, `Created service: ${service.title}`);
	return service;
});
var updateService_createServerFn_handler = createServerRpc({
	id: "455644bbf4092b9ea5673acf6dca19644d5a8c067b994954f0ae00b5a933b8e0",
	name: "updateService",
	filename: "src/lib/services.functions.ts"
}, (opts) => updateService.__executeServer(opts));
var updateService = createServerFn({ method: "POST" }).validator(updateServiceSchema).handler(updateService_createServerFn_handler, async ({ data }) => {
	const session = await requireServicesPermission("edit");
	const [{ getDb }, repo] = await Promise.all([import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t), import("./services.server-Ct2AdoTe.mjs")]);
	const service = await repo.updateService(await getDb(), data.id, data);
	if (!service) throw new Response("Service not found", { status: 404 });
	repo.invalidatePublishedServicesCache();
	await auditServicesAction(session, "update", service.id, `Updated service: ${service.title}`);
	return service;
});
var deleteService_createServerFn_handler = createServerRpc({
	id: "7299014dff0a6b1977612387e4b025720b4e6b7e5b689ca7dd98d5deb766bf23",
	name: "deleteService",
	filename: "src/lib/services.functions.ts"
}, (opts) => deleteService.__executeServer(opts));
var deleteService = createServerFn({ method: "POST" }).validator(serviceIdSchema).handler(deleteService_createServerFn_handler, async ({ data }) => {
	const session = await requireServicesPermission("delete");
	const [{ getDb }, repo] = await Promise.all([import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t), import("./services.server-Ct2AdoTe.mjs")]);
	const service = await repo.getService(await getDb(), data.id);
	if (!service) throw new Response("Service not found", { status: 404 });
	await repo.deleteService(await getDb(), data.id);
	repo.invalidatePublishedServicesCache();
	await auditServicesAction(session, "delete", data.id, `Deleted service: ${service.title}`);
	return { id: data.id };
});
var duplicateService_createServerFn_handler = createServerRpc({
	id: "e3625f83dba907955a375b8af5211cf4c12e8413268732336bdc1c7d9c273b7d",
	name: "duplicateService",
	filename: "src/lib/services.functions.ts"
}, (opts) => duplicateService.__executeServer(opts));
var duplicateService = createServerFn({ method: "POST" }).validator(serviceIdSchema).handler(duplicateService_createServerFn_handler, async ({ data }) => {
	const session = await requireServicesPermission("create");
	const [{ getDb }, repo] = await Promise.all([import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t), import("./services.server-Ct2AdoTe.mjs")]);
	const service = await repo.duplicateService(await getDb(), data.id);
	if (!service) throw new Response("Service not found", { status: 404 });
	repo.invalidatePublishedServicesCache();
	await auditServicesAction(session, "duplicate", service.id, `Duplicated service: ${service.title}`);
	return service;
});
var setPublishedService_createServerFn_handler = createServerRpc({
	id: "5367fc4e815c7a1f272c8da4a4f5d720a88df46c6e4e1aafef89227fa8aa2fd2",
	name: "setPublishedService",
	filename: "src/lib/services.functions.ts"
}, (opts) => setPublishedService.__executeServer(opts));
var setPublishedService = createServerFn({ method: "POST" }).validator(servicePublishSchema).handler(setPublishedService_createServerFn_handler, async ({ data }) => {
	const session = await requireServicesPermission("publish");
	const [{ getDb }, repo] = await Promise.all([import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t), import("./services.server-Ct2AdoTe.mjs")]);
	const service = await repo.setServicePublished(await getDb(), data.id, data.isPublished);
	if (!service) throw new Response("Service not found", { status: 404 });
	repo.invalidatePublishedServicesCache();
	await auditServicesAction(session, data.isPublished ? "publish" : "unpublish", service.id, `${data.isPublished ? "Published" : "Unpublished"} service: ${service.title}`);
	return service;
});
var reorderService_createServerFn_handler = createServerRpc({
	id: "e4c0a4295829195480df51f3c9fbaf2007cfc619a659c7117d31adee397b2a2b",
	name: "reorderService",
	filename: "src/lib/services.functions.ts"
}, (opts) => reorderService.__executeServer(opts));
var reorderService = createServerFn({ method: "POST" }).validator(serviceReorderSchema).handler(reorderService_createServerFn_handler, async ({ data }) => {
	const session = await requireServicesPermission("edit");
	const [{ getDb }, repo] = await Promise.all([import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t), import("./services.server-Ct2AdoTe.mjs")]);
	const service = await repo.reorderService(await getDb(), data.id, data.direction);
	if (!service) throw new Response("Service not found", { status: 404 });
	repo.invalidatePublishedServicesCache();
	await auditServicesAction(session, "reorder", service.id, `Reordered service: ${service.title}`);
	return service;
});
var getPublishedServices_createServerFn_handler = createServerRpc({
	id: "324f0211bb1342f8023261b747ce5bd7f51196021cb5db570e16ff28f5878a98",
	name: "getPublishedServices",
	filename: "src/lib/services.functions.ts"
}, (opts) => getPublishedServices.__executeServer(opts));
var getPublishedServices = createServerFn({ method: "GET" }).handler(getPublishedServices_createServerFn_handler, async () => {
	const [{ getDb }, { getPublishedServicesWithFallback }] = await Promise.all([import("./db.server-BuqUzfMP.mjs").then((n) => n.t).then((n) => n.t), import("./services.server-Ct2AdoTe.mjs")]);
	return getPublishedServicesWithFallback(await getDb());
});
//#endregion
export { createService_createServerFn_handler, deleteService_createServerFn_handler, duplicateService_createServerFn_handler, getPublishedServices_createServerFn_handler, listServices_createServerFn_handler, reorderService_createServerFn_handler, setPublishedService_createServerFn_handler, updateService_createServerFn_handler };
