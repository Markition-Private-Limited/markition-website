"use client";

import { useState } from "react";

/* ─── Service definitions ─────────────────────────────────────────────── */
const SERVICES = [
  { id: "voice",    label: "VOICE CALLS",          color: "#2f6df6" },
  { id: "whatsapp", label: "WHATSAPP",              color: "#18d879" },
  { id: "agent",    label: "AI AGENT",              color: "#9562ff" },
  { id: "workflow", label: "WORKFLOW AUTOMATION",   color: "#ff9d32" },
  { id: "crm",      label: "CRM AUTOMATION",        color: "#ff4d79" },
  { id: "chatbot",  label: "AI CHATBOT",            color: "#155dfc" },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

/* ─── SVG Icons ───────────────────────────────────────────────────────── */
function IconPhone({ color }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={color ?? "currentColor"} strokeWidth="2" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.9z"/>
    </svg>
  );
}
function IconWhatsApp({ color }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={color ?? "currentColor"} strokeWidth="2" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L4 20l1.2-4.2A8.4 8.4 0 1 1 21 11.5z"/>
    </svg>
  );
}
function IconSpark({ color }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={color ?? "currentColor"} strokeWidth="2" aria-hidden="true">
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>
    </svg>
  );
}
function IconWorkflow({ color }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={color ?? "currentColor"} strokeWidth="2" aria-hidden="true">
      <circle cx="6" cy="6" r="3"/><circle cx="18" cy="12" r="3"/><circle cx="6" cy="18" r="3"/>
      <path d="M9 7.5 15 10.5M9 16.5l6-3"/>
    </svg>
  );
}
function IconCRM({ color }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={color ?? "currentColor"} strokeWidth="2" aria-hidden="true">
      <circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/>
      <path d="M3 20c.5-3.2 2.4-5 6-5s5.5 1.8 6 5M15 15c3-.1 5 1.5 5.5 4"/>
    </svg>
  );
}
function IconBot({ color }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={color ?? "currentColor"} strokeWidth="2" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="3"/>
      <path d="M8 12h.01M16 12h.01M9 16h6M12 3v3"/>
    </svg>
  );
}

function TabIcon({ id, color }: { id: ServiceId; color?: string }) {
  if (id === "voice")    return <IconPhone color={color} />;
  if (id === "whatsapp") return <IconWhatsApp color={color} />;
  if (id === "agent")    return <IconSpark color={color} />;
  if (id === "workflow") return <IconWorkflow color={color} />;
  if (id === "crm")      return <IconCRM color={color} />;
  return <IconBot color={color} />;
}

/* ─── Demo: Voice Calls ───────────────────────────────────────────────── */
const VOICE_BARS = [68,42,95,55,80,38,72,90,47,63,85,52,78,35,91,60,44,88,57,73,40,96,51,67,83,48,76,33,87,62,70];
const VOICE_DELAYS = [-0.42,-0.55,-0.79,-0.23,-0.61,-0.18,-0.87,-0.34,-0.70,-0.12,-0.56,-0.45,-0.91,-0.28,-0.65,-0.38,-0.82,-0.19,-0.73,-0.47,-0.60,-0.15,-0.84,-0.31,-0.68,-0.53,-0.76,-0.22,-0.89,-0.41,-0.66];

