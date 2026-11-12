import { o as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as Link, b as lazyRouteComponent, x as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DOseheDJ.mjs";
import { t as routeAdminModule } from "./admin.route-B7qKRTU1.mjs";
import { F as Inbox, H as GraduationCap, K as FileText, L as ImageOff, T as MonitorCheck, W as FolderKanban, X as Earth, Z as Database, ft as BriefcaseBusiness, gt as ArrowRight, h as SearchCheck, ht as ArrowUpRight, i as UserPlus, k as Mail, n as Users, nt as Clock3, q as FileImage, r as UsersRound, v as Plus, z as History } from "../_libs/lucide-react.mjs";
import { t as NoAccess } from "./NoAccess-DEwhPDeT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-CDFGcIO2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** The dashboard's one client-facing data request. It is permission-guarded server-side. */
var getDashboardData = createServerFn({ method: "GET" }).handler(createSsrRpc("bcbf405abb63715daaf1487f2958492789217ff1449ff447570bc418404b6901"));
function relativeTime(value, now = /* @__PURE__ */ new Date()) {
	if (!value) return "Just now";
	const timestamp = new Date(value).getTime();
	if (Number.isNaN(timestamp)) return "Just now";
	const seconds = Math.max(0, Math.floor((now.getTime() - timestamp) / 1e3));
	if (seconds < 45) return "Just now";
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes} min ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} hr ago`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric"
	}).format(new Date(value));
}
/** Defensive client-side shaping also keeps cached data harmless if permissions change mid-session. */
function filterDashboardSnapshot(snapshot, permissions) {
	const canView = (module) => module in permissions && permissions[module].view;
	return {
		...snapshot,
		stats: snapshot.stats.filter((stat) => canView(stat.module)),
		contentHealth: snapshot.contentHealth.filter((item) => canView(item.module)),
		inbox: snapshot.inbox.filter((item) => canView(item.type === "message" ? "messages" : "leads")),
		recentActivity: snapshot.recentActivity.filter((item) => item.module === "dashboard" || canView(item.module))
	};
}
function smartSummary(snapshot) {
	const find = (module) => snapshot.stats.find((stat) => stat.module === module);
	const messages = find("messages");
	const services = snapshot.contentHealth.find((item) => item.module === "services")?.published ?? 0;
	const drafts = snapshot.contentHealth.reduce((total, item) => total + item.drafts, 0);
	const parts = [];
	if (messages) parts.push(`${messages.value} ${messages.value === 1 ? "new message" : "new messages"}`);
	if (snapshot.contentHealth.length > 0) parts.push(`${drafts} ${drafts === 1 ? "draft" : "drafts"}`);
	if (snapshot.contentHealth.some((item) => item.module === "services")) parts.push(`${services} ${services === 1 ? "service" : "services"} published`);
	return parts.length > 0 ? parts.join(", ") : "Your workspace is ready to go.";
}
function ActivityChartSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "admin-dashboard-skeleton h-64",
		"aria-label": "Loading activity chart"
	});
}
function Meter({ value, total }) {
	const width = total > 0 ? Math.round(value / total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "admin-dashboard-meter",
		"aria-label": `${width}% published`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${width}%` } })
	});
}
function ContentHealth({ items }) {
	if (items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "admin-dashboard-panel",
		"aria-labelledby": "content-health-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-eyebrow",
				children: "Content"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "content-health-title",
				className: "mt-1 font-display text-lg font-semibold",
				children: "Content health"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[var(--admin-muted)]",
				children: "A quick publishing check"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-4 sm:grid-cols-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: item.href,
				className: "admin-dashboard-health-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-4 w-4 text-[var(--admin-teal)]",
						"aria-hidden": "true"
					})]
				}), !item.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-[var(--admin-muted)]",
					children: "Not set up yet"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex justify-between text-xs text-[var(--admin-muted)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.published, " published"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.drafts, " draft"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						value: item.published,
						total: item.total
					}),
					(item.missingImages > 0 || item.missingSeo > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-1.5 text-xs text-[var(--admin-muted)]",
						children: [item.missingImages > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
									className: "h-3.5 w-3.5 text-[var(--admin-teal)]",
									"aria-hidden": "true"
								}),
								item.missingImages,
								" missing image",
								item.missingImages === 1 ? "" : "s"
							]
						}), item.missingSeo > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchCheck, {
									className: "h-3.5 w-3.5 text-[var(--admin-teal)]",
									"aria-hidden": "true"
								}),
								item.missingSeo,
								" missing SEO field",
								item.missingSeo === 1 ? "" : "s"
							]
						})]
					})
				] })]
			}, item.module))
		})]
	});
}
var icons = {
	services: BriefcaseBusiness,
	team: UsersRound,
	projects: FolderKanban,
	courses: GraduationCap,
	blog: FileText,
	messages: Inbox,
	leads: Mail,
	media: FileImage
};
function Sparkline({ points }) {
	if (points.length === 0) return null;
	const values = points.map((point) => point.value);
	const maximum = Math.max(...values, 1);
	const denominator = Math.max(points.length - 1, 1);
	const polyline = points.map((point, index) => `${index / denominator * 100},${32 - point.value / maximum * 26}`).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 100 36",
		preserveAspectRatio: "none",
		className: "h-9 w-20 text-[var(--admin-teal)]",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: polyline,
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function DashboardStatCard({ stat }) {
	const Icon = icons[stat.module];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: stat.href,
		className: "admin-dashboard-stat group",
		"aria-label": `Open ${stat.label}: ${stat.value}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "admin-dashboard-icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}), stat.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, { points: stat.sparkline }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-3xl font-semibold tracking-tight tabular-nums",
				children: stat.value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm font-semibold text-[var(--admin-text)]",
				children: stat.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-[var(--admin-muted)]",
				children: stat.available ? stat.sparkline.length > 0 ? "Last 7 days" : "No recent trend" : "Not set up yet"
			})
		]
	});
}
function LatestInbox({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "admin-dashboard-panel",
		"aria-labelledby": "latest-inbox-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-eyebrow",
				children: "Inbox"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "latest-inbox-title",
				className: "mt-1 font-display text-lg font-semibold",
				children: "Latest messages & leads"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
				className: "h-5 w-5 text-[var(--admin-teal)]",
				"aria-hidden": "true"
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 text-sm text-[var(--admin-muted)]",
			children: "Nothing new to review."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-[var(--admin-border)]",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: `py-3 ${item.unread ? "font-semibold" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: item.type === "message" ? "/admin/messages" : "/admin/leads",
					className: "block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-teal)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							className: "shrink-0 text-xs font-normal text-[var(--admin-muted)]",
							children: relativeTime(item.createdAt)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-xs font-normal text-[var(--admin-muted)]",
						children: item.detail
					})]
				})
			}, item.id))
		})]
	});
}
var actions = [
	{
		module: "services",
		action: "create",
		label: "New service",
		href: "/admin/services?new=1",
		icon: BriefcaseBusiness
	},
	{
		module: "media",
		action: "create",
		label: "Upload media",
		href: "/admin/media",
		icon: FileImage
	},
	{
		module: "team",
		action: "create",
		label: "Add team member",
		href: "/admin/team",
		icon: UserPlus
	},
	{
		module: "blog",
		action: "create",
		label: "New blog post",
		href: "/admin/blog",
		icon: FileText
	}
];
function QuickActions({ permissions }) {
	const visible = actions.filter((item) => permissions[item.module][item.action]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "admin-dashboard-panel",
		"aria-labelledby": "quick-actions-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "admin-eyebrow",
			children: "Shortcuts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "quick-actions-title",
			className: "mt-1 font-display text-lg font-semibold",
			children: "Quick actions"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid grid-cols-2 gap-2",
			children: [visible.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: item.href,
					className: "admin-dashboard-action",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
				}, item.label);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/",
				className: "admin-dashboard-action",
				"aria-label": "View public site",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View site" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "ml-auto h-3.5 w-3.5",
						"aria-hidden": "true"
					})
				]
			})]
		})]
	});
}
function RecentActivity({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "admin-dashboard-panel",
		"aria-labelledby": "recent-activity-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-eyebrow",
				children: "Audit trail"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "recent-activity-title",
				className: "mt-1 font-display text-lg font-semibold",
				children: "Recent activity"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/admin/activity",
				className: "admin-dashboard-text-link",
				children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					className: "h-3.5 w-3.5",
					"aria-hidden": "true"
				})]
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-dashboard-empty mt-5",
			role: "status",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
				className: "h-5 w-5 text-[var(--admin-teal)]",
				"aria-hidden": "true"
			}), "No recent activity has been recorded yet."]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-5 space-y-4",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--admin-teal)]",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: item.actor ?? "An administrator"
							}),
							" ",
							item.summary
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-[var(--admin-muted)]",
						children: relativeTime(item.createdAt)
					})]
				})]
			}, item.id))
		})]
	});
}
function SystemStatus({ status }) {
	const online = status.database === "connected";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "admin-dashboard-panel",
		"aria-labelledby": "system-status-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-eyebrow",
				children: "Workspace"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "system-status-title",
				className: "mt-1 font-display text-lg font-semibold",
				children: "System"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-5 space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
							className: "flex items-center gap-2 text-[var(--admin-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
								className: "h-4 w-4 text-[var(--admin-teal)]",
								"aria-hidden": "true"
							}), " Database"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: online ? "admin-dashboard-status-ok" : "admin-dashboard-status-muted",
							children: online ? "Connected" : "Unavailable"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
							className: "flex items-center gap-2 text-[var(--admin-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorCheck, {
								className: "h-4 w-4 text-[var(--admin-teal)]",
								"aria-hidden": "true"
							}), " Last login"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-xs",
							children: relativeTime(status.lastLoginAt)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
							className: "flex items-center gap-2 text-[var(--admin-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								className: "h-4 w-4 text-[var(--admin-teal)]",
								"aria-hidden": "true"
							}), " Active sessions"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold tabular-nums",
							children: status.activeSessions
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
							className: "flex items-center gap-2 text-[var(--admin-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
								className: "h-4 w-4 text-[var(--admin-teal)]",
								"aria-hidden": "true"
							}), " Server time"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-xs",
							children: new Intl.DateTimeFormat("en", {
								hour: "numeric",
								minute: "2-digit"
							}).format(new Date(status.serverTime))
						})]
					})
				]
			}),
			status.lastLoginIp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-[var(--admin-muted)]",
				children: ["Last IP: ", status.lastLoginIp]
			}) : null
		]
	});
}
var ActivityChart = (0, import_react.lazy)(() => import("./ActivityChart-B81sQY0B.mjs"));
function greeting() {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	if (hour < 12) return "Good morning";
	if (hour < 18) return "Good afternoon";
	return "Good evening";
}
function firstName(name) {
	return name.trim().split(/\s+/)[0] || "there";
}
function today() {
	return new Intl.DateTimeFormat("en", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	}).format(/* @__PURE__ */ new Date());
}
function Dashboard({ access }) {
	const [result, setResult] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!access.allowed) return;
		let active = true;
		getDashboardData().then((data) => {
			if (active) setResult(data);
		}).catch(() => {
			if (active) setFailed(true);
		});
		return () => {
			active = false;
		};
	}, [access.allowed]);
	if (!access.allowed || result?.allowed === false) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoAccess, {});
	if (!result) return failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLoadError, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSkeleton, {});
	const dashboard = filterDashboardSnapshot(result.dashboard, result.permissions);
	const canSeeInbox = result.permissions.messages.view || result.permissions.leads.view;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "admin-dashboard",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin-dashboard-hero",
				"aria-labelledby": "dashboard-greeting",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "admin-eyebrow",
						children: "Digi Turtles / Control room"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						id: "dashboard-greeting",
						className: "mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl",
						children: [
							greeting(),
							", ",
							firstName(result.user.name)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-[var(--admin-muted)]",
						children: today()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm font-semibold text-[var(--admin-text)]",
						children: smartSummary(dashboard)
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [result.permissions.services.create ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/services",
						search: { new: true },
						className: "admin-primary-button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						}), " New service"]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/",
						className: "admin-secondary-button",
						children: ["View site ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "ml-1 h-4 w-4",
							"aria-hidden": "true"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "Workspace statistics",
				className: "mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4",
				children: dashboard.stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardStatCard, { stat }, stat.module))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.8fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "admin-dashboard-panel",
						"aria-labelledby": "activity-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "admin-eyebrow",
								children: "Last 30 days"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "activity-title",
								className: "mt-1 font-display text-lg font-semibold",
								children: "Activity"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--admin-muted)]",
								children: "Messages, leads, or sign-ins"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityChartSkeleton, {}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityChart, { points: dashboard.activity })
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentHealth, { items: dashboard.contentHealth })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6",
					"aria-label": "Dashboard tools and status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, { permissions: result.permissions }),
						canSeeInbox ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatestInbox, { items: dashboard.inbox }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemStatus, { status: dashboard.system })
					]
				})]
			}),
			dashboard.recentActivity.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentActivity, { items: dashboard.recentActivity })
			}) : null
		]
	});
}
function DashboardLoadError() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "admin-dashboard-panel",
		role: "alert",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl font-semibold",
			children: "Dashboard is taking a moment"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-[var(--admin-muted)]",
			children: "Refresh the page to try loading the latest workspace data again."
		})]
	});
}
function DashboardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "admin-dashboard",
		"aria-label": "Loading dashboard",
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "admin-dashboard-skeleton h-44" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4",
				children: Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "admin-dashboard-skeleton h-44" }, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 xl:grid-cols-[1.55fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "admin-dashboard-skeleton h-96" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "admin-dashboard-skeleton h-96" })]
			})
		]
	});
}
var $$splitComponentImporter = () => import("./admin.index-BTQkYCyG.mjs");
var Route = createFileRoute("/admin/")({
	loader: () => routeAdminModule("dashboard"),
	pendingComponent: DashboardSkeleton,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, Dashboard as t };
