'use client';

import React from 'react';
import {
  X,
  Check, 
  TrendingDown, 
  TrendingUp, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const WhySpheno: React.FC = () => {
  return (
    <section id="why-spheno" className="py-24 md:py-32 bg-[#050827] text-white border-b border-[#161A35] relative overflow-hidden">
      
      {/* Background Ambient Glow & Cosmic Tech Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse closest-side, rgba(225,29,72,0.10) 0%, transparent 100%)' }} />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse closest-side, rgba(6,182,212,0.15) 0%, transparent 100%)' }} />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* CENTERED DISPLAY HEADLINE (Exact style of reference screenshot) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#091535]/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider">ARCHITECTURAL ADVANTAGE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
            Not another chatbot. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc]">
              An AI business system.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#B9BFDC] leading-relaxed font-normal text-balance">
            Businesses do not need random chatbots. They need clear workflows, reliable integrations, and systems their team can actually use.
          </p>
        </div>

        {/* COMPARISON CARDS CONTAINER WITH CENTER "VS" BADGE (Exact Reference Style) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* CENTER "VS" FLOATING CIRCLE BADGE */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-[#050827] border-2 border-white/20 items-center justify-center font-extrabold text-sm text-white shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <span>VS</span>
          </div>

          {/* LEFT CARD: WHY MOST AI PROJECTS FAIL (Red / Warning Tone) */}
          <div className="bg-[#090E2C]/90 rounded-3xl border border-white/[0.08] p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div>
              {/* Header with Red Cross Circle */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)] shrink-0">
                  <X className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight">
                  Why Most AI Projects <span className="text-rose-400">Fail</span>
                </h3>
              </div>

              {/* List of Failure Reasons with Separator Lines */}
              <div className="divide-y divide-white/[0.07] text-[15px] sm:text-base text-[#D1D5DB]">
                <div className="py-4 font-normal">
                  Built without understanding the business or clinical nuances
                </div>
                <div className="py-4 font-normal">
                  Poor integration with existing calendars, phone lines, and software
                </div>
                <div className="py-4 font-normal">
                  Generic prompts and templates that do not fit real human workflows
                </div>
                <div className="py-4 font-normal">
                  No human approval or verified hand-off where it matters
                </div>
                <div className="py-4 font-normal">
                  Little support, unmonitored drop-offs, and fragile webhooks after launch
                </div>
              </div>
            </div>

            {/* Bottom Result Box (Red tinted container like reference) */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-900/50 flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-rose-900/50 border border-rose-700/50 flex items-center justify-center shrink-0 text-rose-400">
                <TrendingDown className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-rose-100 leading-snug">
                <strong className="text-rose-400 font-bold">Result:</strong> Wasted budget, frustrated teams, dropped leads, and no real business impact.
              </p>
            </div>
          </div>

          {/* RIGHT CARD: HOW SPHENO AI IS DIFFERENT (Cyan / Blue Winning Tone) */}
          <div className="bg-[#090E2C]/90 rounded-3xl border border-cyan-500/30 p-7 sm:p-9 flex flex-col justify-between shadow-[0_0_50px_rgba(0,180,219,0.12)] relative overflow-hidden backdrop-blur-md">
            {/* Top Cyan Highlight line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-[#38bdf8] to-[#818cf8]" />

            <div>
              {/* Header with Cyan Checkmark Circle */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.25)] shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight">
                  How Spheno AI Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">Different</span>
                </h3>
              </div>

              {/* List of Differentiators with Separator Lines */}
              <div className="divide-y divide-white/[0.07] text-[15px] sm:text-base text-[#E0E7FF]">
                <div className="py-4 font-medium flex items-center justify-between">
                  <span>Every system is custom-built around your high-value business</span>
                  <span className="text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 hidden sm:inline">
                    Domain Custom
                  </span>
                </div>
                <div className="py-4 font-medium flex items-center justify-between">
                  <span>Seamless, native integrations with your existing tools &amp; EMRs</span>
                  <span className="text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 hidden sm:inline">
                    Direct API
                  </span>
                </div>
                <div className="py-4 font-medium flex items-center justify-between">
                  <span>AI that empowers your front desk instead of creating friction</span>
                  <span className="text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 hidden sm:inline">
                    Front-Desk Sync
                  </span>
                </div>
                <div className="py-4 font-medium flex items-center justify-between">
                  <span>Clear, unified multi-channel workflows that are effortless to manage</span>
                  <span className="text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 hidden sm:inline">
                    One Spine
                  </span>
                </div>
                <div className="py-4 font-medium flex items-center justify-between">
                  <span>Continuous proactive optimization and closed-loop revenue attribution</span>
                  <span className="text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 hidden sm:inline">
                    24/7 SLA
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Result Box (Cyan tinted container like reference) */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-cyan-950/30 border border-cyan-700/50 flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-cyan-900/50 border border-cyan-600/50 flex items-center justify-center shrink-0 text-cyan-300">
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-cyan-100 leading-snug">
                <strong className="text-cyan-400 font-bold">Result:</strong> Scalable automated systems, happy clinical teams, and measurable revenue growth.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Connected Products Summary Ribbon */}
        <div className="mt-12 p-6 rounded-2xl bg-[#090E2C]/70 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0018C5] flex items-center justify-center text-white shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                One System · Four Connected Products · Real-Time Shared Memory
              </div>
              <div className="text-xs text-[#BBC4FF]">
                Spheno Chat, Voice, CRM, and WhatsApp AI share the same real-time patient brain.
              </div>
            </div>
          </div>

          <a
            href="#architecture"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider shrink-0"
          >
            <span>Explore Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
