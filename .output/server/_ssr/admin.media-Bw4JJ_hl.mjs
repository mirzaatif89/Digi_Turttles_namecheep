import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.media-Bw4JJ_hl.js
var $$splitComponentImporter = () => import("./admin.media-BJgK1PyH.mjs");
var Route = createFileRoute("/admin/media")({
	loader: () => routeAdminModule("media"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
