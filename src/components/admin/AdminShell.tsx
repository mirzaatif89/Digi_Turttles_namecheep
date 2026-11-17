import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronsLeft, ExternalLink, LogOut, Menu } from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/logo.png";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { logoutAdmin } from "@/lib/auth.functions";
import type { AdminSession } from "@/lib/auth.types";
import { unreadMessageCount } from "@/lib/cms/inbox.functions";
import { canViewSection } from "@/lib/cms/access";
import { isAdminModule } from "@/lib/permissions";
import { Toaster } from "@/components/ui/sonner";
import { findSection } from "@/lib/cms/schema";
import { cn } from "@/lib/utils";
import { adminIcon } from "./icons";
import { ADMIN_NAV, navHref } from "./nav";

export const UNREAD_KEY = ["admin", "unread-count"] as const;

const SessionContext = createContext<AdminSession | null>(null);
export function useAdminSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error("Admin session is required.");
  return session;
}

function useUnreadCount() {
  const session = useAdminSession();
  return useQuery({
    queryKey: UNREAD_KEY,
    queryFn: () => unreadMessageCount(),
    enabled: session.permissions.messages.view,
    refetchInterval: 60_000,
  });
}

function Sidebar({
  email,
  pathname,
  compact,
  mobile,
  onCollapse,
  onSignOut,
  onNavigate,
}: {
  email: string;
  pathname: string;
  compact: boolean;
  mobile?: boolean;
  onCollapse(): void;
  onSignOut(): void;
  onNavigate?(): void;
}) {
  const session = useAdminSession();
  const groups = ADMIN_NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      if (item.to === "section") return canViewSection(session.permissions, item.section ?? "");
      const key = item.to === "/admin" ? "dashboard" : item.to.split("/")[2];
      return key === "account" || (key && isAdminModule(key) && session.permissions[key].view);
    }),
  })).filter((group) => group.items.length);
  const [closed, setClosed] = useState<string[]>([]);
  const unread = useUnreadCount().data ?? 0;
  return (
    <aside
      className={cn(
        "admin-sidebar flex h-full flex-col border-r",
        compact ? "w-[72px]" : "w-[260px]",
        mobile && "w-[280px]",
      )}
    >
      <div className="flex h-[76px] shrink-0 items-center gap-3 px-4">
        <img
          src={logo}
          width={38}
          height={38}
          alt="Digi Turtles"
          className="h-9 w-9 rounded-xl bg-foam p-1"
        />
        {!compact && (
          <div className="min-w-0">
            <p className="font-display text-sm font-bold tracking-wide">DIGI TURTLES</p>
            <p className="text-xs text-[var(--admin-muted)]">Admin control room</p>
          </div>
        )}
        {!mobile && (
          <button
            onClick={onCollapse}
            aria-label={compact ? "Expand sidebar" : "Collapse sidebar"}
            className="admin-icon-button ml-auto"
          >
            <ChevronsLeft className={cn("h-4 w-4", compact && "rotate-180")} />
          </button>
        )}
      </div>
      <nav
        aria-label="Admin navigation"
        className="admin-sidebar-scroll flex-1 overflow-y-auto px-3 pb-4"
      >
        {groups.map((group) => {
          const isClosed = closed.includes(group.label);
          return (
            <section key={group.label} className="mb-3">
              {!compact && (
                <button
                  onClick={() =>
                    setClosed((v) =>
                      v.includes(group.label)
                        ? v.filter((x) => x !== group.label)
                        : [...v, group.label],
                    )
                  }
                  className="mb-1 flex w-full items-center justify-between px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--admin-muted)]"
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={cn("h-3 w-3 transition-transform", isClosed && "-rotate-90")}
                  />
                </button>
              )}
              {(compact || !isClosed) &&
                group.items.map((item) => {
                  const Icon = adminIcon(item.icon);
                  const href = navHref(item);
                  const active =
                    pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));
                  const className = cn(
                    "admin-nav-link",
                    active && "admin-nav-link-active",
                    compact && "justify-center px-2",
                  );
                  const contents = (
                    <>
                      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
                      <span className={cn("truncate", compact && "sr-only")}>{item.label}</span>
                      {item.badge && unread > 0 && !compact && (
                        <span
                          className="admin-unread-badge"
                          aria-label={`${unread} unread messages`}
                        >
                          {unread}
                        </span>
                      )}
                    </>
                  );
                  return item.to === "section" || item.to === "/admin/account" ? (
                    <Link
                      key={href}
                      to="/admin/$module"
                      params={{ module: item.section ?? "account" }}
                      title={compact ? item.label : undefined}
                      onClick={onNavigate}
                      className={className}
                    >
                      {contents}
                    </Link>
                  ) : (
                    <Link
                      key={href}
                      to={item.to}
                      title={compact ? item.label : undefined}
                      onClick={onNavigate}
                      className={className}
                      activeOptions={{ exact: true }}
                    >
                      {contents}
                    </Link>
                  );
                })}
            </section>
          );
        })}
      </nav>
      <div
        className={cn("m-3 rounded-2xl border border-[var(--admin-border)] p-3", compact && "p-2")}
      >
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--admin-teal)] text-xs font-bold text-[var(--admin-bg)]">
            {email.slice(0, 2).toUpperCase()}
          </span>
          <div className={cn("min-w-0", compact && "sr-only")}>
            <p className="truncate text-sm font-semibold">{email}</p>
            <p className="mt-0.5 inline-flex rounded-full bg-[var(--admin-teal)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--admin-teal)]">
              {session.user.role.replaceAll("_", " ")}
            </p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className={cn("admin-signout mt-3", compact && "mt-2 justify-center px-2")}
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
          <span className={compact ? "sr-only" : ""}>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

