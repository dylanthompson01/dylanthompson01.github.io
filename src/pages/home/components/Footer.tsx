export default function Footer() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 relative overflow-hidden text-zinc-400">
      {/* ── Top gradient border ───────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage-500/30 to-transparent pointer-events-none" />

      {/* ── Background glow ───────────────────────────── */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] glow-orb rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* ── Decorative concentric rings — top-left ────── */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 pointer-events-none">
        <div className="relative w-[380px] h-[380px]">
          <div className="absolute inset-0 rounded-full border border-zinc-800/60" />
          <div className="absolute inset-12 rounded-full border border-zinc-800/40" />
          <div className="absolute inset-24 rounded-full border border-zinc-800/20" />
          <div className="absolute inset-36 rounded-full border border-sage-500/5" />
        </div>
      </div>

      {/* ── Dot cluster — bottom-left ─────────────────── */}
      <div className="absolute bottom-10 left-10 pointer-events-none select-none flex flex-col gap-2.5 opacity-20">
        {Array.from({ length: 3 }).map((_, row) => (
          <div key={row} className="flex gap-2.5">
            {Array.from({ length: 6 }).map((_, col) => (
              <div key={col} className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(26,122,108,0.7)" }} />
            ))}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">

        {/* ── Signature display name ─────────────────── */}
        <div className="mb-12 pb-10 border-b border-zinc-800/70">
          <div
            className="text-[72px] font-black tracking-tighter leading-none select-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(26,122,108,0.10) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dylan Thompson
          </div>
          <p className="text-sm text-zinc-600 mt-2 tracking-wide">Mechanical Engineering Portfolio</p>
        </div>

        {/* ── Nav + Contact grid ─────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Mechanical Engineering student at UCF. Researcher, project lead, and maker.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/dylanthompson01"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700 hover:border-sage-500/50 hover:text-sage-400 transition-all duration-200 cursor-pointer"
              >
                <i className="ri-linkedin-box-line text-sm" />
              </a>
              <a
                href="mailto:dylan.thompson542@gmail.com"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700 hover:border-sage-500/50 hover:text-sage-400 transition-all duration-200 cursor-pointer"
              >
                <i className="ri-mail-line text-sm" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                ["About Me", "#about"],
                ["Projects", "#projects"],
                ["Skills", "#skills"],
                ["Experience", "#experience"],
                ["Education", "#education"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleScroll(href as string); }}
                    className="text-sm text-zinc-500 hover:text-sage-400 transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:dylan.thompson542@gmail.com" className="text-sm text-zinc-500 hover:text-sage-400 transition-colors duration-200 flex items-center gap-2">
                  <i className="ri-mail-line" />
                  dylan.thompson542@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/dylanthompson01" target="_blank" rel="nofollow noopener noreferrer" className="text-sm text-zinc-500 hover:text-sage-400 transition-colors duration-200 flex items-center gap-2">
                  <i className="ri-linkedin-box-line" />
                  linkedin.com/in/dylanthompson01
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-600">
                <i className="ri-map-pin-line" />
                Orlando, FL
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────── */}
        <div className="border-t border-zinc-800/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} Dylan Thompson. Mechanical Engineering Portfolio.
          </p>
          <p className="text-xs text-zinc-700">
            UCF &bull; B.S. Mechanical Engineering &bull; GE Vernova Intern 2026
          </p>
        </div>
      </div>
    </footer>
  );
}