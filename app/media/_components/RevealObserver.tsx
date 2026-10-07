"use client";

import { useEffect } from "react";
import { setupPortedEffects } from "./ported-effects";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* Screenshot collage ([data-collage]): as the section scrolls into view the
   main screenshot rises and settles, the small one slides in from the left and
   the wide one from the right, each tilting into place; afterwards they drift
   at different speeds for a little depth. Reduced motion shows them still. */
function setupCollages(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  root.querySelectorAll<HTMLElement>("[data-collage]").forEach((collage) => {
    const main = collage.querySelector<HTMLElement>('[data-shot="main"]');
    const left = collage.querySelector<HTMLElement>('[data-shot="left"]');
    const right = collage.querySelector<HTMLElement>('[data-shot="right"]');
    if (!main || !left || !right) return;
    let frame = 0;

    const update = () => {
      if (reduce.matches) {
        main.style.transform = ""; main.style.opacity = "";
        left.style.transform = "rotate(-3deg)"; left.style.opacity = "";
        right.style.transform = "rotate(3deg)"; right.style.opacity = "";
        return;
      }
      const vh = window.innerHeight;
      const top = collage.getBoundingClientRect().top;
      // 0 when the collage's top reaches the bottom of the screen, 1 when it is 35% up
      const e = clamp((vh - top) / (vh * 0.65), 0, 1);
      const eMain = clamp(e / 0.7, 0, 1);
      const eLeft = clamp((e - 0.18) / 0.7, 0, 1);
      const eRight = clamp((e - 0.32) / 0.68, 0, 1);
      // gentle parallax once it is on screen
      const drift = clamp((vh * 0.5 - top) / vh, -1, 1);
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);

      const m = ease(eMain), l = ease(eLeft), r = ease(eRight);
      main.style.transform = `translateY(${(1 - m) * 70 - drift * 14}px) scale(${0.9 + m * 0.1})`;
      main.style.opacity = String(m);
      left.style.transform = `translate(${-(1 - l) * 110}px, ${(1 - l) * 40 - drift * 34}px) rotate(${-3 - (1 - l) * 9}deg)`;
      left.style.opacity = String(l);
      right.style.transform = `translate(${(1 - r) * 110}px, ${(1 - r) * 50 - drift * 52}px) rotate(${3 + (1 - r) * 9}deg)`;
      right.style.opacity = String(r);
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

/* Client behaviour for ported pages:
   - reveal-on-scroll: adds the classes the designs use ("on" / "in") to every
     .reveal element once it scrolls into view
   - cursor-following spotlight on [data-spotlight] glass cards
   - scroll-driven screenshot collages on [data-collage] */
export default function RevealObserver({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on", "in");
        }),
      { threshold: 0.08 }
    );
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // cursor-following spotlight for glass cards: sets --mx / --my on [data-spotlight]
    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      el.addEventListener("pointermove", move);
      cleanups.push(() => el.removeEventListener("pointermove", move));
    });

    cleanups.push(setupCollages(root));
    cleanups.push(setupPortedEffects(root));

    return () => {
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [rootId]);
  return null;
}
