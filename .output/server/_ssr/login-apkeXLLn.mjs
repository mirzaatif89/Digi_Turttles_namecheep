import { b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as sanitizeRedirect } from "./auth.schemas-TR-16eRz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-apkeXLLn.js
var $$splitComponentImporter = () => import("./login-wRxQCNzR.mjs");
var Route = createFileRoute("/login")({
	validateSearch: (search) => ({ redirect: typeof search["redirect"] === "string" ? sanitizeRedirect(search["redirect"]) : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
