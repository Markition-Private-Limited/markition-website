"use client";

import { useState } from "react";

const TABS = [
  "AI MODELS",
  "FRAMEWORKS",
  "AI INFRASTRUCTURE",
  "AI DEPLOYMENT",
  "CLOUDS",
  "DATA",
  "DEVOPS",
];

/* ─── Data ───────────────────────────────────────────────────────────────── */
interface TechItem {
  name: string;
  src: string;
}

const TECH_CONTENT: Record<string, TechItem[]> = {
  "AI MODELS": [
    { name: "Claude",           src: "/ai-models-logo/Claude.png" },
    { name: "OpenAI GPT-5",     src: "/ai-models-logo/OpenAI GPT-5.png" },
    { name: "Gemini 3",         src: "/ai-models-logo/Gemini 3.png" },
    { name: "Llama 4",          src: "/ai-models-logo/Llama 4.png" },
    { name: "Mistral",          src: "/ai-models-logo/Mistral.png" },
    { name: "DeepSeek",         src: "/ai-models-logo/DeepSeek.png" },
    { name: "Stable Diffusion", src: "/ai-models-logo/Stable Diffusion.png" },
    { name: "AlphaFold",        src: "/ai-models-logo/Alphafold.png" },
  ],
  "AI INFRASTRUCTURE": [
    { name: "CrewAI",     src: "/AI-infrastructures-logo/crewai-color.png" },
    { name: "Weaviate",   src: "/AI-infrastructures-logo/weaviate.png" },
    { name: "LangSmith",  src: "/AI-infrastructures-logo/langsmith-color.png" },
    { name: "LangGraph",  src: "/AI-infrastructures-logo/langgraph-color.png" },
    { name: "MCP",        src: "/AI-infrastructures-logo/mcp.png" },
  ],
  "FRAMEWORKS": [
    { name: "TensorFlow",   src: "/frameworks-logo/tensorflow.png" },
    { name: "Hugging Face", src: "/frameworks-logo/huggingface.png" },
    { name: "LangChain",    src: "/frameworks-logo/langchain_icon.png" },
    { name: "Next.js",      src: "/frameworks-logo/next_js.png" },
    { name: "Vuetify",      src: "/frameworks-logo/vuetify_js.png" },
    { name: "Angular",      src: "/frameworks-logo/angular.png" },
    { name: "Node.js",      src: "/frameworks-logo/node_js.png" },
    { name: "Django",       src: "/frameworks-logo/django.png" },
    { name: "FastAPI",      src: "/frameworks-logo/fastapi.png" },
  ],
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Technologies() {
  const [activeTab, setActiveTab] = useState("AI MODELS");

  const items = TECH_CONTENT[activeTab] ?? [];

  return (
    <section style={{ background: "#000028", position: "relative" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 16px 72px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            marginBottom: 48,
          }}
        >
          Technologies{" "}
          <span style={{ color: "#22C5F5" }}>we use</span>
        </h2>

        {/* Pill tab bar */}
        <div
          className="tech-pill-bar"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "5px 6px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {TABS.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={active ? "tech-tab tech-tab-active" : "tech-tab"}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  background: active
                    ? "linear-gradient(135deg, #1A47CC 0%, #2F8BFF 100%)"
                    : "transparent",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.45)",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ── Logo grid ── */}
        {items.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "40px 0",
              maxWidth: 900,
              margin: "56px auto 0",
            }}
          >
            {items.map((item) => (
              <div
                key={item.name}
                className="tech-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                  cursor: "default",
                }}
              >
                <div className="tech-icon" style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.name}
                    draggable={false}
                    style={{ width: 64, height: 64, objectFit: "contain", display: "block" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.82)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Coming soon for tabs with no content yet */}
        {items.length === 0 && (
          <p style={{ marginTop: 56, color: "rgba(255,255,255,0.25)", fontSize: 14, fontFamily: "var(--font-jakarta, sans-serif)" }}>
            Coming soon
          </p>
        )}
      </div>

      <style>{`
        .tech-item { transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1); }
        .tech-item:hover { transform: translateY(-6px); }
        .tech-icon { transition: filter 0.28s ease; }
        .tech-item:hover .tech-icon { filter: drop-shadow(0 6px 14px rgba(100,180,255,0.35)); }

        .tech-tab {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .tech-tab:hover {
          transform: translateY(-2px);
          color: rgba(255,255,255,0.9) !important;
          background: rgba(255,255,255,0.1);
        }
        .tech-tab:active {
          transform: translateY(0) scale(0.95);
        }
        .tech-tab-active {
          box-shadow: 0 4px 18px rgba(47,139,255,0.5), inset 0 1px 0 rgba(255,255,255,0.25);
          animation: tabPop 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .tech-tab-active:hover {
          transform: translateY(-2px) scale(1.02);
          background: linear-gradient(135deg, #1A47CC 0%, #2F8BFF 100%) !important;
        }
        .tech-tab-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: tabShine 2.6s ease-in-out infinite;
        }
        @keyframes tabPop {
          0%   { transform: scale(0.9); }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes tabShine {
          0%   { left: -60%; }
          100% { left: 130%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-tab-active::after { animation: none; }
          .tech-tab-active { animation: none; }
        }
      `}</style>
    </section>
  );
}
