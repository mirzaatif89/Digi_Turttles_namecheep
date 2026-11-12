import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.blog-NI4JHF80.js
var $$splitComponentImporter = () => import("./admin.blog-DJS80INE.mjs");
var Route = createFileRoute("/admin/blog")({
	loader: () => routeAdminModule("blog"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
