'use client';

import { useState } from 'react';
import { X, ArrowUpRight, CheckCircle2, User, Phone, Mail, Building2, Shield } from 'lucide-react';
import { trackConversion } from '../utils/tracking';
import type { LeadFormData } from '../types';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export function AuditModal({ isOpen, onClose, prefilledService }: AuditModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({ fullName: '', phoneNumber: '', email: '', businessName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.email.trim() || !formData.businessName.trim()) {
      setError('Please provide all details to generate your audit.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      trackConversion('modal_audit_submission', { serviceInterest: prefilledService || 'General Hair Restoration Marketing', businessName: formData.businessName });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl my-8 text-[#030A28]">
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-[#030A28] transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#030A28]">Audit Request Received</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our hair restoration marketing strategists are reviewing search competition for <strong className="text-[#030A28]">{formData.businessName}</strong>. Your customized clinic growth roadmap will be sent to <strong className="text-[#030A28]">{formData.email}</strong> within 24 business hours.
            </p>
            <button onClick={onClose} className="w-full btn-agency-primary h-11 text-xs font-bold cursor-pointer">Close</button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1236E8]/10 text-[#1236E8] text-[10px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1236E8]" />
              {prefilledService ? `Focus: ${prefilledService}` : 'CLINIC GROWTH INTAKE'}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#030A28] tracking-tight mb-2">Free Hair Restoration Marketing Audit</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">Identify where your clinic is losing high-ticket patients and get actionable recommendations to increase qualified bookings.</p>
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="modalFullName">Doctor / Clinic Owner Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1236E8]" />
                  <input id="modalFullName" type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Dr. Raj Malhotra, MD" className="w-full bg-slate-50 border border-slate-300 focus:border-[#1236E8] focus:bg-white focus:ring-2 focus:ring-[#1236E8]/20 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#030A28] font-medium placeholder-slate-400 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="modalPhone">Direct Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1236E8]" />
                  <input id="modalPhone" type="tel" required value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} placeholder="(555) 123-4567" className="w-full bg-slate-50 border border-slate-300 focus:border-[#1236E8] focus:bg-white focus:ring-2 focus:ring-[#1236E8]/20 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#030A28] font-medium placeholder-slate-400 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="modalEmail">Work / Clinic Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1236E8]" />
                  <input id="modalEmail" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="doctor@valehair.com" className="w-full bg-slate-50 border border-slate-300 focus:border-[#1236E8] focus:bg-white focus:ring-2 focus:ring-[#1236E8]/20 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#030A28] font-medium placeholder-slate-400 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="modalBusiness">Clinic Name &amp; City *</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1236E8]" />
                  <input id="modalBusiness" type="text" required value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} placeholder="Vale Hair Restoration Institute, Austin TX" className="w-full bg-slate-50 border border-slate-300 focus:border-[#1236E8] focus:bg-white focus:ring-2 focus:ring-[#1236E8]/20 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#030A28] font-medium placeholder-slate-400 outline-none transition-all" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn-agency-primary h-12 text-sm font-semibold cursor-pointer mt-2 shadow-md hover:shadow-xl flex items-center justify-center gap-2">
                <span>{isSubmitting ? 'Analyzing Clinic Data...' : 'Get My Free Audit'}</span>
                <ArrowUpRight className="w-4 h-4 btn-arrow" />
              </button>
              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero sales pressure. Confidential intake.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
