export const metadata = {
  title: "Spheno AI — Connected AI Business System | Markition",
  description: "Markition's central AI business system bringing together Spheno Chat, Spheno Voice, Spheno CRM, and Spheno WhatsApp AI to automate conversations, qualify leads, and book appointments.",
  alternates: {
    canonical: "https://markition.com/spheno",
  },
  openGraph: {
    title: "Spheno AI — Connected AI Business System",
    description: "Markition's central AI business system bringing together Spheno Chat, Spheno Voice, Spheno CRM, and Spheno WhatsApp AI to automate conversations, qualify leads, and book appointments.",
    url: "https://markition.com/spheno",
    siteName: "Markition Spheno AI",
  },
};

export default function SphenoPage() {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="/spheno-embed"
        title="Spheno AI"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      />
    </div>
  );
}
