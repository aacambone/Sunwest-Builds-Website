import React, { useState, useEffect, useMemo, useRef } from "react";

const metrics = [
  {
    k: "10+",
    label: "Years on enterprise sites",
    body: "Hands-on experience as a Site Superintendent on residential and mixed-use developments.",
  },
  {
    k: "2000+",
    label: "Commercial & Residential units managed",
    body: "Direct oversight of multi-million dollar scopes from foundation through deficiency closeout.",
  },
  {
    k: "On-Time",
    label: "Timeline & logistics",
    body: "Critical-path scheduling, trade coordination, and city inspection handling honed at scale.",
  },
];

const AnimatedCounter = ({ text }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);
  const match = useMemo(() => text.match(/^(\D*)(\d+)(\D*)$/), [text]);

  useEffect(() => {
    if (!match) return;
    let hasTriggered = false;
    const target = parseInt(match[2], 10);
    const duration = 2000;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          hasTriggered = true;
          setHasStarted(true);
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOut * target));
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
          if (counterRef.current) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [match]);

  if (!match) return <span>{text}</span>;

  return (
    <span ref={counterRef}>
      {match[1]}{hasStarted ? count : 0}{match[3]}
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
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-brand-accent" />
              <span
                className="text-xs tracking-[0.28em] uppercase font-medium"
                style={{ color: "#8A7D6B" }}
              >
                Our Roots
              </span>
            </div>
            <h2
              data-testid="experience-headline"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05]"
              style={{ color: "#1A1A1A" }}
            >
              An enterprise pedigree,{" "}
              <span style={{ color: "#A09080" }}>brought home.</span>
            </h2>
            <p
              className="mt-8 text-lg leading-relaxed max-w-md"
              style={{ color: "#5A5048" }}
            >
              Sunwest Builds was founded on a decade of work for Canada&apos;s most rigorous developers.

            </p>

            {/* Closing positioning line — bridges enterprise past to residential present */}
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
                <span style={{ color: "#C9802A" }}>custom homes and renovations</span>{" "}
                across the GTA & Surrounding Areas.
              </p>
            </div>
          </div>

          {/* Metric cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: "#D8D4CE" }}>
            {metrics.map((m, i) => (
              <div
                key={m.label}
                data-testid={`experience-metric-${i}`}
                className="reveal p-8 md:p-10 flex flex-col justify-start gap-4"
                style={{ backgroundColor: "#F5F2EE" }}
              >
                {/* Number */}
                <span
                  className="font-display text-5xl md:text-6xl font-medium tracking-tighter leading-none"
                  style={{ color: "#1A1A1A" }}
                >
                  <AnimatedCounter text={m.k} />
                </span>

                {/* Label — carries the warm accent now */}
                <div
                  className="text-[11px] uppercase tracking-[0.22em] font-medium"
                  style={{ color: "#C9802A" }}
                >
                  {m.label}
                </div>

                {/* Divider */}
                <div className="w-full h-px" style={{ backgroundColor: "#E0DCD6" }} />

                {/* Body */}
                <p className="text-sm leading-relaxed" style={{ color: "#5A5048" }}>
                  {m.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
