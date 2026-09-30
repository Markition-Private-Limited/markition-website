export function AboutSection() {
  const stats = [
    { label: "Projects Delivered", value: "50+", accent: true },
    { label: "Happy Clients", value: "30+", accent: true },
    { label: "Years Active", value: "3+", accent: true },
    { label: "Clients Satisfaction", value: "98%", accent: true },
  ];

  return (
    <section className="w-full overflow-hidden bg-transparent px-4 py-14 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-10 lg:py-28 xl:px-12 xl:py-32" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-[#080b3f]/10 bg-white shadow-xl shadow-[#080b3f]/[0.02] px-5 py-9 sm:rounded-3xl sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-14 lg:py-16 xl:px-20 xl:py-20">
        <div className="relative z-10">
          <div className="grid grid-cols-1 gap-7 sm:gap-9 md:gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div className="lg:col-span-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#062283] sm:mb-4 sm:text-[11px] sm:tracking-[0.28em]">
                About Markition Tech
              </p>
              <h2 className="max-w-xl text-[30px] font-black leading-[1.08] tracking-[-1.2px] text-[#080b3f] sm:text-[36px] sm:tracking-[-1.5px] md:text-[44px] lg:text-[50px] xl:text-[56px]">
                We Build Technology Around Your Business
              </h2>
            </div>
            <div className="flex flex-col items-start lg:col-span-6 lg:pt-2 xl:pt-3">
              <p className="max-w-xl text-[13px] leading-6 text-gray-500 sm:text-sm md:text-[16px] md:leading-7">
                We build custom websites, CRM dashboards, and ERP systems on React, Next.js, WordPress, and Shopify — engineered for speed, growth, and scale.
              </p>
              <a
                href="/about"
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#080b3f] px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#062283] sm:mt-6 sm:px-6 sm:py-3 sm:text-sm"
              >
                Learn More About Markition
              </a>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#080b3f]/15 to-transparent sm:my-10 md:my-12" />

          <p className="mb-7 max-w-4xl text-[16px] font-medium leading-7 text-[#080b3f]/80 sm:mb-8 sm:text-[19px] sm:leading-8 md:text-[22px] md:leading-9 lg:text-[25px]">
            From business idea to enterprise system - we design, build, integrate, and scale technology that works for you.
          </p>

          <div className="grid grid-cols-2 gap-y-7 sm:gap-y-9 md:grid-cols-4 md:gap-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group cursor-pointer flex flex-col justify-between px-3 sm:px-4 md:px-5 lg:px-8 first:pl-0 md:first:pl-0 last:pr-0 md:last:pr-0 md:border-r md:border-[#080b3f]/10 md:last:border-r-0 max-[767px]:even:border-l max-[767px]:even:border-[#080b3f]/10 max-[767px]:px-4 max-[767px]:py-2"
              >
                <div>
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500 transition-colors group-hover:text-[#062283] xs:text-[10px] sm:text-[11px] md:text-[12px]">
                    {stat.label}
                  </p>
                  <div className="whitespace-nowrap text-[30px] font-black leading-none tracking-[-1.5px] text-[#080b3f] transition-transform duration-200 group-hover:scale-[1.03] xs:text-[34px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[58px]">
                    <span>{stat.value.replace(/[+%]$/, "")}</span>
                    <span className="text-[#062283]">{stat.value.match(/[+%]$/)?.[0] ?? ""}</span>
                  </div>
                  <div className="mt-3 h-1 w-6 rounded-full bg-[#062283]/80 transition-all duration-300 group-hover:w-12 group-hover:bg-[#062283] sm:w-7 sm:group-hover:w-14" />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-xl text-sm leading-relaxed text-[#080b3f]/55">
            We take on a limited number of projects at a time so every client gets full attention.
          </p>
        </div>
      </div>
    </section>
  );
}
