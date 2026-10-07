"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

/* "From brief to growth" — a click-through wizard instead of a scroll-linked
   progress rail. Step circles + Prev/Next move together; the detail card
   slides in underneath. Scrolling the page no longer drives anything here,
   which reads as a distinctly different mechanism from the SEO page's
   scroll-tied step rail. */

const STEPS = [
  { tag: "Brief", body: "Business goal, offer, audience, funnel and success metric." },
  { tag: "Test", body: "The offer and keyword opportunities mapped to the pages and topics that should own them." },
  { tag: "Launch", body: "Ad copy goes live with disciplined naming, tracking and controlled budgets." },
  { tag: "Test", body: "Compare search themes, headlines, descriptions, landing pages and bidding signals." },
  { tag: "Scale", body: "Shift budget toward proven search terms and conversion signals while continuously refining ads and landing pages." },
] as const;

const AUTO_MS = 3400;

export default function ProcessStepper() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!inView || paused || step === STEPS.length - 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setStep((s) => Math.min(STEPS.length - 1, s + 1)), AUTO_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [inView, paused, step]);

  const go = (i: number) => {
    setStep(Math.max(0, Math.min(STEPS.length - 1, i)));
    setPaused(true);
  };

  return (
    <div ref={ref} className="w-full">
      <p className="mb-6 max-w-[360px] text-[13px] text-[#5b667c]">
        Campaign data tells us what happened. Strategy tells us what to test next.
      </p>

      {/* Rail */}
      <div className="relative mb-7 flex items-center justify-between">
        <div
          className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2"
          style={{ background: "rgba(8,12,66,0.12)" }}
        />
        <div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 transition-[width] duration-500 ease-out"
          style={{ width: `${(step / (STEPS.length - 1)) * 100}%`, background: "linear-gradient(90deg,#0018c5,#6d85ff)" }}
        />
        {STEPS.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Step ${i + 1}: ${s.tag}`}
              aria-current={current}
              className="relative z-10 grid h-9 w-9 place-items-center rounded-full border-2 text-[12px] font-bold transition-all"
              style={{
                borderColor: done || current ? "#0018c5" : "rgba(8,12,66,0.18)",
                background: current ? "#0018c5" : done ? "#eef1ff" : "#fff",
                color: current ? "#fff" : done ? "#0018c5" : "#8992a8",
                transform: current ? "scale(1.12)" : "scale(1)",
              }}
            >
              {done ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#0018c5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </button>
          );
        })}
      </div>

      {/* Detail card */}
      <div
        className="relative overflow-hidden rounded-2xl border p-6 sm:p-7"
        style={{ borderColor: "rgba(8,12,66,0.1)", background: "#fff", boxShadow: "0 30px 70px -42px rgba(8,12,66,0.35)" }}
      >
        {STEPS.map((s, i) => (
          <div
            key={i}
            className="transition-all duration-400 ease-out"
            style={{
              display: i === step ? "block" : "none",
              opacity: i === step ? 1 : 0,
              transform: i === step ? "translateX(0)" : "translateX(12px)",
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--pp-blue,#0018c5)" }}>
              Step {i + 1} of {STEPS.length}
            </span>
            <h3 className="mb-2 mt-1.5 text-[24px] font-bold" style={{ color: "#080c42", fontFamily: "var(--d)" }}>
              {s.tag}
            </h3>
            <p className="max-w-[480px] text-[14.5px] leading-relaxed text-[#5b667c]">{s.body}</p>
          </div>
        ))}

        <div className="mt-6 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-opacity disabled:opacity-30"
            style={{ borderColor: "rgba(8,12,66,0.18)", color: "#080c42" }}
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => go(step + 1)}
            disabled={step === STEPS.length - 1}
            className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-opacity disabled:opacity-30"
            style={{ background: "#0018c5" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
