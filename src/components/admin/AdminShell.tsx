import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { logoutAdmin } from "@/lib/auth.functions";
import type { AdminSession } from "@/lib/auth.types";
import { moduleTitle } from "@/lib/admin-navigation";
import { isAdminModule } from "@/lib/permissions";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminShell({ session, children }: { session: AdminSession; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [light, setLight] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("digiturtle-admin-sidebar") === "collapsed");
      const savedTheme = localStorage.getItem("digiturtle-admin-theme");
      setLight(
        savedTheme === "light" || document.documentElement.dataset["adminTheme"] === "light",
      );
    } catch {
      // Storage may be blocked; the dark default remains usable.
    }
  }, []);

  const toggleSidebar = () =>
    setCollapsed((value) => {
      const next = !value;
      try {
        localStorage.setItem("digiturtle-admin-sidebar", next ? "collapsed" : "expanded");
      } catch {
        /* ignore */
      }
      return next;
    });
  const toggleTheme = () =>
    setLight((value) => {
      const next = !value;
      try {
        localStorage.setItem("digiturtle-admin-theme", next ? "light" : "dark");
        document.documentElement.dataset["adminTheme"] = next ? "light" : "dark";
      } catch {
        /* ignore */
      }
      return next;
    });
  const signOut = async () => {
    await logoutAdmin();
    await navigate({ to: "/login", search: { redirect: "/admin" } });
  };
  const pathname = location.pathname;
  const segment = pathname.split("/")[2];
  const title = segment && isAdminModule(segment) ? moduleTitle(segment) : "Dashboard";

  return (
    <div className={`admin-theme${light ? " light" : ""}`}>
      <div className="admin-app min-h-screen">
        <div className="hidden h-screen shrink-0 md:block">
          <AdminSidebar
            session={session}
            pathname={pathname}
            collapsed={collapsed}
            onCollapse={toggleSidebar}
            onSignOut={signOut}
          />
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="admin-mobile-sheet p-0">
            <AdminSidebar
              session={session}
              pathname={pathname}
              collapsed={false}
              mobile
              onCollapse={toggleSidebar}
              onSignOut={signOut}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar
            session={session}
            title={title}
            light={light}
            onToggleTheme={toggleTheme}
            onOpenMobile={() => setMobileOpen(true)}
            onSignOut={signOut}
          />
          <main className="admin-main flex-1 p-4 md:p-7">{children}</main>
        </div>
      </div>
    </div>
  );
}
