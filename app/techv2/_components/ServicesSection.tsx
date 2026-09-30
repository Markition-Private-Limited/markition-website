import { ArrowUpRight } from "lucide-react";

const services = [
  {
    code: "FO-01",
    title: "Web Development",
    desc: "Fast, modern websites built on React and Next.js, engineered for speed, SEO, and conversion.",
    href: "/web-development",
    featured: false,
  },
  {
    code: "FO-02",
    title: "3D Websites",
    desc: "Immersive, scroll-driven 3D web experiences that turn your brand into a story worth exploring.",
    href: "/3d-websites",
    featured: false,
  },
  {
    code: "FO-03",
    title: "AI Automation & Integration",
    desc: "Custom AI systems and automations that reduce repetitive work and improve how your business operates.",
    href: "/ai-automation",
    featured: false,
  },
  {
    code: "FO-04",
    title: "Custom Software",
    desc: "Tailored software and API integrations built to solve problems off-the-shelf tools simply can't.",
    href: "/custom-software-development",
    featured: true,
  },
];

export function ServicesSection() {
  return (
    <section className="bg-transparent px-4 py-20 md:py-28" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#062283]">
              What We Do
            </p>
            <h2 className="max-w-2xl text-[36px] font-black leading-[0.95] tracking-[-2px] text-[#080b3f] sm:text-[44px] md:text-[52px] lg:text-[56px]">
              Software Built Around Your Business
            </h2>
          </div>
          <a
            href="/services"
            className="inline-flex w-fit rounded-lg items-center gap-2 bg-[#080b3f] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#062283]"
          >
            View All Services
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.3fr]">
          {/* Left column: first 3 cards */}
          <div className="grid gap-4">
            {services.slice(0, 3).map((svc) => (
              <a
                key={svc.code}
                href={svc.href}
                className="group relative block min-h-[170px] overflow-hidden rounded-lg bg-white p-5"
              >
                <div className="absolute right-5 top-5 h-7 w-7 origin-center scale-0 rounded-full bg-[#062283] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[40]" />
                <div className="relative z-10 flex items-start justify-between">
                  <div className="text-[26px] tracking-[-1px] text-gray-600 transition-colors delay-200 duration-500 group-hover:text-white font-mono">
                    {svc.code}
                  </div>
                  <div className="flex size-7 items-center justify-center rounded-sm bg-[#062283] text-white transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={14} className="transition-all duration-300 group-hover:h-5 group-hover:w-5" />
                  </div>
                </div>
                <h3 className="relative z-10 mt-5 text-2xl font-black leading-none text-[#080b3f] transition-colors delay-200 duration-500 group-hover:text-white">
                  {svc.title}
                </h3>
                <p className="relative z-10 mt-3 text-sm leading-5 text-gray-500 transition-colors delay-200 duration-500 group-hover:text-white/80">
                  {svc.desc}
                </p>
              </a>
            ))}
          </div>

          {/* Right column: featured card */}
          <a
            href="/custom-software-development"
            className="group relative flex flex-col justify-between min-h-[420px] overflow-hidden rounded-[10px] bg-[#080b3f] p-6 text-white ring-1 ring-white/0 transition-all duration-500 hover:ring-white/10 hover:shadow-[0_0_40px_rgba(196,99,74,0.25)] lg:min-h-full md:p-10"
          >
            {/* Globe dot pattern */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[100%] items-end justify-center overflow-hidden">
              <div className="relative aspect-[2/1] w-[140%] max-w-none translate-y-[22%]">
                <div
                  className="absolute left-1/2 bottom-0 h-full w-full -translate-x-1/2 rounded-t-full"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(148, 163, 184, 0.45) 1.25px, transparent 1.35px)",
                    backgroundSize: "10px 10px",
                    maskImage: "radial-gradient(at center bottom, black 0%, black 42%, transparent 76%)",
                  }}
                />
                <div
                  className="absolute left-1/2 bottom-0 h-full w-full -translate-x-1/2 rounded-t-full"
                  style={{
                    background: "linear-gradient(to top, transparent 0%, rgba(18, 18, 18, 0.1) 45%, rgba(18, 18, 18, 0.88) 100%)",
                  }}
                />
              </div>
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[36px] tracking-[-1px] text-gray-300 transition-colors delay-200 duration-500 group-hover:text-white font-mono">
                  FO-04
                </p>
                <h3 className="mt-8 max-w-sm text-[42px] font-black leading-[0.95] tracking-[-2px] transition-colors duration-500 group-hover:text-[#062283]">
                  Custom Software
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
                  Tailored software and API integrations built to solve problems off-the-shelf tools simply can&apos;t.
                </p>
              </div>
              <div className="flex size-8 items-center justify-center rounded-sm bg-white/10 text-white transition-all duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
