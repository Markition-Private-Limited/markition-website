"use client";

import { useEffect, useRef, useState } from "react";

const BLUE = "#1236E8";

type Card = {
  title:       string;
  body:        string;
  src?:        string;
  alt?:        string;
  staticBlue?: boolean;
};

const CARDS: Card[] = [
  {
    title: "Brand Identity Design",
    body:  "We build brands from the ground up: logo design, color systems, typography, brand guidelines, and stationery. Every asset works together so your business looks consistent, credible, and unforgettable across every channel.",
    src:   "/design-lab/assets/projects/showcase-branding.png",
    alt:   "Brand Identity Design",
  },
  {
    title: "UI/UX Design",
    body:  "We turn user research into clear journeys, wireframes, and polished interactive prototypes. Our web and app interfaces are intuitive, accessible, and responsive, built to keep users engaged and guide them toward conversion.",
    src:   "/design-lab/assets/projects/showcase-web.png",
    alt:   "UI/UX Design",
  },
  {
    title: "Social Media Design",
    body:  "We design scroll-stopping posts, carousels, stories, and reels covers, plus reusable templates for every platform. Your feed stays on-brand, recognizable, and engaging, so followers stop, interact, and remember you.",
    src:   "/design-lab/assets/projects/showcase-social.png",
    alt:   "Social Media Design",
  },
  {
    title: "Advertising & Campaign Design",
    body:  "From display banners and social ad creatives to print and out-of-home visuals, we design full campaigns around one clear idea. Every format is tailored to its channel to capture attention and drive measurable results.",
    src:   "/design-lab/assets/projects/showcase-web.png",
    alt:   "Advertising & Campaign Design",
  },
  {
    title: "Motion & 2D/3D Design",
    body:  "Motion is the heartbeat of modern digital communication. We craft cinematic 3D product renders, kinetic logo reveals, explainer animations, UI micro-interactions, and spatial visual assets that command attention and elevate brand prestige.",
    staticBlue: true,
  },
  {
    title: "E-Commerce Design",
    body:  "We design storefronts, product pages, collection layouts, and checkout flows that showcase your products beautifully. Clear navigation, trust signals, and frictionless buying steps turn casual browsers into repeat customers.",
    src:   "/design-lab/assets/projects/showcase-saas.png",
    alt:   "E-Commerce Design",
  },
];

const FACE: React.CSSProperties = {
  position:                 "absolute",
  inset:                    0,
  borderRadius:             20,
  overflow:                 "hidden",
  backfaceVisibility:       "hidden",
  WebkitBackfaceVisibility: "hidden",
};

function CardBack({ card }: { card: Card }) {
  return (
    <div
      className="flex flex-col justify-between h-full"
      style={{
        background: `linear-gradient(160deg, #1b46f5 0%, ${BLUE} 55%, #0c27b8 100%)`,
        padding:    "clamp(24px, 3vw, 40px) clamp(22px, 2.8vw, 36px)",
      }}
    >
      <h3
        className="font-bold leading-snug"
        style={{
          color:      "#fff",
          fontSize:   "clamp(20px, 1.9vw, 28px)",
          fontFamily: "var(--font-jakarta, sans-serif)",
        }}
      >
        {card.title}
      </h3>

      <div>
        <p className="leading-relaxed text-sm sm:text-[15px]" style={{ color: "rgba(255,255,255,0.85)" }}>
          {card.body}
        </p>
        <a
          href="/design-lab/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-6 w-fit"
          style={{
            border:       "1.5px solid rgba(255,255,255,0.45)",
            borderRadius: 50,
            padding:      "10px 22px",
            transition:   "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.15)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.75)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background  = "transparent";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)";
          }}
        >
          Explore Now <span>→</span>
        </a>
      </div>
    </div>
  );
}

