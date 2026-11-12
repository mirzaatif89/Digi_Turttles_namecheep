import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.blog-C3ux3RpB.js
var $$splitComponentImporter = () => import("./admin.blog-Cwe-30Y5.mjs");
var Route = createFileRoute("/admin/blog")({
	loader: () => routeAdminModule("blog"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
