'use client';

import { ArrowUpRight, Search, MapPin, ShieldCheck, PhoneCall, CalendarCheck, Check, Sparkles, Zap, Star, Phone, Compass, CheckCheck, Lock, Flame, Award, Globe } from 'lucide-react';
import { trackConversion } from '../utils/tracking';

interface SystemSectionProps { onOpenAudit: () => void; }

export function SystemSection({ onOpenAudit }: SystemSectionProps) {
  const steps = [
    {
      num: '01', phase: 'SEARCH INTENT', title: 'High-Intent Patient Search', badge: 'Google Ads & Maps',
      description: 'A local resident experiences tooth pain or actively searches for implant surgeons, Invisalign, or emergency care in your city.',
      detail: 'Targeted Google Ads & Google Map Pack #1', icon: Search,
      impact: 'Eliminates wasted ad spend on non-paying queries', kpi: '94% High Commercial Intent',
      deliverables: ['Negative keyword sculpting blocks free/cheap query waste', 'Exact-match bidding on high-ticket implant and cosmetic terms', '3-to-5 mile radius geo-fencing centered on your dental clinic'],
      visual: (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden text-left">
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80" alt="Patient searching on smartphone" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030A28] via-[#030A28]/50 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030A28]/80 text-white font-mono text-[10px] font-bold tracking-wider backdrop-blur-md border border-white/10 uppercase"><span className="w-2 h-2 rounded-full bg-[#20D9FF] animate-pulse" />STAGE 01: MOBILE PATIENT DISCOVERY</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-mono text-[10px] font-bold backdrop-blur-md">HIGH INTENT</span>
            </div>
            <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
              <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-sm leading-tight">Local Patient Searches: &ldquo;emergency dentist dental implants near me&rdquo;</p>
              <span className="text-[10px] text-blue-200 font-mono">Location: Within 3.2 Miles of Your Practice</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-3.5 bg-white">
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-slate-100 border border-slate-200 shadow-sm">
              <Search className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-800 font-medium truncate">emergency dentist dental implants near me</span>
              <div className="w-1.5 h-4 bg-blue-600 animate-pulse ml-auto shrink-0" />
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-b from-blue-50/60 to-white border border-blue-100 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono uppercase">Sponsored</span>
                  <span className="text-xs text-slate-500 font-medium truncate">yourdentalpractice.com/implants</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">#1 Position</span>
              </div>
              <h4 className="font-display text-sm sm:text-base font-bold text-[#1236E8] hover:underline cursor-pointer leading-snug">Board-Certified Dental Implants | Same-Day Consultations Available</h4>
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                <span className="text-slate-700 font-bold">4.9</span>
                <span className="text-slate-400">(240+ verified reviews)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">Restore your smile in just 1 day with permanent implants. Board-certified surgical specialists. 0% financing options available.</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-100/70">
                <div className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 text-[11px] font-medium text-[#030A28] flex items-center justify-between shadow-sm"><span>All-on-4 Implants</span><ArrowUpRight className="w-3 h-3 text-[#1236E8]" /></div>
                <div className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 text-[11px] font-medium text-[#030A28] flex items-center justify-between shadow-sm"><span>Book 3D CT Scan</span><ArrowUpRight className="w-3 h-3 text-[#1236E8]" /></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1 text-emerald-600 font-bold"><Sparkles className="w-3 h-3" /> Exact-Match High Intent</span>
              <span>Est. CPC Efficiency: +38%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '02', phase: 'LOCAL VISIBILITY', title: 'Immediate Practice Discovery', badge: 'Google Map Pack #1',
      description: 'Your clinic appears prominently with compelling ad copy, reviews, and location extensions ahead of competing dentists.',
      detail: 'Top ad placement & radius geo-fencing', icon: MapPin,
      impact: 'Positions your practice before competing local dentists', kpi: '#1 Google Map Pack Placement',
      deliverables: ['Google Screened trust badge integration and verification', 'Dynamic location extensions displaying exact mileage to clinic', 'High-converting clinic ad copy with 5-star review highlights'],
      visual: (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden text-left">
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80" alt="Modern dental clinic exterior" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030A28] via-[#030A28]/45 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030A28]/80 text-white font-mono text-[10px] font-bold tracking-wider backdrop-blur-md border border-white/10 uppercase"><MapPin className="w-3 h-3 text-[#20D9FF]" />STAGE 02: LOCAL GOOGLE MAP PACK</span>
              <span className="px-2 py-0.5 rounded-full bg-[#1236E8] text-white font-mono text-[10px] font-bold">RANK #1</span>
            </div>
            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1236E8] border-2 border-white flex items-center justify-center shadow-md animate-bounce"><MapPin className="w-4 h-4 text-white" /></div>
                <div><span className="text-xs sm:text-sm font-bold text-white block leading-tight">Your Dental Practice</span><span className="text-[10px] text-blue-200 font-mono">Ranked #1 for &ldquo;best implant dentist&rdquo;</span></div>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#20D9FF] bg-white/15 px-2 py-1 rounded backdrop-blur-sm">3.5 Mi Radius</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-3.5 bg-white">
            <div className="p-3.5 rounded-xl border-2 border-[#1236E8] bg-blue-50/40 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5"><h5 className="font-display text-sm font-bold text-[#030A28]">Your Dental Practice</h5><span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">✓</span></div>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5"><span>4.9</span><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}</div><span className="text-slate-500 font-normal">(184) • Dental clinic</span></div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#030A28] text-white font-mono text-[10px] font-bold">LOCAL 3-PACK</span>
              </div>
              <p className="text-xs text-slate-600">Medical Plaza Suite 300 • Open until 6:00 PM • (713) 555-0190</p>
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-blue-100">
                <div className="py-1.5 px-2 rounded-lg bg-white border border-blue-200 text-center text-xs font-bold text-[#1236E8] flex items-center justify-center gap-1 shadow-sm"><Phone className="w-3 h-3" /> Call</div>
                <div className="py-1.5 px-2 rounded-lg bg-white border border-slate-200 text-center text-xs font-bold text-slate-700 flex items-center justify-center gap-1"><Compass className="w-3 h-3" /> Directions</div>
                <div className="py-1.5 px-2 rounded-lg bg-white border border-slate-200 text-center text-xs font-bold text-slate-700 flex items-center justify-center gap-1"><Globe className="w-3 h-3" /> Website</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1 text-emerald-600 font-bold"><Sparkles className="w-3 h-3" /> Google Screened Verified</span>
              <span>Local Search Share: 68%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '03', phase: 'CLINICAL TRUST', title: 'Confidence & Frictionless Clarity', badge: 'HIPAA Landing Pages',
      description: 'The patient visits a fast, mobile-first procedure page with verified doctor credentials, transparent pricing, and real patient proof.',
      detail: 'Editorial conversion architecture', icon: ShieldCheck,
      impact: 'Overcomes patient dental fear and price anxiety', kpi: '100% HIPAA Compliant Pages',
      deliverables: ['Sub-second mobile loading speed to prevent patient bounce', 'Doctor board certification and verified clinical credentials', 'Transparent procedure expectations and patient before/afters'],
      visual: (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden text-left">
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80" alt="Dentist explaining treatment to patient" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030A28] via-[#030A28]/45 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030A28]/80 text-white font-mono text-[10px] font-bold tracking-wider backdrop-blur-md border border-white/10 uppercase"><Lock className="w-3 h-3 text-emerald-400" />STAGE 03: CLINICAL CONSULTATION PAGE</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-mono text-[10px] font-bold backdrop-blur-md">HIPAA SECURED</span>
            </div>
            <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
              <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-sm leading-tight">Dr. Robert Vance, DDS, FICOI • Board-Certified Implant Specialist</p>
              <span className="text-[10px] text-blue-200 font-mono">Procedure: Full Arch Permanent Implants & 3D CT Guided Surgery</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-3.5 bg-white">
            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2"><span className="font-mono text-[10px] font-bold text-[#20D9FF] uppercase tracking-wider block">COMPREHENSIVE IMPLANT CONSULTATION</span><h5 className="font-display text-sm sm:text-base font-bold text-white leading-snug">Permanent Teeth in 24 Hours with 3D Guided Surgery</h5><div className="flex items-center gap-2 text-[11px] text-slate-300"><span>Verified Surgical Specialists</span><span>•</span><span className="text-emerald-400">0% APR Financing Available</span></div></div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100"><span className="font-display text-xs font-bold text-[#030A28] block">0.4s</span><span className="text-[10px] text-slate-500">Load Speed</span></div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100"><span className="font-display text-xs font-bold text-emerald-600 block">0% APR</span><span className="text-[10px] text-slate-500">Financing</span></div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100"><span className="font-display text-xs font-bold text-[#1236E8] block">500+</span><span className="text-[10px] text-slate-500">Cases Done</span></div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between"><span className="text-xs font-semibold text-[#030A28]">Reserve $0 3D Smile Evaluation</span><span className="px-3 py-1 rounded-lg bg-[#1236E8] text-white font-bold text-xs shadow-sm">Instant Booking</span></div>
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-mono"><span className="flex items-center gap-1 text-emerald-600 font-bold"><ShieldCheck className="w-3.5 h-3.5" /> BAA-Signed Security</span><span>Conversion Rate: 14.8%</span></div>
          </div>
        </div>
      ),
    },
    {
      num: '04', phase: 'INBOUND ACTION', title: 'Direct Patient Call or Request', badge: 'Whisper Call Tracking',
      description: 'Friction is eliminated. The patient taps the click-to-call button or completes a streamlined consultation request.',
      detail: 'Dynamic call tracking & whisper alerts', icon: PhoneCall,
      impact: 'Empowers your front-desk team with instant patient context', kpi: '0.4s Inbound Call Routing',
      deliverables: ['1-tap prominent click-to-call for immediate emergencies', 'Whisper message alerts front desk before call connects', 'HIPAA-compliant dynamic number insertion (DNI) tracking'],
      visual: (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden text-left">
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80" alt="Dental receptionist answering call" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030A28] via-[#030A28]/45 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030A28]/80 text-white font-mono text-[10px] font-bold tracking-wider backdrop-blur-md border border-white/10 uppercase"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />STAGE 04: LIVE WHISPER CALL ROUTING</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold">00:18 ACTIVE</span>
            </div>
            <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
              <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-sm leading-tight">Front-Desk Operatory Desk Line 1 • Dedicated Lead Line</p>
              <span className="text-[10px] text-blue-200 font-mono">Whisper Audio: &ldquo;Inbound Implant Lead from Google Ads — Full-Arch Landing Page&rdquo;</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-3.5 bg-white">
            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2.5">
              <div className="flex items-center justify-between"><div><span className="text-[10px] text-slate-400 block font-mono uppercase">INBOUND CALLER NUMBER</span><h5 className="font-display text-base font-bold text-white tracking-wide">+1 (713) 555-8392</h5></div><span className="font-mono text-xs font-bold text-[#20D9FF] bg-white/10 px-2.5 py-1 rounded-full">ROUTED VIA GOOGLE ADS</span></div>
              <div className="p-2.5 rounded-lg bg-[#1236E8]/90 border border-blue-400/30 text-white space-y-1"><div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-[#20D9FF]"><Zap className="w-3 h-3" /> WHISPER ALERT TO FRONT-DESK</div><p className="text-xs font-medium leading-tight">&ldquo;Inbound Implant Lead from Google Ads — Full-Arch Landing Page&rdquo;</p></div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600"><span className="text-slate-400">Ad Keyword:</span><span className="font-semibold text-slate-800">&ldquo;All-on-4 dental implants&rdquo;</span></div>
              <div className="flex justify-between py-1 text-slate-600"><span className="text-slate-400">Lead Score:</span><span className="font-bold text-emerald-600 flex items-center gap-1"><Flame className="w-3 h-3" /> Tier 1 High-Value Case ($15K+)</span></div>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-mono"><span className="flex items-center gap-1 text-emerald-600 font-bold"><PhoneCall className="w-3 h-3" /> Zero Missed Calls</span><span>Front-Desk Context: 100%</span></div>
          </div>
        </div>
      ),
    },
    {
      num: '05', phase: 'CHAIR BOOKING', title: 'Confirmed Chair Appointment', badge: 'SMS Workflows & Sync',
      description: 'Your front-desk team confirms the appointment, reinforced by automated SMS reminders that dramatically cut patient no-shows.',
      detail: 'Practice schedule integration & retention', icon: CalendarCheck,
      impact: 'Ensures qualified, high-ticket cases seat in your operatories', kpi: 'Near 0% Patient No-Shows',
      deliverables: ['Automated 2-way SMS reminder workflows with calendar invites', 'Seamless front-desk intake logging and schedule synchronization', 'Follow-up sequences for unbooked high-value treatment consultations'],
      visual: (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden text-left">
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80" alt="Satisfied dental patient in chair" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030A28] via-[#030A28]/45 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030A28]/80 text-white font-mono text-[10px] font-bold tracking-wider backdrop-blur-md border border-white/10 uppercase"><CheckCheck className="w-3.5 h-3.5 text-emerald-400" />STAGE 05: OPERATORY 02 CONFIRMED</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold">SEATED</span>
            </div>
            <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
              <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-sm leading-tight">Sarah Jenkins — Comprehensive Implant Consultation</p>
              <span className="text-[10px] text-blue-200 font-mono">Case Value: $18,500 • Confirmed via Automated 2-Way SMS</span>
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-3.5 bg-white">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <div className="flex items-center justify-between"><span className="font-mono text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1"><CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> PRACTICE EHR SYNCED</span><span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-[10px] font-bold">OPERATORY 02</span></div>
              <div className="flex items-center justify-between"><div><h5 className="font-display text-sm font-bold text-[#030A28]">Sarah Jenkins — Implant Consult</h5><span className="text-xs text-slate-600">Thursday, 10:30 AM (60 min slot)</span></div><div className="text-right"><span className="text-[10px] text-slate-400 block font-mono">CASE PIPELINE</span><span className="text-xs font-bold text-emerald-700">$18,500</span></div></div>
            </div>
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">AUTOMATED 2-WAY PATIENT WORKFLOW</span>
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 max-w-[85%] leading-relaxed text-[11px]">&ldquo;Hi Sarah! Your appointment with Dr. Vance is set for Thursday at 10:30 AM. Reply C to confirm.&rdquo;</div>
              <div className="p-2 rounded-lg bg-[#1236E8] text-white max-w-[70%] ml-auto text-right leading-relaxed font-semibold flex items-center justify-end gap-1.5 text-[11px]"><span>C — Looking forward to it!</span><Check className="w-3 h-3" /></div>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-500"><span className="text-emerald-700 font-bold flex items-center gap-1"><Award className="w-3.5 h-3.5" /> No-Show Rate: &lt; 2.1%</span><span>PMS Sync: Dentrix / Eaglesoft</span></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="patient-system" className="w-full bg-white py-20 sm:py-28 border-b border-agency relative overflow-hidden">
      <div className="absolute inset-0 bg-studio-dots opacity-30 pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-[#1236E8]/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1236E8] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#1236E8] uppercase tracking-wider">HOW OUR PATIENT ACQUISITION PROCESS WORKS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#030A28] leading-[1.15] mb-5">From First Search to Seated in Your Operatory.</h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">A transparent, 5-stage patient conversion pipeline built exclusively for high-production dental clinics. No vague promises — every phase delivers verifiable clinic growth.</p>
        </div>

        <div className="relative space-y-14 sm:space-y-20 mb-20">
          <div className="hidden lg:block absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#1236E8] via-[#20D9FF] to-[#1236E8]/40 z-0" />
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const StepIcon = step.icon;
            return (
              <div key={step.num} className="relative z-10">
                <div className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-2xl bg-[#030A28] text-white border-4 border-white shadow-xl items-center justify-center font-mono font-bold text-sm">
                  <span className="text-[#20D9FF]">{step.num}</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
                  <div className={`lg:col-span-6 ${isEven ? 'lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
                    <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-9 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1236E8] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm"><StepIcon className="w-3.5 h-3.5" /><span>STAGE {step.num}: {step.phase}</span></div>
                        <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">{step.kpi}</span>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#030A28] tracking-tight leading-[1.2] mb-2.5">{step.title}</h3>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">{step.description}</p>
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/80 border border-blue-100 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-md bg-[#1236E8] text-white flex items-center justify-center shrink-0 mt-0.5"><Zap className="w-3.5 h-3.5" /></div>
                        <div><span className="font-mono text-[10px] text-[#1236E8] uppercase tracking-wider font-bold block mb-0.5">STRATEGIC PRACTICE IMPACT</span><p className="text-xs sm:text-sm font-semibold text-[#030A28] leading-snug">{step.impact}</p></div>
                      </div>
                      <div className="space-y-2 pt-2 border-t border-slate-200/70">
                        <div className="flex items-center justify-between mb-1.5"><span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-bold">STAGE DELIVERABLES</span><span className="text-xs font-semibold text-slate-600">{step.detail}</span></div>
                        {step.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-2.5 h-2.5 stroke-[3]" /></div>
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`lg:col-span-6 ${isEven ? 'lg:pl-8' : 'lg:order-1 lg:pr-8'}`}>
                    <div className="relative group">
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1236E8]/10 via-[#20D9FF]/15 to-[#1236E8]/10 blur-xl opacity-60 pointer-events-none" />
                      <div className="relative">{step.visual}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#030A28] text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1236E8] via-[#20D9FF] to-[#1236E8]" />
          <div className="space-y-1.5 max-w-xl relative z-10">
            <span className="font-mono text-xs font-bold text-[#20D9FF] uppercase tracking-wider block">SYSTEM IMPLEMENTATION</span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">Want this exact patient acquisition system deployed for your clinic?</h4>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">We audit your local competition, set up procedure-specific landing pages, and launch targeted Google Ads with real-time whisper tracking.</p>
          </div>
          <button onClick={() => { trackConversion('audit_cta_click', { source: 'system_approach_section' }); onOpenAudit(); }} className="btn-agency-primary h-12 px-7 flex items-center gap-2.5 shrink-0 self-stretch sm:self-start lg:self-center shadow-lg hover:shadow-xl cursor-pointer">
            <span>Deploy My Patient System</span>
            <ArrowUpRight className="w-4 h-4 btn-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
