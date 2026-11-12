import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BNocSjuP.mjs";
import { a as serviceReorderSchema, i as servicePublishSchema, n as serviceIdSchema, o as updateServiceSchema, r as serviceInputSchema } from "./services.schemas-U1PpKNTi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.functions-DnjVqoLi.js
var listServices = createServerFn({ method: "GET" }).handler(createSsrRpc("9af72d1b1a3230650db36170d7c77424b773f9981ca91e85d1480f81afcced62"));
var createService = createServerFn({ method: "POST" }).validator(serviceInputSchema).handler(createSsrRpc("9a8b142d3e44e62c5cf5619965af8b4e3d832477cd746582cb97b44635bf6c51"));
var updateService = createServerFn({ method: "POST" }).validator(updateServiceSchema).handler(createSsrRpc("455644bbf4092b9ea5673acf6dca19644d5a8c067b994954f0ae00b5a933b8e0"));
var deleteService = createServerFn({ method: "POST" }).validator(serviceIdSchema).handler(createSsrRpc("7299014dff0a6b1977612387e4b025720b4e6b7e5b689ca7dd98d5deb766bf23"));
var duplicateService = createServerFn({ method: "POST" }).validator(serviceIdSchema).handler(createSsrRpc("e3625f83dba907955a375b8af5211cf4c12e8413268732336bdc1c7d9c273b7d"));
var setPublishedService = createServerFn({ method: "POST" }).validator(servicePublishSchema).handler(createSsrRpc("5367fc4e815c7a1f272c8da4a4f5d720a88df46c6e4e1aafef89227fa8aa2fd2"));
var reorderService = createServerFn({ method: "POST" }).validator(serviceReorderSchema).handler(createSsrRpc("e4c0a4295829195480df51f3c9fbaf2007cfc619a659c7117d31adee397b2a2b"));
/** Read-only public data. It intentionally does not require an admin session. */
var getPublishedServices = createServerFn({ method: "GET" }).handler(createSsrRpc("324f0211bb1342f8023261b747ce5bd7f51196021cb5db570e16ff28f5878a98"));
//#endregion
export { listServices as a, updateService as c, getPublishedServices as i, deleteService as n, reorderService as o, duplicateService as r, setPublishedService as s, createService as t };
