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
          {/* LINE 1 */}
          <div className="w-full sm:flex sm:items-center sm:justify-center">
            <span className="align-middle sm:whitespace-nowrap">One AI system,</span>
          </div>

          {/* LINE 2 */}
          <div className="w-full mt-1.5 sm:mt-2.5 sm:flex sm:items-center sm:justify-center">
            <span className="align-middle sm:whitespace-nowrap">your business, automated.</span>
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
