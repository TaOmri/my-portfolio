"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Fades children up as they scroll into view. Direct children animate in sequence. */
export default function Reveal({
  children,
  className,
  stagger = 0.08,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "section" | "ul";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(el.children, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger]);

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
