"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Expose the instance globally so TubesCursor can read scroll velocity
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    function raf(time: number) {
      // Skip lenis scroll when the hero video scroll-lock is active
      if (!(window as Window & { __scrollLocked?: boolean }).__scrollLocked) {
        lenis.raf(time);
      }
      // Broadcast target (unsmoothed) scroll so scroll-linked sections can
      // respond instantly rather than waiting for lerp to catch up.
      document.dispatchEvent(
        new CustomEvent("lenis-target-scroll", {
          detail: { targetScroll: (lenis as unknown as { targetScroll: number }).targetScroll },
        })
      );
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    // <html> is h-full, so Lenis' own observer never sees content growth (lazy
    // images, fonts, sticky tracks) and its cached scroll limit goes stale.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const bodyObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => lenis.resize(), 100);
    });
    bodyObserver.observe(document.body);

    return () => {
      bodyObserver.disconnect();
      clearTimeout(resizeTimer);
      cancelAnimationFrame(id);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
