import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import { site } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.intro,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable} ${mono.variable} antialiased`}>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
