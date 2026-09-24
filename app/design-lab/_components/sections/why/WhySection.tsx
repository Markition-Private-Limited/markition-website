"use client";

import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";

const BG      = "#060d1e";
const CARD_BG = "#0c1528";
const BLUE    = "#1236E8";
const CYAN    = "#38bdf8";

const CARDS = [
  {
    num:       "01",
    title:     "Strategy Before Design",
    body:      "We start with your goals, audience, and business needs—then create design that has a clear purpose.",
    highlight: false,
  },
  {
    num:       "02",
    title:     "Creativity That Drives Growth",
    body:      "Every visual decision is shaped by your brand, positioning, audience, and the outcomes you want to achieve.",
    highlight: false,
  },
  {
    num:       "03",
    title:     "Design Built for Execution",
    body:      "Our designers collaborate with developers and marketers to create experiences that are beautiful, functional, and ready to launch.",
    highlight: false,
  },
  {
    num:       "04",
    title:     "Consistency Across Every Touchpoint",
    body:      "From websites and apps to social media and campaigns, we create a cohesive visual experience across your entire brand.",
    highlight: true,
  },
];

function WhyCard({
  card,
  visible,
  index,
}: {
  card: (typeof CARDS)[number];
  visible: boolean;
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [settled, setSettled] = useState(false);
  const delay = index * 100;

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), delay + 700);
    return () => clearTimeout(t);
  }, [visible, delay]);

  function onMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const rY =  (((e.clientX - r.left)  / r.width)  - 0.5) * 14;
    const rX = -(((e.clientY - r.top)   / r.height) - 0.5) * 14;
    el.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.03)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    setHovered(false);
  }

  const fadeTransition = settled
    ? "transform 0.32s cubic-bezier(.23,1,.32,1)"
    : `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(.23,1,.32,1) ${delay}ms`;

  const fillBg = card.highlight ? "rgba(255,255,255,0.12)" : BLUE;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        position:      "relative",
        overflow:      "hidden",
        background:    card.highlight ? BLUE : CARD_BG,
        border:        `1.5px solid ${card.highlight ? "transparent" : hovered ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.1)"}`,
        borderRadius:  16,
        padding:       "clamp(28px, 3.5vw, 44px) clamp(24px, 3vw, 40px)",
        display:       "flex",
        flexDirection: "column",
        gap:           20,
        cursor:        "default",
        willChange:    "transform",
        opacity:       visible ? 1 : 0,
        transform:     visible
          ? "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)"
          : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1) translateY(28px)",
        transition:    fadeTransition,
        boxShadow:     hovered
          ? card.highlight
            ? "0 28px 72px rgba(18,54,232,0.55)"
            : "0 0 0 1.5px rgba(56,189,248,0.3), 0 28px 60px rgba(56,189,248,0.14)"
          : "none",
      }}
    >
      <div
        aria-hidden
        style={{
          position:   "absolute",
          inset:      0,
          background: fillBg,
          transform:  hovered
            ? "skewX(-12deg) translateX(0%)"
            : "skewX(-12deg) translateX(-115%)",
          transition: "transform 0.52s cubic-bezier(.23,1,.32,1)",
          zIndex:     0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3
          className="font-bold leading-snug mb-3"
          style={{
            color:      "#fff",
            fontSize:   "clamp(16px, 1.5vw, 20px)",
            fontFamily: "var(--font-jakarta, sans-serif)",
          }}
        >
          {card.num}. {card.title}
        </h3>

        <div
          style={{
            height:       2,
            width:        hovered ? 56 : 44,
            borderRadius: 2,
            background:   card.highlight ? "rgba(255,255,255,0.6)" : CYAN,
            transition:   "width 0.3s ease",
          }}
        />
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{
          position:   "relative",
          zIndex:     1,
          color:      card.highlight ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.6)",
          fontFamily: "var(--font-jakarta, sans-serif)",
          lineHeight: 1.75,
        }}
      >
        {card.body}
      </p>
    </div>
  );
}

export function WhySection() {
  const sectionRef              = useRef<HTMLElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [headerIn, setHeaderIn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHeaderIn(true);
        setTimeout(() => setVisible(true), 180);
        obs.disconnect();
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-navbar-theme="dark"
      className="py-24 sm:py-32 lg:py-40"
      style={{ background: BG }}
    >
      <div className="mx-auto px-5 sm:px-8 lg:px-10" style={{ maxWidth: 1160 }}>

        <div
          className="text-center mb-16 sm:mb-20"
          style={{
            opacity:    headerIn ? 1 : 0,
            transform:  headerIn ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2
            className="font-extrabold"
            style={{
              fontSize:      "clamp(32px, 5vw, 60px)",
              lineHeight:    1.1,
              letterSpacing: "-1.5px",
              fontFamily:    "var(--font-jakarta, sans-serif)",
              color:         "#fff",
            }}
          >
            Why{" "}
            <span style={{ color: CYAN }}>Markition</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {CARDS.map((card, i) => (
            <WhyCard key={i} card={card} visible={visible} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
