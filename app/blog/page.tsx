import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BlogContent from "./_components/BlogContent";
import "./blog.css";

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
    <div style={{ background: "#ffffff" }}>
      <Navbar />
      <BlogContent />
      <Footer />
    </div>
  );
}
