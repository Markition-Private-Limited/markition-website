import { connectedBenefits, connectedNodes } from "../_data/site";
import { SectionHeading } from "./SectionHeading";

export function ConnectedSection() {
  return (
    <section className="bg-gray-50 py-24" id="connected">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          eyebrow="Connected Technology"
          title="Your Business Shouldn't Run on Isolated Systems"
          body="Markition Tech connects the systems behind your business so information can move where it needs to go, teams can work from better data, and customers can experience a more connected digital journey."
        />
        <div className="flex flex-col items-center gap-8 my-10">
          <div className="w-[100px] h-[100px] rounded-full bg-[#0d0f14] text-white flex items-center justify-center text-[0.9rem] font-bold tracking-[0.04em]">
            Markition
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {connectedNodes.map((node) => (
              <div
                key={node}
                className="border-2 border-[#0d0f14] text-[#0d0f14] rounded-full px-6 py-2.5 text-[0.85rem] font-bold tracking-[0.06em]"
              >
                {node}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {connectedBenefits.map((benefit) => (
            <div
              key={benefit}
              className="border border-gray-200 text-gray-700 bg-white rounded-full px-5 py-2 text-sm font-medium"
            >
              {benefit}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-700 text-[1.05rem] font-medium italic mt-12">
          We Don&apos;t Just Build Systems. We Connect Them.
        </p>
      </div>
    </section>
  );
}
