import Image from "next/image";
import { footerIndustries, footerServices } from "../_data/site";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
  { label: "Free Consultation", href: "#contact" }
];

export function TechFooter() {
  return (
    <footer className="tp-site-footer">
      <div className="tp-section-shell tp-footer-inner">
        <div className="tp-footer-brand">
          <a className="tp-brand-mark" href="#top" aria-label="Markition home">
            <Image src="/markition-logo.svg" alt="Markition" width={110} height={26} style={{ opacity: 0.85 }} />
          </a>
          <p className="tp-footer-tagline">The Technology Behind Your Business</p>
          <p className="tp-footer-desc">
            We design and build custom software, business systems, web platforms, mobile applications, integrations, and digital solutions that help businesses operate smarter and scale with confidence.
          </p>
        </div>

        <div className="tp-footer-columns">
          <div className="tp-footer-col">
            <h4>Services</h4>
            <ul>
              {footerServices.map((s) => (
                <li key={s}>
                  <a href="#services">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="tp-footer-col">
            <h4>Industries</h4>
            <ul>
              {footerIndustries.map((ind) => (
                <li key={ind}>
                  <a href="#industries">{ind}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="tp-footer-col">
            <h4>Company</h4>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tp-footer-bottom">
          <p>© {new Date().getFullYear()} Markition Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
