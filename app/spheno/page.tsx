import type { Metadata } from "next";
import SphenoApp from "./_components/SphenoApp";

export const metadata: Metadata = {
  title: "Spheno AI — Connected AI Business System | Markition",
  description:
    "Markition's central AI business system bringing together Spheno Chat, Spheno Voice, Spheno CRM, and Spheno WhatsApp AI to automate conversations, qualify leads, and book appointments.",
  alternates: {
    canonical: "https://markition.com/spheno",
  },
  openGraph: {
    title: "Spheno AI — Connected AI Business System",
    description:
      "Markition's central AI business system bringing together Spheno Chat, Spheno Voice, Spheno CRM, and Spheno WhatsApp AI to automate conversations, qualify leads, and book appointments.",
    url: "https://markition.com/spheno",
    siteName: "Markition Spheno AI",
  },
};

export default function SphenoPage() {
  return <SphenoApp />;
}
