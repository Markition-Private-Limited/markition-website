'use client';

import React, { useState } from 'react';

const BUDGET_MIN = 0;
const BUDGET_MAX = 10000;

const PhoneCallIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5599ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 3a9 9 0 0 1 6.95 6.96" />
    <path d="M14.05 7a5 5 0 0 1 3.96 3.99" />
  </svg>
);

const fieldClass =
  'w-full bg-transparent border-0 border-b border-white/15 text-[13px] text-white/90 placeholder-white/20 py-1.5 outline-none focus:border-cyan-400/60 transition-colors duration-200';
const labelClass = 'block text-[12px] font-semibold text-[#C8D8EE] mb-1.5';

const FormField: React.FC<{ label: string; placeholder: string; type: string }> = ({ label, placeholder, type }) => (
  <div>
    <label className={labelClass}>{label}</label>
    <input type={type} placeholder={placeholder} className={fieldClass} />
  </div>
);

export const ContactSection: React.FC = () => {
  const [budgetMin, setBudgetMin] = useState(1000);
  const [budgetMax, setBudgetMax] = useState(5000);

  const minPct = ((budgetMin - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;
  const maxPct = ((budgetMax - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetMin(Math.min(Number(e.target.value), budgetMax - 500));
  };
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetMax(Math.max(Number(e.target.value), budgetMin + 500));
  };

  return (
    <section className="relative bg-[#080C42] py-20 sm:py-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse closest-side, rgba(0,24,197,0.15) 0%, transparent 100%)' }} />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">

        {/* ── LEFT COLUMN ── */}
        <div>
          <h2 className="text-[clamp(30px,3.4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-white mb-4">
            Let&apos;s Build
            <br />
            Something <span className="text-cyan-400">Great</span>
          </h2>

          <p className="text-sm leading-relaxed text-[#8aa4c8] max-w-sm mb-10">
            Share your vision with us, and Markition&apos;s growth team will design AI, marketing, and software
            solutions tailored to your goals — helping you streamline operations and scale faster.
          </p>

          {/* Phone card */}
          <div className="flex rounded-[20px] overflow-hidden border border-cyan-400/10 shadow-[0_20px_60px_rgba(0,0,40,0.5)]">
            {/* Photo */}
            <div className="w-[44%] min-h-[180px] bg-[#e8edf8] flex items-end overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/spheno/images/expert-photo.png"
                alt="Spheno AI Expert"
                draggable={false}
                className="w-full h-full object-cover object-top block"
              />
            </div>

            {/* Info */}
            <div className="flex-1 bg-[#0d1e48] flex flex-col items-center justify-center px-5 py-7">
              <div className="w-[54px] h-[54px] rounded-full bg-[#1e50ff]/18 border border-[#3c78ff]/35 flex items-center justify-center mb-3.5"
                style={{ boxShadow: '0 0 20px rgba(40,100,255,0.55), 0 0 48px rgba(40,100,255,0.2)' }}
              >
                <PhoneCallIcon />
              </div>

              <p className="text-[20px] font-extrabold text-[#f0f6ff] tracking-tight text-center mb-2">
                +1 (713) 894-7727
              </p>

              <div className="w-[110px] h-px bg-white/[0.14] mb-2.5" />

              <a href="tel:+17138947727" className="text-[13px] text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
                Talk to an expert
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN – Form ── */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6 lg:pl-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <FormField label="Full Name" placeholder="Type here" type="text" />
            <FormField label="Email" placeholder="Type here" type="email" />
          </div>

          {/* Why contacting */}
          <div>
            <label className={labelClass}>Why Are You Contacting Us?</label>
            <div className="relative">
              <select
                defaultValue=""
                className="w-full bg-transparent border-0 border-b border-white/15 text-[13px] text-[#8aa4c8] py-1.5 pr-6 outline-none cursor-pointer appearance-none focus:border-cyan-400/60 transition-colors duration-200"
              >
                <option value="" disabled className="bg-[#0d1e48]">Select a Service</option>
                <option value="spheno-chat" className="bg-[#0d1e48]">Spheno Chat</option>
                <option value="spheno-voice" className="bg-[#0d1e48]">Spheno Voice</option>
                <option value="spheno-crm" className="bg-[#0d1e48]">Spheno CRM</option>
                <option value="spheno-whatsapp" className="bg-[#0d1e48]">Spheno WhatsApp AI</option>
                <option value="general" className="bg-[#0d1e48]">General Inquiry</option>
              </select>
              <svg className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#8aa4c8]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Budget slider */}
          <div>
            <label className={labelClass}>Your Budget</label>
            <p className="text-[12px] text-[#8aa4c8] mt-1 mb-3.5">Slide to indicate your budget range</p>
            <div className="relative h-9">
              <div className="absolute top-1/2 -translate-y-1/2 h-0.5 w-full bg-white/10 rounded-full pointer-events-none" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-cyan-400 rounded-full pointer-events-none"
                style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
              />
              <input
                type="range"
                className="budget-thumb"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={100}
                value={budgetMin}
                onChange={handleMin}
                style={{ zIndex: budgetMin > BUDGET_MAX - 1000 ? 5 : 3 }}
              />
              <input
                type="range"
                className="budget-thumb"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={100}
                value={budgetMax}
                onChange={handleMax}
                style={{ zIndex: 4 }}
              />
            </div>
            <div className="flex justify-between text-[12px] text-[#8aa4c8] mt-2">
              <span>${budgetMin.toLocaleString()}</span>
              <span>${budgetMax.toLocaleString()}</span>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className={labelClass}>Your Message (0/2000)</label>
            <textarea
              placeholder="Type here"
              rows={3}
              maxLength={2000}
              className="w-full bg-transparent border-0 border-b border-white/15 text-[13px] text-white/90 placeholder-white/20 py-1.5 outline-none resize-none focus:border-cyan-400/60 transition-colors duration-200"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-white/25 px-6.5 py-2.5 text-[12.5px] font-semibold text-[#f0f6ff] tracking-wide hover:bg-white/[0.06] hover:border-white/40 transition-all duration-200"
            >
              <span className="text-cyan-400 text-[11px]">✦</span>
              Let&apos;s Build Something Great
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .budget-thumb {
          -webkit-appearance: none;
          appearance: none;
          position: absolute;
          width: 100%;
          height: 100%;
          background: transparent;
          pointer-events: none;
          top: 0;
          left: 0;
          margin: 0;
          outline: none;
        }
        .budget-thumb::-webkit-slider-runnable-track { background: transparent; height: 2px; }
        .budget-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10192e;
          border: 2px solid #22d3ee;
          cursor: pointer;
          pointer-events: all;
          box-shadow: 0 0 0 3px rgba(34,211,238,0.15), 0 0 10px rgba(34,211,238,0.3);
          margin-top: -9px;
        }
        .budget-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10192e;
          border: 2px solid #22d3ee;
          cursor: pointer;
          pointer-events: all;
          box-shadow: 0 0 0 3px rgba(34,211,238,0.15);
        }
        .budget-thumb::-moz-range-track { background: transparent; }
      `}</style>
    </section>
  );
};
