export default function WorkflowDemo() {
  return (
    <div className="space-y-3">
      <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>
        Event Trigger: Inbound Lead Webhook Received
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl text-xs" style={{ background: "rgba(15,23,42,1)", border: "1px solid rgba(51,65,85,0.8)" }}>
          <div className="text-[10px]" style={{ color: "#94a3b8" }}>INBOUND WEBHOOK</div>
          <div className="font-bold mt-1" style={{ color: "#ffffff" }}>Form Submit</div>
        </div>
        <div className="p-2.5 rounded-xl text-xs" style={{ background: "rgba(23,37,84,0.6)", border: "1px solid rgba(59,130,246,0.4)" }}>
          <div className="text-[10px]" style={{ color: "#60a5fa" }}>AI NODE</div>
          <div className="font-bold mt-1" style={{ color: "#93c5fd" }}>Parse JSON &amp; Intent</div>
        </div>
        <div className="p-2.5 rounded-xl text-xs" style={{ background: "rgba(15,23,42,1)", border: "1px solid rgba(51,65,85,0.8)" }}>
          <div className="text-[10px]" style={{ color: "#94a3b8" }}>SYNC PIPELINE</div>
          <div className="font-bold mt-1" style={{ color: "#22d3ee" }}>HubSpot &amp; Slack</div>
        </div>
      </div>

      <div
        className="p-3 rounded-lg font-mono text-[11px]"
        style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.8)", color: "#cbd5e1" }}
      >
        <div>{"{"}</div>
        <div className="pl-4" style={{ color: "#22d3ee" }}>&quot;status&quot;: &quot;success&quot;,</div>
        <div className="pl-4" style={{ color: "#34d399" }}>&quot;latency_ms&quot;: 142,</div>
        <div className="pl-4" style={{ color: "#fbbf24" }}>
          &quot;actions_triggered&quot;: [&quot;slack_notify&quot;, &quot;crm_deal_create&quot;]
        </div>
        <div>{"}"}</div>
      </div>
    </div>
  );
}
