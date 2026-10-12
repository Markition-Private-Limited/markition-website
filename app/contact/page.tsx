import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ContactForm from "./_components/ContactForm";
import CursorGrid from "./_components/CursorGrid";
import "./contact.css";

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
          </div>

        </div>
      </section>

      {/* ── Contact info + form ── */}
      <section className="ct-main">
        <div className="container ct-main-grid">
          {/* Left: info */}
          <div className="ct-intro">
            <div className="sec-eyebrow">Start a conversation</div>
            <h2>Big idea? Small question? We&apos;re listening.</h2>
            <p>
              Our team brings marketing, technology, design and AI together to help
              businesses move forward. Tell us a little about your goals and we&apos;ll
              help you work out a practical next step.
            </p>

            <div className="ct-info-grid">
              <div className="ct-info-card">
                <small>Email us</small>
                <a href="mailto:hey@markition.com">hey@markition.com</a>
                <p>Project enquiries and partnerships</p>
              </div>
              <div className="ct-info-card">
                <small>Call us · Saudi Arabia</small>
                <a href="tel:+966510855709">+966 51 085 5709</a>
                <p>For enquiries across Saudi Arabia</p>
              </div>
              <div className="ct-info-card">
                <small>Call us · Pakistan</small>
                <a href="tel:+923342722337">+92 (334) 272-2337</a>
                <p>Connect with our Pakistan team</p>
              </div>
              <div className="ct-info-card">
                <small>Call us · USA</small>
                <a href="tel:+12174010041">+1 (217) 401-0041</a>
                <p>Connect with our USA team</p>
              </div>
            </div>

            <div className="ct-hours">
              <strong>When to reach us</strong>
              <span>
                Send us a message anytime.<br />
                We&apos;ll get back to you as soon as we can.
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div className="ct-form-panel">
            <div className="form-eyebrow">Get in touch</div>
            <h2>Send us a message.</h2>
            <p>Fill in the details below and tell us what&apos;s on your mind.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Location band ── */}
      <section className="ct-location">
        <div className="container ct-location-inner">
          <div>
            <div className="loc-eyebrow">Location</div>
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
