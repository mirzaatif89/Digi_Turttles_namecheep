import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects-CTchEI6c.js
var $$splitComponentImporter = () => import("./admin.projects-C_RSzT4W.mjs");
var Route = createFileRoute("/admin/projects")({
	loader: () => routeAdminModule("projects"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
