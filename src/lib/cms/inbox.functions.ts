import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { contactInput, recordId, subscriberInput } from "./inputs";

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(contactInput)
  .handler(async ({ data }) => (await import("./inbox.server")).submitContact(data));
export const subscribe = createServerFn({ method: "POST" })
  .validator(subscriberInput)
  .handler(async ({ data }) => (await import("./inbox.server")).submitSubscriber(data.email));
export const listMessages = createServerFn({ method: "GET" })
  .validator(z.object({ unread: z.boolean() }))
  .handler(async ({ data }) => (await import("./inbox.server")).listMessages(data.unread));
export const unreadMessageCount = createServerFn({ method: "GET" }).handler(async () =>
  (await import("./inbox.server")).unreadMessageCount(),
);
export const updateMessage = createServerFn({ method: "POST" })
  .validator(z.object({ id: recordId, is_read: z.boolean() }))
  .handler(async ({ data }) => (await import("./inbox.server")).updateMessage(data));
export const deleteMessage = createServerFn({ method: "POST" })
  .validator(z.object({ id: recordId }))
  .handler(async ({ data }) => (await import("./inbox.server")).deleteMessage(data.id));
export const listSubscribers = createServerFn({ method: "GET" }).handler(async () =>
  (await import("./inbox.server")).listSubscribers(),
);
export const deleteSubscriber = createServerFn({ method: "POST" })
  .validator(z.object({ id: recordId }))
  .handler(async ({ data }) => (await import("./inbox.server")).deleteSubscriber(data.id));
