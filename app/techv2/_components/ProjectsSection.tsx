import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    href: "https://www.aimscholar.in/",
    title: "AimScholar",
    desc: "An online examination and scholarship platform with live exams, secure payments, automated results, leaderboards and rank-based scholarships.",
    bg: "#cfe2fb",
    tag: "Client Project",
    bigText: "AimSchol",
  },
  {
    href: "https://lavish-touch.vercel.app/",
    title: "Apex Auto Studio",
    desc: "A premium automotive customization website showcasing luxury car interiors, custom upholstery, ambient lighting and detailing services.",
    bg: "#f0eef4",
    tag: "Client Project",
    bigText: "Apex Aut",
    img: "/assets/lavishTouchImg-e9bNmaJV.png",
  },
  {
    href: "https://rankview.vercel.app/",
    title: "RankLocal",
    desc: "A location-based platform that helps users compare nearby shops using real user reviews, ratings, and feedback.",
    bg: "#eef1f8",
    tag: "Client Project",
    bigText: "RankLoca",
    img: "/assets/ranklocal-C46CgvsG.png",
  },
  {
    href: "https://sssee.vercel.app/",
    title: "Shree Swami Samarth Electrical",
    desc: "A professional electrical infrastructure firm delivering EHV lines, substations, HT electrical systems, solar installations and contract work.",
    bg: "#e3f3ee",
    tag: "Client Project",
    bigText: "SSSEE",
  },
];

