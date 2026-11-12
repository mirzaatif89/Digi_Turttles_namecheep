import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.analytics-Bq2OK8wG.js
var $$splitComponentImporter = () => import("./admin.analytics-DeJz4tNE.mjs");
var Route = createFileRoute("/admin/analytics")({
	loader: () => routeAdminModule("analytics"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
