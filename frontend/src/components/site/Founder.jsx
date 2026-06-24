import React, { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";

// ─── Scroll-reveal hook ──────────────────────────────────────────────────────
function useInView({ threshold = 0.2 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Respect users who prefer reduced motion — show immediately, no animation
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ─── Reveal wrapper for bio paragraphs ───────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Animated credential cell (SEO Optimized with DL tags) ───────────────────
function Credential({ label, value, delay }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
      className="flex flex-col"
    >
      <dt
        className="text-xs uppercase tracking-[0.22em]"
        style={{ color: "#A09080" }}
      >
        {label}
      </dt>
      {/* Accent line grows in after the cell appears */}
      <div
        aria-hidden="true"
        className="h-px my-2.5"
        style={{
          backgroundColor: "#C9802A",
          width: inView ? "22px" : "0px",
          transition: `width 0.6s ease ${delay + 200}ms`,
        }}
      />
      <dd className="text-sm font-medium m-0" style={{ color: "#1A1A1A" }}>
        {value}
      </dd>
    </div>
  );
}

// ─── SEO Optimized Credentials Data ──────────────────────────────────────────
const credentials = [
  ["Experience", "10+ Years Corporate"],
  ["Education", "George Brown College"],
  ["Specialty", "Structural Renovations"],
  ["Network", "Elite Vaughan Sub-trades"],
  ["Service Area", "GTA & Simcoe County"],
  ["Approach", "Owner On-Site"],
];

export default function Founder() {
  return (
    <section
      id="founder"
      data-testid="founder-section"
      className="py-28 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#F5F2EE" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* LEFT COLUMN: Headline & Quote */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-10 h-px bg-brand-accent" />
                <span
                  className="text-xs tracking-[0.28em] uppercase font-medium"
                  style={{ color: "#8A7D6B" }}
                >
                  About the Founder
                </span>
              </div>

              <h2
                data-testid="founder-headline"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05]"
                style={{ color: "#1A1A1A" }}
              >
                A superintendent&apos;s eye.
                <br />
                <span style={{ color: "#A09080" }}>A craftsman&apos;s hands.</span>
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <blockquote
                data-testid="founder-quote"
                className="mt-16 lg:mt-24 pl-6 md:pl-8 max-w-md"
                style={{ borderLeft: "2px solid #C9802A" }}
              >
                <Quote size={20} className="mb-4" style={{ color: "#C9802A" }} strokeWidth={1.5} />
                <p
                  className="font-display text-xl leading-snug tracking-tight"
                  style={{ color: "#2A2420" }}
                >
                  &ldquo;A lot of residential general contractors operate by the seat of their pants.
                  We run our custom renovations like a commercial site: Strict schedules, tight budgets,
                  flawless execution, no surprises.&rdquo;
                </p>
                <footer
                  className="mt-6 text-xs uppercase tracking-[0.2em]"
                  style={{ color: "#A09080" }}
                >
                  &mdash; Justin Carinci
                </footer>
              </blockquote>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: Bio & Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            <Reveal>
              <div className="pt-6 mb-10" style={{ borderTop: "1px solid #DDD8D0" }}>
                {/* Changed to H3 to maintain semantic hierarchy after the H2 above */}
                <h3
                  className="font-display text-3xl font-medium tracking-tight"
                  style={{ color: "#1A1A1A" }}
                >
                  Justin Carinci
                </h3>
                <p
                  className="text-xs uppercase tracking-[0.2em] mt-2"
                  style={{ color: "#C9802A" }}
                >
                  General Contractor & Founder, Sunwest Builds
                </p>
              </div>
            </Reveal>

            {/* Bio — paragraph 1 */}
            <Reveal delay={60}>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#5A5048" }}>
                Inspired by his late grandfather's legacy in the building industry, Justin founded Sunwest Builds to carry the torch forward, executing whole-home renovations with the same care and craftsmanship that defined his grandfather's work. Justin holds an Advanced Diploma in Construction Engineering &amp; Management from
                George Brown College and has been working in the Toronto construction sector for{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>over a decade</span>. After
                graduating, he obtained pivotal roles as a Project Manager and Site Supervisor,
                overseeing multi-million dollar projects for Canada&apos;s most prestigious developers.
              </p>
            </Reveal>

            {/* Bio — paragraph 2 */}
            <Reveal delay={60}>
              <p className="mt-6 text-sm md:text-base leading-relaxed" style={{ color: "#5A5048" }}>
                Through many years managing complex, high-stakes projects, Justin has built a great
                reputation with various consultants, architects, engineers, designers, and local Vaughan sub-trades. This elite network and{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>enterprise-level discipline</span>{" "}
                have directly contributed to his success in the luxury remodeling and structural
                renovation sector across the Greater Toronto Area and Simcoe County.
              </p>
            </Reveal>

            {/* PULL-QUOTE — promoted trait line */}
            <Reveal delay={80}>
              <p
                className="font-display text-2xl md:text-3xl font-medium tracking-tight leading-snug my-10 max-w-xl"
                style={{ color: "#1A1A1A" }}
              >
                Highly organized, detail-oriented,{" "}
                <span style={{ color: "#C9802A" }}>and meticulous like no other.</span>
              </p>
            </Reveal>

            {/* Bio — paragraph 3 */}
            <Reveal delay={60}>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#5A5048" }}>
                Anyone who knows Justin knows it. From consultant and client communications, to
                emails, all the way to how pristine the project sites are kept. These are just a few of the
                traits he holds, fostering trust with homeowners and building success in the contracting industry.
              </p>
            </Reveal>

            {/* Credentials — Converted to semantic <dl> list */}
            <dl
              className="mt-12 pt-10 grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-6"
              style={{ borderTop: "1px solid #DDD8D0" }}
              data-testid="founder-credentials"
            >
              {credentials.map(([label, value], i) => (
                <Credential
                  key={value}
                  label={label}
                  value={value}
                  delay={i * 90}
                />
              ))}
            </dl>

          </div>
        </div>
      </div>
    </section>
  );
}