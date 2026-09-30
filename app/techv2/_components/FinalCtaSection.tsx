import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-transparent" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative py-12 group rounded-lg bg-black overflow-hidden flex items-center justify-center">
          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            <div className="mx-auto mb-7 flex items-center justify-center">
              <Image src="/markition-logo.svg" alt="Markition" width={130} height={26} className="opacity-90" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Ready to build your next big product?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm md:text-base leading-relaxed text-white/45">
              No fluff, no endless meetings — just great software, shipped fast. Let&apos;s get started.
            </p>
            <div className="mt-8 flex justify-center items-center">
              <a
                href="/contact"
                className="rounded-lg bg-white flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black group-hover:bg-[#062283] group-hover:text-white transition-all duration-700 hover:bg-white/90"
              >
                Start Your Project
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
