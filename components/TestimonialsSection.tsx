"use client";

import ScrollReveal from "@/components/ScrollReveal";

/* ── Data shapes ─────────────────────────────────────────────────── */

interface RatingPlatform {
  name: string;
  rating: string;
  logo: React.ReactNode;
}

export interface Testimonial {
  type: "text" | "video";
  stars: number;
  quote: string;
  highlight: string;
  name: string;
  verified?: boolean;
  role: string;
  company: string;
  avatarSrc?: string;
  videoThumbSrc?: string;
  videoLabel?: string;
}

/* ── Platform logos ──────────────────────────────────────────────── */

function TrustpilotLogo() {
  return (
    <span className="flex items-center gap-1.5">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l2.6 7.9H22l-6.4 4.6 2.4 7.5L12 17.6 5.9 22l2.4-7.5L2 9.9h7.4z" fill="#00B67A" />
      </svg>
      <span className="font-bold text-white text-[13px]">Trustpilot</span>
    </span>
  );
}

function GoogleLogo() {
  return (
    <span className="font-bold text-[15px] tracking-tight">
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

function FacebookLogo() {
  return (
    <span className="font-bold text-[14px] italic" style={{ color: "#1877F2" }}>
      facebook
    </span>
  );
}

/* ── Static data ─────────────────────────────────────────────────── */

const PLATFORMS: RatingPlatform[] = [
  { name: "Trustpilot", rating: "4.4/5", logo: <TrustpilotLogo /> },
  { name: "Google",     rating: "4.4/5", logo: <GoogleLogo /> },
  { name: "Facebook",   rating: "4.4/5", logo: <FacebookLogo /> },
];

const TESTIMONIALS: Testimonial[] = [
  {
    type: "text",
    stars: 4,
    quote: "They created my website and a more professional face online. I highly recommend Markition for business development.",
    highlight: "I highly recommend Markition",
    name: "Susan",
    verified: true,
    role: "CEO & Founder",
    company: "Concierge",
  },
  {
    type: "video",
    stars: 5,
    quote: "They created my website and a more professional face online. I highly recommend Markition for business development.",
    highlight: "I highly recommend Markition",
    name: "Susan Hicks",
    verified: true,
    role: "CEO & Founder",
    company: "Concierge Home Care LLC",
    videoThumbSrc: "",
    videoLabel: "SUSAN HICKS",
  },
  {
    type: "text",
    stars: 4,
    quote: "They created my website and a more professional face online. I highly recommend Markition for business development.",
    highlight: "I highly recommend Markition",
    name: "Susan",
    verified: true,
    role: "CEO & Founder",
    company: "Concierge",
  },
  {
    type: "video",
    stars: 5,
    quote: "They created my website and a more professional face online. I highly recommend Markition for business development.",
    highlight: "I highly recommend Markition",
    name: "Jill Nicole Geesey",
    verified: true,
    role: "Revenue Integrity Consulting",
    company: "Healthcare",
    videoThumbSrc: "",
    videoLabel: "JILL NICOLE GEESEY",
  },
  {
    type: "text",
    stars: 4,
    quote: "They created my website and a more professional face online. I highly recommend Markition for business development.",
    highlight: "I highly recommend Markition",
    name: "Susan",
    verified: true,
    role: "CEO & Founder",
    company: "Concierge",
  },
];

/* ── Shared helpers ──────────────────────────────────────────────── */

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2l2.6 7.9H22l-6.4 4.6 2.4 7.5L12 17.6 5.9 22l2.4-7.5L2 9.9h7.4z"
            fill={i < count ? "#F5A623" : "rgba(245,166,35,0.22)"}
          />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-shrink-0">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Generic person silhouette — used wherever no real avatar exists */
function AvatarPlaceholder({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 rounded-full"
      style={{ background: "#1E2A4A" }}
    >
      <circle cx="20" cy="16" r="7" fill="#4A5A7A" />
      <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#4A5A7A" />
    </svg>
  );
}

function QuoteWithHighlight({ quote, highlight }: { quote: string; highlight: string }) {
  const idx = quote.indexOf(highlight);
  if (idx === -1) {
    return (
      <p className="text-[13px] leading-relaxed italic" style={{ color: "#374151" }}>
        &ldquo;{quote}&rdquo;
      </p>
    );
  }
  return (
    <p className="text-[13px] leading-relaxed italic" style={{ color: "#374151" }}>
      &ldquo;{quote.slice(0, idx)}
      <span style={{ color: "#0137D7" }}>{highlight}</span>
      {quote.slice(idx + highlight.length)}&rdquo;
    </p>
  );
}

/* ── Card variants ───────────────────────────────────────────────── */

const CARD_HEIGHT = 300;
const CARD_WIDTH_TEXT  = 310;
const CARD_WIDTH_VIDEO = 250;

function TextCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col justify-between rounded-2xl p-5"
      style={{
        width: CARD_WIDTH_TEXT,
        height: CARD_HEIGHT,
        background: "rgba(226,232,240,0.95)",
        border: "1px solid rgba(203,213,225,0.7)",
      }}
    >
      <div>
        <StarRating count={t.stars} />
        <QuoteWithHighlight quote={t.quote} highlight={t.highlight} />
      </div>

      <div
        className="flex items-center gap-2.5 pt-4"
        style={{ borderTop: "1px solid rgba(148,163,184,0.3)" }}
      >
        {t.avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.avatarSrc} alt={t.name} className="rounded-full object-cover flex-shrink-0" style={{ width: 36, height: 36 }} />
        ) : (
          <AvatarPlaceholder size={36} />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[13px] truncate" style={{ color: "#1E293B" }}>{t.name}</span>
            {t.verified && <VerifiedBadge />}
          </div>
          <p className="text-[11px] truncate" style={{ color: "#64748B" }}>
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        width: CARD_WIDTH_VIDEO,
        height: CARD_HEIGHT,
        background: "#111827",
      }}
    >
      {/* Thumbnail or placeholder */}
      {t.videoThumbSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={t.videoThumbSrc}
          alt={t.videoLabel ?? t.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        /* Placeholder: gradient + person silhouette */
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "linear-gradient(160deg, #1E293B 0%, #0F172A 100%)" }}
        >
          <svg width="90" height="90" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="15" r="8" fill="#2D3F5E" />
            <path d="M4 40c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#2D3F5E" />
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 38%, rgba(0,0,0,0.15) 100%)" }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.25)" }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="white" aria-hidden="true" style={{ marginLeft: 2 }}>
            <path d="M3 2l9 5-9 5V2z" />
          </svg>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
        <p className="text-white font-bold text-[10px] tracking-widest uppercase">{t.videoLabel ?? t.name}</p>
        <p className="text-white/55 text-[10px] mt-0.5 truncate">{t.company}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return t.type === "video" ? <VideoCard t={t} /> : <TextCard t={t} />;
}

