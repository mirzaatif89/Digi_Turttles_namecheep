import { mapScroll, normalizeAnchors, type Anchor } from "./story";

/** Shared, non-React state the 3D scene and HUD read every frame. */
export const scrollState = { target: 0, pointerX: 0, pointerY: 0 };

let anchors: Anchor[] = [];

function measure() {
  const vh = window.innerHeight;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  const list: Anchor[] = [{ y: 0, p: 0 }];
  document.querySelectorAll<HTMLElement>("[data-story]").forEach((el) => {
    const r = el.getBoundingClientRect();
    const y = r.top + window.scrollY + r.height / 2 - vh / 2;
    const p = Number.parseFloat(el.dataset["story"] ?? "");
    if (Number.isFinite(p)) list.push({ y: Math.min(Math.max(1, y), max - 1), p });
  });
  list.push({ y: max, p: 1 });
  anchors = normalizeAnchors(list);
}

function update() {
  scrollState.target = mapScroll(window.scrollY, anchors);
}

/** Starts listening to scroll/pointer. Returns a cleanup function. */
export function startScrollStory(): () => void {
  measure();
  update();
  const onScroll = () => update();
  const onResize = () => {
    measure();
    update();
  };
  const onPointer = (e: PointerEvent) => {
    scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    scrollState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointer, { passive: true });
  const ro = new ResizeObserver(onResize);
  ro.observe(document.body);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointer);
    ro.disconnect();
  };
}
