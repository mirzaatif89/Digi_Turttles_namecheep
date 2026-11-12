//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-D42isTSv.js
var manifest = {
	"04261ed4bc5fd75b2fe2788eeb78a4bce1b04130f1f5811863728b9214921849": {
		functionName: "loadAdminModule_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BmMfT0_L.mjs")
	},
	"052a3b033787b2f581405e7fcb233a479321e512e1979d1fdbcd0a11496cb843": {
		functionName: "getAdminDashboard_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BmMfT0_L.mjs")
	},
	"236a3eda8ae4321375b3e64ff4dc3b9a985e1aeaa2bd763a10692d62c3c1cbc5": {
		functionName: "getPublicAdminSession_createServerFn_handler",
		importer: () => import("./_ssr/session.functions-DIiLI_ll.mjs")
	},
	"324f0211bb1342f8023261b747ce5bd7f51196021cb5db570e16ff28f5878a98": {
		functionName: "getPublishedServices_createServerFn_handler",
		importer: () => import("./_ssr/services.functions-BIA_UCXm.mjs")
	},
	"455644bbf4092b9ea5673acf6dca19644d5a8c067b994954f0ae00b5a933b8e0": {
		functionName: "updateService_createServerFn_handler",
		importer: () => import("./_ssr/services.functions-BIA_UCXm.mjs")
	},
	"5367fc4e815c7a1f272c8da4a4f5d720a88df46c6e4e1aafef89227fa8aa2fd2": {
		functionName: "setPublishedService_createServerFn_handler",
		importer: () => import("./_ssr/services.functions-BIA_UCXm.mjs")
	},
	"5d87af6cfbf4fb7cf7e28127b68880e706d677aefc253df91cebb2f7cbb1bf4c": {
		functionName: "logoutAdmin_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BmMfT0_L.mjs")
	},
	"7299014dff0a6b1977612387e4b025720b4e6b7e5b689ca7dd98d5deb766bf23": {
		functionName: "deleteService_createServerFn_handler",
		importer: () => import("./_ssr/services.functions-BIA_UCXm.mjs")
	},
	"8caaebe6f9064190471145866d84bc1cab778b7dd828790c056b2c85ee4b58c1": {
		functionName: "loginAdmin_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BmMfT0_L.mjs")
	},
	"9a8b142d3e44e62c5cf5619965af8b4e3d832477cd746582cb97b44635bf6c51": {
		functionName: "createService_createServerFn_handler",
		importer: () => import("./_ssr/services.functions-BIA_UCXm.mjs")
	},
	"9af72d1b1a3230650db36170d7c77424b773f9981ca91e85d1480f81afcced62": {
		functionName: "listServices_createServerFn_handler",
		importer: () => import("./_ssr/services.functions-BIA_UCXm.mjs")
	},
	"bcbf405abb63715daaf1487f2958492789217ff1449ff447570bc418404b6901": {
		functionName: "getDashboardData_createServerFn_handler",
		importer: () => import("./_ssr/dashboard.functions-DtvYsz5C.mjs")
	},
	"df1da96e2ed494e3ed66085a63d478e94194f5a90e766689bf5a09b04aca6494": {
		functionName: "getAdminSession_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BmMfT0_L.mjs")
	},
	"e3625f83dba907955a375b8af5211cf4c12e8413268732336bdc1c7d9c273b7d": {
		functionName: "duplicateService_createServerFn_handler",
		importer: () => import("./_ssr/services.functions-BIA_UCXm.mjs")
	},
	"e4c0a4295829195480df51f3c9fbaf2007cfc619a659c7117d31adee397b2a2b": {
		functionName: "reorderService_createServerFn_handler",
		importer: () => import("./_ssr/services.functions-BIA_UCXm.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
