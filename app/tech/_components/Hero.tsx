import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { featuredMetrics, stats } from "../_data/site";

export function Hero() {
  return (
    <section className="tp-hero-section" id="top">
      <div className="tp-hero-grid tp-section-shell">
        <div className="tp-hero-copy">
          <p className="tp-eyebrow">Technology / Digital Infrastructure</p>
          <h1>We Build Technology Around Your Business</h1>
          <p className="tp-hero-lede">
            Your business isn&apos;t built like everyone else&apos;s. Your technology shouldn&apos;t be either. Markition Tech designs and develops custom software, business systems, web platforms, mobile applications, and integrations around the way your business actually works — helping you automate operations, connect your systems, and scale with confidence.
          </p>
          <div className="tp-hero-actions">
            <a className="tp-primary-action tp-large" href="#contact">
              Start a Project
              <ArrowUpRight size={18} />
            </a>
            <a className="tp-secondary-action" href="#services">
              <ArrowRight size={16} />
              Explore Our Solutions
            </a>
          </div>
          <div className="tp-stat-row" aria-label="Markition delivery model">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tp-hero-visual" aria-label="Markition project preview">
          <div className="tp-project-window">
            <div className="tp-window-bar">
              <span />
              <span />
              <span />
            </div>
            <Image
              src="/tech/aimscholar-CvJCjHHq.png"
              alt="Project preview"
              width={900}
              height={560}
              priority
            />
          </div>
          <div className="tp-metric-stack">
            {featuredMetrics.map(({ icon: Icon, label, value }) => (
              <div className="tp-metric-card" key={label}>
                <Icon size={20} />
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="tp-hero-subline tp-section-shell">
        From business idea to enterprise system — we design, build, integrate, and scale technology that works for you.
      </p>
    </section>
  );
}
