import { solutions } from "../_data/site";

export function SolutionsSection() {
  return (
    <section className="tp-section-shell tp-section-block" id="solutions">
      <div className="tp-section-heading">
        <p className="tp-eyebrow">Our Solutions</p>
        <h2>From One System to Your Entire Business</h2>
        <p>
          Technology should not create another layer of complexity. We help businesses build connected digital ecosystems — starting with one critical system and expanding as the business grows.
        </p>
      </div>

      <div className="tp-service-grid">
        {solutions.map(({ icon: Icon, title, description }) => (
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
