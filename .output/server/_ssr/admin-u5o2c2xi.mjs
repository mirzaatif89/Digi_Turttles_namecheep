import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as isAdminModule } from "./permissions-DHA-rRIr.mjs";
import { C as Link, g as useLocation, w as useNavigate, y as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as logoutAdmin } from "./auth.functions-D6NEkqGg.mjs";
import { t as Route } from "./admin-CkeL7Vac.mjs";
import { n as visibleNavigation, t as moduleTitle } from "./admin-navigation-hh6avAzj.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { B as Files, C as MessageCircleHeart, D as MailCheck, F as HeartHandshake, G as ContactRound, I as Handshake, J as Circle, K as Command, L as GraduationCap, M as Inbox, N as Image, O as LogOut, P as House, Q as ChevronRight, S as Moon, X as ChevronsLeft, Y as CircleQuestionMark, b as Newspaper, c as ShieldCheck, ct as Archive, d as Settings, et as ChevronDown, f as Search, j as LayoutDashboard, m as ScrollText, n as UsersRound, nt as ChartNoAxesCombined, o as Sun, p as SearchCheck, r as UserCog, rt as BriefcaseBusiness, t as X, tt as Check, v as PanelTop, w as Menu, x as MousePointerClick, y as Palette, z as FolderKanban } from "../_libs/lucide-react.mjs";
import { n as SheetContent, t as Sheet } from "./sheet-CvGuJq1E.mjs";
import { t as logo_default } from "./logo-ChsSzRmz.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { a as DropdownMenuItemIndicator, c as DropdownMenuRadioItem$1, d as DropdownMenuSubTrigger$1, f as DropdownMenuTrigger$1, i as DropdownMenuItem$1, l as DropdownMenuSeparator$1, n as DropdownMenuCheckboxItem$1, o as DropdownMenuLabel$1, r as DropdownMenuContent$1, s as DropdownMenuPortal, t as DropdownMenu$1, u as DropdownMenuSubContent$1 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-u5o2c2xi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	Archive,
	BriefcaseBusiness,
	ChartNoAxesCombined,
	CircleHelp: CircleQuestionMark,
	ContactRound,
	Files,
	FolderKanban,
	GraduationCap,
	Handshake,
	HeartHandshake,
	House,
	Image,
	Inbox,
	LayoutDashboard,
	MailCheck,
	MessageCircleHeart,
	MousePointerClick,
	Newspaper,
	PanelTop,
	Palette,
	SearchCheck,
	ScrollText,
	Settings,
	ShieldCheck,
	UserCog,
	UsersRound
};
function initials(name) {
	return name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}
function AdminSidebar({ session, pathname, collapsed, onCollapse, onSignOut, mobile = false, onNavigate }) {
	const [closedGroups, setClosedGroups] = (0, import_react.useState)([]);
	const groups = visibleNavigation(session.permissions);
	const compact = collapsed && !mobile;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("admin-sidebar flex h-full flex-col border-r", compact ? "w-[72px]" : "w-[260px]", mobile && "w-[280px]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-[76px] items-center gap-3 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo_default,
						width: 38,
						height: 38,
						decoding: "async",
						alt: "Digi Turtles",
						className: "h-9 w-9 rounded-xl bg-white/90 p-1"
					}),
					!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-bold tracking-wide",
							children: "DIGI TURTLES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--admin-muted)]",
							children: "Admin control room"
						})]
					}),
					!mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onCollapse,
						"aria-label": compact ? "Expand sidebar" : "Collapse sidebar",
						className: "admin-icon-button ml-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: cn("h-4 w-4", compact && "rotate-180") })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Admin navigation",
				className: "admin-sidebar-scroll flex-1 overflow-y-auto px-3 pb-4",
				children: groups.map((group) => {
					const isClosed = closedGroups.includes(group.label);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-4",
						children: [!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setClosedGroups((value) => value.includes(group.label) ? value.filter((entry) => entry !== group.label) : [...value, group.label]),
							className: "mb-1 flex w-full items-center justify-between px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--admin-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: group.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-3 w-3 transition-transform", isClosed && "-rotate-90") })]
						}), (compact || !isClosed) && group.items.map((item) => {
							const Icon = icons[item.icon] ?? Menu;
							const active = pathname === (item.module === "dashboard" ? "/admin" : `/admin/${item.module}`);
							const className = cn("admin-nav-link", active && "admin-nav-link-active", compact && "justify-center px-2");
							const contents = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-[18px] w-[18px] shrink-0",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("truncate", compact && "sr-only"),
									children: item.label
								}),
								item.badge && !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "admin-unread-badge",
									"aria-label": "0 unread messages",
									children: "0"
								})
							] });
							return item.module === "dashboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								title: compact ? item.label : void 0,
								className,
								onClick: onNavigate,
								children: contents
							}, item.module) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/$module",
								params: { module: item.module },
								title: compact ? item.label : void 0,
								className,
								onClick: onNavigate,
								children: contents
							}, item.module);
						})]
					}, group.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("m-3 rounded-2xl border border-[var(--admin-border)] p-3", compact && "p-2"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--admin-teal)] text-xs font-bold text-slate-950",
						children: initials(session.user.name)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("min-w-0", compact && "sr-only"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold",
							children: session.user.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 inline-flex rounded-full bg-[var(--admin-teal)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--admin-teal)]",
							children: session.user.role.replace("_", " ")
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onSignOut,
					className: cn("admin-signout mt-3", compact && "mt-2 justify-center px-2"),
					"aria-label": "Sign out",
					title: compact ? "Sign out" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: compact ? "sr-only" : "",
						children: "Sign out"
					})]
				})]
			})
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Command$2 = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command$2.displayName = _e.displayName;
var CommandDialog = ({ children, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "overflow-hidden p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command$2, {
				className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
				children
			})
		})
	});
};
var CommandInput = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
		ref,
		className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = _e.Input.displayName;
