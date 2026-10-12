export function TabletFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.75rem] border border-white/15 bg-black p-2.5 shadow-2xl shadow-black/60 md:p-3.5 ${className}`}>
      <div className="relative overflow-hidden rounded-[1.1rem]">{children}</div>
    </div>
  );
}

export function BrowserFrame({ children, url = "", className = "" }: { children: React.ReactNode; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/15 bg-[#151517] shadow-2xl shadow-black/60 ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="mx-auto rounded-md bg-white/5 px-6 py-1 font-mono text-[10px] text-white/40">{url}</span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
