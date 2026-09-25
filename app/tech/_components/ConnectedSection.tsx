import { connectedBenefits, connectedNodes } from "../_data/site";

export function ConnectedSection() {
  return (
    <section className="tp-section-shell tp-section-block tp-connected-section" id="connected">
      <div className="tp-section-heading">
        <p className="tp-eyebrow">Connected Technology</p>
        <h2>Your Business Shouldn&apos;t Run on Isolated Systems</h2>
        <p>
          Markition Tech connects the systems behind your business so information can move where it needs to go, teams can work from better data, and customers can experience a more connected digital journey.
        </p>
      </div>

      <div className="tp-connected-diagram">
        <div className="tp-connected-hub">
          <span>Markition</span>
        </div>
        <div className="tp-connected-nodes">
          {connectedNodes.map((node) => (
            <div className="tp-connected-node" key={node}>
              {node}
            </div>
          ))}
        </div>
      </div>

      <div className="tp-outcome-grid">
        {connectedBenefits.map((benefit) => (
          <div className="tp-outcome-tag" key={benefit}>
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <p className="tp-section-callout">
        We Don&apos;t Just Build Systems. We Connect Them.
      </p>
    </section>
  );
}
