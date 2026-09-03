export default function VoiceAIDemo() {
  return (
    <div className="space-y-4 text-center py-2">
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono"
        style={{ background: "rgba(8,51,68,0.8)", color: "#22d3ee", border: "1px solid rgba(21,94,117,0.8)" }}
      >
        🎙️{" "}
        <span className="animate-pulse">Voice Synthesis Active (Latency: 380ms)</span>
      </div>

      <div className="flex items-center justify-center gap-1" style={{ height: "56px" }}>
        {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70, 85, 40].map((height, idx) => (
          <div
            key={idx}
            className="w-1.5 rounded-full animate-pulse"
            style={{
              height: `${height}%`,
              background: "linear-gradient(to top, #2563eb, #22d3ee)",
              animationDelay: `${idx * 80}ms`,
            }}
          />
        ))}
      </div>

      <div
        className="p-3 rounded-xl text-xs"
        style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.8)", color: "#cbd5e1" }}
      >
        &ldquo;Hello, this is Markition Voice AI calling regarding your recent growth audit request.
        May I confirm a time for our lead strategy call tomorrow?&rdquo;
      </div>
    </div>
  );
}
