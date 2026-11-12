import { Kt as redirect, b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as routeAdminSession } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CkeL7Vac.js
var $$splitComponentImporter = () => import("./admin-u5o2c2xi.mjs");
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
