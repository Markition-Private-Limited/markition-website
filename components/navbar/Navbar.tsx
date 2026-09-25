"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { ChevronDown, HamburgerIcon } from "@/lib/icons";

const navGlassStyle: React.CSSProperties = {
  background: "rgba(8, 16, 52, 0.5)",
  backdropFilter: "blur(20px) saturate(1.8)",
  WebkitBackdropFilter: "blur(20px) saturate(1.8)",
  boxShadow: "0 2px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(100,150,255,0.06)",
};

type ServiceItem = { icon: string; name: string; description: string; href?: string };

type ServiceContent = { title: string; items: ServiceItem[] };

const SERVICES_MENU = {
  mainLinks: ["Tech Solution", "Digital Marketing", "Enterprise Solution", "AI Solutions", "Industry Solutions"],
  content: {
    "Tech Solution": {
      title: "Tech Solutions We Offer",
      items: [
        { icon: "code",     name: "Software Development",    description: "Custom web, mobile & SaaS platforms built to scale.",        href: "/tech#services" },
        { icon: "building", name: "Enterprise Solution",     description: "ERP, CRM & operational systems for large enterprises.",        href: "/tech#solutions" },
        { icon: "mobile",   name: "Mobile App Engineering",  description: "Cross-platform iOS & Android apps with native performance.",   href: "/tech#services" },
        { icon: "cloud",    name: "SaaS Platforms",          description: "Multi-tenant SaaS products from MVP to full launch.",          href: "/tech#services" },
        { icon: "chart",    name: "Web Apps & Portals",      description: "Performant, SEO-optimised web applications & portals.",        href: "/tech#services" },
        { icon: "cart",     name: "Commerce & Marketplaces", description: "E-commerce stores, B2B portals & marketplace platforms.",      href: "/tech#services" },
      ],
    },
    "Digital Marketing": {
      title: "Digital Marketing Services",
      items: [
        { icon: "bolt",     name: "Google Ads",                    description: "High-ROI PPC campaigns managed by certified specialists." },
        { icon: "chart",    name: "Social Media Marketing",        description: "Strategic social campaigns that drive engagement & growth." },
        { icon: "seo",      name: "On-Page SEO",                   description: "Technical & content optimisations to rank higher on Google." },
        { icon: "link",     name: "Off-Page SEO",                  description: "Authority-building link strategies that lift domain rating." },
        { icon: "pen",      name: "Brand Identity & Design",       description: "Logos, colour systems & brand guidelines that stand out." },
        { icon: "megaphone",name: "Social Media Page Management",  description: "Consistent posting, community management & analytics." },
      ],
    },
    "Enterprise Solution": {
      title: "Enterprise Solutions We Offer",
      items: [
        { icon: "building", name: "ERP & Odoo Suite",      description: "End-to-end ERP deployments tailored to your operations." },
        { icon: "code",     name: "CRM Development",       description: "Custom CRM systems that streamline your sales pipeline." },
        { icon: "bolt",     name: "Operation Systems",     description: "Workflow & process automation for operational efficiency." },
        { icon: "chart",    name: "Payroll Outsourcing",   description: "Accurate, compliant payroll management at scale." },
        { icon: "lock",     name: "HR Automation",         description: "Digital HR systems for onboarding, attendance & leaves." },
        { icon: "mobile",   name: "Attendance Systems",    description: "Biometric & digital attendance solutions for teams." },
      ],
    },
    "AI Solutions": {
      title: "AI Solutions We Offer",
      items: [
        { icon: "robot",  name: "AI Agents",          description: "Intelligent agents that automate tasks & drive business outcomes." },
        { icon: "star",   name: "Generative AI",      description: "Gen AI solutions that create content, automate & innovate." },
        { icon: "chat",   name: "AI Chatbots",        description: "Smart chatbots that enhance customer experience & engagement." },
        { icon: "bolt",   name: "Workflow Automation", description: "End-to-end automation pipelines for complex business processes." },
        { icon: "cloud",  name: "LLM Integration",    description: "Seamlessly integrate large language models into your systems." },
        { icon: "lock",   name: "RAG Pipelines",      description: "Retrieval-augmented generation for accurate, grounded AI answers." },
      ],
    },
    "Industry Solutions": {
      title: "Industry Solutions We Offer",
      items: [
        { icon: "chart",    name: "Fintech Solutions",        description: "Secure, scalable financial technology platforms & apps." },
        { icon: "building", name: "Healthcare Solutions",     description: "Digital health platforms, EMR & patient engagement tools." },
        { icon: "cart",     name: "Retail & E-Commerce",      description: "Omnichannel retail platforms that drive conversions." },
        { icon: "bolt",     name: "Transportation Solutions", description: "Fleet management, logistics & route optimisation systems." },
        { icon: "code",     name: "Real Estate Tech",         description: "Property listing, CRM & transaction management platforms." },
        { icon: "mobile",   name: "EdTech Platforms",         description: "LMS, course delivery & e-learning solutions at scale." },
      ],
    },
  } as Record<string, ServiceContent>,
  card: {
    title: "Why Choose Us as Your Trusted Digital Growth Partner",
    body: "We go beyond delivering projects — we build digital experiences that drive growth, aligned with your business goals.",
  },
};

