"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./media-enhancer.css";

/* An additive layer for the /media home page. It renders its own fixed UI and
   attaches a few passive behaviours — it never edits, wraps or restyles the
   existing sections, so every animation already on the page runs exactly as
   before. Where it needs to move something (magnetic buttons) it uses the
   individual `translate` CSS property, which is independent of the `transform`
   that GSAP and the section components animate.

   - top scroll-progress bar
   - section rail (scroll-spy + smooth jump)
   - floating "Start a project" CTA + back-to-top
   - "scroll to explore" hint on first load
   - count-up for the stats numbers
   - magnetic pull on the main CTA buttons
   - soft cursor glow (desktop pointers only)                                   */

const SPY = [
  { label: "Home", sel: "[data-hero]" },
  { label: "Services", sel: "#media-services" },
  { label: "Growth", sel: "#media-growth" },
  { label: "Process", sel: "#process" },
  { label: "Results", sel: "#media-stats" },
  { label: "Portfolio", sel: "#media-portfolio" },
  { label: "FAQ", sel: "#media-faq" },
  { label: "Contact", sel: "#contact" },
] as const;

const MAGNETIC = '[data-hero] a[href="#contact"], .gm-btn, .mx-magnet';

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function MediaEnhancer() {
  const [active, setActive] = useState(0);
  const [railOn, setRailOn] = useState(false);
  const [topOn, setTopOn] = useState(false);
  const [hintOn, setHintOn] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const targets = useRef<(HTMLElement | null)[]>([]);

  const jump = useCallback((i: number) => {
    const el = targets.current[i];
    if (i === 0 || !el) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  }, []);

  /* ── scroll: progress bar, scroll-spy, visibility of the floating UI ── */
  useEffect(() => {
    targets.current = SPY.map((s) => document.querySelector<HTMLElement>(s.sel));
    let raf = 0;

    const update = () => {
      const doc = document.documentElement;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const max = doc.scrollHeight - vh;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;

      let idx = 0;
      const line = vh * 0.4;
      targets.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);

      const contact = targets.current[SPY.length - 1];
      const inContact = !!contact && contact.getBoundingClientRect().top < vh * 0.7;
      setRailOn(y > vh * 0.45);
      setTopOn(y > vh * 1.2);
      setHintOn(y < 60);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ── stats: count the numbers up when they scroll into view ── */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".media-stats-number"));
    const rafs = new Map<HTMLElement, number>();
    const parsed = els.map((el) => {
      const text = el.textContent ?? "";
      const m = text.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
      return m ? { el, prefix: m[1], value: parseFloat(m[2]), decimals: (m[2].split(".")[1] ?? "").length, suffix: m[3] } : null;
    });
    const format = (p: NonNullable<(typeof parsed)[number]>, v: number) =>
      `${p.prefix}${v.toFixed(p.decimals)}${p.suffix}`;

    parsed.forEach((p) => { if (p) p.el.textContent = format(p, 0); });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const p = parsed.find((x) => x && x.el === entry.target);
          io.unobserve(entry.target);
          if (!p) return;
          const start = performance.now();
          const dur = 1700;
          const tick = (now: number) => {
            const t = clamp((now - start) / dur, 0, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            p.el.textContent = format(p, p.value * eased);
            if (t < 1) rafs.set(p.el, requestAnimationFrame(tick));
          };
          rafs.set(p.el, requestAnimationFrame(tick));
        }),
      { threshold: 0.6 }
    );
    parsed.forEach((p) => p && io.observe(p.el));

    return () => {
      io.disconnect();
      rafs.forEach((id) => cancelAnimationFrame(id));
      // leave the real numbers in place if we are torn down mid-count
      parsed.forEach((p) => { if (p) p.el.textContent = format(p, p.value); });
    };
  }, []);

  /* ── magnetic buttons + cursor glow (fine pointers only) ── */
  useEffect(() => {
    if (prefersReducedMotion() || !finePointer()) return;
    const glow = glowRef.current;
    let current: HTMLElement | null = null;
    let gx = -999, gy = -999, tx = -999, ty = -999;
    let raf = 0;
    let shown = false;

    const loop = () => {
      gx += (tx - gx) * 0.14;
      gy += (ty - gy) * 0.14;
      if (glow) glow.style.transform = `translate3d(${gx - 260}px, ${gy - 260}px, 0)`;
      raf = Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX;
      ty = e.clientY;
      if (glow && !shown) {
        shown = true;
        gx = tx; gy = ty;
        glow.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(loop);

      const hit = (e.target as HTMLElement | null)?.closest?.(MAGNETIC) as HTMLElement | null;
      if (current && current !== hit) {
        current.style.translate = "";
        current = null;
      }
      if (hit) {
        current = hit;
        const r = hit.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        hit.style.translate = `${clamp(dx * 0.22, -9, 9).toFixed(1)}px ${clamp(dy * 0.32, -7, 7).toFixed(1)}px`;
      }
    };
    const onLeave = () => {
      if (current) { current.style.translate = ""; current = null; }
      if (glow) glow.style.opacity = "0";
      shown = false;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (current) current.style.translate = "";
    };
  }, []);

  return (
    <>
      <div className="mx-progress" aria-hidden="true"><div ref={barRef} className="mx-progress-bar" /></div>
      <div ref={glowRef} className="mx-glow" aria-hidden="true" />

      <nav className={`mx-rail ${railOn ? "is-on" : ""}`} aria-label="Page sections">
        {SPY.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`mx-rail-item ${active === i ? "is-active" : ""}`}
            onClick={() => jump(i)}
            aria-label={`Go to ${s.label}`}
            aria-current={active === i ? "true" : undefined}
          >
            <span className="mx-rail-label">{s.label}</span>
            <span className="mx-rail-dot" />
          </button>
        ))}
      </nav>

      <div className={`mx-hint ${hintOn ? "is-on" : ""}`} aria-hidden="true">
        <span className="mx-hint-mouse"><i /></span>
        <span>Scroll to explore</span>
      </div>

      <div className="mx-dock">
        <button
          type="button"
          className={`mx-top ${topOn ? "is-on" : ""}`}
          onClick={() => jump(0)}
          aria-label="Back to top"
          tabIndex={topOn ? 0 : -1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
