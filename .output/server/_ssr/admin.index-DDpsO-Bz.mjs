import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as Link, b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as routeAdminDashboard } from "./admin.route-k869etWM.mjs";
import { M as Inbox, V as FileText, b as Newspaper, n as UsersRound, rt as BriefcaseBusiness } from "../_libs/lucide-react.mjs";
import { n as NoAccess, r as PageHeader, t as EmptyState } from "./PageHeader-C9WTh_bf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DDpsO-Bz.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, icon: Icon, tone = "teal" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "admin-card p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-[var(--admin-muted)]",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl font-semibold tabular-nums",
				children: value
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `admin-stat-icon admin-stat-${tone}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			})]
		})
	});
}
function Dashboard({ data }) {
	if (!data.allowed || !data.session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoAccess, {});
	const cards = [
		{
			module: "users",
			label: "Admin users",
			icon: UsersRound,
			tone: "teal"
		},
		{
			module: "messages",
			label: "Messages",
			icon: Inbox,
			tone: "blue"
		},
		{
			module: "blog",
			label: "Blog posts",
			icon: Newspaper,
			tone: "green"
		},
		{
			module: "projects",
			label: "Portfolio items",
			icon: FileText,
			tone: "amber"
		},
		{
			module: "services",
			label: "Services",
			icon: BriefcaseBusiness,
			tone: "teal"
		}
	].filter((card) => data.session?.permissions[card.module]?.view);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Welcome back, ${data.session.user.name}`,
			description: "Here’s a quiet overview of your workspace."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			"aria-label": "Overview statistics",
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: card.label,
				value: data.counts[card.module] ?? 0,
				icon: card.icon,
				tone: card.tone
			}, card.module))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between border-b border-[var(--admin-border)] px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-semibold",
						children: "Recent login activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-[var(--admin-muted)]",
						children: "The latest access attempts to this admin."
					})] })
				}), data.events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-5 text-sm text-[var(--admin-muted)]",
					children: "No login activity has been recorded yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-[var(--admin-border)]",
					children: data.events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 px-5 py-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: event.name ?? event.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-[var(--admin-muted)]",
								children: [event.was_successful ? "Successful sign in" : "Unsuccessful attempt", event.ip_address ? ` · ${event.ip_address}` : ""]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							className: "shrink-0 text-xs text-[var(--admin-muted)]",
							dateTime: event.created_at,
							children: new Date(event.created_at).toLocaleString()
						})]
					}, event.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-semibold",
						children: "Quick actions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-[var(--admin-muted)]",
						children: "Jump to work you can access."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
								enabled: Boolean(data.session.permissions["messages"]?.view),
								module: "messages",
								label: "Review messages"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
								enabled: Boolean(data.session.permissions["blog"]?.view),
								module: "blog",
								label: "Open blog"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
								enabled: Boolean(data.session.permissions["users"]?.view),
								module: "users",
								label: "Manage users"
							}),
							data.session.permissions["services"]?.create && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/services",
								search: { new: true },
								className: "admin-quick-link",
								children: ["New service", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})]
							})
						]
					})
				]
			})]
		})
	] });
}
function QuickLink({ enabled, module, label }) {
	if (!enabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/admin/$module",
		params: { module },
		className: "admin-quick-link",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			children: "→"
		})]
	});
}
function DashboardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-label": "Loading dashboard",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 w-72 animate-pulse rounded-2xl bg-[var(--admin-skeleton)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: Array.from({ length: 4 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-2xl bg-[var(--admin-skeleton)]" }, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Dashboard" })
		]
	});
}
var $$splitComponentImporter = () => import("./admin.index-DskMZ1s-.mjs");
var Route = createFileRoute("/admin/")({
	loader: () => routeAdminDashboard(),
	pendingComponent: DashboardSkeleton,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, Dashboard as t };