function FlipCard({ card, visible, index }: { card: Card; visible: boolean; index: number }) {
  const fadeDelay = index * 90;
  const [settled, setSettled] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const pointerType = useRef("mouse");

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), fadeDelay + 700);
    return () => clearTimeout(t);
  }, [visible, fadeDelay]);

  const size = "min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]";
  const outer: React.CSSProperties = {
    perspective: 1200,
    cursor:      "pointer",
    opacity:     visible ? 1 : 0,
    transform:   visible ? "translateY(0)" : "translateY(40px)",
    transition:  settled
      ? "transform 0.3s cubic-bezier(.23,1,.32,1)"
      : `opacity 0.65s ease ${fadeDelay}ms, transform 0.65s ease ${fadeDelay}ms`,
  };

  if (card.staticBlue) {
    return (
      <div
        className={`relative ${size}`}
        style={{ ...outer, borderRadius: 20, boxShadow: "0 8px 32px rgba(18,54,232,0.18)" }}
        onMouseEnter={e => { if (settled) (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = visible ? "translateY(0)" : "translateY(40px)"; }}
      >
        <div style={FACE}><CardBack card={card} /></div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${size}`}
      style={{ ...outer, borderRadius: 20 }}
      onPointerDown={e => { pointerType.current = e.pointerType; }}
      onMouseEnter={() => { if (pointerType.current === "mouse") setFlipped(true); }}
      onMouseLeave={() => { if (pointerType.current === "mouse") setFlipped(false); }}
      onClick={() => { if (pointerType.current !== "mouse") setFlipped(f => !f); }}
    >
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform:      flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition:     "transform 0.4s cubic-bezier(.4,.2,.2,1)",
        }}
      >
        <div style={{ ...FACE, background: "#E2FAFF", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.src}
            alt={card.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <h3
            className="absolute font-bold leading-snug"
            style={{
              top:        "clamp(18px, 1.8vw, 26px)",
              left:       "clamp(18px, 1.8vw, 26px)",
              maxWidth:   "70%",
              color:      "#0d0d0d",
              fontSize:   "clamp(16px, 1.5vw, 21px)",
              fontFamily: "var(--font-jakarta, sans-serif)",
            }}
          >
            {card.title}
          </h3>
        </div>

        <div style={{ ...FACE, transform: "rotateY(180deg)", boxShadow: "0 30px 70px rgba(18,54,232,0.35)" }}>
          <CardBack card={card} />
        </div>
      </div>
    </div>
  );
}

export function ShowcaseSection() {
  const sectionRef              = useRef<HTMLElement>(null);
  const [headerIn, setHeaderIn] = useState(false);
  const [cardsIn,  setCardsIn]  = useState(false);
  const [ctaHover, setCtaHover] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHeaderIn(true);
        setTimeout(() => setCardsIn(true), 200);
        obs.disconnect();
      },
      { threshold: 0.07 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-navbar-theme="light"
      style={{ background: "#E2FAFF" }}
      className="py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto px-5 sm:px-8 lg:px-10" style={{ maxWidth: 1280 }}>

        <div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          style={{
            opacity:    headerIn ? 1 : 0,
            transform:  headerIn ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2
            className="font-extrabold mb-5"
            style={{
              fontSize:      "clamp(28px, 4.5vw, 58px)",
              lineHeight:    1.12,
              color:         "#0d0d0d",
              letterSpacing: "-1.5px",
              fontFamily:    "var(--font-jakarta, sans-serif)",
            }}
          >
            Your Full-Service{" "}
            <span style={{ color: BLUE }}>
              Branding &amp;
              <br className="hidden sm:block" />
              {" "}Design Agency
            </span>
          </h2>

          <p
            className="text-[15px] sm:text-base leading-relaxed mx-auto mb-9"
            style={{
              color:      "#4a5068",
              maxWidth:   540,
              opacity:    headerIn ? 1 : 0,
              transform:  headerIn ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            From logos and branding to app design, social media posts, and motion
            graphics, we handle every visual piece your growing brand needs.
          </p>

          <a
            href="/design-lab/contact"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-white"
            style={{
              background:      ctaHover ? "#0d29cc" : BLUE,
              padding:         "14px 32px",
              borderRadius:    9,
              textDecoration:  "none",
              transition:      "background 0.2s, box-shadow 0.2s, transform 0.18s",
              boxShadow:       ctaHover
                ? "0 10px 34px rgba(18,54,232,0.45)"
                : "0 4px 18px rgba(18,54,232,0.24)",
              transform:       ctaHover ? "translateY(-3px)" : "translateY(0)",
              opacity:         headerIn ? 1 : 0,
            }}
          >
            Contact Us <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {CARDS.map((card, i) => (
            <FlipCard key={i} card={card} visible={cardsIn} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
