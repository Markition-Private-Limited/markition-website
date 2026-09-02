"use client";

import { useState } from "react";

const SERVICES = [
  {
    id: "digital",
    label: "Digital Marketing",
    items: [
      "Google Ads",
      "Social Media Marketing",
      "Social Media Page Management",
      "Search Engine Optimization (SEO)",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
    ],
  },
  {
    id: "software",
    label: "Software & Tech Solutions",
    items: [
      "Custom Web Development",
      "Mobile App Development",
      "SaaS Platform Development",
      "API Integration & Automation",
      "Cloud Infrastructure Setup",
      "AI-Powered Software Solutions",
    ],
  },
  {
    id: "design",
    label: "Design Lab",
    items: [
      "Brand Identity & Logo Design",
      "UI/UX Design",
      "Website & App Design",
      "Marketing Collateral Design",
      "Motion Graphics & Video",
      "Product Packaging Design",
    ],
  },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

/* ─── Icon SVGs ──────────────────────────────────────────────────────────── */

function SoftwareIcon() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
      <rect x="4" y="7" width="32" height="22" rx="2.5" stroke="#1a2f80" strokeWidth="1.9"/>
      <path d="M4 12h32" stroke="#1a2f80" strokeWidth="1.5"/>
      <path d="M14 22l-4 3.5 4 3.5M26 22l4 3.5-4 3.5" stroke="#1a2f80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 29l4-10" stroke="#1a2f80" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M20 29v4M14 33h12" stroke="#1a2f80" strokeWidth="1.7" strokeLinecap="round"/>
      {/* Gear */}
      <circle cx="40" cy="11" r="7.5" fill="#ddeeff" stroke="#a0c8ff" strokeWidth="1"/>
      <circle cx="40" cy="11" r="3" stroke="#1a3a9f" strokeWidth="1.4"/>
      <path d="M40 5.5v1.5M40 15v1.5M33.5 11H35M45 11h1.5M35.8 7.3l1 1M44.2 14.7l-1-1M35.8 14.7l1-1M44.2 7.3l-1 1" stroke="#1a3a9f" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Signal lines */}
      <path d="M34 18l5 2.5M34 21l5-2.5" stroke="#3a7aff" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
      <rect x="3" y="6" width="42" height="28" rx="2.5" stroke="#1a2f80" strokeWidth="1.9"/>
      <path d="M3 11h42" stroke="#1a2f80" strokeWidth="1.5"/>
      <path d="M24 38v5M18 43h12" stroke="#1a2f80" strokeWidth="1.7" strokeLinecap="round"/>
      {/* Gauge circle */}
      <circle cx="22" cy="24" r="8" stroke="#1a2f80" strokeWidth="1.5"/>
      <path d="M22 24L22 17" stroke="#1a2f80" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 24L28 27.5" stroke="#1a2f80" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 16a8 8 0 016 11" stroke="#3a7aff" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="22" cy="24" r="2" fill="#1a2f80"/>
      {/* Pencil top-right */}
      <path d="M38 14l4-4 2 2-4 4z" fill="#1a2f80"/>
      <path d="M38 14l-2 5 5-2z" fill="#3a7aff"/>
    </svg>
  );
}

function MarketingIcon() {
  return (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
      {/* Megaphone */}
      <path d="M9 19h11l11-7v22l-11-7H9z" stroke="white" strokeWidth="1.9" strokeLinejoin="round"/>
      <rect x="5" y="19" width="7" height="10" rx="1.5" stroke="white" strokeWidth="1.7"/>
      {/* Sound arc */}
      <path d="M31 19a6.5 6.5 0 010 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Chat bubble top-right */}
      <rect x="33" y="7" width="12" height="8" rx="2.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4"/>
      <path d="M37 11h4" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M35 15l-2 3 5-1.5z" fill="rgba(255,255,255,0.7)"/>
      {/* Play triangle in chat */}
      <path d="M35 10.5l3 1.5-3 1.5z" fill="rgba(255,255,255,0.85)"/>
      {/* Envelope bottom */}
      <rect x="33" y="33" width="12" height="8" rx="2" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4"/>
      <path d="M33 34.5l6 4 6-4" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Reusable node circle ───────────────────────────────────────────────── */

function TopNode({
  icon,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 82, height: 82, borderRadius: "50%", flexShrink: 0,
        background: isActive ? "rgba(220,240,255,0.95)" : "rgba(255,255,255,0.92)",
        border: `3.5px solid ${isActive ? "#00d4ff" : "#10d0f0"}`,
        boxShadow: isActive ? "0 0 0 5px rgba(0,212,255,0.15), 0 4px 24px rgba(0,212,255,0.25)" : "0 2px 12px rgba(0,0,0,0.25)",
        display: "grid", placeItems: "center",
        cursor: "pointer", transition: "all .25s",
        padding: 0,
        outline: "none",
      }}
    >
      {icon}
    </button>
  );
}

