'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PhoneCall, MessageSquare, MessageCircle, Database } from 'lucide-react';

type ModuleId = 'voice' | 'chat' | 'whatsapp' | 'crm';

interface EcosystemModule {
  id: ModuleId;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  num: string;
  cardTitle: string;
  cardDesc: string;
  cardFoot: string;
  kicker: string;
  title: string;
  copy: string;
  features: string[];
  metrics: [string, string][];
  accent: string;
  cta: string;
}

const MODULES: EcosystemModule[] = [
  {
    id: 'voice',
    icon: PhoneCall,
    num: '01 / 04',
    cardTitle: 'Spheno Voice',
    cardDesc: 'Natural, responsive voice conversations that answer, qualify and route every caller.',
    cardFoot: 'VOICE INTELLIGENCE',
    kicker: 'ACTIVE INTELLIGENCE / 01',
    title: 'A voice that is always there.',
    copy: 'Give every caller a natural first conversation. Spheno Voice understands intent, handles common questions, qualifies enquiries and guides customers toward the right next step.',
    features: ['Natural voice conversations', 'Intent detection & qualification', 'Intelligent call routing', 'Always-on customer availability'],
    metrics: [['380ms', 'SUB-SEC LATENCY'], ['24/7', 'AVAILABILITY']],
    accent: '#63efff',
    cta: 'Explore Spheno Voice',
  },
  {
    id: 'chat',
    icon: MessageSquare,
    num: '02 / 04',
    cardTitle: 'Spheno Chat',
    cardDesc: 'Context-aware website conversations that guide visitors and capture intent in real time.',
    cardFoot: 'WEB CONVERSATIONS',
    kicker: 'ACTIVE INTELLIGENCE / 02',
    title: 'Turn every visit into a conversation.',
    copy: 'Spheno Chat meets visitors in the moment. It understands the context of the page, answers questions, captures enquiries and moves high-intent prospects forward.',
    features: ['Context-aware answers', 'Real-time visitor assistance', 'Lead & enquiry capture', 'Conversation-to-action flows'],
    metrics: [['94.2%', 'QUALIFICATION RATE'], ['24/7', 'WEB COVERAGE']],
    accent: '#a795ff',
    cta: 'Explore Spheno Chat',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    num: '03 / 04',
    cardTitle: 'WhatsApp AI',
    cardDesc: 'Personalized replies, follow-ups and proactive engagement in the channel customers already use.',
    cardFoot: 'PROACTIVE ENGAGEMENT',
    kicker: 'ACTIVE INTELLIGENCE / 03',
    title: 'Continue the conversation, naturally.',
    copy: 'Bring proactive AI engagement to WhatsApp. Personalized replies and follow-up flows keep customers moving without making every interaction a manual task.',
    features: ['Personalized customer replies', 'Proactive follow-up journeys', 'Conversation continuity', 'High-intent engagement'],
    metrics: [['89.1%', 'MESSAGE OPEN RATE'], ['1:1', 'PERSONALIZED']],
    accent: '#65e7c3',
    cta: 'Explore WhatsApp AI',
  },
  {
    id: 'crm',
    icon: Database,
    num: '04 / 04',
    cardTitle: 'Spheno CRM',
    cardDesc: 'One shared customer memory connecting enquiries, conversations and team handoffs.',
    cardFoot: 'UNIFIED MEMORY',
    kicker: 'ACTIVE INTELLIGENCE / 04',
    title: 'One memory for every customer.',
    copy: 'Spheno CRM creates the connective tissue between conversations. Customer context, enquiries and handoffs stay organized so every channel starts from the same understanding.',
    features: ['Unified customer memory', 'Conversation history', 'Intelligent team handoffs', 'Cross-channel context'],
    metrics: [['100%', 'ATTRIBUTION SYNC'], ['360°', 'CUSTOMER VIEW']],
    accent: '#ffc08d',
    cta: 'Explore Spheno CRM',
  },
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const ORB_IDLE_SPIN = 0.09; // rad/s — slow ambient rotation of the orbiting rings, like planets circling the sun

interface StarSpec {
  x: number; // %
  y: number; // %
  size: number; // px
  delay: number; // s
  duration: number; // s
}

function makeBackgroundStars(): StarSpec[] {
  return Array.from({ length: 40 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.6 + Math.random() * 1.8,
    delay: Math.random() * 5,
    duration: 2.4 + Math.random() * 3.2,
  }));
}

