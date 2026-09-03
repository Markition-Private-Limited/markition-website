export default function CRMDemo() {
  return (
    <div className="space-y-2.5">
      <div className="text-xs font-bold mb-1" style={{ color: "#cbd5e1" }}>
        Real-Time Lead Scoring Matrix
      </div>

      {[
        { name: "Enterprise SaaS Buyer", company: "Apex Global",      score: "98/100", status: "Hot Deal",     color: "#34d399" },
        { name: "Fintech Director",       company: "Sterling Capital", score: "91/100", status: "High Intent",  color: "#22d3ee" },
        { name: "E-commerce Founder",     company: "Vertex Stores",   score: "84/100", status: "Nurture Loop", color: "#60a5fa" },
      ].map((lead, idx) => (
        <div
          key={idx}
          className="p-3 rounded-xl flex items-center justify-between text-xs"
          style={{ background: "rgba(15,23,42,1)", border: "1px solid rgba(51,65,85,0.8)" }}
        >
          <div>
            <div className="font-bold" style={{ color: "#ffffff" }}>{lead.name}</div>
            <div className="text-[11px]" style={{ color: "#64748b" }}>{lead.company}</div>
          </div>
          <div className="text-right">
            <div className="font-mono font-bold" style={{ color: lead.color }}>{lead.score}</div>
            <div className="text-[10px]" style={{ color: "#64748b" }}>{lead.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
