import React, { useState, useEffect, useMemo, useRef } from "react";

// ─── SEO Optimized Copy ──────────────────────────────────────────────
const metrics = [
  {
    k: "10+",
    label: "Years in Toronto Construction",
    body: "Hands-on experience as a Site Superintendent on major residential and mixed-use developments.",
  },
  {
    k: "2000+",
    label: "Units & Projects Managed",
    body: "Direct oversight of multi-million dollar scopes, from structural foundations to luxury interior closeouts.",
  },
  {
    k: "On-Time",
    label: "General Contracting Logistics",
    body: "Critical-path scheduling, Vaughan trade coordination, and municipal inspection handling honed at scale.",
  },
];

// ─── SEO-Optimized Animated Counter ──────────────────────────────────────────
const AnimatedCounter = ({ text }) => {
  const match = useMemo(() => text.match(/^(\D*)(\d+)(\D*)$/), [text]);
  const target = match ? parseInt(match[2], 10) : 0;

  // Initialize with the TARGET number so prerender captures the real stats
  const [count, setCount] = useState(target);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!match) return;

    // Block animation if react-snap is crawling
    if (typeof window !== "undefined" && window.navigator.userAgent === "ReactSnap") {
      return;
    }

    let hasTriggered = false;
    const duration = 2000;
    let currentObserver;

    const startObserving = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasTriggered) {
            hasTriggered = true;

            let startTimestamp = null;
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

              setCount(Math.floor(easeOut * target));

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            };
            window.requestAnimationFrame(step);

            if (counterRef.current) observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (counterRef.current) observer.observe(counterRef.current);
      return observer;
    };

    const handleLoad = () => {
      currentObserver = startObserving();
    };

    if (document.readyState === "complete") {
      currentObserver = startObserving();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      if (currentObserver) currentObserver.disconnect();
    };
  }, [match, target]);

  if (!match) return <span>{text}</span>;

  return (
    <span ref={counterRef}>
      {match[1]}{count}{match[3]}
    </span>
  );
};

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="py-28 md:py-40"
      style={{ backgroundColor: "#EDEAE5" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          <div className="lg:col-span-5 reveal">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-brand-accent" />
              <span
                className="text-xs tracking-[0.28em] uppercase font-medium"
                style={{ color: "#8A7D6B" }}
              >
                Our Foundation
              </span>
            </div>
            
            {/* H2 Headline - Injected "construction management" for broad search context */}
            <h2
              data-testid="experience-headline"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05]"
              style={{ color: "#1A1A1A" }}
            >
              Enterprise construction management,{" "}
              <span style={{ color: "#A09080" }}>brought home.</span>
            </h2>
            
            <p
              className="mt-8 text-lg leading-relaxed max-w-md"
              style={{ color: "#5A5048" }}
            >
              Sunwest Builds was founded on a decade of rigorous project management for Canada&apos;s top developers.
            </p>

            {/* Closing positioning line — Fully loaded with Local SEO targets */}
            <div
              className="mt-12 md:mt-16 pt-8"
              style={{ borderTop: "1px solid #D8D4CE" }}
              data-testid="experience-positioning"
            >
              <p
                className="font-display text-xl md:text-2xl font-medium tracking-tight leading-snug max-w-md"
                style={{ color: "#1A1A1A" }}
              >
                Today, that experience is focused entirely on{" "}
                <span style={{ color: "#C9802A" }}>luxury remodeling and whole-home structural renovations</span>{" "}
                across Vaughan, Toronto, and the GTA.
              </p>
            </div>
          </div>

          {/* Metric cards - Converted to a semantic Description List (<dl>) */}
          <dl className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: "#D8D4CE" }}>
            {metrics.map((m, i) => (
              <div
                key={m.label}
                data-testid={`experience-metric-${i}`}
                className="reveal p-8 md:p-10 flex flex-col justify-start gap-4"
                style={{ backgroundColor: "#F5F2EE" }}
              >
                {/* Number / Value (<dd>) */}
                <dd
                  className="font-display text-5xl md:text-6xl font-medium tracking-tighter leading-none m-0"
                  style={{ color: "#1A1A1A" }}
                >
                  <AnimatedCounter text={m.k} />
                </dd>

                {/* Term Label (<dt>) */}
                <dt
                  className="text-[11px] uppercase tracking-[0.22em] font-medium"
                  style={{ color: "#C9802A" }}
                >
                  {m.label}
                </dt>

                {/* Divider */}
                <div className="w-full h-px" style={{ backgroundColor: "#E0DCD6" }} aria-hidden="true" />

                {/* Body Details (<dd>) */}
                <dd className="text-sm leading-relaxed m-0" style={{ color: "#5A5048" }}>
                  {m.body}
                </dd>
              </div>
            ))}
          </dl>

        </div>
      </div>
    </section>
  );
}