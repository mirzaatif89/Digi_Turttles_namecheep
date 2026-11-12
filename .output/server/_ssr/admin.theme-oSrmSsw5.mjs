import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.theme-oSrmSsw5.js
var $$splitComponentImporter = () => import("./admin.theme-QKfq5Uqz.mjs");
var Route = createFileRoute("/admin/theme")({
	loader: () => routeAdminModule("theme"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
