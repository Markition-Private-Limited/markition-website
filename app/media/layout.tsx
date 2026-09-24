import Navbar from "./_components/layout/Navbar";
import AnimationOrchestrator from "./_components/AnimationOrchestrator";
import "./media.css";

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="media-root" style={{ background: "#010c28", color: "#ffffff", minHeight: "100%" }}>
      <AnimationOrchestrator />
      <Navbar />
      {children}
    </div>
  );
}
