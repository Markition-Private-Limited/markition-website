"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const CATEGORIES = [
  "All Projects",
  "AI Solutions",
  "Web Platforms",
  "Mobile Apps",
  "Digital Marketing",
  "Brand Experiences",
];

const ALL_IMAGES = [
  { src: "/assets/portofolio-v2/portfolio-image-1.jpg", alt: "Portfolio project 1" },
  { src: "/assets/portofolio-v2/portfolio-image-2.jpg", alt: "Portfolio project 2" },
  { src: "/assets/portofolio-v2/portfolio-image-3.jpg", alt: "Portfolio project 3" },
  { src: "/assets/portofolio-v2/portfolio-image-4.jpg", alt: "Portfolio project 4" },
  { src: "/assets/portofolio-v2/portfolio-image-5.jpg", alt: "Portfolio project 5" },
  { src: "/assets/portofolio-v2/portfolio-image-6.jpg", alt: "Portfolio project 6" },
  { src: "/assets/portofolio-v2/portfolio-image-7.png", alt: "Portfolio project 7" },
  { src: "/assets/portofolio-v2/portfolio-image-8.jpg", alt: "Portfolio project 8" },
  { src: "/assets/portofolio-v2/portfolio-image-9.jpg", alt: "Portfolio project 9" },
  { src: "/assets/portofolio-v2/portfolio-image-10.jpg", alt: "Portfolio project 10" },
  { src: "/assets/portofolio-v2/portfolio-image-11.jpg", alt: "Portfolio project 11" },
  { src: "/assets/portofolio-v2/portfolio-image-12.jpg", alt: "Portfolio project 12" },
  { src: "/assets/portofolio-v2/portfolio-image-13.jpg", alt: "Portfolio project 13" },
  { src: "/assets/portofolio-v2/portfolio-image-14.png", alt: "Portfolio project 14" },
  { src: "/assets/portofolio-v2/portfolio-image-15.jpg", alt: "Portfolio project 15" },
];

const MOBILE_IMAGES = [
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-1.jpg", alt: "Mobile app project 1" },
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-2.jpg", alt: "Mobile app project 2" },
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-3.jpg", alt: "Mobile app project 3" },
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-4.jpg", alt: "Mobile app project 4" },
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-5.png", alt: "Mobile app project 5" },
];

/* Split images across 3 columns with no overlap, duplicated for seamless loop */
function buildColumns(images: typeof ALL_IMAGES) {
  const third = Math.ceil(images.length / 3);
  const a = images.slice(0, third);
  const b = images.slice(third, third * 2);
  const c = images.slice(third * 2);
  const pad = (arr: typeof images) => (arr.length < 2 ? [...arr, ...arr, ...arr] : [...arr, ...arr]);
  return [pad(a), pad(b), pad(c)];
}

/* All 5 images in each column, shuffled differently per column */
function buildMobileColumns(images: typeof MOBILE_IMAGES) {
  const shuffle1 = [images[1], images[3], images[0], images[4], images[2]];
  const shuffle2 = [images[4], images[0], images[2], images[1], images[3]];
  const dup = (arr: typeof images) => [...arr, ...arr];
  return [dup([...images]), dup(shuffle1), dup(shuffle2)];
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
    </svg>
  );
}

type ImageItem = { src: string; alt: string };

function CarouselColumn({
  items,
  reverse = false,
  duration = 28,
}: {
  items: ImageItem[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          animation: `portfolio-scroll-${reverse ? "down" : "up"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((img, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <div
            key={i}
            className="rounded-xl overflow-hidden flex-shrink-0"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#0D1535",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              className="w-full object-cover select-none block"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const BG = "#010424";

  const [COL_A, COL_B, COL_C] =
    activeCategory === "Mobile Apps"
      ? buildMobileColumns(MOBILE_IMAGES)
      : buildColumns(ALL_IMAGES);

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6"
      style={{ background: "#000028" }}
    >
      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes portfolio-scroll-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes portfolio-scroll-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
      `}</style>

      {/* Card wrapper */}
      <div
        className="max-w-[1200px] mx-auto relative overflow-hidden rounded-2xl"
        style={{
          background: BG,
          boxShadow: "0px 33.75px 67.5px -16.2px #2B7FFF26",
          backdropFilter: "blur(32.4px)",
          WebkitBackdropFilter: "blur(32.4px)",
          padding: "clamp(28px, 5vw, 60px)",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">

          {/* ── Left panel ────────────────────────────────────────── */}
          <ScrollReveal threshold={0.2} className="w-full lg:w-[320px] lg:flex-shrink-0">
            <div className="flex flex-col">

              {/* Heading */}
              <h2
                className="font-bold text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.1] mb-4"
                style={{
                  fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                Results That{" "}
                <br />
                Speak{" "}
                <span style={{ color: "#22C5F5" }}>For Themselves</span>
              </h2>

              {/* Description */}
              <p
                className="text-[14px] sm:text-[15px] leading-relaxed mb-7"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Explore real projects across AI, marketing, and design — proof of the growth we deliver daily.
              </p>

              {/* CTA Button */}
              <button
                className="flex items-center gap-2.5 self-start px-5 py-3 rounded-full text-[13px] font-semibold mb-8 transition-all hover:brightness-110 active:scale-95"
                style={{
                  fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#ffffff",
                }}
              >
                <GridIcon />
                See All Projects
              </button>

              {/* Category cards */}
              <div className="flex flex-col gap-2.5">
                {CATEGORIES.map((cat) => {
                  const isActive = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[13px] font-semibold transition-all"
                      style={{
                        fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
                        background: isActive
                          ? "linear-gradient(135deg, rgba(43,127,255,0.22) 0%, rgba(43,127,255,0.04) 100%)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(43,127,255,0.35)"
                          : "1px solid transparent",
                        backdropFilter: isActive ? "blur(32.4px)" : "none",
                        WebkitBackdropFilter: isActive ? "blur(32.4px)" : "none",
                        boxShadow: isActive
                          ? "0px 33.75px 67.5px -16.2px #2B7FFF26"
                          : "none",
                      }}
                    >
                      {/* Dot indicator */}
                      <span
                        className="flex-shrink-0 rounded-full transition-all"
                        style={{
                          width: "7px",
                          height: "7px",
                          background: isActive ? "#22C5F5" : "rgba(255,255,255,0.25)",
                        }}
                      />
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right panel — infinite vertical carousel ───────────── */}
          <div
            className="flex-1 min-w-0 relative"
            style={{ minHeight: "560px", overflow: "hidden" }}
          >
            {/* Gradient shadows — top & bottom */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-20"
              style={{
                height: "120px",
                background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
              style={{
                height: "120px",
                background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
              }}
            />

            {/* 3 scrolling columns */}
            <div
              className="grid absolute inset-0"
              style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}
            >
              <CarouselColumn items={COL_A} duration={26} />
              <CarouselColumn items={COL_B} reverse duration={32} />
              <CarouselColumn items={COL_C} duration={22} />
            </div>
          </div>

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
