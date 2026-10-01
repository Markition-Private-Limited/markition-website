"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "1",
    title: "Discovery",
    desc: "We start by understanding your workflow, your team, and your goals — before writing a single line of code.",
  },
  {
    num: "2",
    title: "Architecture",
    desc: "We map out your CRM, ERP, or platform structure so every feature has a clear, logical place.",
  },
  {
    num: "3",
    title: "Development",
    desc: "Our developers build on React, Next.js, WordPress, or Shopify — whichever fits your project best.",
  },
  {
    num: "4",
    title: "Testing & Launch",
    desc: "Every system is tested across devices and use cases before it ever reaches your customers.",
  },
  {
    num: "5",
    title: "Support",
    desc: "We stay on after launch, fixing issues fast and helping your software grow as you do.",
  },
];

// ── Desktop SVG: 800 × 720 landscape ──────────────────────────────────────
const DOTS: [number, number][] = [
  [50,  390],
  [355, 195],
  [700, 80],
  [685, 360],
  [375, 510],
];

const PATH =
  "M 0,390 C 25,390 28,390 50,390 " +
  "C 190,390 248,195 355,195 " +
  "C 505,195 610,80 700,80 " +
  "C 765,80 762,360 685,360 " +
  "C 575,360 488,510 375,510";

const TEXT_POS: { l: string; t: string; w: number }[] = [
  { l: "8%",  t: "53%", w: 205 },
  { l: "34%", t: "29%", w: 215 },
  { l: "59%", t: "13%", w: 215 },
  { l: "57%", t: "51%", w: 215 },
  { l: "35%", t: "72%", w: 205 },
];

const NUM_POS: [string, string][] = [
  ["0%",  "65%"],
  ["27%", "40%"],
  ["55%", "22%"],
  ["55%", "63%"],
  ["27%", "80%"],
];


export function ProcessSection() {
  const pathRef    = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [pathLen,  setPathLen]  = useState(2000);

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

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    >
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-center px-4 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-14 lg:py-20">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#062283]">
              The Markition Way
            </p>
            <h2 className="text-[28px] font-black leading-[1.0] tracking-[-1px] text-[#080b3f] sm:text-[34px] sm:tracking-[-1.5px] md:text-[48px]">
              How We Build Your Software
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-gray-500">
              A clear, proven process — from discovery to post-launch support — so your software ships right and keeps running.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[#080b3f] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#062283]"
            >
              Get Started
            </a>
            <svg
              className="mt-14 h-8 w-8 fill-current text-[#1d1d1f] opacity-70"
              viewBox="0 0 24 24"
            >
              <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
            </svg>
          </div>

          {/* ── DESKTOP: landscape snake diagram ── */}
          <div
            className="relative hidden lg:block"
            style={{ paddingBottom: "90%" }}
          >
            <div className="absolute inset-0">
              {steps.map((s, i) => (
                <span
                  key={s.num}
                  className="pointer-events-none absolute select-none font-black leading-none text-[#d0cfc8]"
                  style={{
                    left: NUM_POS[i][0],
                    top:  NUM_POS[i][1],
                    fontSize: "clamp(80px, 10vw, 130px)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </span>
              ))}

              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className="absolute"
                  style={{ left: TEXT_POS[i].l, top: TEXT_POS[i].t, maxWidth: TEXT_POS[i].w }}
                >
                  <h3 className="text-sm font-black leading-tight text-[#080b3f] md:text-[15px]">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-5 text-gray-400">{s.desc}</p>
                </div>
              ))}

              <svg
                viewBox="0 0 800 720"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full"
                style={{ overflow: "visible" }}
              >
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
                      ? "stroke-dashoffset 2.4s cubic-bezier(0.4,0,0.2,1)"
                      : "none",
                  }}
                />
                {DOTS.map(([cx, cy], i) => (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="9" fill="white" stroke="#062283" strokeWidth="2"
                      style={{ opacity: animated ? 1 : 0, transition: `opacity 0.3s ease ${0.4 * i + 0.6}s` }}
                    />
                    <circle cx={cx} cy={cy} r="4" fill="#062283"
                      style={{ opacity: animated ? 1 : 0, transition: `opacity 0.3s ease ${0.4 * i + 0.7}s` }}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* ── MOBILE: vertical timeline ── */}
          <div className="block px-5 pb-14 sm:px-10 lg:hidden">
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-[3px] bg-[#062283]/25" />

              <div className="flex flex-col gap-9">
                {steps.map((s) => (
                  <div key={s.num} className="relative flex items-start gap-5">
                    {/* Dot: large gray halo → blue ring → white center */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-[#062283] bg-white">
                        <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="pt-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#062283]">
                        Step {s.num}
                      </p>
                      <h3 className="mt-1 text-[18px] font-black leading-snug text-[#080b3f]">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-gray-500">{s.desc}</p>
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
