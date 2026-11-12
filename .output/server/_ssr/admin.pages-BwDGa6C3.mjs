import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pages-BwDGa6C3.js
var $$splitComponentImporter = () => import("./admin.pages-B61c1ICc.mjs");
var Route = createFileRoute("/admin/pages")({
	loader: () => routeAdminModule("pages"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
