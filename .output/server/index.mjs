globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { y as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
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
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-11-10T19:49:17.000Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1d07-dvUzyqnYyMXh4p5Oqv8Jc4KwWwY\"",
		"mtime": "2026-11-10T19:49:17.000Z",
		"size": 7431,
		"path": "../public/favicon.png"
	},
	"/assets/ActivityChart-jSDCPb4G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60476-peZUjpHXsCXzxdSaPt7/uHi06c0\"",
		"mtime": "2026-11-12T08:37:36.511Z",
		"size": 394358,
		"path": "../public/assets/ActivityChart-jSDCPb4G.js"
	},
	"/assets/admin-B1WWG2Fj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ab8-rx2qCUDQP9jeNpXYmye0ml9OfsE\"",
		"mtime": "2026-11-12T08:37:36.514Z",
		"size": 88760,
		"path": "../public/assets/admin-B1WWG2Fj.js"
	},
	"/assets/admin-navigation-D19npLh_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74f-tZifbvsqi1PAcUU/FeC7r0p0Pf0\"",
		"mtime": "2026-11-12T08:37:36.515Z",
		"size": 1871,
		"path": "../public/assets/admin-navigation-D19npLh_.js"
	},
	"/assets/admin.about-CO6Z5TaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-Wt8JnrXUpXSbBKDvL7SJ4l3ksIQ\"",
		"mtime": "2026-11-12T08:37:36.515Z",
		"size": 253,
		"path": "../public/assets/admin.about-CO6Z5TaL.js"
	},
	"/assets/admin.analytics-GlkbxdSp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-9K7lFaZ7SbKmxagOikNiFc/EhQk\"",
		"mtime": "2026-11-12T08:37:36.516Z",
		"size": 257,
		"path": "../public/assets/admin.analytics-GlkbxdSp.js"
	},
	"/assets/admin.activity-X9p514jD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-q9r+9FD2Uj/XBnSpAkVbPgdWgsA\"",
		"mtime": "2026-11-12T08:37:36.516Z",
		"size": 256,
		"path": "../public/assets/admin.activity-X9p514jD.js"
	},
	"/assets/admin.backup-DN5h9Ij2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-jUQQ2UcpE7qdygYPBciKsn1IWW8\"",
		"mtime": "2026-11-12T08:37:36.516Z",
		"size": 254,
		"path": "../public/assets/admin.backup-DN5h9Ij2.js"
	},
	"/assets/admin.blog-eGKyu9sj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-dQfdaj47Qkt1Q874jTcG9vpgBS4\"",
		"mtime": "2026-11-12T08:37:36.517Z",
		"size": 252,
		"path": "../public/assets/admin.blog-eGKyu9sj.js"
	},
	"/assets/admin.courses-Bqezguu9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-F3snmoU6NVNAMPM9UUzjWRfOjjs\"",
		"mtime": "2026-11-12T08:37:36.517Z",
		"size": 255,
		"path": "../public/assets/admin.courses-Bqezguu9.js"
	},
	"/assets/admin.cta-CmmSZuWz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-A/FvQhkVj2cQZ+VYtZAmxX9emB4\"",
		"mtime": "2026-11-12T08:37:36.518Z",
		"size": 251,
		"path": "../public/assets/admin.cta-CmmSZuWz.js"
	},
	"/assets/admin.faqs-ByrvY8lq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-o290wqNZ3iYv6GXJ8a7jF4Gmgxo\"",
		"mtime": "2026-11-12T08:37:36.518Z",
		"size": 252,
		"path": "../public/assets/admin.faqs-ByrvY8lq.js"
	},
	"/assets/admin.index-DKdFBXK3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-1RARBHSClb+Pp8Eo5ZEfVQZrbdU\"",
		"mtime": "2026-11-12T08:37:36.519Z",
		"size": 185,
		"path": "../public/assets/admin.index-DKdFBXK3.js"
	},
	"/assets/admin.home-CevkZW5n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-qc5mrmKYKV6XeCwnVAybIdoWnW4\"",
		"mtime": "2026-11-12T08:37:36.518Z",
		"size": 252,
		"path": "../public/assets/admin.home-CevkZW5n.js"
	},
	"/assets/admin.leads-BtiQJ4Ly.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-H7NgrdvhjPkygpyLoG/uL4Rlpvo\"",
		"mtime": "2026-11-12T08:37:36.519Z",
		"size": 253,
		"path": "../public/assets/admin.leads-BtiQJ4Ly.js"
	},
	"/assets/admin.media-nkeNmbBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-1jfEvScKWr8M1eovDYA993XsUDk\"",
		"mtime": "2026-11-12T08:37:36.520Z",
		"size": 253,
		"path": "../public/assets/admin.media-nkeNmbBc.js"
	},
	"/assets/admin.messages-EwNJunTo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-vIObITUSaWRUJ7ehgkQVKUr3yKQ\"",
		"mtime": "2026-11-12T08:37:36.520Z",
		"size": 256,
		"path": "../public/assets/admin.messages-EwNJunTo.js"
	},
	"/assets/admin.navigation-DU9Zm64Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-mgLYVJC4AZcCFWM1XKh9xwoc8o4\"",
		"mtime": "2026-11-12T08:37:36.521Z",
		"size": 258,
		"path": "../public/assets/admin.navigation-DU9Zm64Q.js"
	},
	"/assets/admin.pages-5Hgxm5bZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-toFBUEnB4HQpzOaM7fYIRT34SF8\"",
		"mtime": "2026-11-12T08:37:36.521Z",
		"size": 253,
		"path": "../public/assets/admin.pages-5Hgxm5bZ.js"
	},
	"/assets/admin.partners-CP20Fx0_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-A5PT7ficLUTE3Tqdor7PuPyK2Bc\"",
		"mtime": "2026-11-12T08:37:36.521Z",
		"size": 256,
		"path": "../public/assets/admin.partners-CP20Fx0_.js"
	},
	"/assets/admin.projects-DTllUQIa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-mWL3MFh2Bp8DoI8nETfmyEhupuI\"",
		"mtime": "2026-11-12T08:37:36.523Z",
		"size": 256,
		"path": "../public/assets/admin.projects-DTllUQIa.js"
	},
	"/assets/admin.reviews-rFQUCYsN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-GAteF35GiOis3D6glWfBuuPvm1E\"",
		"mtime": "2026-11-12T08:37:36.523Z",
		"size": 255,
		"path": "../public/assets/admin.reviews-rFQUCYsN.js"
	},
	"/assets/admin.roles-CzsI2vvA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-Fir3OgxnBhRc+giaf+FLBS8SN4I\"",
		"mtime": "2026-11-12T08:37:36.523Z",
		"size": 253,
		"path": "../public/assets/admin.roles-CzsI2vvA.js"
	},
	"/assets/admin.seo-DsrQrOR_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-psFi+MwT4nt1W4VFFs1eDKGbou4\"",
		"mtime": "2026-11-12T08:37:36.524Z",
		"size": 251,
		"path": "../public/assets/admin.seo-DsrQrOR_.js"
	},
	"/assets/admin.services-D1d9DCpj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16809-595WyJzh09+L+t0zVO7aqHMKJeg\"",
		"mtime": "2026-11-12T08:37:36.524Z",
		"size": 92169,
		"path": "../public/assets/admin.services-D1d9DCpj.js"
	},
	"/assets/admin.settings-D98N2zwh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-hCVo8/94t7hWdH8ZlCSq3oCwRKE\"",
		"mtime": "2026-11-12T08:37:36.525Z",
		"size": 256,
		"path": "../public/assets/admin.settings-D98N2zwh.js"
	},
	"/assets/admin.subscribers-oVKhp_5-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-j2KM7jpGgStjSDrSt+8YkRXT6CA\"",
		"mtime": "2026-11-12T08:37:36.526Z",
		"size": 259,
		"path": "../public/assets/admin.subscribers-oVKhp_5-.js"
	},
	"/assets/admin.team-DBv6-N2z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-2fefyd7+dyG/b0RvUa1ly8uj2zM\"",
		"mtime": "2026-11-12T08:37:36.526Z",
		"size": 252,
		"path": "../public/assets/admin.team-DBv6-N2z.js"
	},
	"/assets/admin.theme-BoRBbe2C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-YseXlYc0grisg3dfZdlFc/oZyoQ\"",
		"mtime": "2026-11-12T08:37:36.527Z",
		"size": 253,
		"path": "../public/assets/admin.theme-BoRBbe2C.js"
	},
	"/assets/admin.users-dk5mysL8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-Y3ADBD9/8/ibtY4Map4hTiJHLwU\"",
		"mtime": "2026-11-12T08:37:36.527Z",
		"size": 248,
		"path": "../public/assets/admin.users-dk5mysL8.js"
	},
	"/assets/admin._module-CPyxZ6Tw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c-7UiZ0ScQoS6BHpZjacCupQJPWJc\"",
		"mtime": "2026-11-12T08:37:36.515Z",
		"size": 348,
		"path": "../public/assets/admin._module-CPyxZ6Tw.js"
	},
	"/assets/AdminModulePage-CP9Nf0UT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d-o4xVDUUw9OjjbvVI6KYnEruZcqM\"",
		"mtime": "2026-11-12T08:37:36.511Z",
		"size": 333,
		"path": "../public/assets/AdminModulePage-CP9Nf0UT.js"
	},
	"/assets/classroom-kmSK9-NP.jpg": {
		"type": "image/jpeg",
		"etag": "\"d51d-yj2iuU9BG70xS30n+P09hJ+W0fQ\"",
		"mtime": "2026-11-12T08:37:36.534Z",
		"size": 54557,
		"path": "../public/assets/classroom-kmSK9-NP.jpg"
	},
	"/assets/clsx-CjueKrWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-hIN6XMVOMUzluNGmYPaM/SbauwQ\"",
		"mtime": "2026-11-12T08:37:36.527Z",
		"size": 368,
		"path": "../public/assets/clsx-CjueKrWZ.js"
	},
	"/assets/createLucideIcon-BaqOwAdF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f68-dYCxK8878mwDGf6UP5wuoCw4zLs\"",
		"mtime": "2026-11-12T08:37:36.528Z",
		"size": 12136,
		"path": "../public/assets/createLucideIcon-BaqOwAdF.js"
	},
	"/assets/createServerFn-DIY9ldX7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9785-bkSIymxADRoiAhUOpmKllE1OyUM\"",
		"mtime": "2026-11-12T08:37:36.528Z",
		"size": 38789,
		"path": "../public/assets/createServerFn-DIY9ldX7.js"
	},
	"/assets/index-BTZU8BAZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6299e-JuM0g22MXaEWmCpVOpynpBjLpA4\"",
		"mtime": "2026-11-12T08:37:36.510Z",
		"size": 403870,
		"path": "../public/assets/index-BTZU8BAZ.js"
	},
	"/assets/eye-DzzXrGV6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"279-txh4j8cIdXGW5qASRAP+gyHsVjA\"",
		"mtime": "2026-11-12T08:37:36.529Z",
		"size": 633,
		"path": "../public/assets/eye-DzzXrGV6.js"
	},
	"/assets/jsx-runtime-CXCudH8Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c5-fGora6XZT3AEeoV3pg8TOqypOPo\"",
		"mtime": "2026-11-12T08:37:36.529Z",
		"size": 8901,
		"path": "../public/assets/jsx-runtime-CXCudH8Z.js"
	},
	"/assets/login-Cpa_6q3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1015-/ip3U35XqEreOw7ilUHUNS8Zp6Y\"",
		"mtime": "2026-11-12T08:37:36.529Z",
		"size": 4117,
		"path": "../public/assets/login-Cpa_6q3B.js"
	},
	"/assets/logo-BWQNNjGP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31-r93VLo2ddt7lMeHZoV80FrRAyFA\"",
		"mtime": "2026-11-12T08:37:36.530Z",
		"size": 49,
		"path": "../public/assets/logo-BWQNNjGP.js"
	},
	"/assets/logo-Otu0z1kd.png": {
		"type": "image/png",
		"etag": "\"1d07-dvUzyqnYyMXh4p5Oqv8Jc4KwWwY\"",
		"mtime": "2026-11-12T08:37:36.535Z",
		"size": 7431,
		"path": "../public/assets/logo-Otu0z1kd.png"
	},
	"/assets/menu-CbaFELNi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-7n3J0SfBdXmSATWA4SMsOUUYkDw\"",
		"mtime": "2026-11-12T08:37:36.530Z",
		"size": 189,
		"path": "../public/assets/menu-CbaFELNi.js"
	},
	"/assets/PageHeader-BFGTvwZ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5dd-TmK1LZ9tALduv0ZvvORRT9uC1hs\"",
		"mtime": "2026-11-12T08:37:36.513Z",
		"size": 1501,
		"path": "../public/assets/PageHeader-BFGTvwZ1.js"
	},
	"/assets/project-analytics-BlPd5P6j.jpg": {
		"type": "image/jpeg",
		"etag": "\"14e1e-8IOfazP8hYlUDzSlfUjtToxnXkI\"",
		"mtime": "2026-11-12T08:37:36.535Z",
		"size": 85534,
		"path": "../public/assets/project-analytics-BlPd5P6j.jpg"
	},
	"/assets/project-branding-C0sC76tA.jpg": {
		"type": "image/jpeg",
		"etag": "\"170c8-O2qOTRUodUZz7TafQJ/XUsJwxas\"",
		"mtime": "2026-11-12T08:37:36.536Z",
		"size": 94408,
		"path": "../public/assets/project-branding-C0sC76tA.jpg"
	},
	"/assets/RoutedModulePage-Y5RQwmCj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-Pbx/nRwC52ma5SDIPWCsUd8/a1g\"",
		"mtime": "2026-11-12T08:37:36.514Z",
		"size": 242,
		"path": "../public/assets/RoutedModulePage-Y5RQwmCj.js"
	},
	"/assets/routes-C50tD-D0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"734b-MeEfmt3WD1vpEA8jT2W/mGO74Xo\"",
		"mtime": "2026-11-12T08:37:36.530Z",
		"size": 29515,
		"path": "../public/assets/routes-C50tD-D0.js"
	},
	"/assets/scrollState-TZ1TbQqx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1200-QY0Gb3DvvTzI1LDNjQ2i1tIuX1M\"",
		"mtime": "2026-11-12T08:37:36.531Z",
		"size": 4608,
		"path": "../public/assets/scrollState-TZ1TbQqx.js"
	},
	"/assets/services.functions-Ce6oyIxI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"848-pR9MCVcp/mL19SNcz4ABBOZhfN4\"",
		"mtime": "2026-11-12T08:37:36.531Z",
		"size": 2120,
		"path": "../public/assets/services.functions-Ce6oyIxI.js"
	},
	"/assets/session.functions-DnPNt4_D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-dCMw2nHfjOpzR57m52u0wOKM4v0\"",
		"mtime": "2026-11-12T08:37:36.532Z",
		"size": 189,
		"path": "../public/assets/session.functions-DnPNt4_D.js"
	},
	"/assets/sheet-DUt7qMBt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5eb-ARNXxo99ap5ORM95YrTnWoM4leY\"",
		"mtime": "2026-11-12T08:37:36.533Z",
		"size": 42475,
		"path": "../public/assets/sheet-DUt7qMBt.js"
	},
	"/assets/shield-check-BAw2zZ7T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-xYqx7UGXot9RVd8YmZrnRyOpdXM\"",
		"mtime": "2026-11-12T08:37:36.533Z",
		"size": 320,
		"path": "../public/assets/shield-check-BAw2zZ7T.js"
	},
	"/assets/styles-BgVZgNoA.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"19125-nTNj6ccX/65Gg4ozhqgWJSMFv1s\"",
		"mtime": "2026-11-12T08:37:36.536Z",
		"size": 102693,
		"path": "../public/assets/styles-BgVZgNoA.css"
	},
	"/assets/team-ahmed-Dh_UGd6r.jpg": {
		"type": "image/jpeg",
		"etag": "\"9010-s5pJQcYTcqo59lrSEO/93ACagb0\"",
		"mtime": "2026-11-12T08:37:36.537Z",
		"size": 36880,
		"path": "../public/assets/team-ahmed-Dh_UGd6r.jpg"
	},
	"/assets/team-ayesha-RzzDhTyE.jpg": {
		"type": "image/jpeg",
		"etag": "\"c577-d1uqkQK23gV8HhIroMzNmT9wZbc\"",
		"mtime": "2026-11-12T08:37:36.537Z",
		"size": 50551,
		"path": "../public/assets/team-ayesha-RzzDhTyE.jpg"
	},
	"/assets/team-bilal-C9vE40dO.jpg": {
		"type": "image/jpeg",
		"etag": "\"b7d5-kFGwgz6oEVGFvog0U3QmRtjccMI\"",
		"mtime": "2026-11-12T08:37:36.538Z",
		"size": 47061,
		"path": "../public/assets/team-bilal-C9vE40dO.jpg"
	},
	"/assets/team-sana-B8IYKDg8.jpg": {
		"type": "image/jpeg",
		"etag": "\"ab25-LD5rsevQZDxzUjBcq9f0PbMJRfE\"",
		"mtime": "2026-11-12T08:37:36.538Z",
		"size": 43813,
		"path": "../public/assets/team-sana-B8IYKDg8.jpg"
	},
	"/assets/utils-DZ9Bjmfy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ec0-CUz6pr34axs558FXWJQjIg8Wf+4\"",
		"mtime": "2026-11-12T08:37:36.533Z",
		"size": 28352,
		"path": "../public/assets/utils-DZ9Bjmfy.js"
	},
	"/assets/with-selector-B9OrXUno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65a-nJNJHxGkZdPNTtum5ENYrmnf61I\"",
		"mtime": "2026-11-12T08:37:36.534Z",
		"size": 1626,
		"path": "../public/assets/with-selector-B9OrXUno.js"
	},
	"/assets/OceanScene-VrSjmslB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4f25-OnGhgEoFTTttB0D1fzNZNBj4aDg\"",
		"mtime": "2026-11-12T08:37:36.512Z",
		"size": 1003301,
		"path": "../public/assets/OceanScene-VrSjmslB.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
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
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
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
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
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
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
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
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
