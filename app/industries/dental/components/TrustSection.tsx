'use client';

import { useState } from 'react';
import { Star, ArrowUpRight, CheckCircle, Shield, ZoomIn } from 'lucide-react';
import { trackConversion } from '../utils/tracking';

interface TrustSectionProps { onOpenAudit: () => void; }

export function TrustSection({ onOpenAudit }: TrustSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'implants' | 'cosmetic' | 'ads'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const realResults = [
    { category: 'implants', treatmentBadge: 'DENTAL IMPLANTS & FULL ARCH', resultHighlight: '+38 High-Ticket Consultations in 60 Days', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80', imageAlt: 'Real clinical patient smile transformation', quote: '"We went from 8 inconsistent implant consults a month to averaging 38 qualified inquiries. Our surgical suites are now booked out five weeks in advance."', doctor: 'Dr. Michael Vance, DDS', practice: 'Apex Implant & Surgical Suite', location: 'Chicago, IL', stars: 5, verifiedSource: 'Google Verified Review', metric: '3.8x Return on Ad Spend' },
    { category: 'cosmetic', treatmentBadge: 'PORCELAIN VENEERS & SMILE DESIGN', resultHighlight: '24 Smile Makeover Inquiries Per Month', image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80', imageAlt: 'Cosmetic smile transformation', quote: '"Before partnering with this team, we received dozens of price-shopping calls. Now, our front-desk phone rings with patients specifically asking about full-mouth porcelain veneers."', doctor: 'Dr. Elena Rostova, DMD', practice: 'Lumina Aesthetic Dentistry', location: 'Austin, TX', stars: 5, verifiedSource: 'Google Verified Review', metric: '+142% Inbound Calls' },
    { category: 'ads', treatmentBadge: 'GOOGLE ADS & LOCAL 3-PACK RANKING', resultHighlight: '#1 Local Map Pack & $42 Cost Per Lead', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80', imageAlt: 'Google Ads campaign dashboard', quote: '"Our cost per booked patient dropped by more than 40% within our first 60 days. The dynamic call tracking dashboard gives our practice manager full visibility."', doctor: 'Dr. Marcus Sterling, DDS', practice: 'Horizon Family & Sedation Dental', location: 'Denver, CO', stars: 5, verifiedSource: 'Google Verified Review', metric: '68 Confirmed Bookings' },
  ];

  const filtered = activeCategory === 'all' ? realResults : realResults.filter(r => r.category === activeCategory);

  const clientLogos = [
    { name: 'POLISHED SMILES', subtitle: 'DENTAL STUDIO' }, { name: 'DESTINATION DENTAL', subtitle: 'ADVANCED CLINIC' },
    { name: 'SMILING DENTAL', subtitle: 'CARE & SURGERY' }, { name: 'ADDISON DENTAL', subtitle: 'DENTAL CLINIC' },
    { name: 'THORNBURY DENTAL', subtitle: 'FAMILY PRACTICE' }, { name: 'APEX DENTAL CARE', subtitle: 'IMPLANT & SURGERY' },
    { name: 'ALVEO DENTAL', subtitle: 'AESTHETIC SUITE' }, { name: 'DAZZLEDENT', subtitle: 'ORAL HEALTHCARE' },
  ];

  const pills = [
    { key: 'all', label: `All Practice Results (${realResults.length})` },
    { key: 'implants', label: 'Dental Implants & All-on-4' },
    { key: 'cosmetic', label: 'Cosmetic & Veneers' },
    { key: 'ads', label: 'Google Ads & Call Proof' },
  ] as const;

  return (
    <section className="w-full bg-white py-20 sm:py-28 border-b border-slate-200/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-studio-dots opacity-35 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-[#1236E8]" />
              <span className="font-mono text-xs font-semibold text-[#1236E8] uppercase tracking-wider">VERIFIED PRACTICE REVIEWS & OUTCOMES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#030A28] leading-[1.12]">Marketing That Helps Dental Practices Grow With Confidence.</h2>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-500 mb-1.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
              <span className="font-display text-sm font-bold text-[#030A28]">4.9 / 5.0 Dental Practice Rating</span>
              <span className="font-mono text-[11px] text-slate-500">Verified Client Performance & Case Evidence</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            {pills.map(pill => (
              <button key={pill.key} onClick={() => setActiveCategory(pill.key)} className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${activeCategory === pill.key ? 'bg-[#1236E8] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{pill.label}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-14">
          {filtered.map((item, index) => (
            <div key={index} className="flex flex-col bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:border-[#1236E8]/40 transition-all duration-300 shadow-sm hover:shadow-md group">
              <div className="relative h-56 sm:h-64 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setPreviewImage(item.image)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030A28]/85 via-[#030A28]/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-[#1236E8] text-white font-mono text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow">{item.treatmentBadge}</div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn className="w-4 h-4" /></div>
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <span className="font-mono text-[10px] text-[#20D9FF] uppercase tracking-wider block font-bold mb-0.5">VERIFIED OUTCOME</span>
                  <p className="font-display font-bold text-sm sm:text-base leading-snug">{item.resultHighlight}</p>
                </div>
              </div>
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">{[...Array(item.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"><CheckCircle className="w-3 h-3" />{item.verifiedSource}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">{item.quote}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#030A28] tracking-tight">{item.doctor}</h4>
                    <p className="font-mono text-[11px] text-[#1236E8] font-semibold mt-0.5">{item.practice}</p>
                    <p className="text-xs text-slate-400">{item.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-slate-400 uppercase block">Impact</span>
                    <span className="font-display text-xs sm:text-sm font-bold text-emerald-600 block">{item.metric}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2 pb-14">
          <button onClick={() => { trackConversion('audit_cta_click', { source: 'trust_reviews_section' }); onOpenAudit(); }} className="btn-agency-primary h-12 px-6 sm:px-7 inline-flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl cursor-pointer">
            <span className="hidden sm:inline">See What We Can Do for Your Practice</span>
            <span className="sm:hidden">Request Free Practice Audit</span>
            <ArrowUpRight className="w-4 h-4 btn-arrow shrink-0" />
          </button>
        </div>

        <div className="pt-12 border-t border-slate-200/80">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 font-mono text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1236E8] animate-pulse" />
              TRUSTED BY AMBITIOUS DENTAL PRACTICES NATIONWIDE
            </span>
          </div>
          <div className="relative w-full overflow-hidden py-4 sm:py-6">
            <div className="absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-10" />
            <div className="animate-marquee-slow flex items-center gap-12 sm:gap-16 lg:gap-20">
              {[...clientLogos, ...clientLogos].map((client, idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-3.5 shrink-0 select-none opacity-80 hover:opacity-100 transition-all duration-300 cursor-default group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1236E8]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1236E8]/20 transition-colors">
                    <span className="font-display text-xs font-bold text-[#1236E8]">{client.name[0]}</span>
                  </div>
                  <div className="flex flex-col justify-center text-left">
                    <span className="font-display text-[15px] sm:text-base font-bold text-[#030A28] tracking-tight leading-none group-hover:text-[#1236E8] transition-colors whitespace-nowrap">{client.name}</span>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-slate-400 font-semibold leading-none mt-1 whitespace-nowrap">{client.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewImage} alt="Real result enlarged" className="w-full h-auto max-h-[80vh] object-contain rounded-xl" />
            <div className="p-4 flex items-center justify-between">
              <span className="font-display font-bold text-sm text-[#030A28]">Real Dental Practice Result Evidence</span>
              <button onClick={() => setPreviewImage(null)} className="btn-agency-primary !py-1.5 !px-4 text-xs font-bold cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
