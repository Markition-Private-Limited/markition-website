"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "1",
    title: "Your Idea Takes Shape",
    desc: "We listen, research, and map your vision into a clear strategy with defined milestones.",
  },
  {
    num: "2",
    title: "Beautiful & Functional UI/UX",
    desc: "Interactive prototypes and user-tested designs before writing a single line of code.",
  },
  {
    num: "3",
    title: "Code Meets Craft",
    desc: "Agile sprints, weekly demos, and production-grade engineering from day one.",
  },
  {
    num: "4",
    title: "Quality Assurance",
    desc: "Automated and manual testing across devices, browsers, and edge cases.",
  },
  {
    num: "5",
    title: "Go Live With Confidence",
    desc: "Seamless deployment, monitoring setup, and performance optimization at launch.",
  },
  {
    num: "6",
    title: "Scale & Iterate",
    desc: "Post-launch support, analytics-driven improvements, and growth-ready architecture.",
  },
];

// SVG canvas: 800 × 720  (taller for more breathing room)
// Dot positions [cx, cy]
const DOTS: [number, number][] = [
  [50,  390], // 1
  [355, 195], // 2
  [700, 80],  // 3
  [685, 360], // 4
  [375, 510], // 5
  [70,  635], // 6
];

// Smooth snake path through all dots
const PATH =
  "M 0,390 C 25,390 28,390 50,390 " +
  "C 190,390 248,195 355,195 " +
  "C 505,195 610,80 700,80 " +
  "C 765,80 762,360 685,360 " +
  "C 575,360 488,510 375,510 " +
  "C 248,510 155,635 70,635 " +
  "C 42,635 22,638 0,650";

// Text positions [left%, top%, maxWidth]
const TEXT_POS: { l: string; t: string; w: number }[] = [
  { l: "8%",   t: "53%", w: 205 }, // 1 — right of dot
  { l: "34%",  t: "29%", w: 215 }, // 2 — below dot
  { l: "59%",  t: "13%", w: 215 }, // 3 — below-left of dot
  { l: "57%",  t: "51%", w: 215 }, // 4 — below-left of dot
  { l: "35%",  t: "72%", w: 205 }, // 5 — below dot
  { l: "12%",  t: "88%", w: 205 }, // 6 — right of dot
];

// Ghost number positions [left%, top%]
const NUM_POS: [string, string][] = [
  ["0%",   "65%"],
  ["27%",  "40%"],
  ["55%",  "22%"],
  ["55%",  "63%"],
  ["27%",  "80%"],
  ["0%",   "92%"],
];

export function ProcessSection() {
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Measure path length after mount for dash animation
  const [pathLen, setPathLen] = useState(2000);
  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-16">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-[38%_62%]">
            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col justify-center px-4 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-14 lg:py-20">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#062283]">
                The Markition Way
              </p>
              <h2 className="text-[28px] font-black leading-[1.0] tracking-[-1px] text-[#080b3f] sm:text-[34px] sm:tracking-[-1.5px] md:text-[48px]">
                A Proven Process Built for Results
              </h2>
              <p className="mt-5 max-w-sm text-base leading-7 text-gray-500">
                We build secure, scalable and conversion‑focused digital systems through a clear, proven process.
              </p>
              <a
                href="/contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[#080b3f] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#062283]"
              >
                Get Started
              </a>

              {/* Cursor icon at bottom */}
              <svg
                className="mt-14 h-8 w-8 fill-current text-[#1d1d1f] opacity-70"
                viewBox="0 0 24 24"
              >
                <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
              </svg>
            </div>

            {/* ── RIGHT PANEL — snake diagram ── */}
            <div
              className="relative hidden lg:block"
              style={{ paddingBottom: "90%" }}
            >
              <div className="absolute inset-0">

                {/* Ghost step numbers */}
                {steps.map((s, i) => (
                  <span
                    key={s.num}
                    className="pointer-events-none absolute select-none font-black leading-none text-[#d0cfc8]"
                    style={{
                      left: NUM_POS[i][0],
                      top: NUM_POS[i][1],
                      fontSize: "clamp(80px, 10vw, 130px)",
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </span>
                ))}

                {/* Step text blocks */}
                {steps.map((s, i) => (
                  <div
                    key={s.num}
                    className="absolute"
                    style={{
                      left: TEXT_POS[i].l,
                      top: TEXT_POS[i].t,
                      maxWidth: TEXT_POS[i].w,
                    }}
                  >
                    <h3 className="text-sm font-black leading-tight text-[#080b3f] md:text-[15px]">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-5 text-gray-400">
                      {s.desc}
                    </p>
                  </div>
                ))}

                {/* Animated SVG path */}
                <svg
                  viewBox="0 0 800 720"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 h-full w-full"
                  style={{ overflow: "visible" }}
                >
                  {/* Animated main path */}
                  <path
                    ref={pathRef}
                    d={PATH}
                    fill="none"
                    stroke="#062283"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: pathLen,
                      strokeDashoffset: animated ? 0 : pathLen,
                      transition: animated
                        ? `stroke-dashoffset 2.4s cubic-bezier(0.4,0,0.2,1)`
                        : "none",
                    }}
                  />

                  {/* Dots at each step */}
                  {DOTS.map(([cx, cy], i) => (
                    <g key={i}>
                      {/* Outer ring */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="9"
                        fill="white"
                        stroke="#062283"
                        strokeWidth="2"
                        style={{
                          opacity: animated ? 1 : 0,
                          transition: `opacity 0.3s ease ${0.4 * i + 0.6}s`,
                        }}
                      />
                      {/* Inner fill */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill="#062283"
                        style={{
                          opacity: animated ? 1 : 0,
                          transition: `opacity 0.3s ease ${0.4 * i + 0.7}s`,
                        }}
                      />
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* ── MOBILE fallback — simple numbered list ── */}
            <div className="block px-4 pb-12 sm:px-8 sm:pb-14 lg:hidden">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {steps.map((s) => (
                  <div key={s.num} className="flex gap-4">
                    <span className="text-[52px] font-black leading-none text-gray-200 select-none">
                      {s.num}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-black text-[#080b3f]">{s.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
