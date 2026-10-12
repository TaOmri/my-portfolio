"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "./SplitText";
import { site } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/motion";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const orb = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-fade]", { opacity: 0, y: 20, duration: 1, delay: 0.7, stagger: 0.1, ease: "power3.out" });
      gsap.to("[data-hero-title]", {
        yPercent: 30,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    const ox = gsap.quickTo(orb.current, "x", { duration: 2, ease: "power3" });
    const oy = gsap.quickTo(orb.current, "y", { duration: 2, ease: "power3" });
    const move = (e: PointerEvent) => {
      ox((e.clientX / window.innerWidth - 0.5) * 200);
      oy((e.clientY / window.innerHeight - 0.5) * 200);
    };
    window.addEventListener("pointermove", move);
    return () => {
      ctx.revert();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pb-10 pt-32 md:px-10">
      <div
        ref={orb}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "conic-gradient(from 90deg, #8b5cf6, #22d3ee, #2bd67b, #f5c542, #8b5cf6)" }}
      />
      <div className="relative mx-auto w-full max-w-[1600px]">
        <p data-fade className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          {site.role} — Portfolio ’26
        </p>
        <h1 data-hero-title className="font-display text-[15vw] font-semibold leading-[0.88] tracking-[-0.05em] md:text-[11vw]">
          <SplitText text="Digital products" className="block" />
          <SplitText text="that move." className="block text-white/40" delay={0.15} />
        </h1>
        <div className="mt-10 flex flex-col justify-between gap-8 border-t border-line pt-6 md:flex-row md:items-end">
          <p data-fade className="max-w-md text-lg leading-relaxed text-white/70">{site.intro}</p>
          <div data-fade className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2bd67b] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2bd67b]" />
            </span>
            Available for new projects
            <span className="ml-6 hidden md:inline">Scroll ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
