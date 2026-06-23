import React from "react";
// 1. Imported the logo here
import sunwestLogo from "../../images/sunwestlogo.png";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="bg-brand-ink text-white/70"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              {/* 2. Swapped the placeholder for the styled image badge */}
              <div className="w-10 h-10 rounded-md overflow-hidden shadow-sm flex-shrink-0">
                <img
                  src={sunwestLogo}
                  alt="Sunwest Builds - General Contractors and Custom Home Builders"
                  className="w-full h-full object-cover scale-[1.2]"
                  loading="lazy"
                />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Sunwest <span className="text-white/55 font-light">Builds</span>
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed max-w-xs">
              Where commercial-grade precision meets custom luxury residential
              construction. Specializing in complete home renovations and structural builds.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.28em] text-white/40 mb-5">
              Navigate
            </div>
            {/* Added a semantic <nav> wrapper for the footer links */}
            <nav aria-label="Footer Navigation">
              <ul className="space-y-3 text-sm">
                {[
                  ["Experience", "#experience"],
                  ["Services", "#services"],
                  ["Projects", "#projects"],
                  ["Contact", "#contact"],
                ].map(([l, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      data-testid={`footer-link-${l.toLowerCase()}`}
                      className="hover:text-brand-accent transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.28em] text-white/40 mb-5">
              Reach Out
            </div>
            {/* Converted the contact list into a semantic <address> block */}
            <address className="not-italic space-y-3 text-sm mb-8">
              <div className="block">
                <a
                  href="mailto:info@sunwestbuilds.com"
                  className="hover:text-brand-accent transition-colors"
                  data-testid="footer-email"
                >
                  info@sunwestbuilds.com
                </a>
              </div>
              <div className="block">
                <a
                  href="tel:+14167104718"
                  className="hover:text-brand-accent transition-colors"
                  data-testid="footer-phone"
                >
                  (416) 710-4718
                </a>
              </div>
            </address>

            {/* The SEO Net: Explicitly listing the service areas */}
            <div className="text-xs uppercase tracking-[0.28em] text-white/40 mb-3">
              Service Areas
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Vaughan, Toronto, Greater Toronto Area, Barrie, and Simcoe County.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/45">
          <div data-testid="footer-copyright">
            © {year} Sunwest Builds. All rights reserved.
          </div>
          {/* Swapped the design tagline for a heavy keyword tagline */}
          <div className="tracking-widest uppercase">
            General Contractors & Custom Home Builders
          </div>
        </div>
      </div>
    </footer>
  );
}