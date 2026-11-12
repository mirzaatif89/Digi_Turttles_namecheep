import { o as isAdminModule } from "./permissions-DHA-rRIr.mjs";
import { Yt as notFound, b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._module-F64KdEf0.js
var $$splitComponentImporter = () => import("./admin._module-B24_f2V8.mjs");
var Route = createFileRoute("/admin/$module")({
	loader: async ({ params }) => {
		if (!isAdminModule(params.module)) throw notFound();
		return routeAdminModule(params.module);
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
