import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.leads-KM7MPoGT.js
var $$splitComponentImporter = () => import("./admin.leads-Z6HUBwZB.mjs");
var Route = createFileRoute("/admin/leads")({
	loader: () => routeAdminModule("leads"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
