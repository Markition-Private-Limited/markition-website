import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="tp-section-shell tp-cta-band" id="contact">
      <div>
        <p className="tp-eyebrow">Let&apos;s Build What&apos;s Next</p>
        <h2>Let&apos;s Build Your Next System</h2>
        <p>
          Something in your business isn&apos;t working the way it should? Maybe you&apos;re relying on spreadsheets. Maybe your systems don&apos;t communicate. Maybe your team is spending hours on processes that should be automated. Maybe you have an idea for a platform, application, or business system but don&apos;t know where to start.
        </p>
        <p className="tp-cta-subline">
          Tell us what&apos;s not working. We&apos;ll show you what can be built.
        </p>
      </div>
      <div className="tp-cta-actions">
        <a className="tp-primary-action tp-large tp-light" href="mailto:info.markition@gmail.com">
          Start a Project
          <ArrowRight size={18} />
        </a>
        <a className="tp-ghost-action tp-light" href="mailto:info.markition@gmail.com">
          Book a Free Consultation
        </a>
      </div>
      <p className="tp-cta-note">
        No complicated process. No unnecessary technology. Just a conversation about your business and what you want to improve.
      </p>
    </section>
  );
}
