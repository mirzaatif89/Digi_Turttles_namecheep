import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as routeAdminModule } from "./admin.route-k869etWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.cta-D9gfyvGD.js
var $$splitComponentImporter = () => import("./admin.cta-CFbAAwmw.mjs");
var Route = createFileRoute("/admin/cta")({
	loader: () => routeAdminModule("cta"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
