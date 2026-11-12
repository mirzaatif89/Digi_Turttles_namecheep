import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as isAdminModule } from "./permissions-DHA-rRIr.mjs";
import { t as moduleTitle } from "./admin-navigation-hh6avAzj.mjs";
import { t as Route } from "./admin._module-F64KdEf0.mjs";
import { t as AdminModulePage } from "./AdminModulePage-CzQxaxrV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._module-B24_f2V8.js
var import_jsx_runtime = require_jsx_runtime();
function AdminModule() {
	const data = Route.useLoaderData();
	const module = Route.useParams().module;
	if (!isAdminModule(module)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModulePage, {
		title: moduleTitle(module),
		allowed: data.allowed
	});
}
//#endregion
export { AdminModule as component };