export function ProjectsSection() {
  return (
    <section className="bg-transparent py-20 md:py-28" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#062283]">Our Work</p>
          <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#1d1d1f] sm:text-4xl md:text-5xl">
            Discover Our <br />Exceptional Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-10">
          {/* Card 1 */}
          <div className="h-[320px] sm:h-[355px] md:col-start-1 md:col-end-5">
            <a
              href={projects[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full overflow-hidden rounded-[10px] p-6 sm:p-8 md:p-10"
              style={{ backgroundColor: projects[0].bg }}
            >
              <h3 className="absolute bottom-1 left-1 select-none text-[58px] font-black uppercase leading-none tracking-[-0.08em] text-white/45 sm:text-[76px] md:text-[96px]">
                {projects[0].bigText}
              </h3>
              <div className="relative z-10 max-w-[330px]">
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border bg-[#062283]/10 text-[#062283] border-[#062283]/30">
                    {projects[0].tag}
                  </span>
                </div>
                <h3 className="text-[20px] font-black tracking-[-0.04em] text-[#1d1d1f] sm:text-[22px]">
                  {projects[0].title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-[#1d1d1f]/65 line-clamp-3">{projects[0].desc}</p>
              </div>
              <div className="absolute right-5 top-5 z-20 flex size-9 items-center justify-center rounded-full bg-[#1d1d1f] text-white transition-all duration-300 group-hover:rotate-45 sm:right-8 sm:top-8 sm:size-10">
                <ArrowUpRight size={20} />
              </div>
              <div className="absolute bottom-8 left-6 z-10 sm:bottom-10 sm:left-10">
                <p className="mb-5 text-2xl font-black tracking-[-0.05em] text-[#1d1d1f]">View project</p>
                <span className="rounded-full bg-[#1d1d1f] px-6 py-3 text-xs font-bold text-white">Visit Website</span>
              </div>
            </a>
          </div>

          {/* Card 2 */}
          <div className="h-[380px] sm:h-[355px] md:col-start-5 md:col-end-11">
            <a
              href={projects[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full overflow-hidden rounded-[10px] p-6 sm:p-8 md:p-10"
              style={{ backgroundColor: projects[1].bg }}
            >
              <h3 className="absolute bottom-1 left-1 select-none text-[58px] font-black uppercase leading-none tracking-[-0.08em] text-white/45 sm:text-[76px] md:text-[96px]">
                {projects[1].bigText}
              </h3>
              <div className="relative z-10 max-w-[330px]">
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border bg-[#062283]/10 text-[#062283] border-[#062283]/30">
                    {projects[1].tag}
                  </span>
                </div>
                <h3 className="text-[20px] font-black tracking-[-0.04em] text-[#1d1d1f] sm:text-[22px]">
                  {projects[1].title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-[#1d1d1f]/65 line-clamp-3">{projects[1].desc}</p>
              </div>
              <div className="absolute right-5 top-5 z-20 flex size-9 items-center justify-center rounded-full bg-[#1d1d1f] text-white transition-all duration-300 group-hover:rotate-45 sm:right-8 sm:top-8 sm:size-10">
                <ArrowUpRight size={20} />
              </div>
              {projects[1].img && (
                <div className="absolute bottom-0 right-4 h-[180px] w-[270px] overflow-hidden rounded-t-[14px] border-x-[5px] border-t-[5px] border-b-0 border-[#111] bg-white shadow-2xl sm:right-10 sm:h-[210px] sm:w-[360px]">
                  <Image
                    src={projects[1].img}
                    alt={projects[1].title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
            </a>
          </div>

          {/* Card 3 */}
          <div className="h-[500px] sm:h-[535px] md:col-start-1 md:col-end-6">
            <a
              href={projects[2].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full overflow-hidden rounded-[10px] p-6 sm:p-8 md:p-10"
              style={{ backgroundColor: projects[2].bg }}
            >
              <h3 className="absolute bottom-1 left-1 select-none text-[58px] font-black uppercase leading-none tracking-[-0.08em] text-white/45 sm:text-[76px] md:text-[96px]">
                {projects[2].bigText}
              </h3>
              <div className="relative z-10 max-w-[330px]">
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border bg-[#062283]/10 text-[#062283] border-[#062283]/30">
                    {projects[2].tag}
                  </span>
                </div>
                <h3 className="text-[20px] font-black tracking-[-0.04em] text-[#1d1d1f] sm:text-[22px]">
                  {projects[2].title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-[#1d1d1f]/65 line-clamp-3">{projects[2].desc}</p>
              </div>
              <div className="absolute right-5 top-5 z-20 flex size-9 items-center justify-center rounded-full bg-[#1d1d1f] text-white transition-all duration-300 group-hover:rotate-45 sm:right-8 sm:top-8 sm:size-10">
                <ArrowUpRight size={20} />
              </div>
              {projects[2].img && (
                <div className="absolute bottom-0 right-0 left-0 h-[260px] overflow-hidden">
                  <Image
                    src={projects[2].img}
                    alt={projects[2].title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
            </a>
          </div>

          {/* Card 4 */}
          <div className="h-[500px] sm:h-[535px] md:col-start-6 md:col-end-11">
            <a
              href={projects[3].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full overflow-hidden rounded-[10px] p-6 sm:p-8 md:p-10"
              style={{ backgroundColor: projects[3].bg }}
            >
              <h3 className="absolute bottom-1 left-1 select-none text-[58px] font-black uppercase leading-none tracking-[-0.08em] text-white/45 sm:text-[76px] md:text-[96px]">
                {projects[3].bigText}
              </h3>
              <div className="relative z-10 max-w-[330px]">
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border bg-[#062283]/10 text-[#062283] border-[#062283]/30">
                    {projects[3].tag}
                  </span>
                </div>
                <h3 className="text-[20px] font-black tracking-[-0.04em] text-[#1d1d1f] sm:text-[22px]">
                  {projects[3].title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-[#1d1d1f]/65 line-clamp-3">{projects[3].desc}</p>
              </div>
              <div className="absolute right-5 top-5 z-20 flex size-9 items-center justify-center rounded-full bg-[#1d1d1f] text-white transition-all duration-300 group-hover:rotate-45 sm:right-8 sm:top-8 sm:size-10">
                <ArrowUpRight size={20} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
