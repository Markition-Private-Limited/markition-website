"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants";
import ScrollReveal from "@/components/ScrollReveal";
import TabBar from "./TabBar";
import DemoPanel from "./DemoPanel";

export default function AIServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6" style={{ background: "#000028" }}>
      <div className="max-w-[1200px] mx-auto space-y-8 sm:space-y-10">

        {/* Heading */}
        <div className="text-center">
          <ScrollReveal delay={80} threshold={0.2}>
            <h2
              className="font-bold leading-tight mb-3 sm:mb-4 text-[26px] sm:text-[32px] lg:text-[38px]"
              style={{
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Put AI To Work Across<br />
              Your <span style={{ color: "#20D9FF" }}>Business</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160} threshold={0.2}>
            <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed max-w-lg mx-auto">
              Autonomous systems, conversational agents, and intelligent workflows
              engineered for enterprise scale and measurable business impact.
            </p>
          </ScrollReveal>
        </div>

        {/* Horizontal tab bar */}
        <ScrollReveal delay={220} threshold={0.15}>
          <TabBar active={active} onSelect={setActive} />
        </ScrollReveal>

        {/* Full-width demo card */}
        <ScrollReveal delay={300} threshold={0.1}>
          <DemoPanel svc={SERVICES[active]} />
        </ScrollReveal>

      </div>
    </section>
  );
}
