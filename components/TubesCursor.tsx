"use client";

import { useEffect, useRef } from "react";

const randomColors = (count: number) =>
  Array.from({ length: count }, () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
  );

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appRef = useRef<any>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    let destroyed = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    (async () => {
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
              intensity: 80,
              colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
            },
          },
          lerp: 0.3,
          noise: 0,
          bloom: { threshold: 0.2, strength: 0.8, radius: 0.4 },
        });

        if (destroyed) {
          app.dispose?.();
          return;
        }

        // app.three.renderer.setClearColor("#000028", 1);

        // The library hardcodes minPixelRatio/maxPixelRatio to 2 on init, and
        // re-clamps to that range on every internal resize event — so a plain
        // setPixelRatio() call gets silently overwritten the next time the
        // canvas resizes. Overriding these two properties (then calling
        // resize()) is the only way the low pixel ratio actually sticks,
        // which is what was causing the lag to keep "coming back".
        app.three.minPixelRatio = 0.75;
        app.three.maxPixelRatio = 0.75;
        app.three.resize();

        const originalOnBeforeRender = app.three.onBeforeRender;
        app.three.onBeforeRender = (e: unknown) => {
          if (hoveringRef.current) {
            originalOnBeforeRender(e);
          } else {
            app.tubes.update(e);
          }
        };

        appRef.current = app;
        canvas.style.opacity = "1";
      } catch (e) {
        console.error("TubesCursor init failed:", e);
      }
    })();

    const root = document.documentElement;
    const onEnter = () => { hoveringRef.current = true; };
    const onLeave = () => { hoveringRef.current = false; };
    const onClick = () => {
      const app = appRef.current;
      if (!app) return;
      app.tubes?.setColors?.(randomColors(3));
      app.tubes?.setLightsColors?.(randomColors(4));
    };
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("click", onClick);

    // Scroll-based movement: the library listens for "pointermove" on
    // document.body (confirmed in minified source). Hook into Lenis's scroll
    // callback (velocity-driven, already smoothed) so the tube drift matches
    // the smooth scroll feel. Falls back to native scroll if Lenis isn't ready.
    const lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onPointerMove = (e: PointerEvent) => {
      lastPointer.x = e.clientX;
      lastPointer.y = e.clientY;
    };

    const nudgeTubes = (velocity: number) => {
      document.body.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: lastPointer.x,
          clientY: lastPointer.y + velocity * 120,
          bubbles: true,
          cancelable: true,
        })
      );
    };

    // Attach to Lenis once it's initialised by LenisProvider (it's set on
    // window.__lenis synchronously in the same React paint, so it's available
    // by the time this effect runs on the next tick).
    type LenisInstance = { on: (e: string, cb: (s: { velocity: number }) => void) => void; off: (e: string, cb: unknown) => void };
    const lenis = (window as Window & { __lenis?: LenisInstance }).__lenis;
    const onLenisScroll = (s: { velocity: number }) => nudgeTubes(s.velocity);

    if (lenis) {
      lenis.on("scroll", onLenisScroll);
    } else {
      // Lenis not ready — fall back to native scroll delta
      let lastScrollY = window.scrollY;
      const onScroll = () => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        nudgeTubes(delta * 0.003);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    window.addEventListener("pointermove", onPointerMove);

    return () => {
      destroyed = true;
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
      window.removeEventListener("pointermove", onPointerMove);
      const l = (window as Window & { __lenis?: LenisInstance }).__lenis;
      l?.off("scroll", onLenisScroll);
      appRef.current?.dispose?.();
      appRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        mixBlendMode: "screen",
        zIndex: 2,
        pointerEvents: "none",
        willChange: "transform",
        opacity: 0,
        transition: "opacity 0.8s ease",
      }}
    />
  );
}
