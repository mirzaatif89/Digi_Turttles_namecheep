import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSetting, saveSetting } from "@/lib/cms/admin.functions";
import { mergeData, type Data, type Field } from "@/lib/cms/schema";
import { SITE_CONTENT_KEY } from "@/lib/cms/site";
import { FieldsForm } from "./fields";

const toData = (value: unknown): Data =>
  value && typeof value === "object" && !Array.isArray(value)
    ? Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [
          k,
          v == null ? "" : String(v),
        ]),
      )
    : {};

export function SettingsForm({
  settingsKey,
  fields,
  defaults,
  title,
  description,
}: {
  settingsKey: string;
  fields: Field[];
  defaults: Data;
  title?: string;
  description?: string;
}) {
  const queryClient = useQueryClient();
  const queryKey = ["admin", "setting", settingsKey];
  const query = useQuery({
    queryKey,
    queryFn: () => getSetting({ data: { key: settingsKey } }),
  });
  const [form, setForm] = useState<Data>(defaults);
  useEffect(() => {
    if (query.data) setForm(query.data);
  }, [query.data]);

  const save = useMutation({
    mutationFn: (data: Data) => saveSetting({ data: { key: settingsKey, value: data } }),
    onSuccess: () => {
      toast.success("Saved — the website is updated.");
      void queryClient.invalidateQueries({ queryKey });
      void queryClient.invalidateQueries({ queryKey: SITE_CONTENT_KEY });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save"),
  });

  const dirty = query.data ? JSON.stringify(query.data) !== JSON.stringify(form) : false;

  return (
    <section className="admin-card p-5 md:p-7">
      {(title || description) && (
        <div className="mb-5">
          {title && <h3 className="font-display text-lg font-bold">{title}</h3>}
          {description && <p className="mt-1 text-sm text-[var(--admin-muted)]">{description}</p>}
        </div>
      )}
      {query.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-[var(--admin-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : query.isError ? (
        <p className="text-sm text-destructive">Could not load this section.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate(form);
          }}
        >
          <FieldsForm fields={fields} value={form} onChange={setForm} />
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button type="submit" disabled={save.isPending} className="admin-primary-button gap-2">
              {save.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save changes
            </button>
            {dirty && (
              <button
                type="button"
                onClick={() => query.data && setForm(query.data)}
                className="admin-secondary-button gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Undo changes
              </button>
            )}
            {dirty && (
              <span className="text-xs text-[var(--admin-muted)]">You have unsaved changes</span>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
