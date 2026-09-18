import TubesCursor from "@/components/TubesCursor";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Stats from "@/components/hero/Stats";
import Ticker from "@/components/ticker/Ticker";
import TrustLine from "@/components/trust/TrustLine";
import AIServicesSection from "@/components/services/AIServicesSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AwardsSlider from "@/components/AwardsSlider";
import Technologies from "@/components/Technologies";
import AuditSection from "@/components/AuditSection";
import ScaleWithAISection from "@/components/ScaleWithAISection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
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
          height: "100vh",
          overflow: "hidden",
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
      <ServicesSection />
      <TestimonialsSection />
      <AwardsSlider />
      <Technologies />
      <AuditSection />
      <ScaleWithAISection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
