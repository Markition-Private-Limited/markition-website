import Navbar from "@/components/navbar/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/footer/Footer";
import "./design-lab.css";

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#ffffff", color: "#111827" }}>
      <Navbar />
      {children}
      <ContactSection />
      <Footer />
    </div>
  );
}
