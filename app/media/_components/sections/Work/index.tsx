"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    title: "Ania Aesthetics",
    image: "/media/portfolio/ania-aesthetics.jpg",
    description: "Built a full social media presence and content strategy for this laser hair removal clinic. High-conversion creatives drove a 3× increase in consultation bookings within 90 days.",
  },
  {
    title: "Aromatic Expressions",
    image: "/media/portfolio/aromatic-expressions.jpg",
    description: "Developed product-led social content for this premium fragrance brand. Campaigns highlighting their impression-based positioning grew online sales 40% month-over-month.",
  },
  {
    title: "CarEase",
    image: "/media/portfolio/careaze.jpg",
    description: "Launched geo-targeted paid social ads for CarEase's dent removal service across Karachi. Generated 200+ qualified leads in the first month at a cost-per-lead 35% below benchmark.",
  },
  {
    title: "InRide",
    image: "/media/portfolio/inride.jpg",
    description: "Executed the digital launch strategy for InRide, a ride-hailing app entering the Saudi market. Social and paid campaigns drove 10,000+ downloads in the first two weeks post-launch.",
  },
  {
    title: "Maryam Taseer",
    image: "/media/portfolio/maryam-taseer.jpg",
    description: "Built editorial content and social campaigns for this luxury fashion label. The Dastaan E Ishq collection launch generated record engagement and sold out within 48 hours.",
  },
  {
    title: "TakeMe",
    image: "/media/portfolio/takeme.jpg",
    description: "Orchestrated the digital relaunch strategy for TakeMe's ride-hailing platform across Pakistan. Relaunch content and paid campaigns drove a surge in app downloads and press coverage overnight.",
  },
  {
    title: "SEO & Organic Growth",
    type: "matrix",
    eyebrow: "Optimization",
    description: "Rebuilt keyword architecture from the ground up targeting high-intent queries. Organic sessions grew 3.4× in six months with zero paid spend.",
  },
  {
    title: "Social Media Marketing",
    type: "brand",
    brand: "misso",
    description: "Developed a full content calendar and community strategy across Instagram and LinkedIn. Grew engaged following from 4K to 28K in under a year.",
  },
];

