"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";

const roofingSubLinks = [
  { label: "Roof Replacement", href: "/roofing/replacement" },
  { label: "Roof Repair", href: "/roofing/repair" },
  { label: "Free Inspection", href: "/roofing/inspection" },
  { label: "Gutters", href: "/roofing/gutters" },
  { label: "Free Roof Estimate", href: "/estimate" },
];

const navLinks = [
  { label: "Roofing", href: "/roofing", sub: roofingSubLinks },
  { label: "HVAC", href: "/hvac", sub: null },
  { label: "Windows", href: "/windows", sub: null },
  { label: "Outdoor Living", href: "/outdoor", sub: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDrop, setDesktopDrop] = useState(false);
  const [mobileRoofExpanded, setMobileRoofExpanded] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close desktop dropdown on click outside
  useEffect(() => {
    if (!desktopDrop) return;
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDesktopDrop(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [desktopDrop]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-orange z-[60]" />

      <nav className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <a href="/" className="flex-shrink-0"><Logo height={48} /></a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.sub ? (
                  <div key={link.label} className="relative" ref={dropRef}>
                    <button
                      onClick={() => setDesktopDrop((v) => !v)}
                      className="flex items-center gap-1 text-navy/80 hover:text-orange font-medium text-[15px] transition-colors cursor-pointer"
                    >
                      {link.label}
                      <svg className={`w-3.5 h-3.5 transition-transform ${desktopDrop ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {desktopDrop && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                        <a href={link.href} className="block px-4 py-2.5 text-sm font-semibold text-navy hover:bg-light-bg hover:text-orange transition-colors"
                          onClick={() => setDesktopDrop(false)}>
                          All Roofing Services
                        </a>
                        <div className="border-t border-gray-100 my-1" />
                        {link.sub.map((sub) => (
                          <a key={sub.label} href={sub.href}
                            className={`block px-4 py-2.5 text-sm transition-colors ${sub.href === "/estimate" ? "text-orange font-semibold hover:bg-orange/5" : "text-navy/80 hover:bg-light-bg hover:text-orange"}`}
                            onClick={() => setDesktopDrop(false)}>
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a key={link.label} href={link.href} className="text-navy/80 hover:text-orange font-medium text-[15px] transition-colors">{link.label}</a>
                )
              )}
            </div>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-5">
              <a href="/estimate" className="text-orange hover:text-orange-dark font-semibold text-[15px] transition-colors">Free Roof Estimate</a>
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
            {/* Roofing with expandable sub-links */}
            <div>
              <button
                onClick={() => setMobileRoofExpanded((v) => !v)}
                className="w-full flex items-center justify-between text-navy font-semibold text-lg py-3 border-b border-gray-100 cursor-pointer"
              >
                Roofing
                <svg className={`w-4 h-4 text-orange transition-transform ${mobileRoofExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {mobileRoofExpanded && (
                <div className="pl-4 py-1">
                  <a href="/roofing" className="block py-2 text-navy/70 text-base font-medium" onClick={() => setMobileOpen(false)}>All Roofing Services</a>
                  {roofingSubLinks.map((sub) => (
                    <a key={sub.label} href={sub.href}
                      className={`block py-2 text-base font-medium ${sub.href === "/estimate" ? "text-orange" : "text-navy/70"}`}
                      onClick={() => setMobileOpen(false)}>
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Other nav links */}
            {navLinks.filter((l) => !l.sub).map((link) => (
              <a key={link.label} href={link.href} className="text-navy font-semibold text-lg py-3 border-b border-gray-100" onClick={() => setMobileOpen(false)}>{link.label}</a>
            ))}

            <a href="/estimate" className="text-orange font-semibold text-lg py-3 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Free Roof Estimate</a>

            <a href="tel:+15592158516" className="mt-4 flex items-center justify-center gap-2 bg-orange text-white px-6 py-4 rounded-xl font-bold text-lg cta-press" onClick={() => setMobileOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call (559) 215-8516
            </a>
            <a href="/estimate" className="flex items-center justify-center bg-navy text-white px-6 py-4 rounded-xl font-bold text-lg cta-press" onClick={() => setMobileOpen(false)}>Get Free Estimate</a>
          </div>
        </div>
      </nav>
    </>
  );
}
