import React, { useRef, useEffect, useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";

import heroBg from "../../images/HeroPicJustin.png";
import mainLogo from "../../images/darkmodelogo.png";

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

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* ─── Hardware-Accelerated CSS Animations ─────────────────── */}
      <style>{`
        @keyframes floatGlow1 {
          0%, 100% { transform: translate(0%, 0%) scale(1); opacity: 0.25; }
          50% { transform: translate(-6%, 4%) scale(1.15); opacity: 0.6; }
        }
        @keyframes floatGlow2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); opacity: 0.15; }
          50% { transform: translate(7%, -5%) scale(1.2); opacity: 0.55; }
        }
        .animate-glow-1 {
          animation: floatGlow1 15s ease-in-out infinite;
        }
        .animate-glow-2 {
          animation: floatGlow2 20s ease-in-out infinite;
        }
      `}</style>

      {/* ─── Background photograph (backmost layer) ───────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
        }}
      />

      {/* ─── Legibility scrim: bottom-weighted so the photo stays bright up top ─── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.42) 38%, rgba(0,0,0,0.80) 72%, rgba(0,0,0,0.97) 100%)",
        }}
      />

      {/* ─── Left-weighted scrim for headline contrast ───────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.28) 46%, transparent 78%)",
        }}
      />

      {/* ─── Edge vignette to frame the photo ─────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 200px 60px rgba(0,0,0,0.85)" }}
      />

      {/* ─── Animated Light Layers (GPU Composited) ───────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none animate-glow-1"
        style={{
          background:
            "radial-gradient(85% 70% at 75% 10%, rgba(201,128,42,0.15) 0%, rgba(135,80,20,0.03) 45%, transparent 70%)",
          willChange: "transform, opacity",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none animate-glow-2"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 45%, rgba(184,115,51,0.1) 0%, transparent 65%)",
          willChange: "transform, opacity",
        }}
      />

      {/* ─── Lightweight Static Grain Overlay (Zero Math Lag) ─────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/obM+AAAACHRSTlMAAAAAAAB/wH9/AwwAAACXSURBVDjLpZGxDcNADENNyf67cA1H0D1w7gQK/y1EMik14hH28T5EkiRJkiRJkjdIkiRJkiRJkgdIkiRJkiRJkg9IkiRJkiRJkn9IkiRJkiRJkv9IkiRJkiRJksdIkiRJkiRJksdIkiRJkiRJkudIkiRJkiRJkudIkiRJkiRJkgdIkiRJkiRJkg9IkiRJkiRJkn9IkiRJkiR5A7+Q0Q/Oq+iZAAAAAElFTkSuQmCC\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ─── Foreground content ─────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pt-40 pb-12 md:pb-16 flex flex-col items-start">

        {/* Eyebrow with Inline Logo - Optically Aligned & SEO Optimized */}
        <div className="reveal flex items-center gap-5 mb-8">
          <img
            src={mainLogo}
            alt="Sunwest Builds - General Contractors and Whole Home Renovations in Vaughan"
            className="h-20 md:h-24 w-auto object-contain drop-shadow-lg -translate-y-2 md:-translate-y-3"
          />
          <span className="block w-10 md:w-16 h-px" style={{ backgroundColor: "#C9802A" }} />
          <h1 className="text-sm tracking-[0.3em] uppercase font-medium text-white/65 m-0">
            Whole Home Renovations in Vaughan
          </h1>
        </div>

        {/* Headline - Downgraded to H2 to preserve design while keeping H1 focused on location */}
        <h2 className="reveal font-display font-medium tracking-tighter leading-[0.98] text-5xl md:text-7xl lg:text-8xl max-w-5xl [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
          <span className="block text-white">Commercial-Grade Precision.</span>
          <span className="block text-white/55">Residential Care.</span>
        </h2>

        {/* Subtext - Expanded to catch secondary keywords */}
        <p className="reveal mt-8 text-lg md:text-xl leading-relaxed text-white/75 max-w-xl [text-shadow:0_1px_20px_rgba(0,0,0,0.7)]">
          Bringing over a decade of enterprise project management to luxury whole-home remodeling, high-end interiors, and complex structural renovations across Vaughan and Toronto.
        </p>

        {/* CTAs */}
        <div className="reveal mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#contact"
            data-testid="hero-cta-primary"
            className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.01]"
            style={{ backgroundColor: "#C9802A", color: "#000000" }}
          >
            Start Your Project
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#projects"
            data-testid="hero-cta-secondary"
            className="group inline-flex items-center gap-2 text-sm font-bold tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors [text-shadow:0_1px_20px_rgba(0,0,0,0.7)]"
          >
            View Our Work
            <span
              className="block h-px w-6 transition-all duration-300 group-hover:w-10"
              style={{ backgroundColor: "#C9802A" }}
            />
          </a>
        </div>

        {/* ─── Stats row - Converted to a semantic Description List (<dl>) ─── */}
        <dl
          className="reveal mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 pt-10 w-full"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
          data-testid="hero-stats"
        >
          {[
            ["10+", "Years On Site"],
            ["2000+", "Units Managed"],
            ["Precision", "Quality Management"],
            ["Luxury", "Remodeling Focus"],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col">
              <span className="block w-6 h-[2px] mb-4" style={{ backgroundColor: "#C9802A" }} />
              <dd className="font-display text-2xl md:text-3xl font-medium tracking-tight text-white leading-none m-0">
                <AnimatedCounter text={value} />
              </dd>
              <dt className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/45">
                {label}
              </dt>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}