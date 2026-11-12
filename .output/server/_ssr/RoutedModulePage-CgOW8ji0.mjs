import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as moduleTitle } from "./admin-navigation-hh6avAzj.mjs";
import { t as AdminModulePage } from "./AdminModulePage-CzQxaxrV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RoutedModulePage-CgOW8ji0.js
var import_jsx_runtime = require_jsx_runtime();
function RoutedModulePage({ module, allowed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModulePage, {
		title: moduleTitle(module),
		allowed
	});
}
//#endregion
export { RoutedModulePage as t };
