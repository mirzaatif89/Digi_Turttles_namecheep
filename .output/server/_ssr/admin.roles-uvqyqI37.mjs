import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.roles-uvqyqI37.js
var $$splitComponentImporter = () => import("./admin.roles-oN6xN1mA.mjs");
var Route = createFileRoute("/admin/roles")({
	loader: () => routeAdminModule("roles"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