export const SphenoSystem: React.FC = () => {
  // Starts empty so the server render and the client's first render match
  // exactly, then fills in with random positions after mount — Math.random()
  // values computed during render would differ between server and client and
  // trigger a React hydration mismatch.
  const [backgroundStars, setBackgroundStars] = useState<StarSpec[]>([]);
  useEffect(() => { setBackgroundStars(makeBackgroundStars()); }, []);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbitImgRef = useRef<HTMLImageElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<ModuleId>('voice');
  const [displayed, setDisplayed] = useState<EcosystemModule>(MODULES[0]);
  const [panelChanging, setPanelChanging] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [orbDragging, setOrbDragging] = useState(false);

  const activeRef = useRef<ModuleId>('voice');
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const changeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const orbHoverRef = useRef(0); // eases 0->1 while hovered, drives extra canvas intensity
  const orbHoverTargetRef = useRef(0);

  // Drag-to-spin state for the orbiting rings — the sun stays put, its solar system spins
  const orbRotationRef = useRef(0); // current rotation, radians
  const orbSpinVelocityRef = useRef(ORB_IDLE_SPIN); // rad/s, eases back to idle speed when released
  const orbDragRef = useRef({ dragging: false, lastX: 0, lastT: 0 });
  const sectionVisibleRef = useRef(false);

  useEffect(() => {
    activeRef.current = active;
    setPanelChanging(true);
    clearTimeout(changeTimer.current);
    changeTimer.current = setTimeout(() => {
      setDisplayed(MODULES.find((m) => m.id === active)!);
      setPanelChanging(false);
    }, 180);
    return () => clearTimeout(changeTimer.current);
  }, [active]);

  // ---- Living neural-field canvas (the orb) ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const particles = Array.from({ length: 80 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 0.16 + Math.pow(Math.random(), 0.65) * 0.40,
      z: Math.random() * Math.PI * 2,
      s: 0.15 + Math.random() * 0.8,
      size: 0.25 + Math.random() * 1.25,
    }));

    let raf = 0;
    const t0 = performance.now();
    let lastFrame = t0;

    // Track section visibility so we skip the expensive draw when scrolled off-screen
    const visObs = new IntersectionObserver(
      ([e]) => { sectionVisibleRef.current = e.isIntersecting; },
      { rootMargin: '200px' }
    );
    if (canvas.parentElement) visObs.observe(canvas.closest('section') || canvas.parentElement);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!sectionVisibleRef.current) return; // skip expensive draw when off-screen
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      // Ease spin velocity back toward the idle rate when not actively being dragged —
      // a fast flick keeps spinning fast and gently decelerates to the ambient rotation.
      if (!orbDragRef.current.dragging) {
        orbSpinVelocityRef.current += (ORB_IDLE_SPIN - orbSpinVelocityRef.current) * 0.02;
      }
      orbRotationRef.current += orbSpinVelocityRef.current * dt;
      // Spin the atom image itself — drag/momentum drives its rotation directly.
      if (orbitImgRef.current) {
        orbitImgRef.current.style.transform = `rotate(${orbRotationRef.current}rad)`;
      }
      const cx = W / 2, cy = H / 2, base = Math.min(W, H);
      const accentHex = MODULES.find((m) => m.id === activeRef.current)?.accent || '#63efff';
      const [r0, g0, b0] = hexToRgb(accentHex);
      const col = `rgb(${r0},${g0},${b0})`;

      orbHoverRef.current += (orbHoverTargetRef.current - orbHoverRef.current) * 0.08;
      const hv = orbHoverRef.current; // 0..1, smoothed hover intensity

      const voiceBoost = (activeRef.current === 'voice' ? 1.18 : 1) * (1 + hv * 0.55);

      const g = ctx.createRadialGradient(cx, cy, base * 0.035, cx, cy, base * (0.47 + hv * 0.04));
      g.addColorStop(0, `rgba(55,146,255,${0.23 + hv * 0.12})`);
      g.addColorStop(0.25, `rgba(51,125,240,${0.12 + hv * 0.06})`);
      g.addColorStop(0.63, 'rgba(37,90,190,.035)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, base * (0.5 + hv * 0.03), 0, Math.PI * 2); ctx.fill();

      ctx.save(); ctx.translate(cx, cy);
      for (let k = 0; k < 5; k++) {
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const p = i / 60, a = p * Math.PI * 2 + t * (0.18 + k * 0.025);
          const rad = base * (0.15 + k * 0.026) + Math.sin(a * 3 + t * (0.7 + k * 0.1)) * base * 0.009;
          const x = Math.cos(a) * rad * (1.0 + 0.16 * Math.sin(t * 0.5 + k));
          const y = Math.sin(a) * rad * 0.47;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = k % 2 ? `rgba(92,220,255,${0.07 * voiceBoost})` : `rgba(140,111,255,${0.055 * voiceBoost})`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.restore();

      ctx.save(); ctx.translate(cx, cy);
      const pointerX = pointerRef.current.x - 0.5;
      const pointerY = pointerRef.current.y - 0.5;
      for (const p of particles) {
        const a = p.a + t * (0.035 + p.s * 0.018);
        const pulse = Math.sin(t * 0.8 + p.z) * 0.018;
        const rr = p.r + pulse;
        const x = (Math.cos(a) * rr + pointerX * 0.035) * base;
        const y = (Math.sin(a) * rr * 0.66 + pointerY * 0.035) * base;
        const near = Math.max(0, 1 - Math.abs(rr - 0.30) / 0.19);
        const alpha = Math.min(1, (0.08 + near * 0.45) * (1 + hv * 0.6));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(x, y, p.size * (0.65 + near * 1.2) * (1 + hv * 0.35), 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // The sphere/rings graphic is now the image layered on top — the canvas only
      // paints soft ambient color and glow behind it for depth.
      const pulse = 1 + Math.sin(t * 1.35) * 0.008 + (activeRef.current === 'voice' ? 0.018 : 0) + hv * 0.05;
      const r = base * 0.19 * pulse;

      ctx.save(); ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 4; i++) {
        const a = t * (0.3 + i * 0.08) + i * 1.55;
        const x = cx + Math.cos(a) * r * 0.42, y = cy + Math.sin(a) * r * 0.42;
        const bg = ctx.createRadialGradient(x, y, 0, x, y, r * 0.55);
        bg.addColorStop(0, i % 2 ? `rgba(${r0},${g0},${b0},.18)` : 'rgba(255,95,195,.12)');
        bg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(x, y, r * 0.58, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();

      const edge = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.15);
      edge.addColorStop(0.75, 'rgba(255,255,255,0)');
      edge.addColorStop(0.92, `rgba(${r0},${g0},${b0},${0.14 + hv * 0.08})`);
      edge.addColorStop(1, 'rgba(90,190,255,0)');
      ctx.fillStyle = edge; ctx.beginPath(); ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2); ctx.fill();

    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); visObs.disconnect(); };
  }, []);

  // ---- One-time fade-in for the left cards column and right details panel ----
  // Watches the short hero header, not the (very tall, scroll-jacked) section itself —
  // a ratio-based threshold against a ~4500px-tall section would need hundreds of
  // extra pixels of scroll before ever crossing 15%.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // ---- Pointer parallax, scoped to this section only ----
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
      section.style.setProperty('--mx', `${(e.clientX / window.innerWidth) * 100}%`);
      section.style.setProperty('--my', `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // ---- Scroll choreography: nearest card to viewport center becomes active ----
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive((entry.target as HTMLElement).dataset.id as ModuleId);
        }
      });
    }, { root: null, threshold: [0.25, 0.5, 0.75], rootMargin: '-30% 0px -30% 0px' });

    cards.forEach((c) => observer.observe(c));

    // No distance cutoff: whichever card is nearest to viewport-center always wins.
    // A hard cutoff here lets a large/fast scroll jump land outside the tolerance for
    // every card at once, leaving the previously-active card stuck while the page
    // keeps scrolling past it (most noticeable on the last card, which has nothing
    // after it to hand activation off to).
    let ticking = false;
    const measure = () => {
      ticking = false;
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      if (!sectionRect || sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) return;
      const nearest = cards
        .map((c) => {
          const r = c.getBoundingClientRect();
          return { c, d: Math.abs(r.top + r.height / 2 - window.innerHeight * 0.5) };
        })
        .sort((a, b) => a.d - b.d)[0];
      if (nearest) setActive(nearest.c.dataset.id as ModuleId);

      // Fade the right panel out as it un-sticks and rides away near the end of the
      // section (desktop 3-column layout only — the panel isn't sticky below 1120px).
      const panelEl = panelRef.current;
      if (panelEl && window.innerWidth > 1120) {
        const stuckTopPx = window.innerHeight * 0.14; // matches the CSS `top:14vh`
        const drift = stuckTopPx - panelEl.getBoundingClientRect().top;
        if (drift > 4) {
          const fadeDistance = panelEl.offsetHeight * 0.85;
          const opacity = Math.max(0, 1 - drift / fadeDistance);
          // The panel's own CSS transitions opacity over 1s (for the initial scroll-reveal
          // fade-in), which — being a more specific selector — otherwise hijacks every
          // scroll-driven update below too, making the fade-out lag ~1s behind the actual
          // scroll position. Force it instant while we're the ones driving opacity here.
          panelEl.style.transition = 'opacity 0s';
          panelEl.style.opacity = String(opacity);
          panelEl.style.pointerEvents = opacity < 0.12 ? 'none' : '';
        } else if (panelEl.style.opacity !== '') {
          // Only step in if we'd previously overridden opacity ourselves (user scrolled
          // into the fade zone and back) — snap back to visible instantly rather than
          // inheriting the slow reveal transition. If we've never touched it, leave it
          // alone so the one-time page-load fade-in animation can play out undisturbed.
          panelEl.style.transition = 'opacity 0s';
          panelEl.style.opacity = '1';
          panelEl.style.pointerEvents = '';
        }
      } else if (panelEl && panelEl.style.opacity !== '') {
        panelEl.style.transition = 'opacity 0s';
        panelEl.style.opacity = '1';
        panelEl.style.pointerEvents = '';
      }
    };
    // Batch to one measurement per animation frame instead of firing multiple
    // getBoundingClientRect() reads (forced layout) on every raw scroll event —
    // this listener runs for the whole page's lifetime, not just while this
    // section is visible, so unthrottled it was a sitewide source of jank.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const onCardPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--cx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--cy', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  // Drag-to-spin the sun orb, with momentum that eases back to the idle rotation on release
  const onOrbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    orbDragRef.current = { dragging: true, lastX: e.clientX, lastT: performance.now() };
    setOrbDragging(true);
  };
  const onOrbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!orbDragRef.current.dragging) return;
    const now = performance.now();
    const dx = e.clientX - orbDragRef.current.lastX;
    const dtSec = Math.max(0.001, (now - orbDragRef.current.lastT) / 1000);
    const rotDelta = dx * 0.012;
    orbRotationRef.current += rotDelta;
    orbSpinVelocityRef.current = Math.max(-16, Math.min(16, rotDelta / dtSec));
    orbDragRef.current.lastX = e.clientX;
    orbDragRef.current.lastT = now;
  };
  const onOrbPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    orbDragRef.current.dragging = false;
    setOrbDragging(false);
    orbHoverTargetRef.current = e.currentTarget.matches(':hover') ? 1 : 0;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section ref={sectionRef} id="system" className={`spheno-eco relative bg-[#02050d] ${revealed ? 'is-revealed' : ''}`}>
      <div className="eco-ambient" />
      <div className="eco-starfield" aria-hidden="true">
        {backgroundStars.map((s, i) => (
          <span
            key={i}
            className="eco-star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="eco-container">
        <header ref={heroRef} className="eco-hero">
          <div className="eco-eyebrow"><i /> ONE INTELLIGENCE · FOUR EXPERIENCES</div>
          <h1>Meet the AI that <span>moves with your customer.</span></h1>
          <p>Voice, web, WhatsApp and CRM — connected by one living intelligence that understands the conversation from every angle.</p>
        </header>

        <div className="eco-experience">
          <div className="eco-cards">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              const isActive = active === m.id;
              return (
                <button
                  key={m.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  data-id={m.id}
                  onClick={() => setActive(m.id)}
                  onPointerMove={onCardPointerMove}
                  className={`eco-card eco-card-${m.id} ${isActive ? 'active' : 'muted'}`}
                  style={{ '--accent': m.accent } as React.CSSProperties}
                  aria-pressed={isActive}
                >
                  <span className="eco-card-shimmer" aria-hidden="true" />
                  <div className="eco-card-head">
                    <span className="eco-icon"><Icon className="w-[21px] h-[21px]" strokeWidth={1.6} /></span>
                    <span className="eco-num">{m.num}</span>
                  </div>
                  <h2>{m.cardTitle}</h2>
                  <p>{m.cardDesc}</p>
                  <div className="eco-card-foot">
                    <span>{m.cardFoot}</span>
                    <span className="eco-arrow">↗</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="eco-visual">
            <div
              className="eco-orb-stage"
              onPointerEnter={() => { orbHoverTargetRef.current = 1; }}
              onPointerLeave={() => { if (!orbDragRef.current.dragging) orbHoverTargetRef.current = 0; }}
              onPointerDown={onOrbPointerDown}
              onPointerMove={onOrbPointerMove}
              onPointerUp={onOrbPointerUp}
              onPointerCancel={onOrbPointerUp}
              style={{ cursor: orbDragging ? 'grabbing' : 'grab' }}
            >
              <canvas ref={canvasRef} />
              <img
                ref={orbitImgRef}
                className="eco-orb-image"
                src="/spheno/images/spheno-logo-icon.webp"
                alt=""
                draggable={false}
                aria-hidden="true"
              />
            </div>
            <div className="eco-scroll-guide"><i /> SCROLL TO ACTIVATE EACH INTELLIGENCE</div>
          </div>

          <aside className="eco-details">
            <div ref={panelRef} className={`eco-panel ${panelChanging ? 'change' : ''}`} style={{ '--accent': displayed.accent } as React.CSSProperties}>
              <span className="eco-card-shimmer" aria-hidden="true" />
              <div className="eco-panel-kicker">{displayed.kicker}</div>
              <h3>{displayed.title}</h3>
              <p className="eco-panel-copy">{displayed.copy}</p>
              <ul className="eco-feature-list">
                {displayed.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <div className="eco-metrics">
                {displayed.metrics.map(([val, label]) => (
                  <div className="eco-metric" key={label}><b>{val}</b><span>{label}</span></div>
                ))}
              </div>
              <a className="eco-explore" href="#chat-demo">{displayed.cta} <span>↗</span></a>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .spheno-eco{
          --bg:#02050d;--line:rgba(135,190,255,.13);--muted:#8296b5;--mx:50%;--my:50%;
          isolation:isolate;color:#f7fbff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          background:
            radial-gradient(ellipse 45% 40% at 50% 40%,rgba(21,108,225,.13),transparent 72%),
            radial-gradient(ellipse 35% 30% at 10% 80%,rgba(91,69,211,.07),transparent 72%),#02050d;
          overflow-x:clip;
        }
        .spheno-eco:before{
          content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
          background-image:
            radial-gradient(rgba(147,202,255,.32) .7px,transparent .85px),
            radial-gradient(rgba(147,202,255,.2) .55px,transparent .7px);
          background-size:38px 38px, 21px 21px;
          background-position:0 0, 11px 9px;
          opacity:.16;
          mask-image:linear-gradient(transparent,black 12%,black 86%,transparent);
        }
        .spheno-eco .eco-ambient{
          position:absolute;inset:-30%;pointer-events:none;z-index:0;
          background:radial-gradient(circle at var(--mx) var(--my),rgba(62,150,255,.07),transparent 22%);
        }
        .spheno-eco .eco-starfield{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
        .spheno-eco .eco-star{
          position:absolute;border-radius:50%;background:#fff;
          box-shadow:0 0 4px 1px rgba(255,255,255,.55);
          animation:eco-star-twinkle ease-in-out infinite;
        }
        @keyframes eco-star-twinkle{
          0%,100%{opacity:.15;transform:scale(0.8)}
          50%{opacity:1;transform:scale(1.15)}
        }
        .spheno-eco .eco-container{position:relative;z-index:1;width:min(1260px,calc(100% - 40px));margin:auto}
        .spheno-eco .eco-hero{text-align:center;padding:105px 0 72px}
        .spheno-eco .eco-eyebrow{display:flex;justify-content:center;align-items:center;gap:10px;color:#9eb6d7;font-size:10px;font-weight:800;letter-spacing:.26em}
        .spheno-eco .eco-eyebrow i{width:6px;height:6px;border-radius:50%;background:#63efff;box-shadow:0 0 15px #63efff;animation:eco-blink 1.7s ease-in-out infinite}
        @keyframes eco-blink{50%{transform:scale(1.8);opacity:.45}}
        .spheno-eco .eco-hero h1{font-size:clamp(32px,6vw,68px);line-height:.97;letter-spacing:-.05em;font-weight:650;margin:22px auto 18px;max-width:830px}
        .spheno-eco .eco-hero h1 span{background:linear-gradient(100deg,#fff 8%,#b6d4ff 48%,#66efff 90%);background-clip:text;-webkit-background-clip:text;color:transparent}
        .spheno-eco .eco-hero p{max-width:600px;margin:auto;color:#899dbb;font-size:14px;line-height:1.85}

        .spheno-eco .eco-experience{position:relative;display:grid;grid-template-columns:340px minmax(430px,1fr) 340px;gap:40px;align-items:start;padding-top:16vh;padding-bottom:130px}
        .spheno-eco .eco-cards{padding-top:10vh;opacity:0;transform:translateY(32px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1)}
        .spheno-eco.is-revealed .eco-cards{opacity:1;transform:translateY(0)}
        .spheno-eco .eco-card{
          position:relative;min-height:270px;margin-bottom:45vh;padding:25px 23px;text-align:left;width:100%;
          border:1px solid var(--line);border-radius:22px;background:linear-gradient(145deg,rgba(10,24,42,.97),rgba(3,11,23,.95));
          box-shadow:0 18px 70px rgba(0,0,0,.17);
          cursor:pointer;transition:border-color .4s,box-shadow .4s,transform .35s cubic-bezier(.2,.8,.2,1),opacity .45s;
          overflow:hidden;will-change:transform;
        }
        .spheno-eco .eco-card:last-child{margin-bottom:calc(45vh + 760px)}
        .spheno-eco .eco-card:before{
          content:"";position:absolute;inset:0;background:radial-gradient(260px circle at var(--cx,50%) var(--cy,0),color-mix(in srgb,var(--accent,#64dcff) 55%,transparent),transparent 65%);opacity:0;transition:opacity .4s;pointer-events:none
        }
        .spheno-eco .eco-card:after{
          content:"";position:absolute;left:0;top:18px;bottom:18px;width:2px;border-radius:2px;
          background:linear-gradient(var(--accent,#62eeff),transparent);transform:scaleY(0);transform-origin:top;transition:transform .5s;pointer-events:none
        }
        .spheno-eco .eco-card.active{border-color:color-mix(in srgb,var(--accent,#65e0ff) 55%,transparent);box-shadow:0 25px 90px rgba(0,0,0,.27),0 0 38px color-mix(in srgb,var(--accent,#3499ff) 35%,transparent);transform:translateX(7px)}
        .spheno-eco .eco-card.active:before{opacity:1}
        .spheno-eco .eco-card.active:after{transform:scaleY(1)}
        .spheno-eco .eco-card.muted{opacity:.48}
        .spheno-eco .eco-card:focus-visible{outline:2px solid #7defff;outline-offset:4px}

        /* Hover flourishes: lift, glow, shimmer sweep, un-dim — independent of scroll-active state */
        .spheno-eco .eco-card:hover{
          transform:translateX(7px) translateY(-6px) scale(1.015);
          border-color:color-mix(in srgb,var(--accent,#65e0ff) 45%,transparent);
          box-shadow:0 32px 90px rgba(0,0,0,.35),0 0 42px color-mix(in srgb,var(--accent,#3499ff) 22%,transparent);
        }
        .spheno-eco .eco-card.muted:hover{opacity:.92}
        .spheno-eco .eco-card:hover:before{opacity:.85}
        .spheno-eco .eco-card:hover:after{transform:scaleY(1)}
        .spheno-eco .eco-card-shimmer{
          content:"";position:absolute;inset:0;pointer-events:none;z-index:1;
          background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.09) 48%,rgba(255,255,255,.16) 50%,rgba(255,255,255,.09) 52%,transparent 60%);
          background-size:220% 220%;background-position:130% 130%;opacity:0;transition:opacity .35s;
        }
        .spheno-eco .eco-card:hover .eco-card-shimmer{opacity:1;animation:eco-shimmer-sweep 1.1s ease forwards}
        @keyframes eco-shimmer-sweep{from{background-position:130% 130%}to{background-position:-10% -10%}}

        .spheno-eco .eco-card-head{position:relative;display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
        .spheno-eco .eco-icon{
          width:46px;height:46px;border-radius:14px;display:grid;place-items:center;
          color:#8fe2ff;background:rgba(69,143,240,.08);border:1px solid rgba(133,199,255,.18);
          transition:transform .4s cubic-bezier(.34,1.56,.64,1),box-shadow .4s,background .4s,border-color .4s
        }
        .spheno-eco .eco-card.active .eco-icon{transform:rotate(-8deg) scale(1.09);box-shadow:0 0 28px color-mix(in srgb,var(--accent,#57cbff) 45%,transparent)}
        .spheno-eco .eco-card:hover .eco-icon{
          transform:rotate(6deg) scale(1.16);
          background:color-mix(in srgb,var(--accent,#458ff0) 18%,transparent);
          border-color:color-mix(in srgb,var(--accent,#85c7ff) 55%,transparent);
          box-shadow:0 0 24px color-mix(in srgb,var(--accent,#57cbff) 40%,transparent);
        }
        .spheno-eco .eco-num{font-size:10px;letter-spacing:.2em;color:#5f789b;transition:color .35s}
        .spheno-eco .eco-card:hover .eco-num{color:var(--accent,#8fe2ff)}
        .spheno-eco .eco-card h2{position:relative;font-size:22px;letter-spacing:-.045em;margin:0 0 10px;color:#f7fbff;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
        .spheno-eco .eco-card:hover h2{transform:translateX(3px)}
        .spheno-eco .eco-card p{position:relative;color:#879ab7;font-size:12px;line-height:1.75;margin:0}
        .spheno-eco .eco-card-foot{position:relative;display:flex;justify-content:space-between;align-items:center;margin-top:25px;color:#69dce9;font-size:9px;font-weight:800;letter-spacing:.12em}
        .spheno-eco .eco-arrow{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(142,194,241,.18);transition:transform .4s cubic-bezier(.34,1.56,.64,1),background .35s,border-color .35s}
        .spheno-eco .eco-card.active .eco-arrow{transform:rotate(-45deg);background:rgba(70,154,245,.19);border-color:rgba(108,215,255,.3)}
        .spheno-eco .eco-card:hover .eco-arrow{
          transform:rotate(-45deg) scale(1.12);
          background:color-mix(in srgb,var(--accent,#469af5) 22%,transparent);
          border-color:color-mix(in srgb,var(--accent,#6cd7ff) 50%,transparent);
        }
        .spheno-eco .eco-card-chat .eco-icon{color:#b09eff}
        .spheno-eco .eco-card-whatsapp .eco-icon{color:#70e5c5}
        .spheno-eco .eco-card-crm .eco-icon{color:#ffc18f}

        .spheno-eco .eco-visual{position:sticky;top:50%;height:720px;transform:translateY(-50%);display:grid;place-items:center;pointer-events:none}
        .spheno-eco .eco-orb-stage{position:relative;width:min(560px,100%);aspect-ratio:1;pointer-events:auto;touch-action:none;user-select:none;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
        .spheno-eco .eco-orb-stage:hover{transform:scale(1.045)}
        .spheno-eco .eco-orb-stage canvas{position:absolute;inset:0;width:100%;height:100%}
        .spheno-eco .eco-orb-image{
          position:absolute;left:50%;top:50%;width:30%;height:30%;margin:-15% 0 0 -15%;
          transform-origin:center;object-fit:contain;pointer-events:none;
          filter:drop-shadow(0 0 26px rgba(90,110,255,.45));
          transition:filter .5s;
          will-change:transform;
        }
        .spheno-eco .eco-orb-stage:hover .eco-orb-image{filter:drop-shadow(0 0 40px rgba(120,140,255,.7))}
        .spheno-eco .eco-core-label{
          position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;z-index:2;
          pointer-events:none;text-shadow:0 3px 22px rgba(0,0,0,.5);transition:text-shadow .5s
        }
        .spheno-eco .eco-core-label strong{display:block;font-size:clamp(20px,3.1vw,30px);font-weight:800;line-height:1;letter-spacing:.02em;color:#fff;transition:text-shadow .5s}
        .spheno-eco .eco-orb-stage:hover .eco-core-label strong{text-shadow:0 0 24px rgba(140,220,255,.85)}
        .spheno-eco .eco-core-status{display:flex;align-items:center;justify-content:center;gap:5px;margin-top:18px;font-size:7px;color:#89b1d6;letter-spacing:.14em}
        .spheno-eco .eco-core-status b{width:4px;height:4px;border-radius:50%;background:#63efd2;box-shadow:0 0 9px #63efd2}

        .spheno-eco .eco-details{position:sticky;top:14vh;display:flex;align-items:flex-start}
        .spheno-eco .eco-details .eco-panel{opacity:0;transform:translate(0,32px);transition:opacity 1s cubic-bezier(.16,1,.3,1) .15s,transform 1s cubic-bezier(.16,1,.3,1) .15s}
        .spheno-eco.is-revealed .eco-details .eco-panel{opacity:1;transform:translate(0,0)}
        .spheno-eco.is-revealed .eco-details .eco-panel.change{opacity:.25;transform:translate(10px,0)}
        .spheno-eco .eco-panel{
          position:relative;overflow:hidden;
          width:100%;padding:22px;border-radius:22px;border:1px solid rgba(139,192,246,.17);
          background:
            radial-gradient(300px circle at 100% 0,rgba(70,160,255,.09),transparent 70%),
            linear-gradient(145deg,rgba(11,28,49,.97),rgba(3,12,25,.99));
          box-shadow:0 30px 100px rgba(0,0,0,.25);
          transition:opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1),border-color .4s,box-shadow .4s
        }
        .spheno-eco .eco-panel.change{opacity:.25;transform:translateX(10px)}
        .spheno-eco.is-revealed .eco-details .eco-panel:hover{
          transform:translateY(-6px) scale(1.015);
          border-color:color-mix(in srgb,var(--accent,#67eaff) 45%,transparent);
          box-shadow:0 36px 110px rgba(0,0,0,.35),0 0 46px color-mix(in srgb,var(--accent,#67eaff) 24%,transparent);
        }
        .spheno-eco .eco-panel:hover .eco-card-shimmer{opacity:1;animation:eco-shimmer-sweep 1.1s ease forwards}
        .spheno-eco .eco-panel-kicker{font-size:9px;color:#67e2ef;font-weight:800;letter-spacing:.2em;margin-bottom:9px}
        .spheno-eco .eco-panel h3{font-size:26px;line-height:1.08;letter-spacing:-.04em;margin:0 0 10px;color:#fff}
        .spheno-eco .eco-panel-copy{font-size:12.5px;line-height:1.6;color:#8da1be;margin:0 0 16px}
        .spheno-eco .eco-feature-list{list-style:none;padding:0;margin:0 0 16px;display:grid;gap:6px}
        .spheno-eco .eco-feature-list li{display:flex;gap:10px;align-items:center;color:#b9cce5;font-size:11px}
        .spheno-eco .eco-feature-list li:before{content:"";width:5px;height:5px;border-radius:50%;background:var(--accent,#67eaff);box-shadow:0 0 10px var(--accent,#67eaff);flex:none}
        .spheno-eco .eco-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
        .spheno-eco .eco-metric{padding:9px 11px;border-radius:11px;border:1px solid rgba(134,183,235,.12);background:rgba(93,151,225,.04);transition:border-color .4s,background .4s}
        .spheno-eco .eco-panel:hover .eco-metric{border-color:color-mix(in srgb,var(--accent,#67eaff) 30%,transparent);background:color-mix(in srgb,var(--accent,#67eaff) 6%,rgba(93,151,225,.04))}
        .spheno-eco .eco-metric b{display:block;font-size:15px;letter-spacing:-.03em;color:#fff}
        .spheno-eco .eco-metric span{font-size:8px;color:#657e9f;letter-spacing:.1em}
        .spheno-eco .eco-explore{
          display:flex;align-items:center;justify-content:space-between;gap:15px;text-decoration:none;color:#fff;
          padding:11px 16px;border-radius:12px;background:linear-gradient(105deg,#267be8,#1e55ac);
          font-size:11px;font-weight:800;transition:transform .25s,filter .25s,box-shadow .25s
        }
        .spheno-eco .eco-explore:hover{transform:translateY(-2px);filter:brightness(1.14);box-shadow:0 10px 30px rgba(37,112,225,.22)}
        .spheno-eco .eco-explore span{font-size:17px}

        .spheno-eco .eco-scroll-guide{
          position:absolute;left:50%;bottom:4px;transform:translateX(-50%);
          display:flex;align-items:center;gap:10px;color:#5d7595;font-size:8px;letter-spacing:.18em;white-space:nowrap
        }
        .spheno-eco .eco-scroll-guide i{width:1px;height:31px;background:linear-gradient(#6feeff,transparent);animation:eco-scroll-pulse 1.7s ease-in-out infinite}
        @keyframes eco-scroll-pulse{50%{height:43px;opacity:.4}}

        @media(max-width:1120px){
          .spheno-eco .eco-experience{grid-template-columns:280px minmax(380px,1fr);gap:25px}
          .spheno-eco .eco-details{grid-column:1/3;position:relative;top:auto;transform:none;height:auto;min-height:480px;align-items:flex-start;margin-top:20px}
          .spheno-eco .eco-panel{max-width:700px;margin:auto}
          .spheno-eco .eco-visual{grid-column:2;grid-row:1;position:sticky}
        }
        @media(max-width:800px){
          .spheno-eco .eco-container{width:min(100% - 30px,620px)}
          .spheno-eco .eco-hero{padding:78px 0 45px}
          .spheno-eco .eco-experience{display:block;padding-top:0}
          .spheno-eco .eco-cards{padding-top:0}
          .spheno-eco .eco-visual{position:sticky;top:0;height:520px;transform:none;z-index:1;background:linear-gradient(var(--bg),rgba(2,5,13,.92),transparent);margin:0 -15px}
          .spheno-eco .eco-orb-stage{width:min(510px,100vw)}
          .spheno-eco .eco-card{margin-bottom:32vh;min-height:235px}
          .spheno-eco .eco-card:last-child{margin-bottom:calc(32vh + 560px)}
          .spheno-eco .eco-details{position:sticky;top:120px;height:auto;min-height:0;margin:0 0 60px;z-index:5}
          .spheno-eco .eco-panel{box-shadow:0 25px 80px rgba(0,0,0,.4)}
        }
        @media(max-width:520px){
          .spheno-eco .eco-hero{padding-top:64px}
          .spheno-eco .eco-hero p{font-size:12.5px}
          .spheno-eco .eco-visual{height:410px}
          .spheno-eco .eco-core-ring{width:40%}
          .spheno-eco .eco-card{padding:21px;min-height:210px}
          .spheno-eco .eco-panel{padding:24px}
          .spheno-eco .eco-panel h3{font-size:27px}
          .spheno-eco .eco-metrics{grid-template-columns:1fr 1fr}
        }
        @media(prefers-reduced-motion:reduce){
          .spheno-eco *,.spheno-eco *:before,.spheno-eco *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
        }
      `}</style>
    </section>
  );
};
