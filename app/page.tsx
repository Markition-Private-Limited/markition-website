import TubesCursor from "@/components/TubesCursor";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Stats from "@/components/hero/Stats";
import Ticker from "@/components/ticker/Ticker";
import TrustLine from "@/components/trust/TrustLine";
import AIServicesSection from "@/components/services/AIServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full bg-[#000028] text-white"
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
    >
      <header
        className="relative bg-[#000028]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 900px 450px at 50% -60px, rgba(1,55,215,0.18) 0%, transparent 70%)",
        }}
      >
        <TubesCursor />
        <Navbar />
        <main>
          <Hero />
          <Stats />
        </main>
      </header>

      <Ticker />
      <TrustLine />
      <AIServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
