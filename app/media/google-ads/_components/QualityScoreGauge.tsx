"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

/* "Good ads should learn, not just spend" — a Quality Score dial.
   Quality Score (1–10) is a real, named Google Ads metric, so the gauge reads
   as specific to this channel rather than a generic "growth chart". The
   needle sweeps in once the dial is on screen; the three factor rows beneath
   it are independently clickable, each opening its own short explanation. */

const SCORE = 8.4; // out of 10 — "what a healthy account looks like", not a claim about any client

const FACTORS = [
  {
    label: "Ad relevance",
    level: "Above average",
    fill: 88,
    detail: "How closely your ad's message matches what someone just searched for.",
  },
  {
    label: "Expected CTR",
    level: "Above average",
    fill: 82,
    detail: "The likelihood someone clicks your ad when it's shown for that keyword.",
  },
  {
    label: "Landing page experience",
    level: "Above average",
    fill: 90,
    detail: "How relevant, fast and useful your landing page is once they arrive.",
  },
];

function useRisingValue(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const frame = useRef(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // deferred one tick so this isn't a synchronous setState-in-effect
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [active, target, duration]);
  return value;
}

export default function QualityScoreGauge() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const score = useRisingValue(SCORE, inView);
  const [open, setOpen] = useState<number | null>(null);

  const frac = score / 10;
  const angle = 180 - frac * 180; // 180° = empty (pointing left), 0° = full (pointing right)
  const arcLen = 100; // using pathLength=100 so dash math is just percentages

  return (
    <div ref={ref} className="grid gap-8 sm:grid-cols-[minmax(0,260px)_1fr] sm:items-center">
      {/* Dial */}
      <div className="mx-auto w-full max-w-[260px]">
        <svg viewBox="0 0 200 118" className="w-full">
          <defs>
            <linearGradient id="gads-gauge-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#c7d1ff" />
              <stop offset="1" stopColor="#0018c5" />
            </linearGradient>
          </defs>
          <path
            d="M20,100 A80,80 0 0 1 180,100"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="14"
            strokeLinecap="round"
            pathLength={arcLen}
          />
          <path
            d="M20,100 A80,80 0 0 1 180,100"
            fill="none"
            stroke="url(#gads-gauge-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            pathLength={arcLen}
            strokeDasharray={arcLen}
            strokeDashoffset={arcLen - frac * arcLen}
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
          {/* needle */}
          <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px", transition: "transform 0.2s linear" }}>
            <line x1="100" y1="100" x2="100" y2="34" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          </g>
          <circle cx="100" cy="100" r="7" fill="#ffffff" />
        </svg>
        <div className="-mt-6 text-center">
          <div className="text-[40px] font-bold leading-none text-white" style={{ fontFamily: "var(--d)" }}>
            {score.toFixed(1)}
            <span className="text-[16px] font-semibold text-white/50">/10</span>
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#6d85ff" }}>
            Quality Score
          </div>
        </div>
      </div>

      {/* Factors */}
      <div className="flex flex-col gap-2.5">
        {FACTORS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.label}
              className="overflow-hidden rounded-2xl border transition-colors"
              style={{ borderColor: isOpen ? "rgba(109,133,255,0.45)" : "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)" }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 px-4 py-3.5 text-left"
                aria-expanded={isOpen}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-bold text-white" style={{ fontFamily: "var(--d)" }}>
                    {f.label}
                  </span>
                  <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                    <span
                      className="block h-full rounded-full transition-[width] duration-700 ease-out"
                      style={{ width: inView ? `${f.fill}%` : "0%", background: "linear-gradient(90deg,#8ea0ff,#6d85ff)" }}
                    />
                  </span>
                </span>
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.08em]"
                  style={{ background: "rgba(109,133,255,0.16)", color: "#9aabff" }}
                >
                  {f.level}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s ease", flexShrink: 0 }}
                >
                  <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-3.5 text-[12.5px] leading-relaxed text-white/60">{f.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
