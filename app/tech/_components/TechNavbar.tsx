"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" }
];

export function TechNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="tp-site-header">
      <nav className="tp-nav-pill" aria-label="Primary navigation">
        <a className="tp-brand-mark" href="/" aria-label="Markition home">
          <Image src="/markition-logo.svg" alt="Markition" width={110} height={26} priority style={{ filter: "invert(1)" }} />
        </a>

        <div className="tp-desktop-nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="tp-nav-actions">
          <a className="tp-ghost-action" href="#contact">
            Free Consultation
          </a>
          <a className="tp-primary-action" href="#contact">
            Start a Project
          </a>
          <button
            className="tp-menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="tp-mobile-nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="tp-mobile-cta" href="#contact" onClick={() => setIsOpen(false)}>
            Start a Project
          </a>
        </div>
      )}
    </header>
  );
}
