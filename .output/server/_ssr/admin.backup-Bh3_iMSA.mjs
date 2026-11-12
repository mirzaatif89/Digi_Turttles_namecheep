import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.backup-Bh3_iMSA.js
var $$splitComponentImporter = () => import("./admin.backup-DJaq_guS.mjs");
var Route = createFileRoute("/admin/backup")({
	loader: () => routeAdminModule("backup"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
