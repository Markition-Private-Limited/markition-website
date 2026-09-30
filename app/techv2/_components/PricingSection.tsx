import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";

const plans = [
  {
    name: "Web Development",
    price: "₹9,999",
    desc: "High-performance websites designed and developed around your business, brand, and goals.",
    features: ["Business websites", "Landing pages", "Corporate websites", "Custom frontend experiences", "CMS / dynamic content", "API integrations"],
    btn: "Discuss Web Project",
    href: "/contact",
    bg: "rgb(227, 243, 238)",
    featured: false,
  },
  {
    name: "3D Websites",
    price: "₹19,999",
    desc: "Immersive, interactive websites built with 3D visuals, motion, and memorable digital experiences.",
    features: ["Interactive 3D experiences", "Product visualization", "WebGL experiences", "Advanced animations", "Scroll-based interactions", "Premium visual storytelling"],
    btn: "Discuss 3D Project",
    href: "/contact",
    bg: "linear-gradient(to bottom right, #DCE7F7, #D5E3FA, #C9DCF8)",
    featured: false,
  },
  {
    name: "Custom Software",
    price: "₹29,999",
    desc: "Custom digital products and software systems built around your workflows, users, and business requirements.",
    features: ["Custom dashboards", "Business management systems", "SaaS platforms", "Admin panels", "Backend systems", "API integrations"],
    btn: "Discuss Software Project",
    href: "/contact",
    bg: "rgb(240, 238, 244)",
    featured: true,
  },
  {
    name: "AI Automation & Integration",
    price: "₹34,999",
    desc: "Practical AI systems and automations that reduce repetitive work and improve how your business operates.",
    features: ["AI integrations", "Workflow automation", "AI-powered tools", "API integrations", "Internal automation", "Business process automation"],
    btn: "Discuss AI Project",
    href: "/contact",
    bg: "rgb(238, 244, 240)",
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section className="px-4 py-20 md:py-28 text-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Pricing plans
          </h2>
          <p className="mt-3 text-base font-medium text-gray-500 max-w-xl mx-auto">
            Choose the right plan for your needs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="group relative flex flex-col justify-between rounded-[28px] bg-white p-3.5 sm:p-4 border border-black/[0.07] shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:border-black/15"
            >
              <div>
                {/* Header */}
                <div
                  className="relative overflow-hidden rounded-[22px] p-6 sm:p-7 flex flex-col justify-between min-h-[175px] border border-black/[0.03]"
                  style={{ background: plan.bg }}
                >
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                    <Image
                      src="/assets/noise40-kJFav2vq.png"
                      alt=""
                      fill
                      className="object-cover opacity-[0.8] mix-blend-multiply"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-800 shadow-sm border border-black/5">
                      {plan.name}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">/ starting</span>
                    </div>
                  </div>
                </div>

                {/* Description + CTA */}
                <div className="px-3 pt-5 pb-2">
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed min-h-[36px] line-clamp-2">
                    {plan.desc}
                  </p>
                  <a
                    href={plan.href}
                    className="mt-4 w-full rounded-full bg-[#18181B] text-white hover:bg-black font-semibold text-xs py-3.5 px-5 shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group-hover:bg-[#18181B]"
                  >
                    <span>{plan.btn}</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

                {/* Features */}
                <div className="px-3 pt-4 pb-3">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm font-semibold text-gray-700">
                        <span className="flex items-center justify-center size-4 rounded-full text-xs shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
