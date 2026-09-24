"use client";

import React, { useEffect, useRef, useState } from "react";

const BLUE = "#1236E8";
const CDN  = "https://thesvg.org/icons";

function AdobeLetterIcon({ letters, bg, color }: { letters: string; bg: string; color: string }) {
  return (
    <div
      style={{
        width: 30, height: 30, borderRadius: 6,
        background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 11, color,
        fontFamily: "var(--font-jakarta, sans-serif)",
        letterSpacing: "-0.3px", flexShrink: 0,
      }}
    >
      {letters}
    </div>
  );
}

function CanvaIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="url(#canva-grad)" />
      <defs>
        <linearGradient id="canva-grad" x1="0" y1="0" x2="30" y2="30">
          <stop offset="0%"   stopColor="#7B2FF7" />
          <stop offset="40%"  stopColor="#00C4CC" />
          <stop offset="100%" stopColor="#00C853" />
        </linearGradient>
      </defs>
      <text x="15" y="21" textAnchor="middle" fill="#fff"
        fontWeight="800" fontSize="13" fontFamily="serif" fontStyle="italic">
        C
      </text>
    </svg>
  );
}

function MaxonIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#E30613" />
      <path d="M6 21V9l4.5 8.5L15 9l4.5 8.5L24 9v12" stroke="#fff" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function FramerIcon() {
  return (
    <div style={{
      width: 30, height: 30, borderRadius: 6, background: "#0a0a0a",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h16v8H8L0 0ZM0 8h8l8 8H0V8ZM0 16h8v4L0 16Z" fill="white" />
      </svg>
    </div>
  );
}

function SketchIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="15,3 28,11 23,25 7,25 2,11" fill="#FDB300" />
      <polygon points="15,3 28,11 23,25 7,25 2,11"
        fill="none" stroke="#EB6C00" strokeWidth="0.5" />
      <polygon points="15,6 26,12 22,23 8,23 4,12" fill="#FDAD00" />
      <polygon points="15,9 21,22 9,22" fill="#fff" opacity="0.5" />
    </svg>
  );
}

type ImgTool = {
  name: string;
  kind: "img";
  src: string;
};
type InlineTool = {
  name: string;
  kind: "inline";
  Icon: () => React.ReactElement;
};
type Tool = ImgTool | InlineTool;

const ROWS: Tool[][] = [
  [
    { name: "LottieFiles",   kind: "img",    src: `${CDN}/lottiefiles/default.svg` },
    { name: "Figma",         kind: "img",    src: `${CDN}/figma/default.svg` },
    { name: "Framer",        kind: "inline", Icon: FramerIcon },
    { name: "Photoshop",     kind: "img",    src: `${CDN}/adobe-photoshop/default.svg` },
    { name: "Illustrator",   kind: "inline", Icon: () => <AdobeLetterIcon letters="Ai" bg="#FF9A00" color="#fff" /> },
    { name: "After Effects", kind: "inline", Icon: () => <AdobeLetterIcon letters="Ae" bg="#2B0A43" color="#c2a0f0" /> },
  ],
  [
    { name: "Canva",    kind: "inline", Icon: CanvaIcon },
    { name: "Maxon",    kind: "inline", Icon: MaxonIcon },
    { name: "Adobe",    kind: "img",    src: `${CDN}/adobe/default.svg` },
    { name: "Webflow",  kind: "img",    src: `${CDN}/webflow/default.svg` },
    { name: "Sketch",   kind: "inline", Icon: SketchIcon },
    { name: "Shopify",  kind: "img",    src: `${CDN}/shopify/default.svg` },
  ],
];

