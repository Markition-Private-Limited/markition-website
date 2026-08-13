"use client";

import { useEffect, useRef, useCallback } from "react";

const randomColors = (count: number) =>
  Array.from({ length: count }, () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
  );
  // test

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appRef = useRef<any>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    let destroyed = false;
    const timer = setTimeout(async () => {
      if (!canvasRef.current || destroyed) return;
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mod = await import("threejs-components/build/cursors/tubes1.min.js");
        const TubesCursorLib = mod.default ?? mod;
        const app = TubesCursorLib(canvasRef.current, {
          tubes: {
            colors: ["#5e72e4", "#8965e0", "#f5365c"],
            lights: {
              intensity: 200,
              colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
            },
          },
          lerp: 0.3,
          noise: 0,
          // Default threshold is 0, which blooms the flat clear-color
          // background too and washes it into a faint glow/haze. Raising it
          // keeps bloom on the bright tubes/lights only, so the background
          // stays exactly #000028.
          bloom: { threshold: 0.15, strength: 1.5, radius: 0.5 },
        });
        app.three.renderer.setClearColor("#000028", 1);

        // The library redirects the tubes to a wide orbiting "sleep" path the
        // instant the pointer leaves its hitbox, which reads as an overshoot
        // toward the center. Gate the library's own per-frame callback on our
        // own hover tracking: keep the real follow logic while hovering, and
        // simply stop re-targeting once the pointer leaves — the tubes then
        // settle and hold at the last cursor position instead of redirecting.
        const originalOnBeforeRender = app.three.onBeforeRender;
        app.three.onBeforeRender = (e: unknown) => {
          if (hoveringRef.current) {
            originalOnBeforeRender(e);
          } else {
            app.tubes.update(e);
          }
        };

        appRef.current = app;
      } catch (e) {
        console.error("TubesCursor init failed:", e);
      }
    }, 100);

    // Content sitting above the canvas (z-10 hero text, z-50 navbar) intercepts
    // pointer events before they reach the canvas itself, so listen on the
    // canvas's positioned parent instead — it shares the exact same bounding
    // box (canvas is `absolute inset-0` relative to it) and isn't obscured.
    const canvas = canvasRef.current;
    const hitArea = canvas?.parentElement ?? null;
    const setHover = (v: boolean) => () => { hoveringRef.current = v; };
    const onEnter = setHover(true);
    const onLeave = setHover(false);
    hitArea?.addEventListener("pointerenter", onEnter);
    hitArea?.addEventListener("pointerleave", onLeave);

    return () => {
      destroyed = true;
      clearTimeout(timer);
      hitArea?.removeEventListener("pointerenter", onEnter);
      hitArea?.removeEventListener("pointerleave", onLeave);
      appRef.current?.dispose?.();
    };
  }, []);

  const handleClick = useCallback(() => {
    const app = appRef.current;
    if (!app) return;
    app.tubes?.setColors?.(randomColors(3));
    app.tubes?.setLightsColors?.(randomColors(4));
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        cursor: "pointer",
      }}
    />
  );
}
