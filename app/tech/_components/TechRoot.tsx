"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { techHtml } from "./tech-content";
import { setupTechEffects } from "./tech-effects";
import Navbar from "@/components/navbar/Navbar";
import Contact from "@/app/media/_components/sections/Contact";
import Footer from "@/components/footer/Footer";
import TechTestimonialsSection from "./TechTestimonialsSection";
import "@/app/media/media.css";
import "../tech.css";

export default function TechRoot() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mountEl, setMountEl] = useState<Element | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    setMountEl(document.getElementById("tech-reviews-mount"));
    return setupTechEffects(root);
  }, []);

  return (
    <>
      <Navbar />
      <div
        id="tech-root"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: techHtml }}
      />
      {mountEl && createPortal(<TechTestimonialsSection />, mountEl)}
      <div style={{ background: "linear-gradient(180deg, #0c1e40 0%, #060f28 40%, #020a1c 100%)", paddingTop: 80 }}>
        <Contact />
      </div>
      <Footer variant="tech" />
    </>
  );
}
