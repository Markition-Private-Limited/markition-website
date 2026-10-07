import type { Metadata } from "next";
import PortedPage from "../_components/PortedPage";
import { html, title, description } from "./content";
import "./page.css";

export const metadata: Metadata = {
  title: `${title.replace(/^Markition\s+—\s+/, "")} | Markition Media`,
  description,
};

export default function Page() {
  return <PortedPage html={html} scope="sm-page" family="b" />;
}
