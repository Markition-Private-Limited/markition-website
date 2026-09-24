import type { Metadata } from "next";
import { HeroSection } from "./_components/sections/hero/HeroSection";
import { PhilosophySection } from "./_components/sections/philosophy/PhilosophySection";
import { TickerSection } from "./_components/sections/ticker/TickerSection";
import { ShowcaseSection } from "./_components/sections/showcase/ShowcaseSection";
import { WorkSection } from "./_components/sections/work/WorkSection";
import { IndustriesSection } from "./_components/sections/industries/IndustriesSection";
import { ProcessSection } from "./_components/sections/process/ProcessSection";
import { ToolsSection } from "./_components/sections/tools/ToolsSection";
import { WhySection } from "./_components/sections/why/WhySection";
import { TestimonialsSection } from "./_components/sections/testimonials/TestimonialsSection";
import { CtaSection } from "./_components/sections/cta/CtaSection";

export const metadata: Metadata = {
  title: "Design Lab | Markition",
  description: "Markition DesignLab — where brands get designed, refined, and amplified.",
};

export default function DesignLabPage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <TickerSection />
      <ShowcaseSection />
      <WorkSection />
      <IndustriesSection />
      <ProcessSection />
      <ToolsSection />
      <WhySection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
