import { Code, Server, Smartphone, Cloud } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    name: "Frontend",
    desc: "Modern interfaces built with clean design systems, smooth interactions and responsive layouts.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "Vue.js"],
    count: "5+",
    bg: "rgb(227, 243, 238)",
    icon: Code,
  },
  {
    name: "Backend",
    desc: "Secure, scalable APIs and server systems designed for speed, reliability and growth.",
    techs: ["Java", "Spring Boot", "Spring", "Node.js", "RESTful"],
    count: "7+",
    bg: "rgb(238, 241, 248)",
    icon: Server,
  },
  {
    name: "Mobile",
    desc: "High-quality mobile apps with smooth performance across Android and iOS platforms.",
    techs: ["React Native", "Flutter", "Swift", "Kotlin"],
    count: "4+",
    bg: "rgb(240, 238, 244)",
    icon: Smartphone,
  },
  {
    name: "Cloud & DevOps",
    desc: "Deployment, automation and cloud infrastructure for stable production-ready products.",
    techs: ["AWS", "Docker", "Kubernetes", "Vercel", "GitHub Actions"],
    count: "5+",
    bg: "rgb(238, 244, 240)",
    icon: Cloud,
  },
];

export function TechStackSection() {
  return (
    <section className="overflow-hidden bg-transparent py-12 md:py-16" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#062283]">Expertise</p>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#080b3f]">
            Technologies We Master
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            We use a modern stack to build fast, secure and scalable digital products.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="group relative overflow-hidden rounded-lg p-8 shadow-[0_12px_45px_rgba(0,0,0,0.06)] transition-all duration-500"
                style={{ backgroundColor: cat.bg }}
              >
                {/* Noise texture */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                  <Image
                    src="/assets/noise40-kJFav2vq.png"
                    alt=""
                    fill
                    className="object-cover opacity-[0.8] mix-blend-multiply"
                  />
                </div>

                <div className="relative z-10">
                  <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#080b3f]">
                    <Icon size={28} className="text-[#444] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-[#111]">{cat.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#666]">{cat.desc}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {cat.techs.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#555] shadow-sm backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 text-sm font-bold text-[#777]">{cat.count} Technologies</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
