import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.schemas-TR-16eRz.js
var loginSchema = objectType({
	email: stringType().trim().email("Enter a valid email address.").max(254),
	password: stringType().min(1, "Enter your password.").max(1024)
});
stringType().max(2048).optional();
/** Only same-origin absolute paths are accepted; `//host` is deliberately rejected. */
function sanitizeRedirect(value) {
	if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/admin";
	return value;
}
//#endregion
export { sanitizeRedirect as n, loginSchema as t };
