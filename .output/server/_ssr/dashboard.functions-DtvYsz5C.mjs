import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.functions-DtvYsz5C.js
/** The dashboard's one client-facing data request. It is permission-guarded server-side. */
var getDashboardData_createServerFn_handler = createServerRpc({
	id: "bcbf405abb63715daaf1487f2958492789217ff1449ff447570bc418404b6901",
	name: "getDashboardData",
	filename: "src/lib/dashboard.functions.ts"
}, (opts) => getDashboardData.__executeServer(opts));
var getDashboardData = createServerFn({ method: "GET" }).handler(getDashboardData_createServerFn_handler, async () => {
	const { loadDashboardData } = await import("./dashboard.server-DlbyCnK_.mjs");
	return loadDashboardData();
});
//#endregion
export { getDashboardData_createServerFn_handler };
