import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.courses-k0cYZozR.js
var $$splitComponentImporter = () => import("./admin.courses-CD-HdXun.mjs");
var Route = createFileRoute("/admin/courses")({
	loader: () => routeAdminModule("courses"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
