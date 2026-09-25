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
    body: "Every design decision starts with real research — your audience, your market, and what actually sells.",
  },
  {
    title: "Mathematical Precision",
    body: "Clean design systems, consistent spacing, and full accessibility — built right the first time, every time.",
  },
  {
    title: "Built To Scale",
    body: "Developer-ready files, clean handoff, and zero guesswork — your team builds exactly what we designed together.",
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
              A Design Agency{" "}
              <span style={{ color: CYAN }}>Built On Purpose</span>
            </h2>
          </Reveal>

          <Reveal variant="up" delay={120} duration={900}>
            <InteractiveText
              text="Great design is more than looking good — it should communicate clearly, build trust, and move real people to take action."
              className="mt-8 text-[17px] leading-relaxed text-white/60"
            />
          </Reveal>

          <Reveal variant="up" delay={240} duration={900}>
            <InteractiveText
              text="At Markition DesignLab, we bring together UI/UX design, branding, social media post design, and video editing to build visual identities and digital experiences that actually perform. We skip generic templates — every logo, post, and video is built to make your brand truly unforgettable."
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
