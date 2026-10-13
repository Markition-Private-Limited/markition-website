"use client";

import { useState } from "react";

const TOPICS = ["Digital marketing", "Website / app", "Design & branding", "AI & automation", "Not sure yet"];
const MAX = 1000;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [topics, setTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const toggle = (t: string) =>
    setTopics((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const company = (fd.get("company") as string) || "";
    const subject = encodeURIComponent("Contact enquiry from " + name);
    const body = encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + email +
      (company ? "\nCompany: " + company : "") +
      (topics.length ? "\nInterested in: " + topics.join(", ") : "") +
      "\n\nMessage:\n" + message
    );
    setSubmitted(true);
    window.location.href = "mailto:hey@markition.com?subject=" + subject + "&body=" + body;
  }

  if (submitted) {
    return (
      <div className="ct-success" role="status">
        <div className="ct-success-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>Your message is ready to send.</h3>
        <p>
          Your email app should open with everything filled in. If it doesn&apos;t, email{" "}
          <a href="mailto:hey@markition.com">hey@markition.com</a> directly.
        </p>
        <button type="button" className="ct-link-btn" onClick={() => setSubmitted(false)}>
          ← Edit message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ct-form">
      <fieldset className="ct-topics">
        <legend>What can we help with?</legend>
        <div className="ct-chips">
          {TOPICS.map((t) => {
            const on = topics.includes(t);
            return (
              <button
                key={t}
                type="button"
                className={`ct-chip${on ? " on" : ""}`}
                aria-pressed={on}
                onClick={() => toggle(t)}
              >
                <span className="ct-chip-tick" aria-hidden="true">✓</span>
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="ct-row">
        <div className="ct-field">
          <label htmlFor="ct-name">Full name <i>*</i></label>
          <input id="ct-name" name="name" placeholder="Jane Cooper" autoComplete="name" required />
        </div>
        <div className="ct-field">
          <label htmlFor="ct-email">Email <i>*</i></label>
          <input id="ct-email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" required />
        </div>
      </div>
      <div className="ct-field">
        <label htmlFor="ct-company">Company / website</label>
        <input id="ct-company" name="company" placeholder="Optional" autoComplete="organization" />
      </div>
      <div className="ct-field">
        <label htmlFor="ct-message">
          Your message <i>*</i>
          <span className={`ct-count${message.length > MAX * 0.9 ? " warn" : ""}`}>{message.length}/{MAX}</span>
        </label>
        <textarea
          id="ct-message"
          name="message"
          placeholder="Tell us about your goals, timeline or the problem you're trying to solve."
          maxLength={MAX}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button className="ct-submit" type="submit">
        <span>Send message</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="ct-privacy">Your details stay private. No spam, no pressure.</p>
    </form>
  );
}
