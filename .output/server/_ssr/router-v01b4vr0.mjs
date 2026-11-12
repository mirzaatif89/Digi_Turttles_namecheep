import { o as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as Link, S as createRootRouteWithContext, T as useRouter, b as lazyRouteComponent, h as HeadContent, m as Scripts, v as createRouter, x as createFileRoute, y as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./admin-DNYCVIYB.mjs";
import { t as Route$2 } from "./admin._module-DNSi5_kR.mjs";
import { t as Route$3 } from "./admin.about-f_T3X__m.mjs";
import { t as Route$4 } from "./admin.activity-KK25H7pN.mjs";
import { t as Route$5 } from "./admin.analytics-Bq2OK8wG.mjs";
import { t as Route$6 } from "./admin.backup-CaTntpRR.mjs";
import { t as Route$7 } from "./admin.blog-NI4JHF80.mjs";
import { t as Route$8 } from "./admin.courses-Bip0FlgF.mjs";
import { t as Route$9 } from "./admin.cta-BPlKoUeH.mjs";
import { t as Route$10 } from "./admin.faqs-BJgxcsqT.mjs";
import { t as Route$11 } from "./admin.home-5IMnLJgq.mjs";
import { n as Route$12 } from "./admin.index-CDFGcIO2.mjs";
import { t as Route$13 } from "./admin.leads-Ba0o3Mzw.mjs";
import { t as Route$14 } from "./admin.media-Bw4JJ_hl.mjs";
import { t as Route$15 } from "./admin.messages-xwe-mGQc.mjs";
import { t as Route$16 } from "./admin.navigation-CudTBvqL.mjs";
import { t as Route$17 } from "./admin.pages-BwDGa6C3.mjs";
import { t as Route$18 } from "./admin.partners-3ppFk6CU.mjs";
import { t as Route$19 } from "./admin.projects-DkDvOplF.mjs";
import { t as Route$20 } from "./admin.reviews-DNM3vQ9q.mjs";
import { t as Route$21 } from "./admin.roles-uvqyqI37.mjs";
import { t as Route$22 } from "./admin.seo-BhY6fmSX.mjs";
import { t as Route$23 } from "./admin.services-CUSy0Jb5.mjs";
import { t as Route$24 } from "./admin.settings-7sDe_5rq.mjs";
import { t as Route$25 } from "./admin.subscribers-_jFTXDYr.mjs";
import { t as Route$26 } from "./admin.team-Dy7SnlnA.mjs";
import { t as Route$27 } from "./admin.theme-CqNkm_ey.mjs";
import { t as Route$28 } from "./admin.users-BOxAZn0n.mjs";
import { t as Route$29 } from "./login-apkeXLLn.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-v01b4vr0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BgVZgNoA.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Digi Turtles — Institute + Agency" },
			{
				name: "description",
				content: "Digi Turtles: practical digital skills and real business growth under one roof."
			},
			{
				name: "author",
				content: "Digi Turtles"
			},
			{
				property: "og:title",
				content: "Digi Turtles — Institute + Agency"
			},
			{
				property: "og:description",
				content: "Practical digital skills and real business growth under one roof."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Poppins:wght@500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: "try{document.documentElement.dataset.adminTheme=localStorage.getItem('digiturtle-admin-theme')==='light'?'light':'dark'}catch(_){}" } }),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter = () => import("./routes-_52-QhMF.mjs");
/** Isolates post-paint scene loading and readiness renders from page sections. */
/** Keeps the home route DB-free during SSR, then upgrades the bundled cards at idle. */
var IndexRoute = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Digi Turtles — Learn. Build. Grow. Become Independent." },
		{
			name: "description",
			content: "Digi Turtles is an Institute + Agency: practical digital skills for learners and real growth for businesses, under one roof."
		},
		{
			property: "og:title",
			content: "Digi Turtles — Learn. Build. Grow."
		},
		{
			property: "og:description",
			content: "Practical digital skills and real business growth. Follow the turtle from egg to ocean."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
});
var AdminRoute = Route.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$1
});
var LoginRoute = Route$29.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$1
});
var AdminIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminModuleRoute: Route$2.update({
		id: "/$module",
		path: "/$module",
		getParentRoute: () => AdminRoute
	}),
	AdminAboutRoute: Route$3.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => AdminRoute
	}),
	AdminActivityRoute: Route$4.update({
		id: "/activity",
		path: "/activity",
		getParentRoute: () => AdminRoute
	}),
	AdminAnalyticsRoute: Route$5.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => AdminRoute
	}),
	AdminBackupRoute: Route$6.update({
		id: "/backup",
		path: "/backup",
		getParentRoute: () => AdminRoute
	}),
	AdminBlogRoute: Route$7.update({
		id: "/blog",
		path: "/blog",
		getParentRoute: () => AdminRoute
	}),
	AdminCoursesRoute: Route$8.update({
		id: "/courses",
		path: "/courses",
		getParentRoute: () => AdminRoute
	}),
	AdminCtaRoute: Route$9.update({
		id: "/cta",
		path: "/cta",
		getParentRoute: () => AdminRoute
	}),
	AdminFaqsRoute: Route$10.update({
		id: "/faqs",
		path: "/faqs",
		getParentRoute: () => AdminRoute
	}),
	AdminHomeRoute: Route$11.update({
		id: "/home",
		path: "/home",
		getParentRoute: () => AdminRoute
	}),
	AdminLeadsRoute: Route$13.update({
		id: "/leads",
		path: "/leads",
		getParentRoute: () => AdminRoute
	}),
	AdminMediaRoute: Route$14.update({
		id: "/media",
		path: "/media",
		getParentRoute: () => AdminRoute
	}),
	AdminMessagesRoute: Route$15.update({
		id: "/messages",
		path: "/messages",
		getParentRoute: () => AdminRoute
	}),
	AdminNavigationRoute: Route$16.update({
		id: "/navigation",
		path: "/navigation",
		getParentRoute: () => AdminRoute
	}),
	AdminPagesRoute: Route$17.update({
		id: "/pages",
		path: "/pages",
		getParentRoute: () => AdminRoute
	}),
	AdminPartnersRoute: Route$18.update({
		id: "/partners",
		path: "/partners",
		getParentRoute: () => AdminRoute
	}),
	AdminProjectsRoute: Route$19.update({
		id: "/projects",
		path: "/projects",
		getParentRoute: () => AdminRoute
	}),
	AdminReviewsRoute: Route$20.update({
		id: "/reviews",
		path: "/reviews",
		getParentRoute: () => AdminRoute
	}),
	AdminRolesRoute: Route$21.update({
		id: "/roles",
		path: "/roles",
		getParentRoute: () => AdminRoute
	}),
	AdminSeoRoute: Route$22.update({
		id: "/seo",
		path: "/seo",
		getParentRoute: () => AdminRoute
	}),
	AdminServicesRoute: Route$23.update({
		id: "/services",
		path: "/services",
		getParentRoute: () => AdminRoute
	}),
	AdminSettingsRoute: Route$24.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AdminRoute
	}),
	AdminSubscribersRoute: Route$25.update({
		id: "/subscribers",
		path: "/subscribers",
		getParentRoute: () => AdminRoute
	}),
	AdminTeamRoute: Route$26.update({
		id: "/team",
		path: "/team",
		getParentRoute: () => AdminRoute
	}),
	AdminThemeRoute: Route$27.update({
		id: "/theme",
		path: "/theme",
		getParentRoute: () => AdminRoute
	}),
	AdminUsersRoute: Route$28.update({
		id: "/users",
		path: "/users",
		getParentRoute: () => AdminRoute
	}),
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	LoginRoute
};
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
