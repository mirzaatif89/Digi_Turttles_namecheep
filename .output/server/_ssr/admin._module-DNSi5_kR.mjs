import { Yt as notFound, b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as isAdminModule } from "./permissions-DHA-rRIr.mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._module-DNSi5_kR.js
var $$splitComponentImporter = () => import("./admin._module-BFLPSixE.mjs");
var Route = createFileRoute("/admin/$module")({
	loader: async ({ params }) => {
		if (!isAdminModule(params.module)) throw notFound();
		return routeAdminModule(params.module);
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
