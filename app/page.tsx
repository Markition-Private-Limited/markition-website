"use client";

import { useState, useEffect, useRef } from "react";
import TubesCursor from "@/components/TubesCursor";
import AIServicesSection from "@/components/AIServicesSection";
import ScrollReveal from "@/components/ScrollReveal";

const NAV_LINKS = [
  { label: "About" },
  { label: "Services", dropdown: true },
  { label: "Industries", dropdown: true },
  { label: "Locations", dropdown: true },
  { label: "Resources" },
  { label: "Case Studies" },
  { label: "Portfolio" },
  { label: "Contact" },
] as const;

const STATS = [
  {
    value: 90,
    suffix: "%",
    line1: "Customer satisfaction",
    line2: "and strategical success",
  },
  {
    value: 80,
    suffix: "+",
    line1: "Projects completed in",
    line2: "24 countries",
  },
  {
    value: 52,
    suffix: "+",
    line1: "Best Business",
    line2: "Awards",
  },
] as const;

const TICKER_LOGOS = [
  { src: "/logos/logo03.png", alt: "Partner logo" },
  { src: "/logos/logo07.png", alt: "Partner logo" },
  { src: "/logos/logo11.png", alt: "Partner logo" },
  { src: "/logos/vector.png", alt: "Partner logo" },
  { src: "/logos/vector-1.png", alt: "Partner logo" },
  { src: "/logos/vector-2.png", alt: "Partner logo" },
] as const;

/* Counts up from 0 → value once the stat scrolls into view */
function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 5);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={spanRef}>
      {display}
      {suffix}
    </span>
  );
}

