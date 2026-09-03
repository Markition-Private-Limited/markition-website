import ScrollReveal from "@/components/ScrollReveal";
import { SERVICES } from "@/lib/constants";

interface Props {
  active: number;
  onSelect: (i: number) => void;
}

export default function ServiceList({ active, onSelect }: Props) {
  return (
    <div
      style={{
        fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
        position: "relative",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <ScrollReveal delay={80} threshold={0.2}>
        <h2
          className="font-bold leading-tight mb-3 sm:mb-4 text-[26px] sm:text-[32px] lg:text-[38px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Put AI To Work Across<br />
          Your <span style={{ color: "#0040FF" }}>Business</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={160} threshold={0.2}>
        <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-sm">
          Autonomous systems, conversational agents, and intelligent workflows
          engineered for enterprise scale and measurable business impact.
        </p>
      </ScrollReveal>

      <div className="flex flex-col">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onSelect(i)}
            className="relative flex items-center gap-3 sm:gap-4 text-left px-3 sm:px-4 py-3 sm:py-4 overflow-hidden border-b border-white/[0.08] w-full"
          >
            {active === i && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(255,255,255,0.04) 0%, transparent 75%)",
                  animation: "tab-bg-in 0.25s ease forwards",
                }}
              />
            )}

            <span
              className="relative font-bold tabular-nums w-6 flex-shrink-0 transition-colors duration-300 text-[20px] sm:text-[24px] lg:text-[28px]"
              style={{ color: active === i ? "#ffffff" : "rgba(255,255,255,0.32)" }}
            >
              {s.number}
            </span>

            <span
              className="relative font-medium transition-colors duration-300 ml-2 sm:ml-4 text-[20px] sm:text-[24px] lg:text-[28px]"
              style={{ color: active === i ? "#ffffff" : "rgba(255,255,255,0.32)" }}
            >
              {s.label}
            </span>

            {active === i && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  boxShadow: "0 0 10px 3px rgba(255,255,255,0.3)",
                  animation: "tab-glow-expand 0.35s ease forwards",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
