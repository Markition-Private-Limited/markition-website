import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function TrustLine() {
  return (
    <ScrollReveal threshold={0.5} className="py-5 px-6 sm:px-12 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
        <div className="hidden sm:block flex-1 h-px" style={{ background: "rgba(255,255,255,0.55)" }} />
        <div className="flex flex-col xs:flex-row items-center gap-1.5 xs:gap-2.5 text-white text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-center">
          <span className="whitespace-nowrap">Join the 200+ companies trusting</span>
          <Image src="/markition-logo.svg" alt="Markition" width={90} height={22} className="h-[18px] xs:h-[20px] sm:h-[22px] w-auto brightness-0 invert" />
        </div>
        <div className="hidden sm:block flex-1 h-px" style={{ background: "rgba(255,255,255,0.55)" }} />
        <div className="block sm:hidden w-full h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
      </div>
    </ScrollReveal>
  );
}
