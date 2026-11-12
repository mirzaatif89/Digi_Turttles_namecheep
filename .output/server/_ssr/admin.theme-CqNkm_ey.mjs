import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.theme-CqNkm_ey.js
var $$splitComponentImporter = () => import("./admin.theme-DBER_hmx.mjs");
var Route = createFileRoute("/admin/theme")({
	loader: () => routeAdminModule("theme"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
