export default function Hero() {
  return (
    <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="text-center max-w-3xl mx-auto pt-10 sm:pt-16 lg:pt-24 pb-8 sm:pb-14 lg:pb-20 px-2 sm:px-4">
        <h1
          className="hero-heading text-[28px] xs:text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] font-bold leading-[1.15] text-white mb-4 sm:mb-6"
          style={{
            fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            letterSpacing: "-0.025em",
          }}
        >
          Your AI Powered <span style={{ color: "#20D9FF" }}>Growth Team</span> Ready To Run Your Business
        </h1>

        <p className="hero-subtitle text-white text-[13px] sm:text-[15px] lg:text-[16px] leading-[1.7] mb-7 sm:mb-9 max-w-[600px] mx-auto">
          Finally growth that accelerates every part of your business
          forward. Your AI powered growth team brings more clients, improves
          operations, boosts revenue and keeps your business moving.
        </p>

        <div className="hero-cta flex flex-col xs:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="w-full xs:w-auto text-white text-[13px] sm:text-sm font-semibold px-6 py-2.5 sm:py-3 rounded-[6px] flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90"
            style={{ background: "#0137D7" }}
          >
            Book A Free Audit <span aria-hidden="true">→</span>
          </a>
          <a
            href="#"
            className="w-full xs:w-auto border border-white/25 hover:border-white/55 text-white text-[13px] sm:text-sm font-medium px-6 py-2.5 sm:py-3 rounded-[6px] flex items-center justify-center gap-2 transition-colors duration-200"
          >
            View Portfolio <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
