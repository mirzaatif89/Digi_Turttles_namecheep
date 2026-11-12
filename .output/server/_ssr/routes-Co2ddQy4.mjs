import { o as __toESM } from "../_runtime.mjs";
import { d as startScrollStory, l as scrollState, o as chapterAt, t as ANCHOR } from "./scrollState-CKo0MjG7.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { L as GraduationCap, R as Gem, T as Megaphone, a as Target, f as Search, g as Plus, h as Quote, it as Bot, k as LogIn, nt as ChartNoAxesCombined, ot as ArrowRight, q as CodeXml, s as Sparkles, t as X, w as Menu, y as Palette } from "../_libs/lucide-react.mjs";
import { t as logo_default } from "./logo-ChsSzRmz.mjs";
import { i as getPublishedServices } from "./services.functions-DnjVqoLi.mjs";
import { a as PHILOSOPHY, c as REVIEWS, d as classroom_default, i as PARTNERS, l as SERVICES, n as FAQS, o as POSTS, r as NAV, s as PROJECTS, t as COURSES, u as TEAM } from "./content-BjCd9snj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Co2ddQy4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHAPTERS = [
	"Egg",
	"Hatch",
	"Crawl",
	"Dive",
	"Ocean"
];
/** Side indicator that follows the turtle's journey. */
var JourneyHud = (0, import_react.memo)(function JourneyHud() {
	const [chapter, setChapter] = (0, import_react.useState)(0);
	const bar = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = -1;
		let visible = !document.hidden;
		const tick = () => {
			raf = 0;
			if (!visible) return;
			const p = scrollState.target;
			if (bar.current) bar.current.style.transform = `scaleY(${p})`;
			const c = chapterAt(p);
			if (c !== last) {
				last = c;
				setChapter(c);
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		const onVisibility = () => {
			visible = !document.hidden;
			if (visible && !raf) raf = requestAnimationFrame(tick);
		};
		document.addEventListener("visibilitychange", onVisibility, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		"aria-label": "Turtle journey",
		className: "pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-pill relative flex flex-col gap-5 rounded-full px-3 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: bar,
					className: "absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px origin-top -translate-x-1/2 bg-primary",
					style: { transform: "scaleY(0)" }
				}),
				CHAPTERS.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2.5 w-2.5 rounded-full transition-all duration-500 ${i <= chapter ? "scale-125 bg-primary shadow-[var(--shadow-glow)]" : "bg-muted"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `absolute right-7 whitespace-nowrap text-xs font-semibold tracking-wider transition-opacity duration-500 ${i === chapter ? "text-primary-glow opacity-100" : "opacity-0"}`,
						children: c
					})]
				}, c))
			]
		})
	});
});
var Nav = (0, import_react.memo)(function Nav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [accountState, setAccountState] = (0, import_react.useState)("checking");
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				const next = window.scrollY > 24;
				setScrolled((current) => current === next ? current : next);
			});
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const check = async () => {
			try {
				const { getPublicAdminSession } = await import("./session.functions-Bj07o7IE.mjs");
				const session = await getPublicAdminSession();
				if (!cancelled) setAccountState(session ? "admin" : "guest");
			} catch {
				if (!cancelled) setAccountState("guest");
			}
		};
		const idle = window.requestIdleCallback?.(() => void check(), { timeout: 1200 });
		const fallback = idle === void 0 ? window.setTimeout(() => void check(), 250) : void 0;
		return () => {
			cancelled = true;
			if (idle !== void 0) window.cancelIdleCallback?.(idle);
			if (fallback !== void 0) window.clearTimeout(fallback);
		};
	}, []);
	const isAdmin = accountState === "admin";
	const accountLabel = isAdmin ? "Dashboard" : "Login";
	const accountHref = isAdmin ? "/admin" : "/login";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed inset-x-0 top-0 z-50 px-4 pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: `glass-pill mx-auto flex max-w-7xl flex-nowrap items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${scrolled ? "glass-strong" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#home",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 place-items-center rounded-full bg-foam shadow-[var(--shadow-glow)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "Digi Turtles logo",
							width: 32,
							height: 32,
							decoding: "async",
							className: "h-8 w-8 object-contain"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-base font-bold tracking-wide",
							children: "DIGI TURTLES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[9px] uppercase tracking-[0.3em] text-muted-foreground",
							children: "Where Ideas Evolve"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "hidden shrink-0 items-center gap-1 lg:flex",
					children: [NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: n.href,
						className: "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
						children: n.label
					}) }, n.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: accountHref,
						"aria-busy": accountState === "checking",
						className: `ml-1 inline-flex h-9 w-[88px] items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-primary)] px-3 text-xs font-bold text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow)] transition-opacity ${accountState === "checking" ? "pointer-events-none opacity-0" : "opacity-100"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						}), accountLabel]
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": open ? "Close menu" : "Open menu",
					className: "grid h-10 w-10 place-items-center rounded-full lg:hidden",
					onClick: () => setOpen((o) => !o),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass glass-strong mx-auto mt-2 max-w-7xl rounded-3xl p-3 lg:hidden",
			children: [NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: n.href,
				onClick: () => setOpen(false),
				className: "block rounded-2xl px-4 py-3 font-medium hover:bg-accent",
				children: n.label
			}, n.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: accountHref,
				onClick: () => setOpen(false),
				"aria-busy": accountState === "checking",
				className: `mt-1 flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-4 py-3 font-semibold text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow)] transition-opacity ${accountState === "checking" ? "pointer-events-none opacity-0" : "opacity-100"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {
					className: "h-4 w-4",
					"aria-hidden": true
				}), accountLabel]
			})]
		})]
	});
});
/** Glass card that tilts in 3D toward the pointer with a moving sheen. */
var Tilt = (0, import_react.memo)(function Tilt({ children, className, max = 8 }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		let frame = 0;
		let pointer;
		const apply = () => {
			frame = 0;
			const event = pointer;
			if (!event) return;
			const r = el.getBoundingClientRect();
			const x = (event.clientX - r.left) / r.width;
			const y = (event.clientY - r.top) / r.height;
			el.style.transform = `perspective(900px) rotateX(${(.5 - y) * max}deg) rotateY(${(x - .5) * max}deg) translateZ(0)`;
			el.style.setProperty("--mx", `${x * 100}%`);
			el.style.setProperty("--my", `${y * 100}%`);
		};
		const onMove = (event) => {
			if (event.pointerType !== "mouse") return;
			pointer = event;
			if (!frame) frame = requestAnimationFrame(apply);
		};
		const onLeave = () => {
			pointer = void 0;
			cancelAnimationFrame(frame);
			frame = 0;
			el.style.transform = "";
		};
		el.addEventListener("pointermove", onMove, { passive: true });
		el.addEventListener("pointerleave", onLeave, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerleave", onLeave);
		};
	}, [max]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("glass tilt", className),
		children
	});
});
var ICONS = {
	Target,
	Megaphone,
	Bot,
	Search,
	Gem,
	GraduationCap,
	ChartNoAxesCombined,
	Palette,
	Code2: CodeXml
};
function Heading({ eyebrow, title, text, center }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `text-depth mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "eyebrow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-primary" }), eyebrow]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl",
				children: title
			}),
			text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted-foreground",
				children: text
			})
		]
	});
}
function HeroSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		className: "relative flex min-h-screen items-center px-6 pt-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-depth",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "glass-pill inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary-glow",
						children: "Institute + Agency"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl",
						children: [
							"Learn. Build.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient",
								children: "Grow."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Become Independent."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-lg text-lg text-muted-foreground",
						children: "Digital skills + the turtle mindset. Practical education for learners and real growth for businesses — under one roof."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#services",
							className: "btn-hero",
							children: ["Explore Services ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "btn-glass",
							children: "Contact Us"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass mt-10 grid max-w-lg grid-cols-3 gap-4 rounded-3xl p-5",
						children: [
							["8", "Courses"],
							["5+", "Agency services"],
							["1", "Growth ecosystem"]
						].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-gradient font-display text-3xl font-bold",
							children: n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: l
						})] }, l))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative hidden h-[520px] lg:block",
				"aria-hidden": true,
				children: [
					{
						label: "AI Automation",
						pos: "left-[4%] top-[18%]",
						delay: "0s"
					},
					{
						label: "Brand Building",
						pos: "right-[6%] top-[24%]",
						delay: "1.2s"
					},
					{
						label: "8 Practical Courses",
						pos: "right-[2%] bottom-[22%]",
						delay: "2.1s"
					},
					{
						label: "SEO & Growth",
						pos: "left-[14%] bottom-[12%]",
						delay: "0.6s"
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `glass-pill absolute ${c.pos} animate-float rounded-full px-4 py-2 text-sm font-semibold`,
					style: { animationDelay: c.delay },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2 inline-block h-2 w-2 rounded-full bg-primary shadow-[var(--shadow-glow)]" }), c.label]
				}, c.label))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: "#hatch",
			className: "absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground",
			children: ["Scroll to hatch", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "animate-bob block h-8 w-5 rounded-full border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-auto mt-1.5 block h-2 w-1 rounded-full bg-primary" })
			})]
		})]
	});
}
/** Tall breathing-room sections where the 3D story takes centre stage. */
function InterludeSection({ id, story, step, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		"data-story": story,
		className: "relative flex min-h-[115vh] items-start px-6 pt-[16vh] md:items-center md:pt-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-7xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass max-w-sm rounded-3xl p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: step
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 text-3xl font-bold leading-tight",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: text
					})
				]
			})
		})
	});
}
function MarqueeSection({ items, big }) {
	const row = [...items, ...items];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glass-pill relative overflow-hidden border-x-0 py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-marquee flex w-max gap-10",
			children: row.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `flex items-center gap-10 whitespace-nowrap font-display font-semibold ${big ? "text-2xl tracking-widest text-muted-foreground" : "text-lg"}`,
				children: [c, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" })]
			}, i))
		})
	});
}
function AboutSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "px-6 py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tilt, {
				className: "overflow-hidden rounded-[2rem] p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: classroom_default,
					alt: "Students learning digital skills",
					className: "aspect-[4/5] w-full rounded-[1.5rem] object-cover",
					loading: "lazy",
					decoding: "async",
					width: 640,
					height: 800
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-pill tilt-pop absolute bottom-8 left-8 right-8 rounded-2xl p-4 font-display font-semibold",
					children: ["Learn → Build ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "→ Showcase → Monetize"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-[2rem] p-8 md:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Who we are"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 text-4xl font-bold leading-tight md:text-5xl",
						children: ["Not the fastest. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: "The one that keeps moving."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground",
						children: "Digi Turtles brings an Institute for practical skills and an Agency for real business growth together — so learners become professionals and businesses become stronger, more independent brands."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#team",
						className: "btn-glass mt-8",
						children: ["Our story ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})]
		})
	});
}
function ServicesSection({ services = SERVICES }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "px-6 py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				eyebrow: "Agency services",
				title: "Your growth partner, not a vendor"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: services.map((s) => {
					const Icon = ICONS[s.icon];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tilt, {
						className: "rounded-3xl p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tilt-pop grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary-glow shadow-[var(--shadow-glow)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-xl font-semibold",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted-foreground",
								children: s.text
							})
						]
					}, s.title);
				})
			})]
		})
	});
}
function PhilosophySection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				eyebrow: "The turtle philosophy",
				title: "Don't just learn. Become independent."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
				children: PHILOSOPHY.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tilt, {
					className: "rounded-3xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-gradient font-display text-4xl font-extrabold",
							children: ["0", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-lg font-semibold",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: p.text
						})
					]
				}, p.title))
			})]
		})
	});
}
function PortfolioSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "portfolio",
		className: "px-6 py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					eyebrow: "Portfolio",
					title: "Recent work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#contact",
					className: "btn-glass mb-12",
					children: ["Start a project ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tilt, {
					className: "group overflow-hidden rounded-3xl p-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-[1.25rem]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.img,
							alt: p.title,
							loading: "lazy",
							decoding: "async",
							width: 640,
							height: 480,
							className: "aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-widest text-primary-glow",
							children: p.tag
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 text-xl font-semibold",
							children: p.title
						})]
					})]
				}, p.title))
			})]
		})
	});
}
function TeamSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "team",
		className: "px-6 py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				eyebrow: "Our team",
				title: "Meet the turtles"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: TEAM.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tilt, {
					className: "rounded-3xl p-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: m.img,
						alt: `${m.name}, ${m.role}`,
						loading: "lazy",
						decoding: "async",
						width: 640,
						height: 800,
						className: "aspect-[4/5] w-full rounded-[1.25rem] object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold",
								children: m.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-primary-glow",
								children: m.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: m.bio
							})
						]
					})]
				}, m.name))
			})]
		})
	});
}
function BlogSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "blog",
		className: "px-6 py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				eyebrow: "From the blog",
				title: "Ideas that help you grow"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: POSTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tilt, {
					className: "group rounded-3xl p-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-[1.25rem]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.img,
							alt: p.title,
							loading: "lazy",
							decoding: "async",
							width: 640,
							height: 400,
							className: "aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
								children: p.meta
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-xl font-semibold",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: p.text
							})
						]
					})]
				}, p.title))
			})]
		})
	});
}
function CtaSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "px-6 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tilt, {
			max: 4,
			className: "mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl font-bold md:text-6xl",
					children: ["Your journey ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient",
						children: "starts here."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-xl text-lg text-muted-foreground",
					children: "Take the first bold step — join a course or let our agency grow your brand."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "mailto:hello@digiturtles.com",
					className: "btn-hero mt-8",
					children: ["Get in touch ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			]
		})
	});
}
function PartnersSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				center: true,
				eyebrow: "Trusted partnerships",
				title: "Brands we've worked with",
				text: "Helping teams turn ideas into systems, campaigns and growth."
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {
			items: PARTNERS,
			big: true
		})]
	});
}
function ReviewsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				center: true,
				eyebrow: "Client reviews",
				title: "Work that keeps people moving",
				text: "A few words about the systems, campaigns and learning experiences we create together."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: REVIEWS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tilt, {
					className: "flex flex-col rounded-3xl p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-7 w-7 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-4 flex-1 text-foreground/90",
							children: [
								"“",
								r.quote,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-11 w-11 place-items-center rounded-full bg-accent font-display text-sm font-bold text-primary-glow",
								children: r.name.split(" ").map((w) => w[0]).join("")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: r.role
							})] })]
						})
					]
				}, r.name))
			})]
		})
	});
}
function FaqSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				eyebrow: "FAQ",
				title: "Questions before your first step?",
				text: "Here are the answers to the things clients and learners ask us most often."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: "Still have questions?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#contact",
					className: "btn-hero mt-4",
					children: ["Contact us ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: FAQS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "faq glass group rounded-2xl px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold",
						children: [f.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "faq-icon h-5 w-5 shrink-0 text-primary transition-transform duration-300" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: f.a
					})]
				}, f.q))
			})]
		})
	});
}
function FooterSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "px-6 pb-8 pt-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass glass-strong mx-auto max-w-7xl rounded-[2rem] p-8 md:p-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-bold",
						children: "DIGI TURTLES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Institute + Agency. Learn. Build. Grow. Become Independent."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Explore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground",
						children: [
							"Home",
							"About",
							"Services",
							"Portfolio",
							"Team",
							"Blog"
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${l.toLowerCase()}`,
							className: "hover:text-primary-glow",
							children: l
						}, l))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: "Keep Moving. Keep Growing."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Your journey starts with one bold first step."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "btn-hero mt-4",
							children: "Start Today"
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 border-t pt-6 text-sm text-muted-foreground",
				children: "© 2026 Digi Turtles · Learn | Create | Grow"
			})]
		})
	});
}
var Hero = (0, import_react.memo)(HeroSection);
var Interlude = (0, import_react.memo)(InterludeSection);
var Marquee = (0, import_react.memo)(MarqueeSection);
var About = (0, import_react.memo)(AboutSection);
var Services = (0, import_react.memo)(ServicesSection);
var Philosophy = (0, import_react.memo)(PhilosophySection);
var Portfolio = (0, import_react.memo)(PortfolioSection);
var Team = (0, import_react.memo)(TeamSection);
var Blog = (0, import_react.memo)(BlogSection);
var Cta = (0, import_react.memo)(CtaSection);
var Partners = (0, import_react.memo)(PartnersSection);
var Reviews = (0, import_react.memo)(ReviewsSection);
var Faq = (0, import_react.memo)(FaqSection);
var Footer = (0, import_react.memo)(FooterSection);
var OceanScene = (0, import_react.lazy)(() => import("./OceanScene-CFZ0iA0_.mjs"));
function Index() {
	(0, import_react.useEffect)(() => {
		return startScrollStory();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLayer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-0 z-0 bg-[image:var(--gradient-veil)]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyHud, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interlude, {
						id: "hatch",
						story: ANCHOR.hatch,
						step: "01 · Hatch",
						title: "Every expert begins as a beginner.",
						text: "One small crack, then another. Growth starts from the inside."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, { items: COURSES }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interlude, {
						id: "crawl",
						story: ANCHOR.walk,
						step: "02 · Keep moving",
						title: "Small steps compound over time.",
						text: "Not the fastest across the sand — but always heading for the sea."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesLoader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Philosophy, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interlude, {
						id: "dive",
						story: ANCHOR.dive,
						step: "03 · Dive in",
						title: "Knowledge matters when applied.",
						text: "The moment you stop watching and start doing, the whole ocean opens up."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portfolio, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Team, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blog, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cta, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Partners, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			})
		]
	});
}
/** Isolates post-paint scene loading and readiness renders from page sections. */
var SceneLayer = (0, import_react.memo)(function SceneLayer() {
	const [loadScene, setLoadScene] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const id = window.requestIdleCallback?.(() => setLoadScene(true), { timeout: 1200 });
		const fallback = id === void 0 ? window.setTimeout(() => setLoadScene(true), 0) : void 0;
		return () => {
			if (id !== void 0) window.cancelIdleCallback?.(id);
			if (fallback !== void 0) window.clearTimeout(fallback);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000",
		style: { opacity: ready ? 1 : 0 },
		"data-scene-ready": ready ? "" : void 0,
		"aria-hidden": true,
		children: loadScene && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OceanScene, { onReady: () => setReady(true) })
		})
	});
});
var fallbackServices = SERVICES.map((service, index) => ({
	id: `bundled-service-${index + 1}`,
	title: service.title,
	text: service.text,
	icon: service.icon,
	sortOrder: index
}));
/** Keeps the home route DB-free during SSR, then upgrades the bundled cards at idle. */
var ServicesLoader = (0, import_react.memo)(function ServicesLoader() {
	const [services, setServices] = (0, import_react.useState)(fallbackServices);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const load = () => {
			getPublishedServices().then((result) => {
				if (!cancelled && Array.isArray(result)) setServices(result);
			}).catch(() => {});
		};
		const idleId = window.requestIdleCallback?.(load, { timeout: 1500 });
		const timeoutId = idleId === void 0 ? window.setTimeout(load, 0) : void 0;
		return () => {
			cancelled = true;
			if (idleId !== void 0) window.cancelIdleCallback?.(idleId);
			if (timeoutId !== void 0) window.clearTimeout(timeoutId);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, { services });
});
//#endregion
export { Index as component };
