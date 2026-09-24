"use client";

import { useState } from "react";
import Link from "next/link";

const BLUE = "#1236E8";
const CYAN = "#38BDF8";

const FAQS = [
  {
    q: "What services does Markition provide?",
    a: "We provide digital marketing, web and software development, UI/UX design, branding, SEO, social media management, and other digital solutions under one roof.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes — we partner with startups, small businesses, and established brands alike, tailoring our approach and pricing to fit each stage of growth.",
  },
  {
    q: "How do you start a new project?",
    a: "Every project starts with a discovery call to understand your goals, followed by a proposal, timeline, and a dedicated team assigned to your brand.",
  },
  {
    q: "How long does a project usually take?",
    a: "Timelines vary by scope — a typical website or branding project takes 4–8 weeks, while ongoing marketing retainers run on a monthly cadence.",
  },
  {
    q: "Can you manage our social media accounts?",
    a: "Absolutely — we offer full social media management, from content creation and scheduling to community engagement and performance reporting.",
  },
  {
    q: "Do you provide customized solutions?",
    a: "Every solution we build is tailored to your brand's goals, audience, and industry — we don't believe in one-size-fits-all packages.",
  },
  {
    q: "How much do your services cost?",
    a: "Pricing depends on project scope and deliverables. Reach out for a free consultation and we'll put together a custom quote for you.",
  },
];

const FOOTER_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Locations", href: "/locations" },
  { label: "Resources", href: "/resources" },
  { label: "Technologies", href: "/technologies" },
  { label: "Legal", href: "/legal" },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200"
      style={{
        background: open ? BLUE : "transparent",
        border: open ? "none" : "1px solid rgba(255,255,255,0.18)",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path
          d="M6.5 1v11M1 6.5h11"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            transformOrigin: "6.5px 6.5px",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </svg>
    </span>
  );
}

function FaqItem({
  faq,
  open,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl px-4 py-3.5 sm:px-5 sm:py-4 transition-colors duration-200"
      style={{
        background: open ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-[13.5px] sm:text-[14px] font-semibold text-white">{faq.q}</span>
        <PlusIcon open={open} />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: open ? "140px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="pt-2.5 text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke={CYAN} strokeWidth="1.3" />
      <path d="M2 4l6 5 6-5" stroke={CYAN} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 1.5h2l1 3-1.5 1a8 8 0 004.5 4.5l1-1.5 3 1v2a1.5 1.5 0 01-1.6 1.5A11.5 11.5 0 012 3.1a1.5 1.5 0 011.5-1.6z"
        stroke={CYAN}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 14.5S13 10 13 6.5a5 5 0 00-10 0C3 10 8 14.5 8 14.5z"
        stroke={CYAN}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6.5" r="1.75" stroke={CYAN} strokeWidth="1.3" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10.5 4.5H9a1 1 0 00-1 1v1.5h2.5L10 9.5H8V15H5.5V9.5H4V7h1.5V5.3C5.5 3.5 6.5 2.5 8.5 2.5h2v2z"
        fill={CYAN}
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14 3.5c-.5.25-1.05.4-1.6.5a2.8 2.8 0 001.2-1.5c-.55.3-1.15.55-1.8.7a2.8 2.8 0 00-4.8 2.6A8 8 0 013 3.4a2.8 2.8 0 00.9 3.8 2.7 2.7 0 01-1.3-.35v.05a2.8 2.8 0 002.25 2.75 2.8 2.8 0 01-1.3.05 2.8 2.8 0 002.6 2 5.6 5.6 0 01-4.15 1.15 8 8 0 0012.3-6.75v-.35c.55-.4 1.05-.9 1.4-1.5z"
        fill={CYAN}
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke={CYAN} strokeWidth="1.2" />
      <circle cx="4.75" cy="5" r="0.9" fill={CYAN} />
      <path d="M4.75 6.9V11.5" stroke={CYAN} strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M7.5 11.5V8.8c0-1 .6-1.9 1.7-1.9s1.8.9 1.8 1.9v2.7"
        stroke={CYAN}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M7.5 6.9V11.5" stroke={CYAN} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Twitter", href: "https://twitter.com", Icon: TwitterIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
];

export function Footer() {
  const [openIndex, setOpenIndex] = useState(0);
  const year = new Date().getFullYear();

  return (
    <footer data-navbar-theme="dark" style={{ background: "#080B1A" }} className="pt-16 sm:pt-20 lg:pt-20">
      {/* ── FAQ section ── */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr] lg:gap-14">
          <div className="relative mx-auto h-[420px] w-full max-w-[380px] overflow-hidden rounded-2xl lg:mx-0 lg:h-auto lg:max-w-none lg:self-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/design-lab/footer-image.png"
              alt="Markition team member with an idea"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div>
            <h2
              className="font-extrabold"
              style={{
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                fontFamily: "var(--font-jakarta, sans-serif)",
              }}
            >
              <span className="text-white">Frequently Asked </span>
              <span style={{ color: CYAN }}>Questions</span>
            </h2>
            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Have questions? We have answers. Explore our latest projects and see how we turn ideas
              into powerful digital experiences that deliver real results.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={faq.q}
                  faq={faq}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div className="mx-auto mt-14 max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <Link href="/design-lab" aria-label="Markition — Home" className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/design-lab/Logo_design_2.png" alt="Markition" className="h-[30px] w-auto" />
          </Link>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[14px] font-medium text-white/75">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-medium text-white/75">Stay Connected</span>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:brightness-125"
                  style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.25)" }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-4 py-8 text-[14px] sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
            <a href="mailto:hey@markition.com" className="flex items-center gap-2 text-white/70 transition-colors hover:text-white">
              <MailIcon />
              hey@markition.com
            </a>
            <a href="tel:+17138947727" className="flex items-center gap-2 text-white/70 transition-colors hover:text-white">
              <PhoneIcon />
              +1 (713) 894-7727
            </a>
            <span className="flex items-center gap-2 text-white/70">
              <PinIcon />
              Houston, Texas, USA
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)" }}>&copy; {year} Markition. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
