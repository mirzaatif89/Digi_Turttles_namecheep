import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.analytics-Dztzfx6r.js
var $$splitComponentImporter = () => import("./admin.analytics-DnijnJ8M.mjs");
var Route = createFileRoute("/admin/analytics")({
	loader: () => routeAdminModule("analytics"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
