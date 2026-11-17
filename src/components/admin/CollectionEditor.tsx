import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  EyeOff,
  Heading,
  List,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { listContent, saveContent, contentAction } from "@/lib/cms/admin.functions";
import { headingKey, type CollectionDef, type Data } from "@/lib/cms/schema";
import { SITE_CONTENT_KEY } from "@/lib/cms/site";
import { FieldsForm, PageIntro } from "./fields";
import { SettingsForm } from "./SettingsForm";

type Item = { id: string; data: Data; sort_order: number; published: boolean };

const toData = (value: unknown): Data =>
  value && typeof value === "object" && !Array.isArray(value)
    ? Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [
          k,
          v == null ? "" : String(v),
        ]),
      )
    : {};

export function CollectionEditor({ def }: { def: CollectionDef }) {
  const queryClient = useQueryClient();
  const queryKey = ["admin", "items", def.key];
  const [editing, setEditing] = useState<{
    id: string | null;
    data: Data;
    published: boolean;
  } | null>(null);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"items" | "heading">("items");

  const items = useQuery({
    queryKey,
    queryFn: () => listContent({ data: { collection: def.key } }),
  });

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey });
    void queryClient.invalidateQueries({ queryKey: SITE_CONTENT_KEY });
  };
  const fail = (error: unknown) =>
    toast.error(error instanceof Error ? error.message : "Something went wrong");

  const save = useMutation({
    mutationFn: (value: { id: string | null; data: Data; published: boolean }) =>
      saveContent({
        data: { collection: def.key, id: value.id, value: value.data, published: value.published },
      }),
    onSuccess: (_d, value) => {
      toast.success(value.id ? `${def.itemLabel} updated` : `${def.itemLabel} added`);
      setEditing(null);
      refresh();
    },
    onError: fail,
  });

  const toggle = useMutation({
    mutationFn: (item: Item) =>
      contentAction({ data: { collection: def.key, id: item.id, action: "publish" } }),
    onSuccess: (_d, item) => {
      toast.success(item.published ? "Hidden from website" : "Shown on website");
      refresh();
    },
    onError: fail,
  });

  const remove = useMutation({
    mutationFn: (item: Item) =>
      contentAction({ data: { collection: def.key, id: item.id, action: "delete" } }),
    onSuccess: () => {
      toast.success(`${def.itemLabel} deleted`);
      setDeleting(null);
      refresh();
    },
    onError: fail,
  });

  const duplicate = useMutation({
    mutationFn: (item: Item) =>
      contentAction({ data: { collection: def.key, id: item.id, action: "duplicate" } }),
    onSuccess: () => {
      toast.success(`Copy added (hidden until you show it)`);
      refresh();
    },
    onError: fail,
  });

  const move = useMutation({
    mutationFn: ({ index, dir }: { index: number; dir: -1 | 1 }) => {
      const item = items.data?.[index];
      if (!item) throw new Error("Item not found");
      return contentAction({
        data: { collection: def.key, id: item.id, action: dir === -1 ? "up" : "down" },
      });
    },
    onSuccess: refresh,
    onError: fail,
  });

  const filtered = useMemo(() => {
    const list = items.data ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list.map((item, index) => ({ item, index }));
    return list
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => Object.values(item.data).some((v) => v.toLowerCase().includes(q)));
  }, [items.data, search]);

  const emptyItem = (): Data =>
    Object.fromEntries(def.fields.map((f) => [f.name, f.type === "icon" ? "Sparkles" : ""]));

  const total = items.data?.length ?? 0;
  const visibleCount = items.data?.filter((i) => i.published).length ?? 0;
  const label = def.itemLabel.toLowerCase();
  const openNew = () => setEditing({ id: null, data: emptyItem(), published: true });
  const openEdit = (item: Item) =>
    setEditing({ id: item.id, data: { ...item.data }, published: item.published });

  return (
    <div className="space-y-6">
      <PageIntro
        title={def.label}
        description={def.description}
        actions={
          <button onClick={openNew} className="admin-primary-button gap-2">
            <Plus className="h-4 w-4" /> Add new {label}
          </button>
        }
      />

      {def.heading && (
        <div className="admin-tabs" role="tablist" aria-label={`${def.label} sections`}>
          <button
            role="tab"
            aria-selected={tab === "items"}
            className="admin-tab"
            data-active={tab === "items"}
            onClick={() => setTab("items")}
          >
            <List className="h-4 w-4" /> {def.label} list
            <span className="admin-tab-count">{total}</span>
          </button>
          <button
            role="tab"
            aria-selected={tab === "heading"}
            className="admin-tab"
            data-active={tab === "heading"}
            onClick={() => setTab("heading")}
          >
            <Heading className="h-4 w-4" /> Section heading
          </button>
        </div>
      )}

      {def.heading && tab === "heading" ? (
        <SettingsForm
          settingsKey={headingKey(def.key)}
          fields={def.heading.fields}
          defaults={def.heading.defaults}
          title="Section heading"
          description="The heading shown above this section on the website."
        />
      ) : (
        <section className="admin-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-[var(--admin-border)] p-4">
            <div className="mr-auto">
              <p className="text-sm font-semibold">
                {total} {label}
                {total === 1 ? "" : "s"}
              </p>
              <p className="text-xs text-[var(--admin-muted)]">
                {visibleCount} visible on website · {total - visibleCount} hidden
              </p>
            </div>
            {total > 3 && (
              <label className="relative w-full sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search…"
                  aria-label={`Search ${def.label.toLowerCase()}`}
                  className="admin-table-input"
                  style={{ paddingLeft: "2.25rem" }}
                />
              </label>
            )}
            <button onClick={openNew} className="admin-primary-button gap-2">
              <Plus className="h-4 w-4" /> Add {label}
            </button>
          </div>
          {items.isLoading ? (
            <div className="flex items-center gap-2 p-6 text-sm text-[var(--admin-muted)]">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : items.isError ? (
            <p className="p-6 text-sm text-destructive">Could not load items.</p>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-semibold">{search ? "No matches" : "Nothing here yet"}</p>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                {search
                  ? "Try a different search."
                  : `Add your first ${label} to show it on the website.`}
              </p>
              {!search && (
                <button onClick={openNew} className="admin-primary-button mt-4 gap-2">
                  <Plus className="h-4 w-4" /> Add {label}
                </button>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-[var(--admin-border)]">
              {filtered.map(({ item, index }) => {
                const image = def.imageField ? item.data[def.imageField] : "";
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center gap-3 p-3 md:p-4 xl:flex-nowrap"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex flex-col">
                        <button
                          className="admin-table-action h-6"
                          aria-label="Move up"
                          title="Move up"
                          disabled={index === 0 || move.isPending || Boolean(search)}
                          onClick={() => move.mutate({ index, dir: -1 })}
                        >
                          <ArrowUp />
                        </button>
                        <button
                          className="admin-table-action h-6"
                          aria-label="Move down"
                          title="Move down"
                          disabled={index === total - 1 || move.isPending || Boolean(search)}
                          onClick={() => move.mutate({ index, dir: 1 })}
                        >
                          <ArrowDown />
                        </button>
                      </div>
                      {def.imageField && (
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface-raised)]">
                          {image && (
                            <img src={image} alt="" className="h-full w-full object-cover" />
                          )}
                        </div>
                      )}
                      <button className="min-w-0 flex-1 text-left" onClick={() => openEdit(item)}>
                        <p className="truncate font-semibold">
                          {item.data[def.titleField] || "(untitled)"}
                        </p>
                        {def.subtitleField && (
                          <p className="truncate text-sm text-[var(--admin-muted)]">
                            {item.data[def.subtitleField]}
                          </p>
                        )}
                      </button>
                      <span
                        className={`admin-status ${item.published ? "admin-status-published" : "admin-status-draft"}`}
                      >
                        {item.published ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <div className="flex w-full shrink-0 flex-wrap items-center justify-end gap-1.5 xl:w-auto">
                      <button className="admin-row-button" onClick={() => openEdit(item)}>
                        <Pencil /> Edit
                      </button>
                      <button
                        className="admin-row-button"
                        onClick={() => toggle.mutate(item)}
                        disabled={toggle.isPending}
                      >
                        {item.published ? <EyeOff /> : <Eye />} {item.published ? "Hide" : "Show"}
                      </button>
                      <button
                        className="admin-row-button"
                        onClick={() => duplicate.mutate(item)}
                        disabled={duplicate.isPending}
                      >
                        <Copy /> Duplicate
                      </button>
                      <button
                        className="admin-row-button admin-row-button-danger"
                        onClick={() => setDeleting(item)}
                      >
                        <Trash2 /> Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      <Sheet open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <SheetContent className="admin-theme admin-sheet overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="text-[var(--admin-text)]">
              {editing?.id
                ? `Edit ${def.itemLabel.toLowerCase()}`
                : `Add ${def.itemLabel.toLowerCase()}`}
            </SheetTitle>
            <SheetDescription className="text-[var(--admin-muted)]">
              {def.description}
            </SheetDescription>
          </SheetHeader>
          {editing && (
            <form
              className="mt-6 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (!editing.data[def.titleField]?.trim()) {
                  toast.error(
                    `Please fill in "${def.fields.find((f) => f.name === def.titleField)?.label}"`,
                  );
                  return;
                }
                save.mutate(editing);
              }}
            >
              <FieldsForm
                single
                fields={def.fields}
                value={editing.data}
                onChange={(data) => setEditing((v) => (v ? { ...v, data } : v))}
              />
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) =>
                    setEditing((v) => (v ? { ...v, published: e.target.checked } : v))
                  }
                  className="h-4 w-4 accent-[var(--admin-teal)]"
                />
                Show on website
              </label>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={save.isPending}
                  className="admin-primary-button gap-2"
                >
                  {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing.id ? "Save changes" : `Add ${def.itemLabel.toLowerCase()}`}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="admin-secondary-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent className="admin-theme admin-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this {def.itemLabel.toLowerCase()}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[var(--admin-muted)]">
              “{deleting?.data[def.titleField]}” will be removed from the website. This can't be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="admin-secondary-button">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                if (deleting) remove.mutate(deleting);
              }}
            >
              {remove.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
