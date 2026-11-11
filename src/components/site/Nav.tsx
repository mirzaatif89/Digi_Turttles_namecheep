import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { NAV } from "./content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`glass-pill mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${scrolled ? "glass-strong" : ""}`}
      >
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-foam shadow-[var(--shadow-glow)]">
            <img src={logo} alt="Digi Turtles logo" className="h-8 w-8 object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold tracking-wide">DIGI TURTLES</span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Where Ideas Evolve</span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button aria-label={open ? "Close menu" : "Open menu"} className="grid h-10 w-10 place-items-center rounded-full lg:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="glass glass-strong mx-auto mt-2 max-w-7xl rounded-3xl p-3 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-medium hover:bg-accent">
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
