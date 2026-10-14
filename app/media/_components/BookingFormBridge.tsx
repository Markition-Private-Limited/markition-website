"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";

/* The ported design pages (google-ads, meta-ads, seo, social-media-page-management)
   embed their booking form as raw HTML (content.ts) with action="mailto:..." —
   unreliable since it depends on the visitor having a local mail client configured.
   This finds that form once mounted, inserts a reCAPTCHA widget into it via a
   portal, intercepts its submit, and POSTs the lead to /api/contact instead —
   same backend every other form on the site uses. */

export default function BookingFormBridge({ source }: { source: string }) {
  const [form, setForm] = useState<HTMLFormElement | null>(null);
  const [captchaMount, setCaptchaMount] = useState<HTMLElement | null>(null);
  const [errorMount, setErrorMount] = useState<HTMLElement | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const f = document.querySelector<HTMLFormElement>('form[action^="mailto:"]');
      if (!f) return;
      setForm(f);

      const submitBtn = f.querySelector('button[type="submit"]');

      const captchaDiv = document.createElement("div");
      captchaDiv.style.margin = "4px 0 2px";
      const errorDiv = document.createElement("div");

      if (submitBtn?.parentElement) {
        submitBtn.parentElement.insertBefore(captchaDiv, submitBtn);
        submitBtn.parentElement.insertBefore(errorDiv, submitBtn);
      } else {
        f.appendChild(captchaDiv);
        f.appendChild(errorDiv);
      }
      setCaptchaMount(captchaDiv);
      setErrorMount(errorDiv);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!form) return;

    async function handleSubmit(e: Event) {
      e.preventDefault();
      if (!captchaToken) {
        if (errorMount) errorMount.innerHTML = '<p style="color:#dc2626;font-size:12px;margin:6px 0 0">Please complete the reCAPTCHA.</p>';
        return;
      }
      if (errorMount) errorMount.innerHTML = "";

      const submitBtn = form!.querySelector<HTMLButtonElement>('button[type="submit"]');
      const originalLabel = submitBtn?.innerHTML;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = "0.6"; }

      const fd = new FormData(form!);
      const name = (fd.get("Name") as string) || "";
      const email = (fd.get("Email") as string) || "";
      const phone = (fd.get("Phone") as string) || "";
      const website = (fd.get("Website") as string) || "";
      const goal = (fd.get("Goal") as string) || "";
      const challenge = (fd.get("Challenge") as string) || "";

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            service: goal,
            message: `Phone: ${phone || "—"} | Website: ${website || "—"}\n\n${challenge || "(no additional details provided)"}`,
            source,
            recaptchaToken: captchaToken,
          }),
        });

        if (res.ok) {
          form!.style.display = "none";
          const success = document.createElement("div");
          success.setAttribute("role", "status");
          success.style.cssText = "padding:28px 0;text-align:center";
          success.innerHTML = '<h3 style="margin:0 0 8px;font-size:20px;font-weight:800">Request received ✦</h3><p style="margin:0;color:#73798c;font-size:13px">Thanks — we\'ll be in touch shortly.</p>';
          form!.insertAdjacentElement("afterend", success);
        } else {
          const data = await res.json().catch(() => ({}));
          if (errorMount) errorMount.innerHTML = `<p style="color:#dc2626;font-size:12px;margin:6px 0 0">${data.error || "Something went wrong. Please try again."}</p>`;
          if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = "1"; if (originalLabel) submitBtn.innerHTML = originalLabel; }
        }
      } catch {
        if (errorMount) errorMount.innerHTML = '<p style="color:#dc2626;font-size:12px;margin:6px 0 0">Something went wrong. Please try again.</p>';
        if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = "1"; if (originalLabel) submitBtn.innerHTML = originalLabel; }
      }
    }

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [form, captchaToken, errorMount, source]);

  if (!captchaMount) return null;

  return createPortal(
    <ReCAPTCHA
      ref={recaptchaRef}
      size="compact"
      sitekey="6Lel-8wtAAAAAMQhOiHrfDAYCIKZ_IM2TBlaMSIr"
      onChange={(token) => setCaptchaToken(token)}
      onExpired={() => setCaptchaToken(null)}
    />,
    captchaMount
  );
}
