"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Masked word-by-word reveal on mount. */
export default function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-word]", { yPercent: 110, rotate: 4, duration: 1.2, ease: "expo.out", stagger: 0.06, delay });
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-word className="inline-block">
            {w}
            {" "}
          </span>
        </span>
      ))}
    </span>
  );
}
