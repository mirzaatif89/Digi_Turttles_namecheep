import { Link, useNavigate } from "@tanstack/react-router";
import { Command, Menu, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { visibleNavigation } from "@/lib/admin-navigation";
import type { AdminSession } from "@/lib/auth.types";

type Props = {
  session: AdminSession;
  title: string;
  light: boolean;
  onToggleTheme(): void;
  onOpenMobile(): void;
  onSignOut(): void;
};

export function AdminTopbar({
  session,
  title,
  light,
  onToggleTheme,
  onOpenMobile,
  onSignOut,
}: Props) {
  const [commandOpen, setCommandOpen] = useState(false);
  const navigate = useNavigate();
  const modules = visibleNavigation(session.permissions).flatMap((group) => group.items);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openModule = (module: (typeof modules)[number]["module"]) => {
    setCommandOpen(false);
    if (module === "dashboard") void navigate({ to: "/admin" });
    else void navigate({ to: "/admin/$module", params: { module } });
  };

  return (
    <header className="admin-topbar flex min-h-[76px] items-center gap-3 border-b px-4 md:px-7">
      <button
        onClick={onOpenMobile}
        className="admin-icon-button md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="hidden text-xs text-[var(--admin-muted)] sm:block">Admin / {title}</p>
        <h1 className="truncate font-display text-lg font-semibold md:text-xl">{title}</h1>
      </div>
      <button
        onClick={() => setCommandOpen(true)}
        className="admin-command-trigger"
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search admin</span>
        <kbd className="hidden sm:inline">⌘K</kbd>
      </button>
      <a href="/" target="_blank" rel="noreferrer" className="admin-view-site">
        View site
      </a>
      <button
        onClick={onToggleTheme}
        className="admin-icon-button"
        aria-label={light ? "Use dark theme" : "Use light theme"}
      >
        {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Open account menu"
            className="grid h-9 w-9 place-items-center rounded-full bg-[var(--admin-teal)] text-xs font-bold text-slate-950"
          >
            {session.user.name.slice(0, 1).toUpperCase()}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="admin-account-menu w-60">
          <DropdownMenuLabel>
            <p className="font-semibold">{session.user.name}</p>
            <p className="mt-0.5 truncate text-xs font-normal opacity-70">{session.user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onSignOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Jump to a module…" />
        <CommandList>
          <CommandEmpty>No permitted modules found.</CommandEmpty>
          <CommandGroup heading="Your modules">
            {modules.map((item) => (
              <CommandItem key={item.module} onSelect={() => openModule(item.module)}>
                <Command className="h-4 w-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
