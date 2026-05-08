"use client";

import Image from "next/image";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import LeadForm from "@/components/LeadForm";
import CTABanner from "@/components/CTABanner";
import MobileStickyBar from "@/components/MobileStickyBar";

const credentials = [
  {
    title: "Owens Corning Preferred",
    desc: "Top-tier roofing certification with extended warranty access.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Anlin Certified Dealer",
    desc: "Authorized installer of Anlin's California-built replacement windows.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75zM12 3.75v16.5M3.75 12h16.5" />
      </svg>
    ),
  },
  {
    title: "BBB A+ Rated",
    desc: "Accredited and trusted by the Better Business Bureau.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "4.7 Stars · 228+ Reviews",
    desc: "Real reviews from real Central Valley homeowners on Google.",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
  },
  {
    title: "CA License #1086515",
    desc: "Fully licensed, bonded, and insured general contractor.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "$15M+ Annual Revenue",
    desc: "Fleet of trucks and 30+ technicians serving thousands of homes.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375M21 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
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
      {/* ════════ HERO ════════ */}
      <section className="relative bg-navy-dark noise-overlay py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>About Home Energy Construction</SectionLabel>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
            20+ Years Upgrading{" "}
            <span className="text-orange">Central Valley Homes</span>
          </h1>
          <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            We&apos;re not a franchise or a faceless corporation. HEC is a
            locally owned team that treats every project like it&apos;s our
            own home.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <CTAButton href="/#estimate-form">Get Free Estimate</CTAButton>
            <CTAButton variant="outline" href="tel:+15592158516">
              Call (559) 215-8516
            </CTAButton>
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
                  Home Energy Construction has spent more than two decades
                  upgrading homes across the Central Valley. What started as a
                  small Fresno operation has grown into a full-service home
                  improvement company with $15M+ in annual revenue, a fleet of
                  trucks, and 30+ trained technicians who live in the
                  communities they serve.
                </p>
                <p>
                  Founder Alex Alam still owns and runs the day-to-day. That
                  means when you hire HEC, you&apos;re hiring a team where the
                  owner picks up the phone, walks the jobsite, and stands
                  behind every install. No layers of franchise overhead. No
                  out-of-state call centers. Just neighbors doing right by
                  neighbors.
                </p>
                <p>
                  We serve the entire Central Valley — from Porterville to
                  Sacramento — across roofing, windows, HVAC, insulation,
                  outdoor living, and exterior paint. One trusted team for
                  every project on your home.
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
                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm card-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
                  {c.icon}
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
