import { useInView } from "../../../hooks/useInView";

const honors = [
  { icon: "ri-store-line", text: "Co-Founder, asxw Clothing — Designed and launched brand generating $100k+ in sales" },
  { icon: "ri-trophy-line", text: "DECA Senator and Competitor — Leadership & Business Skills" },
  { icon: "ri-riding-line", text: "UCF Skateboarding Club Member" },
];

export default function EducationSection() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="education" className="py-28 bg-zinc-950 relative overflow-hidden">
      {/* ── Top gradient accent ───────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage-500/20 to-transparent pointer-events-none" />

      {/* ── Decorative concentric rings — bottom-left ─── */}
      <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 pointer-events-none">
        <div className="relative w-[400px] h-[400px]" style={{ filter: "drop-shadow(0 0 40px rgba(26,122,108,0.04))" }}>
          <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.09)" }} />
          <div className="absolute inset-12 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.07)" }} />
          <div className="absolute inset-24 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.05)" }} />
          <div className="absolute inset-36 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.03)" }} />
        </div>
      </div>

      {/* ── Dot cluster — top-right ───────────────────── */}
      <div className="absolute top-20 right-10 pointer-events-none select-none flex flex-col gap-2.5 opacity-30">
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="flex gap-2.5">
            {Array.from({ length: 6 }).map((_, col) => (
              <div key={col} className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(26,122,108,0.6)" }} />
            ))}
          </div>
        ))}
      </div>

      {/* ── Corner diagonal texture — top-right ──────── */}
      <div
        className="absolute top-0 right-0 w-44 h-44 pointer-events-none opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(45deg, rgba(26,122,108,1) 0px, rgba(26,122,108,1) 1px, transparent 1px, transparent 20px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 reveal ${inView ? "visible" : ""}`}>
          <span className="section-label text-sage-400 text-xs font-bold tracking-widest uppercase">Academic</span>
          <h2 className="text-4xl font-extrabold text-zinc-100 mt-3 tracking-tight">Education</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Education Card */}
          <div
            className={`lg:col-span-2 rounded-xl overflow-hidden border border-zinc-800 reveal ${inView ? "visible" : ""}`}
            style={{ transitionDelay: inView ? "80ms" : "0ms" }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/c2c4433415ffdf20373c537ed915c4cb.png"
                alt="UCF Campus"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <span className="text-xs text-sage-400 font-bold uppercase tracking-widest">Current Enrollment</span>
                <h3 className="text-xl font-extrabold text-white mt-1">University of Central Florida</h3>
              </div>
            </div>
            <div className="p-6 bg-zinc-900">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-base font-bold text-zinc-100">Bachelor of Science in Mechanical Engineering</p>
                  <p className="text-sm text-zinc-500 mt-1">Orlando, Florida</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-sage-400 glow-text">3.7</span>
                  <p className="text-xs text-zinc-500 font-medium">GPA</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: "ri-calendar-line", label: "Expected Graduation", value: "2029" },
                  { icon: "ri-map-pin-line", label: "Location", value: "Orlando, FL" },
                  { icon: "ri-book-open-line", label: "Degree", value: "B.S. Mech. Eng." },
                ].map((item) => (
                  <div key={item.label} className="bg-zinc-800 rounded-lg p-4">
                    <div className="w-8 h-8 flex items-center justify-center text-sage-400 mb-2">
                      <i className={`${item.icon} text-lg`} />
                    </div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-bold text-zinc-200 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-zinc-800 border border-sage-500/20 rounded-lg">
                <p className="text-sm font-semibold text-zinc-300 mb-3">Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {["EGN 1007 - Engineering Fundamentals", "EGN 1007C - Engineering & Environment (Boat Race)", "MAC 2311 - Calculus 1", "MAC 2312 - Calculus 2", "PHY 2048 - Physics 1", "CHM 2045 - Chemistry 1"].map((c) => (
                    <span key={c} className="text-xs bg-zinc-900 border border-zinc-700 text-zinc-400 px-3 py-1 rounded-full hover:border-sage-500/40 hover:text-sage-400 transition-colors cursor-default">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div
              className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex-1 reveal ${inView ? "visible" : ""}`}
              style={{ transitionDelay: inView ? "160ms" : "0ms" }}
            >
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-5">
                <i className="ri-medal-line text-sage-400 mr-2" />
                Activities &amp; Honors
              </h3>
              <div className="space-y-4">
                {honors.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-sage-500/10 text-sage-400 rounded-full flex-shrink-0">
                      <i className={`${h.icon} text-sm`} />
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`bg-zinc-900 border border-sage-500/20 rounded-xl p-6 glow-border-card reveal ${inView ? "visible" : ""}`}
              style={{ transitionDelay: inView ? "240ms" : "0ms" }}
            >
              <div className="text-4xl font-extrabold text-sage-400 mb-1 glow-text">3.7</div>
              <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                Maintaining a 3.7 GPA while actively participating in 5+ competitive and research roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
