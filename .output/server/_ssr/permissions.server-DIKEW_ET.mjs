import { a as hasPermission } from "./permissions-DHA-rRIr.mjs";
import { n as getAdminSessionFromRequest } from "./auth.server-BAlYuJAD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/permissions.server-DIKEW_ET.js
var PermissionDeniedError = class extends Error {
	statusCode = 403;
	constructor() {
		super("You do not have permission to access this area.");
	}
};
/** Server-only guard for future content mutations and every admin route loader. */
async function requirePermission(module, action) {
	const session = await getAdminSessionFromRequest();
	if (!session || !hasPermission(session.permissions, module, action)) throw new PermissionDeniedError();
	return session;
}
//#endregion
export { PermissionDeniedError, requirePermission };
