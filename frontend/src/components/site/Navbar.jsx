import React, { useEffect, useState } from "react";
import { Menu, X, Sun } from "lucide-react";
import sunwestLogo from "../../images/sunwestlogo.png";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
        ? "backdrop-blur-xl bg-white/80 border-b border-black/5"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => handleAnchor(e, "#top")}
          data-testid="logo-link"
          className="flex items-center gap-3 group"
        >
          <div className="flex items-center">
            <span className={`font-sans text-xl font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${scrolled ? "text-brand-ink" : "text-white"}`}>
              Sunwest <span className={`font-light transition-colors duration-500 ${scrolled ? "text-brand-ink/60" : "text-gray-300"}`}>Builds</span>
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleAnchor(e, l.href)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={`nav-link text-sm tracking-wide transition-colors duration-500 ${scrolled ? "text-brand-ink/80 hover:text-brand-ink" : "text-white/80 hover:text-white"}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleAnchor(e, "#contact")}
          data-testid="navbar-quote-button"
          className="hidden md:inline-flex cta-accent items-center bg-brand-accent hover:bg-brand-accentHover text-white px-6 py-3 text-sm font-medium tracking-wide transition-colors"
        >
          Get a Quote
        </a>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((s) => !s)}
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 transition-colors duration-500 ${scrolled ? "text-brand-ink" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleAnchor(e, l.href)}
                data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                className="text-base text-brand-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleAnchor(e, "#contact")}
              data-testid="mobile-quote-button"
              className="inline-flex justify-center bg-brand-accent text-white px-6 py-3 text-sm font-medium"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
