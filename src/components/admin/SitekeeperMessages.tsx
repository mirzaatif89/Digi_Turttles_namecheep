import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Mail, MailOpen, Phone, Reply, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UNREAD_KEY } from "@/components/admin/AdminShell";
import { PageIntro } from "@/components/admin/fields";
import { listMessages, updateMessage, deleteMessage } from "@/lib/cms/inbox.functions";
import { cn } from "@/lib/utils";

export function MessagesPage() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [open, setOpen] = useState<string | null>(null);
  const key = ["admin", "messages", filter];
  const messages = useQuery({
    queryKey: key,
    queryFn: () => listMessages({ data: { unread: filter === "unread" } }),
  });
  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
    void queryClient.invalidateQueries({ queryKey: UNREAD_KEY });
    void queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
  };
  const setRead = useMutation({
    mutationFn: ({ id, is_read }: { id: string; is_read: boolean }) =>
      updateMessage({ data: { id, is_read } }),
    onSuccess: refresh,
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteMessage({ data: { id } }),
    onSuccess: () => {
      toast.success("Message deleted");
      refresh();
    },
    onError: () => toast.error("Could not delete message"),
  });

  return (
    <div className="space-y-6">
      <PageIntro
        title="Messages"
        description="Messages people send from the contact form on your website."
        actions={
          <div className="flex gap-1 rounded-xl border border-[var(--admin-border)] p-1">
            {(["all", "unread"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "admin-nav-link min-h-0 w-auto px-3 py-1.5",
                  filter === f && "admin-nav-link-active",
                )}
              >
                {f === "all" ? "All" : "Unread"}
              </button>
            ))}
          </div>
        }
      />
      <section className="admin-card overflow-hidden">
        {messages.isLoading ? (
          <div className="flex items-center gap-2 p-6 text-sm text-[var(--admin-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : (messages.data ?? []).length === 0 ? (
          <p className="p-10 text-center text-sm text-[var(--admin-muted)]">No messages here.</p>
        ) : (
          <ul className="divide-y divide-[var(--admin-border)]">
            {messages.data!.map((m) => {
              const expanded = open === m.id;
              return (
                <li key={m.id} className="p-4">
                  <button
                    className="flex w-full items-start gap-3 text-left"
                    onClick={() => {
                      setOpen(expanded ? null : m.id);
                      if (!m.is_read) setRead.mutate({ id: m.id, is_read: true });
                    }}
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        m.is_read ? "bg-transparent" : "bg-[var(--admin-teal)]",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className={cn("truncate", !m.is_read && "font-bold")}>{m.name}</p>
                        <span className="text-xs text-[var(--admin-muted)]">
                          {new Date(m.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="truncate text-sm text-[var(--admin-muted)]">{m.email}</p>
                      <p
                        className={cn(
                          "mt-1 text-sm",
                          expanded ? "whitespace-pre-line" : "line-clamp-1",
                        )}
                      >
                        {m.message}
                      </p>
                    </div>
                  </button>
                  {expanded && (
                    <div className="mt-3 flex flex-wrap gap-2 pl-5">
                      <a href={`mailto:${m.email}`} className="admin-primary-button gap-2">
                        <Reply className="h-4 w-4" /> Reply by email
                      </a>
                      {m.phone && (
                        <a href={`tel:${m.phone}`} className="admin-secondary-button gap-2">
                          <Phone className="h-4 w-4" /> {m.phone}
                        </a>
                      )}
                      <button
                        onClick={() => setRead.mutate({ id: m.id, is_read: !m.is_read })}
                        className="admin-secondary-button gap-2"
                      >
                        {m.is_read ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <MailOpen className="h-4 w-4" />
                        )}
                        Mark as {m.is_read ? "unread" : "read"}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this message?")) remove.mutate(m.id);
                        }}
                        className="admin-secondary-button gap-2"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
