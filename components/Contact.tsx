import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden px-4 pb-8 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Contact</span>
          <h2 className="mt-6 font-display text-[16vw] font-semibold leading-[0.85] tracking-[-0.05em] md:text-[10vw]">
            Let’s build<br />
            <span className="text-white/40">something.</span>
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-4 rounded-full bg-fg px-8 py-5 text-lg font-medium text-bg transition-colors hover:bg-[#c8ff4d] md:text-2xl"
            >
              {site.email} <span aria-hidden>↗</span>
            </a>
          </Magnetic>
          <ul className="flex gap-6">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-white/70 underline-offset-4 hover:text-white hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-24 flex justify-between border-t border-line pt-6 font-mono text-xs uppercase tracking-widest text-muted">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Designed & built by me</span>
        </div>
      </div>
    </footer>
  );
}
