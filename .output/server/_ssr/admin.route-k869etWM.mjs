//#region node_modules/.nitro/vite/services/ssr/assets/admin.route-k869etWM.js
/**
* TanStack server functions return their transport envelope during SSR in this
* runtime. Route loaders therefore call the same server-only work directly on
* SSR, then use the server function for client-side navigation.
*/
async function routeAdminSession() {
	{
		const { getAdminSessionFromRequest } = await import("./auth.server-BAlYuJAD.mjs").then((n) => n.t);
		return getAdminSessionFromRequest();
	}
}
async function routeAdminModule(module) {
	{
		const { loadPermittedModule } = await import("./admin.server-CZPnJpl1.mjs");
		return loadPermittedModule(module);
	}
}
async function routeAdminDashboard() {
	{
		const { loadDashboard } = await import("./admin.server-CZPnJpl1.mjs");
		return loadDashboard();
	}
}
//#endregion
export { routeAdminModule as n, routeAdminSession as r, routeAdminDashboard as t };
