import Link from "next/link";

const BLUE = "#1236E8";

export function CtaSection() {
  return (
    <section data-navbar-theme="light" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="lg:relative lg:overflow-hidden lg:rounded-[28px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/design-lab/section-3.png"
            alt="Creative collage of a designer at work"
            className="h-auto w-full rounded-[28px] object-cover lg:rounded-none"
          />

          <div className="mt-8 text-center lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:flex lg:w-[46%] lg:flex-col lg:items-start lg:justify-center lg:px-6 lg:pt-10 xl:px-10">
            <div className="lg:w-full lg:max-w-[300px]">
            <h2
              className="font-extrabold"
              style={{
                fontSize: "clamp(22px, 1.9vw, 28px)",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                color: "#0d0d17",
                fontFamily: "var(--font-jakarta, sans-serif)",
              }}
            >
              Have an <span style={{ color: BLUE }}>Idea</span>? Let&apos;s
              <br />
              Make It <span style={{ color: BLUE }}>Remarkable</span>.
            </h2>
            <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-[#0d0d17]">
              From brand identity to websites, product interfaces, and creative content, we turn ideas into impactful experiences.
            </p>
            <Link
              href="/design-lab/contact"
              className="mt-5 inline-flex items-center gap-2 self-center rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: BLUE }}
            >
              Book a Free Consultation
              <span aria-hidden="true">→</span>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
