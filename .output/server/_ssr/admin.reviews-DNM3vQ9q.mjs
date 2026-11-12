import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reviews-DNM3vQ9q.js
var $$splitComponentImporter = () => import("./admin.reviews-B_pKW8wb.mjs");
var Route = createFileRoute("/admin/reviews")({
	loader: () => routeAdminModule("reviews"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
