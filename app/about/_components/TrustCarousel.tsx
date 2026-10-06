"use client";

import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote: "They created my website and a more professional face online. I highly recommend Markition for business development.",
    name: "Susan Hicks",
    role: "CEO & Founder · Concierge",
  },
  {
    quote: "Markition transformed our digital presence completely. Their team delivered beyond expectations and the results speak for themselves.",
    name: "Jill Nicole Geesey",
    role: "Revenue Integrity Consulting · Healthcare",
  },
  {
    quote: "From SEO to paid ads, they handled everything with precision. Our leads doubled within 3 months of working with Markition.",
    name: "Michael Carter",
    role: "Director of Marketing · TechVentures",
  },
];

function cardClass(i: number, current: number) {
  const n = TESTIMONIALS.length;
  const diff = (i - current + n) % n;
  if (diff === 0) return "active";
  if (diff === 1) return "next";
  if (diff === n - 1) return "prev";
  return diff < n / 2 ? "hidden-right" : "hidden-left";
}

export default function TrustCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 5600);
    return () => clearInterval(t);
  }, [paused]);

  function onPointerMove(e: React.PointerEvent) {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(max-width: 700px)").matches) return;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt(`translate3d(0,0,80px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) scale(1)`);
  }

  return (
    <section className="section trust" id="trust">
      <div className="wrap">
        <div className="trust-head">
          <div className="eyebrow reveal">11 / Trust</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40, flexWrap: "wrap" }}>
            <div>
              <h2 className="title reveal">
                THE WORK
                <br />
                <span className="blue">SPEAKS.</span>
              </h2>
            </div>
            <div style={{ maxWidth: 470 }}>
              <div className="trust-kicker reveal">Client voices / Real experiences</div>
              <p className="lead reveal" style={{ marginTop: 18 }}>
                Before you decide to work with us, take a moment to hear directly from the people who experienced the Markition difference.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={stageRef}
          className="trust-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); setTilt(null); }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onPointerMove={onPointerMove}
        >
          <div className="trust-halo" />

          {TESTIMONIALS.map((t, i) => {
            const cls = cardClass(i, current);
            return (
              <article
                key={t.name}
                className={`testimonial-card ${cls}`}
                style={cls === "active" && tilt ? { transform: tilt } : undefined}
              >
                <div className="testimonial-top">
                  <span className="testimonial-index">Client voice / 0{i + 1}</span>
                  <span className="testimonial-mark">“</span>
                </div>
                <blockquote>“{t.quote}”</blockquote>
                <div className="testimonial-bottom">
                  <div className="testimonial-person">
                    <strong>{t.name}</strong>
                    {t.role}
                  </div>
                  <div className="testimonial-arrow">Markition / Experience</div>
                </div>
              </article>
            );
          })}

          <div className="trust-controls" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                className={`trust-dot${i === current ? " active" : ""}`}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

        <div className="trust-foot">
          <span>
            Real Owners <strong>|</strong> Real Results
          </span>
          <span>Selected client testimonials</span>
        </div>
      </div>
    </section>
  );
}
