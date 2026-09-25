"use client";

const STRIP_ITEMS = [
  "Graphics Design",
  "SEO",
  "Digital Marketing",
  "UI/UX Design",
  "Custom Branding",
];

function SparkleIcon({ color = "#0B1740", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
    </svg>
  );
}

function Strip({
  background,
  textColor,
  rotate,
  top,
  zIndex,
  duration,
}: {
  background: string;
  textColor: string;
  rotate: number;
  top: number;
  zIndex: number;
  duration: string;
}) {
  const doubled = [...STRIP_ITEMS, ...STRIP_ITEMS, ...STRIP_ITEMS];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-10vw",
        width: "120vw",
        top,
        transform: `rotate(${rotate}deg)`,
        zIndex,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        className="scale-strip-track"
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          background,
          padding: "10px 0",
          boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
          animationDuration: duration,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 26px",
              whiteSpace: "nowrap",
              fontWeight: 700,
              fontSize: 14,
              color: textColor,
              fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
            }}
          >
            <SparkleIcon color={textColor} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ScaleWithAISection() {
  return (
    <section style={{ background: "#000028", padding: "120px 24px 100px", position: "relative", overflow: "hidden" }}>
      {/* Tilted sliding strips — positioned relative to the full-width section */}
      <Strip background="#1A3BFF" textColor="#0B1740" rotate={2.2} top={34} zIndex={3} duration="32s" />
      <Strip background="#22C5F5" textColor="#0B1740" rotate={-2.6} top={10} zIndex={4} duration="28s" />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

        {/* Dark navy card */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            background: "#070E2C",
            borderRadius: 20,
            padding: "96px 40px 56px",
            textAlign: "center",
            boxShadow:
              "0 8px 40px rgba(60,100,255,0.18), -6px 0 30px rgba(60,100,255,0.1), 6px 0 30px rgba(60,100,255,0.1)",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: "clamp(28px, 3.4vw, 46px)",
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: "-0.6px",
              color: "#ffffff",
              fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
            }}
          >
            Ready To Grow Your{" "}
            <span style={{ color: "#22C5F5" }}>Business With AI?</span>
          </h2>

          <p
            style={{
              margin: "0 auto 36px",
              maxWidth: 720,
              fontSize: 15,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
            }}
          >
            Transform your workflow, automate complex operations, and unlock new growth opportunities with powerful AI-driven solutions built to help your business work smarter, grow faster, and see real results.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <button
              className="scale-btn-filled"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#0B1740",
                color: "#ffffff",
                border: "none",
                borderRadius: 999,
                padding: "15px 28px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
                letterSpacing: "0.01em",
                transition: "background 0.2s ease, transform 0.2s ease",
              }}
            >
              <SparkleIcon color="#4B8EFF" size={12} />
              Book Your Free Strategy Call
            </button>

            <button
              className="scale-btn-outline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: 999,
                padding: "15px 28px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
                letterSpacing: "0.01em",
                transition: "background 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <SparkleIcon color="#ffffff" size={12} />
              Explore Our Solutions
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scale-strip-track {
          animation-name: scaleStripSlide;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes scaleStripSlide {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .scale-btn-filled:hover {
          background: #1A47CC !important;
          transform: translateY(-2px);
        }
        .scale-btn-outline:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.6) !important;
          transform: translateY(-2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .scale-strip-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
