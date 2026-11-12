import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.about-Bdop8Lzs.js
var $$splitComponentImporter = () => import("./admin.about-B0Tbl2E2.mjs");
var Route = createFileRoute("/admin/about")({
	loader: () => routeAdminModule("about"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
