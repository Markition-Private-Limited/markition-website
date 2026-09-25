import { processSteps } from "../_data/site";

export function Process() {
  return (
    <section className="tp-section-shell tp-section-block" id="process">
      <div className="tp-process-layout">
        <div className="tp-section-heading align-left">
          <p className="tp-eyebrow">How We Build</p>
          <h2>From Business Problem to Working Technology</h2>
          <p>
            You bring the business challenge. We turn it into working technology.
          </p>
        </div>

        <div className="tp-process-list">
          {processSteps.map(({ icon: Icon, title, description }, index) => (
            <article className="tp-process-item" key={title}>
              <div className="tp-process-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="tp-icon-tile">
                <Icon size={22} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
