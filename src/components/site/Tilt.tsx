import { memo, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Glass card that tilts in 3D toward the pointer with a moving sheen. */
export const Tilt = memo(function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let pointer: PointerEvent | undefined;
    const apply = () => {
      frame = 0;
      const event = pointer;
      if (!event) return;
      const r = el.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width;
      const y = (event.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateZ(0)`;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      pointer = undefined;
      cancelAnimationFrame(frame);
      frame = 0;
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);
  return (
    <div ref={ref} className={cn("glass tilt", className)}>
      {children}
    </div>
  );
});
