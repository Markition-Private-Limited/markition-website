'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FinalCtaProps {
  onOpenConsultation: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative py-24 md:py-32 bg-[#080C42] text-white border-b border-[#161A35] overflow-hidden">
      {/* Background converging blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C42] via-[#050625] to-[#080C42] pointer-events-none" />
      
      {/* Central blue light bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse closest-side, rgba(0,24,197,0.25) 0%, transparent 100%)' }} />

      {/* Converging Graphic Lines: 4 Nodes returning to center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[500px] h-[500px] rounded-full border border-[#BBC4FF]/30 animate-pulse" />
        <div className="absolute w-[340px] h-[340px] rounded-full border border-[#6D7CFF]/40" />
        <div className="absolute w-[180px] h-[180px] rounded-full border border-white/40" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">
        
        {/* Eyebrow */}
        <div className="label-eyebrow text-[#BBC4FF] inline-flex items-center gap-2">
          <span>BUILT BY MARKITION</span>
          <span className="text-[#6D7CFF]">·</span>
          <span>SPHENO AI SYSTEM</span>
        </div>

        {/* Heading */}
        <h2 className="headline-section sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
          You don&apos;t need more AI. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc]">
            You need AI that works.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="body-lead text-[#B9BFDC] mx-auto">
          Unify Spheno Chat, Spheno Voice, Spheno CRM, and Spheno WhatsApp AI under one central system. Stop losing high-intent leads to delayed responses and fill your calendar automatically.
        </p>

        {/* High-Contrast White Primary CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold text-[#080C42] bg-white hover:bg-[#F5F5F2] rounded-lg transition-all shadow-xl hover:shadow-2xl hover:scale-102 group cursor-pointer"
          >
            <span>Talk to Spheno AI</span>
            <ArrowRight className="w-4 h-4 text-[#0018C5] group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#chat-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-[#BBC4FF] hover:text-white border border-[#202449] hover:border-[#6D7CFF] rounded-lg transition-all bg-[#090C39]/80"
          >
            <span>Interactive Simulator</span>
          </a>
        </div>

        {/* Trust Markers */}
        <div className="pt-8 flex items-center justify-center flex-wrap gap-6 text-xs text-[#9EA6CA] font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>3-5 Day Rapid Deployment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Long-Term Lock-in</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dedicated Markition Systems Architect</span>
          </div>
        </div>

      </div>
    </section>
  );
};
