"use client";

import { useState } from "react";

const CARDS = [
  { kind: "email", label: "Email us", value: "hey@markition.com", href: "mailto:hey@markition.com", note: "Project enquiries and partnerships" },
  { kind: "phone", label: "Call us · Saudi Arabia", value: "+966 51 085 5709", href: "tel:+966510855709", note: "For enquiries across Saudi Arabia" },
  { kind: "phone", label: "Call us · Pakistan", value: "+92 (334) 272-2337", href: "tel:+923342722337", note: "Connect with our Pakistan team" },
  { kind: "phone", label: "Call us · USA", value: "+1 (217) 401-0041", href: "tel:+12174010041", note: "Connect with our USA team" },
];

function Icon({ kind }: { kind: string }) {
  return kind === "email" ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3.5h2.6l1.6 4-2 1.3a11 11 0 0 0 6.4 6.4l1.3-2 4 1.6v2.6A2.1 2.1 0 0 1 18.4 20 15.4 15.4 0 0 1 4 5.6a2.1 2.1 0 0 1 2.6-2.1z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactCards() {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = async (i: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1800);
    } catch {
      /* clipboard blocked — the link itself still works */
    }
  };

  const spotlight = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="ct-info-grid">
      {CARDS.map((c, i) => (
        <div className="ct-info-card" key={c.href} onPointerMove={spotlight}>
          <div className="ct-info-top">
            <span className="ct-info-icon"><Icon kind={c.kind} /></span>
            <button
              type="button"
              className={`ct-copy${copied === i ? " done" : ""}`}
              onClick={() => copy(i, c.kind === "email" ? c.value : c.href.replace("tel:", ""))}
              aria-label={`Copy ${c.value}`}
            >
              {copied === i ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <small>{c.label}</small>
          <a href={c.href}>
            {c.value}
            <span aria-hidden="true">↗</span>
          </a>
          <p>{c.note}</p>
        </div>
      ))}
      <span className="sr-only" aria-live="polite">{copied !== null ? "Copied to clipboard" : ""}</span>
    </div>
  );
}
