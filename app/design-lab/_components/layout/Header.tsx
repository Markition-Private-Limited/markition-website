"use client";

import { useEffect, useRef, useState } from "react";

const NAVY = "#071763";

const NAV_LINKS = [
  { label: "About",        href: "/about" },
  { label: "Services",     href: "/services",   dropdown: true },
  { label: "Industries",   href: "/industries", dropdown: true },
  { label: "Locations",    href: "/locations",  dropdown: true },
  { label: "Resources",    href: "/resources" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio",    href: "/portfolio" },
  { label: "Contact",      href: "/design-lab/contact" },
] as const;

function ChevronDown() {
  return (
    <svg width="9" height="5" viewBox="0 0 9 5" fill="none" aria-hidden="true" className="mt-px flex-shrink-0 opacity-60">
      <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-shrink-0">
      <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        style={{ transformOrigin: "10px 6px", transform: open ? "rotate(45deg) translateY(4px)" : "none", transition: "transform 0.25s ease" }} />
      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        style={{ opacity: open ? 0 : 1, transition: "opacity 0.15s ease" }} />
      <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        style={{ transformOrigin: "10px 14px", transform: open ? "rotate(-45deg) translateY(-4px)" : "none", transition: "transform 0.25s ease" }} />
    </svg>
  );
}

function StaircaseIcon() {
  return (
    <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="4.88372" height="4.88372" rx="1" fill="currentColor" />
      <rect x="5.55469" y="7" width="4.88372" height="4.88372" rx="1" fill="currentColor" />
      <rect y="14" width="4.88372" height="4.88372" rx="1" fill="currentColor" />
    </svg>
  );
}

const floatStyle: React.CSSProperties = {
  background: "rgba(8, 15, 50, 0.32)",
  backdropFilter: "blur(52px) saturate(2.8) brightness(1.1)",
  WebkitBackdropFilter: "blur(52px) saturate(2.8) brightness(1.1)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(255,255,255,0.04), 0 8px 48px rgba(0,0,0,0.18)",
};

const mobileMenuStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.07)",
  backdropFilter: "blur(52px) saturate(2.8)",
  WebkitBackdropFilter: "blur(52px) saturate(2.8)",
  border: "1px solid rgba(255,255,255,0.18)",
  boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.2)",
};

const ctaStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.24)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"light" | "dark">("dark");
  const navRef = useRef<HTMLElement>(null);
  const isLight = navTheme === "light";

  /* Track which section sits behind the floating navbar and flip the logo
     + nav text/icons to whichever variant reads best against it. */
  useEffect(() => {
    let raf = 0;

    const update = () => {
      const navRect = navRef.current?.getBoundingClientRect();
      const probeY = navRect ? navRect.top + navRect.height / 2 : 40;

      let theme: "light" | "dark" = "dark";
      const sections = document.querySelectorAll<HTMLElement>("[data-navbar-theme]");
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          theme = el.dataset.navbarTheme === "light" ? "light" : "dark";
          break;
        }
      }
      setNavTheme(theme);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("lenis-target-scroll", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("lenis-target-scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">

      {/* Floating nav box */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="max-w-[1480px] mx-auto flex items-center justify-between px-5 sm:px-8 py-4 rounded-2xl gap-4"
        style={floatStyle}
      >
        {/* Logo — links to Design Lab home; crossfades between dark/light variants
            depending on what's behind the glass navbar */}
        <a href="/design-lab" aria-label="Markition — Home" className="grid flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/design-lab/Logo_design_2.png"
            alt="Markition"
            className="[grid-area:1/1] h-[28px] sm:h-[32px] w-auto transition-opacity duration-500 ease-out"
            style={{ opacity: navTheme === "dark" ? 1 : 0 }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/design-lab/Logo_design_1.png"
            alt=""
            aria-hidden="true"
            className="[grid-area:1/1] h-[28px] sm:h-[32px] w-auto transition-opacity duration-500 ease-out"
            style={{ opacity: navTheme === "light" ? 1 : 0 }}
          />
        </a>

        {/* Desktop links — color crossfades with whatever's behind the glass */}
        <ul
          role="list"
          className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[14px] flex-1 justify-center list-none m-0 p-0 transition-colors duration-500 ease-out"
          style={{ color: isLight ? NAVY : "rgba(255,255,255,0.8)", fontWeight: isLight ? 500 : 400 }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg transition-colors duration-500 ease-out ${
                  isLight ? "hover:bg-black/[0.08]" : "hover:bg-white/[0.06] hover:text-white"
                }`}
                style={isLight ? { color: NAVY } : undefined}
              >
                {link.label}
                {"dropdown" in link && link.dropdown && <ChevronDown />}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="/design-lab/contact"
            className={`hidden sm:flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-[8px] transition-colors duration-500 ease-out whitespace-nowrap ${
              isLight ? "hover:bg-black/[0.08]" : "text-white hover:bg-white/[0.12]"
            }`}
            style={{ ...ctaStyle, color: isLight ? NAVY : "white" }}
          >
            <StaircaseIcon />
            Book Free Consultation
          </a>

          {/* Hamburger — shown below lg */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className={`lg:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-500 ease-out ${
              isLight ? "hover:bg-black/[0.08]" : "text-white hover:bg-white/[0.08]"
            }`}
            style={{ color: isLight ? NAVY : "white" }}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile slide-down */}
      <div
        id="mobile-nav"
        className="lg:hidden overflow-hidden"
        aria-hidden={!mobileOpen}
        style={{
          maxHeight: mobileOpen ? "520px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transition: "max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
        }}
      >
        <nav
          aria-label="Mobile navigation"
          className="overflow-hidden"
          style={mobileMenuStyle}
        >
          <ul role="list" className="list-none m-0 p-0">
            {NAV_LINKS.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-5 py-3.5 text-[13.5px] font-medium transition-colors duration-500 ease-out ${
                    isLight
                      ? `hover:bg-black/[0.06] ${i < NAV_LINKS.length - 1 ? "border-b border-black/[0.06]" : ""}`
                      : `text-white/75 hover:text-white hover:bg-white/[0.05] ${i < NAV_LINKS.length - 1 ? "border-b border-white/[0.05]" : ""}`
                  }`}
                  style={isLight ? { color: NAVY } : undefined}
                >
                  <span>{link.label}</span>
                  {"dropdown" in link && link.dropdown ? (
                    <ChevronDown />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-30">
                      <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div className={`p-4 border-t transition-colors duration-500 ease-out ${isLight ? "border-black/[0.05]" : "border-white/[0.05]"}`}>
            <a
              href="/design-lab/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-[13.5px] font-medium px-5 py-2.5 rounded-[6px] transition-colors duration-500 ease-out"
              style={{ ...ctaStyle, color: isLight ? NAVY : "white" }}
            >
              <StaircaseIcon />
              Book Free Consultation
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
