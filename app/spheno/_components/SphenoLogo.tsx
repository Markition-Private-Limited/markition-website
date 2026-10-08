"use client";

import React from "react";

interface SphenoLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
}

export const SphenoLogo: React.FC<SphenoLogoProps> = ({
  className = "",
  variant = "dark",
  size = "md",
}) => {
  const heightClasses = {
    sm: "h-12 sm:h-14",
    md: "h-16 sm:h-20",
    lg: "h-20 sm:h-24",
    xl: "h-24 sm:h-28",
  }[size];

  return (
    <div className="inline-flex items-center select-none group cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/spheno/images/markition-spheno-lockup.webp"
        alt="Markition | SPHENO"
        className={`${className || heightClasses} w-auto max-w-none object-contain block transition-transform duration-300 group-hover:scale-[1.02] ${
          variant === "light" ? "invert" : ""
        }`}
        draggable={false}
      />
    </div>
  );
};
