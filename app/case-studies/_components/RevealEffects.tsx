"use client";

import { useEffect } from "react";

/** Adds the `in` class to `.reveal` elements on the Case Studies page as they scroll into view. */
export default function RevealEffects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".cs-page .reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
