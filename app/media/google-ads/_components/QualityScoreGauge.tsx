"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

// Illustrative "healthy account" benchmark, not a claim about any client.
const FACTORS = [
  {
    label: "Ad relevance",
    level: "Above average",
    score: 8.8,
    detail: "How closely your ad's message matches what someone just searched for.",
  },
  {
    label: "Expected CTR",
    level: "Above average",
    score: 8.2,
    detail: "The likelihood someone clicks your ad when it's shown for that keyword.",
  },
  {
    label: "Landing page experience",
    level: "Above average",
    score: 9.0,
    detail: "How relevant, fast and useful your landing page is once they arrive.",
  },
];

const OVERALL = Math.round((FACTORS.reduce((s, f) => s + f.score, 0) / FACTORS.length) * 10) / 10;

const CX = 150;
const CY = 150;
const R_ARC = 110;
const ARC_PATH = `M${CX - R_ARC},${CY} A${R_ARC},${R_ARC} 0 0 1 ${CX + R_ARC},${CY}`;

function polar(value: number, r: number) {
  const theta = Math.PI - (value / 10) * Math.PI;
  return { x: CX + r * Math.cos(theta), y: CY - r * Math.sin(theta) };
}

const TICKS = Array.from({ length: 41 }, (_, i) => {
  const value = i / 4;
  const major = i % 4 === 0;
  const a = polar(value, major ? 88 : 93);
  const b = polar(value, 99);
  return { value, major, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
});

const NUMERALS = [0, 2, 4, 6, 8, 10].map((n) => ({ n, ...polar(n, 68) }));

const STIFFNESS = 150;
const DAMPING_SMOOTH = 19; // hover / reveal: settles without bounce
const DAMPING_ELASTIC = 7; // after the needle is let go: wobbles back
const STOP_MIN = -0.4;
const STOP_MAX = 10.4;

// Spring toward `target`; while `dragValue` is set the needle follows it directly.
function useSpringValue(target: number, active: boolean, dragValue: number | null) {
  const [value, setValue] = useState(0);
  const pos = useRef(0);
  const vel = useRef(0);
  const released = useRef(false);

  useEffect(() => {
    if (!active) return;

    if (dragValue !== null) {
      pos.current = dragValue;
      vel.current = 0;
      released.current = true;
      const raf = requestAnimationFrame(() => setValue(dragValue));
      return () => cancelAnimationFrame(raf);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pos.current = target;
      vel.current = 0;
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }

    const damping = released.current ? DAMPING_ELASTIC : DAMPING_SMOOTH;
    released.current = false;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      vel.current += (-STIFFNESS * (pos.current - target) - damping * vel.current) * dt;
      pos.current += vel.current * dt;
      if (pos.current > STOP_MAX || pos.current < STOP_MIN) {
        pos.current = pos.current > STOP_MAX ? STOP_MAX : STOP_MIN;
        vel.current *= -0.4;
      }
      if (Math.abs(pos.current - target) < 0.002 && Math.abs(vel.current) < 0.01) {
        pos.current = target;
        vel.current = 0;
        setValue(target);
        return;
      }
      setValue(pos.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dragValue]);

  return value;
}

export default function QualityScoreGauge() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const [drag, setDrag] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const focus = hover ?? open;
  const target = focus === null ? OVERALL : FACTORS[focus].score;
  const needle = useSpringValue(target, inView, drag);
  const score = Math.min(10, Math.max(0, needle));
  const readoutLabel = drag !== null ? "Pulling the needle" : focus === null ? "Quality Score" : FACTORS[focus].label;

  const frac = score / 10;
  const needleDeg = -90 + (Math.min(STOP_MAX, Math.max(STOP_MIN, needle)) / 10) * 180;

  const valueFromPointer = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const scale = rect.width / 300;
    const dx = e.clientX - (rect.left + CX * scale);
    const dy = rect.top + CY * scale - e.clientY;
    if (dy <= 0) return dx < 0 ? 0 : 10;
    return Math.min(10, Math.max(0, ((Math.PI - Math.atan2(dy, dx)) / Math.PI) * 10));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onMouseLeave={() => setHover(null)}
      className="group relative overflow-hidden rounded-[28px] border p-6 sm:p-8"
      style={{
        borderColor: "rgba(255,255,255,0.14)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.09), rgba(255,255,255,0.025))",
        boxShadow: "0 30px 80px rgba(0,0,40,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(360px circle at var(--mx, 50%) var(--my, 30%), rgba(109,133,255,0.2), transparent 65%)" }}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#6d85ff", boxShadow: "0 0 10px #6d85ff" }} />
            Account health
          </span>
          <span
            className="rounded-full px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em]"
            style={{ background: "rgba(109,133,255,0.16)", color: "#9aabff" }}
          >
            Illustrative benchmark
          </span>
        </div>

        {/* Analog meter — drag the needle; it springs back on release */}
        <div
          className="mx-auto mt-6 w-full max-w-[360px] select-none"
          style={{ cursor: drag !== null ? "grabbing" : "grab", touchAction: "none" }}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            setDrag(valueFromPointer(e));
          }}
          onPointerMove={(e) => {
            if (drag !== null) setDrag(valueFromPointer(e));
          }}
          onPointerUp={() => setDrag(null)}
          onPointerCancel={() => setDrag(null)}
          onLostPointerCapture={() => setDrag(null)}
        >
          <svg ref={svgRef} viewBox="0 0 300 172" className="w-full" role="img" aria-label={`${readoutLabel} ${score.toFixed(1)} out of 10`}>
            <defs>
              <linearGradient id="gads-gauge-grad" gradientUnits="userSpaceOnUse" x1={CX - R_ARC} y1="0" x2={CX + R_ARC} y2="0">
                <stop offset="0" stopColor="#3b50ff" />
                <stop offset="0.55" stopColor="#6d85ff" />
                <stop offset="1" stopColor="#c3ccff" />
              </linearGradient>
              <filter id="gads-gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            <path d={ARC_PATH} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="14" strokeLinecap="round" />
            <path
              d={ARC_PATH}
              fill="none"
              stroke="url(#gads-gauge-grad)"
              strokeWidth="14"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={100 - frac * 100}
              filter="url(#gads-gauge-glow)"
              opacity="0.6"
            />
            <path
              d={ARC_PATH}
              fill="none"
              stroke="url(#gads-gauge-grad)"
              strokeWidth="14"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={100 - frac * 100}
            />

            {TICKS.map((t) => (
              <line
                key={t.value}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={t.value <= score ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.22)"}
                strokeWidth={t.major ? 2 : 1}
                strokeLinecap="round"
              />
            ))}

            {NUMERALS.map((m) => (
              <text
                key={m.n}
                x={m.x}
                y={m.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11"
                fontWeight="600"
                fill="rgba(255,255,255,0.45)"
              >
                {m.n}
              </text>
            ))}

            <g transform={`rotate(${needleDeg} ${CX} ${CY})`} style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.55))" }}>
              <polygon points={`${CX - 4.5},${CY} ${CX},${CY - 86} ${CX + 4.5},${CY}`} fill="#ffffff" />
              <polygon points={`${CX - 4.5},${CY} ${CX + 4.5},${CY} ${CX + 2.5},${CY + 14} ${CX - 2.5},${CY + 14}`} fill="#c7d1ff" />
            </g>
            <circle cx={CX} cy={CY} r="12" fill="#0a1238" stroke={drag !== null ? "#9aabff" : "#ffffff"} strokeWidth="3" />
            <circle cx={CX} cy={CY} r="3.5" fill="#6d85ff" />
          </svg>

          <div className="mt-3 text-center" aria-live="polite">
            <div className="text-[48px] font-extrabold leading-none text-white" style={{ fontFamily: "var(--d)", letterSpacing: "-0.04em" }}>
              {score.toFixed(1)}
              <span className="ml-1 text-[18px] font-semibold text-white/45">/10</span>
            </div>
            <div className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#8ea0ff" }}>
              {readoutLabel}
            </div>
            <div className="mt-1 h-4 text-[10.5px] text-white/40">
              {drag !== null ? "Let go and it springs back" : "Drag the needle, or hover a factor below"}
            </div>
          </div>
        </div>

        {/* Factors */}
        <div className="mt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          {FACTORS.map((f, i) => {
            const isOpen = open === i;
            const isFocus = focus === i;
            return (
              <div
                key={f.label}
                className="border-b transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.1)", background: isFocus ? "rgba(109,133,255,0.08)" : "transparent" }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="flex w-full items-center gap-4 px-2 py-4 text-left sm:px-3"
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-[14px] font-bold text-white" style={{ fontFamily: "var(--d)" }}>
                        {f.label}
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="text-[12px] font-bold tabular-nums" style={{ color: isFocus ? "#ffffff" : "rgba(255,255,255,0.55)" }}>
                          {f.score.toFixed(1)}
                        </span>
                        <span
                          className="rounded-full px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.08em]"
                          style={{ background: "rgba(109,133,255,0.16)", color: "#9aabff" }}
                        >
                          {f.level}
                        </span>
                      </span>
                    </span>
                    <span className="mt-2.5 block h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <span
                        className="block h-full rounded-full transition-[width] duration-1000 ease-out"
                        style={{
                          width: inView ? `${f.score * 10}%` : "0%",
                          background: isFocus ? "linear-gradient(90deg,#6d85ff,#e1e6ff)" : "linear-gradient(90deg,#4d63ff,#a9b6ff)",
                        }}
                      />
                    </span>
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
                    <p className="px-2 pb-4 pr-8 text-[13px] leading-relaxed text-white/60 sm:px-3">{f.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
