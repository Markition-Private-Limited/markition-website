"use client";

import { useEffect, useRef } from "react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const ALL_IMAGES = [
  "/design-lab/assets/hero/3ac0d2c9715554614b1ec0e32e74cd606253df1a.png",
  "/design-lab/assets/hero/45371db61b0ff5e4480bae84ce87842975dde27b.png",
  "/design-lab/assets/hero/65f8215ff2ded03736c5f32f91751a0e5c94d6ce.png",
  "/design-lab/assets/hero/7dd143dbcb005190af4aa40259cf6f77d99724cc.png",
  "/design-lab/assets/hero/8e0a4aba5e948181f985a0c8f49cc83d02b7e6fc.png",
  "/design-lab/assets/hero/aca36e01ed06f6af6cf93da04415684d26a65ce3.png",
  "/design-lab/assets/hero/b08e85365c5657cce32392d152f1a516b95fd516.png",
  "/design-lab/assets/hero/bc4ab278e0f3266e0e95d78e6b1c76733ca52ee3.png",
  "/design-lab/assets/hero/fc89d9d6b47eebf9cf67d38fedb462629614f9c6.png",
];

const COLUMNS = [
  [ALL_IMAGES[0], ALL_IMAGES[1], ALL_IMAGES[2]],
  [ALL_IMAGES[3], ALL_IMAGES[4], ALL_IMAGES[5]],
  [ALL_IMAGES[6], ALL_IMAGES[7], ALL_IMAGES[8]],
] as const;

const CARD_H = 340;
const GAP    = 14;
const SLOT   = CARD_H + GAP;

const COL_CONFIG = [
  { speed: 0.38, initOffset: 0 },
  { speed: 0.55, initOffset: -SLOT * 1.1 },
  { speed: 0.46, initOffset: -SLOT * 0.55 },
];

interface ColProps {
  images: readonly string[];
  speed: number;
  initOffset: number;
}

function ScrollColumn({ images, speed, initOffset }: ColProps) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const posRef     = useRef(initOffset);
  const momentumRef = useRef(-speed);
  const pauseRef   = useRef(false);
  const rafRef     = useRef<number>(0);

  const drag = useRef({ active: false, startY: 0, startPos: 0 });
  const velSamples = useRef<{ y: number; t: number }[]>([]);

  const singleH = images.length * SLOT;
  const clamp = (p: number) => {
    let n = p % singleH;
    if (n > 0) n -= singleH;
    return n;
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    posRef.current    = clamp(initOffset);
    momentumRef.current = -speed;

    const tick = () => {
      if (!drag.current.active) {
        const targetVel = pauseRef.current ? 0 : -speed;
        momentumRef.current = lerp(momentumRef.current, targetVel, 0.04);
        posRef.current = clamp(posRef.current + momentumRef.current);
      }

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, startY: e.clientY, startPos: posRef.current };
    velSamples.current = [{ y: e.clientY, t: performance.now() }];
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    posRef.current = clamp(drag.current.startPos + (e.clientY - drag.current.startY));

    const now = performance.now();
    velSamples.current.push({ y: e.clientY, t: now });
    velSamples.current = velSamples.current.filter(s => s.t >= now - 120);
  };

  const stopDrag = () => {
    drag.current.active = false;

    const samples = velSamples.current;
    if (samples.length >= 2) {
      const first = samples[0];
      const last  = samples[samples.length - 1];
      const dt    = last.t - first.t;
      if (dt > 0) {
        const vel = ((last.y - first.y) / dt) * (1000 / 60);
        momentumRef.current = Math.max(-30, Math.min(30, vel));
      }
    }
    velSamples.current = [];
  };

  const displayed = [...images, ...images];

  return (
    <div
      className="relative overflow-hidden flex-1"
      style={{ cursor: "grab" }}
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; drag.current.active = false; }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
    >
      <div ref={wrapRef} style={{ willChange: "transform" }}>
        {displayed.map((src, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden select-none"
            style={{ height: CARD_H, marginBottom: GAP }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section data-navbar-theme="light" className="relative h-screen overflow-hidden bg-white flex items-start">

      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 xl:px-24 w-full lg:w-[52%] xl:w-[48%] pt-[88px]">

        <h1
          className="font-extrabold leading-[1.05] tracking-tight text-gray-900 dl-hero-fade"
          style={{ animationDelay: "0ms" }}
        >
          <span className="text-5xl xl:text-6xl">
            Markition DesignLab: Branding,{" "}
            <span style={{ color: "#1236E8" }}>UI/UX &amp; Motion</span>
            <br />
            Design Agency
          </span>
        </h1>

        <p
          className="mt-6 text-[17px] leading-relaxed text-gray-500 max-w-[480px] dl-hero-fade"
          style={{ animationDelay: "120ms" }}
        >
          We design logos, brands, apps, and social media posts — then bring it
          all to life with video editing and animation that help your business
          truly grow.
        </p>

        <div
          className="mt-10 flex flex-wrap gap-3 dl-hero-fade"
          style={{ animationDelay: "240ms" }}
        >
          <button
            onClick={() => scrollTo("contact")}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold overflow-hidden"
            style={{ background: "#1236E8", border: "2px solid #1236E8" }}
          >
            <span
              className="absolute top-0 h-full bg-white w-0 group-hover:w-[250%] pointer-events-none transition-[width] duration-700 ease-in-out"
              style={{ left: "-50%", transform: "skewX(-35deg)", zIndex: 0 }}
            />
            <span className="relative flex items-center gap-2 text-white transition-colors duration-700 group-hover:text-[#1236E8]" style={{ zIndex: 1 }}>
              Start a Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <button
            onClick={() => scrollTo("work")}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold overflow-hidden border-2 border-gray-300 text-gray-800"
          >
            <span
              className="absolute top-0 h-full w-0 group-hover:w-[250%] pointer-events-none transition-[width] duration-700 ease-in-out"
              style={{ left: "-50%", transform: "skewX(-35deg)", background: "#1236E8", zIndex: 0 }}
            />
            <span className="relative flex items-center gap-2 transition-colors duration-700 group-hover:text-white" style={{ zIndex: 1 }}>
              Explore Our Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        <div
          className="mt-14 flex items-center gap-8 flex-wrap dl-hero-fade"
          style={{ animationDelay: "360ms" }}
        >
          {[
            { value: "150+",  label: "Digital Products" },
            { value: "99.4%", label: "Client Satisfaction" },
            { value: "14",    label: "Design Awards" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div>
                <p className="text-3xl font-extrabold" style={{ color: "#1236E8" }}>{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
              </div>
              {i < 2 && <div className="h-10 w-px bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      <div
        className="hidden lg:flex absolute right-0 top-0 h-full overflow-hidden"
        style={{
          width: "46%",
          transform: "rotate(8deg) scale(1.12) translateX(6%)",
          transformOrigin: "center center",
        }}
      >
        <div className="flex gap-4 w-full h-full px-4">
          {COLUMNS.map((imgs, i) => (
            <ScrollColumn
              key={i}
              images={imgs}
              speed={COL_CONFIG[i].speed}
              initOffset={COL_CONFIG[i].initOffset}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
