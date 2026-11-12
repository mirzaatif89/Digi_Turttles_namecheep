import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as RoutedModulePage } from "./RoutedModulePage-CTzOJ4wx.mjs";
import { t as Route } from "./admin.settings-7sDe_5rq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-BZ6KtFsv.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutedModulePage, {
		module: "settings",
		allowed: Route.useLoaderData().allowed
	});
}
//#endregion
export { Page as component };
