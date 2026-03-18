import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useInView } from "../../../hooks/useInView";

// ─── EmailJS config ────────────────────────────────────────────────────────────
// Replace these three values with your own from emailjs.com
const EMAILJS_SERVICE_ID  = "service_13ibfwd";
const EMAILJS_TEMPLATE_ID = "template_waw0l09";
const EMAILJS_PUBLIC_KEY  = "3OJ_he4iZxNjgfx42";
// ──────────────────────────────────────────────────────────────────────────────

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const { ref, inView } = useInView(0.08);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const messageEl = form.querySelector<HTMLTextAreaElement>("textarea[name='message']");
    if (messageEl && messageEl.value.length > 500) return;

    setSubmitting(true);
    setError(null);

    const nameEl     = form.querySelector<HTMLInputElement>("input[name='name']");
    const emailEl    = form.querySelector<HTMLInputElement>("input[name='email']");
    const subjectEl  = form.querySelector<HTMLInputElement>("input[name='subject']");

    const templateParams = {
      name:    nameEl?.value    ?? "",
      email:   emailEl?.value   ?? "",
      subject: subjectEl?.value ?? "",
      message: messageEl?.value ?? "",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : JSON.stringify(err);
      setError(`Failed to send: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-zinc-900 relative overflow-hidden">
      {/* ── Top gradient accent ───────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage-500/20 to-transparent pointer-events-none" />

      {/* ── Decorative concentric rings — top-right ───── */}
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 pointer-events-none">
        <div className="relative w-[440px] h-[440px]" style={{ filter: "drop-shadow(0 0 40px rgba(26,122,108,0.05))" }}>
          <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.10)" }} />
          <div className="absolute inset-12 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.07)" }} />
          <div className="absolute inset-24 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.05)" }} />
          <div className="absolute inset-36 rounded-full" style={{ border: "1px solid rgba(26,122,108,0.03)" }} />
        </div>
      </div>

      {/* ── Dot cluster — bottom-right ────────────────── */}
      <div className="absolute bottom-16 right-12 pointer-events-none select-none flex flex-col gap-2.5 opacity-30">
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
          <span className="section-label text-sage-400 text-xs font-bold tracking-widest uppercase">Let&apos;s Connect</span>
          <h2 className="text-4xl font-extrabold text-zinc-100 mt-3 tracking-tight">Get In Touch</h2>
          <p className="text-zinc-500 mt-3 max-w-xl leading-relaxed">
            Open to internship opportunities, research collaboration, or engineering projects. Let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className={`lg:col-span-2 space-y-6 reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: inView ? "80ms" : "0ms" }}>
            {[
              { icon: "ri-mail-line", label: "Email", value: "dylan.thompson542@gmail.com", href: "mailto:dylan.thompson542@gmail.com" },
              { icon: "ri-map-pin-2-line", label: "Location", value: "Orlando, FL", href: null },
              { icon: "ri-linkedin-box-line", label: "LinkedIn", value: "linkedin.com/in/dylanthompson01", href: "https://www.linkedin.com/in/dylanthompson01" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-sage-500/10 text-sage-400 rounded-lg flex-shrink-0">
                  <i className={`${item.icon} text-lg`} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="nofollow noopener noreferrer" className="text-sm font-semibold text-zinc-200 hover:text-sage-400 transition-colors duration-200">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-zinc-200">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-zinc-950 border border-sage-500/20 rounded-xl p-6 mt-2 glow-border-card">
              <i className="ri-lightbulb-line text-sage-400 text-2xl mb-3 block" />
              <p className="text-sm text-zinc-400 leading-relaxed">
                Currently open to internship opportunities in mechanical engineering, R&amp;D, or product design. GE Vernova intern starting Summer 2026.
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-3 bg-zinc-950 rounded-xl border border-zinc-800 p-8 reveal ${inView ? "visible" : ""}`}
            style={{ transitionDelay: inView ? "160ms" : "0ms" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-sage-500/10 text-sage-400 rounded-full mb-4">
                  <i className="ri-check-line text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">Message Sent!</h3>
                <p className="text-sm text-zinc-500">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-readdy-form
                id="contact-form"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-sage-500/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-sage-500/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Internship / Research / Collaboration..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-sage-500/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">
                    Message <span className="text-zinc-600 normal-case font-normal">({charCount}/500)</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={500}
                    placeholder="Tell me more about what you have in mind..."
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-sage-500/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-sage-600 hover:bg-sage-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap glow-btn"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
                {error && (
                  <p className="text-red-400 text-sm text-center mt-2">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
