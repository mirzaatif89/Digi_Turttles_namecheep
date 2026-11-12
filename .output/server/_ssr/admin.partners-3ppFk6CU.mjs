import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.partners-3ppFk6CU.js
var $$splitComponentImporter = () => import("./admin.partners-p98cxmvW.mjs");
var Route = createFileRoute("/admin/partners")({
	loader: () => routeAdminModule("partners"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
