'use client';

import { ArrowUpRight, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { trackConversion } from '../utils/tracking';

interface FinalCtaSectionProps {
  onOpenAudit: () => void;
}

export function FinalCtaSection({ onOpenAudit }: FinalCtaSectionProps) {
  return (
    <section className="w-full bg-[#030A28] text-white py-20 sm:py-28 relative overflow-hidden bg-agency-grid-dark">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80" alt="High-end dental clinic" className="w-full h-full object-cover object-center opacity-15 grayscale scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030A28] via-[#030A28]/90 to-[#030A28]" />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(#20D9FF 0.75px, transparent 0.75px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#1236E8]/25 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 mb-8 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#20D9FF]" />
          <span className="font-mono text-xs font-semibold text-[#20D9FF] uppercase tracking-wider">SCHEDULE YOUR PRACTICE AUDIT</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl mx-auto">
          Ready to Turn More Searches Into Dental Patients?
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
          Get a clear view of your current marketing opportunities and the actions that can help your practice generate more qualified enquiries.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-14">
          <button onClick={() => { trackConversion('audit_cta_click', { source: 'final_cta_primary' }); onOpenAudit(); }} className="btn-agency-primary text-sm sm:text-base cursor-pointer shadow-2xl h-12 sm:h-13 px-6 sm:px-8 flex items-center justify-center gap-2.5">
            <span className="hidden sm:inline">Get Your Free Dental Marketing Audit</span>
            <span className="sm:hidden">Get Free Marketing Audit</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 btn-arrow shrink-0" />
          </button>
          <a href="tel:+17138947727" onClick={() => trackConversion('phone_call_click', { source: 'final_cta_phone' })} className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full border border-white/20 hover:border-white text-white font-semibold text-base transition-colors bg-white/5">
            <Phone className="w-4 h-4 text-[#20D9FF]" />
            <span className="font-mono text-sm">+1 (713) 894-7727</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium pt-4 border-t border-white/10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#20D9FF]" /><span>100% Free &amp; Confidential</span></div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#20D9FF]" /><span>Delivered in 24 Business Hours</span></div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#20D9FF]" /><span>Zero Sales Pressure or Obligation</span></div>
        </div>
      </div>
    </section>
  );
}
