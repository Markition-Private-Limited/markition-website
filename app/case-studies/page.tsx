import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Contact from "@/app/media/_components/sections/Contact";
import CaseWork from "./_components/CaseWork";
import RevealEffects from "./_components/RevealEffects";
import "./case-studies.css";

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
  "Selected Markition case studies across AI, technology, digital marketing, design and connected business experiences.";

export const metadata: Metadata = {
  title: { absolute: "Markition — Case Studies" },
  description: DESCRIPTION,
  alternates: { canonical: "https://markition.com/case-studies" },
  openGraph: {
    title: "Markition — Case Studies",
    description: DESCRIPTION,
    url: "https://markition.com/case-studies",
    siteName: "Markition",
  },
};

const STEPS = [
  { n: "01", t: "Discover", d: "Understand the business, audience, friction points and the outcome that actually matters." },
  { n: "02", t: "Define", d: "Turn research into a clear strategic direction, experience architecture and measurable priorities." },
  { n: "03", t: "Create", d: "Design the brand, interface, product, campaign or system around the strategy — not around a template." },
  { n: "04", t: "Build", d: "Engineer the experience with performance, responsiveness, quality assurance and scalability in mind." },
  { n: "05", t: "Optimize", d: "Launch, learn, refine and continue improving the experience as the business evolves." },
];

export default function CaseStudiesPage() {
  return (
    <div style={{ background: "#080c42" }}>
      <Navbar />
      <RevealEffects />

      <main className={`cs-page ${manrope.variable} ${dmSans.variable}`}>
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
            <div className="eyebrow reveal">Markition / Case Studies</div>
            <h1>
              <span className="reveal">WE DON&apos;T</span>
              <span className="reveal">JUST SHOW</span>
              <span className="reveal"><i>WORK.</i></span>
              <span className="reveal">WE SHOW</span>
              <span className="reveal">WHAT IT</span>
              <span className="reveal">CHANGED.</span>
            </h1>
            <div className="hero-copy reveal">
              <p>Every project starts with a business problem. Strategy, design, technology, marketing and AI come together to turn that problem into something that works.</p>
              <div className="hero-note">Selected work across AI, software, digital growth, commerce and brand experience.</div>
            </div>
          </div>
          <div className="scrollline">Scroll to explore</div>
        </section>

        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((i) => (
              <span key={i}>Strategy <b>✦</b> Technology <b>✦</b> Design <b>✦</b> Marketing <b>✦</b> AI <b>✦</b> Growth <b>✦</b></span>
            ))}
          </div>
        </div>

        <section className="intro" id="featured">
          <div className="wrap">
            <div className="kicker reveal">01 / The Work</div>
            <div className="intro-grid">
              <h2 className="title reveal">REAL BUSINESS.<br /><span className="blue">REAL DIGITAL.</span><br />REAL WORK.</h2>
              <p className="lead reveal">Markition works across the full digital growth ecosystem — from AI and enterprise software to performance marketing, commerce, product experiences and brand systems. Our case studies are built around the work itself, not inflated numbers.</p>
            </div>
            <div className="rule" />
          </div>
        </section>

        <CaseWork />

        <section className="statement">
          <div className="wrap">
            <small>02 / What We Believe</small>
            <h2>A CASE STUDY ISN&apos;T<br />A <em>SHOWREEL.</em><br />IT&apos;S PROOF OF THINKING.</h2>
            <p>We don&apos;t believe great digital work is about adding more effects, more features or more noise. It is about understanding the business, finding the right opportunity and building an experience that makes the opportunity real.</p>
          </div>
        </section>

        <section className="process" id="process">
          <div className="wrap">
            <div className="kicker reveal">03 / Our Approach</div>
            <div className="intro-grid" style={{ marginTop: 28 }}>
              <h2 className="title reveal">FROM<br />PROBLEM<br />TO <span className="blue">IMPACT.</span></h2>
              <p className="lead reveal">Different businesses need different solutions. Our process stays disciplined while the solution changes around the problem.</p>
            </div>
            <div className="process-grid">
              <div className="lead reveal" style={{ fontSize: 13, maxWidth: 340 }}>One connected team across strategy, marketing, technology, design and AI — so the work doesn&apos;t lose momentum between departments.</div>
              <div className="process-list">
                {STEPS.map((s) => (
                  <div className="step reveal" key={s.n}>
                    <span className="step-num">{s.n}</span>
                    <div><h3>{s.t}</h3><p>{s.d}</p></div>
                    <span className="step-arrow">↗</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta" id="start">
          <div className="wrap">
            <div className="cta-inner reveal">
              <div className="eyebrow">04 / Your Next Case Study</div>
              <h2>YOUR BUSINESS<br />COULD BE THE<br /><span style={{ color: "#6e86ff" }}>NEXT STORY.</span></h2>
              <p>Tell us what you&apos;re trying to build, fix or grow. We&apos;ll bring strategy, technology, design, marketing and AI together around the opportunity.</p>
              <a className="cta-btn" href="#contact">Book A Free Consultation →</a>
            </div>
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
