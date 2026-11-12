import { o as isAdminModule } from "./permissions-DHA-rRIr.mjs";
import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { t as loginSchema } from "./auth.schemas-TR-16eRz.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DOseheDJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-j7hH3T7K.js
var moduleSchema = objectType({ module: stringType().refine(isAdminModule, "Unknown admin module") });
createServerFn({ method: "GET" }).handler(createSsrRpc("df1da96e2ed494e3ed66085a63d478e94194f5a90e766689bf5a09b04aca6494"));
var loginAdmin = createServerFn({ method: "POST" }).validator(loginSchema).handler(createSsrRpc("8caaebe6f9064190471145866d84bc1cab778b7dd828790c056b2c85ee4b58c1"));
var logoutAdmin = createServerFn({ method: "POST" }).handler(createSsrRpc("5d87af6cfbf4fb7cf7e28127b68880e706d677aefc253df91cebb2f7cbb1bf4c"));
createServerFn({ method: "GET" }).validator(moduleSchema).handler(createSsrRpc("04261ed4bc5fd75b2fe2788eeb78a4bce1b04130f1f5811863728b9214921849"));
createServerFn({ method: "GET" }).handler(createSsrRpc("052a3b033787b2f581405e7fcb233a479321e512e1979d1fdbcd0a11496cb843"));
//#endregion
export { logoutAdmin as n, loginAdmin as t };
