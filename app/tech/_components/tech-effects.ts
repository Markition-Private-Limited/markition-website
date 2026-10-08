"use client";

import type Lenis from "lenis";

type Cleanup = () => void;

const NODE_LABELS = ["CRM", "ERP", "Website", "Apps", "APIs", "Data"] as const;

interface NetworkNode {
  l: string;
  bx: number;
  by: number;
  ph: number;
  x: number;
  y: number;
}

/* Smooth-scrolls in-page anchor links (nav, footer, CTAs all use #hash hrefs).
   The whole site already runs one shared Lenis instance (see
   components/LenisProvider.tsx, mounted in the root layout) — this page must
   not spin up a second one, since two Lenis instances fight over the same
   scroll and that's what makes scrolling feel janky/laggy. Reuses the
   existing instance via window.__lenis, same as everything else on the site. */
function setupAnchorScrolling(root: HTMLElement): Cleanup {
  const onClick = (e: Event) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id.length <= 1) return;
    const target = root.querySelector(id) ?? document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -90 });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  root.addEventListener("click", onClick);

  return () => root.removeEventListener("click", onClick);
}

/* Sticky "Start a Project" CTA, shown once the hero has scrolled past.
   (The nav itself is the site's shared Navbar, rendered outside this root.) */
function setupStickyCta(root: HTMLElement): Cleanup {
  const sticky = root.querySelector("#stickyCta");
  const hero = root.querySelector<HTMLElement>("#hero");
  if (!sticky || !hero) return () => {};

  const onScroll = () => {
    const y = window.scrollY || 0;
    sticky.classList.toggle("show", y > hero.offsetHeight * 0.8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => window.removeEventListener("scroll", onScroll);
}

/* Fades + rises every `.rv` element into place as it scrolls into view. */
function setupReveal(root: HTMLElement): Cleanup {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = Array.from(root.querySelectorAll<HTMLElement>(".rv"));

  if (!("IntersectionObserver" in window) || reduce) {
    els.forEach((el) => el.classList.add("in"));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
  );
  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 60}ms`;
    io.observe(el);
  });

  const immediate = window.setTimeout(() => {
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
    });
  }, 50);

  return () => {
    io.disconnect();
    window.clearTimeout(immediate);
  };
}

/* Horizontally-scrolling industries carousel: side nav, prev/next arrows,
   progress bar and active-item tracking all stay in sync with the scroll position. */
function setupIndustriesCarousel(root: HTMLElement): Cleanup {
  const track = root.querySelector<HTMLElement>("#indTrack");
  const prog = root.querySelector<HTMLElement>("#indProg");
  const prev = root.querySelector<HTMLButtonElement>("#indPrev");
  const next = root.querySelector<HTMLButtonElement>("#indNext");
  if (!track || !prog) return () => {};

  const navs = Array.from(root.querySelectorAll<HTMLButtonElement>(".ind-nav"));
  const cards = Array.from(track.querySelectorAll<HTMLElement>(".ind-card"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setOn = (i: number) => {
    navs.forEach((b, k) => b.classList.toggle("on", k === i));
    prog.style.width = `${((i + 1) / cards.length) * 100}%`;
  };
  const current = () => {
    let best = 0;
    let dist = Infinity;
    cards.forEach((c, k) => {
      const x = Math.abs(c.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (x < dist) {
        dist = x;
        best = k;
      }
    });
    return best;
  };
  const go = (i: number) => {
    const clamped = Math.max(0, Math.min(cards.length - 1, i));
    track.scrollTo({ left: cards[clamped].offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    setOn(clamped);
  };

  const navClicks: Array<[HTMLButtonElement, () => void]> = navs.map((b) => {
    const handler = () => go(Number(b.dataset.i));
    b.addEventListener("click", handler);
    return [b, handler];
  });

  const onPrev = () => go(current() - 1);
  const onNext = () => go(current() + 1);
  prev?.addEventListener("click", onPrev);
  next?.addEventListener("click", onNext);

  let scrollTimer: number | undefined;
  const onTrackScroll = () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => setOn(current()), 80);
  };
  track.addEventListener("scroll", onTrackScroll, { passive: true });

  setOn(0);

  return () => {
    navClicks.forEach(([b, handler]) => b.removeEventListener("click", handler));
    prev?.removeEventListener("click", onPrev);
    next?.removeEventListener("click", onNext);
    track.removeEventListener("scroll", onTrackScroll);
    window.clearTimeout(scrollTimer);
  };
}

/* "Our Work" tab filter: shows only the case studies matching the selected tag. */
function setupWorkFilter(root: HTMLElement): Cleanup {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".tab"));
  const cases = Array.from(root.querySelectorAll<HTMLElement>(".case"));
  if (!tabs.length) return () => {};

  const handlers = tabs.map((tab) => {
    const handler = () => {
      tabs.forEach((t) => t.classList.toggle("on", t === tab));
      const filter = tab.dataset.f;
      cases.forEach((c) => {
        c.hidden = !(filter === "all" || c.dataset.k === filter);
      });
    };
    tab.addEventListener("click", handler);
    return [tab, handler] as const;
  });

  return () => handlers.forEach(([tab, handler]) => tab.removeEventListener("click", handler));
}

/* Preview-only contact form: validates, then shows a status note instead of
   actually sending anything (wire this up to a real CRM/email endpoint). */
function setupContactForm(root: HTMLElement): Cleanup {
  const form = root.querySelector<HTMLFormElement>("#cform");
  const note = root.querySelector<HTMLElement>("#fnote");
  if (!form || !note) return () => {};

  const onSubmit = (e: Event) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.className = "f-note";
      note.textContent = "Please fill in your name, email and a short message.";
      form.reportValidity();
      return;
    }
    note.className = "f-note ok";
    note.textContent = "Preview only: connect this form to your CRM or email endpoint to receive enquiries.";
  };
  form.addEventListener("submit", onSubmit);

  const ctaButton = root.querySelector<HTMLAnchorElement>("#contact .btn");
  const onCtaClick = (e: Event) => {
    e.preventDefault();
    form.requestSubmit();
  };
  ctaButton?.addEventListener("click", onCtaClick);

  return () => {
    form.removeEventListener("submit", onSubmit);
    ctaButton?.removeEventListener("click", onCtaClick);
  };
}

/* Small light-pulses that travel along the "ecosystem" diagram's spokes.
   Only animates while the ecosystem section is actually on screen, so the
   rAF loop doesn't keep running (and burning GPU) for the rest of the page. */
function setupEcosystemPulses(root: HTMLElement): Cleanup {
  const section = root.querySelector<HTMLElement>("#ecosystem");
  const pulses = Array.from(root.querySelectorAll<SVGCircleElement>(".pulse"));
  const spokes = Array.from(root.querySelectorAll<SVGLineElement>(".spoke"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!section || !pulses.length) return () => {};

  if (reduce || !spokes.length) {
    pulses.forEach((p) => (p.style.display = "none"));
    return () => {};
  }

  let raf = 0;
  let t0 = performance.now();

  const tick = (now: number) => {
    pulses.forEach((p, i) => {
      const s = spokes[(i * 2) % spokes.length];
      const u = (((now - t0) / 2400) + i * 0.27) % 1;
      const dir = i % 2 ? 1 - u : u;
      const x1 = Number(s.getAttribute("x1"));
      const y1 = Number(s.getAttribute("y1"));
      const x2 = Number(s.getAttribute("x2"));
      const y2 = Number(s.getAttribute("y2"));
      p.setAttribute("cx", String(x1 + (x2 - x1) * dir));
      p.setAttribute("cy", String(y1 + (y2 - y1) * dir));
    });
    raf = requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        t0 = performance.now();
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    },
    { threshold: 0.01 }
  );
  io.observe(section);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
  };
}

/* Hero: animated dot-matrix "network of connected systems" behind the heading,
   with CRM / ERP / Website / Apps / APIs / Data nodes orbiting a glowing hub. */
function setupHeroCanvas(root: HTMLElement): Cleanup {
  const canvas = root.querySelector<HTMLCanvasElement>("#heroCanvas");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return () => {};

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const mouse = { x: -1e4, y: -1e4 };
  let W = 0;
  let H = 0;
  let center = { x: 0, y: 0 };
  let nodes: NetworkNode[] = [];

  const size = () => {
    const r = canvas.getBoundingClientRect();
    W = r.width;
    H = r.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const wide = W > 900;
    const cx = wide ? W * 0.72 : W * 0.5;
    const cy = wide ? H * 0.5 : H * 0.62;
    const R = wide ? Math.min(W * 0.2, H * 0.36) : Math.min(W * 0.36, 170);
    center = { x: cx, y: cy };
    nodes = NODE_LABELS.map((l, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / 6 + 0.2;
      return { l, bx: cx + Math.cos(a) * R * 1.05, by: cy + Math.sin(a) * R * 0.92, ph: i * 1.3, x: 0, y: 0 };
    });
  };
  size();
  window.addEventListener("resize", size);

  const parent = canvas.parentElement;
  const onPointerMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  };
  const onPointerLeave = () => {
    mouse.x = mouse.y = -1e4;
  };
  parent?.addEventListener("pointermove", onPointerMove);
  parent?.addEventListener("pointerleave", onPointerLeave);

  let raf = 0;
  let running = false;
  const frame = (ms: number) => {
    const t = ms / 1000;
    ctx.clearRect(0, 0, W, H);
    const wide = W > 900;
    const gs = wide ? 22 : 20;

    for (let gx = 0; gx < W + gs; gx += gs) {
      for (let gy = 0; gy < H + gs; gy += gs) {
        const ox = (Math.round(gy / gs) % 2) * (gs / 2);
        const x = gx + ox;
        const y = gy;
        const d = Math.hypot(x - center.x, y - center.y);
        const reach = wide ? W * 0.42 : W * 0.8;
        const a = Math.max(0, 1 - d / reach);
        if (a <= 0.02) continue;
        const wave = 0.5 + 0.5 * Math.sin(d * 0.018 - t * 1.4);
        const md = Math.hypot(x - mouse.x, y - mouse.y);
        const boost = md < 120 ? 1 - md / 120 : 0;
        const s = 2 + 3.2 * a * (0.5 + 0.5 * wave) + boost * 3;
        ctx.fillStyle = `rgba(${(40 + 90 * boost) | 0},${(100 + 80 * boost) | 0},255,${0.12 + 0.5 * a * wave + boost * 0.4})`;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.restore();
      }
    }

    nodes.forEach((n) => {
      n.x = n.bx + Math.sin(t * 0.6 + n.ph) * 7;
      n.y = n.by + Math.cos(t * 0.5 + n.ph) * 7;
    });

    ctx.lineWidth = 1.2;
    nodes.forEach((n, i) => {
      [center, nodes[(i + 1) % 6]].forEach((o, k) => {
        ctx.strokeStyle = `rgba(90,160,255,${k ? 0.18 : 0.38})`;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(o.x, o.y);
        ctx.stroke();
        const u = (t * (0.25 + 0.04 * i) + i * 0.17 + k * 0.5) % 1;
        const px = n.x + (o.x - n.x) * u;
        const py = n.y + (o.y - n.y) * u;
        ctx.fillStyle = "rgba(160,205,255,.95)";
        ctx.beginPath();
        ctx.arc(px, py, k ? 2 : 2.8, 0, 2 * Math.PI);
        ctx.fill();
      });
    });

    const g = ctx.createRadialGradient(center.x, center.y, 4, center.x, center.y, 70);
    g.addColorStop(0, "rgba(31,105,218,.9)");
    g.addColorStop(1, "rgba(31,105,218,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 70 + Math.sin(t * 2) * 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#1f69da";
    ctx.strokeStyle = "rgba(255,255,255,.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 26, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "700 12px Manrope,system-ui,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("M", center.x, center.y + 1);

    ctx.font = "600 13px Manrope,system-ui,sans-serif";
    nodes.forEach((n) => {
      const w = ctx.measureText(n.l).width + 28;
      ctx.fillStyle = "rgba(10,18,40,.92)";
      ctx.strokeStyle = "rgba(90,160,255,.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(n.x - w / 2, n.y - 16, w, 32, 10);
      else ctx.rect(n.x - w / 2, n.y - 16, w, 32);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.fillText(n.l, n.x, n.y + 1);
    });

    if (running) raf = requestAnimationFrame(frame);
  };

  // Paint one static frame immediately so the canvas isn't empty, then only
  // keep animating while the hero is actually on screen: this is a
  // continuous, fairly heavy per-frame draw (a dot grid plus orbiting
  // nodes), and it has no reason to keep running once scrolled past.
  frame(performance.now());

  const io = reduce
    ? null
    : new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !running) {
            running = true;
            raf = requestAnimationFrame(frame);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        },
        { threshold: 0.01 }
      );
  io?.observe(canvas);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    io?.disconnect();
    window.removeEventListener("resize", size);
    parent?.removeEventListener("pointermove", onPointerMove);
    parent?.removeEventListener("pointerleave", onPointerLeave);
  };
}

/* Wires up every interactive behaviour of the Markition Tech page inside `root`.
   Call once the ported markup is mounted; call the returned cleanup on unmount. */
export function setupTechEffects(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [
    setupAnchorScrolling(root),
    setupStickyCta(root),
    setupReveal(root),
    setupIndustriesCarousel(root),
    setupWorkFilter(root),
    setupContactForm(root),
    setupEcosystemPulses(root),
    setupHeroCanvas(root),
  ];
  return () => cleanups.forEach((fn) => fn());
}
