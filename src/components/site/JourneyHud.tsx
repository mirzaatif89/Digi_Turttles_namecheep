import { memo, useEffect, useRef, useState } from "react";
import { scrollState } from "@/scene/scrollState";
import { chapterAt } from "@/scene/story";

const CHAPTERS = ["Egg", "Hatch", "Crawl", "Dive", "Ocean"];

/** Side indicator that follows the turtle's journey. */
export const JourneyHud = memo(function JourneyHud() {
  const [chapter, setChapter] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    let last = -1;
    let visible = !document.hidden;
    const tick = () => {
      raf = 0;
      if (!visible) return;
      const p = scrollState.target;
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      const c = chapterAt(p);
      if (c !== last) {
        last = c;
        setChapter(c);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return (
    <aside
      aria-label="Turtle journey"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="glass-pill relative flex flex-col gap-5 rounded-full px-3 py-5">
        <div className="absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-border" />
        <div
          ref={bar}
          className="absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px origin-top -translate-x-1/2 bg-primary"
          style={{ transform: "scaleY(0)" }}
        />
        {CHAPTERS.map((c, i) => (
          <div key={c} className="relative flex items-center justify-center">
            <span
              className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${i <= chapter ? "scale-125 bg-primary shadow-[var(--shadow-glow)]" : "bg-muted"}`}
            />
            <span
              className={`absolute right-7 whitespace-nowrap text-xs font-semibold tracking-wider transition-opacity duration-500 ${i === chapter ? "text-primary-glow opacity-100" : "opacity-0"}`}
            >
              {c}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
});
