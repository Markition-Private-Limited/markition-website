import { ArrowUpRight } from "lucide-react";

const services = [
  {
    code: "FO-01",
    title: "Custom Websites",
    desc: "Fast, modern websites built on React and Next.js, engineered for speed, SEO, and conversion.",
    href: "/web-development",
  },
  {
    code: "FO-02",
    title: "CRM Development",
    desc: "Custom CRM dashboards that organize your leads, track every deal, and close sales faster.",
    href: "/custom-software-development",
  },
  {
    code: "FO-03",
    title: "ERP Systems",
    desc: "ERP software that connects inventory, operations, and finance into one clear, reliable system.",
    href: "/custom-software-development",
  },
  {
    code: "FO-05",
    title: "WordPress Development",
    desc: "Flexible, easy-to-manage WordPress websites built for content teams who update often.",
    href: "/web-development",
  },
  {
    code: "FO-06",
    title: "Shopify Development",
    desc: "Custom Shopify stores designed to convert browsers into buyers, built to scale with you.",
    href: "/web-development",
  },
];

const featured = {
  code: "FO-04",
  title: "Custom Software Development",
  desc: "Tailored software and API integrations built to solve problems off-the-shelf tools simply can't.",
  href: "/custom-software-development",
};

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-transparent px-4 py-12 md:py-16"
      style={{
        backgroundImage:
          "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    >
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
        </div>

        {/* Top row: 3 stacked cards + 1 featured */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: first 3 regular cards */}
          <div className="grid gap-4">
            {services.slice(0, 3).map((svc) => (
              <a
                key={svc.code}
                href={svc.href}
                className="group relative block min-h-[170px] overflow-hidden rounded-lg bg-white p-5"
              >
                <div className="absolute right-5 top-5 h-7 w-7 origin-center scale-0 rounded-full bg-[#062283] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[40]" />
                <div className="relative z-10 flex items-start justify-between">
                  <div className="font-mono text-[26px] tracking-[-1px] text-gray-600 transition-colors delay-200 duration-500 group-hover:text-white">
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

          {/* Right: featured card */}
          <a
            href={featured.href}
            className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[10px] bg-[#080b3f] p-6 text-white ring-1 ring-white/0 transition-all duration-500 hover:shadow-[0_0_40px_rgba(196,99,74,0.25)] hover:ring-white/10 md:p-10 lg:min-h-full"
          >
            {/* Globe dot pattern */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full items-end justify-center overflow-hidden">
              <div className="relative aspect-[2/1] w-[140%] max-w-none translate-y-[22%]">
                <div
                  className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 rounded-t-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(148, 163, 184, 0.45) 1.25px, transparent 1.35px)",
                    backgroundSize: "10px 10px",
                    maskImage:
                      "radial-gradient(at center bottom, black 0%, black 42%, transparent 76%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 rounded-t-full"
                  style={{
                    background:
                      "linear-gradient(to top, transparent 0%, rgba(18,18,18,0.1) 45%, rgba(18,18,18,0.88) 100%)",
                  }}
                />
              </div>
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="font-mono text-[36px] tracking-[-1px] text-gray-300 transition-colors delay-200 duration-500 group-hover:text-white">
                  {featured.code}
                </p>
                <h3 className="mt-8 max-w-sm text-[42px] font-black leading-[0.95] tracking-[-2px] transition-colors duration-500 group-hover:text-[#062283]">
                  {featured.title}
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
                  {featured.desc}
                </p>
              </div>
              <div className="flex size-8 items-center justify-center rounded-sm bg-white/10 text-white transition-all duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </a>
        </div>

        {/* Bottom row: WordPress + Shopify */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.slice(3).map((svc) => (
            <a
              key={svc.code}
              href={svc.href}
              className="group relative block min-h-[170px] overflow-hidden rounded-lg bg-white p-5"
            >
              <div className="absolute right-5 top-5 h-7 w-7 origin-center scale-0 rounded-full bg-[#062283] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[40]" />
              <div className="relative z-10 flex items-start justify-between">
                <div className="font-mono text-[26px] tracking-[-1px] text-gray-600 transition-colors delay-200 duration-500 group-hover:text-white">
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
      </div>
    </section>
  );
}
