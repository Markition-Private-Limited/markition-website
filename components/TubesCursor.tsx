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
            count: 12,
            maxTubularSegments: 64,
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

        // Suppress the getSupportedExtensions crash on WebGL context loss
        // (happens on HMR / tab visibility changes in some browsers)
        canvas.addEventListener("webglcontextlost", (ev) => {
          ev.preventDefault();
          appRef.current?.dispose?.();
          appRef.current = null;
          canvas.style.opacity = "0";
        }, { once: true });
      } catch (e) {
        console.error("TubesCursor init failed:", e);
      }
    }, 100);

    // ── Desktop click — randomise colors ────────────────────────────────
    const onClick = (e: MouseEvent) => {
      const app = appRef.current;
      if (!app) return;
      const rect = canvas.getBoundingClientRect();
      if (!isInsideCanvas(rect, e.clientX, e.clientY)) return;
      app.tubes?.setColors?.(randomColors(3));
      app.tubes?.setLightsColors?.(randomColors(4));
    };

    // ── Bounce-back fix ──────────────────────────────────────────────────
    // The library (threejs-components) listens to "pointermove" and
    // "pointerleave" on document.body (bubble phase). It switches the tubes
    // to an idle orbit around the canvas center whenever the pointer is
    // outside the canvas rect OR body fires "pointerleave" (cursor exits
    // the window, hovers the auto-hide taskbar, etc.).
    //
    // Fix strategy: intercept BEFORE the library's body handler ever fires.
    //
    // 1. clampPointer — capture phase on document, so it runs before body's
    //    bubble handlers. If the real coords are outside the canvas, we stop
    //    the original event and dispatch a clamped event directly on body
    //    (bubbles:false so it goes only to body, not back up). The library
    //    then sees the cursor as being on the canvas edge, never "outside".
    //
    // 2. blockBodyLeave — capture phase on body, stops the library's own
    //    "pointerleave" handler (bB) from setting hover=false, which is what
    //    triggers the idle orbit when the cursor leaves the browser window.
    //
    // Together these ensure the library never enters the idle orbit after
    // the cursor has been seen at least once.

    const clampPointer = (e: PointerEvent) => {
      // Skip synthetic events we dispatched ourselves (isTrusted=false)
      if (!e.isTrusted) return;
      if (!appRef.current) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom <= 0) return; // hero scrolled out of view

      // If inside canvas, let the event pass through normally
      if (isInsideCanvas(rect, e.clientX, e.clientY)) return;

      // Outside canvas: block the real event from reaching body's listener
      // and fire a clamped one directly on body instead.
      e.stopPropagation();
      document.body.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: Math.max(rect.left, Math.min(e.clientX, rect.right)),
          clientY: Math.max(rect.top, Math.min(e.clientY, rect.bottom)),
          bubbles: false,
        })
      );
    };

    const blockBodyLeave = (e: Event) => {
      if (!appRef.current) return;
      // Block the library's bB handler which sets hover=false and
      // triggers the idle orbit bounce-back
      e.stopImmediatePropagation();
    };

    // ── Mobile touch — forward touch position as pointermove to the library ─
    const onTouchMove = (e: TouchEvent) => {
      if (!appRef.current) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom <= 0) return;

      const touch = e.touches[0];
      if (!touch) return;

      const clientX = touch.clientX;
      const clientY = Math.min(touch.clientY, rect.bottom);

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

      if (!isInsideCanvas(rect, touch.clientX, touch.clientY)) return;

      document.body.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: touch.clientX,
          clientY: touch.clientY,
          bubbles: false,
        })
      );
    };

    const onTouchEnd = (e: TouchEvent) => {
      const app = appRef.current;
      if (!app) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom <= 0) return;

      const touch = e.changedTouches[0];
      if (!touch) return;

      if (!isInsideCanvas(rect, touch.clientX, touch.clientY)) return;

      app.tubes?.setColors?.(randomColors(3));
      app.tubes?.setLightsColors?.(randomColors(4));
    };

    window.addEventListener("click", onClick);
    // Capture phase — fires before the library's body bubble-phase handlers
    document.addEventListener("pointermove", clampPointer, true);
    document.body.addEventListener("pointerleave", blockBodyLeave, true);
    // Use passive: true — we never call preventDefault on these
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      destroyed = true;
      clearTimeout(initTimer);
      window.removeEventListener("click", onClick);
      document.removeEventListener("pointermove", clampPointer, true);
      document.body.removeEventListener("pointerleave", blockBodyLeave, true);
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
