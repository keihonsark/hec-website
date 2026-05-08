"use client";

import Image from "next/image";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import GoogleG from "@/components/GoogleG";
import LeadForm from "@/components/LeadForm";
import CTABanner from "@/components/CTABanner";
import MobileStickyBar from "@/components/MobileStickyBar";

const credentials = [
  {
    logo: "/images/logos/bbb-logo.png",
    title: "BBB A+ Rated",
    desc: "Top accreditation from the Better Business Bureau.",
  },
  {
    logo: "/images/logos/owens-preferred-logo.png",
    title: "Owens Corning Preferred Contractor",
    desc: "Top tier shingle warranty + workmanship.",
  },
  {
    logo: "/images/logos/anlin-logo.png",
    title: "Anlin Certified Dealer",
    desc: "Premium California-made energy-efficient windows.",
  },
  {
    logo: "/images/logos/CSLB_logo.png",
    title: "CA Licensed #1086515",
    desc: "Bonded, insured, and state licensed.",
  },
  {
    logo: "/images/logos/Energy_Star_logo.svg",
    title: "Energy Star Partner",
    desc: "Products that meet federal energy efficiency standards.",
  },
  {
    logo: "/images/logos/nfrc-logo.png",
    title: "NFRC Certified",
    desc: "Independent ratings on every window we install.",
  },
];

const cities = [
  "Fresno",
  "Clovis",
  "Visalia",
  "Madera",
  "Hanford",
  "Tulare",
  "Selma",
  "Sanger",
  "Reedley",
  "Merced",
  "Modesto",
  "Stockton",
  "Roseville",
  "Sacramento",
];

export default function AboutPage() {
  return (
    <>
      {/* ════════ HERO — Full-bleed background ════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/images/windows/crew-install.png"
          alt="Home Energy Construction crew on a Central Valley jobsite"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div
            className="hero-glass-float max-w-2xl rounded-3xl p-8 sm:p-10 md:p-12"
            style={{
              background: "rgba(15, 29, 51, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Google review badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-6">
              <GoogleG className="w-5 h-5" />
              <span className="text-orange text-sm font-bold">4.7</span>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span className="text-white/70 text-sm">228+ Reviews</span>
            </div>

            <SectionLabel>About Home Energy Construction</SectionLabel>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] mb-6">
              20+ Years Upgrading{" "}
              <span className="text-orange">Central Valley Homes.</span>
            </h1>

            <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              We&apos;re not a franchise or a faceless corporation. HEC is a
              locally owned team that treats every project like it&apos;s our
              own home.
            </p>

            <div className="flex flex-wrap gap-4">
              <CTAButton href="/#estimate-form">Get Free Estimate</CTAButton>
              <CTAButton variant="outline" href="tel:+15595765067">
                Call (559) 576-5067
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ STORY ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-6">
                Built on Trust.{" "}
                <span className="text-orange">Backed by Results.</span>
              </h2>
              <div className="space-y-5 text-gray-text text-[15px] leading-relaxed">
                <p>
                  Home Energy Construction is a locally owned home improvement
                  company that has spent more than two decades upgrading homes
                  across the Central Valley. We started as a small Fresno
                  operation, and we still run like one — close to our
                  customers, accountable for every job, and committed to doing
                  the work right the first time.
                </p>
                <p>
                  Hire HEC and you&apos;re hiring a team that treats your home
                  the way we&apos;d treat our own. No layers of franchise
                  overhead. No out-of-state call centers. What we have instead
                  is a family-style culture built around craftsmanship and
                  customer service — neighbors doing right by neighbors.
                </p>
                <p>
                  We serve the entire Central Valley — from Porterville to
                  Sacramento — across roofing, windows, HVAC, insulation,
                  outdoor living, and exterior paint. One trusted team for
                  every project on your home, all under one roof.
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden ring-2 ring-orange/30 shadow-2xl">
              <Image
                src="/images/about/team-photo.png"
                alt="Home Energy Construction team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange/20 rounded-full blur-[60px] pointer-events-none" />
            </div>
          </div>
        </div>
      </Section>

      {/* ════════ CREDENTIALS ════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Credentials &amp; Trust</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Certified. Accredited. Proven.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((c) => (
              <div
                key={c.title}
                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm card-lift text-center"
              >
                <div className="h-20 flex items-center justify-center mb-5">
                  <Image
                    src={c.logo}
                    alt={c.title}
                    width={200}
                    height={80}
                    className="max-h-20 w-auto object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{c.title}</h3>
                <p className="text-gray-text text-[15px] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ SERVICE AREA ════════ */}
      <Section className="relative py-24 md:py-32 bg-navy noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>Service Area</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Serving the Central Valley &amp; Beyond
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              From Porterville to Sacramento — and every city in between.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-5xl mx-auto">
            {cities.map((city) => (
              <div
                key={city}
                className="flex items-center justify-center gap-2 bg-navy-light/50 border border-white/10 rounded-xl px-4 py-3"
              >
                <svg
                  className="w-4 h-4 text-orange flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-white text-sm font-medium">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABanner
        headline="Let's Talk About Your Home"
        formAnchor="#about-estimate"
      />
      <LeadForm
        id="about-estimate"
        headline="Get Your Free Estimate"
      />
      <MobileStickyBar formAnchor="#about-estimate" />
    </>
  );
}
