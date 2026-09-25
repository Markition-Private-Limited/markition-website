import { outcomes } from "../_data/site";

export function OutcomeSection() {
  return (
    <section className="tp-section-shell tp-section-block" id="outcomes">
      <div className="tp-section-heading">
        <p className="tp-eyebrow">The Outcome</p>
        <h2>Built for Results. Designed for Growth.</h2>
      </div>

      <div className="tp-outcome-grid tp-large">
        {outcomes.map(({ icon: Icon, label }) => (
          <div className="tp-outcome-card" key={label}>
            <div className="tp-icon-tile">
              <Icon size={22} />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
