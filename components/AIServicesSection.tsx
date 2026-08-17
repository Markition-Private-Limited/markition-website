"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface Service {
  id: string;
  number: string;
  label: string;
  icon: string;
  iconSrc?: string;
  description: string;
  features: [string, string, string, string];
  cta: string;
}

const SERVICES: Service[] = [
  {
    id: "ai-agents",
    number: "01",
    label: "AI Agents",
    icon: "🤖",
    iconSrc: "/ai-agent.svg",
    description:
      "Custom multi-agent workflows engineered to research leads, synthesise operational reports, triage incoming tickets, and automate cross-platform decisions with high precision.",
    features: [
      "Multi-step decision logic trees",
      "API & Database tool integrations",
      "Self-correcting error handling",
      "Human-in-the-loop review guardrails",
    ],
    cta: "Deploy AI Agents",
  },
  {
    id: "ai-chatbots",
    number: "02",
    label: "AI Chatbots",
    icon: "💬",
    description:
      "Trained using custom RAG (Retrieval-Augmented Generation) pipelines to accurately answer complex customer queries, schedule appointments, and process instant sales transactions.",
    features: [
      "RAG Vector database search",
      "Multi-lingual natural dialogue",
      "Live human agent handoff",
      "Omnichannel deployment (Web, WhatsApp, Slack)",
    ],
    cta: "Deploy AI Chatbots",
  },
  {
    id: "workflow-automation",
    number: "03",
    label: "Workflow Automation",
    icon: "⚡",
    description:
      "Seamlessly link your marketing CRM, payment gateways, ERPs, and customer support channels with high-throughput serverless event pipelines.",
    features: [
      "Custom webhook triggers",
      "Sub-second data synchronization",
      "Audit logs & retry queues",
      "Zero-latency database updates",
    ],
    cta: "Automate Workflows",
  },
  {
    id: "voice-ai",
    number: "04",
    label: "Voice AI",
    icon: "🎙️",
    description:
      "Human-like AI voice agents that handle inbound calls, qualify prospects, book appointments, and follow up with leads — freeing your team for high-value conversations.",
    features: [
      "Real-time speech recognition",
      "Dynamic conversation scripting",
      "Calendar & CRM integration",
      "Sentiment analysis & routing",
    ],
    cta: "Deploy Voice AI",
  },
  {
    id: "crm-automation",
    number: "05",
    label: "CRM Automation",
    icon: "📊",
    description:
      "Intelligent CRM workflows that score leads, automate follow-ups, update records in real time, and surface actionable insights so your team closes deals faster.",
    features: [
      "AI-powered lead scoring",
      "Automated follow-up sequences",
      "Real-time record enrichment",
      "Pipeline stage triggers",
    ],
    cta: "Automate Your CRM",
  },
];

