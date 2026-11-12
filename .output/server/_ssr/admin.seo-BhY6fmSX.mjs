import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.seo-BhY6fmSX.js
var $$splitComponentImporter = () => import("./admin.seo-CnwaGste.mjs");
var Route = createFileRoute("/admin/seo")({
	loader: () => routeAdminModule("seo"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
