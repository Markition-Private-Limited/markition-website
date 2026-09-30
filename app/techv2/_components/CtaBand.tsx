import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section
      className="bg-[#0d0f14] text-white text-center flex flex-col items-center gap-8 py-24 px-6"
      id="contact"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50 mb-4">
          Let&apos;s Build What&apos;s Next
        </p>
        <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold leading-[1.2] tracking-[-0.015em] text-white max-w-[640px]">
          Let&apos;s Build Your Next System
        </h2>
        <p className="text-white/65 max-w-[560px] mt-3 text-[1.05rem] mx-auto">
          Something in your business isn&apos;t working the way it should? Maybe you&apos;re relying on spreadsheets. Maybe your systems don&apos;t communicate. Maybe your team is spending hours on processes that should be automated. Maybe you have an idea for a platform, application, or business system but don&apos;t know where to start.
        </p>
        <p className="text-white/85 font-semibold mt-5">
          Tell us what&apos;s not working. We&apos;ll show you what can be built.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href="mailto:info.markition@gmail.com"
          className="inline-flex items-center gap-1.5 bg-white text-[#0d0f14] rounded-full px-7 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity"
        >
          Start a Project
          <ArrowRight size={18} />
        </a>
        <a
          href="mailto:info.markition@gmail.com"
          className="border border-white/20 text-white/75 rounded-full px-6 py-3.5 text-[0.875rem] font-medium hover:text-white hover:border-white/50 transition-colors"
        >
          Book a Free Consultation
        </a>
      </div>
      <p className="text-white/40 text-[0.85rem] max-w-[440px]">
        No complicated process. No unnecessary technology. Just a conversation about your business and what you want to improve.
      </p>
    </section>
  );
}
