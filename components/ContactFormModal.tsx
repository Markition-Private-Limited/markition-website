"use client";

import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const BUDGET_MIN = 0;
const BUDGET_MAX = 10000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE  = /^[a-zA-Z\s'\-]{2,100}$/;

function validate(name: string, email: string, message: string, captcha: string | null) {
  const errs: Record<string, string> = {};
  if (!name.trim())               errs.name    = "Name is required.";
  else if (!NAME_RE.test(name))   errs.name    = "Only letters, spaces, hyphens and apostrophes.";
  if (!email.trim())              errs.email   = "Email is required.";
  else if (!EMAIL_RE.test(email)) errs.email   = "Enter a valid email address.";
  if (!message.trim())            errs.message = "Message is required.";
  else if (message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
  if (!captcha)                   errs.captcha = "Please complete the reCAPTCHA.";
  return errs;
}

export default function ContactFormModal({ onClose }: { onClose: () => void }) {
  const [budgetMin, setBudgetMin] = useState(1000);
  const [budgetMax, setBudgetMax] = useState(5000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [visible, setVisible] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const minPct = ((budgetMin - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;
  const maxPct = ((budgetMax - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  useEffect(() => {
    // Animate in
    const t = setTimeout(() => setVisible(true), 10);
    // Close on Escape
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") handleClose(); }
    document.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); document.removeEventListener("keydown", onKey); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  function handleMin(e: React.ChangeEvent<HTMLInputElement>) {
    setBudgetMin(Math.min(Number(e.target.value), budgetMax - 500));
  }
  function handleMax(e: React.ChangeEvent<HTMLInputElement>) {
    setBudgetMax(Math.max(Number(e.target.value), budgetMin + 500));
  }

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
        body: JSON.stringify({ name, email, service, budgetMin, budgetMax, message, source: "Tech Page Popup", recaptchaToken: captchaToken }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <style>{`
        .modal-budget-thumb {
          -webkit-appearance: none; appearance: none;
          position: absolute; width: 100%; height: 100%;
          background: transparent; pointer-events: none;
          top: 0; left: 0; margin: 0; outline: none;
        }
        .modal-budget-thumb::-webkit-slider-runnable-track { background: transparent; height: 2px; }
        .modal-budget-thumb::-webkit-slider-thumb {
          -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
          background: #10192e; border: 2px solid #00d4ff; cursor: pointer;
          pointer-events: all; box-shadow: 0 0 0 3px rgba(0,212,255,0.15); margin-top: -8px;
        }
        .modal-budget-thumb::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: #10192e; border: 2px solid #00d4ff;
          cursor: pointer; pointer-events: all;
        }
        .modal-budget-thumb::-moz-range-track { background: transparent; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,20,0.72)",
          backdropFilter: "blur(6px)",
          transition: "opacity 0.3s ease",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed", top: "50%", left: "50%", zIndex: 201,
          transform: visible
            ? "translate(-50%,-50%) scale(1)"
            : "translate(-50%,-50%) scale(0.94)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease",
          width: "min(720px, 94vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "linear-gradient(145deg, #060e2a 0%, #0a1540 100%)",
          border: "1px solid rgba(0,212,255,0.15)",
          borderRadius: 20,
          boxShadow: "0 32px 100px rgba(0,0,50,0.85)",
          padding: "clamp(24px, 4vw, 44px)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 style={{
              margin: "0 0 8px",
              fontSize: "clamp(22px, 2.8vw, 32px)",
              fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.8px",
              color: "#f0f6ff",
              fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
            }}>
              Let&apos;s Build<br />Something{" "}
              <span style={{ color: "#00d4ff" }}>Great</span>
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "#8aa4c8", lineHeight: 1.6, maxWidth: 320 }}>
              Share your vision and our team will design AI, marketing, and software solutions tailored to your goals.
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              flexShrink: 0, width: 34, height: 34, borderRadius: "50%",
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.65)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}
          >✕</button>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 28 }} />

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Name + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <ModalField label="Full Name" placeholder="Type here" type="text" value={name} onChange={setName} error={errors.name} />
            <ModalField label="Email" placeholder="Type here" type="email" value={email} onChange={setEmail} error={errors.email} />
          </div>

          {/* Service */}
          <div>
            <label style={labelStyle}>Why Are You Contacting Us?</label>
            <div style={{ position: "relative" }}>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{
                  width: "100%", background: "transparent", border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.15)", color: "#8aa4c8",
                  fontSize: 13, padding: "7px 24px 7px 0", outline: "none",
                  cursor: "pointer", appearance: "none", WebkitAppearance: "none",
                }}
              >
                <option value="" disabled style={{ background: "#060e2a" }}>Select a Service</option>
                <option value="web-design"    style={{ background: "#060e2a" }}>Web Design</option>
                <option value="seo"           style={{ background: "#060e2a" }}>SEO Optimization</option>
                <option value="social-media"  style={{ background: "#060e2a" }}>Social Media Marketing</option>
                <option value="paid-ads"      style={{ background: "#060e2a" }}>Paid Advertising</option>
                <option value="content"       style={{ background: "#060e2a" }}>Content Marketing</option>
                <option value="software"      style={{ background: "#060e2a" }}>Software Development</option>
                <option value="ai"            style={{ background: "#060e2a" }}>AI Solutions</option>
              </select>
              <svg style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8aa4c8" }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label style={labelStyle}>Your Budget</label>
            <p style={{ margin: "4px 0 12px", fontSize: 12, color: "#8aa4c8" }}>Slide to indicate your budget range</p>
            <div style={{ position: "relative", height: 34 }}>
              <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", height: 2, width: "100%", background: "rgba(255,255,255,0.1)", borderRadius: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", height: 2, left: `${minPct}%`, width: `${maxPct - minPct}%`, background: "#00d4ff", borderRadius: 2, pointerEvents: "none" }} />
              <input type="range" className="modal-budget-thumb" min={BUDGET_MIN} max={BUDGET_MAX} step={100} value={budgetMin} onChange={handleMin} style={{ zIndex: budgetMin > BUDGET_MAX - 1000 ? 5 : 3 }} />
              <input type="range" className="modal-budget-thumb" min={BUDGET_MIN} max={BUDGET_MAX} step={100} value={budgetMax} onChange={handleMax} style={{ zIndex: 4 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8aa4c8", marginTop: 6 }}>
              <span>${budgetMin.toLocaleString()}</span>
              <span>${budgetMax.toLocaleString()}</span>
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={labelStyle}>Your Message <span style={{ color: "#8aa4c8", fontWeight: 400 }}>({message.length}/2000)</span></label>
            <textarea
              placeholder="Type here" rows={3} maxLength={2000} value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", color: "#f0f6ff", fontSize: 13, padding: "7px 0", outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
            {errors.message && <p style={{ color: "#ff6b6b", fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
          </div>

          {/* reCAPTCHA */}
          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lel-8wtAAAAAMQhOiHrfDAYCIKZ_IM2TBlaMSIr"
              theme="dark"
              onChange={(token) => { setCaptchaToken(token); setErrors(e => ({ ...e, captcha: "" })); }}
              onExpired={() => setCaptchaToken(null)}
            />
            {errors.captcha && <p style={{ color: "#ff6b6b", fontSize: 12, marginTop: 6 }}>{errors.captcha}</p>}
          </div>

          {/* Submit */}
          <div>
            {status === "success" ? (
              <p style={{ color: "#00d4ff", fontSize: 13, fontWeight: 600 }}>✦ Message sent! We&apos;ll be in touch soon.</p>
            ) : status === "error" ? (
              <p style={{ color: "#ff6b6b", fontSize: 13 }}>Something went wrong. Please try again or email us directly.</p>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: "transparent", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 50,
                  padding: "11px 26px", color: "#f0f6ff", fontSize: 12.5, fontWeight: 600,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  opacity: status === "sending" ? 0.6 : 1,
                  display: "inline-flex", alignItems: "center", gap: 10,
                  letterSpacing: "0.02em", fontFamily: "inherit",
                }}
              >
                <span style={{ color: "#00d4ff", fontSize: 11 }}>✦</span>
                {status === "sending" ? "Sending…" : "Let's Build Something Great"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 600, color: "#c8d8ee", marginBottom: 6,
};

function ModalField({ label, placeholder, type, value, onChange, error }: {
  label: string; placeholder: string; type: string;
  value: string; onChange: (v: string) => void; error?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={type === "email" ? 254 : 100}
        style={{
          width: "100%", background: "transparent", border: "none",
          borderBottom: `1px solid ${error ? "#ff6b6b" : "rgba(255,255,255,0.15)"}`,
          color: "#f0f6ff", fontSize: 13, padding: "7px 0", outline: "none",
          boxSizing: "border-box", fontFamily: "inherit",
        }}
      />
      {error && <p style={{ color: "#ff6b6b", fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  );
}