function pageTitle(pathname: string) {
  const seg = pathname.split("/")[2];
  if (!seg) return "Dashboard";
  const fixed: Record<string, string> = {
    messages: "Messages",
    subscribers: "Subscribers",
    media: "Media Library",
    users: "Admin Users",
    account: "My Account",
  };
  return fixed[seg] ?? findSection(seg)?.label ?? "Admin";
}

export function AdminShell({ session, children }: { session: AdminSession; children: ReactNode }) {
  const email = session.user.email;
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("digiturtle-admin-sidebar") === "collapsed");
    } catch {
      /* storage blocked */
    }
  }, []);

  const toggle = () =>
    setCollapsed((v) => {
      try {
        localStorage.setItem("digiturtle-admin-sidebar", v ? "expanded" : "collapsed");
      } catch {
        /* ignore */
      }
      return !v;
    });

  const signOut = async () => {
    await logoutAdmin();
    window.location.assign("/login");
  };

  return (
    <SessionContext.Provider value={session}>
      <div className="admin-theme">
        <div className="admin-app min-h-screen">
          <div className="sticky top-0 hidden h-screen shrink-0 md:block">
            <Sidebar
              email={email}
              pathname={pathname}
              compact={collapsed}
              onCollapse={toggle}
              onSignOut={signOut}
            />
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="left" className="admin-mobile-sheet p-0">
              <SheetTitle className="sr-only">Admin menu</SheetTitle>
              <Sidebar
                email={email}
                pathname={pathname}
                compact={false}
                mobile
                onCollapse={toggle}
                onSignOut={signOut}
                onNavigate={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="admin-topbar sticky top-0 z-30 flex h-[64px] items-center gap-3 border-b px-4 md:px-7">
              <button
                className="admin-icon-button md:hidden"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </button>
              <h1 className="truncate font-display text-lg font-bold">{pageTitle(pathname)}</h1>
              <a href="/" target="_blank" rel="noreferrer" className="admin-view-site ml-auto">
                <ExternalLink className="h-3.5 w-3.5" /> View website
              </a>
              <button
                onClick={signOut}
                className="admin-icon-button"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </header>
            <main className="admin-main flex-1 p-4 md:p-7">{children}</main>
            <Toaster />
          </div>
        </div>
      </div>
    </SessionContext.Provider>
  );
}
