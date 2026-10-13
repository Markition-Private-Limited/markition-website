import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BlogContent from "./_components/BlogContent";
import "./blog.css";

// Same type pairing as the SEO / Google Ads inner pages.
const manrope = Manrope({ variable: "--font-jr-display", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-jr-body", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { absolute: "Markition Journal | Insights & Articles" },
  description:
    "Explore Markition insights on digital marketing, SEO, technology, design, AI and business growth.",
  alternates: { canonical: "https://markition.com/blog" },
  openGraph: {
    title: "Markition Journal | Insights & Articles",
    description:
      "Explore Markition insights on digital marketing, SEO, technology, design, AI and business growth.",
    url: "https://markition.com/blog",
    siteName: "Markition",
  },
};

export default function BlogPage() {
  return (
    <div style={{ background: "#080c42" }}>
      <Navbar />
      <BlogContent className={`${manrope.variable} ${dmSans.variable}`} />
      <Footer />
    </div>
  );
}
