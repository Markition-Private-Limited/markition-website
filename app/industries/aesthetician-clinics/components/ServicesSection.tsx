'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Search, MapPin, Users, Layout, Share2, TrendingUp, Repeat, BarChart3, Sparkles, ShieldCheck, Check, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackConversion } from '../utils/tracking';
import { CustomIcon } from './CustomIcon';

interface ServicesSectionProps { onOpenAudit: (serviceName?: string) => void; }

export function ServicesSection({ onOpenAudit }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const services = [
    { id: '01', title: 'Google Ads for Med Spas', category: 'HIGH-INTENT CLIENT SEARCH', icon: Search, shortBadge: 'Search Ads', procedureFocus: 'Injectables, Laser & Skincare', description: 'Target prospective clients the exact second they search for Botox, dermal fillers, laser resurfacing, or med spas in your city.', deliverables: ['Negative keyword hygiene eliminates non-paying searchers', 'Treatment-specific ad copy tuned for immediate booking', 'Tight geo-radius bid targeting around your clinic', 'Google Maps ad asset & call extension synchronization'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', imageTag: 'Modern Med Spa Treatment Suite · Precision Search Capture', badge: 'Immediate Inquiries', highlightStat: '+350% Qualified Clicks', timeline: 'Live within 5-7 business days' },
    { id: '02', title: 'Aesthetic Clinic SEO', category: 'LOCAL GOOGLE MAP PACK & ORGANIC AUTHORITY', icon: MapPin, shortBadge: 'Local SEO', procedureFocus: 'Google 3-Pack & Clinic Ranking', description: 'Dominate local search results so your clinic consistently appears at the top of the Google Maps 3-Pack and organic rankings when clients search nearby.', deliverables: ['Google Business Profile (GBP) weekly signal optimization', 'Treatment pillar pages addressing client concerns & costs', 'Clean clinical citations & automated review collection', 'Technical Core Web Vitals & medical spa schema markup'], image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80', imageTag: 'Pristine Med Spa Reception & Local Practice Presence', badge: 'Compounding Visibility', highlightStat: '#1 Local Map Rank', timeline: 'Rankings establish in 60-90 days' },
    { id: '03', title: 'Client Lead Generation', category: 'QUALIFIED CLIENT ENQUIRIES', icon: Users, shortBadge: 'Lead Pipeline', procedureFocus: 'Injectables & Package Treatments', description: 'Keep your treatment rooms consistently full with pre-qualified clients seeking high-value injectable and package treatments.', deliverables: ['Pre-qualification questionnaire filters out price shoppers', 'Direct phone-routing straight into front-desk reception', 'Automated SMS & email appointment reminder workflows', 'Client re-engagement sequences to prevent no-shows'], image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80', imageTag: 'Provider Consulting with Client on Treatment Plan', badge: 'High-Value Treatments', highlightStat: '$3.8K+ Package Pipeline', timeline: 'First inquiries within 48 hours' },
    { id: '04', title: 'Landing Pages', category: 'EDITORIAL CLINICAL CONVERSION', icon: Layout, shortBadge: 'High-Converting Pages', procedureFocus: 'Frictionless Booking Funnel', description: 'Bespoke, lightning-fast landing pages crafted specifically to present provider credentials, before/after results, and drive one-tap treatment bookings.', deliverables: ['Sub-second load times for maximum Google Quality Scores', 'Thumb-friendly mobile layout with sticky click-to-call', 'Compliant before & after transformation galleries', 'Provider credentials, clinic photos & verified reviews'], image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80', imageTag: 'Pristine Modern Med Spa Treatment Room', badge: 'High Conversion Rate', highlightStat: '12.6% Booking Rate', timeline: 'Delivered ready in 5 business days' },
    { id: '05', title: 'Meta Advertising', category: 'INSTAGRAM & FACEBOOK SOCIAL AWARENESS', icon: Share2, shortBadge: 'Social Ads', procedureFocus: 'Before/After Transformations & Brand Trust', description: 'Showcase your client transformations, clinical technology, and welcoming team directly to local prospects across Instagram and Facebook feeds.', deliverables: ['High-end clinic video tours breaking client hesitation', 'Hyper-local demographic targeting for working professionals', 'Compliant before/after transformation showcases', 'Provider introduction reels building immediate warmth & trust'], image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80', imageTag: 'Approachable Aesthetician in Clinical Practice Office', badge: 'Community Reach', highlightStat: '63,000+ Local Reach', timeline: 'Campaign launch in 7 business days' },
    { id: '06', title: 'Conversion Optimization', category: 'REDUCING CLIENT DROP-OFF', icon: TrendingUp, shortBadge: 'CRO System', procedureFocus: 'Front-Desk Booking Flow', description: 'Systematically audit where prospective clients hesitate, drop off, or abandon booking forms to permanently boost consultation attendance rates.', deliverables: ['Visitor session recordings & heatmaps on clinic pages', 'Rigorous A/B testing on headlines and call-to-actions', 'Frictionless mobile form fields to prevent user drop-off', 'Sticky click-to-call button optimization for urgent bookings'], image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80', imageTag: 'Client Skin Consultation & Treatment Planning', badge: 'Lower Cost Per Lead', highlightStat: '-38% Cost Per Lead', timeline: 'Bi-weekly optimization iterations' },
    { id: '07', title: 'Retargeting', category: 'CLIENT DECISION NURTURING', icon: Repeat, shortBadge: 'Client Nurture', procedureFocus: 'High-Ticket Consideration Window', description: 'High-ticket treatment packages require research. We gently keep your clinic top-of-mind with tasteful, respectful touchpoints.', deliverables: ['Non-invasive, privacy-compliant client retargeting', 'Clear package pricing & membership clarification ads', 'Frequently asked questions addressing common treatment concerns', 'Gentle appointment reminders for unconfirmed consultations'], image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80', imageTag: 'Reassuring Provider & Client Treatment Consultation', badge: 'Re-engage Interest', highlightStat: '3.5x Re-engagement', timeline: 'Continuous automated retargeting' },
    { id: '08', title: 'Analytics & Tracking', category: 'UNCOMPROMISING ROI CLARITY', icon: BarChart3, shortBadge: 'Call & ROAS Tracking', procedureFocus: 'Revenue & Cost Per Acquisition', description: 'Connect every telephone inquiry, form fill, and advertising dollar back to actual scheduled treatments with complete attribution.', deliverables: ['Dynamic Call Tracking (DNI) attributing calls to exact keywords', 'Google Ads & GA4 server-side conversion API pipeline', 'Live 24/7 client dashboard detailing cost per acquired client', 'Monthly strategy calls to review clinic revenue numbers'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', imageTag: 'Real-Time ROI & Conversion Performance Dashboard', badge: 'Complete Transparency', highlightStat: '6.1x Verified ROAS', timeline: 'Real-time live dashboard access' },
  ];

  const handleNext = useCallback(() => setActiveService(prev => (prev + 1) % services.length), [services.length]);
  const handlePrev = useCallback(() => setActiveService(prev => (prev - 1 + services.length) % services.length), [services.length]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  useEffect(() => {
    if (tabsContainerRef.current) {
      const el = tabsContainerRef.current.children[activeService] as HTMLElement;
      if (el) {
        const c = tabsContainerRef.current;
        c.scrollTo({ left: el.offsetLeft - c.offsetWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' });
      }
    }
  }, [activeService]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setInterval(handleNext, 6000);
    return () => clearInterval(t);
  }, [isAutoPlaying, handleNext]);

  const current = services[activeService];
  const IconComponent = current.icon;

  return (
    <section id="services-section" className="w-full bg-[#FAFAFC] py-20 sm:py-28 border-b border-agency relative overflow-hidden">
      <div className="absolute inset-0 bg-studio-dots opacity-35 pointer-events-none z-0" />
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#1236E8]/6 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#20D9FF]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1236E8] animate-pulse" />
              <span className="font-mono text-xs font-semibold text-[#1236E8] uppercase tracking-wider">CORE AESTHETIC CLINIC CAPABILITIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#030A28] leading-[1.12]">Everything Your Clinic Needs to Generate Better Clients.</h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">Every campaign is tailored around your clinic&apos;s treatment menu and open appointment capacity — from single Botox units to full package memberships.</p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-end">
            <button onClick={() => { trackConversion('audit_cta_click', { source: 'services_header_button' }); onOpenAudit(); }} className="btn-agency-primary cursor-pointer text-sm whitespace-nowrap shadow-md h-12 px-6 flex items-center gap-2">
              <span>Build My Clinic Strategy</span>
              <ArrowUpRight className="w-4 h-4 btn-arrow" />
            </button>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-4 mb-3.5 px-1">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#030A28] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1236E8]" />Select Clinic Capability
              </span>
              <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600">{activeService + 1} of {services.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setIsAutoPlaying(!isAutoPlaying)} className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-sm mr-1 ${isAutoPlaying ? 'bg-blue-50/80 border-blue-200 text-[#1236E8]' : 'bg-white border-slate-200 text-slate-600 hover:text-[#1236E8] hover:border-[#1236E8]/30'}`}>
                {isAutoPlaying ? (<><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><Pause className="w-3 h-3 text-[#1236E8]" /><span>Autoplay On</span></>) : (<><Play className="w-3 h-3 text-slate-500" /><span>Autoplay</span></>)}
              </button>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={handlePrev} aria-label="Previous Service" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[#030A28] hover:text-[#1236E8] hover:border-[#1236E8]/40 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"><ChevronLeft className="w-4 h-4 stroke-[2.2]" /></button>
                <button type="button" onClick={handleNext} aria-label="Next Service" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[#030A28] hover:text-[#1236E8] hover:border-[#1236E8]/40 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"><ChevronRight className="w-4 h-4 stroke-[2.2]" /></button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div ref={tabsContainerRef} className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-3 pt-1 px-1 scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {services.map((item, index) => {
                const isSelected = activeService === index;
                return (
                  <button key={item.id} type="button" onClick={() => { setActiveService(index); trackConversion('service_click', { serviceName: item.title }); }} className={`group relative snap-start shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${isSelected ? 'bg-[#030A28] border-[#030A28] text-white shadow-lg shadow-[#030A28]/20 ring-1 ring-white/10' : 'bg-white hover:bg-slate-50/90 border-slate-200/90 hover:border-slate-300 text-slate-700 shadow-sm'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-[11px] font-bold tracking-wider ${isSelected ? 'text-[#20D9FF]' : 'text-slate-400 group-hover:text-slate-600'}`}>{item.id}</span>
                      <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white/30' : 'bg-slate-300'}`} />
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/10 text-blue-200' : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'}`}>{item.shortBadge}</span>
                    </div>
                    <div className={`text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap ${isSelected ? 'text-white' : 'text-[#030A28]'}`}>{item.title}</div>
                    {isSelected && <div className="absolute -bottom-px inset-x-3 h-0.5 bg-gradient-to-r from-[#1236E8] via-[#20D9FF] to-[#1236E8] rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="relative rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28, ease: 'easeInOut' }} className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden bg-slate-950 flex flex-col justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.image} alt={current.title} className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/50 pointer-events-none" />
                <div className="relative z-10 p-5 sm:p-7 flex items-center justify-between gap-2">
                  <div className="bg-[#1236E8]/90 backdrop-blur-md text-white font-mono text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-white/20 shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#20D9FF] animate-pulse" />
                    <span>SERVICE {current.id} / 08 • {current.badge}</span>
                  </div>
                  <div className="bg-slate-950/80 backdrop-blur-md text-white font-mono text-xs px-3.5 py-1.5 rounded-full font-bold border border-white/20 shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#20D9FF]" />
                    <span>{current.highlightStat}</span>
                  </div>
                </div>
                <div className="relative z-10 p-5 sm:p-7 space-y-2">
                  <div className="inline-flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 max-w-full">
                    <CustomIcon icon={IconComponent} variant="plain" size="sm" className="text-[#20D9FF]" />
                    <span className="font-mono text-xs sm:text-sm font-semibold text-[#20D9FF] truncate">{current.procedureFocus}</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed max-w-md font-medium">{current.imageTag}</p>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1236E8]" />
                    <span className="font-mono text-xs font-bold text-[#1236E8] uppercase tracking-wider">{current.category}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#030A28] mb-3 leading-tight tracking-tight">{current.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">{current.description}</p>
                </div>

                <div>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-bold block mb-3.5">INCLUDED CLINIC DELIVERABLES</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {current.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3 hover:border-slate-300 transition-colors">
                        <div className="w-5 h-5 rounded-md bg-[#1236E8]/10 text-[#1236E8] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 stroke-[2.5]" /></div>
                        <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span><strong className="text-[#030A28] font-semibold">{current.timeline}</strong> • Month-to-Month</span>
                  </div>
                  <button onClick={() => { trackConversion('audit_cta_click', { source: `service_slider_${current.id}`, service: current.title }); onOpenAudit(current.title); }} className="btn-agency-primary h-12 px-6 sm:px-8 shadow-md hover:shadow-xl flex items-center justify-center gap-2 self-stretch sm:self-auto cursor-pointer">
                    <span className="hidden sm:inline">Request Free Clinic Audit</span>
                    <span className="sm:hidden">Request Free Audit</span>
                    <ArrowUpRight className="w-4 h-4 btn-arrow shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
            {services.map((_, dotIdx) => (
              <button key={dotIdx} type="button" onClick={() => setActiveService(dotIdx)} className={`transition-all duration-200 rounded-full cursor-pointer ${activeService === dotIdx ? 'w-8 h-2.5 bg-[#1236E8]' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'}`} aria-label={`Go to service ${dotIdx + 1}`} />
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 font-medium">
            <span>Swipe on mobile or use arrow controls</span>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={handlePrev} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
              <span className="font-mono text-xs font-bold text-[#030A28] px-1">{activeService + 1} / {services.length}</span>
              <button type="button" onClick={handleNext} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
