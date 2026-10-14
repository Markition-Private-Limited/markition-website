"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TypewriterRotator from "./TypewriterRotator";
import ContentCalculator from "./ContentCalculator";
import FootageScrubber from "./FootageScrubber";

const MOUNTS = [
  { id: "cv-typer", Component: TypewriterRotator },
  { id: "cv-calculator", Component: ContentCalculator },
  { id: "cv-scrubber", Component: FootageScrubber },
] as const;

/* Mounts real React widgets into the placeholder divs left in content.ts, and
   adds a subtle 3D tilt + magnetic pull on cards and buttons. */
export default function VideoEditingEnhancements() {
  const [containers, setContainers] = useState<Record<string, HTMLElement>>({});

  useEffect(() => {
    const t = setTimeout(() => {
      const found: Record<string, HTMLElement> = {};
      for (const { id } of MOUNTS) {
        const el = document.getElementById(id);
        if (el) found[id] = el;
      }
      setContainers(found);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = document.getElementById("cv-page-root");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups: Array<() => void> = [];

    root.querySelectorAll<HTMLElement>(".panel-feature, .panel-statement, .workflow-step, .cvx-calc").forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
      };
      const onLeave = () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      };
      el.classList.add("cvx-tilt");
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    root.querySelectorAll<HTMLElement>(".btn, .nav-cta").forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--bx", `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px`);
        el.style.setProperty("--by", `${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`);
      };
      const onLeave = () => {
        el.style.setProperty("--bx", "0px");
        el.style.setProperty("--by", "0px");
      };
      el.classList.add("cvx-magnet");
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containers]);

  return (
    <>
      {MOUNTS.map(({ id, Component }) => {
        const c = containers[id];
        return c ? createPortal(<Component key={id} />, c) : null;
      })}
    </>
  );
}
