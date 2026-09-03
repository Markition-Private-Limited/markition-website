import Image from "next/image";
import { IconActivity } from "@/lib/icons";
import AgentDemo from "./demos/AgentDemo";
import ChatbotDemo from "./demos/ChatbotDemo";
import WorkflowDemo from "./demos/WorkflowDemo";
import VoiceAIDemo from "./demos/VoiceAIDemo";
import CRMDemo from "./demos/CRMDemo";
import type { Service } from "@/lib/types";

interface Props {
  svc: Service;
}

export default function ServiceCard({ svc }: Props) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(3, 7, 30, 0.88)",
          border: "1px solid rgba(80, 120, 255, 0.22)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          position: "relative",
        }}
      >
        {/* Neon tube decorative background */}
        <svg
          aria-hidden="true"
          overflow="hidden"
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "65%", pointerEvents: "none", zIndex: 0 }}
          viewBox="0 0 600 380"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="neon-glow-a" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="b1"/>
              <feGaussianBlur stdDeviation="2.5" result="b2"/>
              <feMerge><feMergeNode in="b1"/><feMergeNode in="b2"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="neon-glow-b" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="tg1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0"/>
              <stop offset="25%" stopColor="#8B5CF6" stopOpacity="0.9"/>
              <stop offset="70%" stopColor="#A855F7" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.25"/>
            </linearGradient>
            <linearGradient id="tg2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0"/>
              <stop offset="35%" stopColor="#3B82F6" stopOpacity="0.85"/>
              <stop offset="75%" stopColor="#7C3AED" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.15"/>
            </linearGradient>
            <linearGradient id="tg3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0"/>
              <stop offset="45%" stopColor="#DB2777" stopOpacity="0.75"/>
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <path d="M -40,330 C 60,278 170,238 285,202 C 390,168 490,152 630,138" stroke="url(#tg1)" strokeWidth="3" fill="none" filter="url(#neon-glow-a)" opacity="0.88"/>
          <path d="M -70,308 C 45,260 160,222 275,188 C 385,156 495,142 640,130" stroke="#A855F7" strokeWidth="1.5" fill="none" filter="url(#neon-glow-b)" opacity="0.52"/>
          <path d="M 10,345 C 120,298 230,260 355,224 C 460,192 555,176 660,162" stroke="url(#tg2)" strokeWidth="2.5" fill="none" filter="url(#neon-glow-a)" opacity="0.82"/>
          <path d="M -25,318 C 95,272 210,236 325,202 C 425,172 525,158 655,145" stroke="#60A5FA" strokeWidth="1" fill="none" filter="url(#neon-glow-b)" opacity="0.42"/>
          <path d="M -90,338 C 20,312 130,288 245,258 C 355,228 455,212 580,200" stroke="url(#tg3)" strokeWidth="2" fill="none" filter="url(#neon-glow-a)" opacity="0.72"/>
          <path d="M 40,352 C 150,314 260,278 380,244 C 480,212 575,196 675,182" stroke="#C084FC" strokeWidth="0.8" fill="none" opacity="0.32"/>
          <path d="M -50,325 C 65,285 180,250 300,218 C 400,188 500,174 630,162" stroke="#818CF8" strokeWidth="0.8" fill="none" opacity="0.28"/>
        </svg>

        {/* Card header */}
        <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4" style={{ position: "relative", zIndex: 1 }}>
          <div className="flex items-center gap-3 mb-3">
            {svc.iconSrc ? (
              <Image src={svc.iconSrc} alt="" aria-hidden={true} width={32} height={32} className="w-8 h-8 flex-shrink-0" />
            ) : (
              <span className="text-2xl leading-none">{svc.icon}</span>
            )}
            <h3
              className="text-base sm:text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)" }}
            >
              {svc.label}
            </h3>
          </div>
          <p className="text-sm text-white/75 leading-relaxed">{svc.description}</p>
        </div>

        {/* Features 2×2 grid */}
        <div className="px-5 sm:px-7 pb-4 grid grid-cols-2 gap-2" style={{ position: "relative", zIndex: 1 }}>
          {svc.features.map((feature) => (
            <div
              key={feature}
              className="group flex items-center gap-2.5 px-3 py-3 rounded-lg border border-white/[0.12] cursor-default transition-all duration-200 hover:border-white/30 hover:bg-white/[0.04]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" aria-hidden="true">
                <circle cx="8" cy="8" r="8" fill="#FAAE10" />
                <path d="M5 8.5L7 10.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[11.5px] text-white leading-snug">{feature}</span>
            </div>
          ))}
        </div>

        {/* Interactive demo panel */}
        <div
          className="mx-5 sm:mx-7 rounded-xl overflow-hidden"
          style={{ background: "rgba(0, 4, 28, 0.75)", border: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 1 }}
        >
          <div className="p-3 sm:p-4 flex flex-col gap-2.5" style={{ minHeight: "210px" }}>
            {/* Chrome bar */}
            <div className="flex items-center justify-between pb-3 mb-1" style={{ borderBottom: "1px solid rgba(51,65,85,0.8)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.8)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(245,158,11,0.8)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(16,185,129,0.8)" }} />
                <span className="ml-2 font-mono text-[10px]" style={{ color: "rgba(100,116,139,1)" }}>
                  markition-ai-engine://v2.4/{svc.id}
                </span>
              </div>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono"
                style={{ background: "rgba(6,78,59,0.4)", color: "#34d399", border: "1px solid rgba(6,78,59,0.8)" }}
              >
                <IconActivity className="animate-pulse" />
                LIVE ENGINE
              </span>
            </div>

            {svc.id === "ai-agents"          && <AgentDemo serviceId={svc.id} />}
            {svc.id === "ai-chatbots"         && <ChatbotDemo />}
            {svc.id === "workflow-automation" && <WorkflowDemo />}
            {svc.id === "voice-ai"            && <VoiceAIDemo />}
            {svc.id === "crm-automation"      && <CRMDemo />}
          </div>

          {/* CTA button */}
          <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1" style={{ position: "relative", zIndex: 1 }}>
            <button
              className="inline-flex items-center gap-2 text-sm font-semibold py-2.5 px-6 rounded-lg text-white transition-opacity hover:opacity-90 active:opacity-80"
              style={{ background: "#0137D7" }}
            >
              {svc.cta} →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