const SOLUTIONS_MENU = [
  {
    heading: "Media",
    gradient: "radial-gradient(ellipse at 25% 60%, #ffffff 0%, #20D9FF 40%, #1236E8 100%)",
    accentBar: "linear-gradient(90deg, #20D9FF, #1236E8)",
    icon: "megaphone",
    description: "Google Ads, SEO, social media management & paid campaigns that turn traffic into measurable growth.",
    linkText: "Explore Media",
    href: "/media",
  },
  {
    heading: "Technologies",
    gradient: "linear-gradient(135deg, #1236E8 0%, #20D9FF 100%)",
    accentBar: "linear-gradient(90deg, #1236E8, #20D9FF)",
    icon: "code",
    description: "Custom software, web apps, mobile platforms & SaaS products engineered for scale and peak performance.",
    linkText: "Explore Technologies",
    href: "/tech",
  },
  {
    heading: "Design Lab",
    gradient: "linear-gradient(220deg, #20D9FF 0%, #1236E8 50%, #20D9FF 100%)",
    accentBar: "linear-gradient(90deg, #20D9FF, #1236E8, #20D9FF)",
    icon: "pen",
    description: "Brand identity, UI/UX design, motion graphics & print — creative work that makes your brand impossible to ignore.",
    linkText: "Explore Design Lab",
    href: "/design-lab",
    newTab: true,
  },
  {
    heading: "SPHENO AI",
    gradient: "radial-gradient(ellipse at 75% 25%, #ffffff 0%, #20D9FF 35%, #1236E8 100%)",
    accentBar: "linear-gradient(90deg, #1236E8, #20D9FF, #1236E8)",
    icon: "robot",
    description: "AI agents, chatbots, voice AI & workflow automation that make your business operate intelligently.",
    linkText: "Explore SPHENO AI",
  },
];

function ServiceIcon({ type }: { type: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<string, React.ReactNode> = {
    code:      <><polyline points="16 18 22 12 16 6" {...s}/><polyline points="8 6 2 12 8 18" {...s}/></>,
    star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" {...s}/>,
    chart:     <><line x1="18" y1="20" x2="18" y2="10" {...s}/><line x1="12" y1="20" x2="12" y2="4" {...s}/><line x1="6" y1="20" x2="6" y2="14" {...s}/></>,
    building:  <><rect x="3" y="3" width="18" height="18" rx="2" {...s}/><path d="M9 3v18M3 9h6M3 15h6M15 9h3M15 15h3" {...s}/></>,
    mobile:    <><rect x="5" y="2" width="14" height="20" rx="2" {...s}/><line x1="12" y1="18" x2="12.01" y2="18" {...s}/></>,
    cloud:     <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" {...s}/>,
    bolt:      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...s}/>,
    pen:       <><path d="M12 20h9" {...s}/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" {...s}/></>,
    robot:     <><rect x="3" y="11" width="18" height="10" rx="2" {...s}/><circle cx="9" cy="16" r="1" {...s}/><circle cx="15" cy="16" r="1" {...s}/><path d="M8 11V7a4 4 0 0 1 8 0v4" {...s}/></>,
    chat:      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" {...s}/>,
    lock:      <><rect x="3" y="11" width="18" height="11" rx="2" {...s}/><path d="M7 11V7a5 5 0 0 1 10 0v4" {...s}/></>,
    cart:      <><circle cx="9" cy="21" r="1" {...s}/><circle cx="20" cy="21" r="1" {...s}/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" {...s}/></>,
    seo:       <><circle cx="11" cy="11" r="8" {...s}/><line x1="21" y1="21" x2="16.65" y2="16.65" {...s}/></>,
    link:      <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...s}/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...s}/></>,
    megaphone: <><path d="M3 11l19-9-9 19-2-8-8-2z" {...s}/></>,
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      {icons[type] ?? icons.star}
    </svg>
  );
}

