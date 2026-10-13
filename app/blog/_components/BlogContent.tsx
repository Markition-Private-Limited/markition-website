"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

/* ─── Data ─── */
type Post = {
  id: string;
  num: string;
  category: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  minutes: number;
  date: string;
  image: string;
  alt: string;
  search: string;
};

const POSTS: Post[] = [
  {
    id: "article-1", num: "01", category: "seo", categoryLabel: "SEO & Search",
    title: "SEO, GEO and the new ways customers discover businesses",
    excerpt: "Understand the evolving search landscape and the foundations that help your brand get discovered.",
    minutes: 6, date: "Oct 2026",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=85",
    alt: "Laptop displaying web analytics",
    search: "seo geo search engine optimization ai search visibility",
  },
  {
    id: "article-2", num: "02", category: "marketing", categoryLabel: "Digital Marketing",
    title: "Before you increase your ad budget, fix these fundamentals",
    excerpt: "A practical look at offer clarity, landing pages, tracking and creative testing before spending more.",
    minutes: 7, date: "Oct 2026",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
    alt: "Team collaborating on campaign strategy",
    search: "paid advertising campaign strategy ad budget conversion google ads meta",
  },
  {
    id: "article-3", num: "03", category: "technology", categoryLabel: "Technology",
    title: "Website or web app? Choose the right tool for the job",
    excerpt: "Learn the difference between a marketing website and a digital product built for people to do things.",
    minutes: 5, date: "Sep 2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    alt: "Developer working at a computer",
    search: "website web app software digital experience development",
  },
  {
    id: "article-4", num: "04", category: "ai", categoryLabel: "AI & Automation",
    title: "Where AI assistants can make a real difference in your business",
    excerpt: "Explore practical ways to support lead response, repetitive workflows and customer service.",
    minutes: 8, date: "Sep 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
    alt: "Abstract artificial intelligence visual",
    search: "AI chatbot voice agent automation leads customer support",
  },
  {
    id: "article-5", num: "05", category: "design", categoryLabel: "Brand & Design",
    title: "Good design is more than looking professional",
    excerpt: "How clarity, consistency and usability help people understand your value and trust your brand.",
    minutes: 4, date: "Aug 2026",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
    alt: "Minimal creative workspace",
    search: "branding design visual identity trust customer perception",
  },
  {
    id: "article-6", num: "06", category: "marketing", categoryLabel: "Social Media",
    title: "A social media plan your team can actually maintain",
    excerpt: "Build a sustainable content rhythm around your audience, goals and available resources.",
    minutes: 5, date: "Aug 2026",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85",
    alt: "Social media apps on a screen",
    search: "social media content strategy organic content consistency",
  },
];

const FEATURED = POSTS[0];

const TOPICS = [
  { key: "marketing", label: "Digital Marketing", blurb: "Paid media, social and the fundamentals that make budget work harder." },
  { key: "seo", label: "SEO & Search", blurb: "How people — and AI assistants — find businesses, and how to be the answer." },
  { key: "technology", label: "Technology", blurb: "Websites, web apps and the product decisions behind them." },
  { key: "design", label: "Design", blurb: "Brand, clarity and the visual systems that earn trust." },
  { key: "ai", label: "AI & Automation", blurb: "Practical assistants and workflows for growing teams." },
];

const FILTERS = [{ key: "all", label: "All" }, ...TOPICS.map(({ key, label }) => ({ key, label }))];

const MARQUEE = ["Digital Marketing", "SEO & GEO", "Technology", "Brand & Design", "AI & Automation", "Social Media"];

const countFor = (key: string) => (key === "all" ? POSTS.length : POSTS.filter((p) => p.category === key).length);

/* ─── Helpers ─── */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`jr-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// Cursor spotlight: writes --mx/--my onto the hovered element.
function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Reading progress ─── */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="jr-progress" aria-hidden="true" />;
}

/* ─── Hero ─── */
function FeaturedCard() {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    trackSpotlight(e);
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <a
      ref={ref}
      href={`#${FEATURED.id}`}
      onClick={(e) => { e.preventDefault(); scrollToId(FEATURED.id); }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="jr-feature"
      aria-label={`Featured: ${FEATURED.title}`}
    >
      <div className="jr-feature-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FEATURED.image} alt={FEATURED.alt} />
        <span className="jr-feature-badge"><i />Featured read</span>
      </div>
      <div className="jr-feature-body">
        <div className="jr-feature-meta">
          <span>{FEATURED.categoryLabel}</span>
          <span>{FEATURED.minutes} min read</span>
        </div>
        <h3>{FEATURED.title}</h3>
        <p>{FEATURED.excerpt}</p>
        <span className="jr-feature-link">Start reading <b>↗</b></span>
      </div>
    </a>
  );
}

