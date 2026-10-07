/* Interaction effects for the ported service pages. Each one is switched on by a
   data attribute in the page markup, so any page can opt in:

   [data-lines]            heading split on <br>; each line slides up out of a mask
   [data-tilt]             card tilts toward the cursor (--rx/--ry) with a spotlight (--mx/--my)
   [data-magnetic]         button is gently pulled toward the cursor
   [data-serp]             search-results demo: "your" result climbs to #1 when seen
   [data-compound]         growth curve drawn by scroll, lighting up the labels and tiles after it
   canvas[data-helix]      animated 3D ring backdrop (transparent canvas) for a hero
   svg.pp-chart            dashboard line chart that wipes in once it is on screen
   [data-steps-progress]   vertical progress line + "reached" state for process steps
   [data-sticky-cta]       floating CTA that appears after the hero and hides near other CTAs
*/

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

type Cleanup = () => void;

/* ── headings: line-by-line mask reveal ── */
export function setupLines(root: HTMLElement): Cleanup {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("lines-in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.25 }
  );
  root.querySelectorAll<HTMLElement>("[data-lines]").forEach((el) => {
    // split once (React dev mode runs effects twice), but always (re)observe
    if (!el.classList.contains("is-split")) {
      const label = (el.textContent || "").replace(/\s+/g, " ").trim();
      const parts = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = parts
        .map((p, i) => `<span class="ln"><span class="ln-in" style="--i:${i}">${p.trim()}</span></span>`)
        .join("");
      el.setAttribute("aria-label", label);
      el.classList.add("is-split");
    }
    if (!el.classList.contains("lines-in")) io.observe(el);
  });
  return () => io.disconnect();
}