function DemoVoice() {
  const [keys] = useState(() => ["1","2","3","4","5","6","7","8","9","*","0","#"]);

  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 260px" }} className="ais-two">
      {/* Active call card */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, overflow: "hidden", padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={{ width: 58, height: 58, borderRadius: "50%", display: "grid", placeItems: "center", background: "#2f6df6", boxShadow: "0 0 28px rgba(47,109,246,.3)" }}>
              <IconPhone color="white" />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 750 }}>Active call</div>
              <div style={{ color: "#93a2ba", fontSize: 13, marginTop: 2 }}>+1 (212) 555-0119 · New York</div>
              <div style={{ color: "#93a2ba", fontSize: 13, marginTop: 7 }}>02:14 · recording</div>
            </div>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid rgba(255,255,255,.1)", borderRadius: 999, padding: "6px 9px", fontSize: 10, fontWeight: 800, color: "#b7c4d9", background: "rgba(255,255,255,.03)" }}>HD</span>
        </div>

        {/* Waveform */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 4, margin: "16px 0 16px", height: 90, padding: "0 2px" }}>
          {VOICE_BARS.map((h, i) => (
            <span key={i} suppressHydrationWarning style={{
              flex: "1 1 0", borderRadius: "8px 8px 6px 6px",
              background: "#3578ff",
              height: h + "px",
              display: "block",
              animation: `ais-wave 1.05s ease-in-out ${VOICE_DELAYS[i]}s infinite alternate`,
              // @ts-expect-error css var
              "--h": h + "px",
            } as React.CSSProperties} />
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, paddingTop: 12, borderTop: "1px solid rgba(150,180,220,.1)" }}>
          {[
            <svg key="mic" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M5 5a9.9 9.9 0 0 0 0 14M19 5a9.9 9.9 0 0 1 0 14"/></svg>,
            <svg key="grid" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="7" cy="7" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="17" cy="7" r="1"/><circle cx="7" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="17" cy="12" r="1"/></svg>,
          ].map((icon, i) => (
            <div key={i} style={{ width: 48, height: 48, borderRadius: 8, border: "1px solid rgba(255,255,255,.08)", background: "#030A28", color: "#dce5f5", display: "grid", placeItems: "center" }}>{icon}</div>
          ))}
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#f2384d", boxShadow: "0 0 18px rgba(242,56,77,.35)", display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" width="18" fill="none" stroke="white" strokeWidth="2.5"><path d="M6.6 10.8c3.4-1.7 7.4-1.7 10.8 0l1.3 3.5-3.3 1.2-1.6-2.4a10 10 0 0 0-4.2 0L8 15.5l-3.3-1.2z"/></svg>
          </div>
          {[
            <span key="pause" style={{ fontSize: 14 }}>Ⅱ</span>,
            <span key="more" style={{ fontSize: 14 }}>•••</span>,
          ].map((icon, i) => (
            <div key={i} style={{ width: 48, height: 48, borderRadius: 8, border: "1px solid rgba(255,255,255,.08)", background: "#030A28", color: "#dce5f5", display: "grid", placeItems: "center" }}>{icon}</div>
          ))}
        </div>
      </div>

      {/* Keypad */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 20, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, alignContent: "center" }}>
        {keys.map((k) => (
          <button key={k} style={{ height: 58, border: 0, borderRadius: 7, background: "#030A28", color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer", transition: ".2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#35445a"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#293547"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Demo: WhatsApp ──────────────────────────────────────────────────── */
function DemoWhatsApp() {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }} className="ais-wa">
      {/* Incoming call */}
      <div style={{ border: "1px solid rgba(24,216,121,.32)", background: "#030A28", borderRadius: 10, padding: 14, minHeight: "auto" }}>
        <div style={{ fontSize: 11, color: "#8291aa", textTransform: "uppercase", letterSpacing: "1.1px", fontWeight: 800 }}>INCOMING WHATSAPP CALL</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#16d878", display: "grid", placeItems: "center", boxShadow: "0 0 20px rgba(24,216,121,.2)", flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="20" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L4 20l1.2-4.2A8.4 8.4 0 1 1 21 11.5z"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 750 }}>Sarah · Brightline</div>
            <div style={{ color: "#93a2ba", fontSize: 12 }}>WhatsApp call · incoming</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
          <button style={{ border: 0, borderRadius: 6, padding: "8px 0", fontSize: 12, color: "#fff", fontWeight: 700, cursor: "pointer", background: "#ff3158" }}>Decline</button>
          <button style={{ border: 0, borderRadius: 6, padding: "8px 0", fontSize: 12, color: "#fff", fontWeight: 700, cursor: "pointer", background: "#12c978" }}>Accept</button>
        </div>
      </div>
      {/* Conversation */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 14, minHeight: "auto" }}>
        <div style={{ fontSize: 11, color: "#8291aa", textTransform: "uppercase", letterSpacing: "1.1px", fontWeight: 800, marginBottom: 4 }}>CONVERSATION</div>
        {[
          { out: false, text: "Hi! I got your demo email — interesting. We use a CRM right now." },
          { out: true,  text: "Awesome. Want to hop on a quick WhatsApp call to walk through it?" },
          { out: false, text: "Yeah, let's do it." },
          { out: true,  text: "Calling now." },
        ].map((m, i) => (
          <div key={i} style={{ maxWidth: "80%", padding: "11px 14px", borderRadius: 8, margin: "12px 0", fontSize: 13, lineHeight: 1.4, background: m.out ? "#17ce78" : "#343b50", marginLeft: m.out ? "auto" : 0 }}>{m.text}</div>
        ))}
        <div style={{ display: "flex", gap: 4, padding: "10px 14px", width: "max-content", background: "#343b50", borderRadius: 16 }}>
          {[0, 150, 300].map(d => (
            <span key={d} style={{ width: 5, height: 5, background: "#a8b4c7", borderRadius: "50%", display: "block", animation: `ais-typing .9s ${d}ms infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Demo: AI Agent ──────────────────────────────────────────────────── */
function DemoAgent() {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "220px 1fr" }} className="ais-agent">
      {/* Sidebar */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 14, minHeight: "auto" }}>
        <div style={{ width: 62, height: 62, borderRadius: "50%", display: "grid", placeItems: "center", background: "#8750f7", boxShadow: "0 0 35px rgba(135,80,247,.38)", animation: "ais-orb 2.2s infinite" }}>
          <IconSpark color="white" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 750, marginTop: 15 }}>Nova</div>
        <div style={{ color: "#93a2ba", fontSize: 13 }}>AI agent · always-on</div>
        <div style={{ marginTop: 30, display: "grid", gap: 15 }}>
          {[["Campaign", "Q2 Outreach"], ["Dialed today", "147"], ["Qualified", "23"]].map(([k, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#93a2ba" }}>{k}</span>
              <b style={i === 2 ? { color: "#19db80" } : {}}>{v}</b>
            </div>
          ))}
        </div>
        <div style={{ height: 7, background: "#202c43", borderRadius: 9, marginTop: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "74%", background: "#8a57f8", borderRadius: 9, animation: "ais-load 2s ease-in-out infinite alternate" }} />
        </div>
      </div>
      {/* Transcript */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 14, minHeight: "auto" }}>
        <div style={{ fontSize: 11, color: "#8291aa", textTransform: "uppercase", letterSpacing: "1.1px", fontWeight: 800, marginBottom: 8 }}>LIVE TRANSCRIPT</div>
        {[
          { right: false, text: "Hi Sarah, this is Nova from the team. Got a minute?" },
          { right: true,  text: "Sure, what is it about?" },
          { right: false, text: "Are you currently using an automated follow-up system?" },
          { right: true,  text: "We don't — that's a gap." },
        ].map((m, i) => (
          <div key={i} style={{ padding: "10px 13px", borderRadius: 7, background: m.right ? "#1e2d3d" : "#29284a", width: "fit-content", maxWidth: "78%", marginTop: 10, marginBottom: 0, marginLeft: m.right ? "auto" : 0, marginRight: m.right ? 0 : "auto", fontSize: 12, lineHeight: 1.5 }}>{m.text}</div>
        ))}
        <div style={{ padding: "10px 13px", borderRadius: 7, background: "#29284a", width: "fit-content", maxWidth: "78%", marginTop: 10, fontSize: 12, lineHeight: 1.5 }}>
          Got it. Let me hand you to a specialist.
          <span style={{ display: "inline-block", width: 2, height: 13, background: "#a477ff", verticalAlign: "-2px", animation: "ais-blink .8s infinite" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Demo: Workflow Automation ───────────────────────────────────────── */
function DemoWorkflow() {
  return (
    <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 16, minHeight: 260 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "#8291aa", textTransform: "uppercase", letterSpacing: "1.1px", fontWeight: 800 }}>WORKFLOW AUTOMATION</div>
          <div style={{ fontSize: 20, fontWeight: 750, marginTop: 6 }}>Lead follow-up workflow</div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid rgba(255,255,255,.1)", borderRadius: 999, padding: "6px 9px", fontSize: 10, fontWeight: 800, color: "#ffb260", background: "rgba(255,255,255,.03)" }}>RUNNING</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, minHeight: 180 }} className="ais-flow">
        {[
          { icon: "↯", title: "New Lead",    desc: "Website form submitted" },
          { icon: "✦", title: "AI Qualifies", desc: "Intent, fit and priority scored" },
          { icon: "→", title: "Follow-up",   desc: "CRM updated + message sent" },
        ].map((node, i) => (
          <>
            <div key={`n${i}`} style={{ width: 190, minHeight: 105, border: "1px solid rgba(91,142,241,.3)", borderRadius: 8, background: "#030A28", padding: 17, position: "relative", boxShadow: "0 10px 35px rgba(0,0,0,.18)", animation: `ais-node-float 3s ${i === 1 ? "-1s" : i === 2 ? "-2s" : "0s"} ease-in-out infinite` }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, display: "grid", placeItems: "center", background: "rgba(255,157,50,.12)", color: "#ff9d32", marginBottom: 10, fontSize: 18 }}>{node.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 750, margin: "0 0 5px" }}>{node.title}</div>
              <div style={{ fontSize: 11, color: "#8393ac", margin: 0, lineHeight: 1.45 }}>{node.desc}</div>
            </div>
            {i < 2 && (
              <div key={`c${i}`} style={{ width: 62, height: 2, background: "linear-gradient(90deg,#426dd4,#ff9d32)", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <span style={{ position: "absolute", width: 16, height: 16, borderRadius: "50%", background: "#fff", top: -7, left: -18, boxShadow: "0 0 15px #ff9d32", animation: "ais-flow 1.5s linear infinite" }} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

/* ─── Demo: CRM Automation ────────────────────────────────────────────── */
function DemoCRM() {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "260px 1fr" }} className="ais-crm">
      {/* Lead card */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 14, minHeight: "auto" }}>
        <div style={{ fontSize: 11, color: "#8291aa", textTransform: "uppercase", letterSpacing: "1.1px", fontWeight: 800 }}>NEW LEAD</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#155dfc", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>JD</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 750 }}>Jordan Davis</div>
            <div style={{ color: "#93a2ba", fontSize: 12 }}>jordan@brightline.com</div>
          </div>
        </div>
        <div style={{ marginTop: 10, display: "grid", gap: 0 }}>
          {[
            ["Lead score", "92 / 100", "#19db80"],
            ["Source",     "Website",  null],
            ["Owner",      "Sales Team", null],
            ["Next action","Call today", null],
          ].map(([k, v, c], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.06)", fontSize: 12 }}>
              <span style={{ color: "#93a2ba" }}>{k}</span>
              <b style={c ? { color: c as string } : {}}>{v}</b>
            </div>
          ))}
        </div>
      </div>
      {/* Pipeline */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 14, minHeight: "auto" }}>
        <div style={{ fontSize: 11, color: "#8291aa", textTransform: "uppercase", letterSpacing: "1.1px", fontWeight: 800 }}>CRM AUTOMATION</div>
        <div style={{ fontSize: 16, fontWeight: 750, marginTop: 4, marginBottom: 10 }}>Lead lifecycle</div>
        <div style={{ display: "grid", gap: 7 }}>
          {[
            ["Lead captured",        "Website → CRM"],
            ["Lead scored",          "AI qualification"],
            ["Sales assigned",       "Owner selected"],
            ["Follow-up scheduled",  "Next touchpoint"],
          ].map(([title, sub], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "30px 1fr auto", gap: 10, alignItems: "center", padding: "8px 10px", border: "1px solid rgba(91,142,241,.18)", borderRadius: 7, background: "#030A28", animation: `ais-step-in 4.5s ${i * 0.7}s infinite` }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", display: "grid", placeItems: "center", background: "#1c3156", color: "#76a2ff", fontSize: 10, fontWeight: 800 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{title}</div>
                <div style={{ color: "#8393ac", fontSize: 10 }}>{sub}</div>
              </div>
              <span style={{ fontSize: 9, padding: "4px 7px", borderRadius: 999, background: "rgba(24,216,121,.08)", color: "#1bdb80" }}>{i < 3 ? "Done" : "Ready"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Demo: AI Chatbot ────────────────────────────────────────────────── */
function DemoChatbot() {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "240px 1fr" }} className="ais-bot">
      {/* Profile */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 14, minHeight: "auto" }}>
        <div style={{ width: 68, height: 68, borderRadius: 10, background: "#155dfc", display: "grid", placeItems: "center", boxShadow: "0 0 35px rgba(21,93,252,.25)" }}>
          <IconBot color="white" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 750, marginTop: 16 }}>AI Assistant</div>
        <div style={{ color: "#93a2ba", fontSize: 13 }}>Website Chat · 24/7</div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "#19d980", marginTop: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#19d980", boxShadow: "0 0 10px #19d980", display: "block" }} />
          Online and responding
        </div>
        <div style={{ marginTop: 30 }}>
          <div style={{ fontSize: 11, color: "#8291aa", textTransform: "uppercase", letterSpacing: "1.1px", fontWeight: 800, marginBottom: 12 }}>CAPABILITIES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {["Answer questions", "Qualify leads", "Book meetings", "Human handoff"].map(cap => (
              <span key={cap} style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(255,255,255,.1)", borderRadius: 999, padding: "6px 9px", fontSize: 10, fontWeight: 800, color: "#b7c4d9", background: "rgba(255,255,255,.03)" }}>{cap}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Chat */}
      <div style={{ border: "1px solid rgba(100,143,210,.22)", background: "#030A28", borderRadius: 10, padding: 14, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ paddingBottom: 13, borderBottom: "1px solid rgba(150,180,220,.22)", fontWeight: 750 }}>
          Website conversation <span style={{ float: "right", color: "#93a2ba", fontSize: 13 }}>Live</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {[
            { me: true,  text: "Hi, I'm interested in your pricing." },
            { me: false, text: "Absolutely. I can help with that. What type of business are you running?" },
            { me: true,  text: "We're a growing healthcare company." },
            { me: false, text: "Perfect. I can recommend the right setup and connect you with our team." },
          ].map((m, i) => (
            <div key={i} style={{ padding: "10px 13px", borderRadius: 7, background: m.me ? "#2671ff" : "#2a3549", maxWidth: "80%", width: "fit-content", fontSize: 12, marginTop: 8, marginBottom: 0, marginLeft: m.me ? "auto" : 0, marginRight: m.me ? 0 : "auto", wordBreak: "break-word", lineHeight: 1.5, animation: "ais-msg .5s ease" }}>{m.text}</div>
          ))}
          <div style={{ marginTop: 10, padding: "11px 13px", borderRadius: 6, background: "rgba(21,93,252,.08)", border: "1px solid rgba(21,93,252,.2)", color: "#7aaaff", fontSize: 11 }}>
            ✓ Lead qualified · Sales handoff ready
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────── */
export default function AIServicesSection() {
  const [activeId, setActiveId] = useState<ServiceId>("voice");
  const active = SERVICES.find(s => s.id === activeId)!;

  // Animate state transitions
  const [key, setKey] = useState(0);
  function switchTab(id: ServiceId) {
    setActiveId(id);
    setKey(k => k + 1);
  }

  return (
    <>
      {/* Scoped styles for animations that need CSS vars / complex keyframes */}
      <style>{`
        .ais-two   { grid-template-columns: 1fr 260px; }
        .ais-wa    { grid-template-columns: 1fr 1fr; }
        .ais-agent { grid-template-columns: 220px 1fr; }
        .ais-crm   { grid-template-columns: 260px 1fr; }
        .ais-bot   { grid-template-columns: 240px 1fr; }
        @media(max-width:760px){
          .ais-two, .ais-wa, .ais-agent, .ais-crm, .ais-bot { grid-template-columns: 1fr !important; }
          .ais-flow { flex-direction: column !important; }
          .ais-connector { width: 2px !important; height: 35px !important; }
        }
        .ais-state-in { animation: ais-state-in .45s ease; }
        @keyframes ais-wave { to { height: calc(var(--h) * .55); } }
      `}</style>

      <section
        style={{
          position: "relative",
          minHeight: "auto",
          padding: "28px 20px 36px",
          overflow: "hidden",
          background: "#000028",
          fontFamily: "var(--font-inter, Inter, sans-serif)",
        }}
      >
        {/* Ambient floating circles */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {[
            { w: 92,  l: "32%", t: "8%",  d: 0  },
            { w: 62,  l: "43%", t: "28%", d: -3 },
            { w: 120, r: "8%",  b: "4%",  d: -5 },
            { w: 46,  l: "3%",  t: "15%", d: -1 },
          ].map((c, i) => (
            <span key={i} style={{
              position: "absolute",
              width: c.w, height: c.w,
              borderRadius: "50%",
              border: "1px solid rgba(77,145,255,.18)",
              filter: "blur(.2px)",
              animation: `ais-float 9s ${c.d}s ease-in-out infinite`,
              left: (c as any).l, top: (c as any).t,
              right: (c as any).r, bottom: (c as any).b,
            }} />
          ))}
        </div>

        {/* Inner content constrained to navbar width */}
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>

        {/* Eyebrow */}
        <div style={{ textAlign: "center", textTransform: "uppercase", letterSpacing: 4, fontSize: 12, fontWeight: 700, color: "#4385ff", marginBottom: 20 }}>

        </div>

        {/* Heading */}
        <h2 style={{ margin: "0 auto", textAlign: "center", maxWidth: 560, fontSize: "clamp(20px,2.8vw,32px)", lineHeight: 1.1, letterSpacing: "-1px", fontWeight: 700, fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", color: "#f7f9ff" }}>
          Put AI To Work{" "}
          <span style={{ background: "linear-gradient(90deg,#2f78ff,#12d783,#8b6cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Across Your Business
          </span>
        </h2>

        {/* Subtitle */}
        <p style={{ margin: "8px auto 18px", textAlign: "center", maxWidth: 440, color: "#9aa8bf", fontSize: 12, lineHeight: 1.6 }}>
          One platform for conversations, intelligent automation, customer relationships and AI-powered engagement.
        </p>

        {/* Tab bar */}
        <div style={{
          position: "relative", zIndex: 5,
          display: "flex", justifyContent: "center", alignItems: "center", gap: 2,
          maxWidth: 860, margin: "0 auto 12px",
          padding: 4,
          border: "1px solid rgba(150,180,220,.22)",
          borderRadius: 10,
          background: "#030A28",
          backdropFilter: "blur(16px)",
          boxShadow: "0 12px 50px rgba(0,0,0,.24)",
          overflow: "hidden",
        }}>
          {SERVICES.map(s => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => switchTab(s.id)}
                style={{
                  position: "relative", flex: "1 1 0",
                  border: 0,
                  background: isActive ? s.color : "transparent",
                  color: isActive ? "#fff" : "#8fa0bb",
                  padding: "8px 6px",
                  borderRadius: 7,
                  cursor: "pointer",
                  fontSize: 11, fontWeight: 750, letterSpacing: ".1px",
                  transition: ".3s ease",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  whiteSpace: "nowrap",
                  boxShadow: isActive ? `0 4px 18px ${s.color}55` : "none",
                }}
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.055)"; } }}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "#8fa0bb"; (e.currentTarget as HTMLElement).style.background = "transparent"; } }}
              >
                <TabIcon id={s.id} color={isActive ? "white" : "currentColor"} />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Demo window */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: 1200, minHeight: "auto",
          margin: "0 auto",
          border: `1px solid ${active.color}55`,
          borderRadius: 10,
          background: "#030A28",
          boxShadow: "0 35px 100px rgba(0,0,0,.38), inset 0 1px rgba(255,255,255,.035)",
          overflow: "hidden",
          transition: "border-color .45s ease",
        }}>
          {/* Glow behind window */}
          <div style={{
            position: "absolute", bottom: -110, left: "12%", right: "12%", height: 160,
            background: active.color, opacity: .11, filter: "blur(65px)", pointerEvents: "none",
            transition: ".5s",
          }} />

          {/* Window chrome */}
          <div style={{
            height: 40, padding: "0 16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderBottom: "1px solid rgba(150,180,220,.22)",
            position: "relative",
          }}>
            {/* Dots */}
            <div style={{ position: "absolute", left: 30, display: "flex", gap: 10 }}>
              <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#c84c68", display: "block" }} />
              <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#c89c16", display: "block" }} />
              <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#12a77a", display: "block" }} />
            </div>

            {/* Mode label */}
            <div style={{ display: "flex", alignItems: "center", gap: 9, color: active.color, fontWeight: 800, letterSpacing: "1.6px", fontSize: 14 }}>
              <TabIcon id={activeId} color={active.color} />
              {active.label} MODE
            </div>

            {/* LIVE badge */}
            <div style={{
              position: "absolute", right: 28,
              border: "1px solid rgba(24,216,121,.25)", borderRadius: 999,
              padding: "5px 10px", color: "#16d878",
              background: "rgba(24,216,121,.06)",
              fontSize: 11, fontWeight: 800,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 7, height: 7, background: "#16d878", borderRadius: "50%", boxShadow: "0 0 10px #16d878", animation: "ais-pulse-dot 1.4s infinite", display: "block" }} />
              LIVE
            </div>
          </div>

          {/* Content */}
          <div key={key} style={{ padding: 10, position: "relative" }} className="ais-state-in">
            {activeId === "voice"    && <DemoVoice />}
            {activeId === "whatsapp" && <DemoWhatsApp />}
            {activeId === "agent"    && <DemoAgent />}
            {activeId === "workflow" && <DemoWorkflow />}
            {activeId === "crm"      && <DemoCRM />}
            {activeId === "chatbot"  && <DemoChatbot />}
          </div>
        </div>
        </div>{/* end inner content wrapper */}
      </section>
    </>
  );
}
