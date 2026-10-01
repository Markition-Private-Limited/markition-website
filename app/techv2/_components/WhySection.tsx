import { ArrowUpRight, Handshake, Zap, BarChart2, MessageCircle, Tag, Code } from "lucide-react";

const cards = [
  {
    title: "Long-Term Tech Partnership",
    desc: "We stay with you post-launch. Ongoing support, iterations, and scaling as your business grows.",
    bg: "#20232D",
    text: "white",
    icon: Handshake,
    accent: "#062283",
  },
  {
    title: "Fast Delivery",
    desc: "Ship in weeks, not months. Lean processes and battle-tested boilerplates accelerate delivery.",
    bg: "white",
    text: "black",
    icon: Zap,
    accent: "#20232D",
  },
  {
    title: "Growth-Oriented Thinking",
    desc: "Architecture built for scale. We think about your next million users from day one, ensuring long-term performance.",
    bg: "white",
    text: "black",
    icon: BarChart2,
    accent: "#20232D",
  },
  {
    title: "WhatasApp-Friendly Communication",
    desc: "No complex project tools or email chains. We keep you updated directly on WhatsApp in a language you are comfortable with.",
    bg: "white",
    text: "black",
    icon: MessageCircle,
    accent: "#20232D",
  },
  {
    title: "Transparent, Fixed Pricing",
    desc: "No hidden charges. You get a detailed quote in writing before we begin — with GST invoice provided.",
    bg: "white",
    text: "black",
    icon: Tag,
    accent: "#20232D",
  },
  {
    title: "Full Code Ownership",
    desc: "Your code, your domain, your data. Everything is handed over at project end — no lock-ins, ever.",
    bg: "white",
    text: "black",
    icon: Code,
    accent: "#20232D",
  },
];

export function WhySection() {
  return (
    <section className="overflow-hidden bg-transparent py-20 md:py-28" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#062283]">WHY US</p>
          <h2 className="max-w-4xl text-[38px] font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl md:text-6xl">
            Software Built To Actually Last
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-black/60 sm:text-base">
            We don&apos;t hand you a website and disappear. Every CRM, ERP, or custom platform we build is engineered to grow with your business for years, not months.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const isDark = card.bg !== "white";
            return (
              <article
                key={card.title}
                className="group relative rounded-lg flex min-h-[360px] overflow-hidden border border-black/20 p-7 transition-colors duration-700"
                style={{ backgroundColor: card.bg, color: card.text }}
              >
                <div
                  className="pointer-events-none absolute left-7 top-7 z-0 h-12 w-12 rounded-tl-[18px] rounded-br-[18px]"
                  style={{ backgroundColor: card.accent }}
                />
                <div className="relative z-10 flex w-full flex-col">
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center group-hover:bg-[#062283] rounded-tl-[18px] rounded-br-[18px] transition-colors duration-300"
                  >
                    <Icon size={22} className={isDark ? "text-white" : "text-white"} />
                  </div>
                  <ArrowUpRight
                    size={24}
                    className="absolute right-0 top-0 h-6 w-6 transition-all duration-700"
                    style={{ color: isDark ? "white" : "black" }}
                  />
                  <h3
                    className="max-w-[260px] text-2xl font-medium leading-[1] tracking-[-0.04em] transition-colors duration-700"
                    style={{ color: isDark ? "white" : "black" }}
                  >
                    {card.title}
                  </h3>
                  <div className="flex-1" />
                  <p
                    className="max-w-[300px] text-[15px] leading-relaxed transition-colors duration-700"
                    style={{ color: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.6)" }}
                  >
                    {card.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
