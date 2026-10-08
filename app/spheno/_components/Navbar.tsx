"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SphenoLogo } from "./SphenoLogo";

interface NavbarProps {
  onOpenConsultation: () => void;
}

const NAV_LINKS = [
  { label: "SPHENO AI", href: "#system" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "How It Works", href: "#execution" },
  { label: "FAQ", href: "#faq" },
] as const;

const SOLUTIONS_MENU = [
  {
    heading: "Media",
    description: "Google Ads, SEO, social media management & paid campaigns.",
    href: "/media",
  },
  {
    heading: "Technologies",
    description: "Custom software, web apps, mobile platforms & SaaS products.",
    href: "/tech",
  },
  {
    heading: "Design Lab",
    description: "Brand identity, UI/UX design, motion graphics & print.",
    href: "/design-lab",
  },
];

const floatStyle: React.CSSProperties = {
  background: "rgba(8, 14, 38, 0.72)",
  backdropFilter: "blur(20px) saturate(1.8)",
  WebkitBackdropFilter: "blur(20px) saturate(1.8)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
};

const mobileMenuStyle: React.CSSProperties = {
  background: "rgba(8, 14, 38, 0.97)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSolutionsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-2 sm:pt-3">
      <nav
        aria-label="Main navigation"
        className="w-full flex items-center justify-between px-5 sm:px-8 py-3 sm:py-4 rounded-2xl gap-4"
        style={floatStyle}
      >
        {/* Logo */}
        <a
          href="/spheno"
          aria-label="SPHENO.AI Home"
          className="flex items-center gap-2.5 flex-shrink-0 hover:opacity-85 transition-opacity"
        >
          <SphenoLogo variant="dark" size="md" className="h-[26px] sm:h-[30px]" />
        </a>

        {/* Desktop links */}
        <ul
          role="list"
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[14px] text-white/75 font-normal flex-1 justify-center list-none m-0 p-0"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="flex items-center whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors duration-150"
              >
                {label}
              </a>
            </li>
          ))}

          {/* Solutions dropdown */}
          <li className="relative" ref={solutionsRef}>
            <button
              type="button"
              onClick={() => setSolutionsOpen((v) => !v)}
              aria-expanded={solutionsOpen}
              className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Solutions
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>

            {solutionsOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[340px] rounded-2xl overflow-hidden z-50"
                style={{
                  background: "rgba(8, 14, 38, 0.97)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
                }}
              >
                <div className="p-2">
                  {SOLUTIONS_MENU.map((sol) => (
                    <a
                      key={sol.heading}
                      href={sol.href}
                      onClick={() => setSolutionsOpen(false)}
                      className="flex items-start gap-3 rounded-xl px-4 py-3 hover:bg-white/[0.05] transition-colors duration-150 group"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400/60 group-hover:bg-blue-300 transition-colors shrink-0" />
                      <div>
                        <span className="block text-[13px] font-semibold text-white/90 group-hover:text-white transition-colors mb-0.5">
                          {sol.heading}
                        </span>
                        <span className="block text-[11.5px] text-white/40 leading-snug">
                          {sol.description}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer"
          >
            Book Free Consultation
            <span className="text-[11px]" aria-hidden="true">→</span>
          </button>

          {/* Hamburger — shown below lg */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors duration-150"
          >
            {mobileOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down */}
      <div
        id="mobile-nav"
        className="lg:hidden overflow-hidden"
        aria-hidden={!mobileOpen}
        style={{
          maxHeight: mobileOpen ? "600px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transition: "max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
        }}
      >
        <nav aria-label="Mobile navigation" className="mt-2 rounded-2xl overflow-hidden" style={mobileMenuStyle}>
          <ul role="list" className="list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="border-b border-white/[0.05]">
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-5 py-3.5 text-[13.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
                >
                  <span>{link.label}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-25">
                    <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}

            {/* Mobile Solutions accordion */}
            <li className="border-b border-white/[0.05]">
              <button
                type="button"
                onClick={() => setMobileSolutionsOpen((v) => !v)}
                aria-expanded={mobileSolutionsOpen}
                className="w-full flex items-center justify-between px-5 py-3.5 text-[13.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{ maxHeight: mobileSolutionsOpen ? "280px" : "0px" }}
              >
                <div className="px-4 pb-3 flex flex-col gap-1">
                  {SOLUTIONS_MENU.map((sol) => (
                    <a
                      key={sol.heading}
                      href={sol.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors duration-150"
                    >
                      <span className="block text-[13px] font-semibold text-white/90">{sol.heading}</span>
                      <span className="block text-[11px] text-white/40 mt-0.5 leading-snug">{sol.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          <div className="p-4 border-t border-white/[0.05]">
            <button
              type="button"
              onClick={() => { setMobileOpen(false); onOpenConsultation(); }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-[13.5px] font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-150"
            >
              Book Free Consultation
              <span className="text-[11px]" aria-hidden="true">→</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
