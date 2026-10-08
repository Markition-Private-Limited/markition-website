import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import TechRoot from "./_components/TechRoot";

const manrope = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Markition Tech",
  description:
    "Markition Tech builds CRM, ERP, web platforms and mobile apps around how your business works.",
  alternates: {
    canonical: "https://markition.com/tech",
  },
  openGraph: {
    title: "Markition Tech",
    description:
      "Markition Tech builds CRM, ERP, web platforms and mobile apps around how your business works.",
    url: "https://markition.com/tech",
    siteName: "Markition Tech",
  },
};

export default function TechPage() {
  return (
    <div className={manrope.className}>
      <TechRoot />
    </div>
  );
}
