"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

/* ─── Data ─── */
const POSTS = [
  {
    id: "article-1", num: "01", size: "large", category: "seo", categoryLabel: "SEO & Search",
    title: "SEO, GEO and the new ways customers discover businesses",
    excerpt: "Understand the evolving search landscape and the foundations that help your brand get discovered.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=85",
    alt: "Laptop displaying web analytics",
    search: "seo geo search engine optimization ai search visibility",
  },
  {
    id: "article-2", num: "02", size: "medium", category: "marketing", categoryLabel: "Digital Marketing",
    title: "Before you increase your ad budget, fix these fundamentals",
    excerpt: "A practical look at offer clarity, landing pages, tracking and creative testing before spending more.",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
    alt: "Team collaborating on campaign strategy",
    search: "paid advertising campaign strategy ad budget conversion",
  },
  {
    id: "article-3", num: "03", size: "small", category: "technology", categoryLabel: "Technology",
    title: "Website or web app? Choose the right tool for the job",
    excerpt: "Learn the difference between a marketing website and a digital product built for people to do things.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    alt: "Developer working at a computer",
    search: "website web app software digital experience",
  },
  {
    id: "article-4", num: "04", size: "small", category: "ai", categoryLabel: "AI & Automation",
    title: "Where AI assistants can make a real difference in your business",
    excerpt: "Explore practical ways to support lead response, repetitive workflows and customer service.",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
    alt: "Abstract artificial intelligence visual",
    search: "AI chatbot voice agent automation leads customer support",
  },
  {
    id: "article-5", num: "05", size: "small", category: "design", categoryLabel: "Brand & Design",
    title: "Good design is more than looking professional",
    excerpt: "How clarity, consistency and usability help people understand your value and trust your brand.",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
    alt: "Minimal creative workspace",
    search: "branding design visual identity trust customer perception",
  },
  {
    id: "article-6", num: "06", size: "medium", category: "marketing", categoryLabel: "Social Media",
    title: "A social media plan your team can actually maintain",
    excerpt: "Build a sustainable content rhythm around your audience, goals and available resources.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85",
    alt: "Social media apps on a screen",
    search: "social media content strategy organic content consistency",
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "marketing", label: "Digital Marketing" },
  { key: "technology", label: "Technology" },
  { key: "design", label: "Design" },
  { key: "ai", label: "AI & Automation" },
  { key: "seo", label: "SEO & Search" },
];

const TICKER_ITEMS = [
  { href: "#article-1", text: "SEO & GEO in the age of AI search" },
  { href: "#article-2", text: "How to plan better paid campaigns" },
  { href: "#article-3", text: "Website or web app?" },
  { href: "#article-4", text: "Practical AI for growing teams" },
  { href: "#article-5", text: "Branding beyond a logo" },
  { href: "#article-6", text: "Build a consistent content system" },
];

/* ─── Reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`blog-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Hero ─── */
function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="blog-hero-grid-bg" />
      <div className="blog-hero-glow one" />
      <div className="blog-hero-glow two" />
      <div className="blog-container blog-hero-canvas">
        <svg className="blog-hero-connector" viewBox="0 0 1320 620" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="blogConnectorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1236E8" stopOpacity="0" />
              <stop offset="25%" stopColor="#1236E8" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#20D9FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#20D9FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="blogRingGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1236E8" />
              <stop offset="100%" stopColor="#20D9FF" />
            </linearGradient>
          </defs>
          <path className="blog-connector-path" d="M 620 260 C 720 260, 780 290, 850 320 S 980 370, 1010 390" />
          <path className="blog-connector-path dashed" d="M 640 290 C 720 310, 760 340, 830 360 S 950 400, 1000 420" />
          <circle className="blog-connector-node" cx="620" cy="260" r="4" />
          <circle className="blog-connector-node blue" cx="1010" cy="390" r="4" />
        </svg>

        <div className="blog-hero-grid">
          <div className="blog-hero-left">
            <Reveal>
              <div className="blog-hero-meta">
                <div className="blog-hero-tag">Markition Journal</div>
                <div className="blog-hero-issue">Issue <strong>N° 024</strong> · Oct 2026</div>
              </div>
            </Reveal>
            <h1>
              <span className="line"><span>Insights &amp;</span></span>
              <span className="line"><span className="italic">Articles.</span></span>
            </h1>
            <Reveal delay={200}>
              <p className="blog-hero-desc">
                Discover practical ideas, fresh perspectives, and useful strategies
                from across <span className="highlight">marketing, technology, design, and AI</span>.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <aside className="blog-journal-pulse" aria-label="Journal pulse">
              <div className="blog-pulse-head">
                <div className="blog-pulse-title">
                  <span className="blog-live-dot" />
                  Live Pulse
                </div>
                <span className="blog-pulse-issue">WEEK 42</span>
              </div>

              <div className="blog-pulse-hero-stat">
                <div className="blog-ring-chart">
                  <svg viewBox="0 0 88 88" width="88" height="88">
                    <circle className="blog-ring-bg" cx="44" cy="44" r="36" />
                    <circle className="blog-ring-fill" cx="44" cy="44" r="36" />
                  </svg>
                  <div className="blog-ring-center">
                    82%
                    <small>read</small>
                  </div>
                </div>
                <div className="blog-pulse-stat-info">
                  <h4>Deep engagement</h4>
                  <p>Most readers finish our long-form pieces to the very end.</p>
                </div>
              </div>

              <div className="blog-pulse-rows">
                {[
                  { label: "Marketing", pct: 42, cyan: false },
                  { label: "Technology", pct: 28, cyan: true },
                  { label: "Design", pct: 18, cyan: false },
                  { label: "AI & SEO", pct: 12, cyan: true },
                ].map((row, i) => (
                  <div className="blog-pulse-row" key={row.label}>
                    <div>
                      <div className="blog-pulse-row-label">
                        <span className={`blog-cat-dot${row.cyan ? " cyan" : ""}`} />
                        {row.label}
                      </div>
                      <div className="blog-pulse-row-bar">
                        <div
                          className="blog-pulse-row-bar-fill animate"
                          style={{ width: `${row.pct}%`, animationDelay: `${i * 0.15}s` }}
                        />
                      </div>
                    </div>
                    <div className="blog-pulse-row-num">{row.pct}<small>%</small></div>
                  </div>
                ))}
              </div>

              <div className="blog-pulse-footer">
                <span>Read by</span>
                <div className="blog-pulse-avatars">
                  <div className="blog-pulse-avatar one">R</div>
                  <div className="blog-pulse-avatar two">A</div>
                  <div className="blog-pulse-avatar three">M</div>
                  <div className="blog-pulse-avatar four">+</div>
                </div>
                <span>2.4k readers</span>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Article ticker ─── */
function BlogTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="blog-ticker" aria-label="Latest articles">
      <div className="blog-container">
        <div className="blog-ticker-inner">
          <span className="blog-ticker-badge">Latest insights</span>
          <div className="blog-ticker-scroll-wrap">
            <div className="blog-ticker-scroll">
              {items.map((item, i) => (
                <a key={i} href={item.href}>{item.text}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Post card ─── */
function PostCard({ post, delay = 0 }: { post: typeof POSTS[number]; delay?: number }) {
  const ref = useReveal();
  return (
    <article
      ref={ref}
      className={`blog-post-card ${post.size} blog-reveal`}
      id={post.id}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <a className="blog-card-img" href="/contact" aria-label={post.title}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src={post.image} alt={post.alt} />
        <span className="blog-card-num">{post.num}</span>
      </a>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-cat">{post.categoryLabel}</span>
          <span className="blog-card-read">{post.readTime}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <a className="blog-card-link" href="/contact">
          Read article <span className="arrow-icon">↗</span>
        </a>
      </div>
    </article>
  );
}

/* ─── Archive (search + filter + grid) ─── */
function Archive() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => {
      const matchCat = filter === "all" || p.category === filter;
      const haystack = (p.search + " " + p.title + " " + p.excerpt + " " + p.categoryLabel).toLowerCase();
      const matchText = !q || haystack.includes(q);
      return matchCat && matchText;
    });
  }, [filter, query]);

  const clearSearch = useCallback(() => setQuery(""), []);

  return (
    <section className="blog-archive" id="articles">
      <div className="blog-container">
        <div className="blog-archive-head">
          <div className="blog-archive-title-group">
            <div className="blog-section-label">The Markition Journal</div>
            <h2>Explore our <em>latest</em> thinking.</h2>
          </div>
          <label className="blog-search-wrap">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
            />
            <button type="button" onClick={clearSearch} aria-label="Clear search">⌕</button>
          </label>
        </div>

        <div className="blog-filter-row" role="group" aria-label="Filter articles">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`blog-filter-btn${filter === f.key ? " active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        <div className="blog-post-grid">
          {filtered.map((post, i) => (
            <PostCard key={post.id} post={post} delay={i * 80} />
          ))}
        </div>

        <div className={`blog-no-results${filtered.length === 0 ? " show" : ""}`}>
          <div className="icon">🔍</div>
          <h3>No articles found</h3>
          <p>Try a different keyword or category.</p>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function BlogCta() {
  return (
    <section className="blog-cta">
      <div className="blog-cta-grid-bg" />
      <div className="blog-cta-glow one" />
      <div className="blog-cta-glow two" />
      <div className="blog-container blog-cta-inner">
        <Reveal>
          <div className="blog-cta-text">
            <div className="blog-cta-label">Have a project in mind?</div>
            <h2>Turn insight<br />into <em>action.</em></h2>
            <p>
              From strategy and marketing to technology, design and AI,
              Markition connects the pieces that move businesses forward.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <a className="blog-cta-button" href="/contact">
            <span>Let&apos;s Talk <span style={{ display: "inline-block" }}>↗</span></span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Root export ─── */
export default function BlogContent() {
  return (
    <div className="blog-root">
      <BlogHero />
      <BlogTicker />
      <Archive />
      <BlogCta />
    </div>
  );
}
