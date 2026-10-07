"use client";

import { useRef } from "react";

type DepthCardProps = {
  image: string;
  statement: string;
  caveat: string;
  /** Longer description revealed on hover. */
  desc: string;
  /** Max parallax shift (px) of the image layer. */
  maxTranslation?: number;
  /** Max card tilt in degrees. */
  maxTilt?: number;
  staggerIndex: number;
};

/**
 * Card that tilts in 3D toward the cursor, with the image and text sitting on
 * different depth layers. The outer wrapper keeps `data-stagger` so the page's
 * AnimationOrchestrator still handles the staggered scale-in reveal — all
 * cursor transforms live on inner elements so the two never fight.
 */
export default function DepthCard({
  image,
  statement,
  caveat,
  desc,
  maxTranslation = 14,
  maxTilt = 9,
  staggerIndex,
}: DepthCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 600ms cubic-bezier(0.22,1,0.36,1), box-shadow 600ms ease";
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    card.style.boxShadow = "0 2px 16px rgba(0,0,0,0.18)";
    if (imageLayerRef.current) imageLayerRef.current.style.transform = "translate3d(0,0,0) scale(1.14)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    // -1 … 1 from card centre
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    card.style.transition = "transform 120ms ease-out, box-shadow 300ms ease";
    card.style.transform = `rotateX(${-ny * maxTilt}deg) rotateY(${nx * maxTilt}deg)`;
    card.style.boxShadow = `${-nx * 18}px ${20 - ny * 10}px 40px rgba(0,0,0,0.35)`;

    if (imageLayerRef.current) {
      imageLayerRef.current.style.transform =
        `translate3d(${-nx * maxTranslation}px, ${-ny * maxTranslation}px, 0) scale(1.14)`;
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background =
        `radial-gradient(circle at ${(nx + 1) * 50}% ${(ny + 1) * 50}%, rgba(255,255,255,0.28), transparent 55%)`;
    }
  };

  return (
    <div
      data-stagger={String(staggerIndex)}
      style={{ perspective: "900px" }}
    >
      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        className="relative rounded-2xl overflow-hidden group"
        style={{
          background: "#ffffff",
          boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
        }}
      >
        {/* Full-bleed image layer — parallaxes opposite the cursor */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
          <div
            ref={imageLayerRef}
            className="absolute inset-0"
            style={{ transform: "translate3d(0,0,0) scale(1.14)", willChange: "transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={statement}
              draggable={false}
              className="absolute w-full"
              /* The source JPGs have a ~110px flat band baked into the top and
                 bottom edges; oversize + offset the image so those are cropped
                 out and the picture fills the whole card. */
              style={{ objectFit: "cover", display: "block", top: "-16.4%", height: "132.7%" }}
            />
          </div>

          {/* Readability gradient — deepens on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(180deg, rgba(1,12,40,0) 35%, rgba(1,12,40,0.88) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(180deg, rgba(1,12,40,0.45) 0%, rgba(1,12,40,0.92) 100%)" }}
          />

          {/* Text on the image — description expands upward on hover */}
          <div
            className="absolute inset-x-0 bottom-0 px-5 py-5 sm:px-6 sm:py-6 antialiased"
          >
            <p
              className="text-white font-semibold leading-snug"
              style={{ fontSize: "clamp(15px, 1.4vw, 19px)" }}
            >
              {statement}
            </p>
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
              <div className="overflow-hidden">
                <p
                  className="font-medium leading-snug pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                  style={{ fontSize: "clamp(12px, 1vw, 14px)", color: "#00D4FF" }}
                >
                  {caveat}
                </p>
                <p
                  className="text-white leading-[1.55] pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150"
                  style={{ fontSize: "clamp(12.5px, 1.05vw, 14.5px)" }}
                >
                  {desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Glare */}
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0, transition: "opacity 300ms ease" }}
        />
      </div>
    </div>
  );
}
