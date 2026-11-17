import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageIntro } from "@/components/admin/fields";
import { listSubscribers, deleteSubscriber } from "@/lib/cms/inbox.functions";

export function SubscribersPage() {
  const queryClient = useQueryClient();
  const list = useQuery({
    queryKey: ["admin", "subscribers"],
    queryFn: () => listSubscribers(),
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteSubscriber({ data: { id } }),
    onSuccess: () => {
      toast.success("Subscriber removed");
      void queryClient.invalidateQueries({ queryKey: ["admin", "subscribers"] });
    },
  });
  const exportCsv = () => {
    const rows = [
      ["email", "subscribed_at"],
      ...(list.data ?? []).map((s) => [s.email, s.created_at]),
    ];
    const csv = rows
      .map((r) =>
        r.map((c) => `"${(/^[=+@\-\t\r]/.test(c) ? "'" + c : c).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-6">
      <PageIntro
        title="Subscribers"
        description="People who subscribed from the footer of your website."
        actions={
          <button
            onClick={exportCsv}
            disabled={!list.data?.length}
            className="admin-secondary-button gap-2"
          >
            <Download className="h-4 w-4" /> Download list
          </button>
        }
      />
      <section className="admin-card overflow-hidden">
        {list.isLoading ? (
          <div className="flex items-center gap-2 p-6 text-sm text-[var(--admin-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : (list.data ?? []).length === 0 ? (
          <p className="p-10 text-center text-sm text-[var(--admin-muted)]">No subscribers yet.</p>
        ) : (
          <ul className="divide-y divide-[var(--admin-border)]">
            {list.data!.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{s.email}</p>
                  <p className="text-xs text-[var(--admin-muted)]">
                    {new Date(s.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="admin-table-action"
                  aria-label="Remove subscriber"
                  onClick={() => confirm(`Remove ${s.email}?`) && remove.mutate(s.id)}
                >
                  <Trash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
