import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { projectOutcomes, projects } from "../_data/site";
import { SectionHeading } from "./SectionHeading";

export function Portfolio() {
  return (
    <section className="bg-gray-50 py-24" id="work">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          eyebrow="Our Work"
          title="Technology Built to Solve Real Business Problems"
          body="We don't measure a project by how much code was written. We measure it by what the technology helped the business achieve."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  width={760}
                  height={480}
                  className="w-full h-[220px] object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <span className="text-gray-500 text-[0.75rem] uppercase tracking-[0.06em]">
                    {project.category}
                  </span>
                  <h3 className="text-[#0d0f14] font-semibold text-[1rem] mt-0.5">{project.name}</h3>
                </div>
                <a
                  href={project.href}
                  aria-label={`Visit ${project.name}`}
                  className="text-gray-400 hover:text-[#1a3cff] transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 mt-10">
          {projectOutcomes.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 border border-gray-200 text-gray-700 bg-white rounded-full px-5 py-2 text-sm font-medium"
            >
              <Icon size={16} className="text-[#1a3cff]" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
