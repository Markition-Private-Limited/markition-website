"use client";

import { useEffect, useRef, useState } from "react";

const BLUE = "#1236E8";

const PROJECTS = [
  {
    src:      "/design-lab/assets/projects/showcase-saas.png",
    title:    "Social Creator Dashboard",
    category: "SaaS UI",
  },
  {
    src:      "/design-lab/assets/hero/fc89d9d6b47eebf9cf67d38fedb462629614f9c6.png",
    title:    "Dojo — 3D Product Render",
    category: "Motion & 3D",
  },
  {
    src:      "/design-lab/assets/projects/showcase-web.png",
    title:    "Healthcare Web Platform",
    category: "Web Design",
  },
  {
    src:      "/design-lab/assets/hero/aca36e01ed06f6af6cf93da04415684d26a65ce3.png",
    title:    "KFC App Redesign",
    category: "App Design",
  },
  {
    src:      "/design-lab/assets/projects/showcase-branding.png",
    title:    "Brand Identity System",
    category: "Branding",
  },
  {
    src:      "/design-lab/assets/hero/3ac0d2c9715554614b1ec0e32e74cd606253df1a.png",
    title:    "Particles — Motion Art",
    category: "Motion Design",
  },
  {
    src:      "/design-lab/assets/projects/showcase-social.png",
    title:    "Social Media Creative Kit",
    category: "Marketing",
  },
  {
    src:      "/design-lab/assets/hero/8e0a4aba5e948181f985a0c8f49cc83d02b7e6fc.png",
    title:    "Robobook — Fintech App",
    category: "Product Design",
  },
];

function ProjectCard({
  project,
  visible,
  index,
}: {
  project: (typeof PROJECTS)[number];
  visible: boolean;
  index: number;
}) {
  const delay = index * 75;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        cursor:    "pointer",
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms,
                     box-shadow 0.35s ease`,
        boxShadow: hovered
          ? "0 28px 70px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.12)"
          : "0 4px 20px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full h-[240px] sm:h-[290px] lg:h-[320px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.src}
          alt={project.title}
          style={{
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            display:    "block",
            transform:  hovered ? "scale(1.09)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(.23,1,.32,1)",
          }}
        />
      </div>

      <div
        className="absolute top-3 left-3 z-10"
        style={{
          opacity:    visible ? 1 : 0,
          transition: `opacity 0.4s ease ${delay + 300}ms`,
        }}
      >
        <span
          className="text-xs font-bold tracking-wide px-3 py-1.5 rounded-full"
          style={{
            background:  "rgba(255,255,255,0.92)",
            color:       BLUE,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {project.category}
        </span>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(5,5,15,0.82) 0%, rgba(5,5,15,0.25) 45%, transparent 75%)",
          opacity:    hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none"
        style={{
          transform:  hovered ? "translateY(0)"   : "translateY(10px)",
          opacity:    hovered ? 1                 : 0,
          transition: "transform 0.4s cubic-bezier(.23,1,.32,1), opacity 0.35s ease",
        }}
      >
        <p
          className="font-bold leading-snug mb-1"
          style={{
            color:      "#fff",
            fontSize:   "clamp(14px, 1.2vw, 16px)",
            fontFamily: "var(--font-jakarta, sans-serif)",
          }}
        >
          {project.title}
        </p>
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          View Project <span style={{ fontSize: 13 }}>→</span>
        </span>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none"
        style={{
          background:  BLUE,
          transform:   hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition:  "transform 0.45s cubic-bezier(.23,1,.32,1)",
        }}
      />
    </div>
  );
}

export function WorkSection() {
  const sectionRef              = useRef<HTMLElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [headerIn, setHeaderIn] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

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
      id="work"
      ref={sectionRef}
      data-navbar-theme="light"
      className="bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto px-5 sm:px-8 lg:px-10" style={{ maxWidth: 1280 }}>

        <div
          className="text-center mb-12 sm:mb-16"
          style={{
            opacity:    headerIn ? 1 : 0,
            transform:  headerIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: BLUE }}
          >
            Portfolio
          </p>

          <h2
            className="font-extrabold"
            style={{
              fontSize:      "clamp(28px, 4.5vw, 56px)",
              lineHeight:    1.1,
              letterSpacing: "-1.5px",
              color:         "#0d0d0d",
              fontFamily:    "var(--font-jakarta, sans-serif)",
            }}
          >
            UI/UX, Branding &amp;{" "}
            <span
              style={{
                color:          BLUE,
                textDecoration: "underline",
                textDecorationColor: `${BLUE}40`,
                textUnderlineOffset: "6px",
              }}
            >
              Motion Design Work
            </span>
          </h2>

          <p
            className="text-[15px] leading-relaxed mx-auto mt-5"
            style={{
              color:      "#64748b",
              maxWidth:   480,
              opacity:    headerIn ? 1 : 0,
              transform:  headerIn ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            A hand-picked look at branding, UI/UX, motion, and social work that
            moved real businesses forward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              visible={visible}
              index={i}
            />
          ))}
        </div>

        <div
          className="flex justify-center mt-12 sm:mt-16"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 700ms, transform 0.6s ease 700ms",
          }}
        >
          <a
            href="#"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="inline-flex items-center gap-2.5 text-[15px] font-semibold"
            style={{
              color:        btnHover ? "#fff"  : BLUE,
              background:   btnHover ? BLUE    : "transparent",
              border:       `2px solid ${BLUE}`,
              padding:      "13px 32px",
              borderRadius: 9,
              textDecoration: "none",
              transition:   "background 0.22s ease, color 0.22s ease, transform 0.18s ease, box-shadow 0.22s ease",
              transform:    btnHover ? "translateY(-2px)" : "translateY(0)",
              boxShadow:    btnHover ? `0 8px 28px ${BLUE}55` : "none",
            }}
          >
            See All Our Work
            <span
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          26,
                height:         26,
                borderRadius:   "50%",
                background:     btnHover ? "rgba(255,255,255,0.2)" : `${BLUE}18`,
                fontSize:       14,
                transition:     "transform 0.2s ease, background 0.22s ease",
                transform:      btnHover ? "translateX(3px)" : "translateX(0)",
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
