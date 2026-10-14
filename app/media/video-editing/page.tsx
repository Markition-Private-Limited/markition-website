import type { Metadata } from "next";
import PortedPage from "../_components/PortedPage";
import VideoEditingEnhancements from "./_components/VideoEditingEnhancements";
import { html, title, description } from "./content";
import "./page.css";
import "./enhance.css";

export const metadata: Metadata = {
  title: `${title.replace(/^Markition\s+—\s+/, "")} | Markition Media`,
  description,
};

export default function Page() {
  return (
    <>
      <PortedPage html={html} scope="cv-page" family="a" />
      <VideoEditingEnhancements />
    </>
  );
}
