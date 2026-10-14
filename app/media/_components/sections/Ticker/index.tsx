import Image from "next/image";
import { TICKER_LOGOS } from "@/lib/constants";

const items = [...TICKER_LOGOS, ...TICKER_LOGOS, ...TICKER_LOGOS, ...TICKER_LOGOS];

export default function Ticker() {
  return (
    <section className="relative z-10 w-full media-gap">

      {/* Glass ticker strip — same as homepage */}
      <div
        className="relative overflow-hidden py-3 sm:py-4"
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
        <div className="media-ticker-track flex items-center w-max">
          {items.map((logo, i) => (
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

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 lg:w-32 z-10"
          style={{ background: "linear-gradient(to right, rgba(2,8,42,0.98) 0%, rgba(2,8,42,0) 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 lg:w-32 z-10"
          style={{ background: "linear-gradient(to left, rgba(2,8,42,0.98) 0%, rgba(2,8,42,0) 100%)" }}
        />
      </div>

      {/* Trust divider */}
      <div className="py-5 px-6 sm:px-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.22)" }} />
          <div className="flex items-center gap-2 text-white text-[11px] sm:text-[13px] tracking-[0.18em] uppercase whitespace-nowrap">
            <span className="opacity-70">Join the 200+ companies trusting</span>
            <Image
              src="/media/markition-logo-white.webp"
              alt="Markition"
              width={90}
              height={22}
              className="h-[16px] sm:h-[20px] w-auto opacity-70"
            />
          </div>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.22)" }} />
        </div>
      </div>

    </section>
  );
}
