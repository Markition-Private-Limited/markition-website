'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import FloatingLines from './FloatingLines';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative flex-1 flex flex-col justify-center pt-28 sm:pt-36 md:pt-40 pb-6 sm:pb-8 bg-[#03040B] text-white overflow-hidden select-none">
      
      {/* ========================================================= */}
      {/* 1. BALANCED BACKGROUND LIGHTING ACROSS ENTIRE HERO        */}
      {/* ========================================================= */}
      
      {/* Animated Floating Lines Background (Three.js shader waves) */}
      <div className="absolute inset-0 w-full h-full opacity-90">
        <FloatingLines
          enabledWaves={['bottom', 'middle', 'top']}
          lineCount={3}
          lineDistance={75}
          bendRadius={15}
          bendStrength={3.5}
          interactive={true}
          parallax={true}
          animationSpeed={2}
          linesGradient={['#2e04e3', '#06B6D4', '#3800bd']}
          backgroundColor="#000000"
        />
      </div>

      {/* Symmetrical Atmospheric Aurora Mesh Across Full Viewport */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 95% 65% at 50% 0%, rgba(0, 102, 255, 0.28) 0%, rgba(0, 24, 197, 0.18) 45%, rgba(0, 242, 254, 0.05) 70%, transparent 100%)'
        }}
      />

      {/* Balanced Left Ambient Glow */}
      <div className="absolute top-1/4 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse closest-side, rgba(0,24,197,0.20) 0%, rgba(0,112,243,0.15) 50%, transparent 100%)' }} />

      {/* Balanced Right Ambient Glow */}
      <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse closest-side, rgba(0,242,254,0.15) 0%, rgba(0,24,197,0.20) 50%, transparent 100%)' }} />

      {/* Central Reading Halo (Gently brightens center area behind text) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(0, 112, 243, 0.14) 0%, rgba(3, 4, 11, 0.15) 60%, transparent 100%)'
        }}
      />

      {/* Seamless Ambient Light Pool that connects directly into the bottom line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 85% 100% at 50% 100%, rgba(0, 242, 254, 0.26) 0%, rgba(0, 112, 243, 0.20) 45%, rgba(0, 24, 197, 0.08) 80%, transparent 100%)'
        }}
      />

      {/* Keyframe Animations */}
      <style>{`
        @keyframes sparkle-aura-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.85;
          }
        }

        @keyframes hand-breathe-wave {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.04); }
        }

        @keyframes twinkle-a {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes twinkle-b {
          0%, 100% { opacity: 0.8; transform: scale(1.1); }
          50% { opacity: 0.25; transform: scale(0.7); }
        }

        .anim-aura {
          animation: sparkle-aura-pulse 4.5s infinite ease-in-out;
        }

        .anim-hand {
          filter: drop-shadow(0 0 14px rgba(0, 242, 254, 0.82)) drop-shadow(0 0 28px rgba(0, 112, 243, 0.52));
          animation: hand-breathe-wave 3.8s infinite ease-in-out;
        }

        .anim-twinkle-1 {
          animation: twinkle-a 2.2s infinite ease-in-out;
        }

        .anim-twinkle-2 {
          animation: twinkle-b 2.8s infinite ease-in-out;
        }
      `}</style>

      {/* SVG Gradient Definitions */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#E2F5FE" />
            <stop offset="100%" stopColor="#00F2FE" />
          </linearGradient>
          <linearGradient id="exactHandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#00F2FE" />
          </linearGradient>
        </defs>
      </svg>

      {/* ========================================================= */}
      {/* 2. MAIN HERO CONTENT: PERFECTLY CENTERED & BALANCED       */}
      {/* Symmetrical counter-spacers guarantee mathematical center */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        
        {/* DOMINANT HEADLINE - EXACTLY CENTER ALIGNED */}
        <h1 
          className="w-full font-medium sm:font-semibold tracking-[-0.038em] text-center leading-[1.08] sm:leading-[1.04] text-[#F8FAFC] mb-7 sm:mb-9"
          style={{
            fontSize: 'clamp(34px, 5.2vw, 76px)',
          }}
        >
          {/* LINE 1: [SPARKLE ON LEFT] + "One AI system," + [BALANCING SPACER ON RIGHT] */}
          {/* Plain inline flow below sm (lets long lines wrap without forcing overflow); a real
              flex row with no wrap at sm+ restores the original guaranteed-single-line desktop layout. */}
          <div className="w-full sm:flex sm:items-center sm:justify-center sm:gap-x-4">

            {/* 4-Point Radiant Sparkle Star with Soft Aura */}
            <span className="inline-flex items-center justify-center relative align-middle shrink-0 mr-2 sm:mr-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 md:w-15 md:h-15 lg:w-[64px] lg:h-[64px]">

              {/* Soft, Diffused Glow Aura behind Sparkle (No harsh spots) */}
              <span
                className="anim-aura absolute -inset-3 sm:-inset-5 rounded-full pointer-events-none blur-xl sm:blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 242, 254, 0.45) 0%, rgba(0, 85, 255, 0.3) 50%, transparent 80%)'
                }}
              />

              {/* Sparkle Star SVG Geometry */}
              <svg
                className="relative z-10 w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 md:w-15 md:h-15 lg:w-[64px] lg:h-[64px] drop-shadow-[0_0_18px_rgba(0,242,254,0.85)] cursor-pointer"
                viewBox="0 0 100 100"
                fill="url(#starGradient)"
              >
                <path d="M50 0 C50 28 72 50 100 50 C72 50 50 72 50 100 C50 72 28 50 0 50 C28 50 50 28 50 0 Z" />
              </svg>

              {/* Orbiting Twinkle Dots */}
              <span className="anim-twinkle-1 absolute -top-1 -right-1.5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#00F2FE]" />
              <span className="anim-twinkle-2 absolute -bottom-1 -left-1.5 w-1.5 h-1.5 rounded-full bg-[#E0F7FF] shadow-[0_0_5px_#00F2FE]" />
            </span>

            {/* Centered Main Text */}
            <span className="align-middle sm:whitespace-nowrap">One AI system,</span>

            {/* Symmetrical Counter-Spacer on Right (Guarantees Perfect Mathematical Center) */}
            <span
              className="inline-block align-middle shrink-0 ml-2 sm:ml-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 md:w-15 md:h-15 lg:w-[64px] lg:h-[64px] invisible pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* LINE 2: [BALANCING SPACER ON LEFT] + "your business, automated." + [HAND ON RIGHT] */}
          {/* Same responsive treatment as line 1: inline flow below sm so the hand icon wraps
              together with the trailing word "automated." instead of dropping to its own line;
              a nowrap flex row at sm+ restores the original guaranteed-single-line desktop layout. */}
          <div className="w-full mt-1.5 sm:mt-2.5 sm:flex sm:items-center sm:justify-center sm:gap-x-1.5">

            {/* Symmetrical Counter-Spacer on Left (Guarantees Perfect Mathematical Center) */}
            <span
              className="inline-block align-middle shrink-0 mr-2 sm:mr-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px] invisible pointer-events-none"
              aria-hidden="true"
            />

            {/* Centered Main Text */}
            <span className="align-middle sm:whitespace-nowrap">your business, automated.</span>

            {/* Hand Icon on Right with Soft Symmetrical Aura */}
            <span className="inline-flex items-center justify-center relative align-middle shrink-0 ml-2 sm:ml-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px]">

              {/* Soft, Diffused Glow Aura behind Hand */}
              <span 
                className="anim-aura absolute -inset-3 sm:-inset-5 rounded-full pointer-events-none blur-xl sm:blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 242, 254, 0.45) 0%, rgba(0, 112, 243, 0.3) 50%, transparent 80%)'
                }}
              />

              {/* Hand Icon (Hand + 3 Lightbulb Coils) */}
              <svg
                className="anim-hand relative z-10 w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px] cursor-pointer"
                viewBox="0 0 70 76" 
                fill="none"
              >
                {/* Hand Outline */}
                <path 
                  d="M 23 40 C 18 36 15 29 19 24 C 23 20 28 22 30 27 L 31 31 L 31 16 C 31 12 36 12 36 16 L 36 30 L 36 12 C 36 8 41 8 41 12 L 41 30 L 41 14 C 41 10 46 10 46 14 L 46 32 L 46 20 C 46 16 51 16 51 20 L 51 42 C 51 49 45 55 37 55 C 29 55 24 47 23 40 Z" 
                  stroke="url(#exactHandGrad)" 
                  strokeWidth="3.4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* 3 Curved Lightbulb Thread Rings under the Wrist */}
                <path d="M 28 60 C 34 62.5 42 62.5 48 60" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 29.5 65.5 C 35 68 41 68 46.5 65.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 33 71 C 36 73 40 73 43 71" stroke="#00F2FE" strokeWidth="2.8" strokeLinecap="round" />
              </svg>

            </span>

          </div>
        </h1>

        {/* SUPPORTING LEAD TEXT - CENTERED */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-[18px] text-[#94A3B8] leading-relaxed font-normal mb-8 sm:mb-9 text-center">
          Spheno AI helps public and private organizations set the direction, train their people, and build and run the autonomous systems worth keeping.
        </p>

        {/* CTA BUTTONS ROW - CENTERED */}
        <div className="relative flex flex-wrap items-center justify-center gap-5 sm:gap-7 mb-6 sm:mb-8">
          
          {/* Ambient Glow Pool beneath button */}
          <div 
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-16 rounded-full blur-2xl pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(ellipse, rgba(0, 112, 243, 0.4) 0%, rgba(0, 242, 254, 0.2) 50%, transparent 80%)'
            }}
          />

          {/* Primary CTA */}
          <button
            onClick={onOpenConsultation}
            className="relative z-10 px-7 sm:px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-[#060B24]/90 hover:bg-[#0A1338] border border-cyan-400/50 shadow-[0_0_24px_rgba(0,112,243,0.3)] hover:shadow-[0_0_36px_rgba(0,242,254,0.5)] hover:border-cyan-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center gap-2 group"
          >
            <span>Start with AI enablement</span>
            <span className="text-cyan-300 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>

          {/* Secondary CTA */}
          <a
            href="#system"
            className="relative z-10 text-sm sm:text-base font-medium text-[#94A3B8] hover:text-white transition-colors duration-200 flex items-center gap-1 group cursor-pointer"
          >
            <span>See how we build</span>
            <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>

        </div>

      </div>

    </section>
  );
};