var CommandList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
	ref,
	className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
var DropdownMenu = DropdownMenu$1;
var DropdownMenuTrigger = DropdownMenuTrigger$1;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger$1, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuSubTrigger$1.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent$1, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuSubContent$1.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent$1, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuContent$1.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem$1, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuItem$1.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuCheckboxItem$1, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuCheckboxItem$1.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioItem$1, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuRadioItem$1.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuLabel$1.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuSeparator$1.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function AdminTopbar({ session, title, light, onToggleTheme, onOpenMobile, onSignOut }) {
	const [commandOpen, setCommandOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const modules = visibleNavigation(session.permissions).flatMap((group) => group.items);
	(0, import_react.useEffect)(() => {
		const onKeyDown = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setCommandOpen(true);
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);
	const openModule = (module) => {
		setCommandOpen(false);
		if (module === "dashboard") navigate({ to: "/admin" });
		else navigate({
			to: "/admin/$module",
			params: { module }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "admin-topbar flex min-h-[76px] items-center gap-3 border-b px-4 md:px-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onOpenMobile,
				className: "admin-icon-button md:hidden",
				"aria-label": "Open navigation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "hidden text-xs text-[var(--admin-muted)] sm:block",
					children: ["Admin / ", title]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate font-display text-lg font-semibold md:text-xl",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setCommandOpen(true),
				className: "admin-command-trigger",
				"aria-label": "Open command palette",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Search admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "hidden sm:inline",
						children: "⌘K"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				target: "_blank",
				rel: "noreferrer",
				className: "admin-view-site",
				children: "View site"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onToggleTheme,
				className: "admin-icon-button",
				"aria-label": light ? "Use dark theme" : "Use light theme",
				children: light ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Open account menu",
					className: "grid h-9 w-9 place-items-center rounded-full bg-[var(--admin-teal)] text-xs font-bold text-slate-950",
					children: session.user.name.slice(0, 1).toUpperCase()
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				className: "admin-account-menu w-60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: session.user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-xs font-normal opacity-70",
						children: session.user.email
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						onSelect: onSignOut,
						children: "Sign out"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandDialog, {
				open: commandOpen,
				onOpenChange: setCommandOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Jump to a module…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No permitted modules found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
					heading: "Your modules",
					children: modules.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						onSelect: () => openModule(item.module),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "h-4 w-4" }), item.label]
					}, item.module))
				})] })]
			})
		]
	});
}
function AdminShell({ session, children }) {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [light, setLight] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const location = useLocation();
	(0, import_react.useEffect)(() => {
		try {
			setCollapsed(localStorage.getItem("digiturtle-admin-sidebar") === "collapsed");
			const savedTheme = localStorage.getItem("digiturtle-admin-theme");
			setLight(savedTheme === "light" || document.documentElement.dataset["adminTheme"] === "light");
		} catch {}
	}, []);
	const toggleSidebar = () => setCollapsed((value) => {
		const next = !value;
		try {
			localStorage.setItem("digiturtle-admin-sidebar", next ? "collapsed" : "expanded");
		} catch {}
		return next;
	});
	const toggleTheme = () => setLight((value) => {
		const next = !value;
		try {
			localStorage.setItem("digiturtle-admin-theme", next ? "light" : "dark");
			document.documentElement.dataset["adminTheme"] = next ? "light" : "dark";
		} catch {}
		return next;
	});
	const signOut = async () => {
		await logoutAdmin();
		await navigate({
			to: "/login",
			search: { redirect: "/admin" }
		});
	};
	const pathname = location.pathname;
	const segment = pathname.split("/")[2];
	const title = segment && isAdminModule(segment) ? moduleTitle(segment) : "Dashboard";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `admin-theme${light ? " light" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-app min-h-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden h-screen shrink-0 md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {
						session,
						pathname,
						collapsed,
						onCollapse: toggleSidebar,
						onSignOut: signOut
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
					open: mobileOpen,
					onOpenChange: setMobileOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
						side: "left",
						className: "admin-mobile-sheet p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {
							session,
							pathname,
							collapsed: false,
							mobile: true,
							onCollapse: toggleSidebar,
							onSignOut: signOut,
							onNavigate: () => setMobileOpen(false)
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTopbar, {
						session,
						title,
						light,
						onToggleTheme: toggleTheme,
						onOpenMobile: () => setMobileOpen(true),
						onSignOut: signOut
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "admin-main flex-1 p-4 md:p-7",
						children
					})]
				})
			]
		})
	});
}
function AdminLayout() {
	const { adminSession } = Route.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, {
		session: adminSession,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { AdminLayout as component };
