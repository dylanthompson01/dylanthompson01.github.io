import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../home/components/Navbar";
import Footer from "../home/components/Footer";
import ProjectGallery from "./components/ProjectGallery";
import { projects } from "../../mocks/projects";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 text-lg mb-4">Project not found.</p>
          <button
            onClick={() => navigate("/")}
            className="text-sage-400 hover:text-sage-300 font-semibold cursor-pointer whitespace-nowrap"
          >
            &larr; Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col relative overflow-x-hidden">

      {/* Ambient background glow blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-80px] left-[15%] w-[700px] h-[700px] rounded-full bg-sage-500/[0.045] blur-[160px]" />
        <div className="absolute top-[55%] right-[5%] w-[500px] h-[500px] rounded-full bg-sage-400/[0.03] blur-[140px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-sage-600/[0.025] blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />

        {/* Hero */}
        <div className="relative w-full h-[380px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/55 to-zinc-950" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-sage-400 transition-colors duration-200 cursor-pointer mb-5 whitespace-nowrap"
              >
                <i className="ri-arrow-left-line" />
                Back to Portfolio
              </button>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-sage-500/20 text-sage-400 border border-sage-500/30 px-3 py-1 rounded-full font-medium [box-shadow:0_0_12px_-2px_rgba(134,187,145,0.25)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 leading-tight tracking-tight drop-shadow-[0_0_30px_rgba(134,187,145,0.15)]">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full space-y-16">

          {/* Gallery + Overview + Meta */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <ProjectGallery images={project.images} />
              <div>
                <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">Overview</h2>
                <p className="text-zinc-300 text-base leading-relaxed">{project.fullDescription}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-6 [box-shadow:0_0_35px_-10px_rgba(134,187,145,0.1)]">
                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-5">Project Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Timeline</p>
                    <p className="text-sm text-zinc-200 font-semibold">{project.date}</p>
                  </div>
                  <div className="border-t border-zinc-800" />
                  <div>
                    <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Role</p>
                    <p className="text-sm text-zinc-200 font-semibold">{project.role}</p>
                  </div>
                  <div className="border-t border-zinc-800" />
                  <div>
                    <p className="text-xs text-zinc-600 uppercase tracking-wider mb-2">Tools & Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-sage-500/10 text-sage-400 border border-sage-500/20 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-6 [box-shadow:0_0_35px_-10px_rgba(134,187,145,0.1)]">
                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">About Dylan</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Mechanical Engineering student at UCF, passionate about robotics, thermal systems research, and hands-on fabrication.
                </p>
                <a
                  href="mailto:dylan.thompson542@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-sage-400 hover:text-sage-300 transition-colors font-semibold cursor-pointer"
                >
                  <i className="ri-mail-line" />
                  Get in touch
                </a>
              </div>
            </div>
          </div>

          {/* Technical Approach */}
          {project.approach.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-8">Technical Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.approach.map((step) => (
                <div key={step.step} className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-6 hover:border-sage-500/30 transition-colors duration-300 [box-shadow:0_0_25px_-8px_rgba(134,187,145,0.08)]">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sage-500/10 border border-sage-500/25 mb-4 [box-shadow:0_0_14px_-2px_rgba(134,187,145,0.3)]">
                    <span className="text-xs font-extrabold text-sage-400">{step.step}</span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-100 mb-2">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Challenges */}
          {project.challenges.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-8">Challenges &amp; Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {project.challenges.map((c, i) => (
                <div key={i} className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-6 [box-shadow:0_0_25px_-8px_rgba(134,187,145,0.08)]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <i className="ri-error-warning-line text-sage-400 text-base [filter:drop-shadow(0_0_6px_rgba(134,187,145,0.5))]" />
                    </span>
                    <h3 className="text-sm font-bold text-zinc-100">{c.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Highlights + Outcome */}
          <div className={`grid grid-cols-1 gap-8 ${project.highlights.length > 0 ? 'lg:grid-cols-2' : ''}`}>
            {project.highlights.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-6">Key Highlights</h2>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                    <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-checkbox-circle-line text-sage-500 text-base [filter:drop-shadow(0_0_5px_rgba(134,187,145,0.5))]" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            )}

            <div className="bg-zinc-900/80 border border-sage-500/25 rounded-lg p-7 flex flex-col justify-center [box-shadow:0_0_50px_-10px_rgba(134,187,145,0.2)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <i className="ri-flag-2-line text-sage-400 text-lg [filter:drop-shadow(0_0_8px_rgba(134,187,145,0.6))]" />
                </span>
                <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Outcome</h2>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Prev / Next */}
          {(prevProject || nextProject) && (
            <div className="border-t border-zinc-800 pt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevProject ? (
                <button
                  onClick={() => navigate(`/project/${prevProject.slug}`)}
                  className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-800 hover:border-sage-500/40 rounded-lg p-5 text-left transition-all duration-200 cursor-pointer group [box-shadow:0_0_25px_-8px_rgba(134,187,145,0.08)] hover:[box-shadow:0_0_30px_-5px_rgba(134,187,145,0.18)]"
                >
                  <span className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <i className="ri-arrow-left-line text-zinc-500 group-hover:text-sage-400 transition-colors text-lg" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Previous</p>
                    <p className="text-sm text-zinc-200 font-semibold truncate">{prevProject.title}</p>
                  </div>
                </button>
              ) : <div />}

              {nextProject ? (
                <button
                  onClick={() => navigate(`/project/${nextProject.slug}`)}
                  className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-800 hover:border-sage-500/40 rounded-lg p-5 justify-end transition-all duration-200 cursor-pointer group [box-shadow:0_0_25px_-8px_rgba(134,187,145,0.08)] hover:[box-shadow:0_0_30px_-5px_rgba(134,187,145,0.18)]"
                >
                  <div className="min-w-0 text-right">
                    <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Next</p>
                    <p className="text-sm text-zinc-200 font-semibold truncate">{nextProject.title}</p>
                  </div>
                  <span className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <i className="ri-arrow-right-line text-zinc-500 group-hover:text-sage-400 transition-colors text-lg" />
                  </span>
                </button>
              ) : <div />}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
