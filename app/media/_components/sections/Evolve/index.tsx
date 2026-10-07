import DepthCard from "./DepthCard";

const CARDS = [
  {
    statement: "Your audience is searching.",
    caveat: "But your brand isn't always there.",
    desc: "Customers search for answers every day, but without strong SEO and a clear search presence your competitors get found first. We build the visibility that puts your brand in front of people at the moment they are ready to act.",
    image: "/media/evolve-1.jpg",
  },
  {
    statement: "Your campaigns are running.",
    caveat: "But performance isn't consistent.",
    desc: "Budget is going out, yet results rise and fall without a clear reason. We connect strategy, creative and data so every campaign is tested, optimised and tied to measurable growth.",
    image: "/media/evolve-2.jpg",
  },
  {
    statement: "You're creating content.",
    caveat: "But it's not always creating action.",
    desc: "Posts, videos and pages are being published, but attention alone doesn't pay the bills. We shape content around what your audience needs so it moves them from reading to taking the next step.",
    image: "/media/evolve-3.jpg",
  },
  {
    statement: "You're getting traffic.",
    caveat: "But too much of it stops before conversion.",
    desc: "Visitors arrive and then drop away before they enquire or buy. We find where the journey breaks and build conversion-focused experiences that turn more of your traffic into customers.",
    image: "/media/evolve-4.jpg",
  },
];

export default function Evolve() {
  return (
    <section
      className="w-full px-6 sm:px-10 pt-10 pb-16 sm:pb-20 media-gap"
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Heading */}
        <h2
          data-stagger="1"
          className="text-[#080c42] text-center mb-10 sm:mb-12"
          style={{
            fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
            fontSize: "clamp(26px, 3.6vw, 50px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          When Digital Marketing Agencies Must Evolve
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {CARDS.map((card, i) => (
            <DepthCard
              key={card.statement}
              staggerIndex={i + 2}
              image={card.image}
              statement={card.statement}
              caveat={card.caveat}
              desc={card.desc}
            />
          ))}
        </div>

        {/* Footer text */}
        <p
          className="text-[#080c42]/70 text-center max-w-[620px] mx-auto leading-[1.75]"
          style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}
        >
          Digital growth isn&apos;t about doing more marketing. It&apos;s about making every
          part of your marketing work harder together.
        </p>

      </div>
    </section>
  );
}
