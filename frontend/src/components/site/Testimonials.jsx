import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How do you keep projects on schedule and on budget?",
    a: "We run residential renovations with the same discipline used on commercial sites. That means critical-path scheduling, detailed scopes locked in before work begins, and fixed budgets agreed up front. You'll know your timeline and your number before we ever pick up a tool, and we communicate proactively if anything needs to change.",
  },
  {
    q: "Do you handle permits and inspections?",
    a: "Yes. Permit applications, drawings coordination, and city inspections are all managed end-to-end as part of the project. Having spent years handling inspections on enterprise developments, we know how to keep this part of the process smooth and code-compliant.",
  },
  {
    q: "Will I be able to reach someone during my project?",
    a: "Always. Justin is available nearly every day and is your direct point of contact throughout. No call centers, no being passed between people. Questions, updates, and concerns are answered quickly and directly.",
  },
  {
    q: "What types of projects do you take on?",
    a: "Full structural guts, interior remodels, kitchen and bathroom renovations, custom millwork, basement conversions, additions, and complete exterior transformations. If you're not sure whether your project is a fit, reach out. We're happy to talk through your scope.",
  },
  {
    q: "How is pricing structured?",
    a: "After an initial consultation and site assessment, you'll receive a detailed written quote broken down by scope. We believe in transparency: no vague estimates, no surprise charges mid-project. What you sign off on is what you pay, barring any changes you request along the way.",
  },
  {
    q: "What areas do you serve?",
    a: "We work throughout the Greater Toronto Area and surrounding regions. If you're outside the GTA & Surrounding areas, get in touch. We may still be able to help.",
  },
];

// ─── ACCORDION ITEM ──────────────────────────────────────────────────────────
function FaqItem({ faq, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div style={{ borderBottom: "1px solid #DDD8D0" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 text-left py-7 md:py-8 group"
        aria-expanded={isOpen}
      >
        <span
          className="font-display text-lg md:text-xl font-medium tracking-tight transition-colors"
          style={{ color: isOpen ? "#C9802A" : "#1A1A1A" }}
        >
          {faq.q}
        </span>
        <span
          className="shrink-0 mt-1 transition-transform duration-300 ease-out"
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            color: isOpen ? "#C9802A" : "#A09080",
          }}
        >
          <Plus size={22} strokeWidth={1.75} />
        </span>
      </button>

      {/* Animated expanding panel */}
      <div
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pb-7 md:pb-8 pr-10">
          <p className="text-base leading-relaxed" style={{ color: "#5A5048" }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-28 md:py-40"
      style={{ backgroundColor: "#F5F2EE" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT: Sticky heading */}
          <div className="lg:col-span-4 reveal">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-10 h-px bg-brand-accent" />
                <span
                  className="text-xs tracking-[0.28em] uppercase font-medium"
                  style={{ color: "#8A7D6B" }}
                >
                  Common Questions
                </span>
              </div>
              <h2
                className="font-display text-4xl md:text-5xl font-medium tracking-tighter leading-[1.05]"
                style={{ color: "#1A1A1A" }}
              >
                Everything you<br className="hidden md:block" /> want to know.
              </h2>
              <p
                className="mt-8 text-base leading-relaxed max-w-xs"
                style={{ color: "#5A5048" }}
              >
                Still have a question we haven&apos;t covered? Reach out directly and we&apos;re
                happy to talk through your project.
              </p>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase mt-8 transition-colors"
                style={{ color: "#C9802A" }}
              >
                Get in touch
                <span
                  className="block w-8 h-px transition-all duration-300 group-hover:w-12"
                  style={{ backgroundColor: "#C9802A" }}
                />
              </a>
            </div>
          </div>

          {/* RIGHT: Accordion */}
          <div className="lg:col-span-8 reveal">
            <div style={{ borderTop: "1px solid #DDD8D0" }}>
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
