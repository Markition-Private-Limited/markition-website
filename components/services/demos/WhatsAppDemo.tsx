"use client";

import { useState } from "react";

const MESSAGES = [
  { from: "them", text: "Hi! I got your demo email — interesting. We use Twilio Flex right now." },
  { from: "me",   text: "Awesome. Want to hop on a quick WhatsApp call to walk through it?" },
  { from: "them", text: "Yeah let's do it." },
  { from: "me",   text: "Calling now." },
];

export default function WhatsAppDemo() {
  const [callAccepted, setCallAccepted] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 h-full">
      {/* Left — incoming call */}
      <div
        className="flex-shrink-0 sm:w-[42%] rounded-2xl p-4 flex flex-col gap-4"
        style={{ background: "rgba(6,20,50,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Avatar + info */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(22,163,74,0.3)", border: "2px solid rgba(22,163,74,0.6)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.17 1.18 2 2 0 012.14 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.14 6.14l1.27-.82a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.42z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-semibold leading-tight">WhatsApp call · incoming</span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: "rgba(22,163,74,0.25)", color: "#4ade80", border: "1px solid rgba(22,163,74,0.4)" }}
              >
                WA
              </span>
            </div>
            <div className="text-[12px] mt-0.5" style={{ color: "#94a3b8" }}>Sarah · Brightline</div>
          </div>
        </div>

        {/* Animated ring */}
        <div className="flex justify-center py-1">
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(22,163,74,0.15)", animationDuration: "1.6s" }}
            />
            <div
              className="absolute inset-2 rounded-full animate-ping"
              style={{ background: "rgba(22,163,74,0.2)", animationDuration: "1.6s", animationDelay: "0.3s" }}
            />
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(22,163,74,0.35)", border: "2px solid rgba(22,163,74,0.7)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#4ade80" aria-hidden="true">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Accept / Decline */}
        {!callAccepted ? (
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => {}}
              className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#ef4444" }}
            >
              Decline
            </button>
            <button
              onClick={() => setCallAccepted(true)}
              className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#16a34a" }}
            >
              Accept
            </button>
          </div>
        ) : (
          <div
            className="mt-auto py-3 rounded-xl text-center text-sm font-bold"
            style={{ background: "rgba(22,163,74,0.2)", color: "#4ade80", border: "1px solid rgba(22,163,74,0.4)" }}
          >
            ✓ Call Connected
          </div>
        )}
      </div>

      {/* Right — conversation */}
      <div
        className="flex-1 rounded-2xl flex flex-col overflow-hidden"
        style={{ background: "rgba(6,12,36,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase"
          style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          Conversation
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5" style={{ maxHeight: "200px" }}>
          {MESSAGES.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                style={
                  msg.from === "me"
                    ? { background: "#25d366", color: "#000", borderBottomRightRadius: "4px" }
                    : { background: "rgba(30,40,70,0.9)", color: "#e2e8f0", border: "1px solid rgba(51,65,85,0.6)", borderBottomLeftRadius: "4px" }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="flex-1 px-3 py-2 rounded-xl text-xs"
            style={{ background: "rgba(15,23,42,0.8)", color: "#475569", border: "1px solid rgba(51,65,85,0.5)" }}
          >
            Reply…
          </div>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#25d366" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
