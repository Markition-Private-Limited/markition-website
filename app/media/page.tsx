import type { Metadata } from "next";
import Hero from "./_components/sections/Hero";
import HeroShowcase from "./_components/sections/HeroShowcase";
import Ticker from "./_components/sections/Ticker";
import Services from "./_components/sections/Services";
import Growth from "./_components/sections/Growth";
import Process from "./_components/sections/Process";
import Stats from "./_components/sections/Stats";
import Portfolio from "./_components/sections/Portfolio";
import FAQ from "./_components/sections/FAQ";
import Contact from "./_components/sections/Contact";
import Footer from "@/components/footer/Footer";
import MediaEnhancer from "./_components/MediaEnhancer";

export const metadata: Metadata = {
  title: "Full-Service Digital Marketing Agency | Markition Media",
  description: "Markition Media is a full-service digital marketing agency offering SEO, paid ads, social media marketing, and content marketing built to turn traffic into measurable growth.",
};

export default function MediaHomePage() {
  return (
    <>
      <main>
        {/* ── First macro-section: dark-blue gradient, ends after the Lottie ── */}
        <div style={{ background: "linear-gradient(180deg, #010c28 4%, #1964D1 55%, #0d2258 72%, #06163a 82%, #0c1e40 97%)" }}>
          <Hero />
          <HeroShowcase />
          {/* HeroShowcase is a scroll-jacked, JS-measured pin section (5-step
              grow animation) — spacer sibling instead of padding, same
              reasoning as Process/Portfolio below. */}
          <div className="media-gap-spacer" aria-hidden="true" />
          <Ticker />
          <Services />
        </div>
        {/* ── Second macro-section: white, the Growth block ── */}
        <div style={{ background: "#ffffff" }}>
          <Growth />
        </div>
        {/* ── Third macro-section: navy, from Process down into the footer ── */}
        <div style={{ background: "linear-gradient(180deg, #0c1e40 0%, #060f28 40%, #020a1c 100%)" }}>
          {/* <Process /> */}
          {/* <div className="media-gap-spacer" aria-hidden="true" /> */}
          <Stats />
          <Portfolio />
          {/* Portfolio has a fixed pixel height with absolutely-positioned
              children keyed off it — same reasoning, spacer instead of padding. */}
          <div className="media-gap-spacer" aria-hidden="true" />
          <FAQ />
          <Contact />
        </div>
      </main>
      <Footer />
      {/* Additive layer: progress bar, section rail, floating CTA, count-ups, magnetic buttons, cursor glow */}
      <MediaEnhancer />
    </>
  );
}
