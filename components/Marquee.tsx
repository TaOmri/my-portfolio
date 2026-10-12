import { site } from "@/lib/site";

export default function Marquee() {
  const items = [...site.skills, ...site.skills];
  return (
    <div className="overflow-hidden border-y border-line py-6" aria-label="Skills">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-4xl font-medium tracking-tight md:text-6xl">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-10" aria-hidden={i >= site.skills.length}>
            {s}
            <span className="text-2xl text-white/25">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
