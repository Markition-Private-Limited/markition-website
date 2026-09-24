"use client";

import { Reveal } from "../../ui/Reveal";

const BG   = "#030A28";
const BLUE = "#1236E8";
const CYAN = "#20D9FF";

const INDUSTRIES = [
  {
    name: "Tech",
    sub: "Seeking design services for Tech?",
    body: "Our design agency specializes in high-quality design for the modern tech industry.",
  },
  {
    name: "Startups",
    sub: "Seeking design services for your Startup?",
    body: "Our design agency specializes in high-quality design for Startups.",
  },
  {
    name: "B2B",
    sub: "Seeking design services for a B2B?",
    body: "Our design agency specializes in high-quality design for the B2B design.",
  },
  {
    name: "VC Firms",
    sub: "Seeking design services for your VC Firm?",
    body: "Our design agency specializes in high-quality design for VCs firms.",
  },
  {
    name: "Agencies",
    sub: "Seeking design services for your Agency?",
    body: "Our design agency specializes in high-quality design for Agencies.",
  },
  {
    name: "Fintech",
    sub: "Seeking design services for your Fintech?",
    body: "Our design agency specializes in high-quality design for Fintech.",
  },
  {
    name: "SaaS",
    sub: "Seeking design services for your SaaS brand?",
    body: "Our design agency specializes in high-quality design for SaaS.",
  },
  {
    name: "E-commerce",
    sub: "Seeking design services for your E-Commerce?",
    body: "Our design agency specializes in high-quality design for the E-Commerce.",
  },
  {
    name: "Blockchain & AI",
    sub: "Seeking design services for your Blockchain & AI?",
    body: "Our design agency specializes in high-quality design for Blockchain.",
  },
];

function ArrowIcon() {
  return (
    <div
      className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-[1400ms] group-hover:bg-white"
      style={{ background: BLUE }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-[1400ms] group-hover:[&_path]:stroke-[#1236E8]"
      >
        <g clipPath="url(#a)">
          <g clipPath="url(#b)">
            <path
              d="M5.04064 1.37891L14.1973 1.37892V10.5355M7.03939 8.53672L14.0689 1.50713M1.375 14.2011L3.99224 11.5838"
              stroke="white"
              strokeWidth="1.6"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <clipPath id="a"><rect width="16" height="16" fill="white" /></clipPath>
          <clipPath id="b"><rect width="16" height="16" fill="white" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IndustryCard({ name, sub, body }: { name: string; sub: string; body: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-7 cursor-default h-full">
      <span
        className="absolute top-0 h-full w-0 group-hover:w-[250%] pointer-events-none"
        style={{
          left: "-50%",
          transform: "skewX(-35deg)",
          background: BLUE,
          zIndex: 0,
          transition: "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      <div className="relative flex flex-col h-full" style={{ zIndex: 1 }}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <h3 className="text-2xl font-extrabold text-gray-900 leading-tight transition-colors duration-[1400ms] group-hover:text-white">
            {name}
          </h3>
          <ArrowIcon />
        </div>

        <p className="text-[13px] font-semibold text-gray-800 mb-1 transition-colors duration-[1400ms] group-hover:text-white/90">
          {sub}
        </p>
        <p className="text-[13px] text-gray-500 leading-relaxed transition-colors duration-[1400ms] group-hover:text-white/60">
          {body}
        </p>
      </div>
    </div>
  );
}

export function IndustriesSection() {
  return (
    <section
      data-navbar-theme="dark"
      className="py-24 px-8 md:px-16 xl:px-24"
      style={{ background: BG }}
    >
      <div className="mx-auto max-w-7xl">

        <Reveal variant="up" duration={900}>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white text-center leading-[1.15] tracking-tight mb-16">
            Design Services Fit For{" "}
            <span style={{ color: CYAN }}>Your Industry</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.name} variant="up" delay={i * 60} duration={800}>
              <IndustryCard {...industry} />
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={200} duration={800}>
          <div className="flex justify-center mt-14">
            <button
              className="group relative overflow-hidden rounded-full border border-white/30 px-8 py-3.5 text-[15px] font-semibold text-white flex items-center gap-3 cursor-pointer"
            >
              <span
                className="absolute top-0 h-full w-0 group-hover:w-[250%] pointer-events-none"
                style={{
                  left: "-50%",
                  transform: "skewX(-35deg)",
                  background: BLUE,
                  zIndex: 0,
                  transition: "width 0.6s ease-in-out",
                }}
              />
              <span className="relative" style={{ zIndex: 1 }}>
                Explore Our Work
              </span>
              <span className="relative text-lg leading-none" style={{ zIndex: 1 }}>→</span>
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
