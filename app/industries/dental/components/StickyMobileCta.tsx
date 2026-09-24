'use client';

import { Phone, ArrowUpRight } from 'lucide-react';
import { trackConversion } from '../utils/tracking';

interface StickyMobileCtaProps { onOpenAudit: () => void; }

export function StickyMobileCta({ onOpenAudit }: StickyMobileCtaProps) {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center gap-3 lg:hidden shadow-lg">
      <a href="tel:+17138947727" onClick={() => trackConversion('phone_call_click', { source: 'mobile_sticky_bar' })} className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-full border border-slate-200 bg-slate-50 text-[#030A28] font-bold text-xs">
        <Phone className="w-3.5 h-3.5 text-[#1236E8]" />
        <span>Call Now</span>
      </a>
      <button onClick={() => { trackConversion('audit_cta_click', { source: 'mobile_sticky_bar' }); onOpenAudit(); }} className="flex-1 btn-agency-primary h-11 text-xs font-semibold justify-center flex items-center gap-2">
        <span>Get Free Audit</span>
        <ArrowUpRight className="w-3.5 h-3.5 btn-arrow" />
      </button>
    </aside>
  );
}
