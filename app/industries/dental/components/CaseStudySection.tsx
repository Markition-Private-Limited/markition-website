'use client';

import { ArrowUpRight, CheckCircle2, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { trackConversion } from '../utils/tracking';

interface CaseStudySectionProps {
  onOpenAudit: () => void;
}

export function CaseStudySection({ onOpenAudit }: CaseStudySectionProps) { // dental
  return (
    <section className="w-full bg-[#F8FAFC] py-20 sm:py-28 border-b border-agency relative overflow-hidden bg-agency-surface-soft">
      {/* Studio Grid Texture & Ambient Lighting */}
      <div className="absolute inset-0 bg-studio-grid opacity-50 pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-[#1236E8]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#20D9FF]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1236E8]"></span>
            <span className="font-technical text-xs font-semibold text-[#1236E8] uppercase tracking-wider">
              PRACTICE GROWTH CASE STUDY
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#030A28] leading-[1.12] mb-4">
            How a Multi-Chair Practice Scaled High-Value Dental Implant Enquiries.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            A comprehensive look at transitioning from unpredictable generic referrals to a predictable, profitable patient acquisition pipeline.
          </p>
        </div>

        {/* Editorial Case Study Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Visual & Clinic Snapshot (Col 5) */}
            <div className="lg:col-span-5 relative bg-slate-900 min-h-[380px] lg:min-h-full flex flex-col justify-between p-8 text-white">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                alt="Contemporary dental surgical suite with high-precision imaging equipment"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="font-technical text-[10px] uppercase tracking-wider bg-[#1236E8] text-white px-3 py-1 rounded-full font-bold">
                  CASE STUDY: IMPLANT ACQUISITION
                </span>
                <span className="font-technical text-xs text-slate-300">
                  90-DAY TIMELINE
                </span>
              </div>

              <div className="relative z-10 pt-24 space-y-4">
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <span className="font-display text-3xl font-bold text-white block">
                      +185%
                    </span>
                    <span className="font-technical text-[11px] text-[#20D9FF] uppercase tracking-wider">
                      Implant Inquiries
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-bold text-white block">
                      -44%
                    </span>
                    <span className="font-technical text-[11px] text-[#20D9FF] uppercase tracking-wider">
                      Cost Per Lead
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Our front-desk calendar booked out 6 weeks ahead for implant consultations without increasing our total monthly ad spend."
                </p>
                <div className="text-xs font-semibold text-white">
                  â€” Dr. M. Vance, Lead Implant Surgeon
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Breakdown (Col 7) */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              
              <div className="space-y-8">
                
                {/* 1. The Challenge */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-technical text-xs text-[#1236E8] font-bold uppercase tracking-wider">
                      01 / The Challenge
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#030A28] mb-2.5 tracking-tight">
                    High Cost Per Click & Tire-Kicker Enquiries
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    The practice was investing over $4,500/month on generic dental Google Ads keywords like "dentist near me". Over 70% of inbound calls were seeking routine checkups, medicaid coverage, or tooth extractions rather than high-value cosmetic and dental implant treatments.
                  </p>
                </div>

                {/* 2. Acquisition Strategy */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-technical text-xs text-[#1236E8] font-bold uppercase tracking-wider">
                      02 / Acquisition Strategy
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#030A28] mb-2.5 tracking-tight">
                    High-Intent Keyword Precision & Editorial Landing Page
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    We restructured the Google Ads account into procedure-specific single-intent ad groups targeting "All-on-4 dental implants", "teeth in a day", and "implant dentist". We created a lightning-fast custom landing page with transparent financing, doctor credentials, and 3D treatment visualizers.
                  </p>
                </div>

                {/* 3. Campaign Outcome */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-technical text-xs text-emerald-600 font-bold uppercase tracking-wider">
                      03 / The Outcome
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>48 High-Ticket Consultations</strong> booked in 90 days
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>$340k+ Treatment Pipeline</strong> generated from qualified calls
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Direct Form CTA Action & Trust Guarantees */}
              <div className="pt-6 mt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  onClick={() => {
                    trackConversion('audit_cta_click', { source: 'case_study_primary' });
                    onOpenAudit();
                  }}
                  className="btn-agency-primary h-12 px-6 sm:px-7 shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer self-stretch sm:self-auto"
                >
                  <span className="hidden sm:inline">Get Your Free Practice Marketing Audit</span>
                  <span className="sm:hidden">Get Free Practice Audit</span>
                  <ArrowUpRight className="w-4 h-4 btn-arrow shrink-0" />
                </button>

                <div className="flex flex-col sm:items-end text-xs text-slate-500 space-y-0.5">
                  <span className="font-semibold text-[#030A28] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Direct to confidential practice review
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Delivered in 24 hours â€¢ Zero sales obligation
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


