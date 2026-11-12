import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.media-CWoMFcPF.js
var $$splitComponentImporter = () => import("./admin.media-CQgxz-4m.mjs");
var Route = createFileRoute("/admin/media")({
	loader: () => routeAdminModule("media"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