function ToolPill({ tool, visible, index }: { tool: Tool; visible: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);
  const delay = index * 55;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 rounded-xl cursor-default select-none"
      style={{
        padding:    "14px 20px",
        border:     `1.5px solid ${hovered ? BLUE : "#e2e8f0"}`,
        boxShadow:  hovered
          ? `0 0 0 3px ${BLUE}18, 0 6px 20px rgba(18,54,232,0.09)`
          : "0 1px 4px rgba(0,0,0,0.05)",
        transition: `border-color 0.22s ease, box-shadow 0.22s ease,
                     opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        opacity:   visible ? 1 : 0,
        transform: hovered
          ? "translateY(-3px)"
          : visible ? "translateY(0)" : "translateY(20px)",
        background: "#fff",
      }}
    >
      <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 30, height: 30 }}>
        {tool.kind === "img" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tool.src} alt={tool.name} style={{ width: 30, height: 30, objectFit: "contain" }} />
        ) : (
          <tool.Icon />
        )}
      </div>

      <span
        className="font-semibold whitespace-nowrap"
        style={{
          fontSize:   14,
          color:      hovered ? BLUE : "#1a1a2e",
          transition: "color 0.2s ease",
          fontFamily: "var(--font-jakarta, sans-serif)",
        }}
      >
        {tool.name}
      </span>
    </div>
  );
}

export function ToolsSection() {
  const sectionRef              = useRef<HTMLElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [headerIn, setHeaderIn] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHeaderIn(true);
        setTimeout(() => setVisible(true), 160);
        obs.disconnect();
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} data-navbar-theme="light" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto px-5 sm:px-8 lg:px-10" style={{ maxWidth: 1280 }}>

        <div
          className="text-center mb-14 sm:mb-20"
          style={{
            opacity:    headerIn ? 1 : 0,
            transform:  headerIn ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2
            className="font-extrabold"
            style={{
              fontSize:      "clamp(26px, 4vw, 52px)",
              lineHeight:    1.15,
              letterSpacing: "-1.2px",
              color:         "#0d0d0d",
              fontFamily:    "var(--font-jakarta, sans-serif)",
            }}
          >
            Modern Tools For{" "}
            <span style={{ color: BLUE }}>Modern Design</span>
          </h2>

          <p
            className="text-[15px] leading-relaxed mx-auto mt-4"
            style={{
              color:      "#64748b",
              maxWidth:   460,
              opacity:    headerIn ? 1 : 0,
              transform:  headerIn ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            We work with the industry&apos;s best software to deliver
            pixel-perfect results every time.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-14 sm:mb-20">
          {ROWS.map((row, ri) => (
            <div
              key={ri}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
            >
              {row.map((tool, ti) => (
                <ToolPill
                  key={tool.name}
                  tool={tool}
                  visible={visible}
                  index={ri * 6 + ti}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl flex flex-col sm:flex-row items-start sm:items-center
                     justify-between gap-6 sm:gap-10"
          style={{
            background:  BLUE,
            padding:     "clamp(36px, 4vw, 52px) clamp(28px, 4vw, 60px)",
            opacity:     visible ? 1 : 0,
            transform:   visible ? "translateY(0)" : "translateY(20px)",
            transition:  "opacity 0.6s ease 680ms, transform 0.6s ease 680ms",
          }}
        >
          <h3
            className="font-extrabold text-white leading-tight"
            style={{
              fontSize:   "clamp(22px, 3vw, 40px)",
              letterSpacing: "-0.8px",
              fontFamily: "var(--font-jakarta, sans-serif)",
              maxWidth:   540,
            }}
          >
            Use Our World&#8209;Class<br />
            Design Talent To Grow Faster.
          </h3>

          <a
            href="/design-lab/contact"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="inline-flex items-center gap-2.5 font-semibold whitespace-nowrap flex-shrink-0"
            style={{
              fontSize:       15,
              color:          btnHover ? BLUE  : "#fff",
              background:     btnHover ? "#fff" : "transparent",
              border:         "1.5px solid rgba(255,255,255,0.55)",
              borderColor:    btnHover ? "#fff" : "rgba(255,255,255,0.55)",
              padding:        "13px 28px",
              borderRadius:   9,
              textDecoration: "none",
              transition:     "background 0.22s ease, color 0.22s ease, border-color 0.22s ease, transform 0.18s ease",
              transform:      btnHover ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            Book a Free Strategy Call
            <span
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 24, height: 24, borderRadius: "50%",
                background:  btnHover ? `${BLUE}18` : "rgba(255,255,255,0.2)",
                fontSize: 13,
                transition:  "transform 0.2s ease",
                transform:   btnHover ? "translateX(3px)" : "translateX(0)",
              }}
            >
              →
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
