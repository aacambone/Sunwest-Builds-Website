import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import pic1 from "../../images/pic1.jpeg";
import pic2 from "../../images/pic2.jpeg";
import pic3 from "../../images/pic3.jpeg";
import pic4 from "../../images/pic4.jpeg";
import pic5 from "../../images/pic5.jpeg";
import pic6 from "../../images/pic6.jpeg";
import pic7 from "../../images/pic7.jpeg";
import pic8 from "../../images/pic8.jpeg";
import pic9 from "../../images/pic9.jpeg";
import pic10 from "../../images/pic10.jpeg";
import pic11 from "../../images/pic11.jpeg";
import pic12 from "../../images/pic12.jpeg";
import pic13 from "../../images/pic13.jpeg";
import pic14 from "../../images/pic14.jpeg";
import pic15 from "../../images/pic15.jpeg";
import pic16 from "../../images/pic16.jpeg";
import pic17 from "../../images/pic17.jpeg";
import pic18 from "../../images/pic18.jpeg";
import pic19 from "../../images/pic19.jpeg";
import pic20 from "../../images/pic20.jpeg";
import pic21 from "../../images/pic21.jpeg";
import pic22 from "../../images/pic22.jpeg";
import pic23 from "../../images/pic23.jpeg";
import pic24 from "../../images/pic24.jpeg";
import pic25 from "../../images/pic25.jpeg";
import pic26 from "../../images/pic26.jpeg";
import pic27 from "../../images/pic27.jpeg";
import pic28 from "../../images/pic28.jpeg";

// ─── WORK CATEGORIES ─────────────────────────────────────────────────────────
const categories = [
    {
        id: "kitchens",
        label: "01",
        eyebrow: "Kitchens",
        headline: "Where the home comes alive",
        description:
            "Cabinet-to-ceiling overhauls, custom millwork, continuous-vein stone surfaces, and structural wall removals that open kitchens to the living space. Every detail spec'd to the millimeter.",
        scope: "Full Kitchen Guts",
        timeline: "4–8 Weeks",
        highlight: pic11,
        gallery: [pic11, pic4, pic8, pic12,],
        accent: "#C9A96E",
    },
    {
        id: "garages",
        label: "02",
        eyebrow: "Garages & Utility",
        headline: "Built for function, finished for life",
        description:
            "Epoxy floors, built-in cabinetry, and ceiling storage systems that convert raw garages into fully organized utility spaces. Clean lines. Zero clutter.",
        scope: "Full Garage Build-Outs",
        timeline: "2–4 Weeks",
        highlight: pic26,
        gallery: [pic26,],
        accent: "#7EB8A4",
    },
    {
        id: "living-spaces",
        label: "03",
        eyebrow: "Living Spaces",
        headline: "Open, warm, and tailored to how you live",
        description:
            "Accent walls, built-in shelving, and fireplace surrounds that unify fragmented main floors into one continuous, livable whole. Designed around how families actually use the space.",
        scope: "Main Floor Renovations",
        timeline: "3–6 Weeks",
        highlight: pic10,
        gallery: [pic10, pic5, pic3, pic2,],
        accent: "#D4836A",
    },
    {
        id: "exteriors",
        label: "04",
        eyebrow: "Exteriors",
        headline: "The first impression, reimagined",
        description:
            "Siding, soffit, fascia, and front entry transformations, like our recent Sanford project in Springwater, with landscaping prep and drainage handled concurrently on a single tight schedule.",
        scope: "Full Exterior Packages",
        timeline: "4–6 Weeks",
        location: "Springwater, ON",
        highlight: pic20,
        gallery: [pic20, pic25, pic19,],
        accent: "#8FA8C8",
    },
];

const EASE = [0.22, 1, 0.36, 1];

// ─── LIGHTBOX COMPONENT ──────────────────────────────────────────────────────
function Lightbox({ category, onClose }) {
    const [current, setCurrent] = useState(0);
    const all = category.gallery;

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % all.length);
            if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + all.length) % all.length);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [all.length, onClose]);

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
            <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/10 shrink-0">
                <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-1">
                        {category.eyebrow}
                    </p>
                    <p className="text-white font-display text-lg font-medium">
                        {current + 1} / {all.length}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Close gallery"
                >
                    <X size={28} strokeWidth={1.5} />
                </button>
            </div>

            <div className="flex-1 relative overflow-hidden flex items-center justify-center px-4 md:px-16 py-6">
                <img
                    key={current}
                    src={all[current]}
                    alt={`${category.eyebrow} photo ${current + 1}`}
                    className="max-h-full max-w-full object-contain"
                    style={{ animation: "fadeIn 0.2s ease" }}
                />
                <button
                    onClick={() => setCurrent((c) => (c - 1 + all.length) % all.length)}
                    className="absolute left-3 md:left-6 p-2 text-white/60 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors"
                    aria-label="Previous photo"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => setCurrent((c) => (c + 1) % all.length)}
                    className="absolute right-3 md:right-6 p-2 text-white/60 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors"
                    aria-label="Next photo"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="shrink-0 px-6 md:px-10 pb-6 pt-2">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {all.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`shrink-0 w-16 h-12 md:w-20 md:h-14 overflow-hidden transition-all duration-200 ${i === current
                                ? "ring-2 ring-white opacity-100"
                                : "opacity-40 hover:opacity-70"
                                }`}
                        >
                            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </button>
                    ))}
                </div>
            </div>

            <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
    );
}

