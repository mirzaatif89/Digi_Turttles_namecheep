import { describe, expect, it } from "vitest";
import { emptyDashboardSnapshot } from "./dashboard.types";
import { effectivePermissions } from "./permissions";
import { filterDashboardSnapshot, relativeTime, smartSummary } from "./dashboard.utils";

describe("dashboard data shaping", () => {
  it("builds safe defaults for unavailable modules", () => {
    const snapshot = emptyDashboardSnapshot(["services", "blog"]);

    expect(snapshot.stats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ module: "services", value: 0, available: false }),
        expect.objectContaining({ module: "blog", value: 0, available: false }),
      ]),
    );
    expect(snapshot.system.database).toBe("unavailable");
    expect(snapshot.inbox).toEqual([]);
  });

  it("removes widgets a role cannot view", () => {
    const viewer = effectivePermissions("viewer", { messages: { view: false } });
    const snapshot = emptyDashboardSnapshot(["services", "messages"]);
    snapshot.inbox.push({
      id: "message-1",
      type: "message",
      title: "A message",
      detail: "Details",
      unread: true,
      createdAt: "2026-11-12T10:00:00.000Z",
    });
    const filtered = filterDashboardSnapshot(snapshot, viewer);
    expect(filtered.stats.map((item) => item.module)).toEqual(["services"]);
    expect(filtered.inbox).toEqual([]);
  });

  it("creates a concise real-data summary", () => {
    const snapshot = emptyDashboardSnapshot(["services", "messages"]);
    snapshot.stats.find((item) => item.module === "messages")!.value = 2;
    snapshot.contentHealth.find((item) => item.module === "services")!.published = 3;
    snapshot.contentHealth.find((item) => item.module === "services")!.drafts = 1;

    expect(smartSummary(snapshot)).toBe("2 new messages, 1 draft, 3 services published");
  });
});

describe("relativeTime", () => {
  const now = new Date("2026-11-12T12:00:00.000Z");

  it("formats recent values accessibly", () => {
    expect(relativeTime("2026-11-12T11:55:00.000Z", now)).toBe("5 min ago");
    expect(relativeTime("2026-11-12T10:00:00.000Z", now)).toBe("2 hr ago");
    expect(relativeTime("2026-11-09T12:00:00.000Z", now)).toBe("3 days ago");
  });
});
