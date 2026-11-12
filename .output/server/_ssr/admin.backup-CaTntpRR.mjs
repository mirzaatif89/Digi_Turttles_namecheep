import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.backup-CaTntpRR.js
var $$splitComponentImporter = () => import("./admin.backup-BkUDrlqc.mjs");
var Route = createFileRoute("/admin/backup")({
	loader: () => routeAdminModule("backup"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
