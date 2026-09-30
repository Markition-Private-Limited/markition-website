interface Props {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}

export function SectionHeading({ eyebrow, title, body, align = "center" }: Props) {
  const centered = align === "center";
  return (
    <div className={`mb-14 max-w-[680px] ${centered ? "mx-auto text-center" : "text-left"}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a3cff] mb-4">
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold leading-[1.2] tracking-[-0.015em] text-[#0d0f14] mb-4">
        {title}
      </h2>
      {body && <p className="text-gray-500 text-[1.05rem] mt-3">{body}</p>}
    </div>
  );
}
