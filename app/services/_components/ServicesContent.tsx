"use client";

import { useEffect, useRef } from "react";

/* ─── Reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("svc-visible");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("svc-visible");
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Data ─── */
const CATEGORIES = [
  {
    name: "Markition Media",
    subtitle: "Digital Marketing & Growth",
    href: "/contact",
    services: [
      "Search Engine Optimization (SEO)",
      "Google Ads & PPC",
      "Meta Ads",
      "Social Media Management",
      "Content Strategy & Creation",
    ],
  },
  {
    name: "Markition Design Labs",
    subtitle: "Creative, Branding & Digital Experiences",
    href: "/contact",
    services: [
      "Professional Camera Production",
      "Motion Graphics & Animation",
      "Social Media Reel Editing",
      "Brand Identity & Logo Design",
      "UI/UX Design",
      "2D/3D Animations",
      "Product Design",
      "Company Profile",
    ],
  },
  {
    name: "Markition Tech",
    subtitle: "Software, Applications & Technology Solutions",
    href: "/tech",
    services: [
      "Website Development",
      "Saas Development",
      "Mobile App Development",
      "ERP & CRM Development",


    ],
  },
  {
    name: "Spheno AI",
    subtitle: "AI, Automation & Intelligent Business Systems",
    href: "/contact",
    services: [
      "AI Chatbots & Assistants",
      "Voice AI & Lead Response",
      "Workflow Automation",
      "WhatsApp Automation",
      "CRM & Lead Automation",
      "AI Integration",
    ],
  },
];

/* ─── Hero ─── */
function ServicesHero() {
  return (
    <section className="svc-hero">
      <div className="svc-container">
        <div className="svc-hero-grid">
          <div>
            <div className="svc-hero-tag">Markition / Services</div>
            <h1>
              <span className="svc-line"><span>Everything you need.</span></span>
              <span className="svc-line"><span className="svc-italic">Clearly delivered.</span></span>
            </h1>
            <p className="svc-hero-desc">
              One place for the services that move your business forward.
              Explore our capabilities across{" "}
              <span className="svc-highlight">
                marketing, technology, design, AI and enterprise solutions
              </span>.
            </p>
          </div>
          <div className="svc-hero-aside">
            <strong>One partner.<br />Every key capability.</strong>
            <span>Choose a service, or bring the right mix together around your goals.</span>
          </div>
        </div>
        <div className="svc-hero-bottom">
          <span>Digital growth · Technology · Creative · Intelligence</span>
          <span>Explore all services <span className="svc-arrow-down">↓</span></span>
        </div>
      </div>
    </section>
  );
}

/* ─── Intro ─── */
function ServicesIntro() {
  const ref = useReveal() as React.RefObject<HTMLDivElement>;
  return (
    <section className="svc-intro">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="svc-container svc-intro-row svc-reveal"
      >
        <div>
          <div className="svc-section-label">Our capabilities</div>
          <h2>
            Find the right service.<br />
            <em>See what it can do.</em>
          </h2>
        </div>
        <p>
          Every service is clearly defined, so you can quickly understand
          what we offer and where it can support your business.
        </p>
      </div>
    </section>
  );
}

/* ─── Services list ─── */
function ServicesList() {
  return (
    <section className="svc-list-section" id="services">
      <div className="svc-container">
        <div className="svc-list-head svc-reveal">What we do</div>
        <h2 className="svc-list-title svc-reveal">
          Services built to move your business <em>forward.</em>
        </h2>

        <div className="svc-service-list">
          {CATEGORIES.map((cat, ci) => {
            /* Pair services into rows of 2 */
            const rows: string[][] = [];
            for (let i = 0; i < cat.services.length; i += 2) {
              rows.push(cat.services.slice(i, i + 2));
            }
            return (
              <div key={ci} className="svc-cat-block">
                {/* Category heading row */}
                <div className="svc-cat-heading svc-reveal">
                  <div className="svc-cat-heading-inner">
                    <span className="svc-cat-name">{cat.name}</span>
                    <span className="svc-cat-subtitle">{cat.subtitle}</span>
                  </div>
                </div>

                {/* Service rows */}
                {rows.map((pair, ri) => (
                  <div key={ri} className="svc-service-row svc-reveal" style={{ transitionDelay: `${Math.min(ri * 40, 320)}ms` }}>
                    <a className="svc-service-item" href={cat.href}>
                      <span className="svc-item-left-arrow" aria-hidden="true">↗</span>
                      <span className="svc-service-name">{pair[0]}</span>
                    </a>
                    {pair[1] ? (
                      <a className="svc-service-item" href={cat.href}>
                        <span className="svc-item-left-arrow" aria-hidden="true">↗</span>
                        <span className="svc-service-name">{pair[1]}</span>
                      </a>
                    ) : (
                      <div className="svc-service-item svc-empty" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Process band ─── */
const STEPS = [
  { num: "01 / Discover", label: "1", title: "Understand", desc: "Your business, audience and needs." },
  { num: "02 / Plan",     label: "2", title: "Define",     desc: "Scope, priorities and direction." },
  { num: "03 / Deliver",  label: "3", title: "Create",     desc: "Build, design or launch the work." },
  { num: "04 / Improve",  label: "4", title: "Optimize",   desc: "Review and refine where agreed." },
];

function ProcessBand() {
  return (
    <section className="svc-band">
      <div className="svc-container svc-band-grid svc-reveal">
        <div>
          <div className="svc-section-label">How we work</div>
          <h2>
            Simple process.<br />
            <em>Clear direction.</em>
          </h2>
          <p>
            We start by understanding your goals, then recommend the service or combination
            of services that best fits the scope. The deliverables, timeline and responsibilities
            are agreed before work begins.
          </p>
        </div>
        <div className="svc-process">
          {STEPS.map((s, i) => (
            <div key={i} className="svc-process-step svc-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="svc-process-num">
                <span>{s.num}</span><span>{s.label}</span>
              </div>
              <strong>{s.title}</strong>
              <small>{s.desc}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function ServicesCta() {
  return (
    <section className="svc-cta" id="contact">
      <div className="svc-container svc-cta-row svc-reveal">
        <div className="svc-cta-main">
          <div className="svc-cta-label">Ready when you are</div>
          <h2>
            Let&apos;s find your<br />
            <em>next move.</em>
          </h2>
          <p>
            Tell us what you&apos;re trying to achieve. We&apos;ll help you identify the services
            that make sense for your business and discuss a clear next step.
          </p>
          <div className="svc-cta-actions">
            <a className="svc-btn svc-btn-primary" href="/contact">
              <span>Book a consultation <span className="svc-arrow">↗</span></span>
            </a>
            <a className="svc-btn svc-btn-outline" href="mailto:hey@markition.com">
              <span>Email Markition <span className="svc-arrow">↗</span></span>
            </a>
          </div>
        </div>
        <div className="svc-cta-side">
          <small>Start a conversation</small>
          <a href="mailto:hey@markition.com">hey@markition.com ↗</a>
          <small>Our portfolio</small>
          <a href="/portfolio">View our work ↗</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Root export ─── */
export default function ServicesContent() {
  /* Wire up IntersectionObserver for all .svc-reveal elements */
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".svc-reveal").forEach(el => el.classList.add("svc-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("svc-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".svc-reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="svc-root">
      <ServicesHero />
      <ServicesIntro />
      <ServicesList />
      <ProcessBand />
      <ServicesCta />
    </div>
  );
}
