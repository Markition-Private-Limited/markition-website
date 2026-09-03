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
      className="relative z-10 overflow-hidden py-7 sm:py-9 lg:py-11"
      style={{ background: "#010424", isolation: "isolate" }}
    >
      <div className="ticker-track flex items-center w-max">
        {tickerItems.map((logo, i) => (
          <div
            key={i}
            className="flex items-center px-8 sm:px-12 lg:px-16 select-none flex-shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={36}
              className="h-6 sm:h-7 lg:h-9 w-auto object-contain brightness-0 invert"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Edge fade overlays */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 lg:w-32 z-10"
        style={{
          background: "linear-gradient(to right, #010424 0%, rgba(1,4,36,0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 lg:w-32 z-10"
        style={{
          background: "linear-gradient(to left, #010424 0%, rgba(1,4,36,0) 100%)",
        }}
      />
    </div>
  );
}
