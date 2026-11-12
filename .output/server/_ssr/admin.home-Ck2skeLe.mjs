import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.home-Ck2skeLe.js
var $$splitComponentImporter = () => import("./admin.home-DFE-h7tL.mjs");
var Route = createFileRoute("/admin/home")({
	loader: () => routeAdminModule("home"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
