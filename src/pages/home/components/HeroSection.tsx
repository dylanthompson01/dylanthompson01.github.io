export default function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center bg-zinc-950 overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] glow-orb-strong rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] glow-orb rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(26,122,108,0.05) 0%, transparent 70%)" }} />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(26,122,108,1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Sage-tinted concentric rings — right side */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 pointer-events-none">
        <div className="relative w-[520px] h-[520px]" style={{ filter: "drop-shadow(0 0 40px rgba(26,122,108,0.06))" }}>
          <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.12)" }} />
          <div className="absolute inset-12 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.09)" }} />
          <div className="absolute inset-24 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.07)" }} />
          <div className="absolute inset-36 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.05)" }} />
        </div>
      </div>

      {/* Small sage rings — bottom left */}
      <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 pointer-events-none">
        <div className="relative w-[300px] h-[300px]">
          <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.09)" }} />
          <div className="absolute inset-8 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.06)" }} />
          <div className="absolute inset-16 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.04)" }} />
        </div>
      </div>

      {/* Dot cluster — upper right */}
      <div className="absolute top-32 right-32 pointer-events-none select-none flex flex-col gap-2.5 opacity-40">
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="flex gap-2.5">
            {Array.from({ length: 7 }).map((_, col) => (
              <div key={col} className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(26,122,108,0.6)" }} />
            ))}
          </div>
        ))}
      </div>

      {/* Corner diagonal texture — top-left */}
      <div
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-[0.04]"
        style={{
          background: "repeating-linear-gradient(-45deg, rgba(26,122,108,1) 0px, rgba(26,122,108,1) 1px, transparent 1px, transparent 24px)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="animate-fade-up stagger-1">
              <div className="inline-flex items-center gap-2 bg-sage-500/10 border border-sage-500/30 text-sage-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6 glow-border-card">
                <span className="w-1.5 h-1.5 bg-sage-400 rounded-full inline-block animate-pulse glow-dot" />
                UCF Mechanical Engineering &bull; Class of 2029
              </div>
            </div>

            <div className="animate-fade-up stagger-2">
              <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-100 leading-tight mb-5 tracking-tight">
                Dylan <br />
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, #a8d5c2 0%, #2ea891 45%, #1a7a6c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Thompson
                </span>
              </h1>
            </div>

            <div className="animate-fade-up stagger-3">
              <p className="text-base text-zinc-400 max-w-lg leading-relaxed mb-3">
                Mechanical engineering student at UCF passionate about robotics, heat systems research,
                CAD design, and building things that actually work — currently interning at{" "}
                <span className="text-sage-400 font-semibold glow-text-sm">GE Vernova</span> (Summer 2026).
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-10">
                <a href="mailto:dylan.thompson542@gmail.com" className="flex items-center gap-1.5 hover:text-sage-400 transition-colors duration-200 cursor-pointer">
                  <i className="ri-mail-line" /> dylan.thompson542@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/dylanthompson01" target="_blank" rel="nofollow noopener noreferrer" className="flex items-center gap-1.5 hover:text-sage-400 transition-colors duration-200 cursor-pointer">
                  <i className="ri-linkedin-box-line" /> LinkedIn
                </a>
                <span className="flex items-center gap-1.5">
                  <i className="ri-map-pin-line" /> Orlando, FL
                </span>
              </div>
            </div>

            <div className="animate-fade-up stagger-4">
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { value: "3.7", label: "GPA" },
                  { value: "CSWP", label: "Certified" },
                  { value: "5+", label: "Active Roles" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-4 text-center glow-border-card transition-all duration-300 hover:border-sage-500/30">
                    <div className="text-xl font-extrabold text-sage-400 glow-text-sm">{stat.value}</div>
                    <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up stagger-5">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleScroll("#projects")}
                  className="bg-sage-600 hover:bg-sage-500 text-white font-semibold px-8 py-3 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap glow-btn"
                >
                  View Projects
                </button>
                <button
                  onClick={() => handleScroll("#contact")}
                  className="border border-zinc-700 hover:border-sage-500/60 text-zinc-300 hover:text-sage-400 font-semibold px-8 py-3 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>

          <div className="animate-fade-left stagger-3 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl border border-sage-500/20" style={{ boxShadow: "0 0 30px rgba(26,122,108,0.10)" }} />
              <div className="absolute -inset-8 rounded-2xl border border-sage-500/10" style={{ boxShadow: "0 0 50px rgba(26,122,108,0.06)" }} />
              <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "0 0 50px rgba(26,122,108,0.18), 0 0 100px rgba(26,122,108,0.07)" }} />
              <div className="w-80 h-96 rounded-2xl overflow-hidden border border-sage-500/25 relative" style={{ boxShadow: "0 0 25px rgba(26,122,108,0.16)" }}>
                <img
                  src="https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/f2d0bc85bb0904a9accfeb6b72a0f40f.png"
                  alt="Dylan Thompson"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-zinc-950 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-zinc-400 font-medium">Mechanical Engineering</p>
                  <p className="text-sm text-zinc-200 font-bold">University of Central Florida</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-6 bg-zinc-900/95 border border-sage-500/35 rounded-xl px-4 py-2.5 flex items-center gap-2 glow-border-card">
                <span className="text-xl font-extrabold text-sage-400 glow-text-sm">3.7</span>
                <span className="text-xs text-zinc-400 leading-tight">GPA</span>
              </div>
              <div className="absolute -bottom-4 -right-6 bg-zinc-900/95 border border-sage-500/35 rounded-xl px-4 py-2.5 glow-border-card">
                <p className="text-xs text-sage-400 font-bold glow-text-sm">GE Vernova</p>
                <p className="text-xs text-zinc-400">Intern · Summer 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in stagger-6">
        <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
