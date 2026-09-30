import { LucideIcon } from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map(({ icon: Icon, title, description }) => (
        <article
          key={title}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-[#1a3cff] mb-4">
            <Icon size={22} />
          </div>
          <h3 className="text-[#0d0f14] font-semibold text-[1.05rem] mb-2">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </article>
      ))}
    </div>
  );
}
