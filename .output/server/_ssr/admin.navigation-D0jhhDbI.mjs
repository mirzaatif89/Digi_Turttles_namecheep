import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.navigation-D0jhhDbI.js
var $$splitComponentImporter = () => import("./admin.navigation-u5QV7wET.mjs");
var Route = createFileRoute("/admin/navigation")({
	loader: () => routeAdminModule("navigation"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
