import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.activity-nZ0Rpv9A.js
var $$splitComponentImporter = () => import("./admin.activity-Dx5aq2U2.mjs");
var Route = createFileRoute("/admin/activity")({
	loader: () => routeAdminModule("activity"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
