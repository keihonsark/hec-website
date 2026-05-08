"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import GoogleG from "./icons/GoogleG";

/* Routes that should display a minimal nav (logo + click-to-call only) */
const MINIMAL_NAV_ROUTES = ["/windows-offer"];

/* Per-route phone overrides for click-to-call (CallRail tracking numbers).
   When omitted, falls back to the site default. */
const PHONE_OVERRIDES: Record<string, { display: string; href: string }> = {
  "/windows-offer": { display: "(559) 272-3992", href: "tel:+15592723992" },
};

const flatNavLinks = [
  { label: "Windows", href: "/windows" },
  { label: "Roofing", href: "/roofing" },
  { label: "HVAC", href: "/hvac" },
  { label: "Insulation", href: "/insulation" },
  { label: "Outdoor Living", href: "/outdoor" },
  { label: "Paint", href: "/paint" },
];

interface AboutChild {
  label: string;
  href: string;
  desc: string;
  showGoogleG?: boolean;
}

const aboutChildren: AboutChild[] = [
  {
    label: "Our Story",
    href: "/about",
    desc: "Who we are & what we stand for",
  },
  {
    label: "Reviews",
    href: "/reviews",
    desc: "228+ verified Google reviews",
    showGoogleG: true,
  },
];

function ChevronDown({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const aboutTriggerRef = useRef<HTMLButtonElement>(null);
  const aboutItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname() || "";
  const isMinimal = MINIMAL_NAV_ROUTES.some((r) => pathname.startsWith(r));
  const phone = PHONE_OVERRIDES[pathname] ?? { display: "(559) 215-8516", href: "tel:+15592158516" };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAboutOpen(true);
      // focus first item after the panel renders
      requestAnimationFrame(() => aboutItemRefs.current[0]?.focus());
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setAboutOpen((v) => !v);
    } else if (e.key === "Escape") {
      setAboutOpen(false);
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, idx: number) => {
    const len = aboutChildren.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      aboutItemRefs.current[(idx + 1) % len]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      aboutItemRefs.current[(idx - 1 + len) % len]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setAboutOpen(false);
      aboutTriggerRef.current?.focus();
    } else if (e.key === "Tab") {
      // Tabbing past the last item closes the dropdown
      if (idx === len - 1 && !e.shiftKey) {
        setAboutOpen(false);
      } else if (idx === 0 && e.shiftKey) {
        setAboutOpen(false);
      }
    }
  };

  /* ─── Minimal nav for focused landing pages ─── */
  if (isMinimal) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-orange z-[60]" />
        <nav className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[72px]">
              <a href="/" className="flex-shrink-0"><Logo height={48} /></a>
              <a
                href={phone.href}
                className="inline-flex items-center gap-2 bg-orange text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-orange-dark transition-colors cta-press"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {phone.display}
              </a>
            </div>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-orange z-[60]" />

      <nav className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <a href="/" className="flex-shrink-0"><Logo height={48} /></a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {flatNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-navy/80 hover:text-orange font-medium text-[15px] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* About dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button
                  ref={aboutTriggerRef}
                  type="button"
                  onClick={() => setAboutOpen((v) => !v)}
                  onKeyDown={handleTriggerKeyDown}
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                  className="flex items-center gap-1 text-navy/80 hover:text-orange font-medium text-[15px] transition-colors cursor-pointer"
                >
                  About
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      aboutOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Bridge + panel — pt-2 keeps cursor "inside" parent during gap traversal */}
                <div
                  className={`absolute top-full left-0 pt-2 transition-opacity duration-150 ${
                    aboutOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  role="menu"
                  aria-label="About"
                >
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[220px]">
                    {aboutChildren.map((item, i) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        ref={(el) => {
                          aboutItemRefs.current[i] = el;
                        }}
                        onClick={() => setAboutOpen(false)}
                        onKeyDown={(e) => handleItemKeyDown(e, i)}
                        role="menuitem"
                        className="block px-5 py-3 text-navy font-medium text-sm hover:bg-gray-50 hover:text-orange transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.showGoogleG && <GoogleG className="w-4 h-4" />}
                        </span>
                        <span className="block text-gray-500 text-xs font-normal mt-0.5">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-5">
              <a href="/#financing" className="text-navy/80 hover:text-orange font-medium text-[15px] transition-colors">$0 Down Financing</a>
              <a href="/#estimate-form" className="text-orange hover:text-orange-dark font-semibold text-[15px] transition-colors">Free Estimate</a>
              <a href="tel:+15592158516" className="inline-flex items-center gap-2 bg-orange text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-orange-dark transition-colors cta-press">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (559) 215-8516
              </a>
            </div>

            {/* Mobile hamburger */}
            <button className="md:hidden p-2 text-navy" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden fixed inset-0 top-[74px] bg-white z-40 overflow-y-auto transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col p-6 gap-2">
            {/* Flat nav links */}
            {flatNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-navy font-semibold text-lg py-3 border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* About expandable section */}
            <div>
              <button
                type="button"
                onClick={() => setMobileAboutExpanded((v) => !v)}
                aria-expanded={mobileAboutExpanded}
                className="w-full flex items-center justify-between text-navy font-semibold text-lg py-3 border-b border-gray-100 cursor-pointer"
              >
                <span>About</span>
                <ChevronDown
                  className={`w-5 h-5 text-orange transition-transform duration-200 ${
                    mobileAboutExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileAboutExpanded && (
                <div className="pl-6 py-2 border-b border-gray-100">
                  {aboutChildren.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5"
                    >
                      <span className="flex items-center gap-2 text-navy/85 font-medium text-base">
                        <span>{item.label}</span>
                        {item.showGoogleG && <GoogleG className="w-4 h-4" />}
                      </span>
                      <span className="block text-gray-500 text-xs mt-0.5">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="/#financing" className="text-navy font-semibold text-lg py-3 border-b border-gray-100" onClick={() => setMobileOpen(false)}>$0 Down Financing</a>
            <a href="/#estimate-form" className="text-orange font-semibold text-lg py-3 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Free Estimate</a>

            <a href="tel:+15592158516" className="mt-4 flex items-center justify-center gap-2 bg-orange text-white px-6 py-4 rounded-xl font-bold text-lg cta-press" onClick={() => setMobileOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call (559) 215-8516
            </a>
            <a href="/#estimate-form" className="flex items-center justify-center bg-navy text-white px-6 py-4 rounded-xl font-bold text-lg cta-press" onClick={() => setMobileOpen(false)}>Get Free Estimate</a>
          </div>
        </div>
      </nav>
    </>
  );
}