// ─── STACK CARD (sticky, flat 2D, scale+dim as the next card covers it) ───────
function StackCard({ category, index, total, onOpenGallery }) {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const isLast = index === total - 1;

    // Progress runs 0 → 1 across the window where THIS card is pinned and the
    // NEXT card rises to cover it (start pinned → fully scrolled under).
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Last card has nothing covering it, so it never scales/dims.
    const flat = reduce || isLast;
    const scale = useTransform(scrollYProgress, [0, 1], flat ? [1, 1] : [1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 1], flat ? [1, 1] : [1, 0.8]);

    return (
        <div ref={ref} className="h-screen sticky top-0 flex items-center justify-center px-4 md:px-8">
            <motion.div
                style={{ scale, opacity }}
                className="w-full max-w-7xl h-[82vh] max-h-[760px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row group"
            // Solid background so each card fully covers the one beneath
            // (keeps everything crisp — nothing shows through)
            // brand-charcoal-ish warm dark
            >
                {/* ── Image side ───────────────────────────────────────── */}
                <div className="relative lg:w-3/5 h-[45%] lg:h-full overflow-hidden bg-brand-charcoal">
                    <img
                        src={category.highlight}
                        alt={category.eyebrow}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Label */}
                    <div
                        className="absolute top-5 left-5 font-mono text-xs tracking-[0.3em] px-2.5 py-1.5"
                        style={{
                            backgroundColor: category.accent + "22",
                            border: `1px solid ${category.accent}55`,
                            color: category.accent,
                        }}
                    >
                        {category.label}
                    </div>

                    {/* Thumbnail strip overlay — only when there's more than the highlight to show */}
                    {category.gallery.length > 1 && (
                        <div className="absolute bottom-0 inset-x-0 p-3 flex gap-1.5">
                            {category.gallery.slice(0, 4).map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => onOpenGallery(category)}
                                    className="flex-1 aspect-video overflow-hidden bg-black/30 ring-1 ring-white/15 opacity-85 hover:opacity-100 transition-opacity duration-200"
                                >
                                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                                </button>
                            ))}
                            {category.gallery.length > 4 && (
                                <button
                                    onClick={() => onOpenGallery(category)}
                                    className="flex-1 aspect-video bg-black/40 ring-1 ring-white/15 hover:bg-black/60 transition-colors flex items-center justify-center"
                                >
                                    <span className="text-xs text-white/70 font-medium">
                                        +{category.gallery.length - 4}
                                    </span>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Text side ────────────────────────────────────────── */}
                <div className="lg:w-2/5 h-[55%] lg:h-full flex flex-col justify-center p-6 md:p-10 lg:p-12 overflow-y-auto bg-[#17130F]">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="block w-6 h-px" style={{ backgroundColor: category.accent }} />
                        <span
                            className="text-xs tracking-[0.3em] uppercase font-medium"
                            style={{ color: category.accent }}
                        >
                            {category.eyebrow}
                        </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-[1.15] mb-5">
                        {category.headline}
                    </h3>

                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-7">
                        {category.description}
                    </p>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 mb-8">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-1">Scope</p>
                            <p className="text-sm font-medium text-white/85">{category.scope}</p>
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-1">Typical Timeline</p>
                            <p className="text-sm font-medium text-white/85">{category.timeline}</p>
                        </div>
                        {category.location && (
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-1">Featured Location</p>
                                <p className="text-sm font-medium text-white/85">{category.location}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-1">Photos</p>
                            <p className="text-sm font-medium text-white/85">{category.gallery.length} {category.gallery.length === 1 ? "image" : "images"}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => onOpenGallery(category)}
                        className="group/btn self-start inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase transition-colors"
                        style={{ color: category.accent }}
                    >
                        View Full Gallery
                        <ArrowUpRight
                            size={15}
                            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function ProjectStudy() {
    const [activeCategory, setActiveCategory] = useState(null);
    const reduce = useReducedMotion();

    return (
        <>
            <section id="projects" className="bg-brand-ink text-white pt-24 md:pt-32">
                {/* Section header */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12 md:mb-16">
                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="block w-10 h-px bg-brand-accent" />
                                <span className="text-xs tracking-[0.28em] uppercase text-white/50 font-medium">
                                    Our Work
                                </span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">
                                Craftsmanship,<br className="hidden md:block" /> space by space.
                            </h2>
                        </div>
                        <p className="text-white/55 text-base leading-relaxed max-w-xs">
                            From kitchens to curb appeal. Explore our work across every part of the home.
                        </p>
                    </motion.div>
                </div>

                {/* Sticky stacking deck */}
                <div className="relative pb-[12vh]">
                    {categories.map((category, i) => (
                        <StackCard
                            key={category.id}
                            category={category}
                            index={i}
                            total={categories.length}
                            onOpenGallery={setActiveCategory}
                        />
                    ))}
                </div>
            </section>

            {activeCategory && (
                <Lightbox category={activeCategory} onClose={() => setActiveCategory(null)} />
            )}
        </>
    );
}
