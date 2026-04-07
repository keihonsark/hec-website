import Logo from "./Logo";

const services = [
  { label: "Roofing", href: "#" },
  { label: "HVAC", href: "#" },
  { label: "Windows & Doors", href: "#" },
  { label: "Outdoor Living", href: "#" },
  { label: "Insulation", href: "#" },
  { label: "Paint", href: "#" },
];

/* ─── Trust badge SVGs for footer ─── */
function OwensCorningBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-white/15 rounded-lg px-3 py-2">
      <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Owens Corning</span>
    </div>
  );
}

function BBBBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-white/15 rounded-lg px-3 py-2">
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
        <path d="M10 1l2.5 1.5L15 1v3l2.5 1.5L16 8l1.5 2.5L15 12v3l-2.5 1.5L10 18l-2.5-1.5L5 18v-3L2.5 13.5 4 11 2.5 8.5 5 7V4l2.5-1.5L10 1z" fill="#F5A623" />
        <text x="10" y="12" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">A+</text>
      </svg>
      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">BBB A+</span>
    </div>
  );
}

function AnlinBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-white/15 rounded-lg px-3 py-2">
      <svg className="w-4 h-4 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75zM12 3.75v16.5" />
      </svg>
      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Anlin</span>
    </div>
  );
}

function GoogleBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-white/15 rounded-lg px-3 py-2">
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">4.7 Stars</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-navy-dark text-white noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company info */}
          <div>
            <Logo className="mb-5" />
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Fresno&apos;s trusted home improvement contractor. Specializing in
              roofing, HVAC, windows, and outdoor living with over 20 years of
              experience.
            </p>
            <p className="text-white/50 text-sm mb-2">
              7194 N Abby St, Fresno CA 93720
            </p>
            <p className="text-orange text-sm font-semibold">
              CA License #1086515
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-white/60 hover:text-orange text-sm transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-base mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:5597976081"
                  className="text-white/60 hover:text-orange transition-colors"
                >
                  (559) 797-6081
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@homeenergyconstruction.com"
                  className="text-white/60 hover:text-orange transition-colors"
                >
                  info@homeenergyconstruction.com
                </a>
              </li>
              <li className="text-white/60">Mon – Sat: 8:00 AM – 6:00 PM</li>
              <li className="text-white/60">Sun: Closed</li>
            </ul>
          </div>
        </div>

        {/* Trust badge logos row */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <OwensCorningBadge />
            <BBBBadge />
            <AnlinBadge />
            <GoogleBadge />
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <span>
              © 2026 Home Energy Construction. All rights reserved. · CA
              License #1086515
            </span>
            <span>
              Powered by{" "}
              <a
                href="https://sark.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-orange transition-colors"
              >
                SARK Agency
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
