import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";

import { HeroSection } from "./_components/HeroSection";
import { AboutSection } from "./_components/AboutSection";
import { ServicesSection } from "./_components/ServicesSection";
import { PortfolioSection } from "./_components/PortfolioSection";
import { ProcessSection } from "./_components/ProcessSection";
import { WhySection } from "./_components/WhySection";
import { CtaBandSection } from "./_components/CtaBandSection";
import { TechStackSection } from "./_components/TechStackSection";
import { CaseStudySection } from "./_components/CaseStudySection";
import { ProjectsSection } from "./_components/ProjectsSection";
import { StatsSection } from "./_components/StatsSection";
import { InstagramSection } from "./_components/InstagramSection";
import { BlogSection } from "./_components/BlogSection";
import { TestimonialsSection } from "./_components/TestimonialsSection";
import { FinalCtaSection } from "./_components/FinalCtaSection";
import Contact from "@/app/media/_components/sections/Contact";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Custom Software Development Company | Markition Tech",
  description:
    "Markition Tech is a custom software development company building websites, CRM dashboards, and ERP systems on React, Next.js, WordPress, and Shopify.",
  alternates: {
    canonical: "https://markition.com/tech",
  },
  openGraph: {
    title: "Custom Software Development Company | Markition Tech",
    description:
      "Markition Tech is a custom software development company building websites, CRM dashboards, and ERP systems on React, Next.js, WordPress, and Shopify.",
    url: "https://markition.com/tech",
    siteName: "Markition Tech",
  },
};

export default function TechV2Page() {
  return (
    <div className="bg-[#fbfbfb] text-[#111827] antialiased font-sans text-base leading-relaxed">
      <Navbar />

      {/* Hero — interactive 12x8 grid background with staggered heading */}
      <HeroSection />

      {/* About — white card with stats counters */}
      <AboutSection />

      {/* Services — FO-01..04 service cards */}
      <ServicesSection />

      {/* Portfolio — numbered project slider/grid */}
      <PortfolioSection />

      {/* Process — 6-step numbered process */}
      <ProcessSection />

      {/* Why Us — 6 feature cards */}
      <WhySection />

      {/* CTA Band — dark band with phone capture form */}
      <CtaBandSection />

      {/* Tech Stack — 4-category technology grid */}
      <TechStackSection />

      {/* Case Study — AimScholar featured case study */}
      <CaseStudySection />

      {/* Projects — exceptional projects grid */}
      <ProjectsSection />

      {/* Stats — dark background counters */}
      <StatsSection />

      {/* Instagram — social proof grid */}
      <InstagramSection />

      {/* Blog — featured blog posts */}
      <BlogSection />

      {/* Testimonials — dark section with testimonial cards */}
      <TestimonialsSection />

      {/* Final CTA — black card with project start CTA */}
      <FinalCtaSection />

      {/* Contact — "Let's Build Something Great" form */}
      <div style={{ background: "#000028" }}>
        <Contact />
      </div>

      <Footer variant="tech" />
    </div>
  );
}
