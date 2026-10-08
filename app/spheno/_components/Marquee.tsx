'use client';

import React from 'react';

const sphenoTickerItems = [
  'Autonomous AI Concierge',
  'Sub-Second Voice Telephony',
  'User Friendly Experience',
  'High-Quality Output',
  'Unified CRM Intelligence',
  'Proactive WhatsApp AI',
  '24/7 Inbound Availability',
  'Zero Missed Bookings',
  'Instant Lead Scoring',
  'Enterprise Grade Security',
];

export const Marquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden select-none bg-[#03040B]">
      
      {/* ========================================================= */}
      {/* TOP GLOWING CYAN RIM LIGHT - DIRECTLY TOUCHING HERO BG    */}
      {/* Absolutely 0px gap between Hero background and this line  */}
      {/* ========================================================= */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent shadow-[0_0_20px_#00F2FE] z-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-b from-[#00F2FE]/25 to-transparent z-20 pointer-events-none" />

      {/* ========================================================= */}
      {/* SEAMLESS TRANSITION BACKGROUND: DARK HERO TO WHITE BOTTOM */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#FCFCFA]" />

      {/* ========================================================= */}
      {/* FULL-WIDTH HIGH-TECH GLASS RIBBON BANNER (FLUSH & CRISP)  */}
      {/* ========================================================= */}
      <div className="relative w-full">
        
        {/* The Translucent Glowing Glass Ribbon Bar */}
        <div className="relative w-full bg-gradient-to-r from-[#04081E] via-[#08133C] to-[#04081E] border-b border-cyan-400/40 shadow-[0_10px_35px_rgba(0,242,254,0.22)] py-3.5 sm:py-4">
          
          {/* Bottom Rim */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0070F3]/70 to-transparent" />

          {/* Side Fade Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#04081E] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#04081E] to-transparent z-20 pointer-events-none" />

          {/* Continuous Infinite Ticker Track */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
            
            {/* Repetition 1 */}
            <div className="flex items-center shrink-0 space-x-10 sm:space-x-14 px-6">
              {sphenoTickerItems.map((item, index) => (
                <div key={`track1-${index}`} className="flex items-center space-x-10 sm:space-x-14">
                  
                  {/* Glowing 4-Point Sparkle Icon with Orbiting Twinkle */}
                  <span className="inline-flex items-center justify-center relative shrink-0">
                    <svg 
                      className="w-5 h-5 sm:w-6 sm:h-6 text-[#00F2FE] drop-shadow-[0_0_14px_rgba(0,242,254,0.95)]" 
                      viewBox="0 0 100 100" 
                      fill="currentColor"
                    >
                      <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 72 30 50 0 50 C30 50 50 30 50 0 Z" />
                    </svg>
                    <svg 
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#38BDF8] absolute -bottom-1 -right-1 drop-shadow-[0_0_6px_#00F2FE]" 
                      viewBox="0 0 100 100" 
                      fill="currentColor"
                    >
                      <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 72 30 50 0 50 C30 50 50 30 50 0 Z" />
                    </svg>
                  </span>

                  {/* Tech Geometric Label */}
                  <span className="text-sm sm:text-base tracking-wider font-bold text-white font-mono uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:text-cyan-300 transition-colors cursor-default">
                    {item}
                  </span>

                </div>
              ))}
            </div>

            {/* Repetition 2 (Seamless Infinite Loop) */}
            <div className="flex items-center shrink-0 space-x-10 sm:space-x-14 px-6" aria-hidden="true">
              {sphenoTickerItems.map((item, index) => (
                <div key={`track2-${index}`} className="flex items-center space-x-10 sm:space-x-14">
                  <span className="inline-flex items-center justify-center relative shrink-0">
                    <svg 
                      className="w-5 h-5 sm:w-6 sm:h-6 text-[#00F2FE] drop-shadow-[0_0_14px_rgba(0,242,254,0.95)]" 
                      viewBox="0 0 100 100" 
                      fill="currentColor"
                    >
                      <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 72 30 50 0 50 C30 50 50 30 50 0 Z" />
                    </svg>
                    <svg 
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#38BDF8] absolute -bottom-1 -right-1 drop-shadow-[0_0_6px_#00F2FE]" 
                      viewBox="0 0 100 100" 
                      fill="currentColor"
                    >
                      <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 72 30 50 0 50 C30 50 50 30 50 0 Z" />
                    </svg>
                  </span>

                  <span className="text-sm sm:text-base tracking-wider font-bold text-white font-mono uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:text-cyan-300 transition-colors cursor-default">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
