import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-_sVNfobT.js
var $$splitComponentImporter = () => import("./admin.users-DHLaYBrx.mjs");
var Route = createFileRoute("/admin/users")({
	loader: () => routeAdminModule("users"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
