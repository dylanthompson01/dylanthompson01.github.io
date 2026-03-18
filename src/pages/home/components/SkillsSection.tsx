import { useInView } from "../../../hooks/useInView";

type SkillLevel = "Certified" | "Expert" | "Intermediate" | "Beginner";

interface Skill {
  name: string;
  level: number;
  label?: SkillLevel;
}

interface SkillGroup {
  icon: string;
  category: string;
  borderColor: string;
  iconBg: string;
  barColor: string;
  showCertified: boolean;
  skills: Skill[];
}

const labelStyles: Record<SkillLevel, string> = {
  Certified: "text-sage-400 bg-sage-500/10 border border-sage-500/25",
  Expert:    "text-sage-400 bg-sage-500/10 border border-sage-500/25",
  Intermediate: "text-zinc-300 bg-zinc-800 border border-zinc-600",
  Beginner:  "text-zinc-500 bg-zinc-900 border border-zinc-700/60",
};

const skillGroups: SkillGroup[] = [
  {
    icon: "ri-award-line",
    category: "Certifications",
    borderColor: "border-sage-500/30",
    iconBg: "bg-sage-500/10 text-sage-400",
    barColor: "bg-sage-500",
    showCertified: true,
    skills: [
      { name: "Lean Six Sigma Yellow Belt", level: 100, label: "Certified" },
      { name: "Certified SolidWorks Professional (CSWP)", level: 100, label: "Certified" },
      { name: "MOS Certified — Excel, PowerPoint, Word", level: 100, label: "Certified" },
    ],
  },
  {
    icon: "ri-code-s-slash-line",
    category: "Programming & Electronics",
    borderColor: "border-zinc-700",
    iconBg: "bg-zinc-800 text-sage-400",
    barColor: "bg-sage-600",
    showCertified: false,
    skills: [
      { name: "Python", level: 40, label: "Intermediate" },
      { name: "Arduino (C++)", level: 40, label: "Intermediate" },
      { name: "Servo Systems", level: 75, label: "Expert" },
      { name: "Feedback Control Systems", level: 40, label: "Intermediate" },
    ],
  },
  {
    icon: "ri-settings-3-line",
    category: "Engineering Software",
    borderColor: "border-zinc-700",
    iconBg: "bg-zinc-800 text-sage-400",
    barColor: "bg-sage-600",
    showCertified: false,
    skills: [
      { name: "SolidWorks — CAD & Simulation", level: 95, label: "Expert" },
      { name: "ANSYS CFD", level: 25, label: "Beginner" },
      { name: "ProtoTRAK CNC", level: 25, label: "Beginner" },
    ],
  },
  {
    icon: "ri-team-line",
    category: "Interpersonal",
    borderColor: "border-zinc-700",
    iconBg: "bg-zinc-800 text-sage-400",
    barColor: "bg-sage-600",
    showCertified: false,
    skills: [
      { name: "Communication", level: 100 },
      { name: "Leadership & Project Management", level: 100 },
      { name: "Problem-Solving", level: 100 },
      { name: "Adaptability", level: 100 },
    ],
  },
];

const tools = [
  "SolidWorks", "ANSYS", "Arduino IDE", "Python", "ProtoTRAK",
  "Microsoft Excel", "CNC Lathe", "Manual Mill", "Bandsaw", "Drill Press",
  "3D Printing", "Servo Driver", "Potentiometers", "Technical Drawing",
];

export default function SkillsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="py-28 bg-zinc-950 relative overflow-hidden">
      {/* ── Top gradient accent ───────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage-500/20 to-transparent pointer-events-none" />

      {/* ── Ambient glow ──────────────────────────────── */}
      <div className="absolute top-1/2 left-0 w-80 h-80 glow-orb rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-64 h-64 glow-orb rounded-full translate-x-1/2 pointer-events-none" />

      {/* ── Decorative concentric rings — top-right ───── */}
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 pointer-events-none">
        <div className="relative w-[460px] h-[460px]" style={{ filter: "drop-shadow(0 0 40px rgba(26,122,108,0.05))" }}>
          <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.10)" }} />
          <div className="absolute inset-12 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.07)" }} />
          <div className="absolute inset-24 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.05)" }} />
          <div className="absolute inset-36 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.04)" }} />
        </div>
      </div>

      {/* ── Dot cluster — bottom-right ────────────────── */}
      <div className="absolute bottom-16 right-12 pointer-events-none select-none flex flex-col gap-2.5 opacity-30">
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="flex gap-2.5">
            {Array.from({ length: 6 }).map((_, col) => (
              <div key={col} className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(26,122,108,0.6)" }} />
            ))}
          </div>
        ))}
      </div>

      {/* ── Corner diagonal texture — bottom-left ─────── */}
      <div
        className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none opacity-[0.035]"
        style={{
          background: "repeating-linear-gradient(-45deg, rgba(26,122,108,1) 0px, rgba(26,122,108,1) 1px, transparent 1px, transparent 22px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-16 reveal ${inView ? "visible" : ""}`}>
          <span className="section-label text-sage-400 text-xs font-bold tracking-widest uppercase">Capabilities</span>
          <h2 className="text-4xl font-extrabold text-zinc-100 mt-3 tracking-tight">Skills &amp; Tools</h2>
          <p className="text-zinc-500 mt-3 max-w-xl leading-relaxed">
            A well-rounded toolkit spanning engineering software, fabrication, programming, and team leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-14">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className={`reveal border ${group.borderColor} rounded-xl p-7 bg-zinc-900 glow-border-card transition-all duration-300 ${inView ? "visible" : ""}`}
              style={{ transitionDelay: inView ? `${gi * 90}ms` : "0ms" }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${group.iconBg}`}>
                  <i className={`${group.icon} text-lg`} />
                </div>
                <h3 className="font-bold text-zinc-200 text-base">{group.category}</h3>
              </div>
              <div className="space-y-5">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-zinc-300 font-medium">{skill.name}</span>
                      {skill.label && (
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${labelStyles[skill.label]}`}>
                          {skill.label}
                        </span>
                      )}
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${group.barColor} rounded-full glow-bar`}
                        style={{
                          width: inView ? `${skill.level}%` : "0%",
                          transition: `width 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${si * 110 + gi * 60}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div
          className={`reveal border border-zinc-800 rounded-xl p-8 bg-zinc-900 glow-border-card ${inView ? "visible" : ""}`}
          style={{ transitionDelay: inView ? "350ms" : "0ms" }}
        >
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-6">Tools &amp; Equipment</h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, ti) => (
              <span
                key={tool}
                className={`reveal text-sm bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-2 rounded-full font-medium hover:border-sage-500/60 hover:text-sage-400 transition-all duration-200 cursor-default ${inView ? "visible" : ""}`}
                style={{ transitionDelay: inView ? `${360 + ti * 35}ms` : "0ms" }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
