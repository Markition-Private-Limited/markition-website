import { whyReasons } from "../_data/site";

export function WhySection() {
  return (
    <section className="tp-section-shell tp-section-block" id="why">
      <div className="tp-section-heading">
        <p className="tp-eyebrow">Why Markition Tech</p>
        <h2>Technology Built Around Your Business</h2>
      </div>

      <div className="tp-service-grid">
        {whyReasons.map(({ icon: Icon, title, description }) => (
          <article className="tp-service-card" key={title}>
            <div className="tp-icon-tile">
              <Icon size={22} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <p className="tp-section-callout">
        We&apos;re not here to build technology and walk away. We&apos;re here to build technology your business can grow with.
      </p>
    </section>
  );
}