function Hero() {
  return (
    <section className="jr-hero">
      <div className="jr-hero-orb" aria-hidden="true" />
      <div className="jr-grid-bg" aria-hidden="true" />
      <div className="jr-wrap jr-hero-layout">
        <div>
          <Reveal><div className="jr-eyebrow">Markition / Journal</div></Reveal>
          <h1>
            <Reveal delay={80}><span>READ THE</span></Reveal>
            <Reveal delay={160}><span>SIGNALS.</span></Reveal>
            <Reveal delay={240}><span><em>MOVE FIRST.</em></span></Reveal>
          </h1>
          <Reveal delay={320}>
            <div className="jr-hero-bottom">
              <p className="jr-hero-copy">
                Practical ideas and fresh perspectives from the team building across marketing,
                technology, design and AI — written to be used, not just read.
              </p>
              <div className="jr-hero-note">
                {POSTS.length} articles · {TOPICS.length} topics · Updated monthly
              </div>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="jr-hero-cta-row">
              <a className="jr-btn" href="#articles" onClick={(e) => { e.preventDefault(); scrollToId("articles"); }}>
                Browse articles ↓
              </a>
              <a className="jr-btn ghost" href="#topics" onClick={(e) => { e.preventDefault(); scrollToId("topics"); }}>
                Explore topics →
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={260} className="jr-hero-right">
          <FeaturedCard />
        </Reveal>
      </div>
      <div className="jr-hero-scroll" aria-hidden="true">Scroll to read</div>
    </section>
  );
}

function Marquee() {
  const row = (
    <span>
      {MARQUEE.map((m) => (
        <span key={m}>{m} <b>✦</b> </span>
      ))}
    </span>
  );
  return (
    <div className="jr-marquee" aria-hidden="true">
      <div className="jr-track">{row}{row}</div>
    </div>
  );
}

/* ─── Archive ─── */
function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <article
      className="jr-card"
      id={post.id}
      style={{ animationDelay: `${index * 70}ms` }}
      onPointerMove={trackSpotlight}
    >
      <a className="jr-card-img" href="/contact" tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src={post.image} alt="" />
      </a>
      <div className="jr-card-body">
        <div className="jr-card-top">
          <span className="jr-card-num">{post.num}</span>
          <span className="jr-card-icon" aria-hidden="true">↗</span>
        </div>
        <div className="jr-card-meta">
          <span className="jr-card-cat">{post.categoryLabel}</span>
          <span>{post.minutes} min · {post.date}</span>
        </div>
        <h3><a href="/contact">{post.title}</a></h3>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}

