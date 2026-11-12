import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.team-Dy7SnlnA.js
var $$splitComponentImporter = () => import("./admin.team-BeaKued9.mjs");
var Route = createFileRoute("/admin/team")({
	loader: () => routeAdminModule("team"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
