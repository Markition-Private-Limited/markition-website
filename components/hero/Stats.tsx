"use client";

import { useState, useEffect, useRef } from "react";
import { STATS } from "@/lib/constants";

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

export default function Stats() {
  return (
    <div className="hero-stats max-w-3xl mx-auto grid grid-cols-3 pb-4 sm:pb-6">
      {STATS.map((stat, i) => (
        <div
          key={stat.value}
          className={`flex flex-col items-center justify-center py-3 sm:py-4 px-2 sm:px-4 text-center ${
            i < STATS.length - 1 ? "border-r border-white/[0.1]" : ""
          }`}
        >
          <span
            className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 leading-none"
            style={{
              color: "#20D9FF",
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
  );
}
