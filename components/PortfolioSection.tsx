"use client";

import ScrollReveal from "@/components/ScrollReveal";

/* ─── Card data ──────────────────────────────────────────────────── */
const IMG = {
  article:   "/real%20business%20section/Article.png",
  group:     "/real%20business%20section/Group%202147225441.png",
  mobileWeb: "/real%20business%20section/Mobile%20web%20design.%202x%20more%20leads%20for%20industrial%20electrical%20engineers.png",
};

const CARDS = [
  { src: IMG.article,   alt: "Article feature" },
  { src: IMG.group,     alt: "Digital growth results" },
  { src: IMG.mobileWeb, alt: "Mobile web design" },
  { src: IMG.article,   alt: "Article feature" },
  { src: IMG.group,     alt: "Digital growth strategy" },
  { src: IMG.mobileWeb, alt: "Mobile-first conversion redesign" },
];

/* Doubled for seamless infinite scroll */
const TRACK = [...CARDS, ...CARDS];


/* ─── Section ────────────────────────────────────────────────────── */
export default function PortfolioSection() {
  return (
    <section style={{ background: "#000028", padding: "80px 0 90px" }}>

      {/* Heading */}
      <div style={{ maxWidth: 1200, margin: "0 auto 52px", padding: "0 24px", textAlign: "center" }}>
        <ScrollReveal threshold={0.2}>
          <p style={{
            fontSize: 11.5, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#2f78ff", margin: "0 0 10px",
          }}>
            Case Studies
          </p>
          <h2 style={{
            margin: "0 auto 14px", maxWidth: 680,
            fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.12,
            letterSpacing: "-1.4px", fontWeight: 800,
            fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
            color: "#f0f6ff",
          }}>
            Real Businesses.{" "}
            <span style={{ color: "#00d4ff" }}>Real Digital Growth.</span>
          </h2>
          <p style={{ margin: "0 auto", maxWidth: 560, color: "#64809e", fontSize: 14, lineHeight: 1.78 }}>
            From startups to established brands — here&apos;s how we&apos;ve driven measurable
            results for real businesses.
          </p>
        </ScrollReveal>
      </div>

      {/* Scroll track */}
      <div style={{ position: "relative", overflow: "hidden", paddingBottom: 12 }}>
        {/* Edge fades */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: 120,
          background: "linear-gradient(to right, #000028, transparent)",
          pointerEvents: "none", zIndex: 10,
        }} />
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 120,
          background: "linear-gradient(to left, #000028, transparent)",
          pointerEvents: "none", zIndex: 10,
        }} />

        <div
          className="portfolio-track"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            width: "max-content",
            padding: "10px 32px 14px",
          }}
        >
          {TRACK.map((card, i) => (
            <div
              key={i}
              className="shiny-card-outer"
              style={{
                width: 300,
                flexShrink: 0,
                marginTop: i % 2 === 1 ? 56 : 0,
                borderRadius: 18,
                padding: "1.5px",
              }}
            >
              <div style={{ borderRadius: 16, overflow: "hidden", background: "#06102a" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.alt}
                  draggable={false}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Infinite scroll ── */
        .portfolio-track {
          animation: scroll-portfolio 38s linear infinite;
        }
        .portfolio-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-portfolio {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Shiny / shimmer border ── */
        .shiny-card-outer {
          background: linear-gradient(
            135deg,
            rgba(0, 212, 255, 0.65) 0%,
            rgba(0, 80, 200, 0.12) 30%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(0, 80, 200, 0.12) 70%,
            rgba(0, 212, 255, 0.65) 100%
          );
          background-size: 300% 300%;
          animation: shimmer-border 4s ease-in-out infinite;
          box-shadow:
            0 0 0 1px rgba(0, 180, 255, 0.08),
            0 16px 48px rgba(0, 0, 40, 0.6),
            0 0 28px rgba(0, 212, 255, 0.06);
        }

        @keyframes shimmer-border {
          0%   { background-position: 0% 0%; }
          25%  { background-position: 100% 0%; }
          50%  { background-position: 100% 100%; }
          75%  { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
    </section>
  );
}
