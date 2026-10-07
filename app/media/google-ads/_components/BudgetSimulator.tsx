"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

/* "What could your budget do?" — a live budget simulator.
   Two real controls (a slider and an industry toggle) drive three animated
   stat cards and two comparison bars. Everything recalculates the instant you
   move the slider — nothing here waits for a scroll trigger, which is the
   point: it's a tool you play with, not a scene that plays once. */

type IndustryKey = "local" | "ecom" | "leads";

const INDUSTRIES: Record<IndustryKey, { label: string; cpc: number; cvr: number }> = {
  local: { label: "Local Services", cpc: 4.2, cvr: 0.09 },
  ecom: { label: "E-commerce", cpc: 1.1, cvr: 0.035 },
  leads: { label: "Lead Generation", cpc: 3.0, cvr: 0.06 },
};

const MIN_BUDGET = 500;
const MAX_BUDGET = 10000;
const MAX_CLICKS = MAX_BUDGET / INDUSTRIES.ecom.cpc; // cheapest CPC sets the bar scale
const MAX_LEADS = (MAX_BUDGET / INDUSTRIES.local.cpc) * INDUSTRIES.local.cvr; // highest CVR sets the bar scale

function useAnimatedNumber(target: number, duration = 650) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // deferred one tick so this isn't a synchronous setState-in-effect
      frameRef.current = requestAnimationFrame(() => {
        setValue(target);
        fromRef.current = target;
      });
      return () => cancelAnimationFrame(frameRef.current);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

export default function BudgetSimulator() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [budget, setBudget] = useState(2500);
  const [industry, setIndustry] = useState<IndustryKey>("leads");

  const { cpc, cvr, label } = INDUSTRIES[industry];
  const clicksTarget = inView ? budget / cpc : 0;
  const leadsTarget = inView ? clicksTarget * cvr : 0;
  const cplTarget = leadsTarget > 0 ? budget / leadsTarget : 0;

  const clicks = useAnimatedNumber(clicksTarget);
  const leads = useAnimatedNumber(leadsTarget);
  const cpl = useAnimatedNumber(cplTarget);

  const clicksPct = Math.min(100, (clicks / MAX_CLICKS) * 100);
  const leadsPct = Math.min(100, (leads / MAX_LEADS) * 100);

  return (
    <div ref={ref} className="w-full">
      <div
        className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] rounded-[22px] border p-6 sm:p-8"
        style={{
          borderColor: "rgba(8,12,66,0.1)",
          background: "linear-gradient(165deg,#ffffff 0%,#f6f8ff 100%)",
          boxShadow: "0 40px 90px -45px rgba(8,12,66,0.4)",
        }}
      >
        {/* Controls */}
        <div>
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "var(--pp-blue, #0018c5)" }}
          >
            Try it yourself
          </p>
          <h3 className="mb-5 text-[22px] font-bold leading-tight" style={{ color: "#080c42", fontFamily: "var(--d)" }}>
            What could your monthly budget do?
          </h3>

          <div className="mb-6 flex flex-wrap gap-2">
            {(Object.keys(INDUSTRIES) as IndustryKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setIndustry(key)}
                className="rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all"
                style={
                  industry === key
                    ? { background: "#080c42", borderColor: "#080c42", color: "#fff" }
                    : { background: "#fff", borderColor: "rgba(8,12,66,0.16)", color: "#3b4468" }
                }
              >
                {INDUSTRIES[key].label}
              </button>
            ))}
          </div>

          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[12px] font-semibold text-[#5b667c]">Monthly ad budget</span>
            <span className="text-[20px] font-bold" style={{ color: "#080c42", fontFamily: "var(--d)" }}>
              ${budget.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={100}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            aria-label="Monthly ad budget"
            className="w-full accent-[#0018c5]"
            style={{ accentColor: "#0018c5" }}
          />
          <div className="mt-1 flex justify-between text-[10px] text-[#8992a8]">
            <span>${MIN_BUDGET.toLocaleString()}</span>
            <span>${MAX_BUDGET.toLocaleString()}</span>
          </div>

          <p className="mt-5 text-[13px] leading-relaxed text-[#5b667c]">
            Illustrative only — built from typical {label.toLowerCase()} benchmarks (avg. CPC ${cpc.toFixed(2)},
            ~{Math.round(cvr * 100)}% click-to-lead rate), not a quote for your account.
          </p>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center gap-4">
          <div className="grid grid-cols-3 gap-2.5">
            <Stat label="Est. clicks" value={Math.round(clicks).toLocaleString()} />
            <Stat label="Est. leads" value={Math.round(leads).toLocaleString()} accent />
            <Stat label="Cost / lead" value={leads > 0 ? `$${cpl.toFixed(0)}` : "—"} />
          </div>

          <Bar label="Clicks" pct={clicksPct} color="#8ea0ff" />
          <Bar label="Leads" pct={leadsPct} color="#0018c5" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="rounded-2xl border px-3 py-4 text-center"
      style={{
        borderColor: accent ? "rgba(0,24,197,0.25)" : "rgba(8,12,66,0.1)",
        background: accent ? "linear-gradient(160deg,#0018c5,#2a43ff)" : "#fff",
      }}
    >
      <div
        className="text-[22px] font-bold leading-none"
        style={{ color: accent ? "#fff" : "#080c42", fontFamily: "var(--d)" }}
      >
        {value}
      </div>
      <div
        className="mt-1.5 text-[9.5px] font-bold uppercase tracking-[0.1em]"
        style={{ color: accent ? "rgba(255,255,255,0.75)" : "#8992a8" }}
      >
        {label}
      </div>
    </div>
  );
}

function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] font-semibold text-[#5b667c]">
        <span>{label}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "#eef0f8" }}>
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