// Individual card — owns its own content ref so the dropdown animates
// to the exact measured height, not a hard-coded max-height.
type Project = (typeof PROJECTS)[number];

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure on mount and whenever open state changes
  useEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <article
      className="media-work-project-card"
      aria-label={project.title}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="media-work-project-visual relative mb-4 overflow-hidden rounded-lg bg-[#eaf3ff] shadow-[0_24px_70px_rgba(38,94,158,0.2)]">
        {project.type === "matrix" ? (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fbff_0%,#dcecff_100%)]">
            <div className="absolute left-[21%] top-[18%] h-[68%] w-px bg-[#173c8a]/30" />
            <div className="absolute bottom-[18%] left-[21%] h-px w-[62%] bg-[#173c8a]/30" />
            <div className="absolute left-[16%] top-[43%] -rotate-90 text-[10px] font-semibold text-[#12387f]/70">
              Qualification
            </div>
            <div className="absolute bottom-[12%] left-[41%] text-[10px] font-semibold text-[#12387f]/70">
              Audience fit
            </div>
            <div className="absolute left-[41%] top-[32%] grid grid-cols-10 gap-[3px]">
              {Array.from({ length: 90 }).map((_, index) => {
                const col = index % 10;
                const row = Math.floor(index / 10);
                const intensity = Math.max(0.18, (col + row) / 18);
                return (
                  <span
                    key={index}
                    className="block h-[3px] w-[3px] rounded-full"
                    style={{ backgroundColor: `rgba(17, 79, 177, ${intensity})` }}
                  />
                );
              })}
            </div>
          </div>
        ) : project.type === "brand" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(145deg,#eaf4ff_0%,#cfe4ff_100%)] text-[#05051f]">
            <span className="absolute right-9 top-8 rounded-full bg-[#d6eaff] px-3 py-1 text-[10px] font-semibold text-[#4b8deb]">
              After
            </span>
            <div className="flex items-center gap-3 text-[clamp(34px,4vw,52px)] font-semibold tracking-[-0.08em]">
              <span className="text-[1.08em]">*</span>
              <span>{project.brand}</span>
            </div>
            <span className="absolute bottom-8 rounded-full bg-[#d6eaff] px-3 py-1 text-[10px] font-semibold text-[#4b8deb]">
              Before
            </span>
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1640]/22 via-transparent to-white/10" />
          </>
        )}
      </div>

      {/* Title row */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-white sm:text-sm">
          {project.title}
        </h3>
        <span className={`media-work-card-chevron flex-shrink-0 ${open ? "is-open" : ""}`} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Measured-height dropdown */}
      <div
        style={{
          overflow: "hidden",
          height: open ? height : 0,
          opacity: open ? 1 : 0,
          transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
        }}
      >
        <div ref={innerRef}>
          <p
            className="pt-2 text-[11px] leading-relaxed text-white/60 sm:text-xs"
            style={{
              transform: open ? "translateY(0)" : "translateY(8px)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollMetricsRef = useRef({ distance: 0, maxX: 0 });
  const [pinHeight, setPinHeight] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    if (!section || !viewport || !track) {
      return;
    }

    let frame = 0;

    function updateScrollPosition() {
      const { distance, maxX } = scrollMetricsRef.current;

      if (!mediaQuery.matches || distance <= 0) {
        track!.style.transform = "";
        return;
      }

      // 40px dead zone — section stays fully locked while user scrolls this much,
      // giving the heading a moment to register before the cards start moving
      const LOCK_PX = 40;
      const sectionTop = section!.offsetTop;
      const rawProgress = Math.max(0, window.scrollY - sectionTop - LOCK_PX) / (distance - LOCK_PX);
      const progress = Math.min(1, Math.max(0, rawProgress));

      track!.style.transform = `translate3d(${-progress * maxX}px, 0, 0)`;
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateScrollPosition);
    }

    function measure() {
      if (!mediaQuery.matches) {
        scrollMetricsRef.current = { distance: 0, maxX: 0 };
        setPinHeight(null);
        track!.style.transform = "";
        return;
      }

      const maxX = Math.max(0, track!.scrollWidth - viewport!.clientWidth);
      scrollMetricsRef.current = { distance: maxX, maxX };
      setPinHeight(window.innerHeight + maxX);
      scheduleUpdate();
    }

    const resizeObserver = new ResizeObserver(measure);

    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    mediaQuery.addEventListener("change", measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", scheduleUpdate);
      mediaQuery.removeEventListener("change", measure);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full overflow-clip"
      style={{
        fontFamily: "var(--font-inter, Inter, sans-serif)",
        height: pinHeight ? `${pinHeight}px` : undefined,
      }}
    >
      <style>
        {`
          .media-work-scroll-viewport {
            scrollbar-width: none;
          }

          .media-work-scroll-viewport::-webkit-scrollbar {
            display: none;
          }

          .media-work-scroll-track {
            box-sizing: border-box;
            width: max-content;
            padding-left: 0;
            padding-right: 0;
            will-change: transform;
          }

          .media-work-project-card {
            flex: 0 0 clamp(300px, 28vw, 430px);
          }

          .media-work-project-visual {
            height: clamp(260px, 24vw, 380px);
          }

          .media-work-project-card:first-child {
            padding-left: clamp(24px, 4vw, 64px);
          }

          .media-work-project-card:last-child {
            padding-right: clamp(24px, 4vw, 64px);
          }

          .media-work-card-chevron {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .media-work-card-chevron.is-open {
            transform: rotate(180deg);
          }

          @media (min-width: 768px) {
            .media-work-pin-sticky {
              position: sticky;
              top: 0;
              display: flex;
              min-height: 100vh;
              width: 100%;
              align-items: center;
              overflow: hidden;
              padding-block: 64px;
            }

            .media-work-scroll-viewport {
              width: 100vw;
              overflow: hidden;
            }
          }

          @media (max-width: 767px) {
            .media-work-pin-sticky {
              padding-block: 48px 56px;
            }

            .media-work-scroll-viewport {
              overflow-x: auto;
              overscroll-behavior-x: contain;
            }

            .media-work-scroll-track {
              padding-left: 0;
              padding-right: 0;
              scroll-snap-type: x mandatory;
              transform: none !important;
            }

            .media-work-project-card {
              flex-basis: min(76vw, 280px);
              scroll-snap-align: start;
            }

            .media-work-project-visual {
              height: clamp(220px, 65vw, 300px);
            }

            .media-work-project-card:first-child {
              padding-left: 16px;
            }

            .media-work-project-card:last-child {
              padding-right: 16px;
            }
          }

        `}
      </style>

      <div className="media-work-pin-sticky">
        <div className="w-full">
          <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
            <h2
              className="mx-auto mb-8 text-center text-white sm:mb-10"
              style={{
                fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
                fontSize: "clamp(24px, 3.2vw, 52px)",
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                whiteSpace: "nowrap",
              }}
            >
              Digital Marketing Services Built Around You
            </h2>
          </div>

          <div
            ref={viewportRef}
            className="media-work-scroll-viewport"
            tabIndex={0}
            aria-label="Project carousel"
          >
            <div
              ref={trackRef}
              className="media-work-scroll-track flex gap-5 pb-5 sm:gap-7"
            >
              {PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
