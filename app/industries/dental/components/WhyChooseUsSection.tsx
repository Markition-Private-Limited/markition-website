'use client';

import { ArrowUpRight, Activity, Target, Sparkles, BarChart3, CheckCircle2 } from 'lucide-react';
import { trackConversion } from '../utils/tracking';
import { CustomIcon } from './CustomIcon';

interface WhyChooseUsSectionProps { onOpenAudit: () => void; }

export function WhyChooseUsSection({ onOpenAudit }: WhyChooseUsSectionProps) {
  const reasons = [
    { index: '01', tag: 'CLINICAL KNOWLEDGE', title: 'Dental Industry Focus', summary: 'Deep expertise in patient psychology and clinical procedure margins.', detail: 'We don\'t manage e-commerce stores, realtors, or general contractors. We exclusively focus on dental marketing, understanding the difference between high-margin implant cases, cosmetic veneers, and routine hygiene bookings.', highlights: ['Implant & Cosmetic Specialization', 'Patient Dental Phobia Empathy', 'Clinical Compliance & HIPAA'], icon: Activity },
    { index: '02', tag: 'SEARCH INTENT', title: 'Data-Driven Strategy', summary: 'Targeting high-intent dental searchers ready to book.', detail: 'Every campaign is built upon verified search volume, local radius demographics, competitor bid density, and treatment profitability to maximize return on ad spend.', highlights: ['Negative Keyword Waste Hygiene', 'Geo-Targeted Radius Bidding', 'High-Ticket Search Intent'], icon: Target },
    { index: '03', tag: 'EXPERIENCE DESIGN', title: 'Conversion-Focused Experiences', summary: 'Editorial landing pages built for immediate confidence.', detail: 'We craft fast-loading, mobile-first patient funnels that overcome dental fear, display verified patient testimonials, and simplify appointment scheduling.', highlights: ['Sub-Second Mobile Load Times', 'One-Tap Click-to-Call', 'Verified Review Integration'], icon: Sparkles },
    { index: '04', tag: 'CLOSED-LOOP ROI', title: 'Transparent Performance Tracking', summary: 'Every phone call and dollar tracked to actual patients.', detail: 'With dynamic call tracking, automated spam filtering, and 24/7 transparent reporting, you see the exact cost per qualified patient enquiry at all times.', highlights: ['Dynamic Call Tracking (DNI)', 'Live Reception Attribution', '24/7 Practice Dashboard'], icon: BarChart3 },
  ];

  const comparisonRows = [
    { feature: 'Dental Industry Focus', us: true, generic: false },
    { feature: 'HIPAA-Compliant Campaigns', us: true, generic: false },
    { feature: 'Procedure-Level ROI Tracking', us: true, generic: false },
    { feature: 'Dynamic Whisper Call Tracking', us: true, generic: false },
    { feature: 'Month-to-Month Agreements', us: true, generic: false },
    { feature: 'Live 24/7 Practice Dashboard', us: true, generic: false },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-20 sm:py-28 border-b border-agency relative overflow-hidden">
      <div className="absolute inset-0 bg-studio-dots opacity-35 pointer-events-none z-0" />
      <div className="absolute top-10 right-1/3 w-[550px] h-[550px] bg-[#1236E8]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#20D9FF]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1236E8]" />
            <span className="font-mono text-xs font-semibold text-[#1236E8] uppercase tracking-wider">WHY PRACTICES CHOOSE US</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#030A28] leading-[1.12] mb-4">Purpose-Built for Dental. Not Adapted From Generic Marketing.</h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">Dental practices have unique patient funnels, compliance considerations, and treatment profit margins. Our approach is built around this specific context.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 mb-14">
          {reasons.map(reason => {
            const Icon = reason.icon;
            return (
              <div key={reason.index} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 hover:border-[#1236E8]/30 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5 bg-[#1236E8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="font-display text-4xl font-bold text-slate-100 block leading-none mb-2">{reason.index}</span>
                    <span className="font-mono text-[10px] font-bold text-[#1236E8] uppercase tracking-wider">{reason.tag}</span>
                  </div>
                  <CustomIcon icon={Icon} variant="squircle" size="lg" tone="blue" className="shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#030A28] mb-2 tracking-tight">{reason.title}</h3>
                <p className="font-semibold text-xs sm:text-sm text-[#1236E8] mb-3">{reason.summary}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{reason.detail}</p>
                <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-100">
                  {reason.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 font-mono text-[10px] sm:text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />{h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm mb-8">
          <div className="p-6 sm:p-8 border-b border-slate-200/80">
            <span className="font-mono text-xs font-bold text-[#1236E8] uppercase tracking-wider block mb-2">COMPETITIVE COMPARISON</span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#030A28] tracking-tight">How We Differ From a Generic Marketing Agency</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-4 sm:p-5 font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">CAPABILITY</th>
                  <th className="text-center p-4 sm:p-5 font-mono text-xs font-bold text-[#1236E8] uppercase tracking-wider">OUR AGENCY</th>
                  <th className="text-center p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">GENERIC AGENCY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 text-sm font-medium text-[#030A28]">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-center">{row.us ? <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" /> : <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto text-xs font-bold">✕</span>}</td>
                    <td className="p-4 sm:p-5 text-center">{row.generic ? <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" /> : <span className="inline-flex w-5 h-5 rounded-full bg-red-100 text-red-500 items-center justify-center mx-auto text-xs font-bold">✕</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => { trackConversion('audit_cta_click', { source: 'why_choose_us_section' }); onOpenAudit(); }} className="btn-agency-primary h-12 px-7 inline-flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl cursor-pointer">
            <span>Start With a Free Practice Audit</span>
            <ArrowUpRight className="w-4 h-4 btn-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
