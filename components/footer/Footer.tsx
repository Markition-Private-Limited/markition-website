import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-6 px-4 sm:px-6"
      style={{
        background: "#000028",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <Image
          src="/markition-logo.svg"
          alt="Markition"
          width={110}
          height={22}
          className="h-[22px] w-auto opacity-80"
        />
        <span className="text-white/30 text-[12px]">
          © 2025 Markition. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
