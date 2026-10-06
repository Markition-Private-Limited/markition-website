"use client";

import { useEffect, useRef } from "react";

const CELL = 90; // grid spacing in px
const STEP = 18; // vertex spacing along each line (only used inside the hover zone)
const RADIUS = 230; // hover radius
const LIFT = 30; // max upward displacement in px
const PAD = LIFT + 16; // extra margin around the zone so lifted lines never get clipped
const GLOW = 620; // soft-light sprite size

/**
 * Interactive background grid for the hero + intro band.
 *
 * Performance notes:
 *  - The idle grid is painted once (and on resize).
 *  - On hover only the small rectangle around the pointer is cleared and redrawn,
 *    instead of the whole band, and all work happens in a single rAF loop.
 *  - The soft light is a fixed-size element moved with transform (GPU), so no big repaints.
 */
export default function HeroGridGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const canvas = canvasRef.current;
    const band = glow?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!glow || !canvas || !band || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let mx = -9999; // pointer, latest
    let my = -9999;
    let target = 0; // 1 while hovering
    let s = 0; // eased strength
    let raf = 0;
    let dirty: { x: number; y: number; w: number; h: number } | null = null;

    // grid fades out toward the bottom of the band (replaces a CSS mask, which is costly on canvas)
    const fade = (y: number) => (y < h * 0.72 ? 1 : Math.max(0, 1 - (y - h * 0.72) / (h * 0.28)));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = band.clientWidth;
      h = band.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawGrid(0, 0, w, h, false);
    };

    /** Draws grid segments that intersect the rect. `warped` = apply the hover lift. */
    function drawGrid(rx: number, ry: number, rw: number, rh: number, warped: boolean) {
      const c = ctx!;
      c.save();
      c.beginPath();
      c.rect(rx, ry, rw, rh);
      c.clip();

      const point = (x: number, y: number) => {
        if (!warped) return { x, y, k: 0 };
        const dx = x - mx;
        const dy = y - my;
        const d = Math.hypot(dx, dy);
        let f = Math.max(0, 1 - d / RADIUS);
        f = f * f * (3 - 2 * f);
        const k = f * s;
        return { x: x + dx * 0.07 * k, y: y - LIFT * k, k };
      };

      const x0 = Math.floor(rx / CELL) * CELL;
      const y0 = Math.floor(ry / CELL) * CELL;

      // vertical lines
      for (let x = x0; x <= rx + rw + CELL; x += CELL) {
        const step = warped ? STEP : Math.max(h, 1);
        let prev = point(x + 0.5, Math.max(0, ry - PAD));
        for (let y = Math.max(0, ry - PAD) + step; y <= Math.min(h, ry + rh + PAD) + step; y += step) {
          const p = point(x + 0.5, Math.min(y, h));
          segment(prev, p);
          prev = p;
        }
      }
      // horizontal lines
      for (let y = y0; y <= ry + rh + CELL; y += CELL) {
        const step = warped ? STEP : Math.max(w, 1);
        let prev = point(Math.max(0, rx - PAD), y + 0.5);
        for (let x = Math.max(0, rx - PAD) + step; x <= Math.min(w, rx + rw + PAD) + step; x += step) {
          const p = point(Math.min(x, w), y + 0.5);
          segment(prev, p);
          prev = p;
        }
      }

      // glowing nodes (cheap: two flat circles, no shadowBlur)
      if (warped && s > 0.02) {
        for (let x = x0; x <= rx + rw + CELL; x += CELL) {
          for (let y = y0; y <= ry + rh + CELL; y += CELL) {
            const p = point(x + 0.5, y + 0.5);
            if (p.k < 0.05) continue;
            c.fillStyle = `rgba(60, 90, 255, ${0.14 * p.k})`;
            c.beginPath();
            c.arc(p.x, p.y, 3 + 6 * p.k, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = `rgba(130, 155, 255, ${0.75 * p.k})`;
            c.beginPath();
            c.arc(p.x, p.y, 1.2 + 1.8 * p.k, 0, Math.PI * 2);
            c.fill();
          }
        }
      }
      c.restore();

      function segment(a: { x: number; y: number; k: number }, b: { x: number; y: number; k: number }) {
        const k = (a.k + b.k) / 2;
        const alpha = (0.05 + 0.4 * k) * fade((a.y + b.y) / 2);
        if (alpha < 0.004) return;
        c.beginPath();
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
        if (k > 0.08) {
          // soft halo: a wide, faint stroke under the line (much cheaper than shadowBlur)
          c.strokeStyle = `rgba(40, 70, 235, ${0.08 * k * fade((a.y + b.y) / 2)})`;
          c.lineWidth = 4 + 3 * k;
          c.stroke();
        }
        c.strokeStyle = `rgba(${150 - 40 * k}, ${170 - 30 * k}, 255, ${alpha})`;
        c.lineWidth = 1 + 0.6 * k;
        c.stroke();
      }
    }

    const zone = () => ({
      x: Math.max(0, mx - RADIUS - PAD),
      y: Math.max(0, my - RADIUS - PAD),
      w: Math.min(w, mx + RADIUS + PAD) - Math.max(0, mx - RADIUS - PAD),
      h: Math.min(h, my + RADIUS + PAD) - Math.max(0, my - RADIUS - PAD),
    });

    const frame = () => {
      s += (target - s) * 0.14;
      if (Math.abs(target - s) < 0.004) s = target;

      // move the soft light with a compositor-only transform
      glow.style.transform = `translate3d(${mx - GLOW / 2}px, ${my - GLOW / 2}px, 0)`;

      if (!reduced) {
        const z = zone();
        // clear the union of the previous and the current zone, then redraw only that area
        const r = dirty
          ? {
              x: Math.min(z.x, dirty.x),
              y: Math.min(z.y, dirty.y),
              w: Math.max(z.x + z.w, dirty.x + dirty.w) - Math.min(z.x, dirty.x),
              h: Math.max(z.y + z.h, dirty.y + dirty.h) - Math.min(z.y, dirty.y),
            }
          : z;
        ctx.clearRect(r.x, r.y, r.w, r.h);
        drawGrid(r.x, r.y, r.w, r.h, true);
        dirty = z;
      }

      const settled = target === 0 && s === 0;
      if (settled) dirty = null;
      raf = settled ? 0 : requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = band.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      target = 1;
      glow.style.opacity = "1";
      kick();
    };
    const leave = () => {
      target = 0;
      glow.style.opacity = "0";
      kick();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(band);
    band.addEventListener("pointermove", move, { passive: true });
    band.addEventListener("pointerleave", leave);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      band.removeEventListener("pointermove", move);
      band.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="hero-grid-canvas" aria-hidden="true" />
      <div ref={glowRef} className="hero-glow" aria-hidden="true" />
    </>
  );
}
