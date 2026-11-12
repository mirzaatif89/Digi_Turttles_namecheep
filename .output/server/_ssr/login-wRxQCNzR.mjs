import { o as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as Link, w as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as sanitizeRedirect } from "./auth.schemas-TR-16eRz.mjs";
import { t as loginAdmin } from "./auth.functions-j7hH3T7K.mjs";
import { n as routeAdminSession } from "./admin.route-B7qKRTU1.mjs";
import { J as Eye, N as LockKeyhole, Y as EyeOff, k as Mail, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as logo_default } from "./logo-ChsSzRmz.mjs";
import { t as Route } from "./login-apkeXLLn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-wRxQCNzR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { redirect } = Route.useSearch();
	const destination = sanitizeRedirect(redirect);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [capsLock, setCapsLock] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		routeAdminSession().then((session) => {
			if (!cancelled && session) navigate({ to: "/admin" });
		});
		return () => {
			cancelled = true;
		};
	}, [navigate]);
	const submit = async (event) => {
		event.preventDefault();
		setBusy(true);
		setError("");
		try {
			const result = await loginAdmin({ data: {
				email,
				password
			} });
			if (!result.ok) {
				setError(result.error);
				return;
			}
			window.location.assign(destination);
		} catch {
			setError("Unable to sign in right now. Please try again.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "login-page relative grid min-h-screen place-items-center overflow-hidden px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "login-glow",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass glass-strong relative z-10 w-full max-w-md rounded-[2rem] p-7 shadow-2xl sm:p-9",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-16 w-16 place-items-center rounded-2xl bg-[var(--foam)] shadow-[var(--shadow-glow)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logo_default,
								alt: "Digi Turtles",
								width: 48,
								height: 48,
								decoding: "async",
								className: "h-12 w-12 object-contain"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), "Secure admin"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-3xl font-bold",
							children: "Welcome back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Sign in to the Digi Turtles admin"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-8 space-y-4",
					onSubmit: submit,
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-sm font-semibold",
								children: "Email address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									autoComplete: "email",
									required: true,
									value: email,
									onChange: (event) => setEmail(event.target.value),
									className: "login-input pl-10",
									placeholder: "you@example.com"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1.5 block text-sm font-semibold",
									children: "Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: showPassword ? "text" : "password",
											autoComplete: "current-password",
											required: true,
											value: password,
											onChange: (event) => setPassword(event.target.value),
											onKeyDown: (event) => setCapsLock(event.getModifierState("CapsLock")),
											onKeyUp: (event) => setCapsLock(event.getModifierState("CapsLock")),
											className: "login-input px-10",
											placeholder: "Your password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowPassword((value) => !value),
											"aria-label": showPassword ? "Hide password" : "Show password",
											className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary",
											children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})
									]
								}),
								capsLock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1.5 block text-xs text-amber-300",
									children: "Caps Lock is on"
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "rounded-xl border border-red-400/30 bg-red-950/30 px-3 py-2.5 text-sm text-red-200",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: busy,
							className: "btn-hero mt-2 w-full justify-center disabled:cursor-wait disabled:opacity-70",
							type: "submit",
							children: busy ? "Signing in…" : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 block text-center text-sm font-semibold text-primary-glow hover:text-primary",
					children: "← Back to website"
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
