'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

const BLUE = '#0018C5';
const NAVY = '#080C42';

/* ── Right-side steps ─────────────────────────────────────────────────────── */

const STEPS = [
  {
    num: '01',
    label: 'STEP 01',
    title: 'High-Intent Paid Traffic',
    body: 'Google Ads, Meta, and SEO campaigns acquire high-ticket buyers searching with intent.',
    badge: 'Budget Spent: 100%',
    badgeClass: 'text-[#0018C5] bg-blue-50 border-blue-100',
    color: '#0018C5',
  },
  {
    num: '02',
    label: 'STEP 02',
    title: 'After-Hours Arrival',
    body: 'Prospect arrives ready to book, but the front desk is closed and staff have gone home.',
    badge: 'Time: 7:45 PM',
    badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
    color: '#F59E0B',
  },
  {
    num: '03',
    label: 'STEP 03 · THE BREAK',
    title: 'Static Web Form / Voicemail',
    body: 'No immediate live answer or booking confirmation. The warm customer intent goes cold.',
    badge: 'Response: 14+ hours',
    badgeClass: 'text-rose-700 bg-rose-100 border-rose-300',
    color: '#EF4444',
  },
  {
    num: '04',
    label: 'STEP 04 · OUTCOME',
    title: 'Lost to Faster Competitor',
    body: 'Lead calls the next provider on Google who responds in under a minute. Deal lost permanently.',
    badge: 'Conversion: 0%',
    badgeClass: 'text-rose-600 bg-rose-50 border-rose-200',
    color: '#64748B',
  },
];

/* ── Left-panel content per step ──────────────────────────────────────────── */

