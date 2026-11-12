//#region node_modules/.nitro/vite/services/ssr/assets/permissions-DHA-rRIr.js
var ADMIN_MODULES = [
	"dashboard",
	"home",
	"about",
	"theme",
	"navigation",
	"cta",
	"services",
	"courses",
	"projects",
	"team",
	"blog",
	"partners",
	"reviews",
	"faqs",
	"pages",
	"messages",
	"leads",
	"subscribers",
	"media",
	"seo",
	"analytics",
	"users",
	"roles",
	"settings",
	"activity",
	"backup"
];
var PERMISSION_ACTIONS = [
	"view",
	"create",
	"edit",
	"delete",
	"publish"
];
var ADMIN_ROLES = [
	"super_admin",
	"admin",
	"editor",
	"author",
	"support",
	"viewer"
];
var noActions = () => ({
	view: false,
	create: false,
	edit: false,
	delete: false,
	publish: false
});
var emptyPermissionMap = () => Object.fromEntries(ADMIN_MODULES.map((module) => [module, noActions()]));
var grant = (modules, actions) => {
	const map = emptyPermissionMap();
	for (const module of modules) for (const action of actions) map[module][action] = true;
	return map;
};
var allModules = [...ADMIN_MODULES];
/** Baseline role matrix. User-specific JSON overrides are merged by `effectivePermissions`. */
var ROLE_DEFAULTS = {
	super_admin: grant(allModules, PERMISSION_ACTIONS),
	admin: grant(allModules, PERMISSION_ACTIONS),
	editor: grant(["dashboard", ...[
		"home",
		"about",
		"theme",
		"navigation",
		"cta",
		"services",
		"courses",
		"projects",
		"team",
		"blog",
		"partners",
		"reviews",
		"faqs",
		"pages"
	]], [
		"view",
		"create",
		"edit",
		"publish"
	]),
	author: grant(["blog"], [
		"view",
		"create",
		"edit"
	]),
	support: grant([
		"messages",
		"leads",
		"subscribers"
	], ["view", "edit"]),
	viewer: grant(allModules, ["view"])
};
function isAdminRole(value) {
	return ADMIN_ROLES.includes(value);
}
function isAdminModule(value) {
	return ADMIN_MODULES.includes(value);
}
/**
* Keeps authorization deterministic and independently testable: role defaults
* are copied first, then only known boolean per-user overrides are applied.
*/
function effectivePermissions(role, overrides) {
	const defaults = ROLE_DEFAULTS[role];
	const result = emptyPermissionMap();
	for (const module of ADMIN_MODULES) result[module] = { ...defaults[module] };
	if (!overrides) return result;
	for (const module of ADMIN_MODULES) {
		const override = overrides[module];
		if (!override) continue;
		for (const action of PERMISSION_ACTIONS) if (typeof override[action] === "boolean") result[module][action] = override[action];
	}
	return result;
}
function hasPermission(map, module, action) {
	return map[module][action] === true;
}
//#endregion
export { hasPermission as a, effectivePermissions as i, ADMIN_ROLES as n, isAdminModule as o, ROLE_DEFAULTS as r, isAdminRole as s, ADMIN_MODULES as t };
