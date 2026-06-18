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
                  alt="Sunwest Badge"
                  className="w-full h-full object-cover scale-[1.2]"
                />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Sunwest <span className="text-white/55 font-light">Builds</span>
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed max-w-xs">
              Where commercial-grade precision meets custom residential
              construction. Toronto &amp; the GTA.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.28em] text-white/40 mb-5">
              Navigate
            </div>
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
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.28em] text-white/40 mb-5">
              Reach Out
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@sunwestbuilds.com"
                  className="hover:text-brand-accent transition-colors"
                  data-testid="footer-email"
                >
                  info@sunwestbuilds.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+14167104718"
                  className="hover:text-brand-accent transition-colors"
                  data-testid="footer-phone"
                >
                  (416) 710-4718
                </a>
              </li>
              <li>Greater Toronto Area, ON</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/45">
          <div data-testid="footer-copyright">
            © {year} Sunwest Builds. All rights reserved.
          </div>
          <div className="tracking-widest uppercase">
            Built on enterprise discipline.
          </div>
        </div>
      </div>
    </footer>
  );
}