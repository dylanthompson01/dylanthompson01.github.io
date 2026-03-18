import { useInView } from "../../../hooks/useInView";

const experiences = [
  {
    role: "Supply Chain Manufacturing Intern",
    org: "GE Vernova",
    period: "May 2026 – Aug 2026",
    type: "Internship",
    accentColor: "border-l-sage-500",
    badgeColor: "bg-sage-500/10 text-sage-400 border border-sage-500/20",
    dotColor: "bg-sage-500",
    bullets: [
      "Collaborating with cross-functional teams to optimize the production of high-voltage grid components, focusing on improving assembly efficiency and reducing material waste.",
      "Scheduled to apply Lean Manufacturing and Six Sigma principles to streamline floor operations and enhance First Pass Yield (FPY) for critical grid infrastructure.",
    ],
  },
  {
    role: "Undergraduate Researcher",
    org: "Interfacial Transport Lab — UCF",
    period: "Jun 2025 – Present",
    type: "Research",
    accentColor: "border-l-zinc-600",
    badgeColor: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    dotColor: "bg-zinc-500",
    bullets: [
      "Investigating experimental methods to improve the efficiency of pulsating heat pipes (PHPs), focusing on single-loop aluminum prototypes that use two-phase fluid oscillations for passive thermal transport.",
      "Conducted independent CFD analysis of a single-loop aluminum pulsating heat pipe using ANSYS software to evaluate fluid flow characteristics and thermal performance.",
      "Developed a SolidWorks exploded-view model of the aluminum PHP, collaborated with UCF machinists on prototype fabrication, and co-authored the research paper abstract.",
      "Debugged Python scripts for improved oscillation data visualization and thermal performance analysis.",
    ],
  },
  {
    role: "ASME Project Lead",
    org: "2025–26 Student Design Competition",
    period: "Sept 2025 – Present",
    type: "Leadership",
    accentColor: "border-l-zinc-600",
    badgeColor: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    dotColor: "bg-zinc-500",
    bullets: [
      "Leading a multidisciplinary team (25+ members) in designing and fabricating an autonomous waste collection robot for ASME's 2025–2026 Student Design Competition.",
      "Coordinating CAD modeling, prototyping, and physical testing to optimize device navigation, waste sorting accuracy, and material handling efficiency across varied terrain types.",
      "Managing comprehensive design validation and deliverables, including fabrication documentation and demonstration videos.",
    ],
  },
  {
    role: "Machinist",
    org: "Baja SAE Machine Shop — UCF",
    period: "Aug 2025 – Present",
    type: "Technical",
    accentColor: "border-l-zinc-700",
    badgeColor: "bg-zinc-800 text-zinc-400 border border-zinc-700",
    dotColor: "bg-zinc-600",
    bullets: [
      "Machined precision components for Baja SAE competition vehicles using CNC lathe (ProtoTRAK), manual mill, and fabrication equipment to meet rigorous performance specifications.",
      "Prototyped, inspected, and documented parts to ensure reliability and compliance with SAE competition rules, contributing to successful builds for endurance, acceleration, and maneuverability events.",
    ],
  },
  {
    role: "Drive & Science Team Designer",
    org: "Robotics Club of Central Florida — Project Storm",
    period: "Aug 2025 – Dec 2025",
    type: "Robotics",
    accentColor: "border-l-zinc-700",
    badgeColor: "bg-zinc-800 text-zinc-400 border border-zinc-700",
    dotColor: "bg-zinc-600",
    bullets: [
      "Designed and tested mechanical systems for a Mars Rover prototype for planetary desert navigation and autonomous object retrieval using a robotic arm.",
      "Fabricated custom wooden test rigs using precision bandsaw cuts enabling motor load testing up to 125 lbs. and validation of structural integrity.",
      "Utilized precision CAD modeling to improve servo integration and ensure reliable operation across articulated subsystems.",
    ],
  },
];

export default function ExperienceSection() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="experience" className="py-28 bg-zinc-900 relative overflow-hidden">
      {/* ── Faded grid background ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(26,122,108,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(26,122,108,0.055) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 72%)',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 72%)',
        }}
      />

      {/* ── Top gradient accent ───────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage-500/20 to-transparent pointer-events-none" />

      {/* ── Decorative concentric rings — top-right ───── */}
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-[380px] h-[380px]" style={{ filter: "drop-shadow(0 0 35px rgba(26,122,108,0.05))" }}>
          <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.10)" }} />
          <div className="absolute inset-10 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.07)" }} />
          <div className="absolute inset-20 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.05)" }} />
        </div>
      </div>

      {/* ── Dot cluster — top-left ────────────────────── */}
      <div className="absolute top-20 left-10 pointer-events-none select-none flex flex-col gap-2.5 opacity-30">
        {Array.from({ length: 3 }).map((_, row) => (
          <div key={row} className="flex gap-2.5">
            {Array.from({ length: 5 }).map((_, col) => (
              <div key={col} className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(26,122,108,0.65)" }} />
            ))}
          </div>
        ))}
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 reveal ${inView ? "visible" : ""}`}>
          <span className="section-label text-sage-400 text-xs font-bold tracking-widest uppercase">Background</span>
          <h2 className="text-4xl font-extrabold text-zinc-100 mt-3 tracking-tight">Experience</h2>
          <p className="text-zinc-500 mt-3 max-w-xl leading-relaxed">
            Research, leadership, and hands-on fabrication across multiple active roles at UCF and industry.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2 hidden md:block" style={{ boxShadow: "0 0 8px rgba(26,122,108,0.25)" }} />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 items-start reveal ${inView ? "visible" : ""}`}
                style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
              >
                <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 ${exp.dotColor} rounded-full border-4 border-zinc-900 z-10 top-5 ${index === 0 ? "glow-dot" : ""}`} />

                <div
                  className="md:w-1/2 bg-zinc-950 rounded-xl p-6 border-l-4 border border-zinc-800 glow-border-card transition-all duration-300"
                  style={index === 0 ? { borderLeftColor: '#1a7a6c', boxShadow: "0 0 0 1px rgba(26,122,108,0.18), 0 0 20px rgba(26,122,108,0.1)" } : { borderLeftColor: '#3f3f46' }}
                >
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${exp.badgeColor}`}>
                    <i className="ri-briefcase-line" />
                    {exp.type}
                  </div>
                  <h3 className="text-base font-bold text-zinc-100">{exp.role}</h3>
                  <p className="text-sm text-sage-400 font-medium mt-0.5">{exp.org}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 mb-4">{exp.period}</p>
                  <ul className="space-y-2">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
                        <i className="ri-arrow-right-s-line text-sage-500 mt-0.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
