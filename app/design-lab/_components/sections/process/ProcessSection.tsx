"use client";

import { useEffect, useRef, useState } from "react";

const BG   = "#E0EDF8";
const BLUE = "#1236E8";

function DiscoverLeft() {
  return (
    <h2 className="text-4xl xl:text-[52px] font-extrabold leading-[1.12] tracking-tight text-gray-900">
      A Better Process Creates
      <br />
      <span style={{ color: BLUE }}>Better Design</span>
    </h2>
  );
}

function DefineLeft() {
  const tags = [
    "User Journey Maps",
    "Information Architecture",
    "Wireframes",
    "Moodboards",
    "Tone of Voice",
  ];
  return (
    <div>
      <h2 className="text-4xl xl:text-[52px] font-extrabold leading-[1.12] tracking-tight text-gray-900 mb-8">
        Clarity Before
        <br />
        <span style={{ color: BLUE }}>Creativity</span>
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 rounded-full text-sm font-semibold border"
            style={{
              borderColor: BLUE,
              color: BLUE,
              background: "rgba(18,54,232,0.07)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function DesignLeft() {
  const btns = ["See Case Studies →", "Explore UI System →"];
  return (
    <div>
      <h2 className="text-4xl xl:text-[52px] font-extrabold leading-[1.12] tracking-tight text-gray-900 mb-8">
        Where Ideas Meet
        <br />
        <span style={{ color: BLUE }}>Visual Reality</span>
      </h2>
      <div className="flex flex-col gap-3">
        {btns.map((label) => (
          <button
            key={label}
            className="group relative overflow-hidden rounded-full border-2 px-7 py-3 text-[15px] font-semibold w-fit flex items-center gap-2 cursor-pointer"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            <span
              className="absolute top-0 h-full w-0 group-hover:w-[250%] pointer-events-none"
              style={{
                left: "-50%",
                transform: "skewX(-35deg)",
                background: BLUE,
                zIndex: 0,
                transition: "width 0.7s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <span
              className="relative transition-colors duration-700 group-hover:text-white"
              style={{ zIndex: 1 }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DevelopLeft() {
  const stack = [
    { label: "Figma",          bg: "#F24E1E", light: false },
    { label: "React",          bg: "#20D9FF", light: true  },
    { label: "Tailwind CSS",   bg: "#06B6D4", light: true  },
    { label: "TypeScript",     bg: "#3178C6", light: false },
    { label: "Design Tokens",  bg: BLUE,      light: false },
    { label: "Next.js",        bg: "#0f172a", light: false },
  ];
  return (
    <div>
      <h2 className="text-4xl xl:text-[52px] font-extrabold leading-[1.12] tracking-tight text-gray-900 mb-8">
        Handoff Ready
        <br />
        <span style={{ color: BLUE }}>To Ship</span>
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {stack.map((s) => (
          <span
            key={s.label}
            className="px-4 py-2 rounded-lg text-sm font-bold"
            style={{
              background: s.bg,
              color: s.light ? "#0f172a" : "#ffffff",
            }}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function DeliverLeft() {
  const stats = [
    { value: "100%", label: "Handoff Specs" },
    { value: "AAA",  label: "WCAG Accessible" },
    { value: "< 48h", label: "QA Turnaround" },
  ];
  return (
    <div>
      <h2 className="text-4xl xl:text-[52px] font-extrabold leading-[1.12] tracking-tight text-gray-900 mb-8">
        Launched.{" "}
        <br />
        <span style={{ color: BLUE }}>Measured. Owned.</span>
      </h2>
      <div className="flex gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span
              className="text-[32px] font-extrabold leading-none"
              style={{ color: BLUE }}
            >
              {s.value}
            </span>
            <span className="text-sm text-gray-500 mt-1.5 font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const LEFT_PANELS = [
  DiscoverLeft,
  DefineLeft,
  DesignLeft,
  DevelopLeft,
  DeliverLeft,
];

const STEPS = [
  {
    num: "01",
    title: "Discover Stage",
    body: "We start by learning your business, your audience, and your competitors — so we understand what makes your brand different before we design.",
  },
  {
    num: "02",
    title: "Define Stage",
    body: "We turn those insights into a clear plan. That means user journeys, wireframes, and mood boards that guide every decision.",
  },
  {
    num: "03",
    title: "Design Stage",
    body: "This is where it all comes together — UI, motion, branding, and every visual detail, polished until it feels effortless.",
  },
  {
    num: "04",
    title: "Develop Stage",
    body: "We hand everything off clean, with clear files — so your team builds exactly what we designed, no guesswork, ever.",
  },
  {
    num: "05",
    title: "Deliver Stage",
    body: "Before launch, we review everything — quality, performance, and polish — then stay close after, making sure results keep improving.",
  },
];

const STEP_PX = 230;

export function ProcessSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let raf = 0;

    /* Recompute the wrapper's document-relative top fresh every time —
       caching it once is fragile to layout shift from images loading
       below the fold, which silently desyncs the scroll math. */
    const update = () => {
      const top = wrapper.getBoundingClientRect().top + window.scrollY;
      const scrolledIn  = window.scrollY - top;
      const totalScroll = wrapper.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      if (scrolledIn < 0 || scrolledIn > totalScroll) return;

      const stepSlice = totalScroll / STEPS.length;
      const step = Math.min(
        Math.floor(scrolledIn / stepSlice),
        STEPS.length - 1
      );
      setActiveStep(step);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const LeftPanel = LEFT_PANELS[activeStep];

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${(STEPS.length + 1) * 100}vh` }}
    >
      <div
        data-navbar-theme="light"
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh", background: BG }}
      >
        <div className="flex items-center justify-center h-full px-8 md:px-16 xl:px-24">
          <div className="flex items-start gap-12 w-full max-w-7xl">

            <div className="w-[42%] flex-shrink-0">
              <div key={activeStep} className="dl-step-left-in">
                <LeftPanel />
              </div>
            </div>

            <div
              className="flex-1 overflow-hidden"
              style={{ height: `${STEP_PX * 1.65}px` }}
            >
              <div
                style={{
                  transform:  `translateY(-${activeStep * STEP_PX}px)`,
                  transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "transform",
                }}
              >
                {STEPS.map((step, i) => {
                  const isActive = i === activeStep;
                  const isPast   = i < activeStep;

                  return (
                    <div
                      key={step.num}
                      className="flex gap-8"
                      style={{
                        height:     `${STEP_PX}px`,
                        opacity:    isPast ? 0 : isActive ? 1 : 0.3,
                        transition: "opacity 0.85s ease",
                      }}
                    >
                      <div className="flex flex-col items-center flex-shrink-0 pt-1">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{
                            border:     `2px solid ${isActive ? BLUE : "#9BBDD4"}`,
                            color:       isActive ? BLUE : "#9BBDD4",
                            background: "transparent",
                            transition: "border-color 0.85s ease, color 0.85s ease",
                          }}
                        >
                          {step.num}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div
                            style={{
                              flex:       1,
                              width:      0,
                              borderLeft: "2px dashed #9BBDD4",
                              marginTop:  "8px",
                            }}
                          />
                        )}
                      </div>

                      <div className="pt-1.5 max-w-[420px]">
                        <h3
                          className="text-[20px] font-bold mb-2.5 leading-snug"
                          style={{
                            color:      isActive ? "#0f172a" : "#94a3b8",
                            transition: "color 0.85s ease",
                          }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-[14px] leading-relaxed"
                          style={{
                            color:      isActive ? "#64748b" : "#94a3b8",
                            transition: "color 0.85s ease",
                          }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
