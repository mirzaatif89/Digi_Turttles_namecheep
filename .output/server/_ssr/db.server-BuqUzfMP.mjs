import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/db.server-BuqUzfMP.js
var db_server_BuqUzfMP_exports = /* @__PURE__ */ __exportAll({
	n: () => getDb,
	r: () => getEnvironmentValue,
	t: () => db_server_exports
});
var db_server_exports = /* @__PURE__ */ __exportAll$1({
	getDb: () => getDb,
	getEnvironmentValue: () => getEnvironmentValue
});
var poolPromise;
var dotenvLoaded = false;
async function loadEnvironment() {
	if (dotenvLoaded) return;
	dotenvLoaded = true;
	(await import("../_libs/dotenv.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).config({ quiet: true });
}
function required(name) {
	const value = processModule.env[name];
	if (!value) throw new Error(`Missing ${name} for admin authentication.`);
	return value;
}
/** A process-wide MySQL pool. Never import this module from a client component. */
async function getDb() {
	if (!poolPromise) poolPromise = (async () => {
		await loadEnvironment();
		const mysql = await import("../_libs/mysql2+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
		const port = Number.parseInt(processModule.env["DB_PORT"] ?? "3306", 10);
		return mysql.createPool({
			host: required("DB_HOST"),
			port: Number.isFinite(port) ? port : 3306,
			database: required("DB_NAME"),
			user: required("DB_USER"),
			password: required("DB_PASSWORD"),
			charset: "utf8mb4",
			waitForConnections: true,
			connectionLimit: 8,
			enableKeepAlive: true
		});
	})();
	return poolPromise;
}
async function getEnvironmentValue(name) {
	await loadEnvironment();
	return processModule.env[name] ?? "";
}
//#endregion
export { getDb as n, getEnvironmentValue as r, db_server_BuqUzfMP_exports as t };
