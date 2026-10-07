"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import InfinityModel from "../InfinityModel";
import "./growth.css";

/* Sections ported from markition_media_clean_minimal_v2.html (header, mobile
   menu and footer are omitted — the site already has its own). Anchor ids are
   prefixed gm- so they never collide with the rest of the page. */

const SERVICES = [
  { id: "gm-seo", href: "/media/seo", n: "01", name: "SEO", short: "Show up when your customers search for what you sell." },
  { id: "gm-google-ads", href: "/media/google-ads", n: "02", name: "GOOGLE ADS", short: "Put your business in front of people with buying intent." },
  { id: "gm-meta-ads", href: "/media/meta-ads", n: "03", name: "META ADS", short: "Reach the right audiences and create demand." },
  { id: "gm-social", href: "/media/social-media-page-management", n: "04", name: "SOCIAL MEDIA", short: "Build a presence that makes your business look worth choosing." },
  { id: "gm-content", href: "#contact", n: "05", name: "CONTENT", short: "Give people a reason to stop, understand, trust and act." },
];

type Visual = "lines" | "meta" | "social" | "stack";

const DETAILS: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  image: string;
  alt: string;
  top: { label: string; text: string; visual: Visual };
  bottom: { label: string; text: string };
}[] = [
  {
    id: "gm-seo",
    eyebrow: "01 / SEO",
    title: "GET FOUND WHEN YOUR CUSTOMERS ARE LOOKING.",
    body: "SEO helps your business appear higher on Google when people search for the products or services you offer. The simple goal: more relevant people discovering you without paying for every click.",
    points: [
      "More visibility for the searches that matter to your business.",
      "More qualified visitors instead of random traffic.",
      "A stronger source of ongoing organic enquiries over time.",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1500&q=80",
    alt: "SEO performance and search marketing",
    top: { label: "SEO / search visibility", text: "BE EASIER TO FIND.", visual: "lines" },
    bottom: { label: "Business outcome", text: "MORE QUALIFIED ORGANIC TRAFFIC." },
  },
  {
    id: "gm-google-ads",
    eyebrow: "02 / Google Ads",
    title: "YOU DON'T SELL GOOGLE ADS. WE USE GOOGLE ADS TO BRING YOU BUSINESS.",
    body: "Google Ads puts your business in front of people who are already searching for what you sell. We focus on the journey after the click — the enquiry, booking, call or purchase.",
    points: [
      "Capture high-intent searches while customers are ready to act.",
      "Control where your budget goes and what it is trying to achieve.",
      "Measure campaigns against meaningful business outcomes.",
    ],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1500&q=80",
    alt: "Google Ads campaign strategy",
    top: { label: "Google Ads / search intent", text: "SEARCH → CLICK → ENQUIRY", visual: "lines" },
    bottom: { label: "What matters", text: "NOT MORE CLICKS. MORE OPPORTUNITY." },
  },
  {
    id: "gm-meta-ads",
    eyebrow: "03 / Meta Ads",
    title: "DON'T JUST SHOW YOUR ADS. SHOW THEM TO THE RIGHT PEOPLE.",
    body: "Meta Ads help you reach people based on interests, behaviour, demographics and interactions — even before they actively search for your product or service.",
    points: [
      "Create awareness around your business and offer.",
      "Reach specific audiences with relevant creative.",
      "Bring previous visitors and engaged audiences back into the conversation.",
    ],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1500&q=80",
    alt: "Meta and social advertising campaign",
    top: { label: "Meta Ads / audience", text: "RIGHT PEOPLE. RIGHT MESSAGE.", visual: "meta" },
    bottom: { label: "Business outcome", text: "CREATE DEMAND BEFORE THEY SEARCH." },
  },
  {
    id: "gm-social",
    eyebrow: "04 / Social Media Page Management",
    title: "DON'T JUST POST. BUILD A BRAND PEOPLE REMEMBER.",
    body: "Your social media should make your business look active, credible and worth choosing. We plan and manage content around a consistent brand presence — not random posts.",
    points: [
      "Content planning and monthly direction.",
      "Static posts, reels, captions and creative direction.",
      "A social presence that supports trust before the sales conversation starts.",
    ],
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1500&q=80",
    alt: "Social media page management and content",
    top: { label: "Social media", text: "PLAN → CREATE → PUBLISH", visual: "social" },
    bottom: { label: "The goal", text: "LOOK ACTIVE. LOOK CREDIBLE. LOOK WORTH CHOOSING." },
  },
  {
    id: "gm-content",
    eyebrow: "05 / Content",
    title: "CONTENT SHOULD DO MORE THAN LOOK GOOD.",
    body: "We create content that gives your audience a reason to stop, understand, trust and take action. Good content should support the rest of your marketing — not sit beside it.",
    points: [
      "Explain your value in language customers understand.",
      "Build credibility and answer the questions people actually have.",
      "Support SEO, paid campaigns, social media and conversion.",
    ],
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=1500&q=80",
    alt: "Content creation and campaign creative",
    top: { label: "Content system", text: "ONE IDEA → MULTIPLE TOUCHPOINTS.", visual: "stack" },
    bottom: { label: "The result", text: "MORE REASONS TO BELIEVE." },
  },
];

const SYSTEM = [
  { n: "01", t: "SEO", d: "Help people find you when they are searching." },
  { n: "02", t: "GOOGLE ADS", d: "Capture demand when people are ready to act." },
  { n: "03", t: "META ADS", d: "Create demand and reach new audiences." },
  { n: "04", t: "SOCIAL + CONTENT", d: "Build trust and give people a reason to choose you." },
  { n: "05", t: "BUSINESS GROWTH", d: "Turn attention into enquiries, customers and repeat opportunities." },
];

const CASES = [
  { tag: "ANIA AESTHETICS", desc: "Built a full social media presence and content strategy for this laser hair removal clinic. High-conversion creatives turned followers into booked consultations.", title: "MORE CONSULTATIONS.", result: "3×", note: "Increase in consultation bookings within 90 days.", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80", alt: "Aesthetic clinic marketing" },
  { tag: "CAR EASE", desc: "Launched geo-targeted paid social ads for CarEase's dent removal service across Karachi, generating qualified leads at a cost-per-lead 35% below benchmark.", title: "MORE QUALIFIED LEADS.", result: "200+", note: "Qualified leads in the first month.", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80", alt: "Automotive marketing" },
  { tag: "IN RIDE", desc: "Executed the digital launch strategy for InRide, a ride-hailing app entering the Saudi market, with social and paid campaigns driving installs from day one.", title: "A STRONGER LAUNCH.", result: "10K+", note: "Downloads in the first two weeks.", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80", alt: "Mobile app marketing" },
  { tag: "ORGANIC GROWTH", desc: "Rebuilt the keyword architecture from the ground up, targeting high-intent queries. Organic sessions grew with zero paid spend.", title: "BUILD VISIBILITY THAT COMPOUNDS.", result: "3.4×", note: "Increase in organic sessions over six months.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80", alt: "Organic search growth" },
];

const INDUSTRIES = [
  { n: "01", name: "ROOFING", challenge: "Customers search locally when they need a service.", approach: "SEO + Google Ads + local visibility." },
  { n: "02", name: "DENTAL", challenge: "Patients compare clinics before booking.", approach: "Google Ads + SEO + social proof." },
  { n: "03", name: "AESTHETIC / MED SPA", challenge: "Visual discovery and trust matter before consultation.", approach: "Meta Ads + Social + Content." },
  { n: "04", name: "HAIR TRANSPLANT", challenge: "High-consideration customers need confidence.", approach: "Meta Ads + Google Ads + Content." },
];

const PROCESS = [
  { n: "01", t: "UNDERSTAND", d: "We learn your business, customers and goals." },
  { n: "02", t: "STRATEGIZE", d: "We identify where your best opportunities are." },
  { n: "03", t: "CREATE", d: "We build campaigns, content and assets." },
  { n: "04", t: "LAUNCH", d: "We put the strategy into market." },
  { n: "05", t: "MEASURE", d: "We track what is actually happening." },
  { n: "06", t: "OPTIMIZE", d: "We improve what works." },
];

function VisualBits({ kind }: { kind: Visual }) {
  if (kind === "meta")
    return <div className="gm-tiles3"><i /><i /><i /></div>;
  if (kind === "social")
    return <div className="gm-tiles6"><i /><i /><i /><i /><i /><i /></div>;
  if (kind === "stack")
    return (
      <div className="gm-stack">
        <span>Social creative</span>
        <span>Landing page</span>
        <span>Video</span>
      </div>
    );
  return <div className="gm-lines"><span /><span /><span /></div>;
}

/* Stacking cards: each card sticks near the top as you scroll and the next one
   slides up over it, while the cards underneath shrink and dim slightly. The
   scale is derived from how far each later card has travelled toward its own
   stuck position, so it needs no scroll library and never fights the page. */
function CaseStack() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      const items = itemRefs.current;
      const cards = cardRefs.current;
      const arrivals = items.map((el, j) => {
        if (!el || j === 0) return 0;
        const stuckTop = parseFloat(getComputedStyle(el).top) || 0;
        const travel = (cards[j]?.offsetHeight ?? 400) * 0.9;
        return Math.min(1, Math.max(0, 1 - (el.getBoundingClientRect().top - stuckTop) / travel));
      });
      cards.forEach((card, i) => {
        if (!card) return;
        let depth = 0;
        for (let j = i + 1; j < arrivals.length; j++) depth += arrivals[j];
        card.style.transform = reduce ? "" : `scale(${(1 - depth * 0.05).toFixed(4)})`;
        card.style.filter = reduce ? "" : `brightness(${(1 - depth * 0.06).toFixed(4)})`;
      });
    };
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="gm-stack">
      {CASES.map((c, i) => (
        <div
          key={c.tag}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="gm-stack-item"
          style={{ ["--i" as string]: i } as React.CSSProperties}
        >
          <div ref={(el) => { cardRefs.current[i] = el; }} className="gm-case">
            <div className="gm-case-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.alt} />
            </div>
            <div className="gm-case-body">
              <small>{c.tag}</small>
              <h3 className="gm-display">{c.title}</h3>
              <div className="gm-case-result">{c.result}</div>
              <p>{c.note}</p>
              <p className="gm-case-desc">{c.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Growth() {
  const [openService, setOpenService] = useState<number | null>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);

  // Scroll-locked sequence. On desktop the section is pinned (sticky) for a
  // stretch of scrolling: the page stays put while scroll drives the sequence —
  // service 1 expands, closes back into the list, then service 2, and so on.
  // On narrower screens the details are too tall to pin, so the same sequence
  // plays as the list scrolls past instead.
  useEffect(() => {
    const section = pinRef.current;
    const rows = rowsRef.current;
    if (!section || !rows) return;
    const pinQuery = window.matchMedia("(min-width: 1051px)");
    let frame = 0;
    let current: number | null = null;

    const OPEN_FROM = 0.14; // fraction of a step spent closed before it opens
    const OPEN_TO = 0.86;   // ...and where it closes again
    const stepPx = () => Math.max(520, window.innerHeight * 0.8);

    const layout = () => {
      if (pinQuery.matches) {
        section.style.height = `${window.innerHeight + stepPx() * SERVICES.length}px`;
      } else {
        section.style.height = "";
      }
    };

    const update = () => {
      let phase: number;
      if (pinQuery.matches) {
        const scrolled = Math.max(0, -section.getBoundingClientRect().top);
        phase = scrolled / stepPx();
      } else {
        phase = (window.innerHeight * 0.4 - rows.getBoundingClientRect().top) / 130;
      }
      const i = Math.floor(phase);
      const frac = phase - i;
      const next = i >= 0 && i < SERVICES.length && frac >= OPEN_FROM && frac <= OPEN_TO ? i : null;
      if (next !== current) {
        current = next;
        setOpenService(next);
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    const onResize = () => { layout(); onScroll(); };

    layout();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      section.style.height = "";
    };
  }, []);

  // While pinned, slide the whole column up so the open service's row sits near
  // the top of the screen and its details fit in the remaining space.
  useEffect(() => {
    const col = colRef.current;
    const rows = rowsRef.current;
    if (!col || !rows) return;
    if (!window.matchMedia("(min-width: 1051px)").matches || openService === null) {
      col.style.transform = "";
      return;
    }
    const firstRow = rows.querySelector<HTMLElement>(".gm-row");
    const rowH = (firstRow?.offsetHeight ?? 85) + 1;
    const rowTop = rows.offsetTop + openService * rowH;
    col.style.transform = `translateY(${-Math.max(0, rowTop - 96)}px)`;
  }, [openService]);

  return (
    <div id="media-growth" className="gm-wrap">
      {/* Trust */}
      <section className="gm-trust">
        <div className="gm-container gm-trust-row">
          <div className="gm-trust-title">Trusted by businesses<br />that want to grow.</div>
          <div className="gm-client-list">
            <span>ANIA AESTHETICS</span>
            <span>CAR EASE</span>
            <span>IN RIDE</span>
            <span>TAKEME</span>
            <span>AROMATIC EXPRESSIONS</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="gm-section">
        <div className="gm-container gm-intro-grid">
          <div className="gm-intro-copy">
            <div className="gm-eyebrow">Marketing should make sense</div>
            <h2 className="gm-display gm-title-lg">DON&apos;T JUST DO MORE MARKETING.</h2>
            <p>Do marketing that has a job. SEO should make you easier to find. Google Ads should capture people ready to buy. Meta Ads should create demand. Social should build trust. Content should help people understand why you.</p>
          </div>
          <div>
            <div className="gm-intro-statement">
              We connect those pieces so your marketing feels less like a list of activities and more like <span>one clear path to growth.</span>
            </div>
            <div className="gm-intro-note">
              <div><b>01 / ATTENTION</b><span>Reach the right people.</span></div>
              <div><b>02 / INTEREST</b><span>Give them a reason to care.</span></div>
              <div><b>03 / ACTION</b><span>Turn attention into business.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section ref={pinRef} className="gm-alt gm-pin" id="gm-services">
        <div className="gm-pin-stage">
        <div ref={colRef} className="gm-container gm-pin-col">
          <div className="gm-eyebrow">What we do</div>
          <div className="gm-head gm-head-3">
            <div className="gm-head-title">
              <h2 className="gm-display">FIVE SERVICES.<br />ONE GROWTH GOAL.</h2>
            </div>
            <InfinityModel />
            <p>We keep the offer focused. Every service exists to solve a clear marketing problem and contribute to a bigger business outcome.</p>
          </div>
          <div ref={rowsRef} className="gm-rows">
            {SERVICES.map((svc, i) => {
              const d = DETAILS[i];
              const isOpen = openService === i;
              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className={`gm-row-wrap ${isOpen ? "gm-open" : ""}`}
                >
                  <div className="gm-row">
                    <div className="gm-num">{svc.n}</div>
                    <h3 className="gm-display">{svc.name}</h3>
                    <p>{svc.short}</p>
                    <div className="gm-row-link">
                      {isOpen ? (
                        <Link className="gm-btn gm-row-btn" href={svc.href}>
                          Explore Service <span>→</span>
                        </Link>
                      ) : (
                        "Explore →"
                      )}
                    </div>
                  </div>

                  {/* Details grow downward from the row as it is scrolled to */}
                  <div className="gm-panel" aria-hidden={!isOpen}>
                    <div className="gm-panel-inner">
                      <div className={`gm-detail-grid ${i % 2 === 1 ? "gm-reverse" : ""}`}>
                        <div className="gm-detail-copy">
                          <div className="gm-eyebrow">{d.eyebrow}</div>
                          <h2 className="gm-display">{d.title}</h2>
                          <p>{d.body}</p>
                          <ul>
                            {d.points.map((p) => <li key={p}>{p}</li>)}
                          </ul>
                        </div>
                        <div className="gm-detail-visual">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={d.image} alt={d.alt} />
                          <div className="gm-glass gm-visual-card gm-top">
                            <small>{d.top.label}</small>
                            <b>{d.top.text}</b>
                            <VisualBits kind={d.top.visual} />
                          </div>
                          <div className="gm-glass gm-visual-card gm-bottom">
                            <small>{d.bottom.label}</small>
                            <b>{d.bottom.text}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </section>

      {/* System */}
      <section className="gm-section gm-system">
        <div className="gm-container gm-system-grid">
          <div>
            <div className="gm-eyebrow">The bigger picture</div>
            <h2 className="gm-display">YOUR MARKETING WORKS BETTER TOGETHER.</h2>
            <p>SEO, Google Ads, Meta Ads, Social and Content each have a job. The real value comes when those jobs support each other.</p>
          </div>
          <div className="gm-flow">
            {SYSTEM.map((s) => (
              <div key={s.n} className="gm-step-row">
                <span>{s.n}</span>
                <div><b>{s.t}</b><p>{s.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="gm-section gm-alt" id="gm-results">
        <div className="gm-container">
          <div className="gm-head gm-head-results">
            <div>
              <div className="gm-eyebrow">Selected work</div>
              <h2 className="gm-display">REAL MARKETING.<br />REAL RESULTS.</h2>
            </div>
            <p>Use verified Markition results to show what performance-focused marketing can do when it is connected to a clear business goal.</p>
          </div>
          <CaseStack />
        </div>
      </section>

      {/* Industries */}
      <section className="gm-section gm-alt">
        <div className="gm-container">
          <div className="gm-eyebrow">Industries we grow</div>
          <h2 className="gm-display gm-title-lg">MARKETING WITH CONTEXT.</h2>
          <div className="gm-industry-list">
            {INDUSTRIES.map((x) => (
              <div key={x.n} className="gm-industry">
                <div className="gm-num">{x.n}</div>
                <h3 className="gm-display">{x.name}</h3>
                <p><strong>Challenge:</strong> {x.challenge}</p>
                <p><strong>Approach:</strong> {x.approach}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="gm-section">
        <div className="gm-container">
          <div className="gm-eyebrow">Our process</div>
          <h2 className="gm-display gm-title-lg">HOW WE GROW YOUR BUSINESS.</h2>
          <div className="gm-process-grid">
            {PROCESS.map((s) => (
              <div key={s.n} className="gm-step">
                <span>{s.n}</span>
                <b>{s.t}</b>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="gm-section gm-alt">
        <div className="gm-container">
          <div className="gm-eyebrow">Client perspective</div>
          <h2 className="gm-display gm-title-lg">TRUSTED BY THE PEOPLE<br />WE GROW WITH.</h2>
          <div className="gm-quote-layout">
            <div className="gm-quote">
              “Markition is very organized in planning to achieve the goals within the set deadlines. We feel they were truly part of our internal team project.”
            </div>
            <div className="gm-person">
              <b>Alvaro Araujo</b>
              <span>Founder &amp; CEO, Relocate Now</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
