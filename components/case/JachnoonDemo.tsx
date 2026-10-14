"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { jachnoonNight } from "@/lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export default function JachnoonDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {jachnoonNight.map((step, i) => (
        <motion.figure
          key={step.time}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: i * 0.15, ease }}
          className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <div className="flex items-baseline justify-between px-5 pt-5">
            <span className="font-display text-5xl font-semibold tracking-tight" style={{ color: i === jachnoonNight.length - 1 ? "#f0a94a" : undefined }}>
              {step.time}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">0{i + 1}</span>
          </div>
          <figcaption className="px-5 pb-5 pt-1 text-sm text-white/60">{step.caption}</figcaption>
          <Image
            src={step.media.src}
            alt={step.media.alt}
            width={step.media.width}
            height={step.media.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="mt-auto block h-auto w-full"
          />
        </motion.figure>
      ))}
    </div>
  );
}
