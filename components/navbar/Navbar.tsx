"use client";

import { useState } from "react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { ChevronDown, HamburgerIcon } from "@/lib/icons";

const navGlassStyle: React.CSSProperties = {
  background: "rgba(8, 16, 52, 0.5)",
  backdropFilter: "blur(20px) saturate(1.8)",
  WebkitBackdropFilter: "blur(20px) saturate(1.8)",
  boxShadow:
    "0 2px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(100,150,255,0.06)",
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4">
      <nav
        className="w-full flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 rounded-xl border border-white/[0.08] gap-4"
        style={navGlassStyle}
      >
        {/* Logo */}
        <Image
          src="/markition-logo.svg"
          alt="Markition"
          width={120}
          height={28}
          priority
          className="h-[26px] sm:h-[28px] w-auto flex-shrink-0"
        />

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[13px] text-white font-normal flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="hover:text-white/95 transition-colors duration-150 flex items-center gap-1 whitespace-nowrap px-2.5 py-1.5 rounded-lg hover:bg-white/[0.05]"
            >
              {link.label}
              {"dropdown" in link && link.dropdown && <ChevronDown />}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-[12.5px] font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[5px] flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Book Free Consultation</span>
            <span className="sm:hidden">Book Now</span>
            <span aria-hidden="true" className="text-[11px]">→</span>
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.08] transition-colors duration-150"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? "480px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-6px)",
          transition:
            "max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease, transform 0.22s ease",
        }}
      >
        <div
          className="w-full mt-1.5 border border-white/[0.08] overflow-hidden"
          style={navGlassStyle}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href="#"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-5 py-3.5 text-[13.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors duration-150 ${
                i < NAV_LINKS.length - 1 ? "border-b border-white/[0.05]" : ""
              }`}
            >
              <span>{link.label}</span>
              {"dropdown" in link && link.dropdown ? (
                <ChevronDown />
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-30">
                  <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          ))}
          <div className="p-4 border-t border-white/[0.05]">
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white text-[13.5px] font-medium px-5 py-2.5 rounded-[5px] transition-colors duration-150"
            >
              Book Free Consultation →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
