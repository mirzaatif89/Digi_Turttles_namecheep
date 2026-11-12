import { Kt as redirect, b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminSession } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DNYCVIYB.js
var $$splitComponentImporter = () => import("./admin-Du1aMz8_.mjs");
var Route = createFileRoute("/admin")({
	beforeLoad: async ({ location }) => {
		const session = await routeAdminSession();
		if (!session) throw redirect({ href: `/login?redirect=${encodeURIComponent(location.pathname)}` });
		return { adminSession: session };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
