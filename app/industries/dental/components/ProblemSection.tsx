'use client';

import { ArrowUpRight, Search, ShieldCheck, UserCheck } from 'lucide-react';
import { trackConversion } from '../utils/tracking';
import { CustomIcon } from './CustomIcon';

interface ProblemSectionProps { onOpenAudit: () => void; }

export function ProblemSection({ onOpenAudit }: ProblemSectionProps) {
  const challengePillars = [
    { num: '01', title: 'Be Found', subtitle: 'Appear when patients are actively searching.', description: 'When local patients search for emergency care, dental implants, Invisalign, or family dentists, your clinic must appear prominently in the top 3 Google map pack and search results.', icon: Search, tag: 'SEARCH VISIBILITY' },
    { num: '02', title: 'Build Trust', subtitle: 'Give prospective patients confidence before they call.', description: 'First impressions happen online in seconds. An editorial, mobile-optimized experience with verified reviews and transparent treatment clarity removes hesitation before they pick up the phone.', icon: ShieldCheck, tag: 'CLINICAL CREDIBILITY' },
    { num: '03', title: 'Convert', subtitle: 'Turn attention into enquiries and appointments.', description: 'Clicks and traffic are vanity metrics without booked chairs. We build high-converting patient enquiry funnels that connect directly into your practice management schedule.', icon: UserCheck, tag: 'CHAIR ACQUISITION' },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-20 sm:py-28 border-b border-slate-200/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-studio-grid opacity-60 pointer-events-none z-0" />
      <div className="absolute top-10 right-1/4 w-[600px] h-[400px] bg-[#1236E8]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1236E8]" />
            <span className="font-mono text-xs font-semibold text-[#1236E8] uppercase tracking-wider">THE PATIENT ACQUISITION CHALLENGE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#030A28] leading-[1.12] mb-5">Great Dentistry Means Little If the Right Patients Can&apos;t Find You.</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">Patients are searching every day for dentists, cosmetic treatments, implants, orthodontics, and other high-value dental services. Your marketing needs to make your practice visible at the exact moment they are ready to book.</p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm mb-16 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 items-stretch">
            {challengePillars.map(pillar => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.num} className="p-7 sm:p-9 flex flex-col justify-between h-full group hover:bg-slate-50/50 transition-colors duration-300 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-[#1236E8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display text-3xl font-bold text-[#1236E8]">{pillar.num}</span>
                        <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">{pillar.tag}</span>
                      </div>
                      <CustomIcon icon={Icon} variant="glow" size="md" tone="blue" className="group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#030A28] mb-2 tracking-tight">{pillar.title}</h3>
                    <p className="font-semibold text-xs sm:text-sm text-[#1236E8] mb-3">{pillar.subtitle}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                  <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#030A28] group-hover:text-[#1236E8] transition-colors">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Patient-Focused Acquisition</span>
                    <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1236E8] via-[#20D9FF] to-[#1236E8] opacity-80" />
          <div className="space-y-1.5 max-w-2xl">
            <span className="font-mono text-xs text-[#1236E8] uppercase tracking-wider font-bold">DIAGNOSTIC BENCHMARK</span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#030A28] tracking-tight">Is your practice losing qualified patient enquiries to local competitors?</h4>
            <p className="text-sm text-slate-600 leading-relaxed">We review your search rankings, map pack placement, and conversion rate against local dentists in your market.</p>
          </div>
          <button onClick={() => { trackConversion('audit_cta_click', { source: 'problem_section' }); onOpenAudit(); }} className="btn-agency-primary h-12 px-6 sm:px-7 shrink-0 self-stretch sm:self-start lg:self-center shadow-md hover:shadow-xl flex items-center justify-center gap-2">
            <span className="hidden sm:inline">Improve My Dental Marketing</span>
            <span className="sm:hidden">Request Free Audit</span>
            <ArrowUpRight className="w-4 h-4 btn-arrow shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}
