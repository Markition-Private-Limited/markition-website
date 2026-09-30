import { outcomes } from "../../tech/_data/site";
import { SectionHeading } from "./SectionHeading";

export function OutcomeSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-24" id="outcomes">
      <SectionHeading
        eyebrow="The Outcome"
        title="Built for Results. Designed for Growth."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {outcomes.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3.5 border border-gray-200 rounded-xl bg-white px-6 py-5 text-[0.95rem] font-medium text-[#0d0f14]"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-[#1a3cff] shrink-0">
              <Icon size={20} />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
