import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as RoutedModulePage } from "./RoutedModulePage-CTzOJ4wx.mjs";
import { t as Route } from "./admin.users-BOxAZn0n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-C_6SHbdO.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutedModulePage, {
		module: "users",
		allowed: Route.useLoaderData().allowed
	});
}
//#endregion
export { Page as component };
