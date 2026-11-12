import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.services-BMzCQb_e.js
var $$splitComponentImporter = () => import("./admin.services-q8BO_yKT.mjs");
var Route = createFileRoute("/admin/services")({
	validateSearch: (search) => ({ new: search["new"] === true || search["new"] === "1" }),
	loader: () => routeAdminModule("services"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
