import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session.functions-DIiLI_ll.js
/** Kept in a tiny isolated chunk for the post-hydration public-nav session probe. */
var getPublicAdminSession_createServerFn_handler = createServerRpc({
	id: "236a3eda8ae4321375b3e64ff4dc3b9a985e1aeaa2bd763a10692d62c3c1cbc5",
	name: "getPublicAdminSession",
	filename: "src/lib/session.functions.ts"
}, (opts) => getPublicAdminSession.__executeServer(opts));
var getPublicAdminSession = createServerFn({ method: "GET" }).handler(getPublicAdminSession_createServerFn_handler, async () => {
	const { getAdminSessionFromRequest } = await import("./auth.server-CAbGC1fK.mjs").then((n) => n.t).then((n) => n.t);
	return getAdminSessionFromRequest();
});
//#endregion
export { getPublicAdminSession_createServerFn_handler };
