import { Link } from "@tanstack/react-router";
import {
  Archive,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronsLeft,
  CircleHelp,
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
  LogOut,
  MailCheck,
  Menu,
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
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { ADMIN_NAVIGATION, visibleNavigation } from "@/lib/admin-navigation";
import type { AdminSession } from "@/lib/auth.types";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Archive,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleHelp,
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
  UsersRound,
};

type SidebarProps = {
  session: AdminSession;
  pathname: string;
  collapsed: boolean;
  onCollapse(): void;
  onSignOut(): void;
  mobile?: boolean;
  onNavigate?(): void;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AdminSidebar({
  session,
  pathname,
  collapsed,
  onCollapse,
  onSignOut,
  mobile = false,
  onNavigate,
}: SidebarProps) {
  const [closedGroups, setClosedGroups] = useState<string[]>([]);
  const groups = visibleNavigation(session.permissions);
  const compact = collapsed && !mobile;

  return (
    <aside
      className={cn(
        "admin-sidebar flex h-full flex-col border-r",
        compact ? "w-[72px]" : "w-[260px]",
        mobile && "w-[280px]",
      )}
    >
      <div className="flex h-[76px] items-center gap-3 px-4">
        <img
          src={logo}
          width={38}
          height={38}
          decoding="async"
          alt="Digi Turtles"
          className="h-9 w-9 rounded-xl bg-white/90 p-1"
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
          const isClosed = closedGroups.includes(group.label);
          return (
            <section key={group.label} className="mb-4">
              {!compact && (
                <button
                  onClick={() =>
                    setClosedGroups((value) =>
                      value.includes(group.label)
                        ? value.filter((entry) => entry !== group.label)
                        : [...value, group.label],
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
                  const Icon = icons[item.icon] ?? Menu;
                  const targetPath =
                    item.module === "dashboard" ? "/admin" : `/admin/${item.module}`;
                  const active = pathname === targetPath;
                  const className = cn(
                    "admin-nav-link",
                    active && "admin-nav-link-active",
                    compact && "justify-center px-2",
                  );
                  const contents = (
                    <>
                      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
                      <span className={cn("truncate", compact && "sr-only")}>{item.label}</span>
                      {item.badge && !compact && (
                        <span className="admin-unread-badge" aria-label="0 unread messages">
                          0
                        </span>
                      )}
                    </>
                  );
                  return item.module === "dashboard" ? (
                    <Link
                      key={item.module}
                      to="/admin"
                      title={compact ? item.label : undefined}
                      className={className}
                      onClick={onNavigate}
                    >
                      {contents}
                    </Link>
                  ) : (
                    <Link
                      key={item.module}
                      to="/admin/$module"
                      params={{ module: item.module }}
                      title={compact ? item.label : undefined}
                      className={className}
                      onClick={onNavigate}
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
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--admin-teal)] text-xs font-bold text-slate-950">
            {initials(session.user.name)}
          </span>
          <div className={cn("min-w-0", compact && "sr-only")}>
            <p className="truncate text-sm font-semibold">{session.user.name}</p>
            <p className="mt-0.5 inline-flex rounded-full bg-[var(--admin-teal)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--admin-teal)]">
              {session.user.role.replace("_", " ")}
            </p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className={cn("admin-signout mt-3", compact && "mt-2 justify-center px-2")}
          aria-label="Sign out"
          title={compact ? "Sign out" : undefined}
        >
          <LogOut className="h-4 w-4" />
          <span className={compact ? "sr-only" : ""}>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

export { ADMIN_NAVIGATION };
