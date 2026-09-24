const ITEMS = [
  "Graphics Design",
  "SEO",
  "Digital Marketing",
  "UI/UX Design",
  "Custom Branding",
  "Motion Design",
  "Brand Strategy",
  "Web Development",
];

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="17"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M6.53266 19L2.11055 15.8579L5.57789 11.2429L0 9.37726L1.70854 4.32042L7.23618 6.13695V0H12.7638V6.13695L18.2915 4.32042L20 9.37726L14.4221 11.2429L17.8894 15.8579L13.4673 19L10 14.385L6.53266 19Z"
        fill="black"
      />
    </svg>
  );
}

const TRACK = [...ITEMS, ...ITEMS];

export function TickerSection() {
  return (
    <div
      data-navbar-theme="light"
      className="overflow-hidden py-3 select-none"
      style={{ background: "#20D9FF" }}
    >
      <div className="dl-ticker-track flex items-center whitespace-nowrap">
        {TRACK.map((item, i) => (
          <span key={i} className="flex items-center gap-5 pr-5">
            <span className="text-[15px] font-semibold tracking-wide text-black uppercase">
              {item}
            </span>
            <StarIcon />
          </span>
        ))}
      </div>
    </div>
  );
}
