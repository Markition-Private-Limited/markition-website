"use client";

import { useEffect, useRef } from "react";

type Variant = "up" | "down" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const INITIAL: Record<Variant, string> = {
  up:    "opacity:0;transform:translateY(48px)",
  down:  "opacity:0;transform:translateY(-48px)",
  left:  "opacity:0;transform:translateX(-48px)",
  right: "opacity:0;transform:translateX(48px)",
  scale: "opacity:0;transform:scale(0.88)",
  fade:  "opacity:0",
};

const VISIBLE: Record<Variant, string> = {
  up:    "opacity:1;transform:translateY(0)",
  down:  "opacity:1;transform:translateY(0)",
  left:  "opacity:1;transform:translateX(0)",
  right: "opacity:1;transform:translateX(0)",
  scale: "opacity:1;transform:scale(1)",
  fade:  "opacity:1",
};

function applyStyle(el: HTMLElement, styleStr: string) {
  styleStr.split(";").forEach((rule) => {
    const [prop, val] = rule.split(":");
    if (prop && val) {
      const camel = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      (el.style as unknown as Record<string, string>)[camel] = val.trim();
    }
  });
}

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 780,
  threshold = 0.12,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
    applyStyle(el, INITIAL[variant]);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          applyStyle(el, VISIBLE[variant]);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, delay, duration, threshold]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
