"use client";

import { useState } from "react";

const BLUE = "#1236E8";

const FAQS = [
  {
    q: "What services does Markition DesignLab provide?",
    a: "We provide UI/UX design, branding, logo design, social media post design, video editing, and every visual asset your growing brand truly needs.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes — we design for startups just launching their first brand, and established companies refreshing theirs, scaling our approach to fit your stage.",
  },
  {
    q: "How do you start a new project?",
    a: "Every design project starts with a discovery call to understand your brand and goals, followed by a proposal, timeline, and a dedicated designer.",
  },
  {
    q: "How long does a project usually take?",
    a: "Timelines vary by scope — a logo takes about a week, while a full brand identity or video project runs 4–6 weeks typically.",
  },
  {
    q: "Can you manage our social media accounts?",
    a: "Absolutely — we handle social media post design, reels, and creative, so your feed always looks polished and on-brand.",
  },
  {
    q: "Do you provide customized solutions?",
    a: "Every design we create is built around your brand's goals, audience, and industry — no templates, no one-size-fits-all packages, ever.",
  },
  {
    q: "How much do your services cost?",
    a: "Pricing depends on scope — a logo costs less than a full brand system. Book a quick free call for an exact quote.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section data-navbar-theme="light" className="bg-white py-20 sm:py-28 px-5 sm:px-8 lg:px-10">
      <div className="mx-auto" style={{ maxWidth: 720 }}>

        <div className="text-center mb-12">
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: BLUE }}
          >
            FAQ
          </p>
          <h2
            className="font-extrabold mb-4"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-1.2px",
              color: "#0d0d0d",
              fontFamily: "var(--font-jakarta, sans-serif)",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-500 max-w-xl mx-auto">
            Have questions about branding, design, animation, or video? We have answers — here&apos;s how we turn your ideas into real brand experiences.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  border: `1.5px solid ${isOpen ? BLUE : "rgba(0,0,0,0.09)"}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: isOpen ? BLUE : "#0d0d0d",
                      lineHeight: 1.4,
                      fontFamily: "var(--font-jakarta, sans-serif)",
                      transition: "color 0.2s",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 300,
                      background: isOpen ? BLUE : "rgba(0,0,0,0.06)",
                      color: isOpen ? "#fff" : "#666",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {isOpen ? "×" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p
                    style={{
                      margin: 0,
                      padding: "0 20px 18px",
                      fontSize: 13.5,
                      lineHeight: 1.75,
                      color: "#64748b",
                      fontFamily: "var(--font-jakarta, sans-serif)",
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
