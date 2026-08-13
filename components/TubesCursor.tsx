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
              intensity: 80,
              colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
            },
          },
          lerp: 0.3,
          noise: 0,
          bloom: { threshold: 0.2, strength: 0.8, radius: 0.4 },
        });
  // test
        app.three.renderer.setClearColor("#000028", 1);
        // Cap pixel ratio at 1× — retina renders 4× the pixels for no visible
        // gain on a full-viewport WebGL canvas, and it's the main cause of lag.
        app.three.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

        const originalOnBeforeRender = app.three.onBeforeRender;
        app.three.onBeforeRender = (e: unknown) => {
          if (hoveringRef.current) {
            originalOnBeforeRender(e);
          } else {
            app.tubes.update(e);
          }
        };

        appRef.current = app;

        // Fade in only after the library is ready so there's no flash on first load.
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      } catch (e) {
        console.error("TubesCursor init failed:", e);
      }
    }, 100);

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

    return () => {
      destroyed = true;
      clearTimeout(timer);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
      appRef.current?.dispose?.();
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
        // screen blend: the dark #000028 clear-colour vanishes over dark
        // backgrounds; only the bright tubes remain visible above every section.
        mixBlendMode: "screen",
        // z-index: 1 sits just above normal-flow section backgrounds but below
        // positioned content (hero text z-10, navbar z-50), so the tubes feel
        // like they're part of the background, not floating on top of content.
        zIndex: 1,
        pointerEvents: "none",
        // Start transparent; fade in once the WebGL lib has initialised so the
        // canvas never flashes a blank frame on first load.
        opacity: 0,
        transition: "opacity 0.8s ease",
      }}
    />
  );
}
