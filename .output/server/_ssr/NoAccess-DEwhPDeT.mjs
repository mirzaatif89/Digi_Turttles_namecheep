import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ShieldAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NoAccess-DEwhPDeT.js
var import_jsx_runtime = require_jsx_runtime();
function NoAccess() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "admin-card flex min-h-[360px] flex-col items-center justify-center p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-14 w-14 place-items-center rounded-2xl bg-red-500/15 text-red-400",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 font-display text-xl font-semibold",
				children: "You don’t have access to this area"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-[var(--admin-muted)]",
				children: "Ask a super administrator if you need an additional permission."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin",
				className: "admin-primary-button mt-6",
				children: "Back to Dashboard"
			})
		]
	});
}
//#endregion
export { NoAccess as t };
