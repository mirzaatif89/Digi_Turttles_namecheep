import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ActivityChart-B81sQY0B.js
var import_jsx_runtime = require_jsx_runtime();
function dayLabel(day) {
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric"
	}).format(new Date(day));
}
function ActivityChart({ points }) {
	const hasInboxActivity = points.some((point) => point.messages > 0 || point.leads > 0);
	const hasLoginActivity = points.some((point) => point.logins > 0);
	if (!hasInboxActivity && !hasLoginActivity) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "admin-dashboard-empty",
		role: "status",
		children: "Activity will appear here once messages, leads, or sign-ins are recorded."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64",
		role: "img",
		"aria-label": "Activity over the last 30 days",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data: points,
				margin: {
					top: 12,
					right: 4,
					left: -20,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "dashboardActivityFill",
						x1: "0",
						x2: "0",
						y1: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--admin-teal)",
							stopOpacity: .32
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--admin-teal)",
							stopOpacity: 0
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						vertical: false,
						stroke: "var(--admin-border)",
						strokeDasharray: "3 4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "day",
						tickFormatter: dayLabel,
						tick: {
							fill: "var(--admin-muted)",
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						minTickGap: 32
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						allowDecimals: false,
						tick: {
							fill: "var(--admin-muted)",
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						width: 28
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						labelFormatter: dayLabel,
						contentStyle: {
							borderColor: "var(--admin-border)",
							borderRadius: "12px",
							background: "var(--admin-surface-raised)",
							color: "var(--admin-text)"
						}
					}),
					hasInboxActivity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "messages",
						name: "Messages",
						stroke: "var(--admin-teal)",
						fill: "url(#dashboardActivityFill)",
						strokeWidth: 2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "leads",
						name: "Leads",
						stroke: "var(--admin-text)",
						fill: "none",
						strokeWidth: 1.5
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "logins",
						name: "Sign-ins",
						stroke: "var(--admin-teal)",
						fill: "url(#dashboardActivityFill)",
						strokeWidth: 2
					})
				]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "mt-3 text-sm text-[var(--admin-muted)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
			className: "cursor-pointer font-semibold text-[var(--admin-text)]",
			children: "View activity as a table"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 max-h-48 overflow-auto rounded-xl border border-[var(--admin-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "sticky top-0 bg-[var(--admin-surface-raised)] text-[var(--admin-text)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2",
							children: "Day"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2",
							children: "Messages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2",
							children: "Leads"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2",
							children: "Sign-ins"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-[var(--admin-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: dayLabel(point.day)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: point.messages
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: point.leads
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: point.logins
						})
					]
				}, point.day)) })]
			})
		})]
	})] });
}
//#endregion
export { ActivityChart as default };
