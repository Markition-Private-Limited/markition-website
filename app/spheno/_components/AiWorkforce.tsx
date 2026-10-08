'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  PhoneCall, 
  Database, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AgentModule {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  buttonText: string;
  targetAnchor: string;
  keyFeature: string;
}

const workforceAgents: AgentModule[] = [
  {
    id: 'chat',
    name: 'Spheno Chat',
    subtitle: 'Website AI Conversational Agent',
    icon: MessageSquare,
    description: 'Deploys instantly onto your website to engage visitors, answer clinical and pricing queries, qualify intent, and lock in direct calendar reservations in real time.',
    buttonText: 'View Chat Agent',
    targetAnchor: '#chat-demo',
    keyFeature: 'Sub-2s Lead Qualification',
  },
  {
    id: 'voice',
    name: 'Spheno Voice',
    subtitle: 'Autonomous AI Telephone Receptionist',
    icon: PhoneCall,
    description: 'Connects directly to your business telephone line to answer calls in sub-400ms latency, talk with natural human inflection, and manage appointment scheduling autonomously.',
    buttonText: 'Explore Voice Receptionist',
    targetAnchor: '#system',
    keyFeature: '380ms Sub-Sec Latency',
  },
  {
    id: 'crm',
    name: 'Spheno CRM',
    subtitle: 'Business Intelligence & Management',
    icon: Database,
    description: 'The central intelligence layer consolidating all customer interactions, audio recordings, qualified intent scores, and multi-channel marketing attribution into one unified record.',
    buttonText: 'Inspect CRM Intelligence',
    targetAnchor: '#system',
    keyFeature: '100% Omnichannel Sync',
  },
  {
    id: 'whatsapp',
    name: 'Spheno WhatsApp AI',
    subtitle: 'Proactive Conversion Agent',
    icon: MessageCircle,
    description: 'Maintains proactive 1-on-1 dialogue with prospects on WhatsApp to automatically follow up after site drop-offs, overcome objections, confirm bookings, and recover lost pipeline.',
    buttonText: 'Discover WhatsApp AI',
    targetAnchor: '#whatsapp-agent',
    keyFeature: '89.1% Verified Delivery',
  },
];

// Staggered motion parameters directly recreating Reference 1 & 2
const cardDelays = [0, 130, 260, 390]; // ms
const cardDurations = [750, 800, 850, 900]; // ms
const cardOffsets = [24, 56, 88, 120]; // px initial vertical displacement (Reference 1)
const cardScales = [0.995, 0.99, 0.985, 0.98];

