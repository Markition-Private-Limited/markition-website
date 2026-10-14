// Ported from a standalone design (body content only — the site's own
// Navbar and Footer replace the design's own header/footer).
export const title = "Markition — Content & Video Studio";
export const description =
  "Markition Studio — a content & video team for brands that need to say something worth watching. Scriptwriting, editing, motion graphics and short-form content, all in-house.";

export const html = `
<section class="hero">
  <div class="hero-glow one"></div>
  <div class="hero-glow two"></div>

  <div class="container">
    <div class="status-strip">
      <div class="status-strip-left">
        <span class="status-led"></span>
        <span>Markition Studio — Live</span>
      </div>
      <div class="status-strip-right">
        <span>Issue <b>N° 07</b></span>
        <span>·</span>
        <span>Est. <b>2021</b></span>
        <span>·</span>
        <span>Available <b>Worldwide</b></span>
      </div>
    </div>

    <div class="hero-title-block">
      <div class="reveal"><span class="hero-kicker">Content · Video · Motion</span></div>
      <div class="reveal" style="transition-delay:100ms">
        <h1 class="hero-headline">
          <span class="line"><span>Stories that move.</span></span>
          <span class="line"><span class="italic">Edits that land.</span></span>
        </h1>
      </div>
      <div class="reveal" style="transition-delay:200ms"><div id="cv-typer"></div></div>
    </div>

    <div class="hero-showcase">
      <div class="reveal">
        <article class="panel-statement" data-spotlight>
          <div class="panel-waves"><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <div class="panel-top">
            <span class="panel-kicker">The Studio · Issue 07</span>
            <span class="panel-live">Live edit</span>
          </div>
          <div class="panel-body">
            <h3 class="panel-headline">A working studio,<br><em>not a pipeline.</em></h3>
            <p class="panel-desc">Writers, editors and motion designers in the same room. No handoffs, no dilution — the person who reads the brief is often the person who ships the final cut.</p>
          </div>
          <div class="panel-stats">
            <div class="panel-stat"><div class="panel-stat-num">420+</div><div class="panel-stat-label">Videos<br>delivered</div></div>
            <div class="panel-stat"><div class="panel-stat-num">2.8M</div><div class="panel-stat-label">Views<br>produced</div></div>
            <div class="panel-stat"><div class="panel-stat-num">48h</div><div class="panel-stat-label">Avg.<br>turnaround</div></div>
          </div>
        </article>
      </div>

      <div class="reveal" style="transition-delay:140ms">
        <a class="panel-feature" href="#disciplines" data-spotlight>
          <div class="panel-feature-top">
            <div class="panel-feature-num">02</div>
            <div class="panel-feature-badge">Since 2021</div>
          </div>
          <div class="panel-feature-visual">
            <div class="orbit-outer"><div class="orbit-inner"></div><div class="orbit-core"></div></div>
          </div>
          <div class="panel-feature-body">
            <h3 class="panel-feature-title">Nine editors.<br>One room.</h3>
            <p class="panel-feature-desc">Strategy, scripts, cuts, colour and motion — every discipline in-house, no outsourcing.</p>
            <div class="panel-feature-cta"><span>Meet the team</span><span>↗</span></div>
          </div>
        </a>
      </div>

      <div class="reveal" style="transition-delay:260ms">
        <div class="hero-infostrip">
          <div class="info-cell"><div class="info-cell-head"><span>01 / 04</span><span class="info-cell-icon">✎</span></div><div class="info-cell-title">In-house writers</div><div class="info-cell-sub">Scripts, copy and editorial in the same team.</div></div>
          <div class="info-cell"><div class="info-cell-head"><span>02 / 04</span><span class="info-cell-icon">▶</span></div><div class="info-cell-title">Editors &amp; motion</div><div class="info-cell-sub">Cuts, colour and graphics under one roof.</div></div>
          <div class="info-cell"><div class="info-cell-head"><span>03 / 04</span><span class="info-cell-icon">⚡</span></div><div class="info-cell-title">Fast turnaround</div><div class="info-cell-sub">48h average for short-form deliverables.</div></div>
          <div class="info-cell"><div class="info-cell-head"><span>04 / 04</span><span class="info-cell-icon">◆</span></div><div class="info-cell-title">Direct line</div><div class="info-cell-sub">A real reply from a real person within 24h.</div></div>
        </div>
      </div>
    </div>
  </div>

  <div class="marquee-strip">
    <div class="marquee-track">
      <span>Scriptwriting</span><span>Video Editing</span><span>Motion Graphics</span><span>Colour Grading</span><span>Short-form Content</span><span>Long-form Edits</span><span>Ad Creative</span><span>Sound Design</span><span>Brand Films</span><span>Podcast Editing</span><span>Content Strategy</span><span>Post-production</span>
      <span>Scriptwriting</span><span>Video Editing</span><span>Motion Graphics</span><span>Colour Grading</span><span>Short-form Content</span><span>Long-form Edits</span><span>Ad Creative</span><span>Sound Design</span><span>Brand Films</span><span>Podcast Editing</span><span>Content Strategy</span><span>Post-production</span>
    </div>
  </div>
</section>

<section class="intro">
  <div class="container">
    <div class="intro-top">
      <div class="reveal">
        <div class="section-label">A working studio</div>
        <h2>Not an agency.<br>A <em>production desk.</em></h2>
      </div>
      <div class="reveal intro-body" style="transition-delay:140ms">
        <p>We are a small, senior team of writers, editors and motion designers working out of one room. The person who reads the brief is often the one who ships the final cut.</p>
        <p>Whether you need a single explainer edited for launch, or a <strong>monthly content rhythm</strong> across channels — the workflow is designed to feel like an extension of your team.</p>
      </div>
    </div>

    <div class="intro-bottom">
      <div class="desk-list">
        <div class="reveal desk-item">
          <span class="desk-num">01</span>
          <div><h4>Fewer handoffs</h4><p>Writers, editors and motion designers share one room, one brief and one thread.</p></div>
          <i aria-hidden="true">↗</i>
        </div>
        <div class="reveal desk-item" style="transition-delay:90ms">
          <span class="desk-num">02</span>
          <div><h4>Faster turnarounds</h4><p>Short-form deliverables land in about 48 hours, with revisions handled the same day.</p></div>
          <i aria-hidden="true">↗</i>
        </div>
        <div class="reveal desk-item" style="transition-delay:180ms">
          <span class="desk-num">03</span>
          <div><h4>One owner, brief to cut</h4><p>No dilution along the way — the same senior editor carries your story to the final export.</p></div>
          <i aria-hidden="true">↗</i>
        </div>
        <div class="reveal desk-chips" style="transition-delay:260ms">
          <span>Scripts</span><span>Edits</span><span>Motion</span><span>Colour</span><span>Sound</span><span>Delivery</span>
        </div>
      </div>
      <div class="reveal" style="transition-delay:140ms"><div id="cv-calculator"></div></div>
    </div>
  </div>
</section>

<section class="scrub-sec">
  <div class="container">
    <div class="reveal">
      <div class="section-label">Drag to compare</div>
      <h2 class="scrub-title">From raw footage <em>to final cut.</em></h2>
      <div id="cv-scrubber"></div>
    </div>
  </div>
</section>

<section class="disciplines" id="disciplines">
  <div class="container">
    <div class="disciplines-head">
      <div class="reveal">
        <div>
          <div class="section-label">Three disciplines, one team</div>
          <h2>Crafted work,<br><em>end to end.</em></h2>
        </div>
      </div>
      <div class="reveal" style="transition-delay:140ms">
        <p>Everything we do lives in one of three buckets. Most projects blend all three — but every piece of work starts somewhere specific. Click any discipline to see what's inside.</p>
      </div>
    </div>

    <div class="accordion">
      <div class="reveal">
        <details class="accordion-item" open>
          <summary class="accordion-trigger">
            <span class="accordion-num">01 / 03</span>
            <span class="accordion-title">Content &amp; Copy</span>
            <span class="accordion-icon">+</span>
          </summary>
          <div class="accordion-panel">
            <div class="accordion-panel-inner">
              <p>Strategy, scripts and long-form writing that give every project a clear point of view — before a single frame is shot. The words that shape the edit.</p>
              <div class="accordion-tags">
                <span class="accordion-tag">Content Strategy</span>
                <span class="accordion-tag">Scripts</span>
                <span class="accordion-tag">Blog &amp; Web Copy</span>
                <span class="accordion-tag">Email Copy</span>
                <span class="accordion-tag">Creative Direction</span>
              </div>
            </div>
          </div>
        </details>
      </div>
      <div class="reveal" style="transition-delay:80ms">
        <details class="accordion-item">
          <summary class="accordion-trigger">
            <span class="accordion-num">02 / 03</span>
            <span class="accordion-title">Editing &amp; Motion</span>
            <span class="accordion-icon">+</span>
          </summary>
          <div class="accordion-panel">
            <div class="accordion-panel-inner">
              <p>The craft of assembling. Cuts, colour, sound and motion graphics that turn raw footage into finished work. Every frame considered, every beat placed.</p>
              <div class="accordion-tags">
                <span class="accordion-tag">Video Editing</span>
                <span class="accordion-tag">Motion Graphics</span>
                <span class="accordion-tag">Colour Grading</span>
                <span class="accordion-tag">Sound Design</span>
                <span class="accordion-tag">Post-production</span>
              </div>
            </div>
          </div>
        </details>
      </div>
      <div class="reveal" style="transition-delay:160ms">
        <details class="accordion-item">
          <summary class="accordion-trigger">
            <span class="accordion-num">03 / 03</span>
            <span class="accordion-title">Short-form &amp; Ads</span>
            <span class="accordion-icon">+</span>
          </summary>
          <div class="accordion-panel">
            <div class="accordion-panel-inner">
              <p>Content built for the feed. Vertical-first edits, UGC, hooks and creative variations designed to test, iterate and scale on paid social.</p>
              <div class="accordion-tags">
                <span class="accordion-tag">Reels &amp; Shorts</span>
                <span class="accordion-tag">UGC Editing</span>
                <span class="accordion-tag">Ad Creative</span>
                <span class="accordion-tag">Thumbnails</span>
                <span class="accordion-tag">Platform Variants</span>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</section>

<section class="workflow">
  <div class="container">
    <div class="workflow-head">
      <div class="reveal"><div class="section-label">How we work</div></div>
      <div class="reveal" style="transition-delay:80ms"><h2>Brief. Cut.<br><em>Ship. Refine.</em></h2></div>
    </div>
    <div class="workflow-grid">
      <div class="reveal"><div class="workflow-step"><div class="workflow-step-num"><span>01 / 04</span><span class="workflow-step-icon">◉</span></div><h4>Brief</h4><p>Story, audience and channel — what we need to land, and why.</p></div></div>
      <div class="reveal" style="transition-delay:90ms"><div class="workflow-step"><div class="workflow-step-num"><span>02 / 04</span><span class="workflow-step-icon">✎</span></div><h4>Script</h4><p>Angle, structure, script and shot list agreed up front.</p></div></div>
      <div class="reveal" style="transition-delay:180ms"><div class="workflow-step"><div class="workflow-step-num"><span>03 / 04</span><span class="workflow-step-icon">▶</span></div><h4>Edit</h4><p>Cut, colour, sound and motion brought together.</p></div></div>
      <div class="reveal" style="transition-delay:270ms"><div class="workflow-step"><div class="workflow-step-num"><span>04 / 04</span><span class="workflow-step-icon">↻</span></div><h4>Refine</h4><p>Review, iterate, publish — tuned for every channel.</p></div></div>
    </div>
  </div>
</section>

<section class="cta" id="contact">
  <div class="container cta-grid">
    <div class="reveal">
      <div>
        <div class="cta-label">Ready when you are</div>
        <h2>Let's shape your<br><em>next story.</em></h2>
        <p>Tell us what you're trying to say and where it needs to live. We'll help you pick the right services and agree a clear next step — usually within one reply.</p>
        <div class="cta-actions">
          <a class="btn btn-primary" href="/contact"><span>Book a call <span class="arrow">↗</span></span></a>
          <a class="btn btn-outline" href="mailto:hey@markition.com"><span>Email the studio <span class="arrow">↗</span></span></a>
        </div>
      </div>
    </div>

    <div class="reveal" style="transition-delay:140ms">
      <div class="cta-side">
        <div class="cta-side-item"><small>Email the studio</small><a href="mailto:hey@markition.com">hey@markition.com ↗</a></div>
        <div class="cta-side-item"><small>More services</small><a href="/media#media-services">Explore Media ↗</a></div>
        <div class="cta-side-item"><small>Response time</small><a href="mailto:hey@markition.com">Within 24 hours ↗</a></div>
      </div>
    </div>
  </div>
</section>
`;
