import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.partners-CNS0a3ip.js
var $$splitComponentImporter = () => import("./admin.partners-Cz5Yg2gA.mjs");
var Route = createFileRoute("/admin/partners")({
	loader: () => routeAdminModule("partners"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