export const AiWorkforce: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number>(1); // Index 1 is Spheno Voice, matching reference screenshot

  // Check system prefers-reduced-motion setting
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Viewport-triggered reveal: triggers sequential staggered settling into baseline
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="products" 
      className="py-24 md:py-36 bg-white text-[#080C42] border-b border-[#E5E5E0] relative overflow-hidden selection:bg-[#0018C5] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* CENTERED DISPLAY HEADLINE (Exact Editorial Style) */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F2] border border-[#DEDED8] text-xs font-semibold text-[#0018C5] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0018C5]" />
            <span className="uppercase tracking-wider font-mono">INTEGRATED AI AGENTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#080C42] tracking-tight leading-[1.12] text-balance">
            Meet your AI workforce. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0018C5] via-[#2563EB] to-[#6C2CFF]">
              Four agents, unified by design.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#6E706D] max-w-3xl mx-auto leading-relaxed font-normal text-balance">
            Each Spheno product functions as a specialized autonomous team member with deep domain competency in conversations, phone calls, data intelligence, and proactive messaging.
          </p>
        </div>

        {/* 4-COLUMN ELEGANT GRID WITH PRECISE EQUAL HEIGHTS & BUTTON BASELINE */}
        <div className="border border-[#E5E5E0] rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_-15px_rgba(8,12,66,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E0]">
            
            {workforceAgents.map((agent, idx) => {
              const IconComponent = agent.icon;
              const isActive = activeCard === idx;

              return (
                <div
                  key={agent.id}
                  className="relative h-full w-full min-w-0"
                  onMouseEnter={() => setActiveCard(idx)}
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          transform: isVisible
                            ? 'translate3d(0, 0, 0) scale(1)'
                            : `translate3d(0, ${cardOffsets[idx]}px, 0) scale(${cardScales[idx]})`,
                          opacity: isVisible ? 1 : 0,
                          transition: `transform ${cardDurations[idx]}ms cubic-bezier(0.16, 1, 0.3, 1) ${cardDelays[idx]}ms, opacity 600ms ease-out ${cardDelays[idx]}ms`,
                          willChange: isVisible ? 'auto' : 'transform, opacity',
                        }
                  }
                >
                  <div className={`p-7 sm:p-8 xl:p-9 flex flex-col justify-between transition-all duration-300 ease-out relative z-0 hover:z-20 group h-full w-full min-w-0 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(0,24,197,0.35)] ${
                    isActive ? 'bg-[#F9F9FC]' : 'bg-white hover:bg-[#F9F9FC]'
                  }`}>

                    {/* Top Accent Bar (Always sits at top edge of card) */}
                    <div
                      className={`absolute inset-x-0 top-0 h-[3px] group-hover:h-[4px] bg-gradient-to-r from-[#0018C5] via-[#2563EB] to-[#6C2CFF] transition-all duration-300 z-10 shadow-[0_2px_14px_rgba(0,24,197,0.45)] ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />

                    {/* -------------------------------------------------- */}
                    {/* TOP & CONTENT AREA (Flex-1 for uniform spacing)    */}
                    {/* -------------------------------------------------- */}
                    <div className="flex flex-col flex-1">
                      
                      {/* 1. Icon Circle Badge (Identical size and positioning) */}
                      <div className={`w-14 h-14 rounded-full bg-white shadow-xs flex items-center justify-center mb-8 shrink-0 transition-all duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-[#0018C5] group-hover:border-[#0018C5] group-hover:shadow-[0_12px_28px_-6px_rgba(0,24,197,0.5)] ${
                        isActive
                          ? 'border-2 border-[#0018C5] text-[#0018C5] shadow-sm'
                          : 'border border-[#E5E5E0] text-[#080C42]'
                      }`}>
                        <IconComponent className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${
                          isActive ? 'text-[#0018C5]' : 'text-[#080C42]'
                        }`} />
                      </div>

                      {/* 2. Category Eyebrow (Fixed height ensures product titles align across cards) */}
                      <div className="min-h-[32px] sm:min-h-[36px] flex items-center mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0018C5] font-mono leading-tight">
                          {agent.subtitle}
                        </span>
                      </div>

                      {/* 3. Product Name (Fixed min-height guarantees body copy aligns perfectly) */}
                      <div className="min-h-[64px] sm:min-h-[68px] flex items-start mb-3">
                        <h3 className={`text-2xl sm:text-[26px] font-extrabold tracking-tight leading-tight transition-all duration-300 group-hover:translate-x-1 ${
                          isActive ? 'text-[#0018C5]' : 'text-[#080C42] group-hover:text-[#0018C5]'
                        }`}>
                          {agent.name}
                        </h3>
                      </div>

                      {/* 4. Descriptive Body Copy (Equal line-height and typography) */}
                      <p className="text-[14px] sm:text-[15px] text-[#6E706D] leading-[1.65] font-normal mb-8 text-balance">
                        {agent.description}
                      </p>

                      {/* 5. Flexible Expansion Spacer pushes bottom section to exact horizontal baseline */}
                      <div className="flex-1 min-h-[16px]" />
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* BOTTOM ACTION AREA (Exact Same Pixel Baseline)     */}
                    {/* -------------------------------------------------- */}
                    <div className="mt-auto pt-6 border-t border-[#E5E5E0]/80 flex flex-col justify-end">
                      
                      {/* Feature / Proof Line (Consistent height h-5 mb-5 across all 4 cards) */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#0018C5] h-5 mb-5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{agent.keyFeature}</span>
                      </div>

                      {/* CTA Button: Identical Height, Weight, Alignment, and Visual Weight */}
                      <a
                        href={agent.targetAnchor}
                        className="h-[48px] w-full rounded-full border border-[#080C42] hover:border-[#0018C5] bg-white hover:bg-[#080C42] text-[#080C42] hover:text-white transition-all duration-300 px-5 flex items-center justify-between text-xs sm:text-[13px] font-bold shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer group/btn group-hover:border-[#0018C5] group-hover:shadow-md"
                      >
                        <span className="truncate pr-2">{agent.buttonText}</span>
                        <ArrowRight className="w-4 h-4 shrink-0 text-[#080C42] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                      </a>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Refined Bottom Context Indicator (Centered & Refined Typography) */}
        <div className="mt-10 text-center">
          <p className="text-xs sm:text-[13px] text-[#6E706D] font-medium flex items-center justify-center gap-2.5 tracking-wide">
            <span>Scrolls dynamically in unison</span>
            <span className="w-1 h-1 rounded-full bg-[#0018C5]" />
            <span className="text-[#080C42] font-semibold">All 4 agents synchronized via Central Spheno Core</span>
          </p>
        </div>

      </div>
    </section>
  );
};
