"use client";

import { useState } from "react";

const CARDS = [
  {
    title: "SEO",
    sub: "Search visibility",
    desc: "We optimise your site technically and on-page so the right customers find you first — and you stay ahead as Google's algorithms evolve.",
    img: "/services/seo.webp",
  },
  {
    title: "Google Ads",
    sub: "Performance campaigns",
    desc: "Search and display campaigns built to capture high-intent buyers, drive qualified traffic, and deliver measurable return on every pound spent.",
    img: "/services/google-ads.webp",
  },
  {
    title: "Meta Ads",
    sub: "Social advertising",
    desc: "Facebook and Instagram campaigns that reach your ideal audience, create demand, and retarget warm leads until they convert.",
    img: "/services/meta-ads.webp",
  },
  {
    title: "Social Media",
    sub: "page management",
    desc: "We handle your social pages end-to-end — content calendars, posting, community engagement, and growth across all major platforms.",
    img: "/services/social-media.webp",
  },
  {
    title: "Video Editing",
    sub: "Visual storytelling",
    desc: "Raw footage transformed into polished brand videos, reels, and ads that stop the scroll and move people to act.",
    img: "/services/video-editing.webp",
  },
];

function titleFontSize(title: string): string {
  const len = title.length;
  if (len <= 3) return "32px";
  if (len <= 8) return "26px";
  if (len <= 10) return "21px";
  return "16px";
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="media-services"
      className="w-full px-6 sm:px-10 py-20 sm:py-28 media-gap"
      style={{
        fontFamily: "var(--font-inter, Inter, sans-serif)",
        background: "linear-gradient(180deg, rgba(1,12,40,0) 0%, rgba(1,12,40,0.22) 35%, rgba(1,12,40,0.22) 65%, rgba(1,12,40,0) 100%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Heading block */}
        <div data-stagger="1" className="text-center max-w-[700px] mx-auto mb-14 sm:mb-18">
          <h2
            className="text-white font-bold mb-5 leading-[1.1]"
            style={{
              fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              fontSize: "clamp(28px, 3.8vw, 52px)",
              letterSpacing: "-0.03em",
            }}
          >
            Your{" "}
            <span style={{ color: "#00D4FF" }}>Digital Marketing</span>{" "}
            Should<br />Work As One System.
          </h2>

          <p className="text-white/50 text-[14px] sm:text-[15px] leading-[1.75] mb-4">
            Your digital marketing should work as one system.
          </p>

          <p
            className="text-[14px] sm:text-[15px] leading-[1.75] mb-5"
            style={{ color: "#00D4FF" }}
          >
            Markition brings strategy, creative execution and performance marketing
            together to create a clearer path from attention to action.
          </p>

          <p className="text-white/30 text-[12px] sm:text-[13px] leading-[1.7]">
            From organic search and paid campaigns to social content and
            conversion-focused experiences, we connect the channels that matter
            to your customers.
          </p>
        </div>

        {/* Cards — desktop keeps its original fluid single-row sizing; mobile wraps into fixed-width rows */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 items-start justify-center w-full">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              data-stagger={String(i + 2)}
              onClick={() => setActiveIndex(prev => (prev === i ? null : i))}
              className={`relative flex flex-col overflow-hidden rounded-2xl cursor-pointer group shadow-[0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_48px_-12px_rgba(0,212,255,0.35),0_8px_20px_rgba(0,0,40,0.25)] hover:-translate-y-2 hover:scale-[1.04] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-[calc(50%-6px)] flex-[0_0_calc(50%-6px)] sm:w-auto sm:flex-1 sm:max-w-[260px] sm:min-w-0 ${activeIndex === i ? "is-active -translate-y-2 scale-[1.04] shadow-[0_24px_48px_-12px_rgba(0,212,255,0.35),0_8px_20px_rgba(0,0,40,0.25)]" : ""}`}
              style={{ gap: 0 }}
            >
              {/* Background image — blurred/glassy at rest, clears on hover/tap */}
              <div
                aria-hidden
                className="absolute inset-[-12px] bg-cover bg-center transition-[filter] duration-500 ease-out blur-[6px] group-hover:blur-[0px] group-[.is-active]:blur-[0px]"
                style={{ backgroundImage: `url(${card.img})` }}
              />
              {/* Frosted glass tint at rest — fades out on hover/tap */}
              <div
                aria-hidden
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 group-[.is-active]:opacity-0"
                style={{ background: "rgba(10,25,70,0.38)" }}
              />
              {/* Dark depth overlay — fades IN on hover/tap so text stays readable */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,20,0.04) 0%, rgba(0,0,20,0.4) 100%)" }}
              />

              {/* Accent bar */}
              <span
                aria-hidden
                className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 group-[.is-active]:scale-x-100 transition-transform duration-500 ease-out z-10"
                style={{ background: "linear-gradient(90deg, #1964D1, #00D4FF)" }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center px-5 py-6 sm:px-6 sm:py-8">
                <span
                  className="svc-card-title block leading-tight text-white transition-all duration-500 group-hover:text-[#000028] group-[.is-active]:text-[#000028] group-hover:tracking-[0.01em] group-[.is-active]:tracking-[0.01em] text-center"
                  style={{
                    fontFamily: "var(--font-instrument, 'Instrument Serif', serif)",
                    fontWeight: 600,
                    ["--mobile-title-size" as string]: titleFontSize(card.title),
                  }}
                >
                  {card.title}
                </span>
                <span className="text-white/60 group-hover:text-[#000028]/80 group-[.is-active]:text-[#000028]/80 transition-colors duration-500 text-[11px] sm:text-[12px] font-medium tracking-wide text-center mt-1">
                  {card.sub}
                </span>
              </div>

              {/* Description — expands on hover/tap, sits above the blurred bg */}
              <div
                className="relative z-10 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-[.is-active]:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out"
                style={{ background: "rgba(0,0,40,0.82)" }}
              >
                <div className="overflow-hidden">
                  <p className="text-white/90 text-[11px] sm:text-[12px] leading-[1.6] text-center px-5 py-4 sm:px-6">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .svc-card-title {
          font-size: clamp(20px, 2.6vw, 40px);
        }
        @media (max-width: 639px) {
          .svc-card-title {
            font-size: var(--mobile-title-size);
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
