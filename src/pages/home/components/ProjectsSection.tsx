import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../../../mocks/projects";
import { useInView } from "../../../hooks/useInView";

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const scrollPosRef = useRef(0);
  const { ref, inView } = useInView(0.08);

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  useEffect(() => {
    if (showAll) {
      window.scrollTo({ top: scrollPosRef.current, behavior: "instant" });
    }
  }, [showAll]);

  const handleToggle = () => {
    scrollPosRef.current = window.scrollY;
    setShowAll((prev) => !prev);
  };

  return (
    <section id="projects" className="py-28 bg-zinc-900 relative overflow-hidden">
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

      {/* ── Ambient glow ──────────────────────────────── */}
      <div className="absolute top-0 right-0 w-96 h-96 glow-orb rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 glow-orb rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* ── Decorative concentric rings — bottom-left ─── */}
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 pointer-events-none">
        <div className="relative w-[420px] h-[420px]" style={{ filter: "drop-shadow(0 0 40px rgba(26,122,108,0.05))" }}>
          <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.11)" }} />
          <div className="absolute inset-12 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.08)" }} />
          <div className="absolute inset-24 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.06)" }} />
          <div className="absolute inset-36 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.04)" }} />
        </div>
      </div>

      {/* ── Dot cluster — top-left ────────────────────── */}
      <div className="absolute top-16 left-8 pointer-events-none select-none flex flex-col gap-2.5 opacity-35">
        {Array.from({ length: 3 }).map((_, row) => (
          <div key={row} className="flex gap-2.5">
            {Array.from({ length: 5 }).map((_, col) => (
              <div key={col} className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(26,122,108,0.7)" }} />
            ))}
          </div>
        ))}
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-16 reveal ${inView ? "visible" : ""}`}>
          <span className="section-label text-sage-400 text-xs font-bold tracking-widest uppercase">Portfolio</span>
          <h2 className="text-4xl font-extrabold text-zinc-100 mt-3 tracking-tight">Featured Projects</h2>
          <p className="text-zinc-500 mt-3 max-w-xl leading-relaxed">
            Robotics, CFD research, CAD design, and competition builds across multiple engineering disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {visibleProjects.map((project, i) => (
            <div
              key={project.id}
              className={`reveal card-lift ${inView ? "visible" : ""} bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 hover:border-sage-500/50 cursor-pointer group`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
              onClick={() => navigate(`/project/${project.slug}`)}
            >
              {/* Image */}
              <div className="w-full h-56 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ objectPosition: "47% center" }}
                />
                {/* Gradient overlay — bleeds into card */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/25 to-transparent" />
                {/* Subtle top vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 to-transparent" />
              </div>

              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-base font-bold text-zinc-100 leading-snug">{project.title}</h3>
                  <span className="text-xs text-zinc-600 whitespace-nowrap mt-0.5 font-medium">{project.date}</span>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-sage-500/8 text-sage-400 border border-sage-500/20 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs text-sage-400 font-semibold flex items-center gap-1.5 glow-text-sm group-hover:text-sage-300 transition-colors">
                  View project
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Show more / Show less */}
        {projects.length > 2 && (
          <div className={`flex justify-center mt-12 reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: inView ? "200ms" : "0ms" }}>
            <button
              onClick={handleToggle}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-sage-400 border border-zinc-800 hover:border-sage-500/40 px-7 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap tracking-wide"
            >
              {showAll ? (
                <>Show less <i className="ri-arrow-up-s-line text-base" /></>
              ) : (
                <>Show all {projects.length} projects <i className="ri-arrow-down-s-line text-base" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}