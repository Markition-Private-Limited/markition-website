"use client";

const AWARDS = [
  "/awards2/award-1.png",
  "/awards2/award-2.png",
  "/awards2/award-3.png",
  "/awards2/award-4.png",
  "/awards2/award-5.png",
  "/awards2/award-6.png",
  "/awards2/award-7.png",
  "/awards2/award-8.png",
];

export default function AwardsSlider() {
  const items = [...AWARDS, ...AWARDS];

  return (
    <div
      style={{
        width: "100%",
        background: "#020129",
        borderTop: "1px solid #334155",
        borderBottom: "1px solid #334155",
        boxShadow: "0 -1px 8px rgba(51,65,85,0.6), 0 1px 8px rgba(51,65,85,0.6)",
        overflow: "hidden",
        padding: "2px 0",
        position: "relative",
      }}
    >
      {/* Left fade */}
      <div style={{
        position: "absolute", inset: 0, right: "auto", width: 80,
        background: "linear-gradient(to right,#020129 0%,transparent 100%)",
        zIndex: 10, pointerEvents: "none",
      }} />
      {/* Right fade */}
      <div style={{
        position: "absolute", inset: 0, left: "auto", width: 80,
        background: "linear-gradient(to left,#020129 0%,transparent 100%)",
        zIndex: 10, pointerEvents: "none",
      }} />

      <div
        className="awards-track-new"
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="award-item-new"
            style={{
              width: 180, height: 160, flex: "0 0 180px",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 5px", cursor: "pointer",
              transition: "transform .35s cubic-bezier(.2,.8,.2,1), filter .35s ease",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px) scale(1.04)"}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = ""}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Award ${(i % AWARDS.length) + 1}`}
              draggable={false}
              style={{
                width: "100%", height: "100%",
                objectFit: "contain",
                display: "block",
                userSelect: "none",
              } as React.CSSProperties}
            />
          </div>
        ))}
      </div>

      <style>{`
        .awards-track-new {
          animation: awardsSlide2 34s linear infinite;
          will-change: transform;
        }
        .awards-track-new:hover {
          animation-play-state: paused;
        }
        @keyframes awardsSlide2 {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @media (max-width: 1200px) {
          .awards-track-new { animation-duration: 30s; }
          .award-item-new { width: 155px !important; height: 130px !important; flex-basis: 155px !important; }
        }
        @media (max-width: 768px) {
          .awards-track-new { animation-duration: 25s; }
          .award-item-new { width: 130px !important; height: 110px !important; flex-basis: 130px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .awards-track-new { animation: none; }
        }
      `}</style>
    </div>
  );
}
