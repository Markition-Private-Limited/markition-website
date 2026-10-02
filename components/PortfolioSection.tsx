"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
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
  ...Array.from({ length: 15 }, (_, i) => ({
    src: `/assets/portofolio-v2/ai-solutions/ai-solution-${i + 1}.webp`,
    alt: `AI solution project ${i + 1}`,
  })),
  ...Array.from({ length: 14 }, (_, i) => ({
    src: `/assets/portofolio-v2/web-platforms/web-platform-${i + 1}.webp`,
    alt: `Web platform project ${i + 1}`,
  })),
  ...Array.from({ length: 16 }, (_, i) => ({
    src: `/assets/portofolio-v2/digital-marketing/digital-marketing-${i + 1}.webp`,
    alt: `Digital marketing project ${i + 1}`,
  })),
  ...Array.from({ length: 37 }, (_, i) => ({
    src: `/assets/portofolio-v2/brand-experiences/brand-experience-${i + 1}.webp`,
    alt: `Brand experience project ${i + 1}`,
  })),
];

const MOBILE_IMAGES = [
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-1.webp", alt: "Mobile app project 1" },
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-2.webp", alt: "Mobile app project 2" },
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-3.webp", alt: "Mobile app project 3" },
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-4.webp", alt: "Mobile app project 4" },
  { src: "/assets/portofolio-v2/mobile-app-images/mobile-app-image-5.webp", alt: "Mobile app project 5" },
];

const BRAND_EXPERIENCE_IMAGES = Array.from({ length: 37 }, (_, i) => ({
  src: `/assets/portofolio-v2/brand-experiences/brand-experience-${i + 1}.webp`,
  alt: `Brand experience project ${i + 1}`,
}));

const WEB_PLATFORM_IMAGES = Array.from({ length: 14 }, (_, i) => ({
  src: `/assets/portofolio-v2/web-platforms/web-platform-${i + 1}.webp`,
  alt: `Web platform project ${i + 1}`,
}));

const DIGITAL_MARKETING_IMAGES = Array.from({ length: 16 }, (_, i) => ({
  src: `/assets/portofolio-v2/digital-marketing/digital-marketing-${i + 1}.webp`,
  alt: `Digital marketing project ${i + 1}`,
}));

const AI_SOLUTION_IMAGES = Array.from({ length: 15 }, (_, i) => ({
  src: `/assets/portofolio-v2/ai-solutions/ai-solution-${i + 1}.webp`,
  alt: `AI solution project ${i + 1}`,
}));

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

/* AI Solutions: 15 images split evenly across 3 columns, duplicated for seamless loop */
function buildAISolutionColumns(images: typeof AI_SOLUTION_IMAGES) {
  const colA = images.filter((_, i) => i % 3 === 0);
  const colB = images.filter((_, i) => i % 3 === 1);
  const colC = images.filter((_, i) => i % 3 === 2);
  const dup = (arr: typeof images) => [...arr, ...arr];
  return [dup(colA), dup(colB), dup(colC)];
}

/* Digital Marketing: 16 images split evenly across 3 columns, duplicated for seamless loop */
function buildDigitalMarketingColumns(images: typeof DIGITAL_MARKETING_IMAGES) {
  const colA = images.filter((_, i) => i % 3 === 0);
  const colB = images.filter((_, i) => i % 3 === 1);
  const colC = images.filter((_, i) => i % 3 === 2);
  const dup = (arr: typeof images) => [...arr, ...arr];
  return [dup(colA), dup(colB), dup(colC)];
}

/* Web Platforms: 14 images split evenly across 3 columns, duplicated for seamless loop */
function buildWebPlatformColumns(images: typeof WEB_PLATFORM_IMAGES) {
  const colA = images.filter((_, i) => i % 3 === 0);
  const colB = images.filter((_, i) => i % 3 === 1);
  const colC = images.filter((_, i) => i % 3 === 2);
  const dup = (arr: typeof images) => [...arr, ...arr];
  return [dup(colA), dup(colB), dup(colC)];
}

