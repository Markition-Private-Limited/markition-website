"use client";

import { useState } from "react";

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
    <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "#000028" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-start">

        {/* ── Left column — list (unchanged) ──────────────────────────── */}
        <div style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)", position: "relative", zIndex: 0, overflow: "hidden" }}>
          <h2
            className="font-bold leading-tight mb-4"
            style={{ fontSize: "38px" }}
          >
            Put AI To Work Across<br />
            Your <span style={{ color: "#0040FF" }}>Business</span>
          </h2>

          <p className="text-sm text-white leading-relaxed mb-8 max-w-sm">
            Autonomous systems, conversational agents, and intelligent workflows
            engineered for enterprise scale and measurable business impact.
          </p>

          <div className="flex flex-col">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="relative flex items-center gap-4 text-left px-4 py-4 overflow-hidden border-b border-white/[0.08] w-full"
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
                  className="relative text-xs font-bold tabular-nums w-6 flex-shrink-0 transition-colors duration-300"
                  style={{
                    color: active === i ? "#ffffff" : "rgba(255,255,255,0.32)",
                    fontSize: "28px",
                  }}
                >
                  {s.number}
                </span>

                <span
                  className="relative text-sm font-medium transition-colors duration-300 ml-4"
                  style={{
                    color: active === i ? "#ffffff" : "rgba(255,255,255,0.32)",
                    fontSize: "28px",
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

          {/* Card header */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5">
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
            <p className="text-sm text-white leading-relaxed">{svc.description}</p>
          </div>

          {/* Features 2×2 grid */}
          <div className="px-6 sm:px-8 pb-5 grid grid-cols-2 gap-2.5">
            {svc.features.map((feature) => (
              <div
                key={feature}
                className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-white/[0.12] cursor-default transition-all duration-200 hover:border-white/30 hover:bg-white/[0.04]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="8" fill="#FAAE10" />
                  <path
                    d="M5 8.5L7 10.5L11 6"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[11px] sm:text-xs text-white leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* ── Interactive demo panel (sourced from AICapabilities.tsx in external repo) ── */}
          <div
            className="mx-6 sm:mx-8 mb-6 sm:mb-8 rounded-xl overflow-hidden"
            style={{
              background: "rgba(0,2,24,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="p-4 sm:p-5 flex flex-col gap-3"
              style={{ minHeight: "260px" }}
            >
              {/* Browser / App Chrome Bar */}
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
                  style={{
                    background: "rgba(6,78,59,0.4)",
                    color: "#34d399",
                    border: "1px solid rgba(6,78,59,0.8)",
                  }}
                >
                  <IconActivity className="animate-pulse" />
                  LIVE ENGINE
                </span>
              </div>

              {/* DEMO 01: AI AGENTS — multi-step task trace */}
              {svc.id === "ai-agents" && (
                <div className="space-y-3">
                  <div
                    className="p-3 rounded-lg text-xs font-mono"
                    style={{
                      background: "rgba(15,23,42,0.9)",
                      border: "1px solid rgba(51,65,85,0.8)",
                    }}
                  >
                    <div className="font-bold mb-1" style={{ color: "#60a5fa" }}>
                      [Agent Multi-Step Task Triggered]
                    </div>
                    <div style={{ color: "#cbd5e1" }}>
                      Goal: Analyze inbound enterprise lead &amp; formulate personalized response strategy
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div
                      className="p-3 rounded-lg flex items-center justify-between"
                      style={{
                        background: "rgba(15,23,42,0.5)",
                        border: "1px solid rgba(51,65,85,0.8)",
                      }}
                    >
                      <span style={{ color: "#cbd5e1" }}>Step 1: RAG Knowledge Base Query</span>
                      <span className="font-bold" style={{ color: "#34d399" }}>✓ Executed (12ms)</span>
                    </div>

                    <div
                      className="p-3 rounded-lg flex items-center justify-between"
                      style={{
                        background: "rgba(15,23,42,0.5)",
                        border: "1px solid rgba(51,65,85,0.8)",
                      }}
                    >
                      <span style={{ color: "#cbd5e1" }}>Step 2: CRM Lead Intent Scoring (Gemini 1.5 Pro)</span>
                      <span className="font-bold" style={{ color: "#34d399" }}>✓ Score 96/100</span>
                    </div>

                    <div
                      className="p-3 rounded-lg flex items-center justify-between"
                      style={{
                        background: "rgba(23,37,84,0.3)",
                        border: "1px solid rgba(59,130,246,0.4)",
                      }}
                    >
                      <span className="font-bold" style={{ color: "#93c5fd" }}>
                        Step 3: Auto-Schedule Executive Consultation Call
                      </span>
                      <span
                        className="font-bold flex items-center gap-1"
                        style={{ color: "#22d3ee" }}
                      >
                        <IconZap className="animate-bounce" /> Processing...
                      </span>
                    </div>
                  </div>
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

            {/* CTA button — tied to active service */}
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
              <button
                className="w-full text-center text-sm font-medium py-2.5 px-4 rounded-lg text-white transition-opacity hover:opacity-90 active:opacity-80"
                style={{ background: "#0137D7" }}
              >
                {svc.cta} →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