function Archive({ filter, setFilter }: { filter: string; setFilter: (k: string) => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"latest" | "quick">("latest");
  const inputRef = useRef<HTMLInputElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Press "/" anywhere to jump to the search box.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== "/" || t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Slide the active-chip highlight under the selected filter.
  useEffect(() => {
    const measure = () => {
      const el = chipsRef.current?.querySelector<HTMLButtonElement>(`[data-key="${filter}"]`);
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = POSTS.filter((p) => {
      const matchCat = filter === "all" || p.category === filter;
      const haystack = `${p.search} ${p.title} ${p.excerpt} ${p.categoryLabel}`.toLowerCase();
      return matchCat && (!q || haystack.includes(q));
    });
    return sort === "quick" ? [...list].sort((a, b) => a.minutes - b.minutes) : list;
  }, [filter, query, sort]);

  const reset = useCallback(() => { setQuery(""); setFilter("all"); }, [setFilter]);

  return (
    <section className="jr-archive" id="articles">
      <div className="jr-wrap">
        <div className="jr-head">
          <div>
            <Reveal><div className="jr-kicker">01 / The Archive</div></Reveal>
            <Reveal delay={80}><h2 className="jr-title">EVERY IDEA<br /><span className="jr-blue">WORTH</span><br />READING.</h2></Reveal>
          </div>
          <Reveal delay={160}>
            <p className="jr-lead">
              Search by keyword, filter by topic or sort for a quick read. Every piece is written
              around a real decision a growing business has to make.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="jr-toolbar">
            <div className="jr-chips" ref={chipsRef} role="group" aria-label="Filter articles by topic">
              <span className="jr-chip-indicator" style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }} aria-hidden="true" />
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  data-key={f.key}
                  type="button"
                  className={`jr-chip${filter === f.key ? " active" : ""}`}
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}<sup>{countFor(f.key)}</sup>
                </button>
              ))}
            </div>

            <div className="jr-tools-right">
              <div className="jr-sort" role="group" aria-label="Sort articles">
                <button type="button" className={sort === "latest" ? "active" : ""} aria-pressed={sort === "latest"} onClick={() => setSort("latest")}>Latest</button>
                <button type="button" className={sort === "quick" ? "active" : ""} aria-pressed={sort === "quick"} onClick={() => setSort("quick")}>Quick reads</button>
              </div>
              <label className="jr-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Escape") { setQuery(""); e.currentTarget.blur(); } }}
                  placeholder="Search articles"
                  aria-label="Search articles"
                />
                {query ? (
                  <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }} aria-label="Clear search">✕</button>
                ) : (
                  <kbd aria-hidden="true">/</kbd>
                )}
              </label>
            </div>
          </div>
        </Reveal>

        <div className="jr-results" aria-live="polite">
          Showing <b>{filtered.length}</b> of {POSTS.length} articles
          {query.trim() && <> for “{query.trim()}”</>}
        </div>

        {filtered.length > 0 ? (
          <div className="jr-grid" key={`${filter}-${sort}-${query.trim()}`}>
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="jr-empty">
            <h3>No articles match that.</h3>
            <p>Try another keyword, or clear the filters to see everything.</p>
            <button type="button" className="jr-btn dark" onClick={reset}>Reset filters</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Topic explorer ─── */
function Topics({ onPick }: { onPick: (k: string) => void }) {
  const [active, setActive] = useState(0);
  const topic = TOPICS[active];
  const posts = POSTS.filter((p) => p.category === topic.key);

  return (
    <section className="jr-topics" id="topics">
      <div className="jr-wrap">
        <div className="jr-topics-grid">
          <div>
            <Reveal><div className="jr-eyebrow">02 / Reading Paths</div></Reveal>
            <Reveal delay={80}><h2>PICK A TOPIC.<br />GO <em>DEEPER.</em></h2></Reveal>
            <Reveal delay={160}>
              <p className="jr-topics-copy">
                Marketing, search, technology, design and AI rarely live apart. Start with the
                problem in front of you and follow the thread.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="jr-explorer" onPointerMove={trackSpotlight}>
              <ul className="jr-topic-list" role="tablist" aria-label="Topics">
                {TOPICS.map((t, i) => (
                  <li key={t.key}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={active === i}
                      className={active === i ? "active" : ""}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                    >
                      <span className="n">0{i + 1}</span>
                      <span className="l">{t.label}</span>
                      <span className="c">{countFor(t.key)}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="jr-topic-panel" role="tabpanel" key={topic.key}>
                <div className="jr-topic-count">
                  {String(posts.length).padStart(2, "0")}
                  <small>{posts.length === 1 ? "article" : "articles"}</small>
                </div>
                <p>{topic.blurb}</p>
                <ul>
                  {posts.map((p) => (
                    <li key={p.id}>
                      <a
                        href={`#${p.id}`}
                        onClick={(e) => { e.preventDefault(); onPick(topic.key); setTimeout(() => scrollToId(p.id), 60); }}
                      >
                        <span>{p.title}</span><b>↗</b>
                      </a>
                    </li>
                  ))}
                </ul>
                <button type="button" className="jr-topic-all" onClick={() => { onPick(topic.key); scrollToId("articles"); }}>
                  View all in {topic.label} →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Strip + CTA ─── */
function Strip() {
  return (
    <section className="jr-strip" aria-label="Talk to Markition">
      <div className="jr-wrap">
        <div>
          <span>Reading about a problem you have right now?</span>
          <strong>Skip ahead — talk it through with our team.</strong>
        </div>
        <a href="/contact">Book a free consultation ↗</a>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="jr-cta">
      <div className="jr-wrap">
        <Reveal>
          <div className="jr-cta-box" onPointerMove={trackSpotlight}>
            <div className="jr-eyebrow">03 / Start a Project</div>
            <h2>TURN INSIGHT<br />INTO <em>ACTION.</em></h2>
            <p>
              From strategy and marketing to technology, design and AI, Markition connects the
              pieces that move businesses forward.
            </p>
            <a className="jr-btn" href="/contact">Let&apos;s talk ↗</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Root export ─── */
export default function BlogContent({ className = "" }: { className?: string }) {
  const [filter, setFilter] = useState("all");
  return (
    <div className={`jr ${className}`}>
      <ScrollProgress />
      <Hero />
      <Marquee />
      <Archive filter={filter} setFilter={setFilter} />
      <Topics onPick={setFilter} />
      <Strip />
      <Cta />
    </div>
  );
}
