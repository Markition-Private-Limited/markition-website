"use client";

import ScrollReveal from "@/components/ScrollReveal";

const IMAGES = Array.from({ length: 16 }, (_, i) => `/assets/real-growth/real-growth-${i + 1}.webp`);

// Duplicate for seamless loop
const TRACK = [...IMAGES, ...IMAGES];

export default function RealGrowthCarouselSection() {
  return (
    <section
      className="py-10"
      style={{ background: "#000028" }}
    >
      <style>{`
        @keyframes rg-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .rg-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: rg-marquee 45s linear infinite;
          align-items: center;
        }
        .rg-track:hover {
          animation-play-state: paused;
        }
        .rg-card {
          flex-shrink: 0;
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          cursor: pointer;
        }
        .rg-card:nth-child(odd) {
          transform: translateY(-20px);
        }
        .rg-card:nth-child(even) {
          transform: translateY(20px);
        }
        .rg-card:nth-child(odd):hover {
          transform: translateY(-20px) scale(1.08);
          box-shadow: 0 0 30px rgba(34,197,245,0.5), 0 0 70px rgba(34,197,245,0.2);
        }
        .rg-card:nth-child(even):hover {
          transform: translateY(20px) scale(1.08);
          box-shadow: 0 0 30px rgba(34,197,245,0.5), 0 0 70px rgba(34,197,245,0.2);
        }
        .rg-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal threshold={0.2}>
          <div className="text-center mb-8 lg:mb-10">
            <h2
              className="font-bold text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.15] mb-4"
              style={{
                fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Real Businesses. Real{" "}
              <span style={{ color: "#22C5F5" }}>Digital Growth.</span>
            </h2>
            <p
              className="text-[14px] sm:text-[15px] leading-relaxed max-w-[620px] mx-auto"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              See how we combine technology, marketing, and creative strategy to solve real business challenges and drive measurable results.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-width ticker strip */}
      <div
        style={{
          overflow: "hidden",
          padding: "55px 0",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
        }}
      >
        <div className="rg-track">
          {TRACK.map((src, i) => (
            <div
              key={i}
              className="rg-card"
              style={{ width: 280, height: 200, background: "#0a0a2e" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                draggable={false}
                decoding="async"
                loading={i < 16 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
