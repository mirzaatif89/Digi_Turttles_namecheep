import type { Data } from "./schema";

export type ContentItem = { id: string; data: Data; sort_order: number; published: boolean };
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
export type Subscriber = { id: string; email: string; created_at: string };
export type MediaFile = {
  name: string;
  originalName: string;
  type: string;
  size: number;
  created_at: string;
};
export type CmsStore = {
  version: 1;
  settings: Record<string, Data>;
  items: Record<string, ContentItem[]>;
  messages: ContactMessage[];
  subscribers: Subscriber[];
  media: MediaFile[];
  submissions: Array<{ key: string; at: number }>;
};