/* Brand Experiences: 37 images split evenly across 3 columns, duplicated for seamless loop */
function buildBrandExperienceColumns(images: typeof BRAND_EXPERIENCE_IMAGES) {
  const colA = images.filter((_, i) => i % 3 === 0); // 0,3,6,9,...  → 13 images
  const colB = images.filter((_, i) => i % 3 === 1); // 1,4,7,10,... → 12 images
  const colC = images.filter((_, i) => i % 3 === 2); // 2,5,8,11,... → 12 images
  const dup = (arr: typeof images) => [...arr, ...arr];
  return [dup(colA), dup(colB), dup(colC)];
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

/* Pre-compute columns for every tab once — renders all tabs simultaneously so images stay in DOM */
const CATEGORY_COLUMNS: Record<string, [ImageItem[], ImageItem[], ImageItem[]]> = {
  "All Projects":      buildColumns(ALL_IMAGES) as [ImageItem[], ImageItem[], ImageItem[]],
  "AI Solutions":      buildAISolutionColumns(AI_SOLUTION_IMAGES) as [ImageItem[], ImageItem[], ImageItem[]],
  "Web Platforms":     buildWebPlatformColumns(WEB_PLATFORM_IMAGES) as [ImageItem[], ImageItem[], ImageItem[]],
  "Mobile Apps":       buildMobileColumns(MOBILE_IMAGES) as [ImageItem[], ImageItem[], ImageItem[]],
  "Digital Marketing": buildDigitalMarketingColumns(DIGITAL_MARKETING_IMAGES) as [ImageItem[], ImageItem[], ImageItem[]],
  "Brand Experiences": buildBrandExperienceColumns(BRAND_EXPERIENCE_IMAGES) as [ImageItem[], ImageItem[], ImageItem[]],
};

const SECS_PER_IMAGE = 4.5;

function CarouselColumn({
  items,
  reverse = false,
  speedMultiplier = 1,
}: {
  items: ImageItem[];
  reverse?: boolean;
  speedMultiplier?: number;
}) {
  const uniqueCount = items.length / 2;
  const duration = Math.round(uniqueCount * SECS_PER_IMAGE * speedMultiplier);

  return (
    <div style={{ overflow: "hidden", isolation: "isolate" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          animation: `portfolio-scroll-${reverse ? "down" : "up"} ${duration}s linear infinite`,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {items.map((img, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden flex-shrink-0"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0D1535", position: "relative", aspectRatio: "4/3" }}
          >
            <NextImage
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 33vw, 280px"
              className="object-cover select-none"
              priority={i < 6}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const BG = "#010424";



  return (
    <section
      id="portfolio"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6"
      style={{ background: "#000028" }}
    >
      <style>{`
        @keyframes portfolio-scroll-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes portfolio-scroll-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        @keyframes portfolio-tab-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .portfolio-tab-fade {
          animation: portfolio-tab-fade 0.3s ease forwards;
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
                  const isHovered = hoveredCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      animate={{
                        x: isHovered && !isActive ? 5 : 0,
                        scale: isHovered && !isActive ? 1.02 : 1,
                      }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[13px] font-semibold"
                      style={{
                        fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                        color: isActive ? "#ffffff" : isHovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)",
                        background: isActive
                          ? "linear-gradient(135deg, rgba(43,127,255,0.22) 0%, rgba(43,127,255,0.04) 100%)"
                          : isHovered
                          ? "rgba(43,127,255,0.08)"
                          : "rgba(255,255,255,0.02)",
                        border: isActive
                          ? "1px solid rgba(43,127,255,0.35)"
                          : isHovered
                          ? "1px solid rgba(43,127,255,0.2)"
                          : "1px solid rgba(255,255,255,0.06)",
                        backdropFilter: isActive || isHovered ? "blur(32.4px)" : "none",
                        WebkitBackdropFilter: isActive || isHovered ? "blur(32.4px)" : "none",
                        boxShadow: isActive
                          ? "0px 33.75px 67.5px -16.2px #2B7FFF26"
                          : isHovered
                          ? "0 4px 20px rgba(43,127,255,0.12)"
                          : "none",
                        transition: "color 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s",
                      }}
                    >
                      {/* Dot indicator */}
                      <motion.span
                        className="flex-shrink-0 rounded-full"
                        animate={{
                          scale: isActive ? 1.25 : isHovered ? 1.1 : 1,
                          backgroundColor: isActive ? "#22C5F5" : isHovered ? "rgba(43,127,255,0.7)" : "rgba(255,255,255,0.25)",
                          boxShadow: isActive
                            ? "0 0 8px 2px rgba(34,197,245,0.55)"
                            : isHovered
                            ? "0 0 6px 1px rgba(43,127,255,0.4)"
                            : "none",
                        }}
                        transition={{ duration: 0.18 }}
                        style={{ width: "7px", height: "7px" }}
                      />
                      {cat}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right panel — infinite vertical carousel ───────────── */}
          <div
            className="flex-1 min-w-0 relative"
            style={{ minHeight: "560px", overflow: "hidden", contain: "strict" }}
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

            {/* Only the active tab — key change triggers CSS fade-in, no framer-motion overhead */}
            {(() => {
              const [colA, colB, colC] = CATEGORY_COLUMNS[activeCategory];
              return (
                <div
                  key={activeCategory}
                  className="grid absolute inset-0 portfolio-tab-fade"
                  style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}
                >
                  <CarouselColumn items={colA} speedMultiplier={1} />
                  <CarouselColumn items={colB} reverse speedMultiplier={1.2} />
                  <CarouselColumn items={colC} speedMultiplier={0.85} />
                </div>
              );
            })()}
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
