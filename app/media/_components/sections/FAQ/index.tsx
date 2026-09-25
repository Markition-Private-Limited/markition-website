"use client";

import { useState, useEffect, useRef } from "react";

const FAQS = [
  {
    q: "What's included in your digital marketing services?",
    a: "Our digital marketing services include SEO, paid ads, social media management, content marketing, email automation, and conversion optimization — everything you need to turn visibility into real, measurable business growth.",
  },
  {
    q: "What's the difference between SEO and paid ads?",
    a: "SEO builds long-term organic visibility that keeps paying off well after the campaign ends. Paid ads deliver immediate traffic and leads right away — most growing businesses see the strongest results running both strategies together.",
  },
  {
    q: "Can you run our paid ads and SEO together?",
    a: "Yes. Running SEO and paid ads together is one of the most effective strategies we offer — SEO builds long-term rankings while ads bring in leads right now.",
  },
  {
    q: "Do you manage social media accounts too?",
    a: "Absolutely. We handle content creation, posting schedules, community management, and paid social campaigns — so your social presence stays active without ever taking up your time.",
  },
  {
    q: "Can you build a one-off landing page or campaign?",
    a: "Yes. We build standalone landing pages and single campaigns for businesses that need fast results without a retainer. We'll make sure it's built to convert from day one.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Definitely. We love working with early-stage companies. We build marketing systems that punch above your size from day one and scale as your budget and team grow.",
  },
  {
    q: "How long until we see results from digital marketing?",
    a: "Paid ads can start driving qualified leads within days of launch. SEO takes longer — most clients see meaningful ranking movement within 3–4 months, with compounding growth after that.",
  },
];

export default function FAQ() {
  const [open, setOpen]         = useState<number | null>(null);
  const [hovered, setHovered]   = useState<number | null>(null);
  const [visible, setVisible]   = useState<Set<number>>(new Set());
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function check() {
      const next = new Set<number>();
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        if (top < window.innerHeight * 0.85 && bottom > 0) next.add(i);
      });
      setVisible(next);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <section
      className="media-gap"
      style={{
        padding: "100px 0 80px",
      }}
    >
      <div
        style={{
          maxWidth: 860,
          marginInline: "auto",
          paddingInline: "clamp(24px, 5vw, 80px)",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            Quick answers to questions you may have
          </h2>
        </div>

        {/* Items */}
        {FAQS.map((item, i) => (
          <div key={i} ref={(el) => { rowRefs.current[i] = el; }} data-idx={i}>
            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <button
              onClick={() => setOpen(open === i ? null : i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                background: "none",
                border: "none",
                padding: "26px 0",
                cursor: "pointer",
                gap: 24,
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(15px, 1.6vw, 18px)",
                  fontWeight: 500,
                  color: "#ffffff",
                  lineHeight: 1.4,
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 300,
                  color: "#ffffff",
                  lineHeight: 1,
                  background: open === i
                    ? "rgba(0,0,0,0.7)"
                    : visible.has(i) || hovered === i
                    ? "rgba(0,0,0,0.55)"
                    : "transparent",
                  transition: "background 0.4s ease, transform 0.25s ease",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>

            {/* Answer */}
            <div
              style={{
                overflow: "hidden",
                maxHeight: open === i ? 300 : 0,
                transition: "max-height 0.35s ease",
              }}
            >
              <p
                style={{
                  margin: "0 0 28px",
                  fontSize: "clamp(14px, 1.4vw, 16px)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  maxWidth: 720,
                }}
              >
                {item.a}
              </p>
            </div>
          </div>
        ))}

        {/* Final divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.2)" }} />
      </div>
    </section>
  );
}