/* ── Main section ────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-12 sm:py-16 lg:py-24" style={{ background: "#000028" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Heading */}
        <ScrollReveal threshold={0.2}>
          <h2
            className="text-center font-bold text-[28px] sm:text-[36px] lg:text-[44px] mb-10 sm:mb-12"
            style={{
              fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              color: "#22C5F5",
              letterSpacing: "-0.02em",
            }}
          >
            Real Results
          </h2>
        </ScrollReveal>

        {/* Platform rating badges */}
        <ScrollReveal delay={80} threshold={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl w-full sm:w-auto justify-center"
                style={{
                  background: "#0D1535",
                  border: "1px solid #1E2D4A",
                  minWidth: "210px",
                  fontFamily: "var(--font-jakarta, sans-serif)",
                }}
              >
                {p.logo}
                <span className="text-white/75 text-[13px] font-medium">Rated {p.rating}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Full-bleed scrolling track */}
      <div className="relative overflow-hidden" style={{ height: CARD_HEIGHT + 2 }}>
        <div className="testimonials-track flex items-center gap-4 w-max h-full px-6">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* Edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 z-10"
          style={{ background: "linear-gradient(to right, #000028 0%, transparent 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 z-10"
          style={{ background: "linear-gradient(to left, #000028 0%, transparent 100%)" }}
        />
      </div>

      <style>{`
        .testimonials-track {
          animation: scroll-testimonials 40s linear infinite;
        }
        .testimonials-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-testimonials {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
