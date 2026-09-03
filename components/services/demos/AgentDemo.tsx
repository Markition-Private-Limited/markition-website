import { IconActivity } from "@/lib/icons";

export default function AgentDemo({ serviceId }: { serviceId: string }) {
  return (
    <div className="space-y-2">
      {/* Agent Goal row */}
      <div
        className="flex items-start gap-3 p-3 rounded-xl"
        style={{ background: "rgba(15,25,70,0.55)", border: "1px solid rgba(80,130,255,0.18)" }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "rgba(30,60,180,0.4)", border: "1px solid rgba(80,130,255,0.35)" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[9px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#60a5fa" }}>Agent Goal</div>
          <div className="text-[11px] leading-snug" style={{ color: "rgba(203,213,225,0.9)" }}>
            Analyze inbound enterprise lead &amp; formulate personalized response strategy
          </div>
        </div>
        <div className="flex-shrink-0 text-right ml-2 pt-0.5">
          <div className="text-[9px] mb-1" style={{ color: "rgba(100,116,139,1)" }}>Status</div>
          <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: "#34d399" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
            In Progress
          </div>
        </div>
      </div>

      {/* Steps */}
      {([
        { step: "Step 1", title: "RAG Knowledge Base Query",                  desc: "Searching relevant information from knowledge base",   status: "completed",  time: "12ms"  },
        { step: "Step 2", title: "CRM Lead Intent Scoring (Gemini 1.5 Pro)",   desc: "Analyzing lead intent and scoring potential",           status: "completed",  time: "842ms" },
        { step: "Step 3", title: "Auto-Schedule Executive Consultation Call",   desc: "Scheduling and confirming consultation call",           status: "processing", time: "1.2s"  },
        { step: "Step 4", title: "Generate Personalized Strategy & Response",   desc: "Crafting tailored response and next steps",            status: "pending",    time: null    },
      ] as const).map((item, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 p-2.5 rounded-xl"
          style={{ background: "rgba(10,18,50,0.5)", border: "1px solid rgba(51,65,85,0.5)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background: item.status === "processing" ? "rgba(8,51,68,0.7)" : "rgba(20,30,70,0.5)",
              border: `1px solid ${item.status === "completed" ? "rgba(52,211,153,0.35)" : item.status === "processing" ? "rgba(34,211,238,0.4)" : "rgba(51,65,85,0.5)"}`,
            }}
          >
            {item.status === "completed" && (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="8" fill="rgba(52,211,153,0.25)"/>
                <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {item.status === "processing" && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="animate-spin" style={{ animationDuration: "1.4s" }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeOpacity="0.4"/>
                <path d="M12 2v4" stroke="#22d3ee"/>
              </svg>
            )}
            {item.status === "pending" && (
              <span className="w-3 h-3 rounded-full border border-slate-500/60 flex-shrink-0" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "rgba(100,116,139,1)" }}>{item.step}</div>
            <div className="text-[11px] font-medium leading-snug" style={{ color: item.status === "pending" ? "rgba(100,116,139,0.8)" : "#e2e8f0" }}>{item.title}</div>
            <div className="text-[10px] mt-0.5" style={{ color: "rgba(100,116,139,0.7)" }}>{item.desc}</div>
          </div>

          <div className="flex-shrink-0 text-right ml-1 pt-0.5">
            {item.status === "completed" && (
              <>
                <div className="flex items-center gap-1 justify-end text-[11px] font-semibold" style={{ color: "#34d399" }}>
                  Completed
                </div>
                <div className="flex items-center gap-1 justify-end mt-0.5 text-[10px]" style={{ color: "rgba(100,116,139,1)" }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {item.time}
                </div>
              </>
            )}
            {item.status === "processing" && (
              <>
                <div className="flex items-center gap-1 justify-end text-[11px] font-semibold" style={{ color: "#22d3ee" }}>
                  Processing...
                </div>
                <div className="flex items-center gap-1 justify-end mt-0.5 text-[10px]" style={{ color: "rgba(100,116,139,1)" }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {item.time}
                </div>
              </>
            )}
            {item.status === "pending" && (
              <div className="text-[11px]" style={{ color: "rgba(100,116,139,0.7)" }}>Pending</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
