import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pages-DtOPbFYV.js
var $$splitComponentImporter = () => import("./admin.pages-Cvk2CO99.mjs");
var Route = createFileRoute("/admin/pages")({
	loader: () => routeAdminModule("pages"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