const H2 = 'font-extrabold leading-[1.12] tracking-tight text-[#080C42] text-[clamp(30px,3.6vw,52px)]';
const GRAD: React.CSSProperties = {
  background: `linear-gradient(90deg, ${BLUE}, #2563EB)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

function IntroLeft() {
  return (
    <div>
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-5 rounded-full bg-white border border-[#E2E2DC] text-[#0018C5] text-xs font-mono font-semibold tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
        THE INBOUND BOTTLENECK
      </div>
      <h2 className={H2}>
        Your ads drive the lead.
        <br />
        <span style={GRAD}>Who answers in 60s?</span>
      </h2>
      <p className="mt-5 max-w-[440px] text-sm sm:text-[15px] leading-relaxed text-[#555A68]">
        Businesses invest heavily in clicks, only to lose high-intent buyers after 5 PM to static web forms, slow follow-ups, and unanswered phone calls.
      </p>
    </div>
  );
}

function AfterHoursLeft() {
  const chips = ['Front desk closed', 'No live agent', 'Ad click already paid for'];
  return (
    <div>
      <h2 className={`${H2} mb-7`}>
        The Click Lands
        <br />
        <span style={GRAD}>After 5 PM</span>
      </h2>
      <div className="flex flex-wrap gap-2.5 mb-6">
        {chips.map((c) => (
          <span
            key={c}
            className="px-4 py-2 rounded-full text-sm font-semibold border"
            style={{ borderColor: BLUE, color: BLUE, background: 'rgba(0,24,197,0.07)' }}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="max-w-[440px] p-3.5 rounded-xl bg-white border border-[#EAEAE4] flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 text-rose-600">
          <Flame className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600">Lead Decay Velocity</div>
          <div className="text-xs font-medium text-[#080C42] leading-snug mt-0.5">
            Prospects are <strong className="text-rose-600">21x less likely</strong> to convert after 30 minutes of silence.
          </div>
        </div>
      </div>
    </div>
  );
}

function BreakLeft() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      if (n >= 62) { setCount(62); clearInterval(id); return; }
      setCount(n);
    }, 24);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h2 className={`${H2} mb-7`}>
        Where Revenue
        <br />
        <span style={{ color: '#EF4444' }}>Quietly Leaks</span>
      </h2>
      <div className="flex items-baseline gap-1.5 mb-4">
        <span className="text-[56px] font-black font-mono tabular-nums leading-none text-[#080C42]">{count}</span>
        <span className="text-3xl font-black text-rose-500 leading-none">%</span>
        <span className="text-xs text-[#717684] font-medium ml-2 max-w-[150px] leading-snug">
          of qualified inbound inquiries abandoned
        </span>
      </div>
      <div className="space-y-2 text-[13px] text-[#484D5E] max-w-[440px]">
        {[
          <>Average competitor takes <strong>14.2 hours</strong> to reply to web forms.</>,
          <>Over <strong>62%</strong> of calls after 5:00 PM go to voicemail and abandon.</>,
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[#0018C5] shrink-0 font-bold text-[10px]">✓</div>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutcomeLeft() {
  const stats = [
    { value: '14.2h', label: 'Competitor reply' },
    { value: '<60s', label: 'Winning window' },
    { value: '0%', label: 'Conversion' },
  ];
  return (
    <div>
      <h2 className={`${H2} mb-7`}>
        Spheno Answers
        <br />
        <span style={GRAD}>Before They Leave</span>
      </h2>
      <div className="flex gap-8 mb-7">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="text-[30px] font-extrabold leading-none font-mono" style={{ color: BLUE }}>{s.value}</span>
            <span className="text-sm text-gray-500 mt-1.5 font-medium">{s.label}</span>
          </div>
        ))}
      </div>
      <a
        href="#system"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#080C42] hover:bg-[#0018C5] text-white font-semibold text-sm transition-colors duration-300"
      >
        Explore the Spheno Fix
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-[#646A7A] font-medium">
        <Sparkles className="w-4 h-4 text-[#0018C5]" />
        Intercepts at Step 03 in &lt;1.2s across Chat, Voice &amp; WhatsApp.
      </div>
    </div>
  );
}

const LEFT_PANELS = [IntroLeft, AfterHoursLeft, BreakLeft, OutcomeLeft];

/* ── Section ──────────────────────────────────────────────────────────────── */

export const TheProblem: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepPx, setStepPx] = useState(230);

  useEffect(() => {
    const setSize = () => setStepPx(window.innerWidth < 1024 ? 170 : 230);
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let ticking = false;

    const compute = () => {
      ticking = false;
      const rect = wrapper.getBoundingClientRect();
      const totalScroll = wrapper.offsetHeight - window.innerHeight;
      const scrolledIn = -rect.top;
      if (totalScroll <= 0) return;
      const clamped = Math.min(Math.max(scrolledIn, 0), totalScroll - 1);
      const slice = totalScroll / STEPS.length;
      setActiveStep(Math.min(Math.floor(clamped / slice), STEPS.length - 1));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const LeftPanel = LEFT_PANELS[activeStep];

  return (
    <section className="bg-[#FBFBFA] text-[#0A0D2C] border-b border-[#ECECE6] relative overflow-x-clip">
      <style>{`
        @keyframes problemStepIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        .problem-step-in { animation: problemStepIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @media (prefers-reduced-motion: reduce) { .problem-step-in { animation: none; } }
      `}</style>

      <div ref={wrapperRef} style={{ height: `${(STEPS.length + 1) * 100}vh` }}>
        <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #080C42 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative flex items-start lg:items-center justify-center h-full px-6 md:px-12 xl:px-20 pt-24 lg:pt-0">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-6 lg:gap-12 w-full max-w-7xl">

              {/* LEFT — remounts per step so the fade-up replays */}
              <div className="lg:w-[46%] lg:flex-shrink-0">
                <div key={activeStep} className="problem-step-in">
                  <LeftPanel />
                </div>
              </div>

              {/* RIGHT — sliding step list */}
              <div className="flex-1 overflow-hidden" style={{ height: `${stepPx * 1.65}px` }}>
                <div
                  style={{
                    transform: `translateY(-${activeStep * stepPx}px)`,
                    transition: 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform',
                  }}
                >
                  {STEPS.map((step, i) => {
                    const isActive = i === activeStep;
                    const isPast = i < activeStep;
                    return (
                      <div
                        key={step.num}
                        className="flex gap-5 sm:gap-8"
                        style={{
                          height: `${stepPx}px`,
                          opacity: isPast ? 0 : isActive ? 1 : 0.3,
                          transition: 'opacity 0.85s ease',
                        }}
                      >
                        <div className="flex flex-col items-center flex-shrink-0 pt-1">
                          <div
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                            style={{
                              border: `2px solid ${isActive ? step.color : '#B8C4D6'}`,
                              color: isActive ? step.color : '#B8C4D6',
                              boxShadow: isActive ? `0 0 22px ${step.color}33` : 'none',
                              transition: 'border-color 0.85s ease, color 0.85s ease, box-shadow 0.85s ease',
                            }}
                          >
                            {step.num}
                          </div>
                          {i < STEPS.length - 1 && (
                            <div style={{ flex: 1, width: 0, borderLeft: '2px dashed #B8C4D6', marginTop: 8 }} />
                          )}
                        </div>

                        <div className="pt-1.5 max-w-[420px]">
                          <div
                            className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5"
                            style={{ color: isActive ? step.color : '#94a3b8', transition: 'color 0.85s ease' }}
                          >
                            {step.label}
                          </div>
                          <h3
                            className="text-[19px] sm:text-[20px] font-bold mb-2.5 leading-snug"
                            style={{ color: isActive ? NAVY : '#94a3b8', transition: 'color 0.85s ease' }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className="text-[13px] sm:text-[14px] leading-relaxed mb-3"
                            style={{ color: isActive ? '#64748b' : '#94a3b8', transition: 'color 0.85s ease' }}
                          >
                            {step.body}
                          </p>
                          <span className={`inline-block text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${step.badgeClass}`}>
                            {step.badge}
                          </span>
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
    </section>
  );
};
