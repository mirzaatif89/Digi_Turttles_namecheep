import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reviews-CKmKm-Oq.js
var $$splitComponentImporter = () => import("./admin.reviews-BZ7NbtoH.mjs");
var Route = createFileRoute("/admin/reviews")({
	loader: () => routeAdminModule("reviews"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
