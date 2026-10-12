"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;
    const subject = encodeURIComponent("Contact enquiry from " + name);
    const body = encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
    );
    setSubmitted(true);
    window.location.href =
      "mailto:hey@markition.com?subject=" + subject + "&body=" + body;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="ct-field">
        <label htmlFor="ct-name">Full Name</label>
        <input id="ct-name" name="name" placeholder="Type here" autoComplete="name" required />
      </div>
      <div className="ct-field">
        <label htmlFor="ct-email">Email</label>
        <input id="ct-email" name="email" type="email" placeholder="Type here" autoComplete="email" required />
      </div>
      <div className="ct-field">
        <label htmlFor="ct-message">Your Message</label>
        <textarea id="ct-message" name="message" placeholder="Type here" required />
      </div>

      {submitted ? (
        <p className="ct-status show">
          ✦ Your email app should open with your message prepared. If it doesn&apos;t, email{" "}
          <a href="mailto:hey@markition.com" style={{ color: "inherit", textDecoration: "underline" }}>
            hey@markition.com
          </a>{" "}
          directly.
        </p>
      ) : (
        <button className="ct-submit" type="submit">
          Send Message →
        </button>
      )}
    </form>
  );
}
