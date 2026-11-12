import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as NoAccess, r as PageHeader, t as EmptyState } from "./PageHeader-C9WTh_bf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminModulePage-CzQxaxrV.js
var import_jsx_runtime = require_jsx_runtime();
function AdminModulePage({ title, allowed }) {
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoAccess, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title,
		description: "Module workspace"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title })] });
}
//#endregion
export { AdminModulePage as t };
