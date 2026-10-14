"use client";

import { useRef, useState } from "react";

const BARS = Array.from({ length: 48 }, (_, i) => 20 + Math.abs(Math.sin(i * 1.7) * 55) + ((i * 37) % 17));

export default function FootageScrubber() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className={`cvx-scrub${drag ? " drag" : ""}`}
      onPointerDown={(e) => {
        setDrag(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => drag && move(e.clientX)}
      onPointerUp={() => setDrag(false)}
      role="slider"
      aria-label="Compare raw footage and final cut"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
    >
      <div className="cvx-scrub-pane final">
        <span className="cvx-scrub-label">Final cut</span>
        <div className="cvx-wave">{BARS.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${(i % 8) * 90}ms` }} />)}</div>
        <div className="cvx-grade"><b /><b /><b /><b /></div>
        <span className="cvx-scrub-meta">Colour graded · Sound mixed · Motion added</span>
      </div>

      <div className="cvx-scrub-pane raw" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <span className="cvx-scrub-label">Raw footage</span>
        <div className="cvx-wave flat">{BARS.map((h, i) => <i key={i} style={{ height: `${30 + (h % 22)}%` }} />)}</div>
        <div className="cvx-noise" />
        <span className="cvx-scrub-meta">Ungraded · Uneven audio · No structure</span>
      </div>

      <div className="cvx-handle" style={{ left: `${pos}%` }}>
        <span><em>‹</em><em>›</em></span>
      </div>
    </div>
  );
}
