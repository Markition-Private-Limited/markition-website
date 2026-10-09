"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { TheProblem } from "./TheProblem";
import { SphenoSystem } from "./SphenoSystem";
import { SphenoProducts } from "./SphenoProducts";
import { AiWorkforce } from "./AiWorkforce";
import { Industries } from "./Industries";
import { TalkThinkAct } from "./TalkThinkAct";
import { WhySpheno } from "./WhySpheno";
import { SphenoTestimonials } from "./SphenoTestimonials";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { ConsultationModal } from "./ConsultationModal";

export default function SphenoApp() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C42] text-slate-100 selection:bg-[#0018C5] selection:text-white">
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main>
        <div className="flex flex-col min-h-screen">
          <Hero onOpenConsultation={() => setConsultationOpen(true)} />
          <Marquee />
        </div>

        <TheProblem />
        <SphenoSystem />
        <SphenoProducts />
        <AiWorkforce />
        <Industries />
        <TalkThinkAct />
        <WhySpheno />
        <SphenoTestimonials />
        <Faq />
        <FinalCta onOpenConsultation={() => setConsultationOpen(true)} />
        <ContactSection />
      </main>

      <Footer />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
