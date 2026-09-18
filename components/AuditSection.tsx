"use client";

export default function AuditSection() {
  return (
    <section style={{ background: "#000028", padding: "60px 24px 70px" }}>

      {/* ── 1st layer: outer dark navy container ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "#000028",
          borderRadius: 20,
          padding: "40px",
          boxShadow: "0 8px 40px rgba(60,100,255,0.18), -6px 0 30px rgba(60,100,255,0.1), 6px 0 30px rgba(60,100,255,0.1)",
        }}
      >
        {/* ── 2nd layer: white inner card ── */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            padding: "30px 36px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "none",
          }}
        >

          {/* ── Two-column layout ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.82fr 1fr",
              gap: 44,
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* ── LEFT: palatinate blue photo frame ── */}
            <div
              style={{
                background: "#1D47D4",
                borderRadius: 14,
                padding: 22,
                overflow: "hidden",
              }}
            >
              {/* Photo — cropped with name overlay inside the cut */}
              <div
                style={{
                  height: 285,
                  overflow: "hidden",
                  borderRadius: 8,
                  lineHeight: 0,
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/expert-photo-audit.png"
                  alt="Shah Rukh Khan"
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    display: "block",
                  }}
                />


                {/* Name text — pinned bottom-left */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: "58%",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: 16,
                      lineHeight: 1.3,
                      letterSpacing: "-0.2px",
                      fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
                    }}
                  >
                    Shah Rukh Khan
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "rgba(255,255,255,0.82)",
                      fontSize: 12,
                      lineHeight: 1.3,
                      fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
                    }}
                  >
                    Director, Markition Pvt Ltd
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: text + button ── */}
            <div style={{ padding: "8px 0 8px 12px", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                aria-hidden="true"
                src="/markition-logo-bg.png"
                alt=""
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 260,
                  opacity: 0.85,
                  mixBlendMode: "multiply",
                  pointerEvents: "none",
                  zIndex: 0,
                  userSelect: "none",
                }}
              />
              <h2
                style={{
                  position: "relative",
                  zIndex: 1,
                  margin: "0 0 14px",
                  fontSize: "clamp(25px, 2.5vw, 33px)",
                  fontWeight: 800,
                  lineHeight: 1.22,
                  letterSpacing: "-0.5px",
                  color: "#0B1740",
                  fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
                }}
              >
                The{" "}
                <span style={{ color: "#1A6BFF" }}>Future</span>
                {" "}Of Business Growth
                <br />
                Isn&apos;t Just Digital. It&apos;s{" "}
                <span style={{ color: "#1A6BFF" }}>Intelligent.</span>
              </h2>

              <p
                style={{
                  position: "relative",
                  zIndex: 1,
                  margin: "0 0 22px",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#374151",
                  maxWidth: 480,
                  fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
                }}
              >
                AI is reshaping the way businesses operate and grow. We&apos;re here to
                turn that potential into real world impact — building smarter systems
                that automate better, engage customers, improve efficiency, and create
                measurable business growth.
              </p>

              <button
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#0B1740",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 999,
                  padding: "13px 26px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
                  letterSpacing: "0.01em",
                  transition: "background 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#1A47CC";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#0B1740";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                <span style={{ color: "#4B8EFF", fontSize: 12 }}>✦</span>
                Book A Free Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
