"use client";

import ScrollReveal from "@/components/ScrollReveal";

/* ─── Platform ratings ───────────────────────────────────────────────────── */
function TrustpilotLogo() {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2l2.6 7.9H22l-6.4 4.6 2.4 7.5L12 17.6 5.9 22l2.4-7.5L2 9.9h7.4z" fill="#00B67A" /></svg>
      <span style={{ fontWeight: 700, color: "#fff", fontSize: 13 }}>Trustpilot</span>
    </span>
  );
}
function GoogleLogo() {
  return (
    <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.5px" }}>
      <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}
function FacebookLogo() {
  return <span style={{ fontWeight: 700, fontSize: 14, fontStyle: "italic", color: "#1877F2" }}>facebook</span>;
}

const PLATFORMS = [
  { name: "Trustpilot", rating: "4.4/5", logo: <TrustpilotLogo /> },
  { name: "Google",     rating: "4.4/5", logo: <GoogleLogo /> },
  { name: "Facebook",   rating: "4.4/5", logo: <FacebookLogo /> },
];

/* ─── Testimonials data ──────────────────────────────────────────────────── */
interface Testimonial {
  stars: number;
  quote: string;
  highlight: string;
  name: string;
  verified?: boolean;
  role: string;
  company: string;
  /* left-panel image (video thumbnail or portrait photo) */
  imageSrc?: string;
  /* small avatar in the bottom author row */
  avatarSrc?: string;
  /* top-left branding shown on the left panel */
  brandLogos?: string[];
  /* person's full name shown on the left panel */
  panelName?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    stars: 4,
    quote: "They created my website and a more professional face online. I highly recommend Markition for business development.",
    highlight: "I highly recommend Markition",
    name: "Susan",
    verified: true,
    role: "CEO & Founder",
    company: "Concierge",
    panelName: "SUSAN HICKS",
    imageSrc: "/susan-hicks.png",
    avatarSrc: "/susan-hicks.png",
  },
  {
    stars: 5,
    quote: "Markition transformed our digital presence completely. Their team delivered beyond expectations and the results speak for themselves.",
    highlight: "delivered beyond expectations",
    name: "Jill Nicole",
    verified: true,
    role: "Revenue Integrity Consulting",
    company: "Healthcare",
    panelName: "JILL NICOLE GEESEY",
    imageSrc: "/susan-hicks.png",
    avatarSrc: "/susan-hicks.png",
  },
  {
    stars: 5,
    quote: "From SEO to paid ads, they handled everything with precision. Our leads doubled within 3 months of working with Markition.",
    highlight: "Our leads doubled",
    name: "Michael",
    verified: true,
    role: "Director of Marketing",
    company: "TechVentures",
    panelName: "MICHAEL CARTER",
    imageSrc: "/susan-hicks.png",
    avatarSrc: "/susan-hicks.png",
  },
  {
    stars: 4,
    quote: "The branding and website design they delivered was exactly what our business needed. Clean, professional and conversion-focused.",
    highlight: "exactly what our business needed",
    name: "Amanda",
    verified: true,
    role: "Founder",
    company: "Bloom Agency",
    panelName: "AMANDA WELLS",
    imageSrc: "/susan-hicks.png",
    avatarSrc: "/susan-hicks.png",
  },
  {
    stars: 5,
    quote: "Working with Markition was a game-changer for us. Their data-driven approach and attention to detail set them apart.",
    highlight: "game-changer for us",
    name: "David",
    verified: true,
    role: "CEO",
    company: "ScaleUp Labs",
    panelName: "DAVID MORGAN",
    imageSrc: "/susan-hicks.png",
    avatarSrc: "/susan-hicks.png",
  },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24">
          <path d="M12 2l2.6 7.9H22l-6.4 4.6 2.4 7.5L12 17.6 5.9 22l2.4-7.5L2 9.9h7.4z"
            fill={i < count ? "#F5A623" : "rgba(245,166,35,0.2)"} />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteWithHighlight({ quote, highlight }: { quote: string; highlight: string }) {
  const idx = quote.indexOf(highlight);
  if (idx === -1) return (
    <p style={{ fontSize: 13, lineHeight: 1.65, fontStyle: "italic", color: "#374151", margin: 0 }}>
      &ldquo;{quote}&rdquo;
    </p>
  );
  return (
    <p style={{ fontSize: 13, lineHeight: 1.65, fontStyle: "italic", color: "#374151", margin: 0 }}>
      &ldquo;{quote.slice(0, idx)}
      <span style={{ color: "#0137D7" }}>{highlight}</span>
      {quote.slice(idx + highlight.length)}&rdquo;
    </p>
  );
}

/* ─── Two-column testimonial card ────────────────────────────────────────── */
const CARD_HEIGHT = 270;
const LEFT_W      = 190;
const RIGHT_W     = 300;

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="tc-card"
      style={{
        display: "flex",
        flexShrink: 0,
        width: LEFT_W + RIGHT_W,
        height: CARD_HEIGHT,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        border: "1px solid rgba(200,213,225,0.55)",
      }}
    >
      {/* ── Left panel — customer photo / video ── */}
      <div className="tc-left"
        style={{
          width: LEFT_W,
          height: "100%",
          flexShrink: 0,
          position: "relative",
          background: t.imageSrc
            ? "transparent"
            : "linear-gradient(160deg, #1a2a4e 0%, #0e1a36 100%)",
          overflow: "hidden",
        }}
      >
        {/* Background photo */}
        {t.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.imageSrc}
            alt={t.panelName ?? t.name}
            draggable={false}
            className="tc-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
        ) : (
          /* Placeholder silhouette */
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="90" height="90" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="14" r="8" fill="#2D3F5E" />
              <path d="M4 40c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#2D3F5E" />
            </svg>
          </div>
        )}

        {/* Dark overlay gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.78) 30%, rgba(0,0,0,0.08) 100%)",
        }} />

        {/* Play button */}
        <div className="tc-play" style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.28)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="white" style={{ marginLeft: 2 }}>
            <path d="M3 2l9 5-9 5V2z" />
          </svg>
        </div>

        {/* Bottom name + company */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px" }}>
          <p style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {t.panelName ?? t.name}
          </p>
          <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 9, letterSpacing: "0.04em" }}>
            {t.company}
          </p>
        </div>
      </div>

      {/* ── Right panel — stars + quote + author ── */}
      <div className="tc-right"
        style={{
          flex: 1,
          background: "rgba(248,250,252,0.97)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "18px 18px 16px",
          position: "relative",
        }}
      >
        {/* Decorative quotation mark */}
        <div style={{
          position: "absolute", top: 14, right: 16,
          fontSize: 44, lineHeight: 1, color: "rgba(180,195,215,0.35)",
          fontFamily: "Georgia, serif", userSelect: "none",
          pointerEvents: "none",
        }}>
          &rdquo;
        </div>

        {/* Stars + quote */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <StarRating count={t.stars} />
          <QuoteWithHighlight quote={t.quote} highlight={t.highlight} />
        </div>

        {/* Author row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          paddingTop: 12,
          borderTop: "1px solid rgba(148,163,184,0.25)",
        }}>
          {/* Avatar */}
          {t.avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.avatarSrc} alt={t.name} draggable={false}
              style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          ) : (
            <div style={{
              width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
              background: "#1E2A4A", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="16" r="7" fill="#4A5A7A" />
                <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#4A5A7A" />
              </svg>
            </div>
          )}

          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontWeight: 700, fontSize: 12.5, color: "#1E293B" }}>{t.name}</span>
              {t.verified && <VerifiedBadge />}
            </div>
            <p style={{ margin: 0, fontSize: 11, color: "#64748B" }}>
              {t.role} · {t.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function TestimonialsSection() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section style={{ background: "#000028", padding: "64px 0 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <ScrollReveal threshold={0.2}>
          <h2 style={{
            textAlign: "center",
            fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
            color: "#22C5F5",
            fontSize: "clamp(28px,3.6vw,44px)",
            fontWeight: 800, letterSpacing: "-0.02em",
            margin: "0 0 40px",
          }}>
            Real Results
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80} threshold={0.2}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 52 }}>
            {PLATFORMS.map(p => (
              <div key={p.name} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 20px", borderRadius: 12,
                background: "#0D1535", border: "1px solid #1E2D4A",
                minWidth: 210,
                fontFamily: "var(--font-jakarta, sans-serif)",
              }}>
                {p.logo}
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500 }}>
                  Rated {p.rating}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Scrolling track */}
      <div style={{ position: "relative", overflow: "hidden", height: CARD_HEIGHT + 4 }}>
        <div className="testimonials-track" style={{ display: "flex", alignItems: "center", gap: 18, width: "max-content", height: "100%", padding: "2px 32px" }}>
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* Edge fades */}
        <div style={{ pointerEvents: "none", position: "absolute", inset: "0 auto 0 0", width: 120, background: "linear-gradient(to right, #000028, transparent)", zIndex: 10 }} />
        <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0 0 auto", width: 120, background: "linear-gradient(to left, #000028, transparent)", zIndex: 10 }} />
      </div>

      <style>{`
        .testimonials-track { animation: scroll-testimonials 44s linear infinite; }
        .testimonials-track:hover { animation-play-state: paused; }
        @keyframes scroll-testimonials {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Card hover animations ── */
        .tc-card {
          transition:
            transform 0.40s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.40s ease,
            border-color 0.30s ease;
          cursor: pointer;
          will-change: transform;
        }
        .tc-card:hover {
          transform: translateY(-12px) scale(1.025);
          box-shadow:
            0 0 0 1.5px rgba(0,212,255,0.55),
            0 20px 60px rgba(0,212,255,0.20),
            0 10px 36px rgba(0,0,60,0.45);
          border-color: rgba(0,212,255,0.55) !important;
        }

        /* Image zoom on hover */
        .tc-img {
          transition: transform 0.50s cubic-bezier(0.4,0,0.2,1);
        }
        .tc-card:hover .tc-img {
          transform: scale(1.08);
        }

        /* Play button pulse + grow on hover */
        .tc-play {
          transition:
            transform 0.40s cubic-bezier(0.34,1.56,0.64,1),
            background 0.30s ease,
            box-shadow 0.30s ease;
        }
        .tc-card:hover .tc-play {
          transform: translate(-50%, -50%) scale(1.28);
          background: rgba(255,255,255,0.32);
          box-shadow:
            0 0 0 10px rgba(255,255,255,0.08),
            0 0 28px rgba(255,255,255,0.25);
        }

        /* Right panel subtle brighten */
        .tc-right {
          transition: background 0.30s ease;
        }
        .tc-card:hover .tc-right {
          background: rgba(242,248,255,1.0) !important;
        }
      `}</style>
    </section>
  );
}
