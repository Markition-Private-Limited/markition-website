"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

interface Testimonial {
  stars: number;
  quote: string;
  highlight: string;
  name: string;
  verified?: boolean;
  role: string;
  company: string;
  panelName?: string;
  videoSrc: string;
}

/* male, male, female, male, male */
const TESTIMONIALS: Testimonial[] = [
  {
    stars: 5,
    quote: "Spheno AI took over our entire lead qualification process. We went from chasing every enquiry manually to having a system that follows up, qualifies, and books — on its own.",
    highlight: "follows up, qualifies, and books",
    name: "Marcus",
    verified: true,
    role: "CEO",
    company: "Reid Advisory Group",
    panelName: "MARCUS REID",
    videoSrc: "/reviews/spheno-1.mp4",
  },
  {
    stars: 5,
    quote: "The AI voice agent handles calls we used to miss after hours. It answers, collects info, and schedules the appointment. Our close rate improved week one.",
    highlight: "close rate improved week one",
    name: "Tyler",
    verified: true,
    role: "Operations Director",
    company: "Crestfield Services",
    panelName: "TYLER BROOKS",
    videoSrc: "/reviews/spheno-2.mp4",
  },
  {
    stars: 5,
    quote: "I was skeptical about AI replacing real conversations, but Spheno genuinely surprised me. Our clients can't tell the difference and our team is finally free to focus on delivery.",
    highlight: "our team is finally free",
    name: "Natalie",
    verified: true,
    role: "Founder",
    company: "Stone & Co. Consulting",
    panelName: "NATALIE STONE",
    videoSrc: "/reviews/spheno-3.mp4",
  },
  {
    stars: 5,
    quote: "WhatsApp automation alone saved us 15 hours a week. Add the CRM that thinks and the chat agent on our site — this is genuinely a different way to run a business.",
    highlight: "a different way to run a business",
    name: "Jordan",
    verified: true,
    role: "Managing Director",
    company: "Ellis Growth Co.",
    panelName: "JORDAN ELLIS",
    videoSrc: "/reviews/spheno-4.mp4",
  },
  {
    stars: 5,
    quote: "We plugged Spheno into our existing workflow in under a week. The results weren't gradual — they were immediate. Leads responded faster and conversion went up.",
    highlight: "results weren't gradual — they were immediate",
    name: "Derek",
    verified: true,
    role: "Co-Founder",
    company: "Shaw Digital",
    panelName: "DEREK SHAW",
    videoSrc: "/reviews/spheno-5.mp4",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24">
          <path
            d="M12 2l2.6 7.9H22l-6.4 4.6 2.4 7.5L12 17.6 5.9 22l2.4-7.5L2 9.9h7.4z"
            fill={i < count ? "#F5A623" : "rgba(245,166,35,0.2)"}
          />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="12" fill="#818cf8" />
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteWithHighlight({ quote, highlight }: { quote: string; highlight: string }) {
  const idx = quote.indexOf(highlight);
  if (idx === -1)
    return (
      <p style={{ fontSize: 13, lineHeight: 1.65, fontStyle: "italic", color: "#c7d0e8", margin: 0 }}>
        &ldquo;{quote}&rdquo;
      </p>
    );
  return (
    <p style={{ fontSize: 13, lineHeight: 1.65, fontStyle: "italic", color: "#c7d0e8", margin: 0 }}>
      &ldquo;{quote.slice(0, idx)}
      <span style={{ color: "#a5b4fc" }}>{highlight}</span>
      {quote.slice(idx + highlight.length)}&rdquo;
    </p>
  );
}

const CARD_H = 270;
const LEFT_W = 190;
const RIGHT_W = 300;

function VideoLeftPanel({ t }: { t: Testimonial }) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { vid.play().catch(() => {}); }
        else { vid.pause(); }
      },
      { threshold: 0.4 }
    );
    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) vid.muted = muted;
  }, [muted]);

  function toggleMute(e: MouseEvent) {
    e.stopPropagation();
    setMuted(m => !m);
  }

  return (
    <div style={{ width: LEFT_W, height: "100%", flexShrink: 0, position: "relative", overflow: "hidden", background: "#050827" }}>
      <video
        ref={videoRef}
        src={t.videoSrc}
        loop
        playsInline
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "translateZ(0)", willChange: "transform" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,8,39,0.85) 30%, rgba(5,8,39,0.08) 100%)", pointerEvents: "none" }} />
      <button
        onClick={toggleMute}
        title={muted ? "Unmute" : "Mute"}
        style={{
          position: "absolute", bottom: 34, right: 8,
          width: 26, height: 26, borderRadius: "50%",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10, padding: 0,
        }}
      >
        {muted ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97V10.18l2.45 2.45c.03-.2.05-.41.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A9.9 9.9 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a9.55 9.55 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px", zIndex: 3 }}>
        <p style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.panelName ?? t.name}</p>
        <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 9, letterSpacing: "0.04em" }}>{t.company}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="spheno-tc-card"
      style={{
        display: "flex",
        flexShrink: 0,
        width: LEFT_W + RIGHT_W,
        height: CARD_H,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        border: "1px solid rgba(129,140,248,0.18)",
      }}
    >
      <VideoLeftPanel t={t} />

      <div
        className="spheno-tc-right"
        style={{
          flex: 1,
          background: "rgba(9,13,55,0.97)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "18px 18px 16px",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute", top: 14, right: 16,
          fontSize: 44, lineHeight: 1,
          color: "rgba(165,180,252,0.18)",
          fontFamily: "Georgia, serif", userSelect: "none", pointerEvents: "none",
        }}>
          &rdquo;
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <StarRating count={t.stars} />
          <QuoteWithHighlight quote={t.quote} highlight={t.highlight} />
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          paddingTop: 12, borderTop: "1px solid rgba(129,140,248,0.15)",
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 13,
          }}>
            {t.name[0]}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontWeight: 700, fontSize: 12.5, color: "#e0e7ff" }}>{t.name}</span>
              {t.verified && <VerifiedBadge />}
            </div>
            <p style={{ margin: 0, fontSize: 11, color: "#8892b0" }}>{t.role} · {t.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BG = "#050827";

export function SphenoTestimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section style={{ background: BG, padding: "80px 0 96px", borderBottom: "1px solid #161A35" }}>
      {/* Heading */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 56px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 14px", borderRadius: 999,
          background: "rgba(9,21,53,0.9)", border: "1px solid rgba(99,102,241,0.3)",
          fontSize: 11, fontWeight: 700, color: "#a5b4fc",
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Client Stories
        </div>

        <h2 style={{
          fontSize: "clamp(32px, 4.5vw, 56px)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "#fff",
          margin: "0 0 20px",
        }}>
          Experiences That{" "}
          <span style={{
            backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Speak Volumes
          </span>
        </h2>

        <p style={{
          fontSize: "clamp(14px, 1.3vw, 17px)",
          color: "#B9BFDC",
          lineHeight: 1.7,
          maxWidth: 580,
          margin: "0 auto",
        }}>
          Real businesses. Real automation. Real outcomes. Here&apos;s what happens when Spheno AI takes over the work your team shouldn&apos;t be doing manually.
        </p>
      </div>

      {/* Scrolling track */}
      <div style={{ position: "relative", overflow: "hidden", height: CARD_H + 4 }}>
        <div
          className="spheno-testimonials-track"
          style={{ display: "flex", alignItems: "center", gap: 18, width: "max-content", height: "100%", padding: "2px 32px" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        <div style={{ pointerEvents: "none", position: "absolute", inset: "0 auto 0 0", width: 120, background: `linear-gradient(to right, ${BG}, transparent)`, zIndex: 10 }} />
        <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0 0 auto", width: 120, background: `linear-gradient(to left, ${BG}, transparent)`, zIndex: 10 }} />
      </div>

      <style>{`
        .spheno-testimonials-track { animation: spheno-scroll 44s linear infinite; will-change: transform; }
        .spheno-testimonials-track:hover { animation-play-state: paused; }
        @keyframes spheno-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .spheno-tc-card {
          transition: transform 0.40s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.40s ease, border-color 0.30s ease;
          cursor: pointer;
          will-change: transform;
        }
        .spheno-tc-card:hover {
          transform: translateY(-10px) scale(1.025);
          box-shadow: 0 0 0 1.5px rgba(129,140,248,0.55), 0 20px 60px rgba(99,102,241,0.20), 0 10px 36px rgba(0,0,60,0.45);
          border-color: rgba(129,140,248,0.55) !important;
        }
        .spheno-tc-right { transition: background 0.30s ease; }
        .spheno-tc-card:hover .spheno-tc-right { background: rgba(15,20,70,1.0) !important; }
      `}</style>
    </section>
  );
}
