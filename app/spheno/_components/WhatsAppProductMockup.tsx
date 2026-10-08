'use client';

import React from 'react';
import { Check, CheckCheck, MessageCircle } from 'lucide-react';

export const WhatsAppProductMockup: React.FC = () => {
  return (
    <div className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5F4EE] via-[#F8F8F4] to-[#EFEFE8] border border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)] flex items-center justify-center p-4 sm:p-8 select-none group">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-gradient-to-tr from-[#25D366]/10 to-[#075E54]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Container Composition */}
      <div className="relative w-full max-w-[620px] h-[440px] sm:h-[460px]">
        
        {/* ======================================================= */}
        {/* 1. LEFT CARD: SPONSORED SOCIAL CLICK-TO-WHATSAPP AD     */}
        {/* With Spheno AI branding as requested by user            */}
        {/* ======================================================= */}
        <div className="absolute left-0 top-2 sm:top-4 w-[280px] sm:w-[320px] md:w-[350px] bg-white rounded-2xl shadow-[0_12px_32px_rgba(15,23,42,0.12)] border border-slate-200/90 overflow-hidden z-10 transition-transform duration-500 group-hover:scale-[1.01]">
          
          {/* Ad Header Bar */}
          <div className="p-3 sm:p-3.5 flex items-center gap-3 border-b border-slate-100">
            {/* Logo Circle: Spheno AI */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#0018C5] to-cyan-500 flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
              <span className="font-black text-xs sm:text-sm tracking-tighter text-white">
                SP
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Spheno AI
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1">
                <span>Sponsored</span>
                <span>•</span>
                <span>🌐</span>
              </div>
            </div>
          </div>

          {/* Ad Media: Modern Enterprise Consultation Showroom Image */}
          <div className="relative w-full h-[145px] sm:h-[165px] bg-slate-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80"
              alt="Spheno AI Client Consultation"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Soft showroom sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Ad Footer & Call-to-Action */}
          <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3 bg-white">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-slate-400 font-medium block truncate">
                www.spheno.ai
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-slate-900 truncate block mt-0.5">
                Automate Inbound Revenue 24/7!
              </span>
            </div>

            {/* Click-to-WhatsApp Green Button */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold shadow-[0_4px_12px_rgba(37,211,102,0.35)] shrink-0 hover:bg-[#20BD5A] transition-colors cursor-pointer">
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </div>
          </div>

        </div>

        {/* ======================================================= */}
        {/* 2. RIGHT OVERLAY CARD: AUTOMATED WHATSAPP AI CHAT       */}
        {/* Exact Spheno AI brand name & verified identity           */}
        {/* ======================================================= */}
        <div className="absolute right-0 sm:right-2 top-0 sm:top-2 w-[270px] sm:w-[310px] md:w-[335px] bg-[#EFEAE2] rounded-2xl shadow-[0_20px_45px_rgba(15,23,42,0.16)] border border-slate-200/90 overflow-hidden z-20 transition-transform duration-500 group-hover:scale-[1.015]">
          
          {/* WhatsApp Header Bar (#075E54) with Spheno AI */}
          <div className="bg-[#075E54] text-white p-3 sm:p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Profile Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0018C5] to-cyan-500 border border-emerald-400/40 flex items-center justify-center shrink-0">
                <span className="font-bold text-[10px] text-white">SP</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    Spheno AI
                  </span>
                  {/* Verified Checkmark Badge */}
                  <span className="w-3.5 h-3.5 rounded-full bg-[#00A884] flex items-center justify-center shrink-0 text-white shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </div>
                <span className="text-[10px] text-emerald-100 font-medium block">
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Chat Messages Canvas */}
          <div className="p-3 sm:p-3.5 space-y-3 bg-[#EFEAE2] min-h-[220px] sm:min-h-[240px]">
            
            {/* User Incoming Bubble (Right-aligned, Light Green #D9FDD3) */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-[#D9FDD3] text-slate-800 p-2.5 sm:p-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#C5E9BE]/60">
                <p className="text-xs sm:text-[13px] leading-relaxed font-medium">
                  Hi, I would like to know more about Spheno.
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-500">
                  <span>10:42 AM</span>
                  <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                </div>
              </div>
            </div>

            {/* Spheno AI Agent Immediate Response (Left-aligned, Pure White) */}
            <div className="flex justify-start">
              <div className="max-w-[92%] rounded-2xl rounded-tl-xs bg-white text-slate-800 p-3 sm:p-3.5 shadow-[0_2px_6px_rgba(0,0,0,0.08)] border border-slate-200/70">
                <p className="text-xs sm:text-[12.5px] text-slate-800 leading-snug font-medium">
                  Hi Thomas! 👋
                </p>
                <p className="text-xs sm:text-[12.5px] text-slate-700 leading-snug font-normal mt-1.5">
                  Welcome to Spheno AI. Thank you for reaching out.
                </p>
                <p className="text-xs sm:text-[12.5px] text-slate-700 leading-snug font-normal mt-1.5">
                  Share your requirements or pipeline goals, and our autonomous agent will schedule your consultation, qualify procedure viability, and dispatch instant quotes.
                </p>
                <div className="flex items-center justify-end mt-2 text-[9px] text-slate-400">
                  <span>10:42 AM</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3D Floating WhatsApp Icon Badge on Top Right of Chat */}
        <div className="absolute -top-3 -right-2 sm:-top-4 sm:right-0 z-30 pointer-events-none transform rotate-3 hover:rotate-0 transition-transform">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#20BD5A] to-[#25D366] flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.45)] border-2 border-white">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.69 8.23-8.22 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
            </svg>
          </div>
        </div>

        {/* Purple Curved Arrow: Connecting Ad Button to WhatsApp Chat */}
        <div className="absolute left-[265px] sm:left-[305px] bottom-1 sm:bottom-3 z-30 pointer-events-none">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#4F46E5] drop-shadow-[0_2px_8px_rgba(79,70,229,0.35)]" viewBox="0 0 100 100" fill="none">
            <path 
              d="M 15 85 C 45 85 75 70 65 25" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            <path 
              d="M 54 36 L 65 23 L 78 33" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

      </div>

    </div>
  );
};
