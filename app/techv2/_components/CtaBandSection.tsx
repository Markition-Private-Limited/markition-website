import Image from "next/image";
import { Phone } from "lucide-react";

export function CtaBandSection() {
  return (
    <section className="relative overflow-hidden py-8 md:py-20" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[360px] overflow-visible rounded-2xl bg-black py-12">
          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(circle, black 45%, transparent 100%)",
            }}
          />

          <div className="relative z-10 grid min-h-[360px] grid-cols-1 items-center md:grid-cols-[0.95fr_1fr]">
            {/* Decorative image */}
            <div className="pointer-events-none absolute -bottom-12 left-14 z-20 hidden md:block">
              <Image
                src="/assets/cta2-Dg6XKVF2.png"
                alt=""
                width={360}
                height={360}
                className="w-[360px] object-contain"
              />
            </div>
            <div className="hidden md:block" />

            {/* Content */}
            <div className="relative z-30 px-6 py-10 sm:px-10 md:px-8 lg:px-12">
              <h2 className="max-w-[620px] text-[34px] font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-[44px]">
                Great Businesses Start With Great Conversations
              </h2>
              <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                Let&apos;s discuss your ideas, challenges, and growth opportunities to create a clear path toward your next milestone.
              </p>

              {/* Phone form */}
              <form className="mt-9 flex w-full max-w-[520px] items-center rounded-2xl bg-white p-2 shadow-[0_18px_45px_rgba(255,255,255,0.13)]">
                <div className="flex h-12 items-center border-r border-black/10 px-4">
                  <span className="text-sm font-semibold text-black">+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Enter your phone"
                  maxLength={10}
                  className="h-12 min-w-0 flex-1 bg-transparent rounded-lg px-4 mx-2 py-2 text-sm font-medium text-black outline-none placeholder:text-black/40"
                />
                <button
                  type="submit"
                  className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#080b3f] px-5 text-xs font-bold text-white transition duration-300 hover:bg-[#062283] sm:px-7"
                >
                  <Phone size={16} />
                  <span className="hidden sm:inline">Get A Call</span>
                  <span className="sm:hidden">Get</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
