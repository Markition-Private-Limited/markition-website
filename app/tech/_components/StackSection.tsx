import { techCategories } from "../_data/site";

export function StackSection() {
  return (
    <section className="tp-section-shell tp-section-block" id="stack">
      <div className="tp-section-heading">
        <p className="tp-eyebrow">The Stack</p>
        <h2>The Technology Behind the Technology</h2>
        <p>
          The right technology depends on the problem we&apos;re solving. We select modern, reliable technologies based on your product requirements, performance needs, scalability goals, integrations, and long-term roadmap.
        </p>
      </div>

      <div className="tp-industry-grid">
        {techCategories.map((category) => (
          <div className="tp-industry-tag" key={category}>
            {category}
          </div>
        ))}
      </div>

      <p className="tp-section-callout">
        Technology should serve your business — not the other way around.
      </p>
    </section>
  );
}
