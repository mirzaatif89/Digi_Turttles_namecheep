import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Trash2, UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/admin/fields";
import { createAdmin, listAdmins, removeAdmin } from "@/lib/admin-users.functions";

export function UsersPage() {
  const queryClient = useQueryClient();
  const list = useServerFn(listAdmins);
  const create = useServerFn(createAdmin);
  const del = useServerFn(removeAdmin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const admins = useQuery({ queryKey: ["admin", "users"], queryFn: () => list() });
  const add = useMutation({
    mutationFn: () => create({ data: { email, password } }),
    onSuccess: () => {
      toast.success("Admin added — they can sign in now.");
      setEmail("");
      setPassword("");
      void queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not add admin"),
  });
  const remove = useMutation({
    mutationFn: (userId: string) => del({ data: { userId } }),
    onSuccess: () => {
      toast.success("Admin removed");
      void queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not remove admin"),
  });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Enter a valid email");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    add.mutate();
  };
  return (
    <div className="space-y-6">
      <PageIntro title="Admin Users" description="People who can sign in and edit the website." />
      <section className="admin-card p-5 md:p-7">
        <h3 className="font-display text-lg font-bold">Add a new admin</h3>
        <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="admin-table-input"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password (min 8 characters)"
            className="admin-table-input"
            autoComplete="new-password"
          />
          <button disabled={add.isPending} className="admin-primary-button gap-2">
            {add.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            Add admin
          </button>
        </form>
        <p className="mt-2 text-xs text-[var(--admin-muted)]">
          Share the email and password with them privately. They can change the password later.
        </p>
      </section>
      <section className="admin-card overflow-hidden">
        {admins.isLoading ? (
          <div className="flex items-center gap-2 p-6 text-sm text-[var(--admin-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : admins.isError ? (
          <p className="p-6 text-sm text-destructive">Could not load admins.</p>
        ) : (
          <ul className="divide-y divide-[var(--admin-border)]">
            {admins.data!.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {a.email}{" "}
                    {a.isYou && (
                      <span className="admin-status admin-status-published ml-1">You</span>
                    )}
                  </p>
                  <p className="text-xs text-[var(--admin-muted)]">
                    Last sign-in: {a.lastSignIn ? new Date(a.lastSignIn).toLocaleString() : "never"}
                  </p>
                </div>
                {!a.isYou && (
                  <button
                    className="admin-table-action"
                    aria-label={`Remove ${a.email}`}
                    onClick={() =>
                      confirm(`Remove ${a.email}? They will no longer be able to sign in.`) &&
                      remove.mutate(a.id)
                    }
                  >
                    <Trash2 />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
