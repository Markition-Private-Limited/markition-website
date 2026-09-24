"use client";

import { Reveal } from "../../ui/Reveal";

const BG   = "#060D24";
const CYAN = "#00CFFF";

function InteractiveText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={className}>
      {text.split(" ").map((word, i) => {
        let leaveTimer: ReturnType<typeof setTimeout>;

        return (
          <span
            key={i}
            className="inline-block mr-[0.28em] cursor-default"
            style={{ transition: "color 0.12s ease, transform 0.15s ease" }}
            onMouseEnter={(e) => {
              clearTimeout(leaveTimer);
              const el = e.currentTarget as HTMLElement;
              el.style.color = CYAN;
              el.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "";
              leaveTimer = setTimeout(() => {
                el.style.transition = "color 0.4s ease, transform 0.15s ease";
                el.style.color = "";
                setTimeout(() => {
                  el.style.transition = "color 0.12s ease, transform 0.15s ease";
                }, 400);
              }, 1000);
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

const CARDS = [
  {
    title: "Strategic Foundation",
    body: "Every aesthetic decision stems from deep research, user behavior patterns, and commercially aligned brand positioning.",
  },
  {
    title: "Mathematical Precision",
    body: "Rigorous atomic design systems, tokenized spacing scales, and WCAG AAA accessibility across all responsive viewports.",
  },
  {
    title: "Built To Scale",
    body: "Developer-ready handoff specs with clean React component hierarchy, JSON token exports, and zero engineering guesswork.",
  },
];

function PhilosophyCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-8 cursor-default"
      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <span
        className="absolute top-0 h-full w-0 group-hover:w-[250%] pointer-events-none"
        style={{
          left: "-50%",
          transform: "skewX(-35deg)",
          background: CYAN,
          zIndex: 0,
          transition: "width 1s ease-in-out",
        }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        <h3 className="text-xl font-bold mb-3 text-white transition-colors duration-[1000ms] group-hover:text-[#060D24]">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/50 transition-colors duration-[1000ms] group-hover:text-[#060D24]/75">
          {body}
        </p>
      </div>
    </div>
  );
}

export function PhilosophySection() {
  return (
    <section
      data-navbar-theme="dark"
      className="py-28 px-8 md:px-16 xl:px-24"
      style={{ background: BG }}
    >
      <div className="mx-auto max-w-7xl grid gap-20 lg:grid-cols-2 items-center">

        <div>
          <Reveal variant="left" duration={900}>
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
              Where Creative Thinking Meets
              <br />
              <span style={{ color: CYAN }}>Purposeful Design</span>
            </h2>
          </Reveal>

          <Reveal variant="up" delay={120} duration={900}>
            <InteractiveText
              text="Great design is more than looking good. It should communicate clearly, create emotion, improve experiences, and move people toward action."
              className="mt-8 text-[17px] leading-relaxed text-white/60"
            />
          </Reveal>

          <Reveal variant="up" delay={240} duration={900}>
            <InteractiveText
              text="At Markition Design Lab, we combine creative direction, strategic thinking, visual storytelling, and user-centered design to create digital experiences and brand assets built for real business outcomes. We don't believe in generic templates or decorative vanity projects — every pixel is engineered for market advantage."
              className="mt-5 text-[15px] leading-relaxed text-white/40"
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} variant="right" delay={i * 130} duration={800}>
              <PhilosophyCard {...card} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
