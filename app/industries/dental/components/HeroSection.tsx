'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Phone, Clock, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { trackConversion } from '../utils/tracking';

interface HeroSectionProps {
  onOpenAudit: () => void;
  selectedService?: string;
}

export function HeroSection({ onOpenAudit, selectedService }: HeroSectionProps) {
  const [formData, setFormData] = useState({ fullName: '', companyName: '', email: '', serviceRequired: 'Google Ads & PPC for Dentists', projectBudget: '$500 – $1,500 / month', projectDetails: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedService) {
      const lower = selectedService.toLowerCase();
      if (lower.includes('ads') || lower.includes('google') || lower.includes('ppc')) setFormData(p => ({ ...p, serviceRequired: 'Google Ads & PPC for Dentists' }));
      else if (lower.includes('seo') || lower.includes('map')) setFormData(p => ({ ...p, serviceRequired: 'Dental Local SEO & Map Pack Ranking' }));
      else if (lower.includes('landing') || lower.includes('funnel')) setFormData(p => ({ ...p, serviceRequired: 'High-Converting Dental Landing Pages' }));
      else if (lower.includes('lead') || lower.includes('inquir')) setFormData(p => ({ ...p, serviceRequired: 'Dental Patient Lead Generation' }));
      else if (lower.includes('social') || lower.includes('video')) setFormData(p => ({ ...p, serviceRequired: 'Social Media & Video Advertising' }));
      else setFormData(p => ({ ...p, serviceRequired: 'Complete Patient Acquisition System' }));
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackConversion('form_submit', { formName: 'hero_primary_audit_form', serviceRequired: formData.serviceRequired });
    setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 700);
  };

  const handleFocusForm = () => {
    const formCard = document.getElementById('hero-audit-form');
    if (formCard) {
      formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formCard.classList.add('ring-4', 'ring-[#1236E8]', 'shadow-2xl');
      setTimeout(() => formCard.classList.remove('ring-4', 'ring-[#1236E8]', 'shadow-2xl'), 2000);
      const firstInput = formCard.querySelector('input') as HTMLInputElement | null;
      setTimeout(() => firstInput?.focus(), 650);
    }
  };

  return (
    <section className="w-full bg-white pt-10 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 border-b border-slate-200/80 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover object-top opacity-[0.08] filter grayscale contrast-125 mix-blend-multiply scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>
      <div className="absolute -top-16 left-1/3 -translate-x-1/2 w-[760px] h-[760px] pointer-events-none opacity-40 z-0 hidden lg:block select-none">
        <div className="absolute inset-0 rounded-full border border-blue-500/15" />
        <div className="absolute inset-16 rounded-full border border-dashed border-[#1236E8]/20 animate-[spin_160s_linear_infinite]" />
        <div className="absolute inset-36 rounded-full border border-[#20D9FF]/30 bg-blue-50/15" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 font-mono text-[9px] text-[#1236E8] uppercase tracking-wider bg-white/90 backdrop-blur-sm px-3 py-0.5 rounded-full border border-blue-200/60 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1236E8] animate-ping" />
          <span>15-MILE PATIENT SEARCH GEO-FENCE</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0 select-none" style={{ backgroundImage: 'radial-gradient(#1236E8 0.75px, transparent 0.75px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-10 -left-20 w-[550px] h-[550px] bg-[#20D9FF]/12 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-24 right-0 w-[650px] h-[650px] bg-[#1236E8]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="hidden xl:flex items-center gap-2 absolute top-8 right-16 z-0 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm text-[11px] text-slate-600 font-medium pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-[#1236E8]" />
        <span>Verified Google Map Pack #1 Systems</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 mb-6 self-start shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#1236E8] animate-pulse" />
              <span className="font-mono text-xs font-semibold text-[#030A28] uppercase tracking-wider">EXCLUSIVELY FOR INDEPENDENT DENTAL PRACTICES</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-bold tracking-tight text-[#030A28] leading-[1.08] mb-6 max-w-2xl">
              Dental Marketing Built to Bring{' '}
              <span className="text-[#1236E8] relative inline-block">
                More Patients.
                <span className="absolute bottom-1.5 left-0 right-0 h-2.5 bg-[#20D9FF]/30 -z-10 rounded" />
              </span>
            </h1>
            <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
              Turn high-intent local searches into qualified patient enquiries with an acquisition system engineered exclusively for surgical, cosmetic, and general dental clinics.
            </p>
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button type="button" onClick={handleFocusForm} className="btn-agency-primary h-12 px-6 sm:px-7 shadow-md hover:shadow-xl cursor-pointer flex items-center gap-2">
                <span className="hidden sm:inline">Request Free Practice Audit</span>
                <span className="sm:hidden">Request Free Audit</span>
                <ArrowUpRight className="w-4 h-4 btn-arrow shrink-0" />
              </button>
              <a href="tel:+17138947727" onClick={() => trackConversion('phone_call_click', { source: 'hero_phone_button' })} className="btn-agency-secondary h-12 px-5 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1236E8]" />
                <span className="font-mono text-sm font-semibold tracking-tight">+1 (713) 894-7727</span>
              </a>
              <div className="inline-flex items-center justify-center gap-2 h-10 px-3.5 rounded-full bg-emerald-50/90 border border-emerald-200/90 text-emerald-900 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-mono text-[11px]">Audit Slots Open This Week</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-slate-200/80 max-w-xl">
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#030A28] tracking-tight leading-none mb-1.5">Google</span>
                <span className="font-mono text-[11px] text-slate-500 font-medium uppercase tracking-wider">Certified Partner</span>
              </div>
              <div className="flex flex-col border-l border-slate-200/80 pl-4 sm:pl-6">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#1236E8] tracking-tight leading-none mb-1.5">HIPAA</span>
                <span className="font-mono text-[11px] text-slate-500 font-medium uppercase tracking-wider">Safe Call Tracking</span>
              </div>
              <div className="flex flex-col border-l border-slate-200/80 pl-4 sm:pl-6">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#030A28] tracking-tight leading-none mb-1.5">0 Lock-In</span>
                <span className="font-mono text-[11px] text-slate-500 font-medium uppercase tracking-wider">Month-to-Month</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div id="hero-audit-form" className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_16px_40px_-12px_rgba(3,10,40,0.08)] relative transition-all duration-300">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto"><CheckCircle2 className="w-8 h-8" /></div>
                  <h4 className="font-display font-bold text-[#030A28] text-2xl">Inquiry Sent Successfully</h4>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">Thank you, <strong>{formData.fullName}</strong>. Our dental marketing directors are preparing the audit for <strong>{formData.companyName || 'your practice'}</strong>. We will reach out to <strong>{formData.email}</strong> shortly.</p>
                  <button type="button" onClick={() => { setSubmitted(false); setFormData({ fullName: '', companyName: '', email: '', serviceRequired: 'Google Ads & PPC for Dentists', projectBudget: '$500 – $1,500 / month', projectDetails: '' }); }} className="mt-4 px-6 py-2.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer">Submit Another Inquiry</button>
                </div>
              ) : (
                <form id="audit-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#1236E8] uppercase tracking-wider">CONFIDENTIAL PRACTICE AUDIT</span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">24H TURNAROUND</span>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-neutral-900 mb-2 block">Full Name</label>
                    <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Jane Cooper" className="w-full bg-transparent border-b border-neutral-900 focus:border-[#1236E8] text-sm sm:text-base text-neutral-900 pb-2.5 pt-1 outline-none placeholder:text-neutral-400 font-normal transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="text-sm font-semibold text-neutral-900 mb-2 block">Company name</label>
                      <input type="text" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="Ex. Tesla Inc" className="w-full bg-transparent border-b border-neutral-900 focus:border-[#1236E8] text-sm sm:text-base text-neutral-900 pb-2.5 pt-1 outline-none placeholder:text-neutral-400 font-normal transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-neutral-900 mb-2 block">Email *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="You@Example.Com" className="w-full bg-transparent border-b border-neutral-900 focus:border-[#1236E8] text-sm sm:text-base text-neutral-900 pb-2.5 pt-1 outline-none placeholder:text-neutral-400 font-normal transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div className="relative">
                      <label className="text-sm font-semibold text-neutral-900 mb-2 block">Service required *</label>
                      <div className="relative flex items-center border-b border-neutral-900 focus-within:border-[#1236E8] transition-colors">
                        <select required value={formData.serviceRequired} onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })} className="w-full bg-transparent text-sm sm:text-base text-neutral-900 pb-2.5 pt-1 outline-none appearance-none cursor-pointer pr-8 font-normal transition-colors">
                          <option value="Google Ads & PPC for Dentists">Google Ads & PPC for Dentists</option>
                          <option value="Dental Local SEO & Map Pack Ranking">Dental Local SEO & Google Maps</option>
                          <option value="High-Converting Dental Landing Pages">High-Converting Landing Pages</option>
                          <option value="Dental Patient Lead Generation">Dental Patient Lead Generation</option>
                          <option value="Social Media & Video Advertising">Social Media & Video Advertising</option>
                          <option value="Complete Patient Acquisition System">Full Patient Acquisition System</option>
                        </select>
                        <div className="absolute right-0 pointer-events-none pb-1.5 flex items-center"><ChevronDown className="w-4 h-4 text-neutral-900 stroke-[2.2]" /></div>
                      </div>
                    </div>
                    <div className="relative">
                      <label className="text-sm font-semibold text-neutral-900 mb-2 block">Project budget *</label>
                      <div className="relative flex items-center border-b border-neutral-900 focus-within:border-[#1236E8] transition-colors">
                        <select required value={formData.projectBudget} onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })} className="w-full bg-transparent text-sm sm:text-base text-neutral-900 pb-2.5 pt-1 outline-none appearance-none cursor-pointer pr-8 font-normal transition-colors">
                          <option value="$500 – $1,500 / month">$500 – $1,500 / month</option>
                          <option value="$1,500 – $3,000 / month">$1,500 – $3,000 / month</option>
                          <option value="$3,000 – $6,000 / month">$3,000 – $6,000 / month</option>
                          <option value="$6,000 – $10,000+ / month">$6,000 – $10,000+ / month</option>
                        </select>
                        <div className="absolute right-0 pointer-events-none pb-1.5 flex items-center"><ChevronDown className="w-4 h-4 text-neutral-900 stroke-[2.2]" /></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-neutral-900 mb-2 block">Project details *</label>
                    <textarea rows={2} value={formData.projectDetails} onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })} placeholder="Tell us more about your idea" className="w-full bg-transparent border-b border-neutral-900 focus:border-[#1236E8] text-sm sm:text-base text-neutral-900 pb-2.5 pt-1 outline-none placeholder:text-neutral-400 font-normal transition-colors resize-none" />
                  </div>
                  <div className="pt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full h-12 sm:h-[50px] rounded-full bg-[#030A28] hover:bg-[#1236E8] active:scale-[0.985] text-white font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl text-center flex items-center justify-center gap-2 disabled:opacity-75 group">
                      <span>{isSubmitting ? 'Sending inquiry...' : 'Send inquiry'}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#20D9FF] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
