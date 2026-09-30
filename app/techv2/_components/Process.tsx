import { processSteps } from "../../tech/_data/site";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-24" id="process">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16">
        <SectionHeading
          align="left"
          eyebrow="How We Build"
          title="From Business Problem to Working Technology"
          body="You bring the business challenge. We turn it into working technology."
        />
        <div className="flex flex-col gap-6">
          {processSteps.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="flex items-start gap-5">
              <div className="text-[#1a3cff] font-bold text-[0.75rem] tracking-widest w-7 shrink-0 pt-1">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-[#1a3cff] shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="text-[#0d0f14] font-semibold mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
