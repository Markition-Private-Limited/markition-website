import { problems } from "../_data/site";

export function ProblemSection() {
  return (
    <section className="tp-section-shell tp-section-block" id="problem">
      <div className="tp-section-heading">
        <p className="tp-eyebrow">The Business Problem</p>
        <h2>Your Business Has Outgrown Its Systems</h2>
        <p>
          Growth often creates a technology problem before it creates a technology opportunity. What started with a spreadsheet becomes five. What started as one tool becomes ten. Teams start working around systems instead of systems working for teams.
        </p>
      </div>

      <div className="tp-service-grid">
        {problems.map(({ icon: Icon, title, description }) => (
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
        The problem isn&apos;t that you need more software. The problem is that your software needs to work together.
      </p>
    </section>
  );
}
