import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.roles-CinS3RuK.js
var $$splitComponentImporter = () => import("./admin.roles-DvAdpzlL.mjs");
var Route = createFileRoute("/admin/roles")({
	loader: () => routeAdminModule("roles"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
