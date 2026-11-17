import { ImageUp, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { serviceIcon } from "@/components/site/icons";
import { ICON_NAMES, type Data, type Field } from "@/lib/cms/schema";
import { uploadMedia } from "@/lib/media";
import { cn } from "@/lib/utils";

export function ImageInput({ value, onChange }: { value: string; onChange(v: string): void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadMedia(file));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="relative grid h-28 w-36 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-raised)]">
        {value ? (
          <>
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Remove image"
              className="admin-icon-button absolute right-1 top-1 h-7 w-7 bg-[var(--admin-surface)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <span className="text-xs text-[var(--admin-muted)]">No image</span>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
          className="admin-secondary-button gap-2"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
          {busy ? "Uploading…" : "Upload image"}
        </button>
        <input
          ref={input}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void pick(e.target.files?.[0])}
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image link"
          className="admin-table-input"
        />
      </div>
    </div>
  );
}

export function IconInput({ value, onChange }: { value: string; onChange(v: string): void }) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {ICON_NAMES.map((name) => {
        const Icon = serviceIcon(name);
        return (
          <button
            key={name}
            type="button"
            title={name}
            aria-label={name}
            onClick={() => onChange(name)}
            className={cn("admin-icon-picker", value === name && "admin-icon-picker-active")}
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange(v: string): void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={field.placeholder}
          className="admin-table-input py-2"
        />
      );
    case "image":
      return <ImageInput value={value} onChange={onChange} />;
    case "icon":
      return <IconInput value={value} onChange={onChange} />;
    default:
      return (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="admin-table-input"
        />
      );
  }
}

export function FieldsForm({
  fields,
  value,
  onChange,
  single = false,
}: {
  fields: Field[];
  value: Data;
  onChange(next: Data): void;
  single?: boolean;
}) {
  return (
    <div className={cn("grid gap-5", !single && "md:grid-cols-2")}>
      {fields.map((field) => {
        const Wrapper = field.type === "image" || field.type === "icon" ? "div" : "label";
        return (
          <Wrapper
            key={field.name}
            className={cn(
              "block space-y-1.5",
              (field.type === "textarea" || field.type === "image" || field.type === "icon") &&
                "md:col-span-2",
            )}
          >
            <span className="admin-form-label">{field.label}</span>
            <FieldInput
              field={field}
              value={value[field.name] ?? ""}
              onChange={(v) => onChange({ ...value, [field.name]: v })}
            />
            {field.help && (
              <span className="block text-xs text-[var(--admin-muted)]">{field.help}</span>
            )}
          </Wrapper>
        );
      })}
    </div>
  );
}

export function PageIntro({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="admin-eyebrow">Admin</p>
        <h2 className="mt-1 font-display text-2xl font-bold">{title}</h2>
        {description && <p className="mt-1 text-sm text-[var(--admin-muted)]">{description}</p>}
      </div>
      {actions}
    </div>
  );
}
