import { createHash } from "node:crypto";
import { getRequestIP } from "@tanstack/react-start/server";
import { requirePermission } from "@/lib/permissions.server";
import { readStore, updateStore } from "./store.server";
import type { CmsStore } from "./types";

function submissionLimit(store: CmsStore, kind: string, email: string) {
  const now = Date.now();
  const key = createHash("sha256")
    .update(`${kind}:${getRequestIP() ?? email}`)
    .digest("hex");
  store.submissions = store.submissions.filter((entry) => entry.at > now - 15 * 60_000);
  if (
    store.submissions.filter((entry) => entry.key === key).length >= 10 ||
    store.submissions.length >= 1000
  )
    throw new Error("Too many submissions. Please try again later.");
  store.submissions.push({ key, at: now });
}

export async function submitContact(input: {
  name: string;
  email: string;
  phone?: string | undefined;
  message: string;
}) {
  await updateStore((store) => {
    submissionLimit(store, "contact", input.email);
    store.messages.unshift({
      ...input,
      phone: input.phone || null,
      id: crypto.randomUUID(),
      is_read: false,
      created_at: new Date().toISOString(),
    });
  });
  return { ok: true };
}

export async function submitSubscriber(email: string) {
  await updateStore((store) => {
    submissionLimit(store, "subscriber", email);
    if (!store.subscribers.some((subscriber) => subscriber.email === email))
      store.subscribers.unshift({
        id: crypto.randomUUID(),
        email,
        created_at: new Date().toISOString(),
      });
  });
  return { ok: true };
}

export async function listMessages(unread: boolean) {
  await requirePermission("messages", "view");
  return (await readStore()).messages.filter((message) => !unread || !message.is_read);
}
export async function unreadMessageCount() {
  await requirePermission("messages", "view");
  return (await readStore()).messages.filter((message) => !message.is_read).length;
}
export async function updateMessage(input: { id: string; is_read: boolean }) {
  await requirePermission("messages", "edit");
  await updateStore((store) => {
    const message = store.messages.find((message) => message.id === input.id);
    if (!message) throw new Error("Message not found.");
    message.is_read = input.is_read;
  });
  return { ok: true };
}
export async function deleteMessage(id: string) {
  await requirePermission("messages", "delete");
  await updateStore((store) => {
    store.messages = store.messages.filter((message) => message.id !== id);
  });
  return { ok: true };
}
export async function listSubscribers() {
  await requirePermission("subscribers", "view");
  return (await readStore()).subscribers;
}
export async function deleteSubscriber(id: string) {
  await requirePermission("subscribers", "delete");
  await updateStore((store) => {
    store.subscribers = store.subscribers.filter((subscriber) => subscriber.id !== id);
  });
  return { ok: true };
}
