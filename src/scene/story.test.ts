import { describe, expect, it } from "vitest";
import { ANCHOR, EGG_X, STAGE, WALK_END_X, groundHeight, mapScroll, normalizeAnchors, storyAt } from "./story";

describe("turtle story timeline", () => {
  it("keeps the egg whole and the turtle hidden before scrolling", () => {
    const s = storyAt(0, 0);
    expect(s.crack).toBe(0);
    expect(s.shellOpen).toBe(0);
    expect(s.turtleVisible).toBe(false);
  });

  it("breaks the egg open before the turtle climbs out", () => {
    expect(storyAt(STAGE.breakEnd, 0).shellOpen).toBe(1);
    expect(storyAt(STAGE.headEnd, 0).turtle.x).toBeCloseTo(EGG_X);
    expect(storyAt(STAGE.climbEnd, 0).turtle.x).toBeGreaterThan(EGG_X + 1);
  });

  it("walks on the sand surface toward the sea", () => {
    const a = storyAt(0.3, 0);
    const b = storyAt(0.4, 0);
    expect(b.turtle.x).toBeGreaterThan(a.turtle.x);
    expect(a.turtle.y).toBeGreaterThan(groundHeight(a.turtle.x, a.turtle.z));
    expect(a.turtle.y - groundHeight(a.turtle.x, a.turtle.z)).toBeLessThan(0.2);
    expect(a.swim).toBe(0);
  });

  it("reaches the water line at the end of the walk", () => {
    const s = storyAt(STAGE.walkEnd, 0);
    expect(s.turtle.x).toBeCloseTo(WALK_END_X);
    expect(Math.abs(groundHeight(WALK_END_X, s.turtle.z))).toBeLessThan(0.2);
  });

  it("is fully underwater and swimming after the dive", () => {
    const s = storyAt(0.7, 0);
    expect(s.swim).toBe(1);
    expect(s.turtle.y).toBeLessThan(-1.5);
    expect(s.camPos.y).toBeLessThan(0);
    expect(s.turtle.y).toBeGreaterThan(groundHeight(s.turtle.x, s.turtle.z) + 0.5);
  });

  it("orders chapters egg → hatch → crawl → dive → ocean", () => {
    expect([0, ANCHOR.hatch, ANCHOR.walk, ANCHOR.dive, 0.9].map((p) => storyAt(p, 0).chapter)).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("scroll mapping", () => {
  const anchors = normalizeAnchors([
    { y: 0, p: 0 },
    { y: 1000, p: 0.2 },
    { y: 3000, p: 1 },
  ]);
  it("interpolates between section anchors", () => {
    expect(mapScroll(500, anchors)).toBeCloseTo(0.1);
    expect(mapScroll(2000, anchors)).toBeCloseTo(0.6);
    expect(mapScroll(9999, anchors)).toBe(1);
  });
});
