"use client";

import { useEffect } from "react";

/** Adds the `on` class to `.reveal` blocks (except project cards, which handle their own) as they scroll into view. */
export default function RevealEffects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-page .reveal:not(.project)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
