import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ContactForm from "./_components/ContactForm";
import CursorGrid from "./_components/CursorGrid";
import ContactCards from "./_components/ContactCards";
import Reveal from "./_components/Reveal";
import "./contact.css";
import "./contact-enhance.css";

const DESCRIPTION =
  "Contact Markition for digital marketing, software, design and AI solutions. Let's talk about what's next for your business.";

export const metadata: Metadata = {
  title: { absolute: "Contact Markition | Let's Talk Growth" },
  description: DESCRIPTION,
  alternates: { canonical: "https://markition.com/contact" },
  openGraph: {
    title: "Contact Markition | Let's Talk Growth",
    description: DESCRIPTION,
    url: "https://markition.com/contact",
    siteName: "Markition",
  },
};

export default function ContactPage() {
  return (
    <div className="ct-page min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="ct-hero">
        {/* Interactive cursor grid background */}
        <div className="ct-hero-bg" aria-hidden="true">
          <CursorGrid
            cellSize={50}
            color="#081bfc"
            radius={120}
            falloff="smooth"
            holdTime={650}
            fadeDuration={450}
            lineWidth={1.7}
            maxOpacity={1}
            fillOpacity={0}
            gridOpacity={0}
            cellRadius={0}
            clickPulse
            pulseSpeed={1600}
          />
        </div>
        <div className="container ct-hero-grid">
          {/* Left: text */}
          <div className="ct-hero-text">
            <div className="ct-eyebrow">Contact us</div>
            <h1>
              Let&apos;s talk about<br />
              <span className="accent">what&apos;s next.</span>
            </h1>
            <p className="hero-sub">
              Thinking about growing your brand online? We&apos;d love to hear from you.
              Whether you have a clear project in mind or you&apos;re just not sure where
              to start, reach out — no complicated process, just a straightforward
              conversation about what your business needs.
            </p>
            <div className="ct-hero-actions">
              <a className="ct-btn primary" href="#message">Send a message ↓</a>
              <a className="ct-btn ghost" href="mailto:hey@markition.com">hey@markition.com ↗</a>
              <span className="ct-badge"><i aria-hidden="true" />Replies within 1 business day</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Contact info + form ── */}
      <section className="ct-main">
        <div className="container ct-main-grid">
          {/* Left: info */}
          <Reveal className="ct-intro">
            <div className="sec-eyebrow">Start a conversation</div>
            <h2>Big idea? Small question? We&apos;re listening.</h2>
            <p>
              Our team brings marketing, technology, design and AI together to help
              businesses move forward. Tell us a little about your goals and we&apos;ll
              help you work out a practical next step.
            </p>

            <ContactCards />
          </Reveal>

          {/* Right: form */}
          <Reveal delay={120} className="ct-form-wrap">
            <div className="ct-form-panel" id="message">
              <div className="form-eyebrow">Get in touch</div>
              <h2>Send us a message.</h2>
              <p>Pick a topic, fill in the details and tell us what&apos;s on your mind.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Location band ── */}
      <section className="ct-location">
        <div className="container ct-location-inner">
          <div>
            <h2>Markition, connected globally.</h2>
            <p>
              Serving ambitious businesses in Pakistan, Saudi Arabia and beyond.<br />
              Contact our team to arrange a conversation.
            </p>
          </div>
          <a className="ct-location-btn" href="mailto:hey@markition.com">
            Contact our team ↗
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
