import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Contact from "@/app/media/_components/sections/Contact";
import PortfolioWork from "./_components/PortfolioWork";
import RevealEffects from "./_components/RevealEffects";
import HeroGridGlow from "./_components/HeroGridGlow";
import "./portfolio.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const DESCRIPTION =
  "Markition portfolio — digital products, branding, UI/UX, development, marketing and AI experiences.";

export const metadata: Metadata = {
  title: { absolute: "Markition — Portfolio" },
  description: DESCRIPTION,
  alternates: { canonical: "https://markition.com/portfolio" },
  openGraph: {
    title: "Markition — Portfolio",
    description: DESCRIPTION,
    url: "https://markition.com/portfolio",
    siteName: "Markition",
  },
};

const MARQUEE = (
  <span>
    <b>WEB</b> / MOBILE / <b>AI</b> / BRANDING / <b>SAAS</b> / UI·UX / <b>MARKETING</b> / DIGITAL EXPERIENCES /{" "}
    <b>WEB</b> / MOBILE / <b>AI</b> / BRANDING / <b>SAAS</b> / UI·UX / <b>MARKETING</b> / DIGITAL EXPERIENCES /{" "}
  </span>
);

const CAPABILITIES = [
  { n: "01", t: "Branding", d: "Build the identity before building the touchpoints.", items: ["Creative Direction", "Brand Identity", "Brand Strategy", "Graphic Design"] },
  { n: "02", t: "UI / UX Design", d: "Design interfaces that make complex products easier to use.", items: ["UX Research", "Wireframing", "Prototyping", "Design Systems"] },
  { n: "03", t: "Development", d: "Turn approved experiences into reliable digital products.", items: ["Web Development", "Mobile Apps", "SaaS Platforms", "ERP & Business Systems"] },
  { n: "04", t: "Digital Marketing", d: "Connect the finished experience with the people who need it.", items: ["SEO", "Google Ads", "Meta Ads", "Social Media"] },
];

const NUMBERS = [
  { v: "2023", l: "Established" },
  { v: "4", l: "Connected disciplines" },
  { v: "1", l: "Growth ecosystem" },
  { v: "∞", l: "Ways to build" },
];

export default function PortfolioPage() {
  return (
    <div style={{ background: "#080c42" }}>
      <Navbar />
      <RevealEffects />

      <main id="portfolio-page" className={`pf-page ${manrope.variable} ${dmSans.variable}`}>
        {/* Hero + intro share one continuous background */}
        <div className="top-band">
          <HeroGridGlow />
          <section className="hero">
            <div className="container">
              <div className="hero-top">
                <div>
                  <div className="eyebrow">MARKITION · SELECTED WORK</div>
                  <h1>WE MAKE<br /><span>DIGITAL.</span></h1>
                </div>
                <p className="hero-copy">A curated collection of digital products, brand experiences, campaigns and technology built across Markition&apos;s growth ecosystem.</p>
              </div>
              <div className="hero-index">
                <span><b>(01)</b> Portfolio</span>
                <span>Marketing · Technology · Design · AI</span>
                <span><b>2023—2026</b></span>
              </div>
            </div>
          </section>

          <section className="intro">
            <div className="container intro-grid">
              <div><div className="label">OUR WORK</div></div>
              <div>
                <h2>IDEAS BECOME EXPERIENCES. EXPERIENCES BECOME GROWTH.</h2>
                <p>From a first brand direction to a production-ready product, our work sits at the intersection of strategy, design, technology and marketing. This is where those projects come together.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="marquee">
          <div className="track">
            {MARQUEE}
            {MARQUEE}
          </div>
        </div>

        <PortfolioWork />

        <section className="capabilities" id="capabilities">
          <div className="container">
            <div className="eyebrow">WHAT SITS BEHIND THE WORK</div>
            <div className="section-title">COMPLEX PROFICIENCY.<br />ONE CONNECTED TEAM.</div>
            <div className="cap-grid">
              {CAPABILITIES.map((c) => (
                <div className="cap reveal" key={c.n}>
                  <span className="cap-num">({c.n})</span>
                  <div><h3>{c.t}</h3></div>
                  <div>
                    <p>{c.d}</p>
                    <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="numbers" id="numbers">
          <div className="container">
            <div className="eyebrow">MARKITION</div>
            <div className="number-grid">
              {NUMBERS.map((n) => (
                <div className="num" key={n.l}><strong>{n.v}</strong><span>{n.l}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta" id="start">
          <div className="container">
            <div className="eyebrow" style={{ color: "#aab7ff" }}>YOUR PROJECT NEXT</div>
            <h2>LET&apos;S CREATE SOMETHING WORTH SHOWING.</h2>
            <p>Have a product, website, brand, campaign or idea that needs to move from concept to reality?</p>
            <a href="#contact">Book A Free Consultation →</a>
          </div>
        </section>
      </main>

      {/* Call booking — same form used across the Markition solution pages */}
      <div style={{ background: "#020a1c" }}>
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
