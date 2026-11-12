import { useEffect, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { type z } from "zod";
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function EntityFormSheet<T extends FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  schema,
  defaultValues,
  resetKey,
  submitLabel,
  onSubmit,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  schema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  resetKey: string;
  submitLabel: string;
  onSubmit: (values: T) => Promise<void>;
  children: (form: UseFormReturn<T>) => ReactNode;
}) {
  const form = useForm<T>({
    resolver: zodResolver(schema) as Resolver<T>,
    defaultValues,
  });
  const [discardOpen, setDiscardOpen] = useState(false);

  useEffect(() => {
    if (open) form.reset(defaultValues);
  }, [defaultValues, form, open, resetKey]);

  const requestClose = (nextOpen: boolean) => {
    if (nextOpen || !form.formState.isDirty || form.formState.isSubmitting) {
      onOpenChange(nextOpen);
      return;
    }
    setDiscardOpen(true);
  };

  const submit = form.handleSubmit(async (values) => {
    await onSubmit(values);
    form.reset(values);
    onOpenChange(false);
  });

  return (
    <>
      <Sheet open={open} onOpenChange={requestClose}>
        <SheetContent side="right" className="admin-sheet overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <form className="mt-6 space-y-5" onSubmit={submit} noValidate>
            {children(form)}
            <SheetFooter className="mt-8">
              <button
                type="button"
                onClick={() => requestClose(false)}
                className="admin-secondary-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="admin-primary-button"
              >
                {form.formState.isSubmitting ? "Saving…" : submitLabel}
              </button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <AlertDialogContent className="admin-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>Your edits have not been saved yet.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                form.reset(defaultValues);
                setDiscardOpen(false);
                onOpenChange(false);
              }}
            >
              Discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
