import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/lib/projects";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import MediaView from "@/components/visuals/MediaView";
import MondialDemo from "@/components/case/MondialDemo";
import DebutDemo from "@/components/case/DebutDemo";
import Contact from "@/components/Contact";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs uppercase tracking-widest text-muted">{children}</span>;
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const hero = project.cover;

  return (
    <main style={{ "--accent": project.accent } as React.CSSProperties}>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 pb-16 pt-36 md:px-10 md:pt-44"
        style={{ background: `radial-gradient(ellipse at 80% 0%, ${project.accent}40, transparent 60%), radial-gradient(ellipse at 0% 60%, ${project.accent2}25, transparent 50%)` }}
      >
        <div className="mx-auto max-w-[1600px]">
          <Link href="/#work" className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white">← All work</Link>
          <h1 className="mt-8 font-display text-[22vw] font-semibold leading-[0.82] tracking-[-0.06em] md:text-[14vw]">
            <SplitText text={project.title} />
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/75 md:text-2xl">{project.tagline}</p>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
            {[
              ["Year", project.year],
              ...(project.status ? [["Status", project.status]] : []),
              ["Role", project.role],
              ["Platforms", project.platforms.join(", ")],
              ["Stack", project.stack.slice(0, 3).join(", ")],
            ].map(([k, v]) => (
              <div key={k}>
                <dt><Label>{k}</Label></dt>
                <dd className="mt-2 text-sm text-white/85">{v}</dd>
              </div>
            ))}
          </dl>
          {project.link && (
            <a href={project.link.href} target="_blank" rel="noreferrer" className="mt-10 inline-flex rounded-full px-6 py-3 font-medium text-black" style={{ background: project.accent }}>
              {project.link.label} ↗
            </a>
          )}
        </div>
      </section>

      {/* Hero media */}
      <section className="px-4 md:px-10">
        <Reveal className="mx-auto max-w-[1300px]">
          <MediaView media={hero} project={project} sizes="100vw" />
        </Reveal>
      </section>

      {/* Overview */}
      <section className="px-4 py-28 md:px-10 md:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal><Label>Overview</Label></Reveal>
          <div className="space-y-14">
            <Reveal>
              <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">{project.summary}</p>
            </Reveal>
            <Reveal className="grid gap-10 md:grid-cols-2">
              <div>
                <Label>The problem</Label>
                <p className="mt-3 text-lg leading-relaxed text-white/70">{project.problem}</p>
              </div>
              <div>
                <Label>The solution</Label>
                <p className="mt-3 text-lg leading-relaxed text-white/70">{project.solution}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlight */}
      <section className="border-y border-line bg-bg-2 px-4 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-14 max-w-3xl">
            <Label>{project.slug === "debut" ? "How it works" : "How it plays"}</Label>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              {project.slug === "debut" ? "Every drill, tracked in real time." : "Type a score. Watch the tournament build itself."}
            </h2>
          </Reveal>
          {project.slug === "debut" ? <DebutDemo platforms={project.platforms} /> : <MondialDemo />}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <Reveal><Label>Key features</Label></Reveal>
          <Reveal as="ul" className="mt-10 divide-y divide-line border-y border-line">
            {project.features.map((f, i) => (
              <li key={f.title} className="group grid gap-2 py-8 md:grid-cols-[80px_1fr_1fr] md:items-baseline">
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                <h3 className="font-display text-2xl font-semibold transition-colors group-hover:text-accent md:text-4xl">{f.title}</h3>
                <p className="text-white/60 md:text-lg">{f.body}</p>
              </li>
            ))}
          </Reveal>
          <Reveal className={`mt-20 grid gap-6 sm:grid-cols-2 ${project.stats.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {project.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line p-8">
                <div className="font-display text-5xl font-semibold tracking-tight md:text-6xl" style={{ color: project.accent }}>{s.value}</div>
                <div className="mt-2 text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Engineering notes */}
      {project.engineering && (
        <section className="border-y border-line bg-bg-2 px-4 py-28 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <Label>Engineering notes</Label>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Hard problems, solved.</h2>
            </Reveal>
            <Reveal as="ul" className="divide-y divide-line border-y border-line">
              {project.engineering.map((e, i) => (
                <li key={e.title} className="grid gap-3 py-8 md:grid-cols-[60px_1fr]">
                  <span className="font-mono text-sm" style={{ color: project.accent }}>0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{e.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/65 md:text-lg">{e.body}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Stack */}
      <section className="px-4 pt-28 md:px-10">
        <Reveal className="mx-auto flex max-w-[1600px] flex-wrap gap-3">
          {project.stack.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-5 py-2.5 text-sm">{t}</span>
          ))}
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="px-4 py-28 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal><Label>Gallery</Label></Reveal>
          <Reveal className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {project.gallery.map((m, i) => (
              <figure key={i}>
                <MediaView media={m} project={project} />
                <figcaption className="mt-3 font-mono text-xs text-muted">{m.alt}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      <section className="px-4 md:px-10">
        <Link
          href={`/work/${next.slug}`}
          data-cursor="Next"
          className="group mx-auto block max-w-[1600px] overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 md:px-12 md:py-24"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${next.accent}55, transparent 60%), #111113` }}
        >
          <Label>Next project</Label>
          <div className="mt-4 flex items-end justify-between gap-6">
            <span className="font-display text-[16vw] font-semibold leading-[0.85] tracking-[-0.05em] transition-transform duration-700 group-hover:translate-x-4 md:text-[9vw]">
              {next.title}
            </span>
            <span className="mb-4 grid h-16 w-16 shrink-0 place-items-center rounded-full text-2xl text-black transition-transform duration-500 group-hover:rotate-[-45deg] md:h-24 md:w-24" style={{ background: next.accent }}>→</span>
          </div>
        </Link>
      </section>

      <Contact />
    </main>
  );
}
