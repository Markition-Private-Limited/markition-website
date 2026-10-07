"use client";

const CARDS = [
  {
    title: "SEO",
    sub: "Search visibility",
    desc: "Technical, on-page and content optimisation that helps the right customers find you on search, and keeps you ahead as algorithms change.",
  },
  {
    title: "Paid Media",
    sub: "Performance campaigns",
    desc: "Data-driven campaigns across search and social, built around measurable outcomes and continuously optimised for return on spend.",
  },
  {
    title: "Social",
    sub: "Audience engagement",
    desc: "Platform-native content and community management that builds an engaged audience and turns attention into conversations.",
  },
  {
    title: "Content",
    sub: "Meaningful communication",
    desc: "Clear, compelling storytelling across web, video and campaigns that speaks to your customers and moves them to act.",
  },
];

export default function Services() {
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

        {/* Cards row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              data-stagger={String(i + 2)}
              className="relative flex flex-col overflow-hidden rounded-2xl cursor-pointer group shadow-[0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_48px_-12px_rgba(0,212,255,0.35),0_8px_20px_rgba(0,0,40,0.25)] hover:-translate-y-2 hover:scale-[1.04] focus-within:-translate-y-2 focus-within:scale-[1.04] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                gap: 0,
                background: "#ffffff",
              }}
            >
              {/* Accent bar sweeps in across the top */}
              <span
                aria-hidden
                className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background: "linear-gradient(90deg, #1964D1, #00D4FF)" }}
              />
              <div className="flex flex-col items-center justify-center px-6 py-6 sm:px-8 sm:py-8">
              <span
                className="text-[#000028] block leading-none group-hover:text-[#1964D1] group-hover:-translate-y-0.5 group-hover:tracking-[0.01em] transition-all duration-500"
                style={{
                  fontFamily: "var(--font-instrument, 'Instrument Serif', serif)",
                  fontSize: "clamp(32px, 3.8vw, 52px)",
                  fontWeight: 400,
                }}
              >
                {card.title}
              </span>
              <span className="text-[#000028]/50 text-[12px] sm:text-[13px] font-medium tracking-wide text-center">
                {card.sub}
              </span>
              </div>

              {/* Description — card grows downward on hover to reveal it */}
              <div
                className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out"
                style={{ background: "#000028" }}
              >
                <div className="overflow-hidden">
                  <p className="text-white/85 text-[12px] sm:text-[13px] leading-[1.6] text-center px-6 py-5 sm:px-8">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