function ChevronDown() {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      aria-hidden="true"
      className="mt-px flex-shrink-0 opacity-60"
    >
      <path
        d="M1 1l3.5 3.5L8 1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <line
        x1="3" y1="6" x2="17" y2="6"
        stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transformOrigin: "10px 6px",
          transform: open ? "rotate(45deg) translateY(4px)" : "rotate(0deg) translateY(0)",
          transition: "transform 0.25s ease",
        }}
      />
      <line
        x1="3" y1="10" x2="17" y2="10"
        stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 0.15s ease",
        }}
      />
      <line
        x1="3" y1="14" x2="17" y2="14"
        stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transformOrigin: "10px 14px",
          transform: open ? "rotate(-45deg) translateY(-4px)" : "rotate(0deg) translateY(0)",
          transition: "transform 0.25s ease",
        }}
      />
    </svg>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const tickerItems = [
    ...TICKER_LOGOS,
    ...TICKER_LOGOS,
    ...TICKER_LOGOS,
    ...TICKER_LOGOS,
  ];

  const navGlassStyle: React.CSSProperties = {
    background: "rgba(8, 16, 52, 0.5)",
    backdropFilter: "blur(20px) saturate(1.8)",
    WebkitBackdropFilter: "blur(20px) saturate(1.8)",
    boxShadow:
      "0 2px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(100,150,255,0.06)",
  };

  return (
    <div
      className="min-h-screen w-full bg-[#000028] text-white"
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
    >
      {/* ══ Hero section ════════════════════════════════════════════════ */}
      <div
        className="relative bg-[#000028]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 900px 450px at 50% -60px, rgba(1,55,215,0.18) 0%, transparent 70%)",
        }}
      >
        {/* Three.js tubes cursor — scoped to hero section, scrolls away with it.
            z-index 1 keeps it above the background but below text (z-10). */}
        <TubesCursor />

        {/* ── Sticky navbar ─────────────────────────────────────────────── */}
        <div className="sticky top-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
          <nav
            className="max-w-[1200px] mx-auto flex items-center justify-between px-4 sm:px-5 py-3.5 rounded-none border border-white/[0.08] gap-4"
            style={navGlassStyle}
          >
            {/* Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/markition-logo.svg"
              alt="Markition"
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
              className="max-w-[1200px] mx-auto mt-1.5 rounded-xl border border-white/[0.08] overflow-hidden"
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

        {/* ── Hero content ──────────────────────────────────────────────── */}
        <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-6">

          {/* Centered hero block */}
          <div className="text-center max-w-3xl mx-auto pt-10 sm:pt-16 lg:pt-24 pb-8 sm:pb-14 lg:pb-20 px-2 sm:px-4">

            {/* Primary heading — smaller on mobile so it fits without overflow */}
            <h1
              className="hero-heading text-[28px] xs:text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] font-bold leading-[1.15] text-white mb-4 sm:mb-6"
              style={{
                fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                letterSpacing: "-0.025em",
              }}
            >
              Your AI Powered Growth Team Ready To Run Your Business
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-white/65 text-[13px] sm:text-[15px] lg:text-[16px] leading-[1.7] mb-7 sm:mb-9 max-w-[460px] mx-auto">
              Finally growth that accelerates every part of your business
              forward. Your AI powered growth team brings more clients, improves
              operations, boosts revenue and keeps your business moving.
            </p>

            {/* CTA buttons — stacked on very small screens, side-by-side from sm */}
            <div className="hero-cta flex flex-col xs:flex-row items-center justify-center gap-3">
              <a
                href="#"
                className="w-full xs:w-auto text-white text-[13px] sm:text-sm font-semibold px-6 py-2.5 sm:py-3 rounded-[6px] flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90"
                style={{ background: "#0137D7" }}
              >
                Book A Free Audit <span aria-hidden="true">→</span>
              </a>
              <a
                href="#"
                className="w-full xs:w-auto border border-white/25 hover:border-white/55 text-white text-[13px] sm:text-sm font-medium px-6 py-2.5 sm:py-3 rounded-[6px] flex items-center justify-center gap-2 transition-colors duration-200"
              >
                View Portfolio <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* ── Stats row ─────────────────────────────────────────────── */}
          <div className="hero-stats max-w-3xl mx-auto grid grid-cols-3 pb-8 sm:pb-10">
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className={`flex flex-col items-center justify-center py-5 sm:py-7 px-2 sm:px-4 text-center ${
                  i < STATS.length - 1
                    ? "border-r border-white/[0.1]"
                    : ""
                }`}
              >
                <span
                  className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 leading-none"
                  style={{
                    color: "#FAAE10",
                    fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                  }}
                >
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[10px] sm:text-[11px] lg:text-xs text-white/55 leading-snug">
                  {stat.line1}
                  <br />
                  {stat.line2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ── end hero section wrapper ── */}

      {/* ── Logo ticker band ──────────────────────────────────────────── */}
      {/* z-index above the fixed tube cursor canvas (z-index: 2) with an
          opaque background so the cursor effect never shows through it. */}
      <div
        className="relative z-10 overflow-hidden py-5 sm:py-6 lg:py-7"
        style={{ background: "#0137D7", isolation: "isolate" }}
      >
        <div className="ticker-track flex items-center w-max">
          {tickerItems.map((logo, i) => (
            <div
              key={i}
              className="flex items-center px-8 sm:px-12 lg:px-16 select-none flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-5 sm:h-6 lg:h-7 w-auto object-contain brightness-0 invert"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Edge fade overlays */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 lg:w-32 z-10"
          style={{
            background: "linear-gradient(to right, #0137D7 0%, rgba(1,55,215,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 lg:w-32 z-10"
          style={{
            background: "linear-gradient(to left, #0137D7 0%, rgba(1,55,215,0) 100%)",
          }}
        />
      </div>

      {/* ── Trust line ───────────────────────────────────────────────── */}
      <ScrollReveal threshold={0.5} className="py-5 px-6 sm:px-12 max-w-4xl mx-auto">
        {/* Mobile: stacked centre-aligned. sm+: single horizontal row with lines */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
          <div className="hidden sm:block flex-1 h-px" style={{ background: "rgba(255,255,255,0.55)" }} />
          <div className="flex flex-col xs:flex-row items-center gap-1.5 xs:gap-2.5 text-white text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-center">
            <span className="whitespace-nowrap">Join the 200+ companies trusting</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/markition-logo.svg" alt="Markition" className="h-[18px] xs:h-[20px] sm:h-[22px] w-auto brightness-0 invert" />
          </div>
          <div className="hidden sm:block flex-1 h-px" style={{ background: "rgba(255,255,255,0.55)" }} />
          {/* Mobile-only full-width line beneath */}
          <div className="block sm:hidden w-full h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
        </div>
      </ScrollReveal>

      {/* ── AI Services section ───────────────────────────────────────── */}
      <AIServicesSection />

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer
        className="py-6 px-4 sm:px-6"
        style={{
          background: "#000028",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/markition-logo.svg"
            alt="Markition"
            className="h-[22px] w-auto opacity-80"
          />
          <span className="text-white/30 text-[12px]">
            © 2025 Markition. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
