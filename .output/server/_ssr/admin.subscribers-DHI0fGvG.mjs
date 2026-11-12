import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.subscribers-DHI0fGvG.js
var $$splitComponentImporter = () => import("./admin.subscribers-BLGoYRpc.mjs");
var Route = createFileRoute("/admin/subscribers")({
	loader: () => routeAdminModule("subscribers"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
