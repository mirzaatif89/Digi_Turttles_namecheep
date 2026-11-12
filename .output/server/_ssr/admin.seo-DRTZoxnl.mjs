import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.seo-DRTZoxnl.js
var $$splitComponentImporter = () => import("./admin.seo-Bh7I599A.mjs");
var Route = createFileRoute("/admin/seo")({
	loader: () => routeAdminModule("seo"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
