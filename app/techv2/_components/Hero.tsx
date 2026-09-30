import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { featuredMetrics, stats } from "../../tech/_data/site";

export function Hero() {
  return (
    <section className="bg-white pt-20 pb-16 overflow-hidden" id="top">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a3cff] mb-4">
              Technology / Digital Infrastructure
            </p>
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0d0f14] mb-5">
              We Build Technology Around Your Business
            </h1>
            <p className="text-gray-500 text-[1.05rem] leading-[1.7] mt-1">
              Your business isn&apos;t built like everyone else&apos;s. Your technology shouldn&apos;t be either. Markition Tech designs and develops custom software, business systems, web platforms, mobile applications, and integrations around the way your business actually works — helping you automate operations, connect your systems, and scale with confidence.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-[#1a3cff] text-white rounded-full px-7 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Start a Project
                <ArrowUpRight size={18} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-gray-700 text-[0.95rem] font-medium py-2.5 hover:text-[#0d0f14] transition-colors"
              >
                <ArrowRight size={16} />
                Explore Our Solutions
              </a>
            </div>
            <div className="flex flex-wrap gap-8 mt-10 pt-10 border-t border-gray-200">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <strong className="text-[#0d0f14] text-[1.1rem] font-bold">{stat.value}</strong>
                  <span className="text-gray-500 text-[0.8rem]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex gap-1.5 px-3.5 py-2.5 bg-white border-b border-gray-200">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
              </div>
              <Image
                src="/tech/aimscholar-CvJCjHHq.png"
                alt="Project preview"
                width={900}
                height={560}
                priority
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {featuredMetrics.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex-1 min-w-[160px] flex items-center gap-2.5 bg-[#0d0f14] text-white rounded-xl px-4 py-2.5"
                >
                  <Icon size={20} />
                  <div className="flex flex-col">
                    <span className="text-[0.75rem] text-white/60">{label}</span>
                    <strong className="text-[0.85rem] font-semibold">{value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="max-w-[1200px] mx-auto px-6 mt-10 text-gray-700 text-[1.05rem] font-medium italic">
        From business idea to enterprise system — we design, build, integrate, and scale technology that works for you.
      </p>
    </section>
  );
}
