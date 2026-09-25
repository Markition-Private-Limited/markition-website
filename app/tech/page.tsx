import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Custom Software Development Company | Markition Tech",
  description: "Markition Tech is a custom software development company building websites, CRM dashboards, and ERP systems on React, Next.js, WordPress, and Shopify.",
  alternates: {
    canonical: "https://markition.com/tech",
  },
  openGraph: {
    title: "Custom Software Development Company | Markition Tech",
    description: "Markition Tech is a custom software development company building websites, CRM dashboards, and ERP systems on React, Next.js, WordPress, and Shopify.",
    url: "https://markition.com/tech",
    siteName: "Markition Tech",
  },
};

export default function TechPage() {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Navbar floats over the iframe — no background box */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Navbar />
      </div>
      <iframe
        src="/tech-embed"
        title="Markition Tech"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      />
    </div>
  );
}
