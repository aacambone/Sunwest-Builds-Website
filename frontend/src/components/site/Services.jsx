import React from "react";
import { Hammer, Home, Wrench, ClipboardList, Box, Building, Bath, Frame, Warehouse, ArrowUpRight } from "lucide-react";

import constructionMgmtImg from "../../images/framing.jpg";
import customMillworkImg from "../../images/customcabinets.jpg";
import JustinGarage from "../../images/pic26.jpeg";
import StructuralgutsImg from "../../images/structuralguts.jpg";
import CustomCabinets from "../../images/customcabs2.png";
import FamilyRoomPic from "../../images/minimalfamilyroom.png";
import ConManagement from "../../images/constructionmanagement.png";
import Deckphoto from "../../images/outsidedeck.png";
import Basementcard from "../../images/Basementcard.png";
import bathroompic from "../../images/bathroomflick.jpg";
import Loadbearingwall from "../../images/loadbearing.png";

const services = [
  {
    icon: Wrench,
    title: "Complete Interior Demolition",
    body: "Interior tear-outs taken down to the studs, handled with strict dust containment, HEPA air filtration, and rigorous health and safety protocols. Every load of debris is sorted for responsible disposal and recycling, leaving a clean, protected site.",
    img: StructuralgutsImg,
  },
  {
    icon: Frame,
    title: "Structural Home Modifications",
    body: "Opening up your floor plan safely. We remove load-bearing walls, engineer and install steel or LVL beams, and reframe to spec, so you get the open layout you want without compromising structural integrity.",
    img: Loadbearingwall
  },
  {
    icon: Hammer,
    title: "Interior Redesign & Remodelling",
    body: "Whole-home remodelling and interior renovations. Transforming existing footprints with millimeter-tight precision, custom millwork, and premium finishes.",
    img: FamilyRoomPic,
  },
  {
    icon: Box,
    title: "Custom Millwork & Cabinetry",
    body: "Bespoke cabinetry and built-ins tailored to your space. We integrate smart storage and refined aesthetics for a truly custom living experience.",
    img: CustomCabinets,
  },
  {
    icon: Bath,
    title: "Bathrooms",
    body: "Custom bathroom renovations from layout to finish. Waterproofing, custom tile, vanities, and fixtures installed with the same precision and moisture detailing we bring to every space.",
    img: bathroompic,
  },
  {
    icon: Building,
    title: "Basement Renovations",
    body: "Transforming raw, unfinished basements into fully livable square footage. Moisture control, egress, insulation, and finishes that make the lowest level feel like part of the home.",
    img: Basementcard,
  },
  {
    icon: Warehouse,
    title: "Garage Build-Outs",
    body: "Raw garages turned into clean, functional space. Epoxy flooring, built-in cabinetry, and ceiling storage systems, or a full conversion into livable square footage when you need the extra room.",
    img: JustinGarage,
  },
  {
    icon: Home,
    title: "Exterior Transformations",
    body: "Elevating curb appeal while fortifying structural integrity. From architectural window installations and contemporary siding to complete outdoor living extensions.",
    img: Deckphoto,
  },
  {
    icon: ClipboardList,
    title: "Construction Management",
    body: "End-to-end superintendence: trades, schedule, budget, inspections and quality closeout. We're organized to save you the headache.",
    img: ConManagement,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="bg-brand-surface py-28 md:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div className="reveal max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-brand-accent" />
              <span className="text-xs tracking-[0.28em] uppercase text-brand-smoke font-medium">
                Our Capabilities
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-brand-ink tracking-tighter leading-[1.05]">
              Built from the studs up.
            </h2>
          </div>
          <p className="text-base md:text-lg text-brand-smoke max-w-sm reveal pb-2">
            We bring enterprise-grade discipline to residential builds. From structural guts to final finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                data-testid={`service-card-${i}`}
                className="reveal group bg-white border border-brand-line p-8 md:p-10 flex flex-col transition-all duration-500 hover:border-brand-ink hover:-translate-y-1"
              >
                <div className="aspect-[4/3] w-full overflow-hidden mb-8 bg-brand-surface2">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between mb-5">
                  <Icon size={22} className="text-brand-ink" strokeWidth={1.5} />
                  <span className="text-xs tracking-widest uppercase text-brand-muted">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-[26px] font-medium text-brand-ink leading-tight">
                  {s.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-brand-smoke flex-1">
                  {s.body}
                </p>
                <a
                  href="#contact"
                  data-testid={`service-cta-${i}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-ink group-hover:text-brand-accent transition-colors"
                >
                  Discuss your scope
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