/* ── cards: tilt + spotlight ── */
export function setupTilt(root: HTMLElement): Cleanup {
  if (reducedMotion() || !canHover()) return () => {};
  const cleanups: Cleanup[] = [];
  root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${((0.5 - y) * 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(0)}px`);
      el.style.setProperty("--my", `${(e.clientY - r.top).toFixed(0)}px`);
    };
    const leave = () => {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/* ── buttons: magnetic pull ── */
export function setupMagnetic(root: HTMLElement): Cleanup {
  if (reducedMotion() || !canHover()) return () => {};
  const cleanups: Cleanup[] = [];
  root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.translate = `${clamp(dx * 0.22, -9, 9).toFixed(1)}px ${clamp(dy * 0.3, -7, 7).toFixed(1)}px`;
    };
    const leave = () => { el.style.translate = ""; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/* ── search results demo ── */
export function setupSerp(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  root.querySelectorAll<HTMLElement>("[data-serp]").forEach((box) => {
    const list = box.querySelector<HTMLElement>(".serp-list");
    const rows = Array.from(box.querySelectorAll<HTMLElement>(".serp-row"));
    const you = rows.find((r) => r.classList.contains("is-you"));
    const now = box.querySelector<HTMLElement>("[data-serp-now]");
    const replay = box.querySelector<HTMLElement>("[data-serp-replay]");
    if (!list || !you || !rows.length) return;

    const SHARE = [96, 62, 44, 32, 24, 18, 13]; // illustrative click share by position
    const START = rows.slice(); // DOM order: "you" last
    let order = START.slice();
    let timer = 0;
    let started = false;

    const step = () => {
      const first = rows[0];
      const h = first.offsetHeight;
      const gap = parseFloat(getComputedStyle(list).rowGap || "0") || 10;
      return h + gap;
    };

    const place = () => {
      const s = step();
      list.style.height = `${order.length * s - (s - rows[0].offsetHeight)}px`;
      order.forEach((r, i) => {
        r.style.transform = `translateY(${i * s}px)`;
        const pos = r.querySelector<HTMLElement>(".serp-pos");
        if (pos) pos.textContent = String(i + 1);
        const bar = r.querySelector<HTMLElement>(".serp-share i");
        if (bar) bar.style.width = `${SHARE[Math.min(i, SHARE.length - 1)]}%`;
      });
      const idx = order.indexOf(you);
      if (now) now.textContent = `#${idx + 1}`;
      box.classList.toggle("is-top", idx === 0);
    };

    const reset = () => {
      window.clearInterval(timer);
      order = START.slice();
      box.classList.remove("is-top");
      place();
    };

    const climb = () => {
      reset();
      if (reducedMotion()) {
        order = [you, ...START.filter((r) => r !== you)];
        place();
        return;
      }
      timer = window.setInterval(() => {
        const idx = order.indexOf(you);
        if (idx <= 0) {
          window.clearInterval(timer);
          return;
        }
        [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
        place();
      }, 640);
    };

    place();
    const onResize = () => place();
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          window.setTimeout(climb, 500);
        }
      },
      { threshold: 0.5 }
    );
    // observe the card itself — on phones the whole block is taller than the screen
    io.observe(box.querySelector(".serp-card") || box);

    const onReplay = () => { started = true; climb(); };
    replay?.addEventListener("click", onReplay);

    cleanups.push(() => {
      window.clearInterval(timer);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      replay?.removeEventListener("click", onReplay);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/* ── compounding curve ──
   The curve is revealed by an SVG <clipPath> rectangle (set in the curve's own
   user units), so the line and its filled area are always cut at exactly the
   same x — no dash/pathLength maths, which browsers disagree about once
   `vector-effect: non-scaling-stroke` is involved. The milestone dots are plain
   HTML elements placed in percentages: inside a stretched SVG
   (preserveAspectRatio="none") a circle would be squashed into an oval. */
export function setupCompound(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  root.querySelectorAll<HTMLElement>("[data-compound]").forEach((el) => {
    const section = el.closest("section") as HTMLElement | null;
    const svg = el.querySelector<SVGSVGElement>("svg");
    const line = el.querySelector<SVGPathElement>(".compound-line");
    const clip = el.querySelector<SVGRectElement>(".compound-clip");
    const tip = el.querySelector<HTMLElement>(".compound-tip");
    const dots = Array.from(el.querySelectorAll<HTMLElement>(".compound-dot"));
    const labels = Array.from(el.querySelectorAll<HTMLElement>(".compound-labels span"));
    const metrics = section ? Array.from(section.querySelectorAll<HTMLElement>(".metric")) : [];
    const n = dots.length || 1;
    const vb = svg?.viewBox.baseVal;
    const W = vb && vb.width ? vb.width : 1000;
    const H = vb && vb.height ? vb.height : 200;
    let total = 0;
    try { total = line ? line.getTotalLength() : 0; } catch { total = 0; }
    let frame = 0;

    const update = () => {
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const p = reducedMotion() ? 1 : clamp((vh * 0.92 - top) / (vh * 0.5), 0, 1);
      clip?.setAttribute("width", (p * W).toFixed(1));

      // glowing "pen tip" riding the front of the line
      if (tip && line && total) {
        const target = p * W;
        let lo = 0;
        let hi = total;
        for (let k = 0; k < 18; k++) {
          const mid = (lo + hi) / 2;
          if (line.getPointAtLength(mid).x < target) lo = mid; else hi = mid;
        }
        const pt = line.getPointAtLength(hi);
        tip.style.left = `${((pt.x / W) * 100).toFixed(2)}%`;
        tip.style.top = `${((pt.y / H) * 100).toFixed(2)}%`;
        tip.classList.toggle("is-on", p > 0.015 && p < 0.99 && !reducedMotion());
      }

      for (let i = 0; i < n; i++) {
        const lit = p >= ((i + 0.6) / n) * 0.97;
        dots[i]?.classList.toggle("is-lit", lit);
        labels[i]?.classList.toggle("is-lit", lit);
        metrics[i]?.classList.toggle("is-lit", lit);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/* ── dashboard line charts (.pp-chart): clip-reveal when scrolled into view ── */
export function setupChartDraw(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  root.querySelectorAll<SVGSVGElement>("svg.pp-chart").forEach((svg) => {
    const rect = svg.querySelector<SVGRectElement>(".pp-clip-rect");
    if (!rect) return;
    const W = svg.viewBox.baseVal.width || 600;
    const holder = svg.parentElement;
    const dot = holder?.querySelector<HTMLElement>(".pp-chart-dot") ?? null;
    let raf = 0;
    let done = false;

    const finish = () => {
      rect.setAttribute("width", String(W));
      dot?.classList.add("is-on");
      done = true;
    };
    if (reducedMotion()) {
      finish();
      return;
    }

    const run = () => {
      if (done) return;
      done = true;
      const start = performance.now();
      const dur = 1900;
      const tick = (now: number) => {
        const t = clamp((now - start) / dur, 0, 1);
        const e = 1 - Math.pow(1 - t, 3);
        rect.setAttribute("width", (e * W).toFixed(1));
        if (t < 1) raf = requestAnimationFrame(tick);
        else dot?.classList.add("is-on");
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          window.setTimeout(run, 250);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(svg);
    cleanups.push(() => {
      io.disconnect();
      cancelAnimationFrame(raf);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/* ── process steps progress line ── */
export function setupStepsProgress(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  root.querySelectorAll<HTMLElement>("[data-steps-progress]").forEach((el) => {
    const steps = Array.from(el.querySelectorAll<HTMLElement>(".step"));
    let frame = 0;
    const update = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const focus = vh * 0.62;
      const p = reducedMotion() ? 1 : clamp((focus - r.top) / Math.max(r.height, 1), 0, 1);
      el.style.setProperty("--p", p.toFixed(4));
      steps.forEach((s) => {
        const sr = s.getBoundingClientRect();
        s.classList.toggle("is-reached", reducedMotion() || sr.top + sr.height * 0.35 < focus);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/* ── floating CTA ── */
export function setupStickyCta(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  root.querySelectorAll<HTMLElement>("[data-sticky-cta]").forEach((el) => {
    const selectors = (el.dataset.hideNear || "").split(",").map((s) => s.trim()).filter(Boolean);
    const targets = selectors.flatMap((s) => Array.from(root.querySelectorAll<HTMLElement>(s)));
    const visible = new Set<Element>();
    let scrolled = false;
    const apply = () => el.classList.toggle("is-visible", scrolled && visible.size === 0);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      apply();
    });
    targets.forEach((t) => io.observe(t));

    const onScroll = () => {
      scrolled = window.scrollY > window.innerHeight * 0.75;
      apply();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/* ── helix backdrop: rotating 3D rings drawn on a transparent canvas ──
   A port of the "Helix Chrono Matrix" background. It only draws the rings and
   the travelling dots (no opaque fill, no controls, no headline), so whatever
   background colour is behind the canvas stays exactly as it is. The rings
   ripple around the cursor; it pauses off-screen and draws a still frame for
   reduced motion. */
export function setupHelix(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  root.querySelectorAll<HTMLCanvasElement>("canvas[data-helix]").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    const host = (canvas.closest("section") as HTMLElement | null) ?? canvas.parentElement;
    if (!ctx || !host) return;

    type Ring = { radius: number; yOffset: number; speed: number; angle: number; harmonic: number; vy: Float32Array; ex: Float32Array };
    const RINGS = 28;
    const POINTS = 120;
    let rings: Ring[] = [];
    let dots: { ring: number; progress: number; speed: number; size: number }[] = [];
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let visible = true;
    const ptr = { x: -2000, y: -2000, tx: -2000, ty: -2000, r: 220 };
    const still = reducedMotion();

    const build = () => {
      rings = [];
      for (let r = 0; r < RINGS; r++) {
        const k = r / RINGS;
        rings.push({
          radius: Math.min(w, h) * 0.5 * (0.4 + k * 0.6),
          yOffset: (k - 0.5) * (h * 0.5),
          speed: (r % 2 === 0 ? 1 : -1) * (0.002 + k * 0.0025),
          angle: (r * Math.PI) / RINGS,
          harmonic: r * 0.2,
          vy: new Float32Array(POINTS),
          ex: new Float32Array(POINTS),
        });
      }
      dots = Array.from({ length: 45 }, () => ({
        ring: Math.floor(Math.random() * RINGS),
        progress: Math.random(),
        speed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 1.5 + 1.5,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw();
    };

    const FOV = 600;
    const CAM = 550;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // centre the structure a little right of middle so it sits behind the form side
      const cx = w * 0.56;
      const cy = h * 0.5;

      for (let ri = 0; ri < rings.length; ri++) {
        const ring = rings[ri];
        ctx.beginPath();
        let fx = 0;
        let fy = 0;
        let avgEx = 0;
        for (let pi = 0; pi < POINTS; pi++) {
          const theta = (pi / POINTS) * Math.PI * 2 + ring.angle;
          const x3 = Math.cos(theta) * ring.radius;
          const z3 = Math.sin(theta) * ring.radius;
          const y3 = ring.yOffset + Math.sin(theta * 2 + t * 2 + ring.harmonic) * 45;
          const sc = FOV / (CAM + z3);
          const px = cx + x3 * sc;
          const py = cy + (y3 + ring.vy[pi]) * sc;

          const dx = px - ptr.x;
          const dy = py - ptr.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ptr.r && dist > 0) {
            const ratio = 1 - dist / ptr.r;
            ring.vy[pi] += (Math.sin(theta + t) * ratio * 15 - ring.vy[pi]) * 0.1;
            ring.ex[pi] = Math.max(ring.ex[pi], ratio);
          } else {
            ring.vy[pi] *= 0.92;
          }
          ring.ex[pi] *= 0.92;
          avgEx += ring.ex[pi];

          if (pi === 0) { fx = px; fy = py; ctx.moveTo(px, py); } else ctx.lineTo(px, py);
        }
        ctx.lineTo(fx, fy);
        avgEx /= POINTS;
        const depth = 0.15 + (ri / rings.length) * 0.45;
        if (avgEx > 0.05) {
          ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, 0.4 + avgEx * 0.6).toFixed(3)})`;
          ctx.lineWidth = 1.2 + avgEx * 1.5;
        } else {
          ctx.strokeStyle = `rgba(150,172,255,${(depth * 0.85).toFixed(3)})`;
          ctx.lineWidth = 0.75;
        }
        ctx.stroke();
        ring.angle += still ? 0 : ring.speed;
      }

      for (const d of dots) {
        d.progress = (d.progress + (still ? 0 : d.speed) + 1) % 1;
        const ring = rings[d.ring];
        if (!ring) continue;
        const exact = d.progress * POINTS;
        const i1 = Math.floor(exact) % POINTS;
        const i2 = (i1 + 1) % POINTS;
        const blend = exact - Math.floor(exact);
        const th1 = (i1 / POINTS) * Math.PI * 2 + ring.angle;
        const th2 = (i2 / POINTS) * Math.PI * 2 + ring.angle;
        const x3 = Math.cos(th1) * ring.radius + (Math.cos(th2) * ring.radius - Math.cos(th1) * ring.radius) * blend;
        const z3 = Math.sin(th1) * ring.radius + (Math.sin(th2) * ring.radius - Math.sin(th1) * ring.radius) * blend;
        const sc = FOV / (CAM + z3);
        const px = cx + x3 * sc;
        const py = cy + ring.yOffset * sc;
        const near = Math.hypot(px - ptr.x, py - ptr.y) < ptr.r;
        ctx.beginPath();
        ctx.arc(px, py, d.size * sc, 0, Math.PI * 2);
        ctx.fillStyle = near ? "#ffffff" : "#05082f";
        ctx.fill();
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = "rgba(190,205,255,0.55)";
        ctx.stroke();
      }
    };

    const loop = () => {
      if (visible) {
        t += 0.012;
        ptr.x += (ptr.tx - ptr.x) * 0.1;
        ptr.y += (ptr.ty - ptr.y) * 0.1;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = canvas.getBoundingClientRect();
      ptr.tx = e.clientX - r.left;
      ptr.ty = e.clientY - r.top;
    };
    const onLeave = () => { ptr.tx = -2000; ptr.ty = -2000; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    resize();
    if (!still) raf = requestAnimationFrame(loop);

    cleanups.push(() => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    });
  });
  return () => cleanups.forEach((f) => f());
}

export function setupPortedEffects(root: HTMLElement): Cleanup {
  const fns = [
    setupLines, setupTilt, setupMagnetic, setupSerp, setupCompound, setupChartDraw, setupStepsProgress, setupStickyCta, setupHelix,
  ].map((fn) => fn(root));
  return () => fns.forEach((fn) => fn());
}
