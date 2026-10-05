"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, Users, FileText, Award, MousePointer, Layers } from "lucide-react";

const leftItems = [
  {
    icon: CalendarDays,
    title: "Time to Launch",
    desc: "AIMScholar was planned, designed and launched within 8 weeks.",
    stat: "8 Weeks",
  },
  {
    icon: Users,
    title: "Registered Students",
    desc: "A growing community of students preparing for competitive entrance exams.",
    stat: "1000+",
  },
  {
    icon: FileText,
    title: "Active Exams",
    desc: "Students can practice and compete through a wide range of live and upcoming mock exams.",
    stat: "50+",
  },
];

const rightItems = [
  {
    icon: Award,
    title: "Scholarship Exams",
    desc: "Competitive exams with rank-based scholarship opportunities for top-performing students.",
    stat: "25+",
  },
  {
    icon: MousePointer,
    title: "Exam Attempts",
    desc: "Thousands of mock exams attempted by students to improve their preparation and performance.",
    stat: "7000+",
  },
  {
    icon: Layers,
    title: "Tech Stack",
    desc: "Built with React, Node.js, PostgreSQL, Prisma, Express and modern web technologies.",
    stat: "Modern",
  },
];

type Screen = "home" | "airport" | "one-way" | "hourly" | "city" | "day";

const screenImages: Record<Screen, string> = {
  home: "/home/whiteline-app.webp",
  "airport": "/home/whiteline-airport.png",
  "one-way": "/home/whiteline-one-way.png",
  hourly: "/home/whiteline-hourly.png",
  city: "/home/whiteline-city.png",
  day: "/home/whiteline-day.png",
};

// Hotspot zones on the home screen (% of inner screen area)
// Based on the layout of whiteline-app.webp
const hotspots: { id: Screen; top: string; left: string; width: string; height: string; label: string }[] = [
  { id: "airport",  top: "33%", left: "3%",  width: "94%", height: "17%", label: "Airport Transfer" },
  { id: "hourly",   top: "51%", left: "3%",  width: "45%", height: "16%", label: "Hourly Chauffeur" },
  { id: "one-way",  top: "51%", left: "52%", width: "45%", height: "16%", label: "One-Way Ride" },
  { id: "city",     top: "68%", left: "3%",  width: "45%", height: "15%", label: "City Trip" },
  { id: "day",      top: "68%", left: "52%", width: "45%", height: "15%", label: "Day Service" },
];

const WHITELINE_URL = "https://whitelineglobal.com/";

export function CaseStudySection() {
  const [screen, setScreen] = useState<Screen>("home");
  const [animating, setAnimating] = useState(false);

  function navigate(to: Screen) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setScreen(to);
      setAnimating(false);
    }, 180);
  }

  return (
    <>
    <style>{`
      .phone-hotspot {
        background: transparent;
        transition: background 0.18s ease, box-shadow 0.18s ease;
      }
      .phone-hotspot:hover {
        background: rgba(255,255,255,0.12);
        box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.25);
      }
      .phone-hotspot:active {
        background: rgba(255,255,255,0.22);
      }
    `}</style>
    <section
      className="bg-transparent py-20 md:py-28 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#062283]">
            Featured Case Study
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#080b3f] md:text-5xl">
            Our modern results
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
            Using strategy, design and technology to build scalable digital products that deliver real business outcomes.
          </p>
        </div>

        <div className="relative mt-16 grid items-start gap-10 lg:grid-cols-[1fr_360px_1fr]">
          {/* Left column */}
          <div className="space-y-10">
            {leftItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-5 text-left lg:flex-row-reverse lg:text-right">
                  <div className="flex size-14 shrink-0 items-center rounded-lg justify-center bg-[#080b3f] text-white">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#080b3f]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{item.desc}</p>
                    <p className="mt-2 text-sm font-bold text-[#062283]">{item.stat}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center — interactive phone mockup */}
          <div className="flex justify-center items-start" style={{ marginTop: "-40px" }}>
            <div
              style={{
                width: 260,
                height: 540,
                borderRadius: 48,
                background: "#111",
                padding: 7,
                boxShadow:
                  "0 0 0 1px #2a2a2a, 0 40px 80px rgba(0,0,0,0.55), 0 10px 20px rgba(0,0,0,0.3)",
                flexShrink: 0,
                position: "relative",
              }}
            >
              {/* Side buttons */}
              <div style={{ position: "absolute", left: -3, top: 90, width: 3, height: 28, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
              <div style={{ position: "absolute", left: -3, top: 128, width: 3, height: 28, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
              <div style={{ position: "absolute", right: -3, top: 110, width: 3, height: 42, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />

              {/* Screen */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 42,
                  overflow: "hidden",
                  background: "#000",
                  position: "relative",
                }}
              >
                {/* Screen image — fades on transition */}
                <div
                  style={{
                    position: "absolute", inset: 0,
                    opacity: animating ? 0 : 1,
                    transition: "opacity 0.18s ease",
                  }}
                >
                  <Image
                    src={screenImages[screen]}
                    alt={screen}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    priority
                  />
                </div>

                {/* Dynamic island */}
                <div
                  style={{
                    position: "absolute", top: 10, left: "50%",
                    transform: "translateX(-50%)",
                    width: 90, height: 22,
                    background: "#111",
                    borderRadius: 12,
                    zIndex: 20,
                    pointerEvents: "none",
                  }}
                />

                {/* Back button — shown on sub-screens */}
                {screen !== "home" && (
                  <button
                    onClick={() => navigate("home")}
                    style={{
                      position: "absolute", top: 42, left: 12,
                      zIndex: 30,
                      width: 28, height: 28,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.85)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 700, color: "#111",
                      backdropFilter: "blur(4px)",
                    }}
                    aria-label="Back to home"
                  >
                    ‹
                  </button>
                )}

                {/* Clickable hotspots over home screen */}
                {screen === "home" && (
                  <>
                    {/* Premium Chauffeur Service banner → external site */}
                    <a
                      href={WHITELINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="phone-hotspot"
                      style={{
                        position: "absolute",
                        top: "11%", left: "3%",
                        width: "94%", height: "19%",
                        display: "block",
                        zIndex: 15,
                        borderRadius: 10,
                        cursor: "pointer",
                      }}
                      aria-label="Open White Line Global"
                    />
                    {/* Service card hotspots */}
                    {hotspots.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => navigate(h.id)}
                        title={h.label}
                        className="phone-hotspot"
                        style={{
                          position: "absolute",
                          top: h.top, left: h.left,
                          width: h.width, height: h.height,
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          zIndex: 15,
                          borderRadius: 10,
                        }}
                        aria-label={`Open ${h.label}`}
                      />
                    ))}
                  </>
                )}

                {/* Home bar */}
                <div
                  style={{
                    position: "absolute", bottom: 6, left: "50%",
                    transform: "translateX(-50%)",
                    width: 90, height: 4, borderRadius: 2,
                    background: "rgba(255,255,255,0.25)", zIndex: 20,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            {rightItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-5 text-left">
                  <div className="flex size-14 shrink-0 items-center rounded-lg justify-center bg-[#080b3f] text-white">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#080b3f]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{item.desc}</p>
                    <p className="mt-2 text-sm font-bold text-[#062283]">{item.stat}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
