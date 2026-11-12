import { o as isAdminModule } from "./permissions-DHA-rRIr.mjs";
import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { t as loginSchema } from "./auth.schemas-TR-16eRz.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-BmMfT0_L.js
var moduleSchema = objectType({ module: stringType().refine(isAdminModule, "Unknown admin module") });
/** The sole public session probe. The homepage invokes it after hydration, at idle. */
var getAdminSession_createServerFn_handler = createServerRpc({
	id: "df1da96e2ed494e3ed66085a63d478e94194f5a90e766689bf5a09b04aca6494",
	name: "getAdminSession",
	filename: "src/lib/auth.functions.ts"
}, (opts) => getAdminSession.__executeServer(opts));
var getAdminSession = createServerFn({ method: "GET" }).handler(getAdminSession_createServerFn_handler, async () => {
	const { getAdminSessionFromRequest } = await import("./auth.server-CAbGC1fK.mjs").then((n) => n.t).then((n) => n.t);
	return getAdminSessionFromRequest();
});
var loginAdmin_createServerFn_handler = createServerRpc({
	id: "8caaebe6f9064190471145866d84bc1cab778b7dd828790c056b2c85ee4b58c1",
	name: "loginAdmin",
	filename: "src/lib/auth.functions.ts"
}, (opts) => loginAdmin.__executeServer(opts));
var loginAdmin = createServerFn({ method: "POST" }).validator(loginSchema).handler(loginAdmin_createServerFn_handler, async ({ data }) => {
	const { loginWithPassword } = await import("./auth.server-CAbGC1fK.mjs").then((n) => n.t).then((n) => n.t);
	return loginWithPassword(data);
});
var logoutAdmin_createServerFn_handler = createServerRpc({
	id: "5d87af6cfbf4fb7cf7e28127b68880e706d677aefc253df91cebb2f7cbb1bf4c",
	name: "logoutAdmin",
	filename: "src/lib/auth.functions.ts"
}, (opts) => logoutAdmin.__executeServer(opts));
var logoutAdmin = createServerFn({ method: "POST" }).handler(logoutAdmin_createServerFn_handler, async () => {
	const { logoutCurrentAdmin } = await import("./auth.server-CAbGC1fK.mjs").then((n) => n.t).then((n) => n.t);
	await logoutCurrentAdmin();
	return { ok: true };
});
var loadAdminModule_createServerFn_handler = createServerRpc({
	id: "04261ed4bc5fd75b2fe2788eeb78a4bce1b04130f1f5811863728b9214921849",
	name: "loadAdminModule",
	filename: "src/lib/auth.functions.ts"
}, (opts) => loadAdminModule.__executeServer(opts));
var loadAdminModule = createServerFn({ method: "GET" }).validator(moduleSchema).handler(loadAdminModule_createServerFn_handler, async ({ data }) => {
	const { loadPermittedModule } = await import("./admin.server-rhLpymKx.mjs");
	return loadPermittedModule(data.module);
});
var getAdminDashboard_createServerFn_handler = createServerRpc({
	id: "052a3b033787b2f581405e7fcb233a479321e512e1979d1fdbcd0a11496cb843",
	name: "getAdminDashboard",
	filename: "src/lib/auth.functions.ts"
}, (opts) => getAdminDashboard.__executeServer(opts));
var getAdminDashboard = createServerFn({ method: "GET" }).handler(getAdminDashboard_createServerFn_handler, async () => {
	const { loadDashboard } = await import("./admin.server-rhLpymKx.mjs");
	return loadDashboard();
});
//#endregion
export { getAdminDashboard_createServerFn_handler, getAdminSession_createServerFn_handler, loadAdminModule_createServerFn_handler, loginAdmin_createServerFn_handler, logoutAdmin_createServerFn_handler };