export default function Navbar() {
  const router = useRouter();

  function openSolution(sol: (typeof SOLUTIONS_MENU)[number]) {
    if (!sol.href) return;
    if ("newTab" in sol && sol.newTab) {
      window.open(sol.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(sol.href);
    }
  }

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [activeService, setActiveService] = useState("Tech Solution");
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const INDUSTRIES = [
    { label: "Dental", href: "/industries/dental", icon: "🦷", desc: "Google Ads, SEO & lead gen for dental practices" },
    { label: "Healthcare", href: "/industries/healthcare", icon: "🏥", desc: "Digital marketing for clinics & health providers" },
    { label: "Real Estate", href: "/industries/real-estate", icon: "🏠", desc: "Lead generation for agents & property developers" },
    { label: "Legal", href: "/industries/legal", icon: "⚖️", desc: "Client acquisition for law firms & attorneys" },
  ];

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setServicesOpen(false); setSolutionsOpen(false); setIndustriesOpen(false); }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="sticky top-0 z-50 px-4 sm:px-6 pt-2 sm:pt-3" ref={dropdownRef}>
      <nav
        className="w-full flex items-center justify-between px-5 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/[0.08] gap-4"
        style={navGlassStyle}
      >
        {/* Logo */}
        <Image
          src="/markition-logo.svg"
          alt="Markition"
          width={120}
          height={28}
          priority
          className="h-[26px] sm:h-[28px] w-auto flex-shrink-0"
        />

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[13px] text-white font-normal flex-1 justify-center">
          {NAV_LINKS.map((link) => {
            const isServices   = link.label === "Services";
            const isSolutions  = link.label === "Solutions";
            const isIndustries = link.label === "Industries";
            if (isIndustries) return (
              <button
                key={link.label}
                onClick={() => { setIndustriesOpen((v) => !v); setServicesOpen(false); setSolutionsOpen(false); }}
                className="hover:text-white/95 transition-colors duration-150 flex items-center gap-1 whitespace-nowrap px-2.5 py-1.5 rounded-lg hover:bg-white/[0.05] text-[13px] font-normal"
                style={{ background: "none", border: "none", cursor: "pointer", color: industriesOpen ? "#ffffff" : "inherit" }}
              >
                {link.label}
                <span style={{ display: "inline-flex", transition: "transform 0.2s", transform: industriesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <ChevronDown />
                </span>
              </button>
            );
            if (isServices) return (
              <button
                key={link.label}
                onClick={() => { setServicesOpen((v) => !v); setSolutionsOpen(false); }}
                className="hover:text-white/95 transition-colors duration-150 flex items-center gap-1 whitespace-nowrap px-2.5 py-1.5 rounded-lg hover:bg-white/[0.05] text-[13px] font-normal"
                style={{ background: "none", border: "none", cursor: "pointer", color: servicesOpen ? "#ffffff" : "inherit" }}
              >
                {link.label}
                <span style={{ display: "inline-flex", transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <ChevronDown />
                </span>
              </button>
            );
            if (isSolutions) return (
              <button
                key={link.label}
                onClick={() => { setSolutionsOpen((v) => !v); setServicesOpen(false); }}
                className="hover:text-white/95 transition-colors duration-150 flex items-center gap-1 whitespace-nowrap px-2.5 py-1.5 rounded-lg hover:bg-white/[0.05] text-[13px] font-normal"
                style={{ background: "none", border: "none", cursor: "pointer", color: solutionsOpen ? "#ffffff" : "inherit" }}
              >
                {link.label}
                <span style={{ display: "inline-flex", transition: "transform 0.2s", transform: solutionsOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <ChevronDown />
                </span>
              </button>
            );
            return (
              <a
                key={link.label}
                href="#"
                className="hover:text-white/95 transition-colors duration-150 flex items-center gap-1 whitespace-nowrap px-2.5 py-1.5 rounded-lg hover:bg-white/[0.05]"
              >
                {link.label}
                {"dropdown" in link && link.dropdown && <ChevronDown />}
              </a>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-[12.5px] font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[5px] flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Book Free Consultation</span>
            <span className="sm:hidden">Book Now</span>
            <span aria-hidden="true" className="text-[11px]">→</span>
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.08] transition-colors duration-150"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* ── Services mega dropdown ── */}
      {servicesOpen && (
        <div
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, background: "rgba(0,0,20,0.55)", backdropFilter: "blur(2px)" }}
          onClick={() => setServicesOpen(false)}
        >
          <div
            style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: "min(1160px, 96vw)", background: "linear-gradient(145deg, #060e2e 0%, #0a1540 100%)", border: "1px solid rgba(100,130,255,0.18)", borderRadius: 18, boxShadow: "0 24px 80px rgba(0,0,40,0.7)", padding: "32px 32px 28px", animation: "megaFadeIn 0.22s ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <p style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: "0.04em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)" }}>
                YOUR ONE STOP DIGITAL SOLUTION
              </p>
              <button
                onClick={() => setServicesOpen(false)}
                style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}
              >
                ✕
              </button>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 28 }} />

            {/* 3 cols + promo card */}
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 240px", gap: "0 28px" }}>

              {/* ── Col 1: Big main nav tabs ── */}
              <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)", paddingRight: 24 }}>
                {SERVICES_MENU.mainLinks.map((label) => {
                  const isActive = label === activeService;
                  return (
                    <button
                      key={label}
                      onClick={() => setActiveService(label)}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "9px 12px", fontSize: 20, fontWeight: 800,
                        color: isActive ? "#4B8EFF" : "rgba(255,255,255,0.75)",
                        background: isActive ? "rgba(75,142,255,0.1)" : "transparent",
                        border: "none", borderRadius: 8, cursor: "pointer",
                        letterSpacing: "-0.3px",
                        fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)",
                        transition: "color 0.15s, background 0.15s, transform 0.15s",
                        transform: isActive ? "translateX(4px)" : "translateX(0)",
                        borderLeft: isActive ? "3px solid #4B8EFF" : "3px solid transparent",
                        marginBottom: 2,
                      }}
                      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.transform = "translateX(4px)"; } }}
                      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.transform = "translateX(0)"; } }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* ── Middle: 2-col service card grid ── */}
              <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)", paddingRight: 28 }}>
                <p style={{ margin: "0 0 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", color: "#4B8EFF", textTransform: "uppercase", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)" }}>
                  {SERVICES_MENU.content[activeService]?.title}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
                  {(SERVICES_MENU.content[activeService]?.items ?? []).map((item) => (
                    <a
                      key={item.name}
                      href={item.href ?? "#"}
                      onClick={() => setServicesOpen(false)}
                      className="svc-card-item"
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 12,
                        padding: "12px 10px", borderRadius: 10,
                        textDecoration: "none", transition: "background 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{
                        flexShrink: 0, width: 36, height: 36, borderRadius: 8,
                        background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#4B8EFF",
                      }}>
                        <ServiceIcon type={item.icon} />
                      </div>
                      <div>
                        <p style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", lineHeight: 1.3 }}>
                          {item.name}
                        </p>
                        <p style={{ margin: 0, fontSize: 11.5, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", lineHeight: 1.55 }}>
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Promo card ── */}
              <div style={{ background: "rgba(26,71,204,0.18)", border: "1px solid rgba(100,140,255,0.2)", borderRadius: 12, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ width: "100%", height: 100, borderRadius: 8, background: "linear-gradient(135deg, #1a47cc 0%, #22c5f5 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image src="/markition-logo.svg" alt="Markition" width={90} height={24} style={{ opacity: 0.9 }} />
                </div>
                <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: "#ffffff", lineHeight: 1.4, fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)" }}>
                  {SERVICES_MENU.card.title}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.58)", lineHeight: 1.65, fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)" }}>
                  {SERVICES_MENU.card.body}
                </p>
                <a href="#" onClick={() => setServicesOpen(false)}
                  style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, background: "#1A47CC", color: "#fff", borderRadius: 999, padding: "7px 14px", fontSize: 11.5, fontWeight: 700, textDecoration: "none", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)" }}
                >
                  Get Started →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Solutions mega dropdown ── */}
      {solutionsOpen && (
        <div
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, background: "rgba(0,0,18,0.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setSolutionsOpen(false)}
        >
          <div
            style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: "min(1220px, 96vw)", background: "linear-gradient(145deg, #080e2c 0%, #0d1850 55%, #060e28 100%)", border: "1px solid rgba(100,140,255,0.22)", borderRadius: 22, boxShadow: "0 32px 100px rgba(0,0,50,0.85), inset 0 1px 0 rgba(255,255,255,0.07)", padding: "36px 36px 42px", animation: "megaFadeIn 0.22s ease", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative ambient glow orbs */}
            <div style={{ position: "absolute", top: -90, right: -60, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(75,142,255,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -110, left: 60, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,244,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "50%", left: "48%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,59,204,0.06) 0%, transparent 70%)", pointerEvents: "none", transform: "translate(-50%,-50%)" }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, position: "relative", zIndex: 1 }}>
              <div>
                <p style={{ margin: "0 0 5px", fontSize: 30, fontWeight: 800, letterSpacing: "0.02em", textTransform: "uppercase", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", background: "linear-gradient(135deg, #ffffff 30%, #4B8EFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Explore Our Solutions
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", letterSpacing: "0.01em" }}>
                  End-to-end digital &amp; AI solutions for every business need
                </p>
              </div>
              <button
                onClick={() => setSolutionsOpen(false)}
                style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, transition: "background 0.15s, color 0.15s", flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              >✕</button>
            </div>

            {/* Gradient divider */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(75,142,255,0.5) 30%, rgba(34,197,244,0.4) 70%, transparent 100%)", marginBottom: 30, position: "relative", zIndex: 1 }} />

            {/* 5-column grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 20px", position: "relative", zIndex: 1 }}>
              {SOLUTIONS_MENU.map((sol) => (
                <div
                  key={sol.heading}
                  className="sol-col"
                  style={{ display: "flex", flexDirection: "column", borderRadius: 16, padding: "14px 14px 18px", transition: "background 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {/* Colored top accent bar */}
                  <div style={{ height: 3, borderRadius: 99, background: sol.accentBar, marginBottom: 14 }} />

                  {/* Heading */}
                  <p
                    style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", letterSpacing: "-0.2px", textAlign: "center", transition: "color 0.18s, transform 0.18s", cursor: sol.href ? "pointer" : "default", transformOrigin: "center" }}
                    onClick={() => { setSolutionsOpen(false); openSolution(sol); }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#4B8EFF"; e.currentTarget.style.transform = "scale(1.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {sol.heading}
                  </p>

                  {/* Visual / image area */}
                  <div
                    className="sol-img"
                    style={{ height: 128, borderRadius: 12, background: sol.gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), filter 0.25s ease, box-shadow 0.25s ease", cursor: "pointer", overflow: "hidden", position: "relative", boxShadow: "0 6px 20px rgba(0,0,0,0.25)" }}
                    onClick={() => { setSolutionsOpen(false); openSolution(sol); }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.filter = "brightness(1.18) saturate(1.25)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)"; }}
                  >
                    {/* Moving shine sweep */}
                    <div className="sol-shine" style={{ position: "absolute", top: 0, left: "-80%", width: "55%", height: "100%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.22), transparent)", pointerEvents: "none", borderRadius: 12 }} />
                    <div style={{ color: "rgba(255,255,255,0.92)", transform: "scale(2.8)", filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.4))" }}>
                      <ServiceIcon type={sol.icon} />
                    </div>
                  </div>

                  {/* Description + link */}
                  <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255,255,255,0.58)", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", lineHeight: 1.7, flex: 1 }}>
                      {sol.description}
                    </p>
                    <a
                      href={sol.href ?? "#"}
                      target={"newTab" in sol && sol.newTab ? "_blank" : undefined}
                      rel={"newTab" in sol && sol.newTab ? "noopener noreferrer" : undefined}
                      onClick={() => setSolutionsOpen(false)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#4B8EFF", textDecoration: "none", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", transition: "gap 0.15s, color 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#80AEFF"; (e.currentTarget as HTMLAnchorElement).style.gap = "10px"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#4B8EFF"; (e.currentTarget as HTMLAnchorElement).style.gap = "6px"; }}
                    >
                      {sol.linkText} <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Industries dropdown ── */}
      {industriesOpen && (
        <div
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, background: "rgba(0,0,20,0.55)", backdropFilter: "blur(2px)" }}
          onClick={() => setIndustriesOpen(false)}
        >
          <div
            style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: "min(640px, 96vw)", background: "linear-gradient(145deg, #060e2e 0%, #0a1540 100%)", border: "1px solid rgba(100,130,255,0.18)", borderRadius: 18, boxShadow: "0 24px 80px rgba(0,0,40,0.7)", padding: "28px 28px 24px", animation: "megaFadeIn 0.22s ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <p style={{ margin: "0 0 3px", fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", color: "#4B8EFF", textTransform: "uppercase", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)" }}>INDUSTRY-SPECIFIC MARKETING</p>
                <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)" }}>Choose Your Industry</p>
              </div>
              <button onClick={() => setIndustriesOpen(false)} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>✕</button>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 20 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {INDUSTRIES.map((ind) => (
                <a
                  key={ind.label}
                  href={ind.href}
                  onClick={() => setIndustriesOpen(false)}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", transition: "background 0.15s, border-color 0.15s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(75,142,255,0.12)"; e.currentTarget.style.borderColor = "rgba(75,142,255,0.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{ind.icon}</span>
                  <div>
                    <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)" }}>{ind.label}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-jakarta,'Plus Jakarta Sans',sans-serif)", lineHeight: 1.5 }}>{ind.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .sol-col:hover .sol-shine {
          animation: solShine 0.55s ease forwards;
        }
        @keyframes solShine {
          from { left: -80%; }
          to   { left: 160%; }
        }
      `}</style>

      {/* Mobile slide-down menu */}
      <div
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? "800px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-6px)",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease, transform 0.22s ease",
        }}
      >
        <div className="w-full mt-1.5 border border-white/[0.08] overflow-hidden" style={navGlassStyle}>
          {NAV_LINKS.map((link, i) => {
            const isLast = i === NAV_LINKS.length - 1;
            const borderClass = !isLast ? "border-b border-white/[0.05]" : "";

            if (link.label === "Industries") return (
              <div key={link.label} className={borderClass}>
                <button
                  onClick={() => setMobileIndustriesOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-[13.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
                >
                  <span>Industries</span>
                  <span style={{ display: "inline-flex", transition: "transform 0.2s", transform: mobileIndustriesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <ChevronDown />
                  </span>
                </button>
                <div style={{ maxHeight: mobileIndustriesOpen ? "320px" : "0px", overflow: "hidden", transition: "max-height 0.28s cubic-bezier(0.4,0,0.2,1)" }}>
                  <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                    {INDUSTRIES.map((ind) => (
                      <a
                        key={ind.label}
                        href={ind.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex flex-col gap-1 p-3 rounded-xl border border-white/[0.07] bg-white/[0.04] hover:bg-blue-500/10 hover:border-blue-400/30 transition-colors duration-150"
                      >
                        <span className="text-xl">{ind.icon}</span>
                        <span className="text-[13px] font-bold text-white">{ind.label}</span>
                        <span className="text-[11px] text-white/50 leading-snug">{ind.desc}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );

            if (link.label === "Services") {
              const SERVICE_CARDS = [
                { icon: "code",      label: "Tech Solution",       desc: "Web, mobile & SaaS platforms built to scale",  href: "/tech" },
                { icon: "bolt",      label: "Digital Marketing",   desc: "Google Ads, SEO & social campaigns",            href: "#" },
                { icon: "building",  label: "Enterprise Solution",  desc: "ERP, CRM & operational systems",               href: "/tech#solutions" },
                { icon: "robot",     label: "AI Solutions",        desc: "Agents, chatbots & workflow automation",        href: "#" },
                { icon: "chart",     label: "Industry Solutions",  desc: "Fintech, healthcare, retail & more",            href: "#" },
              ];
              return (
                <div key={link.label} className={borderClass}>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-[13.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
                  >
                    <span>Services</span>
                    <span style={{ display: "inline-flex", transition: "transform 0.2s", transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <ChevronDown />
                    </span>
                  </button>
                  <div style={{ maxHeight: mobileServicesOpen ? "480px" : "0px", overflow: "hidden", transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
                    <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                      {SERVICE_CARDS.map((svc) => (
                        <a
                          key={svc.label}
                          href={svc.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex flex-col gap-2 p-3 rounded-xl border border-white/[0.07] bg-white/[0.04] hover:bg-blue-500/10 hover:border-blue-400/30 transition-colors duration-150"
                        >
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(75,142,255,0.15)", border: "1px solid rgba(75,142,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4B8EFF" }}>
                            <ServiceIcon type={svc.icon} />
                          </div>
                          <span className="text-[12.5px] font-bold text-white leading-snug">{svc.label}</span>
                          <span className="text-[11px] text-white/50 leading-snug">{svc.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (link.label === "Solutions") return (
              <div key={link.label} className={borderClass}>
                <button
                  onClick={() => setMobileSolutionsOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-[13.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
                >
                  <span>Solutions</span>
                  <span style={{ display: "inline-flex", transition: "transform 0.2s", transform: mobileSolutionsOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <ChevronDown />
                  </span>
                </button>
                <div style={{ maxHeight: mobileSolutionsOpen ? "440px" : "0px", overflow: "hidden", transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
                  <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                    {SOLUTIONS_MENU.map((sol) => (
                      <a
                        key={sol.heading}
                        href={sol.href ?? "#"}
                        target={"newTab" in sol && sol.newTab ? "_blank" : undefined}
                        rel={"newTab" in sol && sol.newTab ? "noopener noreferrer" : undefined}
                        onClick={() => { setMobileOpen(false); setMobileSolutionsOpen(false); }}
                        className="flex flex-col gap-2 p-3 rounded-xl border border-white/[0.07] bg-white/[0.04] hover:bg-blue-500/10 hover:border-blue-400/30 transition-colors duration-150 overflow-hidden relative"
                      >
                        <div style={{ height: 3, borderRadius: 99, background: sol.accentBar, marginBottom: 2 }} />
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: sol.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.9)", flexShrink: 0 }}>
                          <ServiceIcon type={sol.icon} />
                        </div>
                        <span className="text-[12.5px] font-bold text-white leading-snug">{sol.heading}</span>
                        <span className="text-[11px] text-white/50 leading-snug line-clamp-2">{sol.description}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );

            return (
              <a
                key={link.label}
                href="#"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-5 py-3.5 text-[13.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors duration-150 ${borderClass}`}
              >
                <span>{link.label}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-30">
                  <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            );
          })}
          <div className="p-4 border-t border-white/[0.05]">
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white text-[13.5px] font-medium px-5 py-2.5 rounded-[5px] transition-colors duration-150"
            >
              Book Free Consultation →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
