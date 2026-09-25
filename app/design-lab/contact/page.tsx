"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE  = /^[a-zA-Z\s'\-]{2,100}$/;

function validate(name: string, email: string, message: string, captcha: string | null) {
  const errs: Record<string, string> = {};
  if (!name.trim())                errs.name    = "Name is required.";
  else if (!NAME_RE.test(name))    errs.name    = "Only letters, spaces, hyphens. (2–100 chars)";
  if (!email.trim())               errs.email   = "Email is required.";
  else if (!EMAIL_RE.test(email))  errs.email   = "Enter a valid email address.";
  if (!message.trim())             errs.message = "Message is required.";
  else if (message.trim().length < 10)   errs.message = "Message must be at least 10 characters.";
  else if (message.trim().length > 2000) errs.message = "Message must be under 2000 characters.";
  if (!captcha)                    errs.captcha = "Please complete the reCAPTCHA.";
  return errs;
}

export default function DesignLabContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(name, email, message, captchaToken);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "Design Lab Page", recaptchaToken: captchaToken }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const fieldCls = (err?: string) =>
    `mt-1 w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 focus:outline-none ${err ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"}`;

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Let&apos;s Talk
      </h1>
      <p className="mt-4 text-gray-600">
        Fill in the form below and we&apos;ll get back to you within one business day.
      </p>

      {status === "success" ? (
        <p className="mt-10 text-indigo-600 font-semibold">Message sent! We&apos;ll be in touch soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
            <input id="name" type="text" maxLength={100} value={name}
              onChange={(e) => setName(e.target.value)} className={fieldCls(errors.name)} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
            <input id="email" type="email" maxLength={254} value={email}
              onChange={(e) => setEmail(e.target.value)} className={fieldCls(errors.email)} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900">
              Message <span className="text-gray-400 font-normal">({message.length}/2000)</span>
            </label>
            <textarea id="message" rows={5} maxLength={2000} value={message}
              onChange={(e) => setMessage(e.target.value)} className={fieldCls(errors.message)} />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
          </div>

          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lel-8wtAAAAAMQhOiHrfDAYCIKZ_IM2TBlaMSIr"
              onChange={(token) => { setCaptchaToken(token); setErrors(e => ({ ...e, captcha: "" })); }}
              onExpired={() => setCaptchaToken(null)}
            />
            {errors.captcha && <p className="mt-1 text-xs text-red-500">{errors.captcha}</p>}
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
          )}

          <button type="submit" disabled={status === "sending"}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}
    </section>
  );
}
