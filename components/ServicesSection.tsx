"use client";

import { useState } from "react";

/* ─── Data ───────────────────────────────────────────────────────────────── */
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
type Slot = "topLeft" | "topRight" | "center";

const ICONS: Record<ServiceId, string> = {
  digital:  "/icons/icon-marketing.png",
  software: "/icons/icon-software.png",
  design:   "/icons/icon-design.png",
};

/* Short two-line labels for each service */
const NODE_LABEL: Record<ServiceId, [string, string]> = {
  digital:  ["Digital", "Marketing"],
  software: ["Software & Tech", "Solutions"],
  design:   ["Design", "Lab"],
};

/* ─── Per-slot absolute CSS position (top-left of the 88 × 88 node) ─────── */
const SLOT_POS: Record<Slot, React.CSSProperties> = {
  topLeft:  { left: "calc(17% - 44px)", top:   0  },
  topRight: { left: "calc(83% - 44px)", top:   0  },
  center:   { left: "calc(50% - 44px)", top: 104  },
};

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function ServicesSection() {
  /* assignment: which service sits in which slot */
  const [assign, setAssign] = useState<Record<Slot, ServiceId>>({
    center:   "digital",
    topLeft:  "software",
    topRight: "design",
  });
  const [activeItem, setActiveItem] = useState(2);

  const activeService = SERVICES.find(s => s.id === assign.center)!;

  /* Return the slot that currently holds a given service */
  function slotOf(id: ServiceId): Slot {
    return (Object.entries(assign) as [Slot, ServiceId][])
      .find(([, sid]) => sid === id)![0];
  }

  /* Rotate the triangle so the clicked service comes to the centre */
  function handleClick(id: ServiceId) {
    if (slotOf(id) === "center") return;
    setActiveItem(0);
    if (slotOf(id) === "topLeft") {
      /* CW step: topLeft→center, center→topRight, topRight→topLeft */
      setAssign({ center: assign.topLeft, topRight: assign.center, topLeft: assign.topRight });
    } else {
      /* CCW step: topRight→center, center→topLeft, topLeft→topRight */
      setAssign({ center: assign.topRight, topLeft: assign.center, topRight: assign.topLeft });
    }
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
        <div style={{ position: "relative", height: 210, margin: "0 auto", zIndex: 10, overflow: "visible" }}>

          {/* Dashed connecting lines */}
          <svg
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: 240,
              overflow: "visible", zIndex: 1, pointerEvents: "none",
            }}
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
          >
            <line x1="205" y1="44" x2="995" y2="44"
              stroke="rgba(100,210,255,0.28)" strokeWidth="1.5" strokeDasharray="7 5" />
            <line x1="205" y1="44" x2="600" y2="148"
              stroke="rgba(100,210,255,0.28)" strokeWidth="1.5" strokeDasharray="7 5" />
            <line x1="995" y1="44" x2="600" y2="148"
              stroke="rgba(100,210,255,0.28)" strokeWidth="1.5" strokeDasharray="7 5" />
          </svg>

          {/* ── Animated nodes — label travels with each node ── */}
          {(["digital", "software", "design"] as ServiceId[]).map(id => {
            const slot     = slotOf(id);
            const isActive = slot === "center";
            const pos      = SLOT_POS[slot];

            return (
              <div
                key={id}
                style={{
                  position: "absolute",
                  width: 88, height: 88,
                  zIndex: isActive ? 20 : 5,
                  overflow: "visible",
                  transition:
                    "left 0.52s cubic-bezier(0.4,0,0.2,1)," +
                    "top  0.52s cubic-bezier(0.4,0,0.2,1)",
                  ...pos,
                }}
              >
                {/* Label always floats above the circle and moves with it */}
                <div style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%", transform: "translateX(-50%)",
                  textAlign: "center",
                  fontSize: 11.5, fontWeight: 600, color: "#7090b8",
                  lineHeight: 1.4, whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}>
                  {NODE_LABEL[id][0]}<br />{NODE_LABEL[id][1]}
                </div>

                <button
                  onClick={() => handleClick(id)}
                  style={{
                    width: "100%", height: "100%",
                    borderRadius: "50%", padding: 0, outline: "none",
                    overflow: "hidden", cursor: isActive ? "default" : "pointer",
                    display: "grid", placeItems: "center",
                    background: isActive
                      ? "radial-gradient(circle at 40% 40%, rgba(180,220,255,0.98), rgba(210,235,255,0.94))"
                      : "radial-gradient(circle at 40% 40%, rgba(230,242,255,0.97), rgba(255,255,255,0.93))",
                    border: `3.5px solid ${isActive ? "#00d4ff" : "#10d0f0"}`,
                    boxShadow: isActive
                      ? "0 0 0 6px rgba(0,212,255,0.18), 0 6px 30px rgba(0,212,255,0.3)"
                      : "0 2px 14px rgba(0,0,0,0.22)",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                    transition: "border-color 0.35s, box-shadow 0.35s, transform 0.35s",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ICONS[id]}
                    alt={id}
                    draggable={false}
                    style={{ width: 74, height: 74, objectFit: "contain" }}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Service panel ── */}
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
          {/* LEFT: service list */}
          <div style={{
            padding: "40px 24px 40px 72px",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <h3 style={{
              fontSize: 18, fontWeight: 800, margin: "0 0 14px",
              fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
              color: "#eef4ff", letterSpacing: "-0.25px",
            }}>
              {activeService.label}
            </h3>

            <ul style={{
              listStyle: "none", margin: 0, padding: 0,
              display: "flex", flexDirection: "column", gap: 2, flex: 1,
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

          {/* RIGHT: dashboard screenshot */}
          <div style={{
            position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            padding: "20px 30px", background: "transparent",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rectangle-52.png"
              alt="Social Media Dashboard"
              draggable={false}
              style={{
                width: "calc(78% - 18px)", height: "auto", display: "block",
                borderRadius: 10, boxShadow: "0 8px 40px rgba(0,0,60,0.5)",
                position: "relative", zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:760px){
          .svc-panel{ grid-template-columns: 1fr !important; }
          .svc-panel > div:first-child{
            border-right: none !important;
            border-bottom: 1px solid rgba(0,200,255,0.09);
            padding-top: 64px !important;
          }
          .svc-panel > div:last-child{
            min-height: 240px !important; padding: 16px !important;
            justify-content: center !important;
          }
          .svc-panel > div:last-child img{ width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
