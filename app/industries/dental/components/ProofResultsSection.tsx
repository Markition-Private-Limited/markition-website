'use client';

import { ArrowUpRight, TrendingUp, BarChart3, Users, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { trackConversion } from '../utils/tracking';
import { CustomIcon } from './CustomIcon';

interface ProofResultsSectionProps { onOpenAudit: () => void; }

export function ProofResultsSection({ onOpenAudit }: ProofResultsSectionProps) {
  const metrics = [
    { procedureBadge: 'IMPLANTS & ALL-ON-4', value: '+142%', label: 'Increase in Qualified Leads', sublabel: 'Compared to previous unoptimized dental campaigns in the same city radius.', benchmark: 'vs. baseline performance', icon: TrendingUp, accent: 'text-[#1236E8]', barWidth: 'w-[88%]' },
    { procedureBadge: 'INBOUND PHONE CALLS', value: '850+', label: 'Verified Patient Enquiries', sublabel: 'Direct high-intent phone calls and procedure consultation submissions.', benchmark: 'Call tracking recorded & verified', icon: Users, accent: 'text-[#030A28]', barWidth: 'w-[94%]' },
    { procedureBadge: 'LANDING PAGE CONVERSION', value: '+68%', label: 'Conversion Rate Uplift', sublabel: 'Achieved through procedure-specific mobile landing pages and instant click-to-call.', benchmark: 'Measured across 12,000+ clicks', icon: BarChart3, accent: 'text-[#1236E8]', barWidth: 'w-[82%]' },
    { procedureBadge: 'PRACTICE CHAIRS BOOKED', value: '520+', label: 'Appointments Influenced', sublabel: 'Verified seated patients across implant, cosmetic, and sedation dental suites.', benchmark: 'Front-desk calendar confirmed', icon: CalendarCheck, accent: 'text-[#030A28]', barWidth: 'w-[91%]' },
  ];

  const caseStudyStats = [
    { label: 'Ad Budget', value: '$3,200 / mo', tag: 'GOOGLE ADS' },
    { label: 'Inbound Calls', value: '62 / mo', tag: 'CALL TRACKING' },
    { label: 'Consultations', value: '38 booked', tag: 'FRONT-DESK CRM' },
    { label: 'Revenue Generated', value: '$186,000', tag: 'VERIFIED ROAS 6.2x' },
  ];

  return (
    <section className="w-full bg-white py-20 sm:py-28 border-b border-agency relative overflow-hidden">
      <div className="absolute inset-0 bg-studio-dots opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#20D9FF]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1236E8]" />
              <span className="font-mono text-xs font-semibold text-[#1236E8] uppercase tracking-wider">MEASURABLE PRACTICE GROWTH</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#030A28] leading-[1.12]">Marketing Performance You Can Actually Measure.</h2>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-md font-normal leading-relaxed">We don&apos;t report vanity impressions or vague search visibility. Every marketing dollar is directly mapped to patient phone calls and confirmed appointments.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 hover:border-[#1236E8]/30 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5 bg-[#1236E8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#1236E8] uppercase tracking-wider block mb-2">{metric.procedureBadge}</span>
                    <span className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${metric.accent}`}>{metric.value}</span>
                  </div>
                  <CustomIcon icon={Icon} variant="glow" size="lg" tone="blue" className="shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#030A28] mb-2">{metric.label}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">{metric.sublabel}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-slate-400 uppercase tracking-wider">Performance Benchmark</span>
                    <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{metric.benchmark}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${metric.barWidth} bg-gradient-to-r from-[#1236E8] to-[#20D9FF] rounded-full transition-all duration-700`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl bg-[#030A28] text-white overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1236E8] via-[#20D9FF] to-[#1236E8]" />
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#1236E8]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="p-8 sm:p-10 lg:p-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 pb-10 border-b border-white/10">
              <div className="max-w-xl">
                <span className="font-mono text-xs font-bold text-[#20D9FF] uppercase tracking-wider block mb-3">VERIFIED CAMPAIGN SNAPSHOT</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">From 8 Inconsistent Implant Cases to 38 Qualified Consultations Monthly.</h3>
                <p className="text-sm text-slate-300 leading-relaxed">An independent implant & surgical practice in Chicago engaged us to improve lead quality and reduce unqualified enquiries. The results within the first 90 days:</p>
              </div>
              <button onClick={() => { trackConversion('audit_cta_click', { source: 'proof_case_study' }); onOpenAudit(); }} className="btn-agency-primary h-12 px-7 flex items-center gap-2.5 !bg-[#1236E8] shrink-0 self-start lg:self-center shadow-lg hover:shadow-xl cursor-pointer">
                <span>See Results For My Practice</span>
                <ArrowUpRight className="w-4 h-4 btn-arrow" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {caseStudyStats.map((stat, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="font-mono text-[10px] font-bold text-[#20D9FF] uppercase tracking-wider block mb-2">{stat.tag}</span>
                  <span className="font-display text-xl sm:text-2xl font-bold text-white block">{stat.value}</span>
                  <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
