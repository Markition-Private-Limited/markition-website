"use client";

import { useEffect, useRef } from "react";

const randomColors = (count: number) =>
  Array.from({ length: count }, () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
  );

/** Returns true if the touch/pointer coordinate falls inside the canvas rect. */
function isInsideCanvas(rect: DOMRect, clientX: number, clientY: number) {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appRef = useRef<any>(null);

  useEffect(() => {
    let destroyed = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Delay init so the canvas has its final layout dimensions before the
    // library reads them — prevents the "Computed radius is NaN" race on
    // first paint and ensures cursor tracking starts correctly.
    const initTimer = setTimeout(async () => {
      if (destroyed || !canvasRef.current) return;
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mod = await import("threejs-components/build/cursors/tubes1.min.js");
        if (destroyed) return;
        const TubesCursorLib = mod.default ?? mod;
        const app = TubesCursorLib(canvas, {
          tubes: {
            colors: ["#5e72e4", "#8965e0", "#f5365c"],
            lights: {
              intensity: 200,
              colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
            },
          },
          lerp: 0.3,
          noise: 0,
        });

        if (destroyed) {
          app.dispose?.();
          return;
        }

        app.three.renderer.setClearColor(0x000000, 0);

        // The library hardcodes minPixelRatio/maxPixelRatio to 2 on init and
        // re-clamps on every resize — overriding these is the only way to make
        // the ratio stick.
        const dpr = Math.min(window.devicePixelRatio, 2);
        app.three.minPixelRatio = dpr;
        app.three.maxPixelRatio = dpr;
        app.three.resize();

        appRef.current = app;
        canvas.style.opacity = "1";
      } catch (e) {
        console.error("TubesCursor init failed:", e);
      }
    }, 100);

    // ── Desktop click — randomise colors ────────────────────────────────
    const onClick = (e: MouseEvent) => {
      const app = appRef.current;
      if (!app) return;
      const rect = canvas.getBoundingClientRect();
      // Only react when the click is within the hero canvas area
      if (!isInsideCanvas(rect, e.clientX, e.clientY)) return;
      app.tubes?.setColors?.(randomColors(3));
      app.tubes?.setLightsColors?.(randomColors(4));
    };

    // ── Desktop guard — clamp Y so tubes don't chase cursor below canvas ─
    // The library listens for pointermove on document.body (bubble phase).
    // This window bubble listener fires AFTER body handlers, so it can dispatch
    // a correcting event that overwrites the library's cursor Y before the next
    // rAF render.
    const guardMove = (e: PointerEvent) => {
      if (!appRef.current) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom <= 0) return; // canvas fully above viewport
      const clampedY = Math.min(e.clientY, rect.bottom);
      if (clampedY >= e.clientY) return; // cursor already within canvas bounds
      document.body.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: e.clientX,
          clientY: clampedY,
          bubbles: false, // stay on body only — no re-entry into this guard
        })
      );
    };

    // ── Mobile touch — forward touch position as pointermove to the library ─
    // The tubes library only listens to pointermove on document.body. On
    // mobile there's no pointer movement without a physical pointing device,
    // so we synthesise pointermove events from touch coordinates. We only
    // do this while the touch stays within the hero canvas bounds so the
    // effect is strictly scoped to the first section.
    const onTouchMove = (e: TouchEvent) => {
      if (!appRef.current) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom <= 0) return; // hero scrolled out of view

      const touch = e.touches[0];
      if (!touch) return;

      // Clamp Y so tubes never escape the hero section downward
      const clientX = touch.clientX;
      const clientY = Math.min(touch.clientY, rect.bottom);

      // Only forward if the original touch started inside the hero
      if (!isInsideCanvas(rect, touch.clientX, touch.clientY) && touch.clientY > rect.bottom) return;

      document.body.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX,
          clientY,
          bubbles: false,
        })
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!appRef.current) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom <= 0) return;

      const touch = e.touches[0];
      if (!touch) return;

      // Only react to taps inside the hero section
      if (!isInsideCanvas(rect, touch.clientX, touch.clientY)) return;

      const clientX = touch.clientX;
      const clientY = touch.clientY;

      // Drive the tubes to the tap position immediately
      document.body.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX,
          clientY,
          bubbles: false,
        })
      );
    };

    const onTouchEnd = (e: TouchEvent) => {
      const app = appRef.current;
      if (!app) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom <= 0) return;

      // changedTouches holds the touch that just lifted
      const touch = e.changedTouches[0];
      if (!touch) return;

      // Only randomise colors when tap ended inside the hero
      if (!isInsideCanvas(rect, touch.clientX, touch.clientY)) return;

      app.tubes?.setColors?.(randomColors(3));
      app.tubes?.setLightsColors?.(randomColors(4));
    };

    window.addEventListener("click", onClick);
    window.addEventListener("pointermove", guardMove);
    // Use passive: true — we never call preventDefault on these
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      destroyed = true;
      clearTimeout(initTimer);
      window.removeEventListener("click", onClick);
      window.removeEventListener("pointermove", guardMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      appRef.current?.dispose?.();
      appRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        mixBlendMode: "screen",
        zIndex: 1,
        pointerEvents: "none",
        willChange: "transform",
        opacity: 0,
        transition: "opacity 0.8s ease",
      }}
    />
  );
}
