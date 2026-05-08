import Image from "next/image";
import Logo from "./Logo";
import GoogleG from "./icons/GoogleG";

const services = [
  { label: "Windows & Doors", href: "/windows" },
  { label: "Roofing", href: "/roofing" },
  { label: "HVAC", href: "/hvac" },
  { label: "Insulation", href: "/insulation" },
  { label: "Outdoor Living", href: "/outdoor" },
  { label: "Paint", href: "/paint" },
];

const resources = [
  { label: "Reviews", href: "/reviews" },
  { label: "Financing", href: "/financing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Free Estimate", href: "/windows-offer" },
];

function FooterStars() {
  return (
    <span className="inline-flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-navy-dark text-white noise-overlay">
      {/* Trust strip — clickable, links to /reviews */}
      <a
        href="/reviews"
        className="block bg-white/5 border-b border-white/10 hover:bg-white/[0.07] transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <FooterStars />
            <span className="text-white font-semibold text-sm sm:text-base">
              4.7 / 5 from 228+ Google Reviews
            </span>
            <GoogleG className="w-5 h-5" />
          </div>
        </div>
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company info */}
          <div>
            <Logo className="mb-5" height={44} />
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

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-base mb-5">Resources</h4>
            <ul className="space-y-3">
              {resources.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    className="text-white/60 hover:text-orange text-sm transition-colors"
                  >
                    {r.label}
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
                  href="tel:+15592158516"
                  className="text-white/60 hover:text-orange transition-colors"
                >
                  (559) 215-8516
                </a>
              </li>
              <li className="text-white/60">Mon – Sat: 8:00 AM – 6:00 PM</li>
              <li className="text-white/60">Sun: Closed</li>
            </ul>
          </div>
        </div>

        {/* Partner logos */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <Image
                src="/images/logos/owens-preferred-logo.png"
                alt="Owens Corning Preferred Contractor"
                width={90}
                height={30}
                className="h-[30px] w-auto opacity-80"
              />
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <Image
                src="/images/logos/bbb-logo.png"
                alt="BBB A+ Accredited Business"
                width={90}
                height={30}
                className="h-[30px] w-auto opacity-80"
              />
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <Image
                src="/images/logos/anlin-logo.png"
                alt="Anlin Certified Partner"
                width={90}
                height={30}
                className="h-[30px] w-auto opacity-80"
              />
            </div>
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
