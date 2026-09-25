export default function About() {
  return (
    <section
      id="about"
      className="media-gap"
      style={{
        padding: "clamp(64px,8vw,120px) clamp(24px,5vw,80px)",
        fontFamily: "var(--font-inter, Inter, sans-serif)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.8vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "clamp(20px, 2.5vw, 32px)",
            maxWidth: 780,
          }}
        >
          A Full-Service Digital Marketing Agency, Working As One System
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(16px,2.5vw,40px)",
            maxWidth: 820,
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px,1.1vw,16px)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)",
              margin: 0,
            }}
          >
            Markition Media brings strategy, creative execution and performance
            marketing together to create a clearer path from attention to action.
          </p>
          <p
            style={{
              fontSize: "clamp(14px,1.1vw,16px)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)",
              margin: 0,
            }}
          >
            From organic search and paid campaigns to social content and
            conversion-focused experiences, we connect the channels that matter
            to your customers.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #about > div > div[style] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
