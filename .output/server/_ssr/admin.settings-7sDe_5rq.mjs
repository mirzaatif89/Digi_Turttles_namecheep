import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-7sDe_5rq.js
var $$splitComponentImporter = () => import("./admin.settings-BZ6KtFsv.mjs");
var Route = createFileRoute("/admin/settings")({
	loader: () => routeAdminModule("settings"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
