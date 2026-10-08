'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send, 
  Check, 
  Edit3, 
  Bot, 
  Calendar, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const ChatProductMockup: React.FC = () => {
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.1)] p-6 sm:p-8 lg:p-10 select-none overflow-hidden group">
      
      {/* Soft Ambient Background Blooms */}
      <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-gradient-to-tr from-[#0018C5]/8 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left Features Info + Right Chat Application */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* ======================================================= */}
        {/* LEFT COLUMN: WELCOME MESSAGE DETAILS & CAPABILITIES     */}
        {/* ======================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0018C5] text-xs font-mono font-bold tracking-wider uppercase w-fit shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0018C5] animate-pulse" />
            <span>SPHENO CHAT</span>
          </div>

          {/* Clean, Unobstructed Headline */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Welcome Message
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
              Make a great first impression
            </p>
          </div>

          {/* Bullet Checklist with High-Contrast Indicators */}
          <div className="space-y-3.5 pt-1">
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 border border-sky-300">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Autonomous 24/7 web concierge
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Instant qualification &amp; slot booking
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                0.28s sub-second latency
              </span>
            </div>

          </div>

          {/* Micro Status Tile */}
          <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Enterprise Lead Guard</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              SOC-2 Type II
            </span>
          </div>

        </div>

        {/* ======================================================= */}
        {/* RIGHT COLUMN: REALISTIC CHAT INTERFACE & FLOATING PILL  */}
        {/* ======================================================= */}
        <div className="lg:col-span-7 relative flex justify-center">
          
          {/* Main Chat Window Shell */}
          <div className="relative w-full max-w-[390px] rounded-2xl bg-white border border-slate-200 shadow-[0_16px_36px_rgba(15,23,42,0.12)] overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
            
            {/* Top Bar: Dark Luxury Header */}
            <div className="bg-[#0B1120] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                
                {/* Photorealistic High-Tech AI Concierge Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0018C5] via-blue-600 to-cyan-400 p-[1.5px] shadow-sm">
                    <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                        alt="Spheno AI Concierge"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Status Bead */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B1120]" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      Chat Agent
                    </span>
                    <span className="w-3.5 h-3.5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-mono font-medium">
                      Active Now
                    </span>
                  </div>
                </div>

              </div>

              {/* Protocol Note */}
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>v3.4</span>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] min-h-[290px] flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Timestamp Centered */}
                <div className="flex justify-center">
                  <span className="text-[10px] font-semibold text-slate-400 bg-white/90 px-2.5 py-0.5 rounded-md shadow-xs border border-slate-200/60">
                    Wed 8:21 AM
                  </span>
                </div>

                {/* Sub-tag Badge: "Welcome Message" */}
                <div className="flex justify-start">
                  <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
                    Welcome Message
                  </span>
                </div>

                {/* In-Chat Agent Greeting Bubble */}
                <div className="rounded-2xl rounded-tl-xs bg-white text-slate-800 p-3.5 shadow-sm border border-slate-200/80">
                  <p className="text-xs text-slate-700 leading-snug font-normal">
                    Hello, I&apos;m your Spheno business concierge.
                  </p>
                  <p className="text-xs font-semibold text-sky-600 leading-snug mt-1">
                    How can I help automate your workflow today?
                  </p>
                </div>

                {/* Interactive Quick-Prompt Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: '📅 Book Consultation', id: 'book' },
                    { label: '⚡ Pricing & ROI', id: 'pricing' },
                    { label: '🛡️ Clinical Qualification', id: 'clinical' },
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setSelectedQuickAction(chip.id)}
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        selectedQuickAction === chip.id
                          ? 'bg-[#0018C5] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Bottom Input Field */}
              <div className="mt-4 flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-1.5 shadow-xs">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  readOnly
                  className="w-full text-xs text-slate-600 bg-transparent outline-none placeholder:text-slate-400"
                />
                <button 
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0018C5] to-blue-500 flex items-center justify-center text-white shrink-0 shadow-sm hover:opacity-90 transition-opacity"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 translate-x-[-0.5px]" />
                </button>
              </div>

            </div>

          </div>

          {/* ======================================================= */}
          {/* FLOATING PROMINENT GLOWING GRADIENT PILL               */}
          {/* Layered on top with realistic depth & glowing shadow   */}
          {/* ======================================================= */}
          <div className="absolute top-[68px] -left-2 sm:-left-6 right-2 sm:right-auto sm:w-[380px] z-20 pointer-events-none">
            <div className="rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-[#0018C5] via-[#0062FE] to-[#00D2FE] text-white shadow-[0_12px_32px_rgba(0,102,255,0.45)] border border-white/20 flex items-center justify-between gap-3 animate-pulse-subtle">
              
              {/* Glowing Avatar */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/90 border-2 border-white flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-tr from-cyan-400 to-blue-600">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Message Text in Pill */}
                <div className="min-w-0">
                  <p className="text-xs sm:text-[12.5px] font-bold text-white tracking-tight truncate leading-tight">
                    Hello, I&apos;m your Spheno AI concierge.
                  </p>
                  <p className="text-[11px] sm:text-xs text-cyan-100 font-medium truncate mt-0.5 leading-tight">
                    How can I help you book or qualify today?
                  </p>
                </div>
              </div>

              {/* Edit / Quick Prompt Button */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950/80 border border-white/30 flex items-center justify-center shrink-0 shadow-sm pointer-events-auto cursor-pointer hover:bg-slate-950 transition-colors">
                <Edit3 className="w-3.5 h-3.5 text-cyan-300" />
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
