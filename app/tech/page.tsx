import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";

import { HeroSection } from "@/app/techv2/_components/HeroSection";
import { AboutSection } from "@/app/techv2/_components/AboutSection";
import { ServicesSection } from "@/app/techv2/_components/ServicesSection";
import { PortfolioSection } from "@/app/techv2/_components/PortfolioSection";
import { ProcessSection } from "@/app/techv2/_components/ProcessSection";
import { WhySection } from "@/app/techv2/_components/WhySection";
import { CtaBandSection } from "@/app/techv2/_components/CtaBandSection";
import { TechStackSection } from "@/app/techv2/_components/TechStackSection";
import { CaseStudySection } from "@/app/techv2/_components/CaseStudySection";
import { ProjectsSection } from "@/app/techv2/_components/ProjectsSection";
import { StatsSection } from "@/app/techv2/_components/StatsSection";
import { InstagramSection } from "@/app/techv2/_components/InstagramSection";
import { BlogSection } from "@/app/techv2/_components/BlogSection";
import { TestimonialsSection } from "@/app/techv2/_components/TestimonialsSection";
import { FinalCtaSection } from "@/app/techv2/_components/FinalCtaSection";
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

export default function TechPage() {
  return (
    <div className="bg-[#fbfbfb] text-[#111827] antialiased font-sans text-base leading-relaxed">
      <Navbar />

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <WhySection />
      <CtaBandSection />
      <TechStackSection />
      <CaseStudySection />
      <ProjectsSection />
      <StatsSection />
      <InstagramSection />
      <BlogSection />
      <TestimonialsSection />
      <FinalCtaSection />

      <div style={{ background: "#020a1c" }}>
        <Contact />
      </div>

      <Footer variant="tech" />
    </div>
  );
}
