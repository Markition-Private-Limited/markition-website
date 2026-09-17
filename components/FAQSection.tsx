"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What services does Markition provide?",
    a: "We provide digital marketing, web and software development, UI/UX design, branding, SEO, social media management, and other digital solutions under one roof.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes — we work with businesses of all sizes, from early-stage startups to established enterprises. We tailor our strategies to match your stage, goals, and budget.",
  },
  {
    q: "How do you start a new project?",
    a: "We begin with a discovery call to understand your goals, audience, and challenges. From there we put together a tailored strategy and project plan before any work begins.",
  },
  {
    q: "How long does a project usually take?",
    a: "Timelines vary by scope. A website typically takes 4–8 weeks, while ongoing marketing campaigns are structured in monthly sprints. We'll give you a clear timeline upfront.",
  },
  {
    q: "Can you manage our social media accounts?",
    a: "Absolutely. We offer full social media management including content creation, scheduling, community engagement, and monthly performance reporting.",
  },
  {
    q: "Do you provide customized solutions?",
    a: "Every engagement is custom-built. We don't use one-size-fits-all templates — your strategy, design, and deliverables are created specifically for your business.",
  },
  {
    q: "How much do your services cost?",
    a: "Pricing depends on the scope and services required. Use the contact form below to share your goals and budget, and we'll put together a transparent proposal.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section style={{ background: "#000028", padding: "64px 0 60px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            margin: "0 0 36px",
            fontSize: "clamp(24px,3vw,38px)",
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1.1,
            fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
          }}
        >
          <span style={{ color: "#f0f6ff" }}>Frequently Asked{" "}</span>
          <span style={{ color: "#00d4ff" }}>Questions</span>
        </h2>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: "#06102a",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.07)",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                  ...(isOpen && { borderColor: "rgba(0,120,255,0.25)" }),
                }}
              >
                {/* Row */}
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "15px 20px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: "#f0f6ff",
                      lineHeight: 1.4,
                      fontFamily: "inherit",
                    }}
                  >
                    {faq.q}
                  </span>

                  {/* Toggle icon */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      lineHeight: 1,
                      fontWeight: 300,
                      transition: "background 0.2s, color 0.2s",
                      background: isOpen ? "#1a4bff" : "rgba(255,255,255,0.08)",
                      color: isOpen ? "#ffffff" : "#8aa4c8",
                    }}
                  >
                    {isOpen ? "×" : "+"}
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <p
                    style={{
                      margin: 0,
                      padding: "0 20px 16px",
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: "#8aa4c8",
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
