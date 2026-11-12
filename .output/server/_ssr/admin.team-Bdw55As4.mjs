import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.team-Bdw55As4.js
var $$splitComponentImporter = () => import("./admin.team-13V_3mBk.mjs");
var Route = createFileRoute("/admin/team")({
	loader: () => routeAdminModule("team"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
