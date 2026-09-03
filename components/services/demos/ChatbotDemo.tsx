"use client";

import { useState } from "react";
import { INITIAL_CHAT_MESSAGES } from "@/lib/constants";
import { IconSend } from "@/lib/icons";
import type { ChatMessage } from "@/lib/types";

export default function ChatbotDemo() {
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
    <div className="flex flex-col justify-between flex-1 gap-3">
      <div className="space-y-2 overflow-y-auto pr-1" style={{ maxHeight: "180px" }}>
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[80%] p-2.5 rounded-xl text-xs leading-relaxed"
              style={
                msg.sender === "user"
                  ? { background: "#2563eb", color: "#ffffff", borderBottomRightRadius: "2px" }
                  : { background: "rgba(15,23,42,1)", color: "#e2e8f0", border: "1px solid rgba(51,65,85,0.8)", borderBottomLeftRadius: "2px" }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isBotTyping && (
          <div className="flex items-center gap-1 text-xs p-2" style={{ color: "#94a3b8" }}>
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
          style={{ background: "rgba(15,23,42,1)", border: "1px solid rgba(51,65,85,0.8)" }}
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
  );
}
