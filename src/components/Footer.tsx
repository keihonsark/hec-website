import Logo from "./Logo";

const services = [
  { label: "Roofing", href: "#" },
  { label: "HVAC", href: "#" },
  { label: "Windows & Doors", href: "#" },
  { label: "Outdoor Living", href: "#" },
  { label: "Insulation", href: "#" },
  { label: "Paint", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
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
            <p className="text-white/50 text-sm">
              7194 N Abby St, Fresno CA 93720
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

        {/* Trust badges row */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {["BBB A+ Rated", "Owens Corning", "Anlin Windows", "GAF Certified"].map(
              (badge) => (
                <div
                  key={badge}
                  className="text-white/40 text-xs font-semibold uppercase tracking-wider"
                >
                  {badge}
                </div>
              )
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <span>© 2026 Home Energy Construction. All rights reserved.</span>
            <span>
              Powered by{" "}
              <a
                href="https://sark.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-orange-dark transition-colors"
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
