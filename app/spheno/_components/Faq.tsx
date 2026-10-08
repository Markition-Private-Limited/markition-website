'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How do the four Spheno products share customer data?',
    answer: 'Spheno Chat, Spheno Voice, Spheno CRM, and Spheno WhatsApp AI connect directly to the central Spheno Core. When a patient begins a consultation via web chat, their intent, clinical history, and preliminary answers are stored in Spheno CRM. If they subsequently call your office, Spheno Voice instantly accesses this record to provide a personalized, uninterrupted conversation.',
  },
  {
    question: 'Can Spheno Voice integrate with our existing clinic phone numbers?',
    answer: 'Yes. Spheno Voice connects seamlessly via standard telephone forwarding or direct SIP trunking. You keep your existing business telephone number, and after-hours or overflow calls are answered instantly with sub-400ms latency without callers needing to install apps.',
  },
  {
    question: 'How does Spheno AI handle complex medical or clinical inquiries?',
    answer: 'During initial onboarding, Spheno is configured with your specific treatment protocols, accepted insurances, pricing boundaries, and specialist qualifications. When questions exceed authorized scope, Spheno politely escalates to your clinical team with a complete summary and audio recording.',
  },
  {
    question: 'Does Spheno require replacing our current practice management software?',
    answer: 'No. Spheno integrates with standard clinical scheduling calendars (Google Calendar, Outlook, and major practice management APIs). It checks live provider availability and writes booked consultations directly to your existing calendar.',
  },
  {
    question: 'Why does Spheno WhatsApp AI not look like standard WhatsApp tools?',
    answer: 'Unlike generic blasting tools that spam cold lists, Spheno WhatsApp AI uses contextual triggers directly from Spheno CRM (e.g. high-intent site exit or 24-hour consultation follow-up) to conduct authentic 2-way conversations in your brand voice.',
  },
  {
    question: 'How long does implementation and calibration take?',
    answer: 'A standard Spheno deployment is typically fully operational within 3 to 5 business days. Our engineers handle custom protocol ingestion, voice synthesis calibration, and multi-channel synchronization.',
  },
];

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F5F5F2] text-[#080C42] border-b border-[#DEDED8]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Editorial Heading */}
        <div className="mb-12 md:mb-16">
          <div className="label-eyebrow text-[#0018C5] mb-3 flex items-center gap-2">
            <span>07</span>
            <span className="text-[#6D7CFF]">·</span>
            <span>CLARITY &amp; GOVERNANCE</span>
          </div>
          <h2 className="headline-section text-[#080C42]">
            Frequently asked questions.
          </h2>
          <p className="body-lead text-[#6E706D] mt-4">
            Everything you need to understand about implementing Spheno AI across your business.
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="divide-y divide-[#DEDED8] border-y border-[#DEDED8]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`py-6 transition-colors ${isOpen ? 'bg-[#EEF0FF]/30 px-4 -mx-4 rounded-lg' : ''}`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className={`text-base sm:text-lg font-semibold transition-colors ${
                    isOpen ? 'text-[#0018C5]' : 'text-[#080C42] group-hover:text-[#0018C5]'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isOpen
                      ? 'bg-[#0018C5] border-[#0018C5] text-white rotate-180'
                      : 'border-[#DEDED8] text-[#6E706D] group-hover:border-[#0018C5]'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 text-base text-[#6E706D] leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
