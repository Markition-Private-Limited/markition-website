import Image from "next/image";
import { TICKER_LOGOS } from "@/lib/constants";

const tickerItems = [
  ...TICKER_LOGOS,
  ...TICKER_LOGOS,
  ...TICKER_LOGOS,
  ...TICKER_LOGOS,
];

export default function Ticker() {
  return (
    <div
      className="relative z-10 overflow-visible py-3 sm:py-4"
      style={{
        background: "linear-gradient(180deg, rgba(4, 14, 60, 0.88) 0%, rgba(2, 8, 42, 0.94) 100%)",
        backdropFilter: "blur(24px) saturate(1.8) brightness(0.9)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8) brightness(0.9)",
        borderTop: "1px solid rgba(130, 170, 255, 0.18)",
        borderBottom: "1px solid rgba(130, 170, 255, 0.18)",
        boxShadow: "inset 0 1px 0 rgba(130,170,255,0.08), inset 0 -1px 0 rgba(130,170,255,0.06), 0 4px 32px rgba(0,0,30,0.5)",
        isolation: "isolate",
      }}
    >
      <div className="ticker-track flex items-center w-max">
        {tickerItems.map((logo, i) => (
          <div
            key={i}
            className="flex items-center px-5 sm:px-7 lg:px-10 select-none flex-shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain brightness-0 invert"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Edge fade overlays */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 lg:w-32 z-10"
        style={{
          background: "linear-gradient(to right, rgba(2,8,42,0.98) 0%, rgba(2,8,42,0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 lg:w-32 z-10"
        style={{
          background: "linear-gradient(to left, rgba(2,8,42,0.98) 0%, rgba(2,8,42,0) 100%)",
        }}
      />
    </div>
  );
}
