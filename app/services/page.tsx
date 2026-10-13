import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Contact from "@/app/media/_components/sections/Contact";
import ServicesContent from "./_components/ServicesContent";
import "./services.css";

export const metadata: Metadata = {
  title: { absolute: "Our Services | Markition" },
  description:
    "Explore Markition's digital marketing, software, design, AI automation and business technology services.",
  alternates: { canonical: "https://markition.com/services" },
  openGraph: {
    title: "Our Services | Markition",
    description:
      "Explore Markition's digital marketing, software, design, AI automation and business technology services.",
    url: "https://markition.com/services",
    siteName: "Markition",
  },
};

export default function ServicesPage() {
  return (
    <div style={{ background: "#080c42" }}>
      <Navbar />
      <ServicesContent />
      <Contact />
      <Footer />
    </div>
  );
}
