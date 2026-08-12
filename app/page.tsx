"use client";

import { useState, useEffect, useRef } from "react";
import TubesCursor from "@/components/TubesCursor";

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

/* Animated hamburger → close icon */
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
      {/* top bar — rotates to diagonal */}
      <line
        x1="3"
        y1="6"
        x2="17"
        y2="6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transformOrigin: "10px 6px",
          transform: open ? "rotate(45deg) translateY(4px)" : "rotate(0deg) translateY(0)",
          transition: "transform 0.25s ease",
        }}
      />
      {/* middle bar — fades out */}
      <line
        x1="3"
        y1="10"
        x2="17"
        y2="10"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 0.15s ease",
        }}
      />
      {/* bottom bar — rotates to diagonal */}
      <line
        x1="3"
        y1="14"
        x2="17"
        y2="14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
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

  /* 4 copies → -50% animation is always gapless */
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
      className="min-h-screen bg-[#000028] text-white"
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
    >
      {/* ══ Hero section — canvas lives here ═══════════════════════════ */}
      <div className="relative bg-[#000028]">
        {/* Three.js tubes cursor — absolute, z-0, first section only */}
        <TubesCursor />

        {/* ── Sticky navbar wrapper ─────────────────────────────────────── */}
      <div className="sticky top-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">

        {/* Floating translucent navbar */}
        <nav
          className="max-w-[1200px] mx-auto flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-xl border border-white/[0.08] gap-4"
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

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Primary CTA — always visible */}
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-[12.5px] font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[5px] flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Book Free Consultation</span>
              <span className="sm:hidden">Book Now</span>
              <span aria-hidden="true" className="text-[11px]">→</span>
            </a>

            {/* Hamburger — mobile/tablet only */}
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
            transition: "max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease, transform 0.22s ease",
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
                {"dropdown" in link && link.dropdown
                  ? <ChevronDown />
                  : <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-30"><path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                }
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

      {/* ── Hero content (above canvas) ──────────────────────────────── */}
      <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-6">

        {/* ── Hero content — centered ──────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto pt-14 sm:pt-20 pb-10 sm:pb-16 px-4">
          <h1
            className="text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.18] text-white mb-5"
            style={{
              fontFamily:
                "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            Your AI Powered Growth Team Ready To Run Your Business
          </h1>

          <p className="text-[#fffff] text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
            Finally growth that accelerates every part of your business forward.
            Your AI powered growth team brings more clients, improves
            operations, boosts revenue and keeps your business moving.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="text-white text-sm font-medium px-6 py-3 rounded-[5px] flex items-center gap-2 transition-colors"
              style={{ background: "#0137D7" }}
            >
              Book A Free Audit <span aria-hidden="true">→</span>
            </a>
            <a
              href="#"
              className="border border-white hover:border-white/70 text-white text-sm font-medium px-6 py-3 rounded-[5px] flex items-center gap-2 transition-colors"
            >
              View Portfolio <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto grid grid-cols-3 pb-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className={`flex flex-col items-center justify-center py-7 px-4 text-center ${
                i < STATS.length - 1 ? "border-r border-[#1a3361]" : ""
              }`}
            >
              <span
                className="text-4xl sm:text-5xl font-bold mb-1.5 leading-none"
                style={{
                  color: "#FAAE10",
                  fontFamily:
                    "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[11px] sm:text-xs text-white leading-snug">
                {stat.line1}
                <br />
                {stat.line2}
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>{/* ── end hero section wrapper ── */}

      {/* ── Logo ticker band ──────────────────────────────────────────── */}
      <div
        className="overflow-hidden py-8 sm:py-10"
        style={{ background: "#0137D7" }}
      >
        <div className="ticker-track flex items-center w-max">
          {tickerItems.map((logo, i) => (
            <div
              key={i}
              className="flex items-center px-12 sm:px-16 select-none flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-7 sm:h-8 w-auto object-contain brightness-0 invert"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust footer ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-5 py-4 px-6 sm:px-12 max-w-4xl mx-auto">
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(217, 217, 217, 0.4)" }}
        />
        <div className="flex items-center gap-2.5 text-white text-[11px] tracking-[0.2em] uppercase whitespace-nowrap">
          <span>Join the 200+ companies trusting</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/markition-logo.svg"
            alt="Markition"
            className="h-[18px] w-auto"
          />
        </div>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(217, 217, 217, 0.4)" }}
        />
      </div>
    </div>
  );
}