// Inline SVGs replacing lucide-react icons from source repo
function IconActivity({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function IconZap({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconSend({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
}

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    sender: "bot",
    text: "Hello! I am Markition Growth Assistant. How can I assist with your AI & marketing strategy today?",
  },
  {
    sender: "user",
    text: "Can you show me how AI agents automate lead qualification?",
  },
];

export default function AIServicesSection() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  // Chatbot demo state (sourced from AICapabilities.tsx in external repo)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `I analyzed your query regarding "${userText}". Markition AI Agents connect directly to your CRM, evaluate lead intent signals, and assign a conversion score in under 300ms!`,
        },
      ]);
    }, 1200);
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6" style={{ background: "#000028" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 sm:gap-10 lg:gap-14 items-start">

        {/* ── Left column — list ───────────────────────────────────────── */}
        <div style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)", position: "relative", zIndex: 0, overflow: "hidden" }}>

          <ScrollReveal delay={80} threshold={0.2}>
            <h2
              className="font-bold leading-tight mb-3 sm:mb-4 text-[26px] sm:text-[32px] lg:text-[38px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Put AI To Work Across<br />
              Your <span style={{ color: "#0040FF" }}>Business</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160} threshold={0.2}>
            <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-sm">
              Autonomous systems, conversational agents, and intelligent workflows
              engineered for enterprise scale and measurable business impact.
            </p>
          </ScrollReveal>

          <div className="flex flex-col">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="relative flex items-center gap-3 sm:gap-4 text-left px-3 sm:px-4 py-3 sm:py-4 overflow-hidden border-b border-white/[0.08] w-full"
              >
                {/* Animated gradient background — mounts fresh on each activation */}
                {active === i && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(255,255,255,0.04) 0%, transparent 75%)",
                      animation: "tab-bg-in 0.25s ease forwards",
                    }}
                  />
                )}

                <span
                  className="relative font-bold tabular-nums w-6 flex-shrink-0 transition-colors duration-300 text-[20px] sm:text-[24px] lg:text-[28px]"
                  style={{
                    color: active === i ? "#ffffff" : "rgba(255,255,255,0.32)",
                  }}
                >
                  {s.number}
                </span>

                <span
                  className="relative font-medium transition-colors duration-300 ml-2 sm:ml-4 text-[20px] sm:text-[24px] lg:text-[28px]"
                  style={{
                    color: active === i ? "#ffffff" : "rgba(255,255,255,0.32)",
                  }}
                >
                  {s.label}
                </span>

                {/* Full-width glow line — expands from centre on activation */}
                {active === i && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      boxShadow: "0 0 10px 3px rgba(255,255,255,0.3)",
                      animation: "tab-glow-expand 0.35s ease forwards",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right column — service detail card ──────────────────────── */}
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
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "65%",
              pointerEvents: "none",
              zIndex: 0,
            }}
            viewBox="0 0 600 380"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="neon-glow-a" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" result="b1"/>
                <feGaussianBlur stdDeviation="2.5" result="b2"/>
                <feMerge>
                  <feMergeNode in="b1"/>
                  <feMergeNode in="b2"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="neon-glow-b" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="b"/>
                <feMerge>
                  <feMergeNode in="b"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
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

            {/* Purple tubes — kept well above the bottom edge (max y ≈ 330) */}
            <path d="M -40,330 C 60,278 170,238 285,202 C 390,168 490,152 630,138" stroke="url(#tg1)" strokeWidth="3" fill="none" filter="url(#neon-glow-a)" opacity="0.88"/>
            <path d="M -70,308 C 45,260 160,222 275,188 C 385,156 495,142 640,130" stroke="#A855F7" strokeWidth="1.5" fill="none" filter="url(#neon-glow-b)" opacity="0.52"/>

            {/* Blue tubes */}
            <path d="M 10,345 C 120,298 230,260 355,224 C 460,192 555,176 660,162" stroke="url(#tg2)" strokeWidth="2.5" fill="none" filter="url(#neon-glow-a)" opacity="0.82"/>
            <path d="M -25,318 C 95,272 210,236 325,202 C 425,172 525,158 655,145" stroke="#60A5FA" strokeWidth="1" fill="none" filter="url(#neon-glow-b)" opacity="0.42"/>

            {/* Pink accent tube */}
            <path d="M -90,338 C 20,312 130,288 245,258 C 355,228 455,212 580,200" stroke="url(#tg3)" strokeWidth="2" fill="none" filter="url(#neon-glow-a)" opacity="0.72"/>

            {/* Ultra-thin accent traces */}
            <path d="M 40,352 C 150,314 260,278 380,244 C 480,212 575,196 675,182" stroke="#C084FC" strokeWidth="0.8" fill="none" opacity="0.32"/>
            <path d="M -50,325 C 65,285 180,250 300,218 C 400,188 500,174 630,162" stroke="#818CF8" strokeWidth="0.8" fill="none" opacity="0.28"/>
          </svg>

          {/* Card header */}
          <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4" style={{ position: "relative", zIndex: 1 }}>
            <div className="flex items-center gap-3 mb-3">
              {svc.iconSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={svc.iconSrc} alt="" aria-hidden="true" className="w-8 h-8 flex-shrink-0" />
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

          {/* ── Interactive demo panel ── */}
          <div
            className="mx-5 sm:mx-7 rounded-xl overflow-hidden"
            style={{
              background: "rgba(0, 4, 28, 0.75)",
              border: "1px solid rgba(255,255,255,0.07)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div className="p-3 sm:p-4 flex flex-col gap-2.5" style={{ minHeight: "210px" }}>

              {/* Chrome bar */}
              <div
                className="flex items-center justify-between pb-3 mb-1"
                style={{ borderBottom: "1px solid rgba(51,65,85,0.8)" }}
              >
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

              {/* DEMO 01: AI AGENTS — timeline */}
              {svc.id === "ai-agents" && (
                <div className="space-y-2">
                  {/* Agent Goal row */}
                  <div
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(15,25,70,0.55)", border: "1px solid rgba(80,130,255,0.18)" }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(30,60,180,0.4)", border: "1px solid rgba(80,130,255,0.35)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#60a5fa" }}>Agent Goal</div>
                      <div className="text-[11px] leading-snug" style={{ color: "rgba(203,213,225,0.9)" }}>
                        Analyze inbound enterprise lead &amp; formulate personalized response strategy
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right ml-2 pt-0.5">
                      <div className="text-[9px] mb-1" style={{ color: "rgba(100,116,139,1)" }}>Status</div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: "#34d399" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
                        In Progress
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  {([
                    { step: "Step 1", title: "RAG Knowledge Base Query",                  desc: "Searching relevant information from knowledge base",   status: "completed",  time: "12ms"  },
                    { step: "Step 2", title: "CRM Lead Intent Scoring (Gemini 1.5 Pro)",   desc: "Analyzing lead intent and scoring potential",           status: "completed",  time: "842ms" },
                    { step: "Step 3", title: "Auto-Schedule Executive Consultation Call",   desc: "Scheduling and confirming consultation call",           status: "processing", time: "1.2s"  },
                    { step: "Step 4", title: "Generate Personalized Strategy & Response",   desc: "Crafting tailored response and next steps",            status: "pending",    time: null    },
                  ] as const).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-2.5 rounded-xl"
                      style={{ background: "rgba(10,18,50,0.5)", border: "1px solid rgba(51,65,85,0.5)" }}
                    >
                      {/* Step icon */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: item.status === "processing" ? "rgba(8,51,68,0.7)" : "rgba(20,30,70,0.5)",
                          border: `1px solid ${item.status === "completed" ? "rgba(52,211,153,0.35)" : item.status === "processing" ? "rgba(34,211,238,0.4)" : "rgba(51,65,85,0.5)"}`,
                        }}
                      >
                        {item.status === "completed" && (
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="8" cy="8" r="8" fill="rgba(52,211,153,0.25)"/>
                            <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {item.status === "processing" && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="animate-spin" style={{ animationDuration: "1.4s" }}>
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeOpacity="0.4"/>
                            <path d="M12 2v4" stroke="#22d3ee"/>
                          </svg>
                        )}
                        {item.status === "pending" && (
                          <span className="w-3 h-3 rounded-full border border-slate-500/60 flex-shrink-0" />
                        )}
                      </div>

                      {/* Step text */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "rgba(100,116,139,1)" }}>{item.step}</div>
                        <div className="text-[11px] font-medium leading-snug" style={{ color: item.status === "pending" ? "rgba(100,116,139,0.8)" : "#e2e8f0" }}>{item.title}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: "rgba(100,116,139,0.7)" }}>{item.desc}</div>
                      </div>

                      {/* Status badge */}
                      <div className="flex-shrink-0 text-right ml-1 pt-0.5">
                        {item.status === "completed" && (
                          <>
                            <div className="flex items-center gap-1 justify-end text-[11px] font-semibold" style={{ color: "#34d399" }}>
                              Completed
                            </div>
                            <div className="flex items-center gap-1 justify-end mt-0.5 text-[10px]" style={{ color: "rgba(100,116,139,1)" }}>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {item.time}
                            </div>
                          </>
                        )}
                        {item.status === "processing" && (
                          <>
                            <div className="flex items-center gap-1 justify-end text-[11px] font-semibold" style={{ color: "#22d3ee" }}>
                              Processing...
                            </div>
                            <div className="flex items-center gap-1 justify-end mt-0.5 text-[10px]" style={{ color: "rgba(100,116,139,1)" }}>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {item.time}
                            </div>
                          </>
                        )}
                        {item.status === "pending" && (
                          <div className="text-[11px]" style={{ color: "rgba(100,116,139,0.7)" }}>Pending</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* DEMO 02: AI CHATBOTS — interactive live chat */}
              {svc.id === "ai-chatbots" && (
                <div className="flex flex-col justify-between flex-1 gap-3">
                  <div
                    className="space-y-2 overflow-y-auto pr-1"
                    style={{ maxHeight: "180px" }}
                  >
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className="max-w-[80%] p-2.5 rounded-xl text-xs leading-relaxed"
                          style={
                            msg.sender === "user"
                              ? {
                                  background: "#2563eb",
                                  color: "#ffffff",
                                  borderBottomRightRadius: "2px",
                                }
                              : {
                                  background: "rgba(15,23,42,1)",
                                  color: "#e2e8f0",
                                  border: "1px solid rgba(51,65,85,0.8)",
                                  borderBottomLeftRadius: "2px",
                                }
                          }
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isBotTyping && (
                      <div
                        className="flex items-center gap-1 text-xs p-2"
                        style={{ color: "#94a3b8" }}
                      >
                        <span style={{ color: "#60a5fa" }}>🤖</span>
                        <span>Markition Bot is typing...</span>
                      </div>
                    )}
                  </div>

                  <form
                    onSubmit={handleSendMessage}
                    className="flex gap-2 pt-2"
                    style={{ borderTop: "1px solid rgba(51,65,85,0.8)" }}
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Try typing a question to the live bot..."
                      className="flex-1 px-3 py-2 text-xs text-white rounded-lg focus:outline-none"
                      style={{
                        background: "rgba(15,23,42,1)",
                        border: "1px solid rgba(51,65,85,0.8)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(51,65,85,0.8)")}
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      style={{ background: "#2563eb" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#3b82f6")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#2563eb")}
                    >
                      <IconSend />
                    </button>
                  </form>
                </div>
              )}

              {/* DEMO 03: WORKFLOW AUTOMATION — pipeline graph */}
              {svc.id === "workflow-automation" && (
                <div className="space-y-3">
                  <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>
                    Event Trigger: Inbound Lead Webhook Received
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div
                      className="p-2.5 rounded-xl text-xs"
                      style={{
                        background: "rgba(15,23,42,1)",
                        border: "1px solid rgba(51,65,85,0.8)",
                      }}
                    >
                      <div className="text-[10px]" style={{ color: "#94a3b8" }}>INBOUND WEBHOOK</div>
                      <div className="font-bold mt-1" style={{ color: "#ffffff" }}>Form Submit</div>
                    </div>
                    <div
                      className="p-2.5 rounded-xl text-xs"
                      style={{
                        background: "rgba(23,37,84,0.6)",
                        border: "1px solid rgba(59,130,246,0.4)",
                      }}
                    >
                      <div className="text-[10px]" style={{ color: "#60a5fa" }}>AI NODE</div>
                      <div className="font-bold mt-1" style={{ color: "#93c5fd" }}>Parse JSON &amp; Intent</div>
                    </div>
                    <div
                      className="p-2.5 rounded-xl text-xs"
                      style={{
                        background: "rgba(15,23,42,1)",
                        border: "1px solid rgba(51,65,85,0.8)",
                      }}
                    >
                      <div className="text-[10px]" style={{ color: "#94a3b8" }}>SYNC PIPELINE</div>
                      <div className="font-bold mt-1" style={{ color: "#22d3ee" }}>HubSpot &amp; Slack</div>
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-lg font-mono text-[11px]"
                    style={{
                      background: "rgba(15,23,42,0.6)",
                      border: "1px solid rgba(51,65,85,0.8)",
                      color: "#cbd5e1",
                    }}
                  >
                    <div>{"{"}</div>
                    <div className="pl-4" style={{ color: "#22d3ee" }}>&quot;status&quot;: &quot;success&quot;,</div>
                    <div className="pl-4" style={{ color: "#34d399" }}>&quot;latency_ms&quot;: 142,</div>
                    <div className="pl-4" style={{ color: "#fbbf24" }}>
                      &quot;actions_triggered&quot;: [&quot;slack_notify&quot;, &quot;crm_deal_create&quot;]
                    </div>
                    <div>{"}"}</div>
                  </div>
                </div>
              )}

              {/* DEMO 04: VOICE AI — waveform */}
              {svc.id === "voice-ai" && (
                <div className="space-y-4 text-center py-2">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono"
                    style={{
                      background: "rgba(8,51,68,0.8)",
                      color: "#22d3ee",
                      border: "1px solid rgba(21,94,117,0.8)",
                    }}
                  >
                    🎙️{" "}
                    <span className="animate-pulse">
                      Voice Synthesis Active (Latency: 380ms)
                    </span>
                  </div>

                  {/* Animated waveform bars */}
                  <div className="flex items-center justify-center gap-1" style={{ height: "56px" }}>
                    {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70, 85, 40].map((height, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 rounded-full animate-pulse"
                        style={{
                          height: `${height}%`,
                          background: "linear-gradient(to top, #2563eb, #22d3ee)",
                          animationDelay: `${idx * 80}ms`,
                        }}
                      />
                    ))}
                  </div>

                  <div
                    className="p-3 rounded-xl text-xs"
                    style={{
                      background: "rgba(15,23,42,0.8)",
                      border: "1px solid rgba(51,65,85,0.8)",
                      color: "#cbd5e1",
                    }}
                  >
                    &ldquo;Hello, this is Markition Voice AI calling regarding your recent growth audit request.
                    May I confirm a time for our lead strategy call tomorrow?&rdquo;
                  </div>
                </div>
              )}

              {/* DEMO 05: CRM AUTOMATION — lead scoring matrix */}
              {svc.id === "crm-automation" && (
                <div className="space-y-2.5">
                  <div className="text-xs font-bold mb-1" style={{ color: "#cbd5e1" }}>
                    Real-Time Lead Scoring Matrix
                  </div>

                  {[
                    { name: "Enterprise SaaS Buyer", company: "Apex Global",      score: "98/100", status: "Hot Deal",     color: "#34d399" },
                    { name: "Fintech Director",       company: "Sterling Capital", score: "91/100", status: "High Intent",  color: "#22d3ee" },
                    { name: "E-commerce Founder",     company: "Vertex Stores",   score: "84/100", status: "Nurture Loop", color: "#60a5fa" },
                  ].map((lead, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl flex items-center justify-between text-xs"
                      style={{
                        background: "rgba(15,23,42,1)",
                        border: "1px solid rgba(51,65,85,0.8)",
                      }}
                    >
                      <div>
                        <div className="font-bold" style={{ color: "#ffffff" }}>{lead.name}</div>
                        <div className="text-[11px]" style={{ color: "#64748b" }}>{lead.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold" style={{ color: lead.color }}>{lead.score}</div>
                        <div className="text-[10px]" style={{ color: "#64748b" }}>{lead.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA button — left-aligned */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1" style={{ position: "relative", zIndex: 1 }}>
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold py-2.5 px-6 rounded-lg text-white transition-opacity hover:opacity-90 active:opacity-80"
                style={{ background: "#0137D7" }}
              >
                {svc.cta} →
              </button>
            </div>
          </div>

          </div>{/* end glassmorphism card */}
        </div>
      </div>
    </section>
  );
}
