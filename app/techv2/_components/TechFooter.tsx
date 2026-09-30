import Image from "next/image";
import Link from "next/link";

const pages = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

const servicesLinks = [
  { href: "/web-development", label: "Web Development" },
  { href: "/3d-websites", label: "3D Websites" },
  { href: "/ai-automation", label: "AI Automation & Integration" },
  { href: "/custom-software-development", label: "Custom Software" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookies" },
  { href: "/refund", label: "Refund Policy" },
];

export function TechFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#080b3f] px-4 pb-20 pt-10 sm:px-6 sm:pb-32 md:pb-48 lg:px-8">
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-full -translate-x-1/2 select-none overflow-hidden">
        <h2 className="text-center text-[26vw] font-black uppercase leading-[0.65] tracking-[-0.08em] text-white sm:text-[22vw] md:text-[18vw] lg:text-[17vw]">
          Markition Tech
        </h2>
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(18,24,31,0.08) 1px, transparent 1px), linear-gradient(rgba(18,24,31,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-lg border border-black/10 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:px-8 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-6 lg:col-span-6">
              <Link href="/" className="mb-5 flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Markition Tech"
                  width={24}
                  height={24}
                  className="w-6"
                />
                <span className="text-2xl text-[#12181F] font-black tracking-[2px]">
                  Markition Tech
                </span>
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-black/55">
                Premium IT services agency specializing in web, mobile, and
                custom software development.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/markition/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-8 items-center justify-center rounded-lg border text-black/75 transition-all duration-300 hover:-translate-y-1 hover:bg-[#12181F] hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="mb-4 text-sm font-bold text-[#12181F]">Pages</h4>
              <ul className="space-y-2.5">
                {pages.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/50 transition-colors hover:text-[#062283]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="mb-4 text-sm font-bold text-[#12181F]">
                Services
              </h4>
              <ul className="space-y-2.5">
                {servicesLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/50 transition-colors hover:text-[#062283]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="mb-4 text-sm font-bold text-[#12181F]">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/50 transition-colors hover:text-[#062283]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-5 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-black/45">
              © 2026 Markition Tech. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-5">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-black/45 underline-offset-4 hover:text-[#12181F] hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
