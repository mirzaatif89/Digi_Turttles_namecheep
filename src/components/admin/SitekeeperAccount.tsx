import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/admin/fields";
import { changePassword } from "@/lib/admin-users.functions";
import { useAdminSession } from "./AdminShell";

export function AccountPage() {
  const { user } = useAdminSession();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (next.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (next !== confirm) {
      toast.error("New passwords do not match");
      return;
    }
    setBusy(true);
    try {
      await changePassword({ data: { current, next } });
      toast.success("Password changed. Please sign in again.");
      window.location.assign("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not change password");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-6">
      <PageIntro title="My Account" description={`Signed in as ${user.email}`} />
      <section className="admin-card max-w-xl p-5 md:p-7">
        <h3 className="font-display text-lg font-bold">Change password</h3>
        <form onSubmit={submit} className="mt-4 space-y-4">
          {[
            ["Current password", current, setCurrent, "current-password"],
            ["New password", next, setNext, "new-password"],
            ["Confirm new password", confirm, setConfirm, "new-password"],
          ].map(([label, value, set, ac]) => (
            <label key={label as string} className="block space-y-1.5">
              <span className="admin-form-label">{label as string}</span>
              <input
                type="password"
                value={value as string}
                autoComplete={ac as string}
                onChange={(e) => (set as (v: string) => void)(e.target.value)}
                className="admin-table-input"
              />
            </label>
          ))}
          <button disabled={busy} className="admin-primary-button gap-2">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Update password
          </button>
        </form>
      </section>
    </div>
  );
}
