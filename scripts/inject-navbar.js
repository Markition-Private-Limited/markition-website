/**
 * Injects the full Markition navbar (matching React Navbar.tsx) into all 4
 * industry static HTML pages, keeping each page's accent colour.
 * Run: node scripts/inject-navbar.js
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'public', 'industries');

const PAGES = [
  { file: 'roofing.html',              accent: '#C8923E', accentRgb: '200,146,62'  },
  { file: 'dental.html',               accent: '#1a6aff', accentRgb: '26,106,255'  },
  { file: 'hair-restoration.html',     accent: '#B8894A', accentRgb: '184,137,74'  },
  { file: 'aesthetician-clinics.html', accent: '#C9A96E', accentRgb: '201,169,110' },
];

// ─── SVG icon helper ────────────────────────────────────────────────────────
const S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  code:      `<polyline points="16 18 22 12 16 6" ${S}/><polyline points="8 6 2 12 8 18" ${S}/>`,
  star:      `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" ${S}/>`,
  chart:     `<line x1="18" y1="20" x2="18" y2="10" ${S}/><line x1="12" y1="20" x2="12" y2="4" ${S}/><line x1="6" y1="20" x2="6" y2="14" ${S}/>`,
  building:  `<rect x="3" y="3" width="18" height="18" rx="2" ${S}/><path d="M9 3v18M3 9h6M3 15h6M15 9h3M15 15h3" ${S}/>`,
  mobile:    `<rect x="5" y="2" width="14" height="20" rx="2" ${S}/><line x1="12" y1="18" x2="12.01" y2="18" ${S}/>`,
  cloud:     `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" ${S}/>`,
  bolt:      `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" ${S}/>`,
  pen:       `<path d="M12 20h9" ${S}/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" ${S}/>`,
  robot:     `<rect x="3" y="11" width="18" height="10" rx="2" ${S}/><circle cx="9" cy="16" r="1" ${S}/><circle cx="15" cy="16" r="1" ${S}/><path d="M8 11V7a4 4 0 0 1 8 0v4" ${S}/>`,
  chat:      `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" ${S}/>`,
  lock:      `<rect x="3" y="11" width="18" height="11" rx="2" ${S}/><path d="M7 11V7a5 5 0 0 1 10 0v4" ${S}/>`,
  cart:      `<circle cx="9" cy="21" r="1" ${S}/><circle cx="20" cy="21" r="1" ${S}/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" ${S}/>`,
  seo:       `<circle cx="11" cy="11" r="8" ${S}/><line x1="21" y1="21" x2="16.65" y2="16.65" ${S}/>`,
  link:      `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" ${S}/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" ${S}/>`,
  megaphone: `<path d="M3 11l19-9-9 19-2-8-8-2z" ${S}/>`,
};
function icon(t) { return `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">${ICONS[t]||ICONS.star}</svg>`; }

// ─── Data ────────────────────────────────────────────────────────────────────
const SERVICES = {
  tech: [
    { icon:'code',      name:'Software Development',    href:'/tech#services' },
    { icon:'building',  name:'Enterprise Solution',     href:'/tech#solutions' },
    { icon:'mobile',    name:'Mobile App Engineering',  href:'/tech#services' },
    { icon:'cloud',     name:'SaaS Platforms',          href:'/tech#services' },
    { icon:'chart',     name:'Web Apps & Portals',      href:'/tech#services' },
    { icon:'cart',      name:'Commerce & Marketplaces', href:'/tech#services' },
  ],
  marketing: [
    { icon:'bolt',      name:'Google Ads',                   href:'/media/google-ads' },
    { icon:'chart',     name:'Social Media Marketing',       href:'#' },
    { icon:'seo',       name:'On-Page SEO',                  href:'/media/seo' },
    { icon:'link',      name:'Off-Page SEO',                 href:'/media/seo' },
    { icon:'chart',     name:'Meta Ads',                     href:'/media/meta-ads' },
    { icon:'megaphone', name:'Social Media Page Management', href:'/media/social-media-page-management' },
    { icon:'chart',     name:'Video Editing & Content',      href:'/media/video-editing' },
  ],
  enterprise: [
    { icon:'building', name:'ERP & Odoo Suite',     href:'#' },
    { icon:'code',     name:'CRM Development',      href:'#' },
    { icon:'bolt',     name:'Operation Systems',    href:'#' },
    { icon:'chart',    name:'Payroll Outsourcing',  href:'#' },
    { icon:'lock',     name:'HR Automation',        href:'#' },
    { icon:'mobile',   name:'Attendance Systems',   href:'#' },
  ],
  ai: [
    { icon:'robot', name:'AI Agents',          href:'#' },
    { icon:'star',  name:'Generative AI',      href:'#' },
    { icon:'chat',  name:'AI Chatbots',        href:'#' },
    { icon:'bolt',  name:'Workflow Automation',href:'#' },
    { icon:'cloud', name:'LLM Integration',    href:'#' },
    { icon:'lock',  name:'RAG Pipelines',      href:'#' },
  ],
  industry: [
    { icon:'chart',    name:'Fintech Solutions',        href:'#' },
    { icon:'building', name:'Healthcare Solutions',     href:'#' },
    { icon:'cart',     name:'Retail & E-Commerce',      href:'#' },
    { icon:'bolt',     name:'Transportation Solutions', href:'#' },
    { icon:'code',     name:'Real Estate Tech',         href:'#' },
    { icon:'mobile',   name:'EdTech Platforms',         href:'#' },
  ],
};

const SOLUTIONS = [
  { heading:'Media',        accentBar:'linear-gradient(90deg,#20D9FF,#1236E8)',        image:'/solutions/media-bg.webp',      desc:'Google Ads, SEO, social media management & paid campaigns that turn traffic into measurable growth.',                                   link:'Explore Media',        href:'/media' },
  { heading:'Technologies', accentBar:'linear-gradient(90deg,#1236E8,#20D9FF)',        image:'/solutions/tech-bg.webp',       desc:'Custom software, web apps, mobile platforms & SaaS products engineered for scale and peak performance.',                          link:'Explore Technologies', href:'/tech' },
  { heading:'Design Lab',   accentBar:'linear-gradient(90deg,#20D9FF,#1236E8,#20D9FF)',image:'/solutions/designlab-bg.webp', desc:'Brand identity, UI/UX design, motion graphics & print — creative work that makes your brand impossible to ignore.', link:'Explore Design Lab',   href:'/design-lab' },
  { heading:'SPHENO AI',    accentBar:'linear-gradient(90deg,#1236E8,#20D9FF,#1236E8)',image:'/solutions/spheno-bg.webp',    desc:'AI agents, chatbots, voice AI & workflow automation that make your business operate intelligently.',                                  link:'Explore SPHENO AI',   href:'/spheno' },
];

const INDUSTRIES = [
  { label:'Dental',               href:'/industries/dental',               icon:'star',     desc:'Google Ads, SEO & lead gen for dental practices' },
  { label:'Roofing',              href:'/industries/roofing',              icon:'building', desc:'Google Ads, SEO & lead gen for roofing contractors' },
  { label:'Hair Restoration',     href:'/industries/hair-restoration',     icon:'chart',    desc:'Patient lead generation for hair transplant & restoration clinics' },
  { label:'Aesthetician Clinics', href:'/industries/aesthetician-clinics', icon:'bolt',     desc:'Client acquisition for med spas & aesthetic clinics' },
];

// ─── Build HTML pieces ───────────────────────────────────────────────────────
const TABS = [
  { label:'Tech Solution',       key:'tech' },
  { label:'Digital Marketing',   key:'marketing' },
  { label:'Enterprise Solution', key:'enterprise' },
  { label:'AI Solutions',        key:'ai' },
  { label:'Industry Solutions',  key:'industry' },
];

function svcItem(it) {
  return `<a class="mk-svc-item" href="${it.href}" target="_blank" rel="noopener noreferrer"><div class="mk-svc-icon">${icon(it.icon)}</div><span class="mk-svc-name">${it.name}</span></a>`;
}

function solCard(s) {
  return `<div class="mk-sol-col" onclick="window.open('${s.href}','_blank','noopener,noreferrer')">
  <div class="mk-sol-bar" style="background:${s.accentBar}"></div>
  <div class="mk-sol-img">
    <div class="mk-sol-img-bg" style="background-image:linear-gradient(145deg,rgba(8,14,44,.18),rgba(10,20,60,.32)),url(${s.image})"></div>
    <span class="mk-sol-label">${s.heading}</span>
  </div>
  <p class="mk-sol-desc">${s.desc}</p>
  <a class="mk-sol-link" href="${s.href}" target="_blank" rel="noopener noreferrer">${s.link} <span>&#8594;</span></a>
</div>`;
}

function indCard(i) {
  return `<a class="mk-ind-card" href="${i.href}"><div class="mk-ind-icon">${icon(i.icon)}</div><div><p class="mk-ind-name">${i.label}</p><p class="mk-ind-desc">${i.desc}</p></div></a>`;
}

function mobSvcCard(c) {
  return `<a class="mk-mob-card" href="${c.href}" target="_blank" rel="noopener noreferrer"><div class="mk-mob-card-icon">${icon(c.icon)}</div><span class="mk-mob-card-name">${c.label}</span><span class="mk-mob-card-desc">${c.desc}</span></a>`;
}

const MOB_SVC = [
  { icon:'code',     label:'Tech Solution',      desc:'Web, mobile & SaaS platforms', href:'/tech' },
  { icon:'bolt',     label:'Digital Marketing',  desc:'Google Ads, SEO & social',     href:'/media' },
  { icon:'building', label:'Enterprise',         desc:'ERP, CRM & systems',           href:'/tech#solutions' },
  { icon:'robot',    label:'AI Solutions',       desc:'Agents, chatbots & automation',href:'#' },
  { icon:'chart',    label:'Industry Solutions', desc:'Fintech, healthcare & more',   href:'#' },
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
function buildCSS(accent, accentRgb) {
  return `<style id="mk-nav-css">
:root{--nav-accent:${accent}}
.mk-nav-wrap{position:sticky;top:0;z-index:999;height:0;display:flow-root}
.mk-nav-pill{position:relative;width:min(1180px,calc(100% - 32px));margin:0 auto;font-family:'Plus Jakarta Sans',sans-serif}
.mk-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 24px;border-radius:14px;margin-top:10px;background:linear-gradient(135deg,rgba(${accentRgb},.55) 0%,rgba(10,9,8,1) 45%);backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);border:1px solid rgba(${accentRgb},.4);box-shadow:0 2px 24px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.08)}
.mk-nav-logo img{height:28px;width:auto;display:block}
.mk-nav-links{display:flex;align-items:center;gap:2px;flex:1;justify-content:center}
.mk-nav-links a,.mk-nav-drop-btn{color:rgba(255,255,255,.75);font-size:13px;font-weight:400;padding:7px 10px;border-radius:8px;text-decoration:none;transition:.15s;background:none;border:none;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:4px;font-family:inherit}
.mk-nav-links a:hover,.mk-nav-drop-btn:hover,.mk-nav-drop-btn.open{color:#fff;background:rgba(255,255,255,.07)}
.mk-chevron{display:inline-flex;transition:transform .2s;font-style:normal;font-size:10px}
.mk-nav-drop-btn.open .mk-chevron{transform:rotate(180deg)}
.mk-nav-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
.mk-btn-cta{display:inline-flex;align-items:center;gap:6px;background:var(--nav-accent);color:#fff;font-size:12.5px;font-weight:600;padding:8px 16px;border-radius:6px;text-decoration:none;white-space:nowrap;transition:.15s;border:none}
.mk-btn-cta:hover{filter:brightness(1.1);transform:translateY(-1px)}
.mk-nav-toggle{display:none;flex-direction:column;gap:4.5px;background:rgba(255,255,255,.08);border:none;padding:8px;border-radius:8px;cursor:pointer;align-items:center;justify-content:center;width:34px;height:34px}
.mk-nav-toggle span{width:18px;height:1.8px;background:#fff;border-radius:2px;display:block;transition:.2s}
/* ── Dropdown shell ── */
.mk-drop{position:absolute;top:calc(100% + 10px);left:0;right:0;background:linear-gradient(rgba(${accentRgb},.18),rgba(${accentRgb},.18)),rgb(10,9,8);border:1px solid rgba(${accentRgb},.28);border-radius:18px;box-shadow:0 24px 80px rgba(0,0,0,.7);padding:28px 32px;z-index:50;animation:mkFade .25s ease}
@keyframes mkFade{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.mk-drop-eyebrow{margin:0 0 18px;font-size:11px;font-weight:700;letter-spacing:.15em;color:rgba(255,255,255,.4);text-transform:uppercase}
/* ── Services ── */
.mk-serv-grid{display:grid;grid-template-columns:186px 1fr;gap:32px}
.mk-serv-tabs{border-right:1px solid rgba(255,255,255,.08);padding-right:20px;display:flex;flex-direction:column;gap:2px}
.mk-tab{display:flex;align-items:center;gap:8px;width:100%;text-align:left;padding:9px 12px;border-radius:9px;background:none;border:none;cursor:pointer;font-size:14px;font-weight:500;color:rgba(255,255,255,.72);transition:.15s;font-family:inherit}
.mk-tab.active{background:rgba(75,142,255,.12);color:#fff;font-weight:700}
.mk-tab:hover:not(.active){background:rgba(255,255,255,.05);color:rgba(255,255,255,.8)}
.mk-serv-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px 16px}
.mk-svc-item{display:flex;align-items:center;gap:12px;text-decoration:none}
.mk-svc-icon{flex-shrink:0;width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:#4B8EFF;transition:.15s}
.mk-svc-item:hover .mk-svc-icon{background:rgba(75,142,255,.15);border-color:rgba(75,142,255,.35)}
.mk-svc-name{font-size:13.5px;font-weight:700;color:#fff;line-height:1.3;transition:.15s}
.mk-svc-item:hover .mk-svc-name{color:#4B8EFF}
/* ── Solutions ── */
.mk-sol-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px}
.mk-sol-title{font-size:26px;font-weight:800;background:linear-gradient(135deg,#fff 30%,#4B8EFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 4px}
.mk-sol-sub{font-size:12.5px;color:rgba(255,255,255,.38);margin:0}
.mk-close-btn{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.65);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:.15s;flex-shrink:0}
.mk-close-btn:hover{background:rgba(255,255,255,.14);color:#fff}
.mk-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(75,142,255,.5) 30%,rgba(34,197,244,.4) 70%,transparent);margin:14px 0 24px}
.mk-sol-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0 20px}
.mk-sol-col{display:flex;flex-direction:column;padding:14px;border-radius:16px;border-left:1px solid transparent;transition:background .2s,transform .2s;cursor:pointer}
.mk-sol-col+.mk-sol-col{border-left-color:rgba(255,255,255,.1)}
.mk-sol-col:hover{background:rgba(255,255,255,.04);transform:translateY(-3px)}
.mk-sol-bar{height:3px;border-radius:99px;margin-bottom:14px}
.mk-sol-img{height:120px;border-radius:12px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;box-shadow:0 6px 20px rgba(0,0,0,.25);transition:.25s}
.mk-sol-img:hover{transform:scale(1.04);box-shadow:0 12px 32px rgba(0,0,0,.4)}
.mk-sol-img-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:blur(4px);transform:scale(1.1);transition:filter .3s}
.mk-sol-img:hover .mk-sol-img-bg{filter:blur(0) brightness(1.15)}
.mk-sol-label{position:relative;z-index:2;color:#fff;font-size:18px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;text-align:center;padding:0 8px;filter:drop-shadow(0 4px 14px rgba(0,0,0,.5))}
.mk-sol-desc{font-size:12px;color:rgba(255,255,255,.55);line-height:1.7;margin:14px 0 12px;flex:1}
.mk-sol-link{font-size:12px;font-weight:700;color:#4B8EFF;text-decoration:none;display:inline-flex;align-items:center;gap:5px;transition:.15s}
.mk-sol-link:hover{color:#80AEFF;gap:9px}
/* ── Industries ── */
.mk-ind-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px}
.mk-ind-eyebrow{margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.13em;color:#4B8EFF;text-transform:uppercase}
.mk-ind-title{margin:0;font-size:22px;font-weight:800;color:#fff}
.mk-ind-divider{height:1px;background:rgba(255,255,255,.07);margin-bottom:18px}
.mk-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.mk-ind-card{display:flex;align-items:flex-start;gap:14px;padding:14px 16px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);text-decoration:none;transition:.15s}
.mk-ind-card:hover{background:rgba(75,142,255,.12);border-color:rgba(75,142,255,.35);transform:translateY(-2px)}
.mk-ind-icon{flex-shrink:0;width:36px;height:36px;border-radius:8px;background:rgba(75,142,255,.15);border:1px solid rgba(75,142,255,.2);display:flex;align-items:center;justify-content:center;color:#4B8EFF}
.mk-ind-name{font-size:15px;font-weight:700;color:#fff;margin:0 0 4px}
.mk-ind-desc{font-size:12px;color:rgba(255,255,255,.5);line-height:1.5;margin:0}
/* ── Mobile menu ── */
.mk-mobile{display:none;flex-direction:column;width:min(1180px,calc(100% - 32px));margin:8px auto 0;border-radius:14px;background:linear-gradient(135deg,rgba(${accentRgb},.5) 0%,rgba(10,9,8,1) 45%);border:1px solid rgba(${accentRgb},.3);backdrop-filter:blur(20px);overflow:hidden;font-family:'Plus Jakarta Sans',sans-serif}
.mk-mobile.open{display:flex}
.mk-mob-row{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;font-size:13.5px;color:rgba(255,255,255,.75);text-decoration:none;border-bottom:1px solid rgba(255,255,255,.05);background:none;border-left:none;border-right:none;border-top:none;cursor:pointer;width:100%;text-align:left;font-family:inherit;transition:.15s}
.mk-mob-row:hover{color:#fff;background:rgba(255,255,255,.05)}
.mk-mob-acc{overflow:hidden;max-height:0;transition:max-height .28s cubic-bezier(.4,0,.2,1)}
.mk-mob-acc.open{max-height:600px}
.mk-mob-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 12px 12px}
.mk-mob-card{display:flex;flex-direction:column;gap:5px;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.04);text-decoration:none;transition:.15s}
.mk-mob-card:hover{background:rgba(75,142,255,.1);border-color:rgba(75,142,255,.3)}
.mk-mob-card-icon{width:30px;height:30px;border-radius:8px;background:rgba(75,142,255,.15);border:1px solid rgba(75,142,255,.2);display:flex;align-items:center;justify-content:center;color:#4B8EFF;margin-bottom:2px}
.mk-mob-card-name{font-size:12.5px;font-weight:700;color:#fff;line-height:1.3}
.mk-mob-card-desc{font-size:11px;color:rgba(255,255,255,.5);line-height:1.4}
.mk-mob-cta{padding:12px;border-top:1px solid rgba(255,255,255,.05)}
.mk-mob-cta a{display:block;text-align:center;background:var(--nav-accent);color:#fff;font-size:13.5px;font-weight:600;padding:10px;border-radius:7px;text-decoration:none;transition:.15s}
.mk-mob-cta a:hover{filter:brightness(1.1)}
@media(max-width:1024px){.mk-nav-links{display:none}.mk-nav-toggle{display:flex}}
</style>`;
}

// ─── HTML ─────────────────────────────────────────────────────────────────────
function buildNavHTML() {
  const tabBtns = TABS.map((t, i) =>
    `<button class="mk-tab${i===0?' active':''}" data-key="${t.key}">${t.label}</button>`
  ).join('');

  const solCards = SOLUTIONS.map(solCard).join('\n');
  const indCards = INDUSTRIES.map(indCard).join('\n');
  const mobSvcCards = MOB_SVC.map(mobSvcCard).join('\n');
  const mobSolCards = SOLUTIONS.map(s =>
    `<a class="mk-mob-card" href="${s.href}" target="_blank" rel="noopener noreferrer"><div class="mk-mob-card-icon" style="background:${s.accentBar}">${icon('bolt')}</div><span class="mk-mob-card-name">${s.heading}</span><span class="mk-mob-card-desc">${s.desc.slice(0,55)}&hellip;</span></a>`
  ).join('\n');
  const mobIndCards = INDUSTRIES.map(i =>
    `<a class="mk-mob-card" href="${i.href}"><div class="mk-mob-card-icon">${icon(i.icon)}</div><span class="mk-mob-card-name">${i.label}</span><span class="mk-mob-card-desc">${i.desc}</span></a>`
  ).join('\n');

  // Inline SVG icon strings for the JS block
  const iconJs = Object.entries(ICONS)
    .map(([k,v]) => `    ${k}: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">${v}</svg>'`)
    .join(',\n');

  const svcDataJs = JSON.stringify(SERVICES, null, 0);

  return `<div class="mk-nav-wrap">
  <div class="mk-nav-pill">
    <nav class="mk-nav" aria-label="Primary">
      <a href="/" class="mk-nav-logo" aria-label="Markition home"><img src="/markition-logo.svg" alt="Markition"></a>
      <div class="mk-nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <button class="mk-nav-drop-btn" id="mkServBtn" aria-expanded="false">Services <i class="mk-chevron">&#9660;</i></button>
        <button class="mk-nav-drop-btn" id="mkSolBtn"  aria-expanded="false">Solutions <i class="mk-chevron">&#9660;</i></button>
        <button class="mk-nav-drop-btn" id="mkIndBtn"  aria-expanded="false">Industries <i class="mk-chevron">&#9660;</i></button>
        <a href="/case-studies">Case Studies</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="mk-nav-right">
        <a href="/contact" class="mk-btn-cta">Book Free Consultation <span aria-hidden="true">&#8594;</span></a>
        <button class="mk-nav-toggle" id="mkToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>

    <!-- Services mega dropdown -->
    <div class="mk-drop" id="mkServDrop" hidden>
      <p class="mk-drop-eyebrow">All Services</p>
      <div class="mk-serv-grid">
        <div class="mk-serv-tabs" id="mkServTabs">${tabBtns}</div>
        <div class="mk-serv-items" id="mkServItems"></div>
      </div>
    </div>

    <!-- Solutions mega dropdown -->
    <div class="mk-drop" id="mkSolDrop" hidden>
      <div class="mk-sol-header">
        <div><p class="mk-sol-title">Explore Our Solutions</p><p class="mk-sol-sub">End-to-end digital &amp; AI solutions for every business need</p></div>
        <button class="mk-close-btn" id="mkSolClose">&#10005;</button>
      </div>
      <div class="mk-divider"></div>
      <div class="mk-sol-grid">
${solCards}
      </div>
    </div>

    <!-- Industries dropdown -->
    <div class="mk-drop" id="mkIndDrop" hidden>
      <div class="mk-ind-header">
        <div><p class="mk-ind-eyebrow">Industry-Specific Marketing</p><p class="mk-ind-title">Choose Your Industry</p></div>
        <button class="mk-close-btn" id="mkIndClose">&#10005;</button>
      </div>
      <div class="mk-ind-divider"></div>
      <div class="mk-ind-grid">
${indCards}
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div class="mk-mobile" id="mkMobile">
    <a href="/" class="mk-mob-row">Home</a>
    <a href="/about" class="mk-mob-row">About</a>
    <button class="mk-mob-row" onclick="mkAcc('mkMobServAcc',this)">Services <i class="mk-chevron">&#9660;</i></button>
    <div class="mk-mob-acc" id="mkMobServAcc"><div class="mk-mob-grid">${mobSvcCards}</div></div>
    <button class="mk-mob-row" onclick="mkAcc('mkMobSolAcc',this)">Solutions <i class="mk-chevron">&#9660;</i></button>
    <div class="mk-mob-acc" id="mkMobSolAcc"><div class="mk-mob-grid">${mobSolCards}</div></div>
    <button class="mk-mob-row" onclick="mkAcc('mkMobIndAcc',this)">Industries <i class="mk-chevron">&#9660;</i></button>
    <div class="mk-mob-acc" id="mkMobIndAcc"><div class="mk-mob-grid">${mobIndCards}</div></div>
    <a href="/case-studies" class="mk-mob-row">Case Studies</a>
    <a href="/portfolio" class="mk-mob-row">Portfolio</a>
    <a href="/contact" class="mk-mob-row">Contact</a>
    <div class="mk-mob-cta"><a href="/contact">Book Free Consultation &#8594;</a></div>
  </div>
</div>
<script>
(function(){
  var SVC=${svcDataJs};
  var ICO={
${iconJs}
  };
  var activeTab='tech';
  var timers={};

  function renderItems(key){
    var el=document.getElementById('mkServItems');
    if(!el)return;
    el.innerHTML=(SVC[key]||[]).map(function(it){
      return '<a class="mk-svc-item" href="'+(it.href||'#')+'" target="_blank" rel="noopener noreferrer"><div class="mk-svc-icon">'+(ICO[it.icon]||ICO.star)+'</div><span class="mk-svc-name">'+it.name+'</span></a>';
    }).join('');
  }

  function openDrop(id){
    ['mkServDrop','mkSolDrop','mkIndDrop'].forEach(function(d){
      var el=document.getElementById(d);
      if(el)el.hidden=(d!==id);
    });
    ['mkServBtn','mkSolBtn','mkIndBtn'].forEach(function(b){
      var el=document.getElementById(b);
      if(el)el.classList.toggle('open',b===id.replace('Drop','Btn'));
    });
    if(id==='mkServDrop')renderItems(activeTab);
  }

  function closeAll(){
    ['mkServDrop','mkSolDrop','mkIndDrop'].forEach(function(d){
      var el=document.getElementById(d);
      if(el)el.hidden=true;
    });
    ['mkServBtn','mkSolBtn','mkIndBtn'].forEach(function(b){
      var el=document.getElementById(b);
      if(el)el.classList.remove('open');
    });
  }

  function delay(key,fn){clearTimeout(timers[key]);timers[key]=setTimeout(fn,150);}
  function cancel(key){clearTimeout(timers[key]);}

  [['mkServBtn','mkServDrop'],['mkSolBtn','mkSolDrop'],['mkIndBtn','mkIndDrop']].forEach(function(pair){
    var btn=document.getElementById(pair[0]);
    var drop=document.getElementById(pair[1]);
    if(!btn||!drop)return;
    btn.addEventListener('click',function(){drop.hidden?openDrop(pair[1]):closeAll();});
    btn.addEventListener('mouseenter',function(){cancel('c');openDrop(pair[1]);});
    btn.addEventListener('mouseleave',function(){delay('c',closeAll);});
    drop.addEventListener('mouseenter',function(){cancel('c');});
    drop.addEventListener('mouseleave',function(){delay('c',closeAll);});
  });

  var tabsEl=document.getElementById('mkServTabs');
  if(tabsEl){
    tabsEl.addEventListener('click',function(e){
      var b=e.target.closest('.mk-tab');if(!b)return;
      tabsEl.querySelectorAll('.mk-tab').forEach(function(t){t.classList.remove('active');});
      b.classList.add('active');activeTab=b.dataset.key;renderItems(activeTab);
    });
    tabsEl.addEventListener('mouseover',function(e){
      var b=e.target.closest('.mk-tab');if(!b)return;
      tabsEl.querySelectorAll('.mk-tab').forEach(function(t){t.classList.remove('active');});
      b.classList.add('active');activeTab=b.dataset.key;renderItems(activeTab);
    });
  }

  document.getElementById('mkSolClose')&&document.getElementById('mkSolClose').addEventListener('click',closeAll);
  document.getElementById('mkIndClose')&&document.getElementById('mkIndClose').addEventListener('click',closeAll);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll();});

  document.getElementById('mkToggle')&&document.getElementById('mkToggle').addEventListener('click',function(){
    var mob=document.getElementById('mkMobile');
    var open=mob.classList.toggle('open');
    this.setAttribute('aria-expanded',open);
    closeAll();
  });
})();

function mkAcc(id,btn){
  var acc=document.getElementById(id);
  var open=acc.classList.toggle('open');
  var ch=btn.querySelector('.mk-chevron');
  if(ch)ch.style.transform=open?'rotate(180deg)':'';
}
</script>`;
}

// ─── Inject into each file ───────────────────────────────────────────────────
PAGES.forEach(function({ file, accent, accentRgb }) {
  const filePath = path.join(DIR, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Replace the nav CSS portion of the <style> block.
  //    The block starts with "<style>\n.mk-nav-wrap" and the footer CSS starts with ".mk-footer{".
  //    Strategy: find the <style> tag that owns ".mk-nav-wrap", pull out footer CSS, rebuild.
  const styleTag = '<style>\n.mk-nav-wrap';
  const si = html.indexOf(styleTag);
  if (si === -1) { console.warn('  ⚠ no nav style block found in', file); }
  else {
    // Find where footer CSS starts inside this block
    const footerMk = '.mk-footer{';
    const fi = html.indexOf(footerMk, si);
    // Find the closing </style> after the footer CSS
    const styleClose = '</style>';
    const ei = html.indexOf(styleClose, fi) + styleClose.length;

    const footerCSS = html.slice(fi, ei - styleClose.length); // everything from .mk-footer up to </style>
    const before = html.slice(0, si);
    const after  = html.slice(ei);

    html = before
      + buildCSS(accent, accentRgb) + '\n'
      + '<style>\n' + footerCSS + '</style>'
      + after;
    console.log('  ✓ CSS replaced in', file);
  }

  // 2. Replace the old nav HTML block.
  //    It starts with "<div class=\"mk-nav-wrap\">" and ends with "</div>\n\n<section" (or </div>\n<section).
  const navStart = '<div class="mk-nav-wrap">';
  const nsi = html.indexOf(navStart);
  if (nsi === -1) { console.warn('  ⚠ no nav HTML found in', file); }
  else {
    // Find the closing </div> of mk-nav-wrap.
    // The old structure is: <div class="mk-nav-wrap"><nav>...</nav><div class="mk-nav-mobile">...</div></div>
    // Count nesting depth to find the correct closing tag.
    let depth = 0;
    let pos = nsi;
    let closingIdx = -1;
    while (pos < html.length) {
      const nextOpen  = html.indexOf('<div', pos);
      const nextClose = html.indexOf('</div>', pos);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) { closingIdx = nextClose + '</div>'.length; break; }
        pos = nextClose + 6;
      }
    }
    if (closingIdx === -1) { console.warn('  ⚠ could not find closing </div> for nav in', file); }
    else {
      const before = html.slice(0, nsi);
      const after  = html.slice(closingIdx);
      html = before + buildNavHTML() + after;
      console.log('  ✓ HTML replaced in', file);
    }
  }

  // 3. Remove the old nav toggle JS snippet.
  const oldToggle = '(function(){\n  var btn=document.getElementById(\'mkNavToggle\');\n  var menu=document.getElementById(\'mkNavMobile\');';
  const ti = html.indexOf(oldToggle);
  if (ti !== -1) {
    const endToggle = '})();';
    const tei = html.indexOf(endToggle, ti) + endToggle.length;
    html = html.slice(0, ti) + html.slice(tei);
    console.log('  ✓ old toggle JS removed from', file);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✓ Done:', file, '\n');
});

console.log('All industry pages updated.');
