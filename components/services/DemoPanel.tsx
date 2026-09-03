import { IconActivity } from "@/lib/icons";
import AgentDemo from "./demos/AgentDemo";
import ChatbotDemo from "./demos/ChatbotDemo";
import WorkflowDemo from "./demos/WorkflowDemo";
import VoiceAIDemo from "./demos/VoiceAIDemo";
import CRMDemo from "./demos/CRMDemo";
import WhatsAppDemo from "./demos/WhatsAppDemo";
import type { Service } from "@/lib/types";

interface Props {
  svc: Service;
}

function ModeLabel({ svc }: { svc: Service }) {
  const isWhatsApp = svc.id === "whatsapp-agent";
  return (
    <div className="flex items-center gap-2">
      {isWhatsApp ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.938-1.398A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.093 13.8c-.216.607-1.27 1.163-1.745 1.215-.445.05-.863.223-2.898-.605-2.45-1-3.994-3.506-4.115-3.668-.12-.163-.98-1.305-.98-2.49 0-1.183.62-1.763.84-2.003.22-.24.48-.3.64-.3.16 0 .32.002.46.008.148.007.347-.056.543.413.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.245.25-.105.49.14.24.62 1.02 1.33 1.65.915.82 1.686 1.073 1.926 1.193.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.156 1.14z"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
        </svg>
      )}
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: isWhatsApp ? "#25d366" : "#60a5fa" }}
      >
        {isWhatsApp ? "WhatsApp Mode" : `${svc.label} Mode`}
      </span>
    </div>
  );
}

export default function DemoPanel({ svc }: Props) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(5, 10, 28, 0.92)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3"
        style={{ borderBottom: "1px solid rgba(51,65,85,0.6)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.8)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(245,158,11,0.8)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(16,185,129,0.8)" }} />
          <span className="ml-3 font-mono text-[10px] hidden sm:inline" style={{ color: "rgba(100,116,139,1)" }}>
            markition-ai-engine://v2.4/{svc.id}
          </span>
        </div>

        <ModeLabel svc={svc} />

        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono"
          style={{ background: "rgba(6,78,59,0.4)", color: "#34d399", border: "1px solid rgba(6,78,59,0.8)" }}
        >
          <IconActivity className="animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Demo body */}
      <div className="p-4 sm:p-6" style={{ minHeight: "280px" }}>
        {svc.id === "ai-agents"          && <AgentDemo serviceId={svc.id} />}
        {svc.id === "ai-chatbots"         && <ChatbotDemo />}
        {svc.id === "workflow-automation" && <WorkflowDemo />}
        {svc.id === "voice-ai"            && <VoiceAIDemo />}
        {svc.id === "crm-automation"      && <CRMDemo />}
        {svc.id === "whatsapp-agent"      && <WhatsAppDemo />}
      </div>

      {/* CTA */}
      <div
        className="px-4 sm:px-6 py-4"
        style={{ borderTop: "1px solid rgba(51,65,85,0.4)" }}
      >
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold py-2.5 px-6 rounded-lg text-white transition-opacity hover:opacity-90 active:opacity-80"
          style={{ background: "#0137D7" }}
        >
          {svc.cta} →
        </button>
      </div>
    </div>
  );
}
