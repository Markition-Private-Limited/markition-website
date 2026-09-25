"use client";

import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";

const BLUE = "#1236E8";

type ImageCard = { type: "image"; src: string; alt: string };
type TextCard  = { type: "text";  title: string; body: string };
type Card = ImageCard | TextCard;

const CARDS: Card[] = [
  { type: "image", src: "/design-lab/assets/projects/showcase-branding.png", alt: "Brand Identity Design" },
  { type: "image", src: "/design-lab/assets/projects/showcase-web.png",      alt: "Web & UI Design" },
  { type: "image", src: "/design-lab/assets/projects/showcase-social.png",   alt: "Social Media Design" },
  { type: "image", src: "/design-lab/assets/projects/showcase-saas.png",     alt: "SaaS Dashboard UI" },
  {
    type: "text",
    title: "Video Editing & Motion Design",
    body: "Motion brings your brand to life. We create 2D and 3D animation, kinetic logo reveals, explainer videos, and social media reels that grab attention and keep people watching until the very end.",
  },
  { type: "image", src: "/design-lab/assets/projects/showcase-branding.png", alt: "Creative Direction" },
];

function TiltCard({ card, visible, index }: { card: Card; visible: boolean; index: number }) {
  const ref     = useRef<HTMLDivElement>(null);
  const fadeDelay = index * 90;
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), fadeDelay + 700);
    return () => clearTimeout(t);
  }, [visible, fadeDelay]);

  const transition = settled
    ? "transform 0.3s cubic-bezier(.23,1,.32,1), box-shadow 0.3s ease"
    : `opacity 0.65s ease ${fadeDelay}ms, transform 0.65s ease ${fadeDelay}ms, box-shadow 0.3s ease`;

  function onMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const rY =  (((e.clientX - r.left) / r.width)  - 0.5) * 20;
    const rX = -(((e.clientY - r.top)  / r.height) - 0.5) * 20;
    el.style.transform = `perspective(900px) translateY(-14px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.06)`;
    el.style.boxShadow = card.type === "text"
      ? "0 40px 90px rgba(18,54,232,0.45), 0 12px 30px rgba(18,54,232,0.25)"
      : "0 40px 90px rgba(0,0,0,0.22), 0 12px 30px rgba(0,0,0,0.12)";
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = card.type === "text"
      ? "0 8px 32px rgba(18,54,232,0.18)"
      : "0 4px 24px rgba(0,0,0,0.07)";
  }

  const base: React.CSSProperties = {
    borderRadius: 20,
    overflow:     "hidden",
    willChange:   "transform",
    cursor:       "pointer",
    transition,
    opacity:      visible ? 1 : 0,
    transform:    visible
      ? "perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg) scale(1)"
      : "perspective(900px) translateY(40px) rotateX(0deg) rotateY(0deg) scale(1)",
  };

  if (card.type === "text") {
    return (
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="flex flex-col justify-between min-h-[280px] sm:min-h-[400px] lg:min-h-[480px]"
        style={{
          ...base,
          background: BLUE,
          boxShadow:  "0 8px 32px rgba(18,54,232,0.18)",
          padding:    "clamp(28px, 4vw, 52px) clamp(24px, 3.5vw, 44px)",
        }}
      >
        <div>
          <h3
            className="font-bold leading-snug mb-4 sm:mb-6"
            style={{
              color:      "#fff",
              fontSize:   "clamp(20px, 2.2vw, 30px)",
              fontFamily: "var(--font-jakarta, sans-serif)",
            }}
          >
            {card.title}
          </h3>
          <p
            className="leading-relaxed text-sm sm:text-[15px]"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            {card.body}
          </p>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-6 sm:mt-10 w-fit"
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
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="min-h-[280px] sm:min-h-[400px] lg:min-h-[480px]"
      style={{
        ...base,
        background: "#d8eaf5",
        boxShadow:  "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.src}
        alt={card.alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
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
            <TiltCard key={i} card={card} visible={cardsIn} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