function CenterNode({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 90, height: 90, borderRadius: "50%",
        background: isActive
          ? "linear-gradient(145deg,#1a3fcc 0%,#2244ee 50%,#1a3faa 100%)"
          : "linear-gradient(145deg,#152d99 0%,#1a38cc 100%)",
        border: `3px solid ${isActive ? "#2255ff" : "#1a3acc"}`,
        boxShadow: isActive
          ? "0 0 0 5px rgba(34,68,238,0.25), 0 0 36px rgba(34,68,238,0.5), 0 8px 32px rgba(0,0,60,0.5)"
          : "0 0 0 4px rgba(34,68,238,0.15), 0 6px 24px rgba(0,0,60,0.4)",
        display: "grid", placeItems: "center",
        cursor: "pointer", transition: "all .25s",
        padding: 0, outline: "none",
      }}
    >
      <MarketingIcon />
    </button>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function ServicesSection() {
  const [active, setActive] = useState<ServiceId>("digital");
  const [activeItem, setActiveItem] = useState(2);
  const activeService = SERVICES.find((s) => s.id === active)!;

  function switchTo(id: ServiceId) {
    setActive(id);
    setActiveItem(0);
  }

  return (
    <section
      style={{
        background: "#000028",
        padding: "68px 24px 80px",
        fontFamily: "var(--font-inter, Inter, sans-serif)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={{
            fontSize: 11.5, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#2f78ff", margin: "0 0 10px",
          }}>
            Our Services
          </p>
          <h2 style={{
            margin: "0 auto 14px", maxWidth: 680,
            fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.12,
            letterSpacing: "-1.4px", fontWeight: 800,
            fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
            color: "#f0f6ff",
          }}>
            Built To Drive Measurable{" "}
            <span style={{ color: "#00d4ff" }}>Digital Growth</span>
          </h2>
          <p style={{
            margin: "0 auto", maxWidth: 580, color: "#64809e",
            fontSize: 14, lineHeight: 1.78,
          }}>
            Our integrated digital marketing, SEO, web development, software development,
            and AI automation solutions are designed to strengthen your online presence,
            generate qualified leads, and turn digital investments into measurable business growth.
          </p>
        </div>

        {/* ── Node diagram ── */}
        {/*
          Layout: two top nodes + center node forming a downward triangle.
          The center node sits at the panel's top edge (half above, half below).
          We use position:absolute for nodes; the SVG draws connecting dashed lines.
          The node wrapper height = distance from top of top-nodes to center node top edge.
          Center node: bottom: -45px → its center aligns with the panel's top border.
        */}
        <div
          style={{
            position: "relative",
            height: 148,
            margin: "0 auto",       /* matches panel width (constrained by outer 1060px div) */
            zIndex: 10,
          }}
        >
          {/* Connecting dashed lines
              Node area is 1060px wide (same as outer div).
              Left node: left:4% = 42px, label≈90px, gap=12, circle=82 → circle center x≈185
              Right node: right:4% = 42px from right, circle center x≈875
              Center node: left:50% → center x=530
              Top nodes center y=41 (top:0 + 82px/2). Center node center y=148 (panel top).
          */}
          <svg
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: 230,
              overflow: "visible",
              zIndex: 1,
              pointerEvents: "none",
            }}
            viewBox="0 0 1200 230"
            preserveAspectRatio="none"
          >
            <line x1="205" y1="41" x2="995" y2="41"
              stroke="rgba(100,210,255,0.28)" strokeWidth="1.5" strokeDasharray="7 5"/>
            <line x1="205" y1="41" x2="600" y2="148"
              stroke="rgba(100,210,255,0.28)" strokeWidth="1.5" strokeDasharray="7 5"/>
            <line x1="995" y1="41" x2="600" y2="148"
              stroke="rgba(100,210,255,0.28)" strokeWidth="1.5" strokeDasharray="7 5"/>
          </svg>

          {/* Top-left: Software & Tech Solutions */}
          <div style={{
            position: "absolute", left: "4%", top: 0,
            display: "flex", alignItems: "center", gap: 12,
            zIndex: 5,
          }}>
            <div style={{
              textAlign: "right", fontSize: 12, fontWeight: 600,
              color: "#7090b8", lineHeight: 1.4, whiteSpace: "nowrap",
            }}>
              Software &amp; Tech<br />Solutions
            </div>
            <TopNode
              icon={<SoftwareIcon />}
              isActive={active === "software"}
              onClick={() => switchTo("software")}
            />
          </div>

          {/* Top-right: Design Lab */}
          <div style={{
            position: "absolute", right: "10%", top: 0,
            display: "flex", alignItems: "center", gap: 12,
            zIndex: 5,
          }}>
            <TopNode
              icon={<DesignIcon />}
              isActive={active === "design"}
              onClick={() => switchTo("design")}
            />
            <div style={{
              fontSize: 12, fontWeight: 600,
              color: "#7090b8", lineHeight: 1.4,
            }}>
              Design<br />Lab
            </div>
          </div>

          {/* "Digital Marketing" label — floats above center node */}
          <div style={{
            position: "absolute",
            left: "50%", transform: "translateX(-50%)",
            top: 88,                /* above the center node which starts at ~103px */
            fontSize: 12, fontWeight: 600, color: "#7090b8",
            whiteSpace: "nowrap",
            zIndex: 6,
          }}>
            Digital Marketing
          </div>

          {/* Bottom-center: Digital Marketing node
              bottom: -45px → bottom edge 45px below wrapper → center at wrapper bottom (148px) →
              half of the 90px circle (45px) sits inside the panel */}
          <div style={{
            position: "absolute",
            left: "50%", bottom: -45,
            transform: "translateX(-50%)",
            zIndex: 20,
          }}>
            <CenterNode
              isActive={active === "digital"}
              onClick={() => switchTo("digital")}
            />
          </div>
        </div>

        {/* ── Main service panel ──
            Sits directly below the node diagram in normal flow.
            The center node (bottom: -45px on the wrapper above) visually overlaps
            the top of this panel by 45px. paddingTop on the left column clears it. */}
        <div
          className="svc-panel"
          style={{
            background: "#010424",
            border: "1px solid rgba(0,200,255,0.2)",
            borderRadius: 18,
            boxShadow:
              "0 0 0 1px rgba(0,200,255,0.06)," +
              "0 0 50px rgba(0,180,255,0.06)," +
              "0 24px 80px rgba(0,0,40,0.65)",
            display: "grid",
            gridTemplateColumns: "400px 1fr",
            overflow: "hidden",
            minHeight: 340,
          }}
        >
          {/* ── LEFT: service list ── */}
          <div style={{
            padding: "40px 24px 40px 72px",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            {/* Service label */}
            <h3 style={{
              fontSize: 18, fontWeight: 800, margin: "0 0 14px",
              fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
              color: "#eef4ff", letterSpacing: "-0.25px",
            }}>
              {activeService.label}
            </h3>

            {/* Service list */}
            <ul style={{
              listStyle: "none", margin: 0, padding: 0,
              display: "flex", flexDirection: "column", gap: 2,
              flex: 1,
            }}>
              {activeService.items.map((item, i) => {
                const sel = i === activeItem;
                return (
                  <li
                    key={i}
                    onClick={() => setActiveItem(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 20px", borderRadius: 8, cursor: "pointer",
                      /* Blue→transparent gradient matching Group 48 */
                      background: sel
                        ? "linear-gradient(90deg,rgba(30,90,255,0.88) 0%,rgba(30,90,255,0) 100%)"
                        : "transparent",
                      color: sel ? "#ffffff" : "#6a88aa",
                      fontSize: 13.5, fontWeight: sel ? 600 : 400,
                      transition: "all .18s",
                    }}
                  >
                    <span style={{
                      width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                      background: sel ? "#fff" : "#1e4a7a",
                      transition: "background .18s",
                    }} />
                    {item}
                  </li>
                );
              })}
            </ul>

            {/* Button */}
            <button
              style={{
                marginTop: 22,
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 8, padding: "10px 20px",
                background: "transparent", color: "#c0d4ee",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                width: "fit-content", transition: "border-color .2s, color .2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,212,255,0.5)";
                (e.currentTarget as HTMLButtonElement).style.color = "#00d4ff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLButtonElement).style.color = "#c0d4ee";
              }}
            >
              Explore All Services →
            </button>
          </div>

          {/* ── RIGHT: dashboard screenshot ── */}
          <div style={{
            position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            padding: "20px 30px",
            background: "transparent",
          }}>

            {/* Dashboard image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rectangle-52.png"
              alt="Social Media Dashboard"
              style={{
                width: "calc(78% - 18px)",
                height: "auto",
                display: "block",
                borderRadius: 10,
                boxShadow: "0 8px 40px rgba(0,0,60,0.5)",
                position: "relative", zIndex: 1,
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:760px){
          .svc-panel{
            grid-template-columns: 1fr !important;
          }
          .svc-panel > div:first-child{
            border-right: none !important;
            border-bottom: 1px solid rgba(0,200,255,0.09);
            padding-top: 64px !important;
          }
          .svc-panel > div:last-child{
            min-height: 240px !important;
            padding: 16px !important;
            justify-content: center !important;
          }
          .svc-panel > div:last-child img{
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
