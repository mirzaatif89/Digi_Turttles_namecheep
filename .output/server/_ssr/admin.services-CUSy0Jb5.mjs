import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.services-CUSy0Jb5.js
var $$splitComponentImporter = () => import("./admin.services-C2T2N5xM.mjs");
var Route = createFileRoute("/admin/services")({
	validateSearch: (search) => ({ new: search["new"] === true || search["new"] === "1" }),
	loader: () => routeAdminModule("services"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
