import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.home-5IMnLJgq.js
var $$splitComponentImporter = () => import("./admin.home-BWozPqXQ.mjs");
var Route = createFileRoute("/admin/home")({
	loader: () => routeAdminModule("home"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
