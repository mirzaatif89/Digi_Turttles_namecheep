import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileImage,
  FileText,
  Globe2,
  UserPlus,
} from "lucide-react";
import type { PermissionMap } from "@/lib/permissions";

const actions = [
  {
    module: "services",
    action: "create",
    label: "New service",
    href: "/admin/services?new=1",
    icon: BriefcaseBusiness,
  },
  {
    module: "media",
    action: "create",
    label: "Upload media",
    href: "/admin/media",
    icon: FileImage,
  },
  {
    module: "team",
    action: "create",
    label: "Add team member",
    href: "/admin/team",
    icon: UserPlus,
  },
  { module: "blog", action: "create", label: "New blog post", href: "/admin/blog", icon: FileText },
] as const;

export function QuickActions({ permissions }: { permissions: PermissionMap }) {
  const visible = actions.filter((item) => permissions[item.module][item.action]);
  return (
    <section className="admin-dashboard-panel" aria-labelledby="quick-actions-title">
      <div>
        <p className="admin-eyebrow">Shortcuts</p>
        <h2 id="quick-actions-title" className="mt-1 font-display text-lg font-semibold">
          Quick actions
        </h2>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {visible.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.href} className="admin-dashboard-action">
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
        <a href="/" className="admin-dashboard-action" aria-label="View public site">
          <Globe2 className="h-4 w-4" aria-hidden="true" />
          <span>View site</span>
          <ArrowUpRight className="ml-auto h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
