"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Muted looping video that only plays while on screen. With reduced motion it stays on the poster. */
export default function LazyVideo({ src, poster, label, className, style }: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className={className} style={style} />
  );
}
