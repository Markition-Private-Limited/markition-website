'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Stethoscope, 
  Scissors, 
  HeartPulse, 
  Activity,
  Scale,
  Building,
  Building2,
  Shield,
  Calculator,
  TrendingUp,
  Wrench,
  Droplets,
  Zap,
  Home,
  Bug,
  Sparkle,
  Trees,
  Sun,
  HardHat,
  Flame,
  Car,
  ShieldCheck,
  BadgePercent,
  Briefcase,
  Smile,
  Utensils,
  Plane,
  Dumbbell,
  GraduationCap,
  X
} from 'lucide-react';

interface Industry {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  cardBg: string;
  textColor: string;
  subtextColor: string;
  description: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  workflow: string;
  inquiryExample: string;
  qualificationCriteria: string[];
  bookingOutcome: string;
  avgCaseValue: string;
  image: string;
}

const industriesData: Industry[] = [
  // ==========================================
  // HEALTHCARE & WELLNESS (1 - 12)
  // ==========================================
  {
    id: 'dental-clinics',
    name: 'Dental Clinics',
    category: 'Private Practice & Dental Surgery',
    icon: Stethoscope,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Crisp Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Designed an autonomous clinical triage experience to turn high-intent implant and aligner inquiries into locked chairside appointments.',
    stat1Value: '87.4%',
    stat1Label: 'direct booking rate achieved post-deployment',
    stat2Value: '$5,200',
    stat2Label: 'average case pipeline per qualified consultation',
    workflow: 'Inquiry → Clinical Triage → Slot Reservation → CRM Sync',
    inquiryExample: 'Patient asking for dental implants or Invisalign clear aligners after hours.',
    qualificationCriteria: ['Single vs. Full Arch', 'Insurance / Self-pay status', 'Preferred appointment timing'],
    bookingOutcome: '45m 3D Scan & Consultation with Principal Dentist',
    avgCaseValue: '$3,800 – $7,500',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'aesthetic-clinics',
    name: 'Aesthetic Clinics',
    category: 'Medical Aesthetics & Dermatology',
    icon: Sparkles,
    accentColor: '#080C42',
    cardBg: '#E7FFA3', // Signature Lime Active Card (Reference Style)
    textColor: '#080C42',
    subtextColor: '#2E3D0A',
    description: 'Autonomous patient qualification that overcomes pricing objections on Morpheus8, Botox, and laser therapies in real-time.',
    stat1Value: '3.4x',
    stat1Label: 'faster speed-to-lead across web and Instagram',
    stat2Value: '92%',
    stat2Label: 're-engagement recovery for dropped consultation inquiries',
    workflow: 'Lead Capture → Skin Concern Analysis → Consultation Booking',
    inquiryExample: 'Patient inquiring about Morpheus8, Botox packages, or chemical peels.',
    qualificationCriteria: ['Treatment history', 'Target downtime tolerance', 'Consultation readiness'],
    bookingOutcome: 'Facial Assessment & Personalized Treatment Protocol',
    avgCaseValue: '$1,500 – $3,200',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'medical-clinics',
    name: 'Medical Clinics',
    category: 'Outpatient & Multi-Specialty Care',
    icon: HeartPulse,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Soft Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Autonomous patient intake and urgent symptom triage directing patients to appropriate specialists with zero hold time.',
    stat1Value: '94.2%',
    stat1Label: 'intake triage accuracy verified by staff physicians',
    stat2Value: '380ms',
    stat2Label: 'median response latency on inbound patient lines',
    workflow: 'Symptom Triage → Insurance Check → Provider Booking → EHR Sync',
    inquiryExample: 'Patient needing same-day evaluation for recurring migraines or joint pain.',
    qualificationCriteria: ['Symptom severity', 'Primary care referral', 'Insurance network'],
    bookingOutcome: 'In-Clinic Specialist Consultation & Intake Pack Sent',
    avgCaseValue: '$450 – $1,200',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'med-spas',
    name: 'Med Spas',
    category: 'Non-Invasive Aesthetic Medicine',
    icon: Sparkle,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Fresh Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Captures high-ticket injectable and body contouring leads, answers downtime questions, and collects deposits automatically.',
    stat1Value: '96.8%',
    stat1Label: 'deposit payment collection prior to chairside reservation',
    stat2Value: '$2,850',
    stat2Label: 'average package value secured by autonomous agent',
    workflow: 'Treatment Matching → Deposit Processing → Practitioner Schedule',
    inquiryExample: 'Client inquiring about CoolSculpting or full-face dermal filler packages.',
    qualificationCriteria: ['Treatment area', 'Target timeline', 'Deposit authorization'],
    bookingOutcome: 'Reserved Treatment Suite & Custom Aesthetic Protocol',
    avgCaseValue: '$1,800 – $4,500',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'hair-restoration',
    name: 'Hair Restoration Clinics',
    category: 'Surgical & Non-Surgical Restoration',
    icon: Activity,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Warm Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Pre-screens prospective surgical candidates via Norwood scale triage and connects qualified patients to surgeons in under 2 seconds.',
    stat1Value: '$140k+',
    stat1Label: 'monthly recovered surgical pipeline per location',
    stat2Value: '0%',
    stat2Label: 'dropped calls after 5 PM and over weekends',
    workflow: 'Inquiry → Norwood Scale Triage → Surgeon Consultation',
    inquiryExample: 'Prospective patient seeking FUE/FUT hair transplant cost and downtime.',
    qualificationCriteria: ['Norwood grade estimation', 'Surgical readiness', 'Budget qualification'],
    bookingOutcome: 'Diagnostic Trichoscopy & Surgical Feasibility Session',
    avgCaseValue: '$6,000 – $14,000',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'dermatology-clinics',
    name: 'Dermatology Clinics',
    category: 'Clinical & Cosmetic Dermatology',
    icon: Stethoscope,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Separates routine skin checks from urgent biopsy requests and cosmetic laser packages with instant schedule confirmation.',
    stat1Value: '89.1%',
    stat1Label: 'fill rate for cancelled or rescheduled provider slots',
    stat2Value: '4.2x',
    stat2Label: 'higher patient engagement over automated SMS reminders',
    workflow: 'Concern Triage → Biopsy / Cosmetic Route → Provider Slot Lock',
    inquiryExample: 'Patient asking about a changing mole assessment or rosacea laser treatment.',
    qualificationCriteria: ['Medical vs cosmetic', 'Previous biopsies', 'Urgency score'],
    bookingOutcome: 'Full-Body Dermatoscopy or Targeted Laser Consultation',
    avgCaseValue: '$650 – $2,400',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'chiropractic-clinics',
    name: 'Chiropractic Clinics',
    category: 'Spinal Health & Physical Alignment',
    icon: Activity,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Fresh Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Converts acute back pain and sports injury calls into booked initial examinations with automated intake history capture.',
    stat1Value: '91.5%',
    stat1Label: 'show-up rate with conversational SMS confirmations',
    stat2Value: '32h',
    stat2Label: 'staff telephone time saved every month',
    workflow: 'Injury Intake → Provider Match → Exam Booking → Care Plan CRM',
    inquiryExample: 'Patient suffering from acute sciatica needing urgent adjustment.',
    qualificationCriteria: ['Pain duration', 'Prior imaging status', 'Auto/work injury'],
    bookingOutcome: 'Initial Spinal Exam, X-Ray Review & First Adjustment',
    avgCaseValue: '$900 – $2,500',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'physiotherapy-clinics',
    name: 'Physiotherapy Clinics',
    category: 'Rehabilitation & Sports Medicine',
    icon: HeartPulse,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Matches patients to specialized therapists (post-op, sports rehab, chronic pain) while verifying insurance coverage upfront.',
    stat1Value: '86.7%',
    stat1Label: 're-booking completion for 8-week physical care programs',
    stat2Value: '< 60s',
    stat2Label: 'average time to verify benefits and lock slot',
    workflow: 'Clinical Intake → Therapist Allocation → Treatment Series Lock',
    inquiryExample: 'Runner seeking post-ACL reconstruction rehabilitation protocol.',
    qualificationCriteria: ['Surgery status', 'Prescription referral', 'Therapist specialty'],
    bookingOutcome: 'Comprehensive Biomechanical Assessment & Care Plan',
    avgCaseValue: '$1,200 – $3,600',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'veterinary-clinics',
    name: 'Veterinary Clinics',
    category: 'Companion Animal Care & Surgery',
    icon: HeartPulse,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Warm Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Differentiates critical emergencies from wellness checkups, coordinating urgent drop-offs and surgery prep seamlessly.',
    stat1Value: '99.4%',
    stat1Label: 'emergency call triage accuracy under clinical protocols',
    stat2Value: '3.1x',
    stat2Label: 'increase in recurring preventive care memberships',
    workflow: 'Species & Symptom Intake → Urgent/Routine Route → Vet Schedule',
    inquiryExample: 'Pet parent calling about acute lethargy or annual dental prophylaxis.',
    qualificationCriteria: ['Species/breed', 'Vaccine status', 'Emergency acuity score'],
    bookingOutcome: 'Exam Room Reservation & Pre-Visit History Filed',
    avgCaseValue: '$320 – $1,800',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'weight-loss-clinics',
    name: 'Weight Loss Clinics',
    category: 'Metabolic Health & GLP-1 Therapies',
    icon: Sparkles,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Qualifies prospective patients for Semaglutide and Tirzepatide programs, checking contraindications before scheduling doctors.',
    stat1Value: '$88k',
    stat1Label: 'monthly new recurring subscription revenue generated',
    stat2Value: '93%',
    stat2Label: 'qualification completion rate for inbound inquiries',
    workflow: 'Health Questionnaire → Contraindication Screen → Physician Consult',
    inquiryExample: 'Patient asking about eligibility and pricing for GLP-1 weight loss therapy.',
    qualificationCriteria: ['BMI qualification', 'Thyroid/pancreas history', 'Program commitment'],
    bookingOutcome: 'Lab Work Order & 30-min Clinical Telehealth Consult',
    avgCaseValue: '$2,400 – $4,800',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wellness-centers',
    name: 'Wellness Centers',
    category: 'Integrative Longevity & Holistic Health',
    icon: Sparkle,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Fresh Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Bundles hyperbaric oxygen, infrared sauna, and cold plunge sessions into multi-visit recurring packages with automatic billing.',
    stat1Value: '4.1x',
    stat1Label: 'higher conversion rate on multi-session memberships',
    stat2Value: '100%',
    stat2Label: 'autonomous check-in and waiver execution',
    workflow: 'Modality Recommendation → Suite Booking → Waiver Automation',
    inquiryExample: 'Client inquiring about longevity packages including HBOT and sauna.',
    qualificationCriteria: ['Wellness goals', 'Contraindication checklist', 'Membership tier'],
    bookingOutcome: 'Longevity Suite Reservation & Digital Health Intake',
    avgCaseValue: '$600 – $2,200',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'iv-therapy-clinics',
    name: 'IV Therapy Clinics',
    category: 'Hydration & Micronutrient Infusions',
    icon: Activity,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Books in-lounge drip lounges and mobile concierge nurses for NAD+, Myers cocktails, and recovery infusions in real time.',
    stat1Value: '95.8%',
    stat1Label: 'same-day concierge dispatch confirmed within 3 minutes',
    stat2Value: '41%',
    stat2Label: 'upgrade rate to high-dose NAD+ therapy protocols',
    workflow: 'Formula Selection → Lounge/Mobile Choice → Nurse Dispatch',
    inquiryExample: 'Executive requesting in-hotel NAD+ infusion for jet lag recovery.',
    qualificationCriteria: ['Infusion preference', 'Mobile vs Lounge', 'Medical history'],
    bookingOutcome: 'RN Dispatch Confirmation & Pre-Infusion Screening',
    avgCaseValue: '$280 – $1,100',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  },

  // ==========================================
  // PROFESSIONAL SERVICES (13 - 18)
  // ==========================================
  {
    id: 'law-firms',
    name: 'Law Firms',
    category: 'Personal Injury, Family & Corporate Law',
    icon: Scale,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Instant lead qualification for high-stakes cases with automated conflict-of-interest screening and retainer consultation booking.',
    stat1Value: '$220k+',
    stat1Label: 'qualified retainer pipeline secured every month',
    stat2Value: '0s',
    stat2Label: 'caller hold time during after-hours emergency inquiries',
    workflow: 'Case Intake → Conflict Check → Attorney Calendar Reservation',
    inquiryExample: 'Caller seeking immediate representation following a serious motor collision.',
    qualificationCriteria: ['Date of incident', 'Liability admission', 'Insurance carrier'],
    bookingOutcome: 'Retainer Strategy Session with Senior Partner',
    avgCaseValue: '$7,500 – $25,000',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'real-estate-agencies',
    name: 'Real Estate Agencies',
    category: 'Luxury Residential & Commercial Brokerage',
    icon: Building2,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Qualifies prospective buyers and sellers by pre-approval status and timeline, instantly booking private walkthroughs for agents.',
    stat1Value: '91.2%',
    stat1Label: 'showing attendance rate with automated calendar syncing',
    stat2Value: '2.8x',
    stat2Label: 'faster response to Zillow and luxury portal leads',
    workflow: 'Property Inquiry → Pre-Approval Verification → Showing Booked',
    inquiryExample: 'Buyer inquiring about private showing for a $2.4M waterfront residence.',
    qualificationCriteria: ['Pre-approval amount', 'Target move-in date', 'Current home status'],
    bookingOutcome: 'Private Showing Scheduled & Listing Brochure Dispatched',
    avgCaseValue: '$18,000 – $45,000',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'property-management',
    name: 'Property Management',
    category: 'Commercial & Multi-Family Portfolios',
    icon: Building,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Triages tenant emergency maintenance, answers leasing questions, and books self-guided unit tours around the clock.',
    stat1Value: '88%',
    stat1Label: 'maintenance tickets resolved without property manager intervention',
    stat2Value: '3.4x',
    stat2Label: 'increase in completed vacant unit leasing tours',
    workflow: 'Tenant Inquiry → Issue Classification → Vendor / Showing Dispatch',
    inquiryExample: 'Prospective tenant asking to tour a 2-bedroom penthouse this Saturday.',
    qualificationCriteria: ['Income-to-rent ratio', 'Credit standing', 'Move date'],
    bookingOutcome: 'Smart Lock Tour Access Code & Application Sent',
    avgCaseValue: '$2,200 – $5,400',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'insurance-agencies',
    name: 'Insurance Agencies',
    category: 'Commercial, Life & Property Coverage',
    icon: Shield,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Collects policy declaration pages and underwriting metrics conversationally, booking warm quote reviews with licensed brokers.',
    stat1Value: '76.4%',
    stat1Label: 'quote review completion rate for commercial liability',
    stat2Value: '< 2m',
    stat2Label: 'average time from web inquiry to completed intake file',
    workflow: 'Coverage Inquiry → Risk Intake → Broker Review Booked',
    inquiryExample: 'Business owner requesting umbrella liability and cyber insurance quote.',
    qualificationCriteria: ['Annual revenue', 'Employee count', 'Current claims history'],
    bookingOutcome: 'Policy Presentation & Comparative Underwriting Review',
    avgCaseValue: '$3,200 – $12,000',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'accounting-tax',
    name: 'Accounting & Tax Firms',
    category: 'CPA Practices & Corporate Advisory',
    icon: Calculator,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Filters seasonal tax and bookkeeping leads by revenue volume, booking strategy sessions directly on partners’ calendars.',
    stat1Value: '$95k',
    stat1Label: 'new annual retainer revenue signed during peak tax season',
    stat2Value: '100%',
    stat2Label: 'document collection checklist automated via SMS/email',
    workflow: 'Entity Triage → Revenue Qualification → Partner Strategy Session',
    inquiryExample: 'Founder seeking S-Corp tax optimization and monthly bookkeeping.',
    qualificationCriteria: ['Entity type', 'Annual filing volume', 'Accounting software'],
    bookingOutcome: '30-min Tax Reduction Advisory Call Scheduled',
    avgCaseValue: '$3,600 – $9,500',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'financial-advisory',
    name: 'Financial Advisory Firms',
    category: 'Wealth Management & Estate Planning',
    icon: TrendingUp,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Pre-qualifies high-net-worth investors based on investable assets and retirement horizon with white-glove conversational etiquette.',
    stat1Value: '$4.2M',
    stat1Label: 'average pipeline AUM per booked advisory consultation',
    stat2Value: '96.2%',
    stat2Label: 'adherence to SEC and fiduciary compliance guidelines',
    workflow: 'Investor Intake → Asset Tier Classification → Advisor Meeting',
    inquiryExample: 'Executive planning a 401(k) rollover and estate trust transition.',
    qualificationCriteria: ['Investable asset tier', 'Retirement timeline', 'Estate complexity'],
    bookingOutcome: 'Fiduciary Wealth Strategy Consultation Scheduled',
    avgCaseValue: '$10,000 – $35,000',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },

  // ==========================================
  // HOME SERVICES (19 - 28)
  // ==========================================
  {
    id: 'hvac-companies',
    name: 'HVAC Companies',
    category: 'Heating, Ventilation & AC Contractors',
    icon: Wrench,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Books emergency furnace and AC repairs in 380ms, routing technician dispatch zones and capturing system age automatically.',
    stat1Value: '98.6%',
    stat1Label: 'dispatch booking rate during peak heatwave and freeze alerts',
    stat2Value: '0%',
    stat2Label: 'lost service calls during overnight emergency surges',
    workflow: 'Call Intake → System Triage → Zone Dispatch → Calendar Locked',
    inquiryExample: 'Homeowner calling at 9 PM with a frozen compressor or furnace failure.',
    qualificationCriteria: ['Equipment age', 'Home square footage', 'Urgency tier'],
    bookingOutcome: '2-Hour Dispatch Window & Service Diagnostic Confirmed',
    avgCaseValue: '$850 – $9,200',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'plumbing-companies',
    name: 'Plumbing Companies',
    category: 'Residential & Commercial Plumbing',
    icon: Droplets,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Instantly identifies burst pipes and sewer backups, locking service windows and dispatching technicians before damage spreads.',
    stat1Value: '96.2%',
    stat1Label: 'conversion of emergency water heater calls into booked jobs',
    stat2Value: '< 45s',
    stat2Label: 'average turnaround from caller dial to truck route assigned',
    workflow: 'Emergency Detection → Video/Photo Link → Technician Dispatch',
    inquiryExample: 'Customer calling about an overflowing main drain or tankless heater error.',
    qualificationCriteria: ['Shut-off valve located', 'Water actively flowing', 'Commercial vs residential'],
    bookingOutcome: 'Emergency Truck Dispatched & Live Tracking SMS Sent',
    avgCaseValue: '$650 – $4,800',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'electrical-contractors',
    name: 'Electrical Contractors',
    category: 'Licensed Residential & Commercial Wiring',
    icon: Zap,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Captures EV charger installations, panel upgrades, and commercial lighting bids with upfront electrical specification triage.',
    stat1Value: '92.4%',
    stat1Label: 'pre-visit estimate accuracy using automated panel queries',
    stat2Value: '3.6x',
    stat2Label: 'faster booking for 200A panel upgrade consultations',
    workflow: 'Service Intake → Panel Spec Check → Electrician Window Reserved',
    inquiryExample: 'Homeowner inquiring about installing a Level 2 Tesla charger.',
    qualificationCriteria: ['Current amperage', 'Distance to panel', 'Permit requirement'],
    bookingOutcome: 'On-Site Diagnostic & Firm Installation Quote Scheduled',
    avgCaseValue: '$1,200 – $6,500',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'roofing-companies',
    name: 'Roofing Companies',
    category: 'Storm Restoration & Residential Roofing',
    icon: Home,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Converts storm damage and roof replacement inquiries into locked drone-inspection appointments with insurance claim assistance.',
    stat1Value: '$340k+',
    stat1Label: 'recovered storm restoration pipeline per hail event',
    stat2Value: '94%',
    stat2Label: 'inspection completion rate with calendar SMS automation',
    workflow: 'Hail/Leak Intake → Drone Inspection Booked → Adjuster Sync',
    inquiryExample: 'Homeowner calling after a severe storm with missing shingles.',
    qualificationCriteria: ['Roof age', 'Insurance carrier', 'Active leak status'],
    bookingOutcome: 'Free 21-Point Drone Roof Inspection Confirmed',
    avgCaseValue: '$11,000 – $28,000',
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    category: 'Extermination & Preventive Protection',
    icon: Bug,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Identifies pest infestations by species and property size, converting one-time treatments into quarterly recurring subscriptions.',
    stat1Value: '88.3%',
    stat1Label: 'conversion from one-time service to recurring quarterly plan',
    stat2Value: '< 3m',
    stat2Label: 'average time to lock technician arrival window',
    workflow: 'Pest Identification → Treatment Plan → Route Optimization',
    inquiryExample: 'Customer calling about termite swarming or rodent attic activity.',
    qualificationCriteria: ['Pest type', 'Square footage', 'Pet presence'],
    bookingOutcome: 'Initial Barrier Treatment & Targeted Inspection Booked',
    avgCaseValue: '$480 – $1,800',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cleaning-services',
    name: 'Cleaning Services',
    category: 'Commercial Janitorial & Premium Maid Care',
    icon: Sparkles,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Quotes residential deep cleans and recurring office janitorial contracts based on room counts and square footage automatically.',
    stat1Value: '94.6%',
    stat1Label: 'recurring bi-weekly cleaning membership retention',
    stat2Value: '100%',
    stat2Label: 'upfront credit card hold and cancellation protection',
    workflow: 'Square Footage Intake → Tier Selection → Crew Calendar Locked',
    inquiryExample: 'Client requesting move-out deep clean for a 3-bedroom home.',
    qualificationCriteria: ['Bed/bath count', 'Pet ownership', 'Deep clean vs maintenance'],
    bookingOutcome: 'Cleaning Crew Scheduled & Deposit Processed',
    avgCaseValue: '$320 – $1,400',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'landscaping-companies',
    name: 'Landscaping Companies',
    category: 'Hardscaping & Commercial Grounds Care',
    icon: Trees,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Qualifies outdoor living and patio hardscape bids, collecting budget expectations and booking design site surveys for estimators.',
    stat1Value: '$180k',
    stat1Label: 'high-ticket hardscaping projects quoted per quarter',
    stat2Value: '3.1x',
    stat2Label: 'higher response rate to Spring maintenance inquiries',
    workflow: 'Project Vision → Budget Qualification → Designer Site Visit',
    inquiryExample: 'Homeowner inquiring about custom paver patio and outdoor kitchen.',
    qualificationCriteria: ['Budget range', 'Target completion month', 'HOA approval status'],
    bookingOutcome: 'On-Site 3D Landscape Design Survey Booked',
    avgCaseValue: '$8,500 – $35,000',
    image: 'https://images.unsplash.com/photo-1558904541-efa8c4a52d31?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'solar-companies',
    name: 'Solar Companies',
    category: 'Residential & Commercial Clean Energy',
    icon: Sun,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Pre-screens monthly electric bill thresholds and roof orientation, booking high-intent solar consultations for energy advisors.',
    stat1Value: '91.8%',
    stat1Label: 'utility bill upload completion rate using smart SMS',
    stat2Value: '$28k',
    stat2Label: 'average system installation deal size closed',
    workflow: 'Utility Bill Intake → Roof Satellite Scan → Solar Specialist Meeting',
    inquiryExample: 'Homeowner with $350/mo electric bill inquiring about battery storage.',
    qualificationCriteria: ['Average monthly bill', 'Roof shading', 'Homeowner status'],
    bookingOutcome: 'Custom Solar Energy Offset Proposal & Zoom Meeting',
    avgCaseValue: '$22,000 – $48,000',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'general-contractors',
    name: 'General Contractors',
    category: 'Custom Home Builds & Major Renovations',
    icon: HardHat,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Filters out low-budget inquiries and aligns homeowners with architects and project managers for comprehensive design-build bids.',
    stat1Value: '$450k+',
    stat1Label: 'average pipeline value per booked architectural consultation',
    stat2Value: '85%',
    stat2Label: 'intake completion on architectural plans & permitting status',
    workflow: 'Scope Intake → Budget Threshold Check → Project Estimator Visit',
    inquiryExample: 'Client requesting full kitchen extension and master suite remodel.',
    qualificationCriteria: ['Budget bracket', 'Architectural drawings ready', 'Financing in place'],
    bookingOutcome: 'Initial Feasibility Meeting & Site Walkthrough Scheduled',
    avgCaseValue: '$45,000 – $180,000',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'restoration-companies',
    name: 'Restoration Companies',
    category: 'Water, Fire & Mold Mitigation 24/7',
    icon: Flame,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Immediate crisis response for flooded basements and fire emergencies, securing insurance billing authorizations in real time.',
    stat1Value: '100%',
    stat1Label: 'sub-60-second emergency intake for active water damage',
    stat2Value: '0%',
    stat2Label: 'unanswered calls during catastrophic weather events',
    workflow: 'Disaster Classification → Insurance Sync → Emergency Crew Roll',
    inquiryExample: 'Homeowner reporting burst pipe flooding hardwood floors at 2 AM.',
    qualificationCriteria: ['Water category', 'Standing water depth', 'Insurance carrier'],
    bookingOutcome: 'Emergency Extraction Unit Dispatched & Adjuster Alerted',
    avgCaseValue: '$4,500 – $22,000',
    image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80',
  },

  // ==========================================
  // AUTOMOTIVE (29 - 32)
  // ==========================================
  {
    id: 'auto-repair-shops',
    name: 'Auto Repair Shops',
    category: 'Mechanical, Brake & Transmission Repair',
    icon: Wrench,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Diagnoses vehicle symptoms, checks bay availability, and books drop-off slots with automatic VIN and parts lookup.',
    stat1Value: '93.5%',
    stat1Label: 'service bay utilization achieved across operating hours',
    stat2Value: '3.8x',
    stat2Label: 'increase in recommended maintenance service approvals',
    workflow: 'Symptom Triage → Bay Schedule Match → Drop-Off Slot Locked',
    inquiryExample: 'Driver calling about squealing brakes and illuminated check engine light.',
    qualificationCriteria: ['Make/Model/Year', 'Drivability status', 'Drop-off date'],
    bookingOutcome: 'Master Technician Diagnostic Bay Reserved',
    avgCaseValue: '$450 – $2,200',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'auto-dealerships',
    name: 'Auto Dealerships',
    category: 'New & Pre-Owned Vehicle Sales',
    icon: Car,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Responds instantly to inventory inquiries, confirms vehicle lot availability, and locks VIP test-drive appointments for sales reps.',
    stat1Value: '90.2%',
    stat1Label: 'test-drive show-up rate with personalized calendar invitations',
    stat2Value: '< 30s',
    stat2Label: 'response time to third-party inventory portal leads',
    workflow: 'VIN Verification → Trade-In Value Intake → Test Drive Booking',
    inquiryExample: 'Shopper inquiring if a 2024 BMW M3 Competition is on the lot.',
    qualificationCriteria: ['Stock number', 'Trade-in status', 'Financing preference'],
    bookingOutcome: 'Vehicle Staged in Customer Bay & Sales Advisor Assigned',
    avgCaseValue: '$28,000 – $75,000',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'car-detailing',
    name: 'Car Detailing',
    category: 'Ceramic Coating & Paint Protection Film',
    icon: Sparkles,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Answers paint correction and ceramic coating questions, calculating vehicle size surcharges and collecting booking deposits.',
    stat1Value: '97.1%',
    stat1Label: 'deposit collection rate on multi-year ceramic coating jobs',
    stat2Value: '$1,650',
    stat2Label: 'average ticket value generated through automated upselling',
    workflow: 'Package Selection → Vehicle Size Calc → Deposit & Date Lock',
    inquiryExample: 'Owner requesting 5-year ceramic coating and paint correction quote.',
    qualificationCriteria: ['Paint condition', 'Vehicle class', 'Interior detail add-on'],
    bookingOutcome: 'Detailing Bay Reserved & 20% Deposit Secured',
    avgCaseValue: '$650 – $3,200',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'collision-body-shops',
    name: 'Collision & Body Shops',
    category: 'Accident Repair & Insurance Restoration',
    icon: ShieldCheck,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Automates photo damage uploads, connects with insurance claims adjusters, and reserves loaner vehicles for customers.',
    stat1Value: '89.4%',
    stat1Label: 'insurance claim estimate approval rate on first submission',
    stat2Value: '4.5 days',
    stat2Label: 'reduction in total repair cycle time per vehicle',
    workflow: 'Damage Photo Intake → Insurance Claim Sync → Estimate Scheduled',
    inquiryExample: 'Driver needing bumper and fender estimate after an intersection collision.',
    qualificationCriteria: ['Insurance claim number', 'Vehicle driveable', 'Rental car needed'],
    bookingOutcome: 'In-Shop Laser Measurement & Computerized Estimate Booked',
    avgCaseValue: '$2,800 – $8,500',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },

  // ==========================================
  // BEAUTY & PERSONAL CARE (33 - 38)
  // ==========================================
  {
    id: 'hair-salons',
    name: 'Hair Salons',
    category: 'Luxury Styling, Balayage & Extensions',
    icon: Scissors,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Coordinates senior stylist schedules, multi-hour color appointments, and collects non-refundable booking deposits effortlessly.',
    stat1Value: '98.2%',
    stat1Label: 'deposit payment confirmation prior to 3-hour color blocks',
    stat2Value: '26h',
    stat2Label: 'stylist administrative time saved per week at reception',
    workflow: 'Hair Goal Intake → Stylist Matching → Deposit Processing',
    inquiryExample: 'Guest requesting balayage transformation with a senior colorist.',
    qualificationCriteria: ['Current hair history', 'Inspiration photo', 'Service length'],
    bookingOutcome: 'Chair Reserved & Color Consultation Protocol Sent',
    avgCaseValue: '$220 – $650',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'barbershops',
    name: 'Barbershops',
    category: 'Premium Grooming & Traditional Shaves',
    icon: Scissors,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Eliminates waiting room congestion by booking recurring appointments and walk-in queue slots via natural conversational AI.',
    stat1Value: '96%',
    stat1Label: 'on-time chair arrival rate with automated SMS reminders',
    stat2Value: '3.2x',
    stat2Label: 'higher uptake on hot towel and beard care upgrades',
    workflow: 'Barber Selection → Service Add-Ons → Immediate Chair Lock',
    inquiryExample: 'Client wanting skin fade and hot towel beard trim this evening.',
    qualificationCriteria: ['Preferred barber', 'Beard trim add-on', 'Time window'],
    bookingOutcome: 'Chair Slot Reserved & Calendar Invite Dispatched',
    avgCaseValue: '$45 – $120',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'nail-salons',
    name: 'Nail Salons',
    category: 'Gel-X, Acrylics & Luxury Pedicures',
    icon: Sparkle,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Manages nail artist schedules, intricate custom nail art time allowances, and group bridal party bookings effortlessly.',
    stat1Value: '94.1%',
    stat1Label: 'appointment adherence with automated deposit holds',
    stat2Value: '100%',
    stat2Label: 'nail art photo inspiration pre-tagged to technician ticket',
    workflow: 'Style Intake → Artist Allocation → Time Block Secured',
    inquiryExample: 'Client booking Gel-X extensions with custom chrome design.',
    qualificationCriteria: ['Removal needed', 'Nail art complexity', 'Technician choice'],
    bookingOutcome: 'Manicure Station & Artist Reserved with Design Notes',
    avgCaseValue: '$75 – $210',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'beauty-clinics',
    name: 'Beauty Clinics',
    category: 'Permanent Makeup & Lash Artistry',
    icon: Sparkles,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Pre-screens microblading and lip blush candidates for medical contraindications, locking high-ticket procedures with automated deposits.',
    stat1Value: '99.1%',
    stat1Label: 'intake waiver and pre-procedure protocol completion',
    stat2Value: '$680',
    stat2Label: 'average cart value for semi-permanent cosmetic procedures',
    workflow: 'Contraindication Screen → Artist Portfolio → Deposit Confirmed',
    inquiryExample: 'Client inquiring about ombre powder brows and touch-up timing.',
    qualificationCriteria: ['Previous tattoo status', 'Skin sensitivity', 'Deposit authorization'],
    bookingOutcome: '2.5-Hour Procedure Block & Aftercare Pack Delivered',
    avgCaseValue: '$450 – $950',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'massage-wellness',
    name: 'Massage & Wellness',
    category: 'Deep Tissue, Thai & Lymphatic Drainage',
    icon: Smile,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Pairs guests with certified therapists by modality and pressure preference, managing couples suites and recurring memberships.',
    stat1Value: '91.8%',
    stat1Label: 'monthly wellness membership conversion post-massage',
    stat2Value: '0%',
    stat2Label: 'room scheduling conflicts or overbooked therapist shifts',
    workflow: 'Pressure/Modality Match → Suite Allocation → Deposit Lock',
    inquiryExample: 'Guest booking 90-minute lymphatic drainage therapy.',
    qualificationCriteria: ['Modality preference', 'Pressure level', 'Pregnancy/health notes'],
    bookingOutcome: 'Private Treatment Suite & Therapist Confirmed',
    avgCaseValue: '$140 – $380',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tattoo-studios',
    name: 'Tattoo Studios',
    category: 'Custom Tattooing & Body Piercing',
    icon: Sparkle,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Collects reference imagery, estimates session lengths, and gathers non-refundable artist drawing deposits automatically.',
    stat1Value: '$85k+',
    stat1Label: 'artist drawing deposits secured without front-desk delays',
    stat2Value: '95.4%',
    stat2Label: 'lead-to-consultation conversion for custom sleeve work',
    workflow: 'Concept Intake → Artist Matching → Drawing Deposit Collected',
    inquiryExample: 'Collector requesting full sleeve consultation with blackwork artist.',
    qualificationCriteria: ['Placement & sizing', 'Style preference', 'Deposit readiness'],
    bookingOutcome: 'Design Consultation & First Tattoo Session Locked',
    avgCaseValue: '$500 – $2,800',
    image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=80',
  },

  // ==========================================
  // HOSPITALITY & OTHER (39 - 43)
  // ==========================================
  {
    id: 'hotels',
    name: 'Hotels',
    category: 'Boutique Hospitality & Luxury Resorts',
    icon: Building,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Answers room amenity questions, upgrades suites, and books direct reservations bypassing costly third-party OTA commissions.',
    stat1Value: '28.4%',
    stat1Label: 'increase in direct bookings saved from OTA commissions',
    stat2Value: '380ms',
    stat2Label: 'voice response time on PBX front-desk guest calls',
    workflow: 'Room Preference → Rate Engine Query → Direct Folio Booking',
    inquiryExample: 'Guest asking for penthouse suite availability and airport pickup.',
    qualificationCriteria: ['Check-in date', 'Guest count', 'Direct rate guarantee'],
    bookingOutcome: 'Direct Room Reservation & Mobile Key Confirmation',
    avgCaseValue: '$850 – $3,500',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    category: 'Fine Dining & Private Event Dining',
    icon: Utensils,
    accentColor: '#0018C5',
    cardBg: '#FFF2E6', // Champagne
    textColor: '#381E05',
    subtextColor: '#614324',
    description: 'Captures tasting menu reservations, manages waitlists during peak dining rushes, and books private dining buyouts.',
    stat1Value: '99.5%',
    stat1Label: 'table occupancy achieved on Friday and Saturday dinner services',
    stat2Value: '0%',
    stat2Label: 'unanswered reservation calls during busy kitchen dinner rushes',
    workflow: 'Party Size Intake → Table Inventory Sync → SMS Table Confirmation',
    inquiryExample: 'Guest reserving Chef’s Tasting Table for anniversary dinner.',
    qualificationCriteria: ['Dietary restrictions', 'Party size', 'Seating window'],
    bookingOutcome: 'Dining Reservation Confirmed & Pre-Authorization Held',
    avgCaseValue: '$180 – $1,200',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'travel-agencies',
    name: 'Travel Agencies',
    category: 'Luxury Itineraries & Bespoke Expeditions',
    icon: Plane,
    accentColor: '#0018C5',
    cardBg: '#EAFBF1', // Mint
    textColor: '#082D1B',
    subtextColor: '#29543E',
    description: 'Qualifies luxury traveler itineraries, budget ranges, and dates, connecting qualified clients with destination specialists.',
    stat1Value: '$24k',
    stat1Label: 'average bespoke vacation itinerary booked through system',
    stat2Value: '92.3%',
    stat2Label: 'client satisfaction on custom itinerary turnaround speed',
    workflow: 'Destination Triage → Budget Check → Specialist Zoom Booked',
    inquiryExample: 'Family requesting two-week luxury safari and private flight itinerary.',
    qualificationCriteria: ['Budget bracket', 'Travel dates', 'Pace and luxury tier'],
    bookingOutcome: 'Private Itinerary Design Consultation Scheduled',
    avgCaseValue: '$8,000 – $45,000',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fitness-gyms',
    name: 'Fitness & Gyms',
    category: 'Boutique Studios & Performance Training',
    icon: Dumbbell,
    accentColor: '#0018C5',
    cardBg: '#F3ECFF', // Lavender
    textColor: '#190A38',
    subtextColor: '#4A3B66',
    description: 'Schedules trial personal training sessions, books high-demand reformer Pilates classes, and closes recurring annual memberships.',
    stat1Value: '86.4%',
    stat1Label: 'conversion of free trial pass holders into paid annual members',
    stat2Value: '100%',
    stat2Label: 'automated liability waiver collection prior to workout',
    workflow: 'Fitness Goal Intake → Trainer Allocation → Pass & Tour Confirmed',
    inquiryExample: 'Visitor requesting private personal training assessment and club tour.',
    qualificationCriteria: ['Fitness objectives', 'Training time', 'Membership tier'],
    bookingOutcome: 'VIP Assessment & Training Session Confirmed on Schedule',
    avgCaseValue: '$600 – $2,800',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'education-tutoring',
    name: 'Education & Tutoring',
    category: 'STEM, Test Prep & College Admissions',
    icon: GraduationCap,
    accentColor: '#0018C5',
    cardBg: '#E8EEFF', // Ice Blue
    textColor: '#080C42',
    subtextColor: '#3A406D',
    description: 'Diagnoses student academic challenges, matches subject tutors, and schedules diagnostic evaluation exams seamlessly.',
    stat1Value: '93.7%',
    stat1Label: 'diagnostic test completion rate with smart reminder sequences',
    stat2Value: '3.5x',
    stat2Label: 'higher retention for semester-long tutoring packages',
    workflow: 'Subject & Grade Intake → Tutor Match → Diagnostic Exam Locked',
    inquiryExample: 'Parent asking for SAT prep and AP Calculus private tutoring.',
    qualificationCriteria: ['Grade level', 'Target test date', 'Subject priority'],
    bookingOutcome: 'Academic Diagnostic Session & Tutor Consultation Booked',
    avgCaseValue: '$1,200 – $4,500',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
];

export const Industries: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Default to index 1 (Aesthetic Clinics, signature lime card)
  const [expandedIndustry, setExpandedIndustry] = useState<Industry | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const prevActiveIndex = useRef<number>(activeIndex);

  // Drag / hold-to-spin state for the 3D card deck
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const total = industriesData.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const DRAG_THRESHOLD = 90;

  const handleDeckPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDeckPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const endDeckDrag = () => {
    if (!isDragging) return;
    if (dragOffset <= -DRAG_THRESHOLD) {
      handleNext();
    } else if (dragOffset >= DRAG_THRESHOLD) {
      handlePrev();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Smoothly scroll active tab pill into view only when activeIndex genuinely changes.
  // (Comparing against the previous value — rather than a "have we mounted yet" flag —
  // is immune to React StrictMode's dev-only double-invocation of effects on mount,
  // which would otherwise let a second no-op invocation slip through and fire a scroll.)
  useEffect(() => {
    if (prevActiveIndex.current === activeIndex) {
      return;
    }
    prevActiveIndex.current = activeIndex;
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIndex]);

  return (
    <section id="industries" className="py-24 md:py-32 bg-[#050625] text-white border-b border-[#161A35] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none rounded-full" style={{ background: 'radial-gradient(ellipse closest-side, rgba(0,24,197,0.15) 0%, transparent 100%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="label-eyebrow text-[#BBC4FF] mb-3 flex items-center gap-2">
            <span>06</span>
            <span className="text-[#6D7CFF]">·</span>
            <span>INDUSTRY SPECIALIZATIONS</span>
          </div>
          <h2 className="headline-section text-white text-balance">
            Tailored workflows for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc]">
              appointment–driven practices.
            </span>
          </h2>
          <p className="body-lead text-[#B9BFDC] mt-4">
            Spheno AI is pre-configured with clinical vocabularies, pricing structures, and qualification logic specific to high-value service businesses.
          </p>
        </div>

        {/* Reference Top Bar: Circular Arrows + Pill Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-14 md:mb-18">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous industry"
            className="w-11 h-11 rounded-full bg-[#090C39] hover:bg-[#151A4A] border border-white/10 hover:border-[#6D7CFF] text-white flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Pill Tabs List */}
          <div 
            className="flex items-center gap-2 overflow-x-auto py-2 px-1 max-w-3xl sm:max-w-4xl scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {industriesData.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
                    isActive
                      ? 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.25)] scale-105'
                      : 'bg-[#090C39]/80 text-[#B9BFDC] hover:text-white border border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next industry"
            className="w-11 h-11 rounded-full bg-[#090C39] hover:bg-[#151A4A] border border-white/10 hover:border-[#6D7CFF] text-white flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 3D PERSPECTIVE CAROUSEL / COVERFLOW DECK */}
        <div
          className={`relative w-full max-w-6xl mx-auto h-[620px] sm:h-[660px] md:h-[680px] flex items-center justify-center select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ perspective: '1600px', touchAction: 'pan-y' }}
          onPointerDown={handleDeckPointerDown}
          onPointerMove={handleDeckPointerMove}
          onPointerUp={endDeckDrag}
          onPointerCancel={endDeckDrag}
          onPointerLeave={endDeckDrag}
        >

          {industriesData.map((item, idx) => {
            // Calculate relative offset from active index
            let offset = idx - activeIndex;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Drag-driven "spin board" modifiers: the whole deck shifts with the
            // pointer, and the held card tilts/spins to follow the drag direction.
            const dragShift = isDragging ? dragOffset : 0;
            const dragSpin = isDragging ? Math.max(-22, Math.min(22, dragOffset / 7)) : 0;
            const dragTiltY = isDragging ? Math.max(-28, Math.min(28, -dragOffset / 6)) : 0;
            const dragScale = isDragging && isCenter ? 0.965 : isDragging ? 0.985 : 1;

            // Hover reaction: only meaningful for the interactive (visible) cards, and
            // suppressed while actively dragging so the two gestures don't fight.
            const isHovered = !isDragging && hoveredCardId === item.id && (isCenter || isLeft || isRight);
            const hoverLift = isHovered ? -16 : 0;
            const hoverScale = isHovered ? (isCenter ? 1.04 : 1.06) : 1;
            const hoverTiltBoost = isHovered ? (isCenter ? 0 : isLeft ? -4 : 4) : 0;

            // Compute 3D transforms matching the reference screenshot exactly:
            let transformStyle = '';
            let zIndex = 10;
            let opacity = 0.4;
            let pointerEvents: 'auto' | 'none' = 'none';

            if (isCenter) {
              transformStyle = `translateX(${dragShift}px) translateY(${hoverLift}px) scale(${dragScale * hoverScale}) rotate(${dragSpin}deg) rotateY(${dragTiltY}deg)`;
              zIndex = 30;
              opacity = 1;
              pointerEvents = 'auto';
            } else if (isLeft) {
              transformStyle = `translateX(calc(-70% + ${dragShift}px)) translateY(${24 + hoverLift}px) scale(${0.92 * dragScale * hoverScale}) rotate(${-8 + dragSpin * 0.4 + hoverTiltBoost}deg) rotateY(${16 + dragTiltY * 0.3}deg)`;
              zIndex = isHovered ? 25 : 20;
              opacity = isHovered ? 1 : 0.85;
              pointerEvents = 'auto';
            } else if (isRight) {
              transformStyle = `translateX(calc(70% + ${dragShift}px)) translateY(${24 + hoverLift}px) scale(${0.92 * dragScale * hoverScale}) rotate(${8 + dragSpin * 0.4 + hoverTiltBoost}deg) rotateY(${-16 + dragTiltY * 0.3}deg)`;
              zIndex = isHovered ? 25 : 20;
              opacity = isHovered ? 1 : 0.85;
              pointerEvents = 'auto';
            } else if (offset === -2) {
              transformStyle = `translateX(calc(-120% + ${dragShift * 0.6}px)) translateY(40px) scale(0.82) rotate(-14deg) rotateY(25deg)`;
              zIndex = 10;
              opacity = 0.4;
            } else if (offset === 2) {
              transformStyle = `translateX(calc(120% + ${dragShift * 0.6}px)) translateY(40px) scale(0.82) rotate(14deg) rotateY(-25deg)`;
              zIndex = 10;
              opacity = 0.4;
            }

            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId((prev) => (prev === item.id ? null : prev))}
                className={`absolute w-[92%] sm:w-[460px] md:w-[490px] h-[580px] sm:h-[620px] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-grab active:cursor-grabbing select-none rounded-[32px] overflow-hidden border flex flex-col justify-between p-6 sm:p-8 ${
                  isDragging ? '' : 'transition-all duration-500'
                } ${isHovered ? 'border-white/40' : 'border-black/10'}`}
                style={{
                  backgroundColor: item.cardBg,
                  transform: transformStyle,
                  zIndex,
                  opacity,
                  pointerEvents,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'opacity 300ms ease' : undefined,
                  boxShadow: isHovered
                    ? '0 50px 100px -15px rgba(0,0,0,0.95), 0 0 60px -10px rgba(109,124,255,0.45)'
                    : isCenter && isDragging
                    ? '0 45px 90px -15px rgba(0,0,0,0.9)'
                    : '0 30px 70px -15px rgba(0,0,0,0.85)',
                }}
              >
                {/* Top: Practice Icon Logo & Name */}
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0 shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 
                        className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
                        style={{ color: item.textColor }}
                      >
                        {item.name}
                      </h3>
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-70" style={{ color: item.subtextColor }}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Description Copy */}
                  <p 
                    className="text-sm sm:text-[15px] leading-relaxed font-normal mt-3"
                    style={{ color: item.subtextColor }}
                  >
                    {item.description}
                  </p>

                  {/* Two Key Metrics Columns (Matching reference screenshot) */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-black/10">
                    <div>
                      <div 
                        className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums"
                        style={{ color: item.textColor }}
                      >
                        {item.stat1Value}
                      </div>
                      <p 
                        className="text-xs mt-1 leading-snug font-medium opacity-80"
                        style={{ color: item.subtextColor }}
                      >
                        {item.stat1Label}
                      </p>
                    </div>

                    <div>
                      <div 
                        className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums"
                        style={{ color: item.textColor }}
                      >
                        {item.stat2Value}
                      </div>
                      <p 
                        className="text-xs mt-1 leading-snug font-medium opacity-80"
                        style={{ color: item.subtextColor }}
                      >
                        {item.stat2Label}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Graphic Frame + Floating Button (Matching Reference) */}
                <div className="relative mt-6 rounded-2xl overflow-hidden h-44 sm:h-52 w-full border border-black/10 group shadow-inner">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Floating Action Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedIndustry(item);
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#111318]/90 hover:bg-black text-white text-xs sm:text-sm font-semibold backdrop-blur-md shadow-xl border border-white/20 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Explore AI Workflow</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Micro pill badge on bottom left of image */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs font-semibold text-white border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>EMR &amp; Calendar API</span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Carousel Drag / Click Navigation Hint */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#9EA6CA] font-medium flex items-center justify-center gap-2">
            <span>Click any side card or arrow to navigate practice specialties</span>
            <span className="text-[#6D7CFF]">·</span>
            <span className="text-white font-semibold">{activeIndex + 1} of {total}</span>
          </p>
        </div>

      </div>

      {/* Workflow Deep-Dive Modal (When user clicks "Explore AI Workflow") */}
      {expandedIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-2xl bg-[#080C42] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] text-white overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent">
            
            {/* Close Button */}
            <button
              onClick={() => setExpandedIndustry(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#050625] hover:bg-[#161A35] border border-white/10 flex items-center justify-center text-[#BBC4FF] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0018C5] text-white flex items-center justify-center shrink-0">
                {React.createElement(expandedIndustry.icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#BBC4FF]">
                  {expandedIndustry.category}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {expandedIndustry.name} AI Architecture
                </h3>
              </div>
            </div>

            {/* Pipeline Step */}
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#050625] border border-[#202449]">
                <span className="text-xs uppercase font-bold text-[#6D7CFF] block mb-1">
                  Automated Pipeline
                </span>
                <div className="text-base font-semibold text-white">
                  {expandedIndustry.workflow}
                </div>
              </div>

              {/* Inquiry Example */}
              <div className="p-4 rounded-xl bg-[#050625] border border-[#202449]">
                <span className="text-xs uppercase font-bold text-[#BBC4FF] block mb-1">
                  Typical Inbound Client Query:
                </span>
                <p className="text-sm text-slate-200 italic">
                  &quot;{expandedIndustry.inquiryExample}&quot;
                </p>
              </div>

              {/* Qualification Rules */}
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#9EA6CA] block mb-2">
                  Autonomous Qualification Logic
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {expandedIndustry.qualificationCriteria.map((crit, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#090C39] border border-[#202449] text-xs text-[#BBC4FF] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
                <div>
                  <span className="text-xs text-[#9EA6CA] block">Confirmed Booking Outcome:</span>
                  <div className="text-sm font-bold text-white mt-1">
                    {expandedIndustry.bookingOutcome}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[#9EA6CA] block">Average Case Pipeline:</span>
                  <div className="text-lg font-extrabold text-emerald-400 mt-0.5 tabular-nums">
                    {expandedIndustry.avgCaseValue}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setExpandedIndustry(null)}
                  className="w-full py-3 rounded-xl bg-[#0018C5] hover:bg-[#1524BD] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close &amp; Return to Practice Overview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
