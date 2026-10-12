"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function Nav() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jerusalem" }));
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-5 text-sm text-white md:px-10">
        <Link href="/" className="font-display text-base font-semibold tracking-tight">
          {site.name}
        </Link>
        <span className="hidden font-mono text-xs uppercase tracking-widest text-white/60 md:block">
          {site.location} · {time}
        </span>
        <ul className="flex gap-5 md:gap-8">
          <li><Link href="/#work" className="hover:opacity-60 transition-opacity">Work</Link></li>
          <li><Link href="/#about" className="hover:opacity-60 transition-opacity">About</Link></li>
          <li><Link href="/#contact" className="hover:opacity-60 transition-opacity">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
