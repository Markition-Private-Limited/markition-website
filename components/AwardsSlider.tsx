const AWARDS = [
  { src: "/awards/award-1.png", alt: "Award 1" },
  { src: "/awards/award-2.png", alt: "Award 2" },
  { src: "/awards/award-3.png", alt: "Award 3" },
  { src: "/awards/award-4.png", alt: "Award 4" },
  { src: "/awards/award-5.png", alt: "Award 5" },
  { src: "/awards/award-6.png", alt: "Award 6" },
  { src: "/awards/award-7.png", alt: "Award 7" },
  { src: "/awards/award-8.png", alt: "Award 8" },
];

export default function AwardsSlider() {
  const doubled = [...AWARDS, ...AWARDS];

  return (
    <section
      style={{
        background: "#020129",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "28px 0",
        overflow: "hidden",
      }}
    >
      <div className="awards-slider" style={{ width: "100%", overflow: "hidden" }}>
        <div
          className="awards-track"
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
          }}
        >
          {doubled.map((award, i) => (
            <div
              key={i}
              className="award-item"
              aria-hidden={i >= AWARDS.length ? true : undefined}
              style={{
                width: 130,
                height: 120,
                flex: "0 0 130px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 10px",
                cursor: "pointer",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={award.src}
                alt={award.alt}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  userSelect: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .awards-track {
          animation: awardsSlider 34s linear infinite;
          will-change: transform;
        }
        .awards-slider:hover .awards-track {
          animation-play-state: paused;
        }
        .award-item {
          transition: transform 0.35s cubic-bezier(0.2,0.8,0.2,1);
        }
        .award-item:hover {
          transform: translateY(-8px) scale(1.04);
        }
        @keyframes awardsSlider {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @media (max-width: 1200px) {
          .award-item { width: 110px !important; height: 100px !important; flex-basis: 110px !important; margin: 0 8px !important; }
          .awards-track { animation-duration: 30s; }
        }
        @media (max-width: 768px) {
          .award-item { width: 90px !important; height: 82px !important; flex-basis: 90px !important; margin: 0 6px !important; }
          .awards-track { animation-duration: 25s; }
        }
        @media (max-width: 480px) {
          .award-item { width: 80px !important; height: 72px !important; flex-basis: 80px !important; }
          .awards-track { animation-duration: 23s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .awards-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
