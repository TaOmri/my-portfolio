"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Projects stack on top of each other as you scroll; the one underneath recedes. */
export default function WorkList() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.firstElementChild, {
          scale: 0.9,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="px-4 md:px-10">
      <div className="mx-auto flex max-w-[1600px] items-end justify-between border-b border-line pb-6 pt-24">
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Selected work</h2>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">({String(projects.length).padStart(2, "0")})</span>
      </div>
      <div ref={root} className="mx-auto max-w-[1600px]">
        {projects.map((p, i) => (
          <div key={p.slug} data-stack-card className="sticky top-0 flex h-[100svh] items-center py-6 md:py-10" style={{ paddingTop: `calc(4.5rem + ${i * 12}px)` }}>
            <div className="h-full w-full origin-top">
              <ProjectCard project={p} index={i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
