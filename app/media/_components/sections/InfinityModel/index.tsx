/* Chrome infinity symbol (public/media/infinity-chrome.png — the render from
   markition.com/digital-marketing-solutions, cropped to the symbol with a
   transparent background).

   It is not interactive: it turns slowly in 3D on its own, floats above a soft
   contact shadow, and a highlight sweeps across the chrome (masked to the
   symbol's own shape) so it catches the light like a real object. */

export default function InfinityModel() {
  return (
    <div aria-hidden="true" className="gm-head-infinity" style={{ pointerEvents: "none" }}>
      <style>{`
        .gm-inf-scene { perspective: 900px; position: relative; }
        .gm-inf-model {
          position: relative;
          transform-style: preserve-3d;
          animation: gm-inf-turn 10s ease-in-out infinite alternate, gm-inf-float 5s ease-in-out infinite;
          will-change: transform;
        }
        .gm-inf-img { display: block; width: 100%; height: auto; user-select: none; }
        .gm-inf-sheen {
          position: absolute; inset: 0;
          -webkit-mask-image: url(/media/infinity-chrome.png); mask-image: url(/media/infinity-chrome.png);
          -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
          background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.9) 50%, transparent 62%);
          background-size: 280% 100%;
          mix-blend-mode: soft-light;
          animation: gm-inf-sheen 6s ease-in-out infinite;
        }
        .gm-inf-shadow {
          position: absolute; left: 14%; right: 14%; bottom: -3%; height: 9%;
          background: radial-gradient(ellipse at center, rgba(8,12,66,0.28), rgba(8,12,66,0) 70%);
          filter: blur(5px);
          animation: gm-inf-shadow 5s ease-in-out infinite;
        }
        @keyframes gm-inf-turn {
          from { transform: rotateX(7deg) rotateY(-24deg); }
          to   { transform: rotateX(3deg) rotateY(24deg); }
        }
        @keyframes gm-inf-float {
          0%, 100% { translate: 0 0; }
          50%      { translate: 0 -9px; }
        }
        @keyframes gm-inf-sheen {
          from { background-position: 130% 0; }
          to   { background-position: -30% 0; }
        }
        @keyframes gm-inf-shadow {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50%      { transform: scale(0.88); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gm-inf-model, .gm-inf-sheen, .gm-inf-shadow { animation: none !important; }
          .gm-inf-model { transform: rotateX(5deg) rotateY(-12deg); }
        }
      `}</style>

      <div className="gm-inf-scene">
        <div className="gm-inf-shadow" />
        <div className="gm-inf-model">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="gm-inf-img" src="/media/infinity-chrome.png" alt="" draggable={false} />
          <div className="gm-inf-sheen" />
        </div>
      </div>
    </div>
  );
}
