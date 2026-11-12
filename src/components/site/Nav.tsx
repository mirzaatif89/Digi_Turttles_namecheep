import { Link } from "@tanstack/react-router";
import { LogIn, Menu, X } from "lucide-react";
import { memo, useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { NAV } from "./content";

export const Nav = memo(function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountState, setAccountState] = useState<"checking" | "guest" | "admin">("checking");
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY > 24;
        setScrolled((current) => (current === next ? current : next));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const { getPublicAdminSession } = await import("@/lib/session.functions");
        const session = await getPublicAdminSession();
        if (!cancelled) setAccountState(session ? "admin" : "guest");
      } catch {
        if (!cancelled) setAccountState("guest");
      }
    };
    const idle = window.requestIdleCallback?.(() => void check(), { timeout: 1200 });
    const fallback = idle === undefined ? window.setTimeout(() => void check(), 250) : undefined;
    return () => {
      cancelled = true;
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      if (fallback !== undefined) window.clearTimeout(fallback);
    };
  }, []);
  const isAdmin = accountState === "admin";
  const accountLabel = isAdmin ? "Dashboard" : "Login";
  const accountHref = isAdmin ? "/admin" : "/login";
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`glass-pill mx-auto flex max-w-7xl flex-nowrap items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${scrolled ? "glass-strong" : ""}`}
      >
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-foam shadow-[var(--shadow-glow)]">
            <img
              src={logo}
              alt="Digi Turtles logo"
              width={32}
              height={32}
              decoding="async"
              className="h-8 w-8 object-contain"
            />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold tracking-wide">
              DIGI TURTLES
            </span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Where Ideas Evolve
            </span>
          </span>
        </a>
        <ul className="hidden shrink-0 items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to={accountHref}
              aria-busy={accountState === "checking"}
              className={`ml-1 inline-flex h-9 w-[88px] items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-primary)] px-3 text-xs font-bold text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow)] transition-opacity ${accountState === "checking" ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <LogIn className="h-3.5 w-3.5" aria-hidden />
              {accountLabel}
            </Link>
          </li>
        </ul>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="glass glass-strong mx-auto mt-2 max-w-7xl rounded-3xl p-3 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 font-medium hover:bg-accent"
            >
              {n.label}
            </a>
          ))}
          <Link
            to={accountHref}
            onClick={() => setOpen(false)}
            aria-busy={accountState === "checking"}
            className={`mt-1 flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-4 py-3 font-semibold text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow)] transition-opacity ${accountState === "checking" ? "pointer-events-none opacity-0" : "opacity-100"}`}
          >
            <LogIn className="h-4 w-4" aria-hidden />
            {accountLabel}
          </Link>
        </div>
      )}
    </header>
  );
});
