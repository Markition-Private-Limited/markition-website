"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const COLS = 12;
  const ROWS = 8;
  const total = COLS * ROWS;

  function getCellBg(idx: number) {
    if (hoveredCell === null) return "bg-transparent";
    const row = Math.floor(idx / COLS);
    const col = idx % COLS;
    const hRow = Math.floor(hoveredCell / COLS);
    const hCol = hoveredCell % COLS;
    const dist = Math.abs(row - hRow) + Math.abs(col - hCol);
    if (dist === 0) return "bg-[#c2ceff]";
    if (dist === 1) return "bg-[#dde3ff]";
    if (dist === 2) return "bg-[#eef1ff]";
    return "bg-transparent";
  }

  return (
    <section className="min-h-screen w-full overflow-hidden bg-[#f4f1ff]">
      <div className="relative min-h-screen w-full overflow-hidden rounded-none pt-8 bg-[#fbfbfb] px-4 shadow-[0_30px_80px_rgba(110,100,180,0.18)] sm:px-6 md:px-10 md:pt-20 lg:px-0 lg:pt-24">
        {/* Interactive grid background */}
        <div className="absolute inset-0 z-10 pointer-events-auto" style={{ touchAction: "pan-y" }}>
          <div
            className="grid h-full w-full"
            style={{ gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "repeat(8, 1fr)" }}
          >
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`border-r border-b border-[#e4e4e4] transition-colors duration-500 ${getCellBg(i)}`}
                style={{ cursor: "crosshair", touchAction: "pan-y" }}
                onMouseEnter={() => setHoveredCell(i)}
                onMouseLeave={() => setHoveredCell(null)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="pointer-events-none relative z-20 flex min-h-[calc(100vh-230px)] md:min-h-[calc(100vh-80px)] flex-col items-center justify-center text-center lg:-mt-16">
          <p className="mb-4 text-[9px] uppercase tracking-[0.22em] text-[#666b74] sm:text-[10px] md:text-[12px] md:tracking-[0.25em]">
            TECHNOLOGY / DIGITAL INFRASTRUCTURE
          </p>
          <div className="leading-none">
            <h1 className="text-[36px] font-black text-[#20232d] sm:text-[44px] md:text-[52px] lg:text-[60px]">
              We Build
            </h1>
            <div className="relative -mt-3 flex items-center justify-center sm:-mt-5 lg:-mt-8">
              <span className="text-[68px] font-black tracking-[-4px] text-[#20232d] sm:text-[76px] md:text-[105px] md:tracking-[-6px] lg:text-[140px] lg:tracking-[-8px]">
                Technology
              </span>
              <div className="absolute -right-5 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#062283] text-white sm:-right-7 sm:h-8 sm:w-8 md:-right-8 md:h-9 md:w-9 lg:right-[-38px] lg:top-3 lg:h-10 lg:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-center gap-2 sm:gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 rotate-[-15deg] fill-current md:h-12 md:w-12"><path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/></svg>
              <h2 className="text-[34px] font-black text-[#20232d] sm:text-[42px] md:text-[52px] lg:text-[60px]">
                Around Your Business.
              </h2>
            </div>
          </div>

          <p className="mt-6 max-w-[320px] text-sm leading-6 text-[#737780] sm:max-w-md md:mt-8 md:text-base">
            We don&apos;t hand you a website and disappear. Every CRM, ERP, or custom platform we build is engineered to grow with your business for years, not months.
          </p>

          <div className="pointer-events-auto mt-7 flex w-full max-w-[320px] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#080b3f] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:px-8 md:py-4"
            >
              Start a Project
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/portfolio"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#080b3f] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#080b3f] transition-all duration-300 hover:-translate-y-1 hover:bg-[#080b3f] hover:text-white md:px-8 md:py-4"
            >
              Explore Our Solutions
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Decorative tick marks */}
        <div className="pointer-events-none absolute left-[10%] top-[52%] z-30 h-6 w-[2px] bg-[#4f5eff]" />
        <div className="pointer-events-none absolute bottom-[20%] left-[24%] z-30 h-5 w-[2px] bg-[#d7b06f]" />
        <div className="pointer-events-none absolute bottom-[22%] right-[20%] z-30 h-5 w-[2px] bg-[#4f5eff]" />
        <div className="pointer-events-none absolute right-[8%] top-[42%] z-30 h-6 w-[2px] bg-[#d7b06f]" />
      </div>
    </section>
  );
}
