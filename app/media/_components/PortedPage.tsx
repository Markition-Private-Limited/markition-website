import { Manrope, DM_Sans } from "next/font/google";
import Footer from "@/components/footer/Footer";
import RevealObserver from "./RevealObserver";
import "./ported-polish.css";

const manrope = Manrope({ variable: "--font-ported-display", subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700", "800"] });
const dmSans = DM_Sans({ variable: "--font-ported-body", subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });

/* A page ported from a standalone HTML design: the design's own markup inside
   a scoped wrapper (its CSS is prefixed with the scope class), with the site's
   navbar (media layout) and Footer in place of the design's own.

   `family` picks the shared polish layer in ported-polish.css:
   "a" = SEO / Google Ads / Meta Ads design, "b" = Social Media design. */
export default function PortedPage({
  html,
  scope,
  family,
}: {
  html: string;
  scope: string;
  family: "a" | "b";
}) {
  return (
    <>
      <div className="pp-progress" aria-hidden="true" />
      <main
        id={`${scope}-root`}
        className={`${scope} pp pp-${family} ${manrope.variable} ${dmSans.variable}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <RevealObserver rootId={`${scope}-root`} />
      <Footer />
    </>
  );
}
