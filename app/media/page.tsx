import type { Metadata } from "next";
import Hero from "./_components/sections/Hero";
import HeroShowcase from "./_components/sections/HeroShowcase";
import Ticker from "./_components/sections/Ticker";
import Services from "./_components/sections/Services";
import Evolve from "./_components/sections/Evolve";
import Work from "./_components/sections/Work";
import About from "./_components/sections/About";
import Process from "./_components/sections/Process";
import Industries from "./_components/sections/Industries";
import Testimonials from "./_components/sections/Testimonials";
import Stats from "./_components/sections/Stats";
import Portfolio from "./_components/sections/Portfolio";
import FAQ from "./_components/sections/FAQ";
import Contact from "./_components/sections/Contact";
import Footer from "./_components/layout/Footer";

export const metadata: Metadata = {
  title: "Markition Media",
  description: "Markition Media — Digital Creative Agency",
};

export default function MediaHomePage() {
  return (
    <>
      <main>
        {/* ── First macro-section: one unified gradient ── */}
        <div style={{ background: "linear-gradient(180deg, #010c28 4%, #1964D1 55%, #0d2258 72%, #06163a 82%, #0c1e40 97%)" }}>
          <Hero />
          <HeroShowcase />
          {/* HeroShowcase is a scroll-jacked, JS-measured pin section (5-step
              grow animation) — spacer sibling instead of padding, same
              reasoning as Work/Process/Portfolio below. */}
          <div className="media-gap-spacer" aria-hidden="true" />
          <Ticker />
          <Services />
          <Work />
          {/* Work is a scroll-jacked, JS-measured pin section — adding padding
              to it directly could throw off its scroll-distance math, so the
              uniform 80px desktop gap is added as an inert sibling instead. */}
          <div className="media-gap-spacer" aria-hidden="true" />
          <Evolve />
        </div>
        {/* ── Second macro-section: unified dark canvas ── */}
        <div style={{ background: "linear-gradient(180deg, #0c1e40 0%, #060f28 40%, #020a1c 100%)" }}>
          <About />
          <Process />
          {/* Same reasoning as Work above — Process's height drives its own
              scroll-jacked step animation via getBoundingClientRect(). */}
          <div className="media-gap-spacer" aria-hidden="true" />
          <Industries />
          <Testimonials />
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
    </>
  );
}
