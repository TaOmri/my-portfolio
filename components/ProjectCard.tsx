import Link from "next/link";
import type { Project } from "@/lib/projects";
import MediaView from "./visuals/MediaView";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className="group relative grid h-full w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[2rem] border border-white/10 md:grid-cols-[1fr_1.1fr] md:grid-rows-1"
      style={{
        background: `radial-gradient(ellipse at 100% 0%, ${project.accent}55, transparent 55%), radial-gradient(ellipse at 0% 100%, ${project.accent2}33, transparent 50%), #111113`,
      }}
    >
      <div className="relative z-10 flex flex-col justify-between gap-6 p-6 md:p-12">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-white/60">
          <span>{String(index + 1).padStart(2, "0")} / Case study</span>
          <span>{project.year}</span>
        </div>
        <div>
          <h3 className="font-display text-[18vw] font-semibold leading-[0.85] tracking-[-0.05em] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 md:text-[8vw]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md text-base text-white/70 md:text-lg">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.platforms.concat(project.stack.slice(0, 2)).map((t) => (
              <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{t}</span>
            ))}
          </div>
        </div>
        <span className="hidden items-center gap-3 text-sm font-medium md:inline-flex">
          <span className="grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[-45deg]" style={{ background: project.accent, color: "#000" }}>→</span>
          View case study
        </span>
      </div>
      <div className="relative flex min-h-0 items-center justify-center overflow-hidden p-6 pt-0 md:h-full md:p-8">
        <div className="w-full max-w-[720px] transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]">
          <MediaView media={project.cover} project={project} />
        </div>
      </div>
    </Link>
  );
}
