"use client";

import { motion } from "framer-motion";

const table = [
  { team: "Mexico", pts: 7, gd: "+3", state: "q" },
  { team: "South Korea", pts: 6, gd: "+2", state: "q" },
  { team: "Czechia", pts: 4, gd: "0", state: "third" },
  { team: "South Africa", pts: 0, gd: "−5", state: "out" },
];

const rowColor = { q: "#4ade80", third: "#f5c542", out: "rgba(255,255,255,0.25)" } as const;

const bracket = [
  { code: "1A", vs: "3 · Annex C" },
  { code: "W73", vs: "W75" },
  { code: "W89", vs: "W90" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Step({ i, label, children }: { i: number; label: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, delay: i * 0.2, ease }}
      className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-white/50">
        <span>0{i + 1}</span>
        <span>{label}</span>
      </div>
      {children}
    </motion.div>
  );
}

export default function MondialDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Step i={0} label="Enter a score">
        <div className="my-auto flex items-center justify-center gap-4 py-10 font-display text-6xl font-semibold">
          <span className="text-base text-white/60">MEX</span>
          2<span className="text-white/25">–</span>0
          <span className="text-base text-white/60">RSA</span>
        </div>
        <p className="text-center text-sm text-white/50">Group A · Mexico City</p>
      </Step>

      <Step i={1} label="Table updates">
        <ul className="mt-6 space-y-1.5">
          {table.map((r, idx) => (
            <li key={r.team} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2 text-sm">
              <span className="h-5 w-1 rounded-full" style={{ background: rowColor[r.state as keyof typeof rowColor] }} />
              <span className="w-4 font-mono text-white/40">{idx + 1}</span>
              <span className="flex-1">{r.team}</span>
              <span className="w-8 text-right font-mono text-white/50">{r.gd}</span>
              <span className="w-6 text-right font-mono font-semibold">{r.pts}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] text-white/45">Pts → GD → GF → head‑to‑head</p>
      </Step>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
        className="flex flex-col rounded-2xl p-6 text-black"
        style={{ background: "linear-gradient(135deg, #5b8cff, #f5c542)" }}
      >
        <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-black/60">
          <span>03</span>
          <span>Bracket resolves</span>
        </div>
        <div className="mt-5 font-display text-7xl font-bold tracking-tighter">495</div>
        <p className="text-sm text-black/70">Annex C combinations, resolved with one lookup.</p>
        <ul className="mt-auto space-y-1.5 pt-6 font-mono text-sm">
          {bracket.map((b) => (
            <li key={b.code} className="flex justify-between border-t border-black/15 pt-1.5">
              <span className="font-semibold">{b.code}</span>
              <span className="text-black/50">vs</span>
              <span className="font-semibold">{b.vs}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
