import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.subscribers-_jFTXDYr.js
var $$splitComponentImporter = () => import("./admin.subscribers-DnM15N6T.mjs");
var Route = createFileRoute("/admin/subscribers")({
	loader: () => routeAdminModule("subscribers"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
