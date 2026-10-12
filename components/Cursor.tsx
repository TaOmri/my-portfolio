"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** Dot + ring cursor. Elements with data-cursor="Label" grow the ring and show the label. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      if (wrap.current) wrap.current.style.opacity = "1";
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      const text = t?.dataset.cursor ?? "";
      setLabel(text);
      gsap.to(ring.current, { scale: text ? 3.2 : t ? 1.6 : 1, duration: 0.4, ease: "power3" });
      gsap.to(dot.current, { scale: text ? 0 : 1, duration: 0.3 });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className={enabled ? "" : "hidden"} style={{ opacity: 0 }}>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[70] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 mix-blend-difference">
        <span className="font-mono text-[4px] uppercase tracking-widest text-white">{label}</span>
      </div>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[70] -ml-1 -mt-1 h-2 w-2 rounded-full bg-white mix-blend-difference" />
    </div>
  );
}
