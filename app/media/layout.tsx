import { Familjen_Grotesk, Instrument_Serif } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import AnimationOrchestrator from "./_components/AnimationOrchestrator";
import "./media.css";

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="media-root"
      className={`${familjen.variable} ${instrumentSerif.variable}`}
      style={{ background: "#010c28", color: "#ffffff", minHeight: "100%" }}
    >
      <AnimationOrchestrator />
      <Navbar />
      {children}
    </div>
  );
}
