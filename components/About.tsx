import Reveal from "./Reveal";

const services = [
  { n: "01", title: "Product design", body: "Flows, interaction and polished UI — designed around how people actually use the product." },
  { n: "02", title: "Mobile apps", body: "Flutter apps for iPhone and iPad, dropping into native Swift where performance counts." },
  { n: "03", title: "On‑device AI", body: "Real‑time object detection on CoreML, tuned for accuracy, speed and thermals." },
  { n: "04", title: "Backend & web", body: "APIs, databases and storage with FastAPI and PostgreSQL — plus interactive web apps." },
];

export default function About() {
  return (
    <section id="about" className="px-4 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">About</span>
        </Reveal>
        <div>
          <Reveal>
            <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
              I sit where design meets engineering — turning ideas into products people actually enjoy using,
              <span className="text-white/40"> from pixel‑perfect interfaces to models running in real time.</span>
            </p>
          </Reveal>
          <Reveal as="ul" className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.n} className="bg-bg p-6 md:p-8">
                <span className="font-mono text-xs text-muted">{s.n}</span>
                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
