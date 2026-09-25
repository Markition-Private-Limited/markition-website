import { services } from "../_data/site";

export function Services() {
  return (
    <section className="tp-section-shell tp-section-block" id="services">
      <div className="tp-section-heading">
        <p className="tp-eyebrow">What We Build</p>
        <h2>Software for the Way You Work</h2>
        <p>
          We don&apos;t force your business into an off-the-shelf workflow. We build technology around your processes, your people, your customers, and your goals.
        </p>
      </div>

      <div className="tp-service-grid">
        {services.map(({ icon: Icon, title, description }) => (
          <article className="tp-service-card" key={title}>
            <div className="tp-icon-tile">
              <Icon size={22} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
