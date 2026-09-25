import Navbar from "@/components/navbar/Navbar";
import { Footer } from "./_components/layout/Footer";
import "./design-lab.css";

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#ffffff", color: "#111827" }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
