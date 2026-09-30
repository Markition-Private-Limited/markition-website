import Image from "next/image";
import { CalendarDays, Users, FileText, Award, MousePointer, Layers } from "lucide-react";

const leftItems = [
  {
    icon: CalendarDays,
    title: "Time to Launch",
    desc: "AIMScholar was planned, designed and launched within 8 weeks.",
    stat: "8 Weeks",
  },
  {
    icon: Users,
    title: "Registered Students",
    desc: "A growing community of students preparing for competitive entrance exams.",
    stat: "1000+",
  },
  {
    icon: FileText,
    title: "Active Exams",
    desc: "Students can practice and compete through a wide range of live and upcoming mock exams.",
    stat: "50+",
  },
];

const rightItems = [
  {
    icon: Award,
    title: "Scholarship Exams",
    desc: "Competitive exams with rank-based scholarship opportunities for top-performing students.",
    stat: "25+",
  },
  {
    icon: MousePointer,
    title: "Exam Attempts",
    desc: "Thousands of mock exams attempted by students to improve their preparation and performance.",
    stat: "7000+",
  },
  {
    icon: Layers,
    title: "Tech Stack",
    desc: "Built with React, Node.js, PostgreSQL, Prisma, Express and modern web technologies.",
    stat: "Modern",
  },
];

export function CaseStudySection() {
  return (
    <section className="bg-transparent py-20 md:py-28 overflow-hidden" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#062283]">
            Featured Case Study
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#080b3f] md:text-5xl">
            Our modern results
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
            Using strategy, design and technology to build scalable digital products that deliver real business outcomes.
          </p>
        </div>

        <div className="relative mt-16 grid items-start gap-10 lg:grid-cols-[1fr_360px_1fr]">
          {/* Left column */}
          <div className="space-y-10">
            {leftItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-5 text-left lg:flex-row-reverse lg:text-right">
                  <div className="flex size-14 shrink-0 items-center rounded-lg justify-center bg-[#080b3f] text-white">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#080b3f]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{item.desc}</p>
                    <p className="mt-2 text-sm font-bold text-[#062283]">{item.stat}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center image */}
          <div className="relative mx-auto w-full max-w-[360px]">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/home/aim.png"
                alt="AimScholar case study"
                width={360}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            {rightItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-5 text-left">
                  <div className="flex size-14 shrink-0 items-center rounded-lg justify-center bg-[#080b3f] text-white">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#080b3f]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{item.desc}</p>
                    <p className="mt-2 text-sm font-bold text-[#062283]">{item.stat}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
