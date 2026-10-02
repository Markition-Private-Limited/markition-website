"use client";

import { useEffect, useRef, useState } from "react";

const TABS = [
  "ALL PROJECTS",
  "AI SOLUTIONS",
  "WEB PLATFORMS",
  "MOBILE APPS",
  "DIGITAL MARKETING",
  "Brand Experiences",
];

interface Project {
  id: number;
  src: string;
  alt: string;
  tags: string[];
  col: "left" | "right";
  category?: string;
  title?: string;
}

const PROJECTS: Project[] = [
  // ── Left column ────────────────────────────────────────────────
  {
    id: 1,
    src: "/assets/our-projects/img.png",
    alt: "Aura Brand Identity",
    tags: ["ALL PROJECTS", "Brand Experiences"],
    col: "left",
    category: "Graphic Design",
    title: "Aura Branding Design",
  },
  {
    id: 3,
    src: "/assets/our-projects/Img (1).png",
    alt: "Web Platform Design",
    tags: ["ALL PROJECTS", "Brand Experiences", "WEB PLATFORMS"],
    col: "left",
    category: "Web Development",
    title: "Gradient Platform",
  },
  
  // ── Right column (offset lower via marginTop on the column) ───
  {
    id: 2,
    src: "/assets/our-projects/Img66.png",
    alt: "AB.S Snack Package Mockup",
    tags: ["ALL PROJECTS", "Brand Experiences"],
    col: "right",
    category: "Graphic Design",
    title: "AB.S Snack Packaging",
  },
  {
    id: 4,
    src: "/assets/our-projects/Img (2).png",
    alt: "Magazine Mockup",
    tags: ["ALL PROJECTS", "Brand Experiences"],
    col: "right",
    category: "Content Writing",
    title: "Magazine Content Writing",
  },
];

function ProjectCard({
  p,
  addFade,
  col,
  delay,
}: {
  p: Project;
  addFade: boolean;
  col: "left" | "right";
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgShift, setImgShift] = useState(0);

  // Fade-in/out on every scroll pass (no disconnect — resets when leaving viewport)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax X — handlers attached only to the image wrapper
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const ratio = (e.clientX - cx) / (rect.width / 2);
    setImgShift(ratio * 12);
  }
  function handleMouseLeave() { setImgShift(0); }

  // Left col slides in from left, right col from right
  const xOffset = col === "left" ? -36 : 36;
  const hiddenTransform = `translateX(${xOffset}px) translateY(24px) scale(0.97)`;
  const visibleTransform = "translateX(0) translateY(0) scale(1)";

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? visibleTransform : hiddenTransform,
        transition: `opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Image wrapper — parallax + clip live here only */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative", lineHeight: 0, overflow: "hidden", borderRadius: 16 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.src}
          alt={p.alt}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            transform: `translateX(${imgShift}px) scale(1.04)`,
            transition: imgShift === 0 ? "transform 0.6s ease" : "transform 0.15s ease",
            willChange: "transform",
          }}
          draggable={false}
        />
        {addFade && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "55%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,40,0.9) 100%)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Text label — fully static, outside the hover zone */}
      {p.category && p.title && (
        <div style={{ padding: "14px 4px 8px" }}>
          <p
            style={{
              fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.01em",
              marginBottom: 4,
            }}
          >
            {p.category}
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              fontSize: 18,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            {p.title}
          </p>
        </div>
      )}
    </div>
  );
}

export default function OurWorkSection() {
  const [activeTab, setActiveTab] = useState("Brand Experiences");

  const filtered = PROJECTS.filter((p) => p.tags.includes(activeTab));
  const leftCol = filtered.filter((p) => p.col === "left");
  const rightCol = filtered.filter((p) => p.col === "right");

  // bottom-row items (index > 0 within their column) get the fade overlay
  return (
    <section style={{ background: "#000028", position: "relative" }}>
      {/* ── Heading + tabs ─────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 16px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            marginBottom: 48,
          }}
        >
          Our Work Speaks{" "}
          <span style={{ color: "#22C5F5" }}>For Itself</span>
        </h2>

        {/* Filter tab bar */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "5px 6px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {TABS.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  background: active ? "#14204a" : "transparent",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.45)",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Masonry image grid ──────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              alignItems: "start",
            }}
          >
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {leftCol.map((p, idx) => (
                <ProjectCard key={p.id} p={p} addFade={idx > 0} col="left" delay={idx * 0.15} />
              ))}
            </div>

            {/* Right column — aligned to top, same start as left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {rightCol.map((p, idx) => (
                <ProjectCard key={p.id} p={p} addFade={idx > 0} col="right" delay={idx * 0.15 + 0.1} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px",
            color: "#475569",
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontSize: 16,
          }}
        >
          Projects coming soon.
        </div>
      )}

      {/* bottom spacing — matches py-12 sm:py-16 lg:py-24 of other sections */}
      <div style={{ height: 96 }} />
    </section>
  );
}
