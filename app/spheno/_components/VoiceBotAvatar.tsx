'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Pause, Sparkles, User, RefreshCw, Cpu } from 'lucide-react';

interface VoiceBotAvatarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const VoiceBotAvatar: React.FC<VoiceBotAvatarProps> = ({ isPlaying, onTogglePlay }) => {
  const [activeModel, setActiveModel] = useState<'ameca' | 'sophia'>('ameca');

  // Web Speech API realistic voice feedback when toggling play
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          "I can book Doctor Bennett for you at 3:15 PM today, or qualify any inquiries right away."
        );
        utterance.rate = 1.05;
        utterance.pitch = 1.02;
        utterance.onend = () => {
          onTogglePlay();
        };
        utterance.onerror = () => {
          onTogglePlay();
        };
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel();
      }
    }
  }, [isPlaying]);

  const robotImageSrc = activeModel === 'ameca'
    ? '/spheno/images/spheno-voice-humanoid-bot.jpg'
    : '/spheno/images/sophia-humanoid-bot.jpg';

  const robotImageAlt = activeModel === 'ameca'
    ? 'Ameca State-of-the-Art Humanoid AI Robot'
    : 'Sophia Advanced Cybernetic Humanoid AI Robot';

  return (
    <div className="relative w-full h-[470px] sm:h-[510px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF2F6] border border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)] flex items-center justify-center select-none group">
      
      {/* ========================================================= */}
      {/* 1. REALISTIC CYBERNETIC HUMANOID AI BOT (HIGH DEFINITION) */}
      {/* Studio-photographed android robot with authentic details  */}
      {/* ========================================================= */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* Soft Ambient Studio Halo behind Avatar */}
        <div
          className={`absolute w-[440px] h-[440px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${isPlaying ? 'animate-voice-halo' : ''}`}
          style={{
            background: isPlaying
              ? 'radial-gradient(circle, rgba(0, 242, 254, 0.35) 0%, rgba(0, 112, 243, 0.25) 45%, transparent 75%)'
              : 'radial-gradient(circle, rgba(169, 199, 247, 0.45) 0%, rgba(226, 238, 252, 0.25) 50%, transparent 75%)',
          }}
        />

        {/* Dynamic Voice Pulse Waves when Active */}
        {isPlaying && (
          <>
            <div
              className="absolute w-[340px] h-[340px] rounded-full border border-cyan-400/50 pointer-events-none animate-voice-ring"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="absolute w-[420px] h-[420px] rounded-full border border-blue-500/40 pointer-events-none animate-voice-ring"
              style={{ animationDelay: '0.35s' }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full border border-cyan-300/30 pointer-events-none animate-voice-ring"
              style={{ animationDelay: '0.7s' }}
            />
          </>
        )}

        {/* Realistic Humanoid Robot Photograph */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            key={activeModel}
            src={robotImageSrc}
            alt={robotImageAlt}
            className={`w-full h-full transform transition-all duration-700 group-hover:scale-[1.02] cursor-pointer object-cover ${
              activeModel === 'ameca' ? 'object-[center_12%]' : 'object-[center_15%]'
            }`}
            onClick={onTogglePlay}
          />
          {/* Subtle Studio Lighting Sheen & Edge Blend Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-white/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 pointer-events-none" />
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. FLOATING PROMPT BADGE: "What is Spheno Voice AI?"       */}
      {/* ========================================================= */}
      <div className="absolute top-5 right-5 sm:right-6 max-w-[240px] sm:max-w-[270px] z-20">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:border-sky-300 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0018C5] to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
            What is Spheno Voice AI?
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. FLOATING SPHENO VOICE AGENT STATUS BADGE               */}
      {/* ========================================================= */}
      <div className="absolute top-5 left-5 sm:left-6 max-w-[270px] sm:max-w-[310px] z-20">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
            <div className="flex items-center gap-1.5 text-[#0018C5] font-bold uppercase tracking-wider">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-cyan-500 animate-ping' : 'bg-[#0284C7] animate-pulse'}`} />
              <span>SPHENO VOICE AGENT</span>
            </div>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">380ms</span>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-700 leading-snug font-medium">
            &quot;I can book Dr. Bennett for you at 3:15 PM.&quot;
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-sky-600 font-semibold">
            <Sparkles className="w-3 h-3 text-sky-500" />
            <span>Autonomous human inflection</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. "TRY VOICE BOT" ACTION BUTTON & ROBOT SWITCHER         */}
      {/* ========================================================= */}
      <div className="absolute top-18 right-5 sm:right-6 z-20 flex flex-col items-end gap-2">
        <button
          onClick={onTogglePlay}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] border border-cyan-400 text-xs font-bold text-white shadow-[0_4px_16px_rgba(0,180,240,0.3)] hover:shadow-[0_4px_22px_rgba(0,180,240,0.5)] transition-all cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-cyan-400" />
              <span>Voice Active</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Try Voice Bot</span>
            </>
          )}
        </button>

        {/* Humanoid Robot Model Switcher */}
        <div className="flex items-center bg-white/95 rounded-full p-0.5 border border-slate-200/90 shadow-xs">
          <button
            onClick={() => setActiveModel('ameca')}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
              activeModel === 'ameca'
                ? 'bg-[#0018C5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ameca Bot
          </button>
          <button
            onClick={() => setActiveModel('sophia')}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
              activeModel === 'sophia'
                ? 'bg-[#0018C5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sophia Bot
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. BOTTOM AUDIO WAVEFORM FREQUENCY STREAM                 */}
      {/* ========================================================= */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] sm:w-[72%] max-w-[440px] z-20">
        <div className="px-4 py-2.5 rounded-full bg-white/95 border border-slate-200/90 flex items-center justify-between gap-3 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
          
          {/* Animated Frequency Bars */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-1 justify-center h-6">
            {[14, 24, 18, 30, 38, 20, 26, 34, 42, 22, 28, 36, 20, 30, 40, 24, 16, 28, 34, 20, 12, 24, 32, 18].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-[opacity,background-color] duration-150 ${isPlaying ? 'animate-voice-bar' : ''}`}
                style={{
                  height: isPlaying ? `${h}%` : `${h * 0.55}%`,
                  backgroundColor: i % 2 === 0 ? '#0284C7' : '#0018C5',
                  opacity: isPlaying ? 0.95 : 0.65,
                  animationDelay: `${-(i * 0.08)}s`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-sky-700 uppercase tracking-widest shrink-0">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-sky-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>LIVE AUDIO</span>
          </div>

        </div>
      </div>

    </div>
  );
};
