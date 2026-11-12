import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-BOxAZn0n.js
var $$splitComponentImporter = () => import("./admin.users-C_6SHbdO.mjs");
var Route = createFileRoute("/admin/users")({
	loader: () => routeAdminModule("users"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
