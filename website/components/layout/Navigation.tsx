"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Small social icons for nav
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const StravaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface NavigationProps {
  variant?: "transparent" | "solid";
}

export default function Navigation({ variant = "solid" }: NavigationProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Page title mapping for mobile indicator
  const getPageTitle = (path: string): string | null => {
    const titles: Record<string, string> = {
      "/experiences": "Experiences",
      "/tours-programs": "Tours & Programs",
      "/rentals": "Rentals",
      "/about": "About",
      "/contact": "Contact",
      "/plan": "Plan",
      "/plan-tour": "Plan Tour",
      "/faq": "FAQ",
      "/terms": "Terms",
      "/privacy": "Privacy",
      "/safety": "Safety",
      "/cancellation": "Cancellation",
    };
    // Handle experience detail pages
    if (path.startsWith("/experience/")) {
      return "Experience";
    }
    return titles[path] || null;
  };

  const currentPageTitle = getPageTitle(pathname);

  const navClasses = variant === "transparent"
    ? "absolute top-0 left-0 right-0 z-50 py-5 px-10"
    : "relative z-50 bg-white shadow-sm py-5 px-10";

  const logoClasses = variant === "transparent"
    ? "!text-white"
    : "!text-[var(--color-dark)]";

  const linkClasses = variant === "transparent"
    ? "text-white hover:bg-white/10"
    : "text-[var(--color-dark)] hover:bg-black/5";

  const activeLinkClasses = variant === "transparent"
    ? "!text-[var(--color-amber)] font-semibold"
    : "!text-[var(--color-amber)] font-semibold";

  // Social icons inherit color from parent (white for transparent, dark for solid)
  // They have 50% opacity by default and full opacity + brand color on hover

  return (
    <>
    <nav className={navClasses}>
      <div className="max-w-[var(--max-width-container)] mx-auto flex justify-between items-center relative">
        {/* Logo with page title and social icons */}
        <div className="flex flex-col items-start">
          <Link
            href="/"
            className={`font-[family-name:var(--font-heading)] text-[11px] lg:text-sm font-medium tracking-[1.5px] lg:tracking-[var(--tracking-widest)] uppercase whitespace-nowrap ${logoClasses}`}
          >
            Adventure Athlete India
          </Link>
          {/* Mobile: Show page title on subpages */}
          {currentPageTitle && (
            <span
              className="lg:hidden text-[10px] font-semibold uppercase tracking-wider mt-0.5"
              style={{ color: 'var(--color-amber)' }}
            >
              {currentPageTitle}
            </span>
          )}
          {/* Mobile: Show social icons only on homepage (dark grey - subtle) */}
          {!currentPageTitle && (
            <div className="lg:hidden flex gap-2 mt-1">
              <a href="https://instagram.com/adventureathlete.in" target="_blank" rel="noopener noreferrer" style={{ color: '#374151' }} title="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com/@adventureathleteindia" target="_blank" rel="noopener noreferrer" style={{ color: '#374151' }} title="YouTube">
                <YouTubeIcon />
              </a>
              <a href="https://strava.com/athletes/atulchauhan" target="_blank" rel="noopener noreferrer" style={{ color: '#374151' }} title="Strava">
                <StravaIcon />
              </a>
              <a href="https://facebook.com/adventureathleteindia" target="_blank" rel="noopener noreferrer" style={{ color: '#374151' }} title="Facebook">
                <FacebookIcon />
              </a>
            </div>
          )}
          {/* Desktop: Social Icons below logo */}
          <div className="hidden lg:flex gap-2 mt-1">
            <a
              href="https://instagram.com/adventureathlete.in"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200"
              style={{
                color: variant === "transparent" ? "var(--color-dark)" : "var(--color-slate)",
                opacity: 0.5
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#E4405F"; e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = variant === "transparent" ? "var(--color-dark)" : "var(--color-slate)"; e.currentTarget.style.opacity = "0.5"; }}
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://youtube.com/@adventureathleteindia"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200"
              style={{
                color: variant === "transparent" ? "var(--color-dark)" : "var(--color-slate)",
                opacity: 0.5
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#FF0000"; e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = variant === "transparent" ? "var(--color-dark)" : "var(--color-slate)"; e.currentTarget.style.opacity = "0.5"; }}
              title="YouTube"
            >
              <YouTubeIcon />
            </a>
            <a
              href="https://strava.com/athletes/atulchauhan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200"
              style={{
                color: variant === "transparent" ? "var(--color-dark)" : "var(--color-slate)",
                opacity: 0.5
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#FC4C02"; e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = variant === "transparent" ? "var(--color-dark)" : "var(--color-slate)"; e.currentTarget.style.opacity = "0.5"; }}
              title="Strava"
            >
              <StravaIcon />
            </a>
            <a
              href="https://facebook.com/adventureathleteindia"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200"
              style={{
                color: variant === "transparent" ? "var(--color-dark)" : "var(--color-slate)",
                opacity: 0.5
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#1877F2"; e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = variant === "transparent" ? "var(--color-dark)" : "var(--color-slate)"; e.currentTarget.style.opacity = "0.5"; }}
              title="Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Desktop Links - per prototype: 5 nav links, hover bg white/10 for transparent, black/5 for solid */}
        <ul className="hidden lg:flex list-none gap-8">
          {[
            { href: "/experiences", label: "Experiences" },
            { href: "/tours-programs", label: "Tours & Programs" },
            { href: "/rentals", label: "Rentals" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative text-base font-medium px-4 py-2 rounded-md transition-all ${variant === "transparent" ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                style={{
                  color: isActive(link.href) ? "var(--color-amber)" : (variant === "transparent" ? "white" : "var(--color-dark)"),
                  fontWeight: isActive(link.href) ? 600 : 500
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-[2px] left-4 right-4 h-[2px] bg-[var(--color-amber)] rounded-[1px]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button - Desktop only, responsive: "Plan" at lg, full text at xl */}
        <Link href="/plan" className="btn-flag !hidden lg:!inline-block lg:!py-2 lg:!px-4 xl:!py-3 xl:!px-6">
          <span className="xl:hidden">Plan</span>
          <span className="hidden xl:inline">Plan Your Adventure</span>
        </Link>

        {/* Mobile only: Small CTA + Hamburger */}
        <div className="flex items-center gap-3 lg:!hidden">
          {/* Mobile CTA - smaller version */}
          <Link
            href="/plan"
            className="btn-flag !py-2 !px-3 !text-[10px]"
          >
            Plan
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`p-2 ${variant === "transparent" ? "text-white" : "text-[var(--color-dark)]"}`}
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

    </nav>

    {/* Mobile Menu Overlay - rendered directly without portal for reliability */}
    {isMenuOpen && (
      <div
        className="lg:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 99999
        }}
      >
        {/* Backdrop */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '280px',
            maxWidth: '80vw',
            height: '100vh',
            backgroundColor: 'white',
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
            zIndex: 100000,
            overflowY: 'auto'
          }}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-[var(--color-dark)]"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className="px-6 py-4">
            <ul className="space-y-4">
              {[
                { href: "/experiences", label: "Experiences" },
                { href: "/tours-programs", label: "Tours & Programs" },
                { href: "/rentals", label: "Rentals" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block text-lg font-medium py-2 px-3 rounded-md transition-all hover:bg-black/5 ${isActive(link.href) ? "text-[var(--color-amber)]" : "text-[var(--color-dark)]"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/plan"
                className="btn-gradient w-full text-center block"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Your Adventure
              </Link>
            </div>

            {/* Social Icons - brand colors */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'center' }}>
              <a href="https://instagram.com/adventureathlete.in" target="_blank" rel="noopener noreferrer" style={{ color: '#E4405F' }}>
                <InstagramIcon />
              </a>
              <a href="https://youtube.com/@adventureathleteindia" target="_blank" rel="noopener noreferrer" style={{ color: '#FF0000' }}>
                <YouTubeIcon />
              </a>
              <a href="https://strava.com/athletes/atulchauhan" target="_blank" rel="noopener noreferrer" style={{ color: '#FC4C02' }}>
                <StravaIcon />
              </a>
              <a href="https://facebook.com/adventureathleteindia" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2' }}>
                <FacebookIcon />
              </a>
            </div>
          </nav>
        </div>
      </div>
    )}
    </>
  );
}
