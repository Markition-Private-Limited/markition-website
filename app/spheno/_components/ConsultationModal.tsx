'use client';

import React, { useState, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { SphenoLogo } from './SphenoLogo';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    industry: 'Dental Clinics',
    channels: ['Spheno Chat', 'Spheno Voice'],
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setError('Full name and work email are required.');
      return;
    }
    if (!EMAIL_RE.test(formData.email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (process.env.NODE_ENV !== 'development' && !captchaToken) {
      setError('Please complete the reCAPTCHA.');
      return;
    }

    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          service: formData.channels.join(', '),
          message: `Business: ${formData.businessName || '—'} | Phone: ${formData.phone || '—'} | Industry: ${formData.industry} | Products requested: ${formData.channels.join(', ') || '—'}`,
          source: 'Spheno — Consultation Modal',
          recaptchaToken: captchaToken,
        }),
      });
      if (res.ok) {
        setStatus('idle');
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#080C42] border border-white/[0.12] rounded-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] p-6 sm:p-8 text-white overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0018C5]/30 blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-9 h-9 text-[#9EA6CA] hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Consultation Request Received</h3>
            <p className="text-sm text-[#B9BFDC] max-w-md mx-auto leading-relaxed">
              Thank you, {formData.fullName}. A senior Spheno systems architect from Markition will reach out to schedule your personalized live demonstration and calibration review.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#0018C5] text-white text-xs font-semibold rounded-lg hover:bg-[#1524BD] transition-colors cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <div>
              <div className="mb-3">
                <SphenoLogo variant="dark" size="sm" className="h-9 sm:h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">
                Schedule a Spheno AI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc]">
                  Discovery Session
                </span>
              </h3>
              <p className="text-sm text-[#B9BFDC] mt-1">
                See how the four products integrate into your live customer operations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#9EA6CA] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Dr. Jordan Mitchell"
                  className="w-full bg-[#050625] border border-[#161A35] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6D7CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9EA6CA] mb-1">
                  Practice / Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Apex Dental & Surgery"
                  className="w-full bg-[#050625] border border-[#161A35] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6D7CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9EA6CA] mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jordan@apexdental.com"
                  className="w-full bg-[#050625] border border-[#161A35] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6D7CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9EA6CA] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2831"
                  className="w-full bg-[#050625] border border-[#161A35] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6D7CFF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9EA6CA] mb-1">
                Industry Practice
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-[#050625] border border-[#161A35] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#6D7CFF]"
              >
                <option value="Dental Clinics">Dental Clinics &amp; Surgery</option>
                <option value="Aesthetician Clinics">Aesthetician &amp; Medical Spa</option>
                <option value="Hair Restoration">Hair Restoration Clinics</option>
                <option value="Spa & Salons">Luxury Spa &amp; Wellness Salons</option>
                <option value="Specialty Pharmacies">Compounding &amp; Specialty Pharmacies</option>
                <option value="Professional Practice">Other High-Intent Service Practice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9EA6CA] mb-2">
                Products Needed
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Spheno Chat', 'Spheno Voice', 'Spheno CRM', 'Spheno WhatsApp AI'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleChannel(p)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-left flex items-center justify-between cursor-pointer transition-colors ${
                      formData.channels.includes(p)
                        ? 'bg-[#0018C5] border-[#BBC4FF] text-white'
                        : 'bg-[#050625] border-[#161A35] text-[#9EA6CA]'
                    }`}
                  >
                    <span>{p}</span>
                    {formData.channels.includes(p) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lel-8wtAAAAAMQhOiHrfDAYCIKZ_IM2TBlaMSIr"
                theme="dark"
                onChange={(token) => { setCaptchaToken(token); setError(''); }}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-white text-[#080C42] hover:bg-[#EEF0FF] rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{status === 'sending' ? 'Sending…' : 'Request Custom Spheno AI Proposal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-[#9EA6CA] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enterprise HIPAA &amp; SOC-2 compliant infrastructure</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
