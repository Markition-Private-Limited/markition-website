"use client";

import ScrollReveal from "@/components/ScrollReveal";

export interface CaseStudy {
  projectName: string;
  tags: string[];
  heading: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageBgSrc: string;
  imageAlt: string;
}

function PortfolioCaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[5fr_7fr]"
      style={{
        background: "#080F2E",
        border: "1px solid #334155",
        boxShadow: "0 0 40px 6px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Left — project details ────────────────────────────────── */}
      <div className="flex flex-col justify-center px-8 sm:px-10 lg:px-12 py-10 sm:py-12 lg:py-14">
        {/* Project name */}
        <p
          className="font-bold text-white text-[22px] sm:text-[26px] mb-1"
          style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)" }}
        >
          {study.projectName}
        </p>

        {/* Tags */}
        <p
          className="text-[13px] sm:text-[14px] italic mb-6"
          style={{ color: "#22C5F5" }}
        >
          {study.tags.join(" · ")}
        </p>

        {/* Divider */}
        <div
          className="mb-6 w-full"
          style={{ height: "1px", background: "rgba(255,255,255,0.12)" }}
        />

        {/* Heading */}
        <h3
          className="font-bold text-white text-[16px] sm:text-[18px] leading-snug mb-4"
          style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)" }}
        >
          {study.heading}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-[13px] sm:text-[14px] leading-relaxed mb-8">
          {study.description}
        </p>

        {/* Bullets */}
        <ul className="space-y-2">
          {study.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-white/85 text-[13px] sm:text-[14px]">
              <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/60" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Right — image panel ───────────────────────────────────── */}
      <div
        className="relative flex items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[340px] lg:min-h-0"
        style={{
          backgroundImage: `url(${study.imageBgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Slight left-edge fade for visual blending on desktop */}
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none"
          style={{
            background: "linear-gradient(to right, #080F2E 0%, transparent 22%)",
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={study.imageSrc}
          alt={study.imageAlt}
          className="relative z-10 w-[88%] sm:w-[78%] lg:w-[90%] max-w-[520px] object-contain select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

const CASE_STUDIES: CaseStudy[] = [
  {
    projectName: "Genix Drive",
    tags: ["Digital Growth", "Mobile App"],
    heading: "Turning a New Mobility App Into a Scalable Digital Growth Engine",
    description:
      "We helped Genix Drive build a complete digital growth strategy focused on increasing app awareness, driving downloads, activating users, and creating a clear path toward long-term customer growth.",
    bullets: ["Awareness → Downloads → Activation → Paid Conversion"],
    imageSrc: "/assets/portfolio/app_ss.png",
    imageBgSrc: "/assets/portfolio/app_bg.png",
    imageAlt: "Genix Drive mobile app screens showing rider and driver views",
  },
];

export default function PortfolioSection() {
  return (
    <section
      className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6"
      style={{ background: "#000028" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section heading */}
        <ScrollReveal threshold={0.2}>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-bold text-[28px] sm:text-[36px] lg:text-[44px] mb-4"
              style={{
                fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Real Businesses. Real{" "}
              <span style={{ color: "#22C5F5" }}>Digital Growth.</span>
            </h2>
            <p className="text-white/60 text-[14px] sm:text-[16px] leading-relaxed max-w-[600px] mx-auto">
              See how we combine technology, marketing, and creative strategy to solve real business challenges and drive measurable results.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {CASE_STUDIES.map((study, i) => (
            <ScrollReveal key={i} delay={i * 80} threshold={0.15}>
              <PortfolioCaseStudyCard study={study} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
