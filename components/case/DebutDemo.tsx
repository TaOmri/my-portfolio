"use client";

import { motion } from "framer-motion";
import { debutDrillNames, debutDrills } from "@/lib/projects";
import { TabletFrame } from "../visuals/Frames";
import LazyVideo from "../visuals/LazyVideo";

const pipeline = [
  { title: "Camera", body: "Native iOS camera channel, paced at 45 ms per frame to stay cool for a whole drill." },
  { title: "Detection", body: "D‑FINE‑N on CoreML, 640×640, on‑device — ball, cone, foot, goal post, ground and player." },
  { title: "Tracking", body: "A ball stabilizer and Apple Vision body pose turn raw detections into a clean game state." },
  { title: "Scoring & AR", body: "Reps + combo bonuses − penalties, scored live, with targets and fireballs drawn on the feed." },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function DebutDemo({ platforms }: { platforms: string[] }) {
  return (
    <div>
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {pipeline.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.12, ease }}
            className="bg-bg-2 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#4ade80] font-mono text-xs font-semibold text-black">{i + 1}</span>
              {i < pipeline.length - 1 && <span className="h-px flex-1 bg-gradient-to-r from-[#4ade80]/60 to-transparent" />}
            </div>
            <h4 className="mt-5 font-display text-xl font-semibold">{p.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-white/60">{p.body}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {debutDrills.map((d, i) => (
          <motion.figure
            key={d.src}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: (i % 2) * 0.12, ease }}
          >
            <TabletFrame>
              <LazyVideo src={d.src} poster={d.poster} label={`${d.alt} drill`} className="block h-auto w-full" style={{ aspectRatio: `${d.width} / ${d.height}` }} />
            </TabletFrame>
            <figcaption className="mt-3 flex justify-between font-mono text-xs uppercase tracking-widest text-muted">
              <span>{d.alt}</span>
              <span>0{i + 1}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mt-16">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">{debutDrillNames.length} drills live</span>
        <ul className="mt-4 flex flex-wrap gap-2">
          {debutDrillNames.map((d) => (
            <li key={d} className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/75">{d}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {platforms.map((p) => (
          <span key={p} className="rounded-full bg-gradient-to-r from-[#4ade80] to-[#f97316] p-px">
            <span className="block rounded-full bg-bg-2 px-5 py-2 text-sm font-medium">{p}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
