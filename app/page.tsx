import Hero from "@/components/Hero";
import WorkList from "@/components/WorkList";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkList />
      <div className="pt-24"><Marquee /></div>
      <About />
      <Contact />
    </main>
  );
}
