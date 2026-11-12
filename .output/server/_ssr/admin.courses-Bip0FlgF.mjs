import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.courses-Bip0FlgF.js
var $$splitComponentImporter = () => import("./admin.courses-CkncQFuP.mjs");
var Route = createFileRoute("/admin/courses")({
	loader: () => routeAdminModule("courses"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
