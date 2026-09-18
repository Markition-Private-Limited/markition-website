import { SERVICES } from "@/lib/constants";

/* Small inline icons per service */
function TabIcon({ id }: { id: string }) {
  const cls = "w-3.5 h-3.5 flex-shrink-0";
  if (id === "ai-agents")
    return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/></svg>;
  if (id === "ai-chatbots")
    return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
  if (id === "workflow-automation")
    return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  if (id === "voice-ai")
    return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
  if (id === "crm-automation")
    return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
  if (id === "whatsapp-agent")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.938-1.398A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.093 13.8c-.216.607-1.27 1.163-1.745 1.215-.445.05-.863.223-2.898-.605-2.45-1-3.994-3.506-4.115-3.668-.12-.163-.98-1.305-.98-2.49 0-1.183.62-1.763.84-2.003.22-.24.48-.3.64-.3.16 0 .32.002.46.008.148.007.347-.056.543.413.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.245.25-.105.49.14.24.62 1.02 1.33 1.65.915.82 1.686 1.073 1.926 1.193.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.156 1.14z"/>
      </svg>
    );
  return null;
}

interface Props {
  active: number;
  onSelect: (i: number) => void;
}

export default function TabBar({ active, onSelect }: Props) {
  return (
    <div
      className="rounded-2xl p-1.5 overflow-x-auto"
      style={{ background: "rgba(8,14,40,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-1 min-w-max sm:min-w-0 sm:justify-between">
        {SERVICES.map((svc, i) => {
          const isActive = active === i;
          const isWhatsApp = svc.id === "whatsapp-agent";
          return (
            <button
              key={svc.id}
              onClick={() => onSelect(i)}
              className={`svc-tab flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
                isActive ? "svc-tab-active" : ""
              }`}
              style={{
                background: isActive
                  ? isWhatsApp
                    ? "linear-gradient(135deg, #17402c 0%, #2fae72 100%)"
                    : "linear-gradient(135deg, #1a3aa8 0%, #2f7bff 100%)"
                  : "transparent",
                color: isActive
                  ? isWhatsApp
                    ? "#4ade80"
                    : "#ffffff"
                  : "rgba(148,163,184,0.7)",
                border: isActive
                  ? isWhatsApp
                    ? "1px solid rgba(74,222,128,0.35)"
                    : "1px solid rgba(99,130,255,0.35)"
                  : "1px solid transparent",
                boxShadow: isActive
                  ? isWhatsApp
                    ? "0 4px 18px rgba(74,222,128,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "0 4px 18px rgba(47,123,255,0.45), inset 0 1px 0 rgba(255,255,255,0.2)"
                  : "none",
              }}
            >
              <TabIcon id={svc.id} />
              <span className="uppercase tracking-wider">{svc.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .svc-tab {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .svc-tab:hover {
          transform: translateY(-2px);
          color: rgba(226,232,255,0.9) !important;
          background: rgba(255,255,255,0.08);
        }
        .svc-tab:active {
          transform: translateY(0) scale(0.95);
        }
        .svc-tab-active {
          animation: svcTabPop 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .svc-tab-active:hover {
          transform: translateY(-2px) scale(1.02);
        }
        .svc-tab-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: svcTabShine 2.6s ease-in-out infinite;
        }
        @keyframes svcTabPop {
          0%   { transform: scale(0.9); }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes svcTabShine {
          0%   { left: -60%; }
          100% { left: 130%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-tab-active, .svc-tab-active::after { animation: none; }
        }
      `}</style>
    </div>
  );
}
