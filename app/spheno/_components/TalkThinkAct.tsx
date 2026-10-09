'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  badge: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Set the direction',
    description: 'Leaders agree on what AI is for, the rules it runs by, and who owns it.',
    badge: 'GOVERNANCE & SCOPE',
    deliverables: ['Executive AI alignment', 'Data boundaries & guardrails', 'Owner assignment'],
  },
  {
    step: '02',
    title: 'Train the team',
    description: 'People use AI in their daily work and know where it does not help.',
    badge: 'HUMAN ENABLEMENT',
    deliverables: ['Staff hands-on workflows', 'Limitation awareness', 'Operational handoff'],
  },
  {
    step: '03',
    title: 'Build what earned its place',
    description: 'One workflow first, then a system your organization owns.',
    badge: 'TARGETED DEPLOYMENT',
    deliverables: ['Single revenue workflow first', 'Sub-400ms telephony & chat', 'Proprietary IP retention'],
  },
  {
    step: '04',
    title: 'Run it and keep improving',
    description: 'Agents are monitored and supported, and they report into your client portal.',
    badge: 'CONTINUOUS OPTIMIZATION',
    deliverables: ['24/7 agent supervision', 'Real-time telemetry portal', 'Closed-loop model tuning'],
  },
];

export const TalkThinkAct: React.FC = () => {
  const outerRef = useRef<HTMLDivElement | null>(null); // tall scroll-jack track
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const total = processSteps.length;

  // The section pins in place (via the sticky inner wrapper below) while the
  // extra height of `outerRef` is scrolled through, and `progress` (0-1) tracks
  // how far through that pinned scroll we are. The first 3 points each get an
  // equal, generous scroll segment (weight 1) so a fast scroll can't skip past
  // one — but the LAST point gets a much shorter one (weight 0.35): once it's
  // active there's nothing left to reveal, so giving it a full equal quarter
  // just felt like one extra, pointless scroll before the section finally
  // released and the page moved on.
  const [progress, setProgress] = useState(0);
  const segmentWeights = [1, 1, 1, 0.35];
  const totalWeight = segmentWeights.reduce((a, b) => a + b, 0);
  const segmentBounds = (() => {
    let cumulative = 0;
    return segmentWeights.map((w) => { cumulative += w; return cumulative / totalWeight; });
  })();

  useEffect(() => {
    let ticking = false;

    const computeProgress = () => {
      ticking = false;
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const p = -rect.top / scrollable;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    // Batch to one measurement per animation frame instead of once per raw
    // scroll event — un-throttled getBoundingClientRect() reads on every
    // scroll tick force layout thrashing and were a source of site-wide jank.
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(computeProgress);
    };

    computeProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  let activeStepIndex = segmentBounds.findIndex((b) => progress < b);
  if (activeStepIndex === -1) activeStepIndex = total - 1;
  // Fill snaps to each point's own target the moment it activates, then holds
  // steady for the rest of that point's dwell (the existing CSS transition
  // below animates the snap smoothly) — it does not keep growing continuously
  // through the whole segment, so it visibly stops for good once point 4 hits 100%.
  const currentLineHeight = `${((activeStepIndex + 1) / total) * 100}%`;

  return (
    <section
      id="execution"
      className="bg-[#020410] text-white border-b border-[#141A3D] relative overflow-x-clip select-none"
    >
      <style>{`
        @keyframes shimmerFlow {
          0%   { top: -70px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes cardEnter {
          0%   { opacity: 0; transform: translateY(14px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
      {/* Tall scroll-jack track: the section pins (via the sticky wrapper inside)
          for this whole extra height, giving the timeline room to fill before the
          page continues scrolling to the next section. overflow-x-clip (not
          overflow-hidden) on the section above is required — plain overflow:hidden
          silently breaks position:sticky here, same as it did in SphenoSystem. */}
      <div ref={outerRef} className="relative" style={{ height: '380vh' }}>
        <div className="sticky top-0 min-h-screen flex items-center py-6 sm:py-8">

          {/* Background Ambient Atmosphere (Spheno Electric Cyan & Royal Sapphire) */}
          <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse closest-side, rgba(0,242,254,0.10) 0%, transparent 100%)' }} />
          <div className="absolute bottom-1/4 right-[-5%] w-[550px] h-[550px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse closest-side, rgba(0,24,197,0.20) 0%, transparent 100%)' }} />

          {/* Subtle Dot Grid */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #00F2FE 1px, transparent 0)`,
              backgroundSize: '36px 36px'
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">

        {/* ========================================================= */}
        {/* MAIN CONTAINER: 2-COLUMN SPLIT                            */}
        {/* Left: Section Headings & Interactive Status               */}
        {/* Right: The Exact 4-Step Vertical Timeline in Cyan Theme   */}
        {/* ========================================================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#05071F]/90 border border-white/[0.08] backdrop-blur-2xl p-5 sm:p-7 lg:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ===================================================== */}
            {/* LEFT COLUMN: Headings, Body & Active Step Overview    */}
            {/* ===================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28">

              {/* Eyebrow Pill Badge (Spheno Signature Theme) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#060B24]/90 border border-cyan-400/40 text-xs font-semibold text-cyan-300 mb-3 shadow-[0_0_15px_rgba(0,242,254,0.2)] w-fit">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase tracking-wider font-mono">HOW IT WORKS · THE PROCESS</span>
              </div>

              {/* Dominant Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-[1.14]">
                Our Process. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                  How Spheno builds systems.
                </span>
              </h2>

              {/* Supporting Copy */}
              <p className="mt-3 text-sm sm:text-base text-[#9EA6CA] leading-relaxed font-normal">
                Businesses do not need random chatbots. They need a disciplined progression from leadership clarity to battle-tested autonomous revenue engines.
              </p>

              {/* Active Step Feature Card */}
              <div
                key={activeStepIndex}
                className="mt-4 p-3.5 rounded-2xl bg-white/[0.03] border border-cyan-400/20 backdrop-blur-md"
                style={{ animation: 'cardEnter 0.45s cubic-bezier(0.16,1,0.3,1) forwards' }}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider">
                    CURRENT PHASE {processSteps[activeStepIndex].step}
                  </span>
                  <span className="text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">
                  {processSteps[activeStepIndex].title}
                </h4>
                <div className="space-y-1 mt-2">
                  {processSteps[activeStepIndex].deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>


            </div>

            {/* ===================================================== */}
            {/* RIGHT COLUMN: TIMELINE WITH SCROLL LINE (CYAN THEME)  */}
            {/* ===================================================== */}
            <div className="lg:col-span-7 relative pl-2 sm:pl-6">

              {/* 1. Base Grey Timeline Spine (Full Height) */}
              <div className="absolute left-[19px] sm:left-[35px] top-6 bottom-10 w-[2px] bg-[#1E293B] pointer-events-none" />

              {/* 2. Active Glowing Gradient Spine — with flowing energy shimmer */}
              <div
                className="absolute left-[19px] sm:left-[35px] top-6 w-[2px] overflow-hidden pointer-events-none transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  height: currentLineHeight,
                  background: 'linear-gradient(to bottom, #FFFFFF 0%, #00F2FE 45%, #0070F3 100%)',
                  boxShadow:
                    '0 0 4px rgba(255,255,255,0.9), 0 0 12px rgba(0,242,254,1), 0 0 28px rgba(0,242,254,0.65), 0 0 50px rgba(0,112,243,0.45)',
                }}
              >
                {/* Energy flow shimmer — travels down the filled portion on loop */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    height: '70px',
                    background:
                      'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
                    animation: 'shimmerFlow 1.8s ease-in-out infinite',
                  }}
                />
              </div>


              {/* 3. Steps Stack */}
              <div className="space-y-5 sm:space-y-6">
                
                {processSteps.map((stepItem, index) => {
                  const isActive = index === activeStepIndex;
                  const isPassed = index < activeStepIndex;

                  return (
                    <div
                      key={stepItem.step}
                      ref={(el) => { stepRefs.current[index] = el; }}
                      onClick={() => stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      className="relative pl-12 sm:pl-16 group cursor-pointer transition-all duration-300"
                    >
                      {/* Timeline Node / Bead (Spheno Cyan Theme) */}
                      <div
                        className={`absolute left-[13px] sm:left-[29px] top-1.5 rounded-full transition-all duration-400 flex items-center justify-center ${
                          isActive
                            ? 'w-4 h-4 -left-[2px] sm:-left-[2px] bg-white border-2 border-cyan-400 shadow-[0_0_16px_#00F2FE] scale-125'
                            : isPassed
                            ? 'w-3.5 h-3.5 bg-cyan-400 border-2 border-white/80 shadow-[0_0_8px_#00F2FE]'
                            : 'w-3 h-3 bg-[#0B0F2A] border border-[#334155] group-hover:border-[#64748B]'
                        }`}
                      >
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0018C5]" />
                        )}
                      </div>

                      {/* Step Number (Spheno Cyan Theme) */}
                      <span
                        className={`text-xs font-mono font-bold tracking-widest block uppercase mb-1 transition-colors duration-300 ${
                          isActive 
                            ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,242,254,0.7)]' 
                            : isPassed
                            ? 'text-cyan-200/80'
                            : 'text-[#475569]'
                        }`}
                      >
                        {stepItem.step}
                      </span>

                      {/* Title */}
                      <h3
                        className={`text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight transition-colors duration-300 ${
                          isActive 
                            ? 'text-white' 
                            : isPassed
                            ? 'text-[#E2E8F0]'
                            : 'text-[#475569] group-hover:text-[#94A3B8]'
                        }`}
                      >
                        {stepItem.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`mt-1 text-xs sm:text-sm leading-relaxed max-w-xl transition-colors duration-300 font-normal ${
                          isActive 
                            ? 'text-[#CBD5E1]' 
                            : isPassed
                            ? 'text-[#94A3B8]'
                            : 'text-[#334155] group-hover:text-[#64748B]'
                        }`}
                      >
                        {stepItem.description}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </div>

          </div>
        </div>
      </div>
    </section>
  );
};
