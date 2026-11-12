import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-CBp8q61f.js
var $$splitComponentImporter = () => import("./admin.settings-JiXorUpk.mjs");
var Route = createFileRoute("/admin/settings")({
	loader: () => routeAdminModule("settings"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
