globalThis.__nitro_main__ = import.meta.url;
import { b as serve, y as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1d07-dvUzyqnYyMXh4p5Oqv8Jc4KwWwY\"",
		"mtime": "2026-11-10T19:49:17.000Z",
		"size": 7431,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-11-10T19:49:17.000Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/admin-DxQuWiNB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15b59-pEWSDj338wbuIJif1ZZiVzQCqkk\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 88921,
		"path": "../public/assets/admin-DxQuWiNB.js"
	},
	"/assets/admin-navigation-D19npLh_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74f-tZifbvsqi1PAcUU/FeC7r0p0Pf0\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 1871,
		"path": "../public/assets/admin-navigation-D19npLh_.js"
	},
	"/assets/admin.about-BkSFPSxJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-MwCWEPASwqS+x7uT3d2+M4yT6cQ\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 255,
		"path": "../public/assets/admin.about-BkSFPSxJ.js"
	},
	"/assets/admin.activity-BJU7LGNC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-wERjBN6xxXtUjeg86ui8anXOt1Y\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 258,
		"path": "../public/assets/admin.activity-BJU7LGNC.js"
	},
	"/assets/admin.analytics-8v_i8c3g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-P1Dji8yJGUTwmlIM0N76i110E5w\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 259,
		"path": "../public/assets/admin.analytics-8v_i8c3g.js"
	},
	"/assets/admin.backup-MebVohk9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-5v4poQBjDW1mPSIFtmXuHHFW82U\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 256,
		"path": "../public/assets/admin.backup-MebVohk9.js"
	},
	"/assets/admin.blog-Dt1055Xj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-g0+HcLt54DHyus+8K3gPi9pyNtI\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 254,
		"path": "../public/assets/admin.blog-Dt1055Xj.js"
	},
	"/assets/admin.courses-o48yhLjB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-E5kC+Vsy8KQqH1jIXNaKMllJc8s\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 257,
		"path": "../public/assets/admin.courses-o48yhLjB.js"
	},
	"/assets/admin.cta-XtAnScMw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-cvUrPARAwbuUPb++AeyCYgGhRyo\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 253,
		"path": "../public/assets/admin.cta-XtAnScMw.js"
	},
	"/assets/admin.index-CzIJVQHB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-CGhGwFMCKj0pHYiKiI3WVgTsxO4\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 185,
		"path": "../public/assets/admin.index-CzIJVQHB.js"
	},
	"/assets/admin.faqs-nm9mPPZP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-iwlM0LuJNJyjmXx2rblGmL0u3mU\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 254,
		"path": "../public/assets/admin.faqs-nm9mPPZP.js"
	},
	"/assets/admin.home-V3W0R6jF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-Wwjmg++dpNw/Tx6S4OZvTTwgeuI\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 254,
		"path": "../public/assets/admin.home-V3W0R6jF.js"
	},
	"/assets/admin.leads-CqE6X_ES.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-KTeV8PmtMPyVjb8Hkd9ygHBdWoY\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 255,
		"path": "../public/assets/admin.leads-CqE6X_ES.js"
	},
	"/assets/admin.media-CbMt-t38.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-m0iXj80stykQzP3VGJwYv2EIoKs\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 255,
		"path": "../public/assets/admin.media-CbMt-t38.js"
	},
	"/assets/admin.messages-BXdw0tnp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-70BrKsNFUTn3s7NL7mZ3LJhCzXs\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 258,
		"path": "../public/assets/admin.messages-BXdw0tnp.js"
	},
	"/assets/admin.navigation-BvPBx3Wg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104-KlzBPJXkVk+a+0zeJZ0xMk7Q8rQ\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 260,
		"path": "../public/assets/admin.navigation-BvPBx3Wg.js"
	},
	"/assets/admin.pages-DLgM6a6Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-Z2D9ZS63hshAhkMPIcaZaqnKmWw\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 255,
		"path": "../public/assets/admin.pages-DLgM6a6Z.js"
	},
	"/assets/admin.partners-B6JVmdXP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-+1OhFxp+62T1KfPOt/EUHCCYNtA\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 258,
		"path": "../public/assets/admin.partners-B6JVmdXP.js"
	},
	"/assets/admin.projects-Cv-ofvax.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-3uVE6zPxbQqfamEWqkMsmRM+k1Y\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 258,
		"path": "../public/assets/admin.projects-Cv-ofvax.js"
	},
	"/assets/admin.reviews-DgdAZhNi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-UTHw3DcrCB128L+g44Lh1c6h5og\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 257,
		"path": "../public/assets/admin.reviews-DgdAZhNi.js"
	},
	"/assets/admin.roles-DYJ2u5vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-wsfId9jYGcN/QDs25gKZS3WKdhA\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 255,
		"path": "../public/assets/admin.roles-DYJ2u5vt.js"
	},
	"/assets/admin.seo-CkVSU8v5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-F8hg2MeEDjC/4Lywpt6C7T3vrZU\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 253,
		"path": "../public/assets/admin.seo-CkVSU8v5.js"
	},
	"/assets/admin.services-0FIvczLf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167e7-rqXrFZuMSUcH5QoihfVONyllj90\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 92135,
		"path": "../public/assets/admin.services-0FIvczLf.js"
	},
	"/assets/admin.settings-DDGQti4U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-U6Alyy9y+fx/LMQqUlfJ54Xm4Rk\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 258,
		"path": "../public/assets/admin.settings-DDGQti4U.js"
	},
	"/assets/admin.subscribers-j_gUWLl7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105-HePix0+M/a84TwbBc6X4HN8SLBY\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 261,
		"path": "../public/assets/admin.subscribers-j_gUWLl7.js"
	},
	"/assets/admin.team-BXfYQh0l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-KKQ4olbBnl4DiDsd6t5oryGM3/s\"",
		"mtime": "2026-11-12T03:58:53.476Z",
		"size": 254,
		"path": "../public/assets/admin.team-BXfYQh0l.js"
	},
	"/assets/admin.theme-CUX2MZTM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-UrRXCGOiwNUO5eNUMYvWzsX2R/g\"",
		"mtime": "2026-11-12T03:58:53.496Z",
		"size": 255,
		"path": "../public/assets/admin.theme-CUX2MZTM.js"
	},
	"/assets/admin.users-A5Wp0BFu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-dEyZZ0n6LbXkYqaD1lyLmDz92yI\"",
		"mtime": "2026-11-12T03:58:53.507Z",
		"size": 250,
		"path": "../public/assets/admin.users-A5Wp0BFu.js"
	},
	"/assets/admin._module-B5vttFbG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e-E0sGIedGdG70ionl9ZxHtw3rS7c\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 350,
		"path": "../public/assets/admin._module-B5vttFbG.js"
	},
	"/assets/AdminModulePage-BgvLLESt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"129-F2xkzelR3XsL9KZSBhmBQp9Uko4\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 297,
		"path": "../public/assets/AdminModulePage-BgvLLESt.js"
	},
	"/assets/classroom-kmSK9-NP.jpg": {
		"type": "image/jpeg",
		"etag": "\"d51d-yj2iuU9BG70xS30n+P09hJ+W0fQ\"",
		"mtime": "2026-11-12T03:58:53.515Z",
		"size": 54557,
		"path": "../public/assets/classroom-kmSK9-NP.jpg"
	},
	"/assets/createLucideIcon-DV7_HpF4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f41-dAxNPD560FedIRsTmOHutBibHYU\"",
		"mtime": "2026-11-12T03:58:53.508Z",
		"size": 12097,
		"path": "../public/assets/createLucideIcon-DV7_HpF4.js"
	},
	"/assets/createServerFn-DIY9ldX7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9785-bkSIymxADRoiAhUOpmKllE1OyUM\"",
		"mtime": "2026-11-12T03:58:53.508Z",
		"size": 38789,
		"path": "../public/assets/createServerFn-DIY9ldX7.js"
	},
	"/assets/index-gBwqNe2L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f641-5wJD+9PvJc/gN05CvxAOgti2Nfo\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 390721,
		"path": "../public/assets/index-gBwqNe2L.js"
	},
	"/assets/eye-C2M0vKJD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"279-DZLzUQSAx8a4LNMGEOQQSlqTlrY\"",
		"mtime": "2026-11-12T03:58:53.509Z",
		"size": 633,
		"path": "../public/assets/eye-C2M0vKJD.js"
	},
	"/assets/login-DbLhRH6_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a4-Y1M/xxvJSIlEMcX2PYLH/3UJ86w\"",
		"mtime": "2026-11-12T03:58:53.509Z",
		"size": 4260,
		"path": "../public/assets/login-DbLhRH6_.js"
	},
	"/assets/logo-BWQNNjGP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31-r93VLo2ddt7lMeHZoV80FrRAyFA\"",
		"mtime": "2026-11-12T03:58:53.510Z",
		"size": 49,
		"path": "../public/assets/logo-BWQNNjGP.js"
	},
	"/assets/logo-Otu0z1kd.png": {
		"type": "image/png",
		"etag": "\"1d07-dvUzyqnYyMXh4p5Oqv8Jc4KwWwY\"",
		"mtime": "2026-11-12T03:58:53.515Z",
		"size": 7431,
		"path": "../public/assets/logo-Otu0z1kd.png"
	},
	"/assets/menu-5FGZLu7f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-YGQTZh57MF1bvn3GHPrFr/BtVlc\"",
		"mtime": "2026-11-12T03:58:53.510Z",
		"size": 189,
		"path": "../public/assets/menu-5FGZLu7f.js"
	},
	"/assets/project-analytics-BlPd5P6j.jpg": {
		"type": "image/jpeg",
		"etag": "\"14e1e-8IOfazP8hYlUDzSlfUjtToxnXkI\"",
		"mtime": "2026-11-12T03:58:53.516Z",
		"size": 85534,
		"path": "../public/assets/project-analytics-BlPd5P6j.jpg"
	},
	"/assets/project-branding-C0sC76tA.jpg": {
		"type": "image/jpeg",
		"etag": "\"170c8-O2qOTRUodUZz7TafQJ/XUsJwxas\"",
		"mtime": "2026-11-12T03:58:53.516Z",
		"size": 94408,
		"path": "../public/assets/project-branding-C0sC76tA.jpg"
	},
	"/assets/RoutedModulePage-B_7EyCyl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4-hpRplr+xs0M3h+GcPg0+99/nBNI\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 244,
		"path": "../public/assets/RoutedModulePage-B_7EyCyl.js"
	},
	"/assets/routes-DF984Qdz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7366-m7BWa38yYy4n5ThqOrXSH8yM+zA\"",
		"mtime": "2026-11-12T03:58:53.511Z",
		"size": 29542,
		"path": "../public/assets/routes-DF984Qdz.js"
	},
	"/assets/scrollState-TZ1TbQqx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1200-QY0Gb3DvvTzI1LDNjQ2i1tIuX1M\"",
		"mtime": "2026-11-12T03:58:53.511Z",
		"size": 4608,
		"path": "../public/assets/scrollState-TZ1TbQqx.js"
	},
	"/assets/services.functions-CvOmvfyA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a7-LR7CVxe6B9485FcnzCi8cwRGM+E\"",
		"mtime": "2026-11-12T03:58:53.512Z",
		"size": 2215,
		"path": "../public/assets/services.functions-CvOmvfyA.js"
	},
	"/assets/session.functions-DnPNt4_D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-dCMw2nHfjOpzR57m52u0wOKM4v0\"",
		"mtime": "2026-11-12T03:58:53.512Z",
		"size": 189,
		"path": "../public/assets/session.functions-DnPNt4_D.js"
	},
	"/assets/sheet-CpDoqNzU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5cd-kvldHOiRwdCzGjdptU1mOSQb2Xo\"",
		"mtime": "2026-11-12T03:58:53.512Z",
		"size": 42445,
		"path": "../public/assets/sheet-CpDoqNzU.js"
	},
	"/assets/shield-check-Dsqpiumu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-u9XThPwDzFXEzwhGylukgIpc1GA\"",
		"mtime": "2026-11-12T03:58:53.513Z",
		"size": 320,
		"path": "../public/assets/shield-check-Dsqpiumu.js"
	},
	"/assets/styles-DM_TLlYg.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17c43-zuCLElXLnJLTjxyeTJUnU/1baiA\"",
		"mtime": "2026-11-12T03:58:53.517Z",
		"size": 97347,
		"path": "../public/assets/styles-DM_TLlYg.css"
	},
	"/assets/team-ahmed-Dh_UGd6r.jpg": {
		"type": "image/jpeg",
		"etag": "\"9010-s5pJQcYTcqo59lrSEO/93ACagb0\"",
		"mtime": "2026-11-12T03:58:53.517Z",
		"size": 36880,
		"path": "../public/assets/team-ahmed-Dh_UGd6r.jpg"
	},
	"/assets/team-ayesha-RzzDhTyE.jpg": {
		"type": "image/jpeg",
		"etag": "\"c577-d1uqkQK23gV8HhIroMzNmT9wZbc\"",
		"mtime": "2026-11-12T03:58:53.518Z",
		"size": 50551,
		"path": "../public/assets/team-ayesha-RzzDhTyE.jpg"
	},
	"/assets/team-bilal-C9vE40dO.jpg": {
		"type": "image/jpeg",
		"etag": "\"b7d5-kFGwgz6oEVGFvog0U3QmRtjccMI\"",
		"mtime": "2026-11-12T03:58:53.518Z",
		"size": 47061,
		"path": "../public/assets/team-bilal-C9vE40dO.jpg"
	},
	"/assets/team-sana-B8IYKDg8.jpg": {
		"type": "image/jpeg",
		"etag": "\"ab25-LD5rsevQZDxzUjBcq9f0PbMJRfE\"",
		"mtime": "2026-11-12T03:58:53.518Z",
		"size": 43813,
		"path": "../public/assets/team-sana-B8IYKDg8.jpg"
	},
	"/assets/utils-DRUBEzmm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7120-0iaLe1V1vd2TTqBEAiKUnXJDk3A\"",
		"mtime": "2026-11-12T03:58:53.513Z",
		"size": 28960,
		"path": "../public/assets/utils-DRUBEzmm.js"
	},
	"/assets/with-selector-B0MYrySg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28de-gAJuFJwqzwB+ahpP9pmIPGAjfJc\"",
		"mtime": "2026-11-12T03:58:53.514Z",
		"size": 10462,
		"path": "../public/assets/with-selector-B0MYrySg.js"
	},
	"/assets/OceanScene-DMjUlq4s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4efd-encSsUnxkEyI8tHVTEKfiaoATWE\"",
		"mtime": "2026-11-12T03:58:53.460Z",
		"size": 1003261,
		"path": "../public/assets/OceanScene-DMjUlq4s.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_KeIVb2 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_KeIVb2
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
