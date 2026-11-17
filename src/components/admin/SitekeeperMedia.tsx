import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, ImageUp, Loader2, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/admin/fields";
import { listMedia, deleteMedia } from "@/lib/cms/media.functions";
import { mediaUrl, uploadMedia } from "@/lib/media";

export function MediaPage() {
  const queryClient = useQueryClient();
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const files = useQuery({
    queryKey: ["admin", "media"],
    queryFn: () => listMedia(),
  });
  const refresh = () => void queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
  const remove = useMutation({
    mutationFn: (name: string) => deleteMedia({ data: { name } }),
    onSuccess: () => {
      toast.success("Image deleted");
      refresh();
    },
    onError: () => toast.error("Could not delete image"),
  });
  const upload = async (list: FileList | null) => {
    const picked = Array.from(list ?? []);
    if (!picked.length) return;
    setUploading(picked.length);
    for (const file of picked) {
      try {
        await uploadMedia(file);
      } catch (error) {
        toast.error(`${file.name}: ${error instanceof Error ? error.message : "upload failed"}`);
      }
      setUploading((n) => n - 1);
    }
    toast.success("Upload finished");
    refresh();
    if (input.current) input.current.value = "";
  };
  const copy = async (name: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}${mediaUrl(name)}`);
    toast.success("Image link copied");
  };
  return (
    <div className="space-y-6">
      <PageIntro
        title="Media Library"
        description="All images you've uploaded. Use “Copy link” to paste an image anywhere in the admin."
        actions={
          <>
            <button
              onClick={() => input.current?.click()}
              disabled={uploading > 0}
              className="admin-primary-button gap-2"
            >
              {uploading > 0 ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImageUp className="h-4 w-4" />
              )}
              {uploading > 0 ? `Uploading ${uploading}…` : "Upload images"}
            </button>
            <input
              ref={input}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => void upload(e.target.files)}
            />
          </>
        }
      />
      {files.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-[var(--admin-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : (files.data ?? []).length === 0 ? (
        <div className="admin-card p-10 text-center text-sm text-[var(--admin-muted)]">
          No images uploaded yet. Images you upload in any section also appear here.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {files.data!.map((f) => (
            <figure key={f.name} className="admin-card overflow-hidden">
              <img
                src={mediaUrl(f.name)}
                alt={f.name}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="flex items-center justify-between gap-1 p-2">
                <span className="truncate text-xs text-[var(--admin-muted)]" title={f.name}>
                  {f.name.replace(/^\d+-[a-f0-9]+-/, "")}
                </span>
                <span className="flex shrink-0">
                  <button
                    className="admin-table-action"
                    aria-label="Copy link"
                    title="Copy link"
                    onClick={() => void copy(f.name)}
                  >
                    <Copy />
                  </button>
                  <button
                    className="admin-table-action"
                    aria-label="Delete image"
                    title="Delete"
                    onClick={() =>
                      confirm("Delete this image? Sections using it will show no image.") &&
                      remove.mutate(f.name)
                    }
                  >
                    <Trash2 />
                  </button>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
