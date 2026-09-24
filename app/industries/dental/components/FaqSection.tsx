'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { trackConversion } from '../utils/tracking';

interface FaqSectionProps {
  onOpenAudit: () => void;
}

export function FaqSection({ onOpenAudit }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How quickly can Google Ads generate dental leads?',
      a: 'Google Ads can generate qualified patient calls and consultation requests within the first 48 to 72 hours of campaign activation. Unlike organic SEO which takes months to compound, search ads capture patients actively looking for emergency care, dental implants, or immediate appointments today.',
    },
    {
      q: 'How much should a dental practice invest in marketing?',
      a: 'Marketing investment depends on your current chair capacity, practice goals, and local competition. Most independent dental practices see strong return on investment starting with an ad budget between $2,000 and $5,000 per month, focused on high-value procedures like implants and cosmetic dentistry.',
    },
    {
      q: 'Do you require a long-term contract?',
      a: 'No. We operate on transparent, flexible monthly agreements without restrictive long-term lock-in contracts. We believe an agency should earn your partnership every single month through measurable patient pipeline growth.',
    },
    {
      q: 'Can you track calls and actual enquiries?',
      a: 'Yes, absolutely. We deploy dynamic call tracking (DNI), HIPAA-compliant whisper messages, and encrypted form tracking. Your team can see the exact search keyword, campaign, and landing page that drove each inbound patient enquiry.',
    },
    {
      q: 'How do you measure campaign performance?',
      a: 'We evaluate campaigns by cost-per-qualified-enquiry (CPL) and scheduled patient consultations, not vanity metrics like impressions or clicks. You receive continuous access to a transparent dashboard and a dedicated monthly performance review.',
    },
  ];

  const toggle = (idx: number) => {
    const next = openIndex === idx ? null : idx;
    setOpenIndex(next);
    if (next !== null) {
      trackConversion('faq_open', { question: faqs[idx].q });
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-20 sm:py-28 border-b border-agency relative overflow-hidden bg-agency-surface-soft">
      {/* Studio Dot Matrix & Ambient Lighting */}
      <div className="absolute inset-0 bg-studio-dots opacity-30 pointer-events-none z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1236E8]/4 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1236E8]"></span>
            <span className="font-technical text-xs font-semibold text-[#1236E8] uppercase tracking-wider">
              COMMON QUESTIONS
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#030A28] leading-[1.12] mb-4">
            Before You Start
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-xl mx-auto">
            Everything you need to know about partnering with our dental marketing team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-14">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
                  isOpen ? 'border-[#1236E8]/40 shadow-md ring-2 ring-[#1236E8]/10' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className={`font-display text-base sm:text-lg font-bold transition-colors ${
                    isOpen ? 'text-[#1236E8]' : 'text-[#030A28]'
                  }`}>
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-[#1236E8] text-white border-[#1236E8]'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-5 font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Section Action */}
        <div className="text-center pt-2">
          <p className="text-xs sm:text-sm text-slate-500 mb-4">
            Have a question specific to your practice location or patient demographic?
          </p>
          <button
            onClick={() => {
              trackConversion('audit_cta_click', { source: 'faq_section' });
              onOpenAudit();
            }}
            className="btn-agency-primary h-12 px-6 sm:px-7 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span className="hidden sm:inline">Get My Free Dental Marketing Audit</span>
            <span className="sm:hidden">Get Free Marketing Audit</span>
            <ArrowUpRight className="w-4 h-4 btn-arrow shrink-0" />
          </button>
        </div>

      </div>
    </section>
  );
};


