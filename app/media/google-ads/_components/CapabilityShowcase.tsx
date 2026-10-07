"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

/* "Every part of the paid social engine" — a master/detail showcase instead
   of a grid of hover-tilt cards. A numbered list on the left drives a single
   detail panel on the right; it advances on its own until you click, which
   both works on touch (no hover to fake) and reads as a different shape of
   interaction from the capability cards on the SEO page. */

const SERVICES = [
  { title: "Search Strategy", body: "Business goals, offer positioning, conversion paths, account architecture and measurable performance goals." },
  { title: "Keywords Strategy", body: "Keywords research, first-party signals, high-intent search, remarketing and market segmentation." },
  { title: "Ad Copy Strategy", body: "Ad concepts, hooks, copy angles, formats and creative systems built for Google Search and YouTube." },
  { title: "Lead Generation", body: "Campaigns designed to turn high-intent searches into enquiries, forms, calls, WhatsApp conversations or qualified website actions." },
  { title: "E-commerce & Performance Max", body: "Product-focused campaigns, catalog-led journeys, remarketing and conversion-focused creative." },
  { title: "Remarketing", body: "Reconnect with previous website visitors and high-intent users through remarketing across the Google ecosystem." },
  { title: "Ad Copy Testing", body: "Structured testing of headlines, descriptions, landing pages, search themes and bidding signals to find what converts." },
  { title: "Google Ecosystem", body: "Google Search and YouTube campaigns designed around the audience, placement and business objective." },
  { title: "Reporting & Optimization", body: "Clear reporting across impressions, clicks, CPC, conversions, CPA, ROAS and search-term signals — with decisions for the next iteration." },
] as const;

const AUTO_MS = 4200;

export default function CapabilityShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!inView || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setActive((a) => (a + 1) % SERVICES.length), AUTO_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [inView, paused]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grid gap-0 overflow-hidden rounded-[22px] border lg:grid-cols-[minmax(0,320px)_1fr]"
      style={{ borderColor: "rgba(8,12,66,0.1)", background: "#fff", boxShadow: "0 40px 90px -48px rgba(8,12,66,0.35)" }}
    >
      {/* List */}
      <ol className="flex flex-col divide-y" style={{ borderColor: "rgba(8,12,66,0.08)" }}>
        {SERVICES.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.title} style={{ borderColor: "rgba(8,12,66,0.08)" }}>
              <button
                type="button"
                onClick={() => select(i)}
                className="flex w-full items-center gap-3.5 px-5 py-3.5 text-left transition-colors"
                style={{ background: isActive ? "#080c42" : "transparent" }}
                aria-current={isActive}
              >
                <span
                  className="text-[10.5px] font-bold tabular-nums"
                  style={{ color: isActive ? "#9aabff" : "#9099b5" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[13.5px] font-bold"
                  style={{ color: isActive ? "#fff" : "#2a3150", fontFamily: "var(--d)" }}
                >
                  {s.title}
                </span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#5cf2a4" }} />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Detail */}
      <div className="relative min-h-[260px] p-7 sm:p-9">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className="absolute inset-7 sm:inset-9 flex flex-col justify-center transition-all duration-500 ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? "translateY(0)" : "translateY(10px)",
              pointerEvents: i === active ? "auto" : "none",
            }}
            aria-hidden={i !== active}
          >
            <span
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold"
              style={{ background: "#eef1ff", color: "#0018c5" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mb-2.5 text-[24px] font-bold leading-tight" style={{ color: "#080c42", fontFamily: "var(--d)" }}>
              {s.title}
            </h3>
            <p className="max-w-[460px] text-[14.5px] leading-relaxed text-[#5b667c]">{s.body}</p>
          </div>
        ))}

        {/* progress ticks */}
        <div className="absolute bottom-7 right-7 flex gap-1.5 sm:bottom-9 sm:right-9">
          {SERVICES.map((s, i) => (
            <span
              key={s.title}
              className="h-1 rounded-full transition-all duration-300"
              style={{ width: i === active ? 18 : 6, background: i === active ? "#0018c5" : "rgba(8,12,66,0.14)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
