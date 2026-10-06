"use client";

import { useEffect } from "react";

/** Adds the `in` class to `.reveal` elements on the About page as they scroll into view. */
export default function AboutEffects() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".about-page .reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
