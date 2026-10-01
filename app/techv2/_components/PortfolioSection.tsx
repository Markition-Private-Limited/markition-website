"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "AimScholar", img: "/assets/aimscholar-CvJCjHHq.png", href: "https://www.aimscholar.in/", year: "2026" },
  { title: "Apex Auto Studio", img: "/assets/lavishTouchImg-e9bNmaJV.png", href: "https://lavish-touch.vercel.app/", year: "2026" },
  { title: "RankLocal", img: "/assets/ranklocal-C46CgvsG.png", href: "https://rankview.vercel.app/", year: "2026" },
  { title: "Shree Swami Samarth Electrical", img: "/assets/sssee-CGYazGZc.png", href: "https://sssee.vercel.app/", year: "2026" },
  { title: "Aura", img: "/assets/aura-EBD47GL-.png", href: "https://aura-chi-ebon.vercel.app/", year: "2026" },
  { title: "ArkaHomes", img: "/assets/arkahomes-BW72MAUe.png", href: "https://arkahomes.vercel.app/", year: "2026" },
  { title: "Elora Homes", img: "/assets/elorahomes-eqfsMixA.png", href: "https://elorahomes.vercel.app/", year: "2026" },
  { title: "DesignerSam", img: "/assets/designerSamImg-C9jtz3bX.png", href: "https://designer-sam.vercel.app/", year: "2026" },
];

const TOTAL = projects.length;

export function PortfolioSection() {
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const el = outerRef.current;
      if (!el) return;
      const { top } = el.getBoundingClientRect();
      const scrolled = -top;
      if (scrolled <= 0) { setActive(0); return; }
      const totalScrollRange = el.offsetHeight - window.innerHeight;
      if (scrolled >= totalScrollRange) { setActive(TOTAL - 1); return; }
      const progress = scrolled / totalScrollRange;
      setActive(Math.round(progress * (TOTAL - 1)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Outer container: scroll track — each additional 100vh drives one slide
    <div ref={outerRef} style={{ height: `${TOTAL * 100}vh` }}>
      {/* Sticky panel: occupies viewport while user scrolls through the track */}
      <div className="sticky top-[70px] flex h-[calc(100vh-70px)] flex-col overflow-hidden bg-[#fbfbfb] py-6 sm:py-8" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
        {/* ── Header ── */}
        <div className="mx-auto w-full max-w-7xl shrink-0 px-5 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-3">
              <svg
                className="mb-0.5 hidden h-6 w-6 shrink-0 fill-current text-[#1d1d1f] sm:block"
                viewBox="0 0 24 24"
              >
                <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
              </svg>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#062283]">
                  Our Portfolio
                </p>
                <h2 className="mt-0.5 text-2xl font-black leading-none tracking-tight text-[#1d1d1f] sm:text-3xl">
                  Featured Projects
                </h2>
              </div>
            </div>
            <span className="font-mono text-sm text-[#1d1d1f]/35 md:text-base">
              <span className="font-bold text-[#1d1d1f]">
                {String(active + 1).padStart(2, "0")}
              </span>{" "}
              / {String(TOTAL).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Carousel stage ── */}
        <div
          className="relative mx-auto mt-4 h-[50vh] w-full max-w-7xl shrink-0 px-5 sm:mt-5 sm:h-[58vh] sm:px-8 lg:h-[60vh] lg:px-10"
          style={{ perspective: "1400px" }}
        >
          {projects.map((project, i) => {
            const diff = i - active;
            const absDiff = Math.abs(diff);

            // Only render cards within ±2 of active
            if (absDiff > 2) return null;

            // Staircase: right (future) cards go down, left (past) cards go up
            const STEP_X = 60; // % of card width per step
            const STEP_Y = 52; // px per step (staircase)
            const scale = Math.max(0.58, 1 - absDiff * 0.17);
            const opacity =
              absDiff === 0 ? 1 : absDiff === 1 ? 0.52 : 0.22;
            const zIndex = 10 - absDiff;

            const tx = `${diff * STEP_X}%`;
            const ty = `${diff * STEP_Y}px`;
            // Future cards tilt clockwise (+), past tilt counter-clockwise (-), active is 0
            const TILT_DEG = 8;
            const rz = `${diff * TILT_DEG}deg`;

            return (
              <div
                key={project.title}
                className="absolute inset-x-[3%] top-3 bottom-3 sm:inset-x-[10%] lg:inset-x-[18%]"
                style={{
                  transform: `translateX(${tx}) translateY(${ty}) scale(${scale}) rotateZ(${rz})`,
                  opacity,
                  zIndex,
                  transition:
                    "transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.65s ease",
                  transformOrigin: "center center",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.16)]">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 86vw, 76vw"
                    className="object-cover object-top"
                    priority={i <= 1}
                  />
                  {/* gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  {/* bottom bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between sm:bottom-5 sm:left-5 sm:right-5">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-3.5 py-2 text-white backdrop-blur-sm sm:px-4">
                      <span className="text-xs font-bold sm:text-sm">
                        {project.title}
                      </span>
                      <span className="border-l border-white/20 pl-2 font-mono text-[10px] text-white/50 sm:text-xs">
                        {project.year}
                      </span>
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-[#062283] px-3.5 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-[#0a2fa8] sm:px-4 sm:text-sm"
                    >
                      Visit Site
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Dot indicators ── */}
        <div className="mx-auto mt-4 flex shrink-0 items-center gap-2 sm:mt-5">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "h-2 w-5 bg-[#062283]"
                  : i < active
                    ? "h-2 w-2 bg-[#1d1d1f]/40"
                    : "h-2 w-2 bg-[#1d1d1f]/15"
              }`}
            />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <p className="mt-2.5 shrink-0 text-center text-[10px] tracking-wider text-[#1d1d1f]/25">
          {active < TOTAL - 1
            ? "↓ scroll to explore"
            : "you've seen them all · ↑ scroll up to go back"}
        </p>
      </div>
    </div>
  );
}
