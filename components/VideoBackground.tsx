"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 45;
// Each capped wheel event contributes at most MAX_DELTA units.
// SCROLL_PER_FRAME controls how many units = 1 frame.
// Together these mean ~1-2 frames advance per wheel notch.
const MAX_DELTA_PER_EVENT = 100;
const SCROLL_PER_FRAME = 50;

// frame_001…frame_044, then frame_046 (no frame_045)
const FRAME_NAMES = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const n = i + 1;
  const num = n >= 45 ? n + 1 : n;
  return `/video-frames/frame_${String(num).padStart(3, "0")}.jpg`;
});

const TOTAL_SCROLL = (FRAME_COUNT - 1) * SCROLL_PER_FRAME;

type LockWindow = Window & { __scrollLocked?: boolean };

function lockScroll() {
  (window as LockWindow).__scrollLocked = true;
}
function unlockScroll() {
  (window as LockWindow).__scrollLocked = false;
}

export default function VideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let destroyed = false;
    let accumulated = 0;
    let currentFrame = 0;
    let locked = true;

    // Lock immediately — LenisProvider reads this flag every raf tick
    lockScroll();

    // Preload all frames
    const images: HTMLImageElement[] = FRAME_NAMES.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const img = images[index];
      if (img?.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }

    function initCanvas() {
      if (!canvas || destroyed) return;
      canvas.width = images[0].naturalWidth || 1920;
      canvas.height = images[0].naturalHeight || 1080;
      drawFrame(0);
    }

    if (images[0].complete && images[0].naturalWidth > 0) {
      initCanvas();
    } else {
      images[0].onload = initCanvas;
    }

    function unlock() {
      if (!locked) return;
      locked = false;
      unlockScroll();
    }

    function relock() {
      locked = true;
      accumulated = TOTAL_SCROLL;
      lockScroll();
    }

    const onWheel = (e: WheelEvent) => {
      // Re-lock when user scrolls back to top and tries to go up
      if (window.scrollY === 0 && !locked && e.deltaY < 0) {
        relock();
      }

      if (!locked) return;

      e.preventDefault();

      // Cap per-event delta so fast wheels don't skip frames
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), MAX_DELTA_PER_EVENT);
      accumulated = Math.max(0, Math.min(TOTAL_SCROLL, accumulated + delta));
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.round(accumulated / SCROLL_PER_FRAME));

      if (frameIndex !== currentFrame) {
        drawFrame(frameIndex);
        currentFrame = frameIndex;
      }

      if (accumulated >= TOTAL_SCROLL) unlock();
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && !locked) {
        const delta = touchStartY - e.touches[0].clientY;
        if (delta < 0) relock();
      }
      if (!locked) return;

      e.preventDefault();
      const delta = (touchStartY - e.touches[0].clientY) * 2.5;
      touchStartY = e.touches[0].clientY;

      accumulated = Math.max(0, Math.min(TOTAL_SCROLL, accumulated + delta));
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.round(accumulated / SCROLL_PER_FRAME));
      if (frameIndex !== currentFrame) {
        drawFrame(frameIndex);
        currentFrame = frameIndex;
      }
      if (accumulated >= TOTAL_SCROLL) unlock();
    };

    // Capture phase so we intercept before Lenis's bubble-phase listener
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });

    return () => {
      destroyed = true;
      unlockScroll();
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
