import type { Metadata } from "next";
import PortedPage from "../_components/PortedPage";
import GoogleAdsEnhancements from "./_components/GoogleAdsEnhancements";
import { html, title, description } from "./content";
import "./page.css";

export const metadata: Metadata = {
  title: `${title.replace(/^Markition\s+—\s+/, "")} | Markition Media`,
  description,
};

export default function Page() {
  return (
    <>
      <PortedPage html={html} scope="gads-page" family="a" />
      {/* Mounts real React components (budget simulator, Quality Score dial,
          capability showcase, process stepper) into the placeholder divs left
          in content.ts — see _components/GoogleAdsEnhancements.tsx */}
      <GoogleAdsEnhancements />
    </>
  );
}
