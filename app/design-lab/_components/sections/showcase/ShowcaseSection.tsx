"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BLUE = "#1236E8";

type Card = {
  title: string;
  body:  string;
  src?:  string;
  alt?:  string;
};

const CARDS: Card[] = [
  {
    title: "Brand Identity Design",
    body:  "We build brands from the ground up — logo design, colour systems, typography, brand guidelines, and full stationery suites. Every asset is crafted to work together so your business looks consistent, credible, and instantly recognisable whether someone sees you on a business card, a billboard, or a social feed. A strong identity doesn't just look good; it earns trust before a single word is read.",
    src:   "/design-lab/assets/projects/showcase-branding.webp",
    alt:   "Brand Identity Design",
  },
  {
    title: "UI/UX Design",
    body:  "We turn user research and business goals into clear journeys, wireframes, and high-fidelity interactive prototypes. Every screen we design is intuitive, accessible, and responsive — built to reduce friction, keep users engaged, and guide them toward the action that matters. Whether it's a SaaS dashboard, a mobile app, or a marketing site, we design with conversion in mind at every step.",
    src:   "/design-lab/assets/projects/showcase-uiux.webp",
    alt:   "UI/UX Design",
  },
  {
    title: "Social Media Design",
    body:  "We design scroll-stopping posts, carousels, stories, reels covers, and highlight icons, plus reusable branded templates your team can use independently. Your feed stays on-brand, visually consistent, and engaging across every platform — so followers stop, interact, and remember you long after they've scrolled past. Good social design is the difference between being noticed and being remembered.",
    src:   "/design-lab/assets/projects/showcase-social.webp",
    alt:   "Social Media Design",
  },
  {
    title: "Advertising & Campaign Design",
    body:  "From display banners and social ad creatives to print collateral and out-of-home visuals, we build full campaigns around one clear, compelling idea. Every format is tailored to its channel, audience, and objective — so your ad stops the right people, communicates fast, and drives measurable results. We don't just make things look good; we make them work harder.",
    src:   "/design-lab/assets/projects/showcase-advertising.webp",
    alt:   "Advertising & Campaign Design",
  },
  {
    title: "Motion & 2D/3D Design",
    body:  "Motion is the heartbeat of modern digital communication. We craft cinematic 3D product renders, kinetic logo reveals, explainer animations, UI micro-interactions, and spatial visual assets. Whether it's a 3-second bumper ad or a 60-second brand film, every frame is intentional — designed to command attention, communicate clearly, and leave a lasting impression that static design simply cannot.",
    src:   "/design-lab/assets/projects/showcase-motion.webp",
    alt:   "Motion & 2D/3D Design",
  },
  {
    title: "E-Commerce Design",
    body:  "We design storefronts, product pages, collection layouts, and checkout flows that make your products impossible to ignore. Clear navigation, compelling product presentation, trust signals, and frictionless buying steps work together to turn casual browsers into confident buyers and first-time customers into repeat ones. Every pixel is optimised to reduce drop-off and increase average order value.",
    src:   "/design-lab/assets/projects/showcase-ecommerce.webp",
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
          fontSize:   "clamp(18px, 1.8vw, 26px)",
          fontFamily: "var(--font-jakarta, sans-serif)",
          textAlign:  "center",
        }}
      >
        {card.title}
      </h3>

      <div style={{ textAlign: "center" }}>
        <p className="leading-relaxed text-sm sm:text-[15px]" style={{ color: "rgba(255,255,255,0.85)" }}>
          {card.body}
        </p>
        <a
          href="/design-lab/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-6 mx-auto w-fit"
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
        <div style={{ ...FACE, background: "#f0f8ff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.72) 0%, transparent 45%)", zIndex: 1 }} />
          <Image
            src={card.src!}
            alt={card.alt ?? card.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "top center" }}
            quality={95}
          />
          <h3
            className="absolute font-bold leading-snug"
            style={{
              top:        "clamp(18px, 1.8vw, 26px)",
              left:       0,
              right:      0,
              textAlign:  "center",
              color:      "#0d0d17",
              fontSize:   "clamp(18px, 1.8vw, 26px)",
              fontFamily: "var(--font-jakarta, sans-serif)",
              padding:    "0 16px",
              zIndex:     2,
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
