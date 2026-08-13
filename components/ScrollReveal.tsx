"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 660,
  distance = 24,
  className,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style: CSSProperties = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };

  return (
    <div ref={ref} className={className} style={style} data-scroll-reveal="">
      {children}
    </div>
  );
}
