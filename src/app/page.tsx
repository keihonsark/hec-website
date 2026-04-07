"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import SectionLabel from "@/components/SectionLabel";
import ServiceCard from "@/components/ServiceCard";
import ReviewCard from "@/components/ReviewCard";
import BeforeAfter from "@/components/BeforeAfter";

/* ─── Scroll reveal hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useScrollReveal();
  return (
    <section id={id} ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </section>
  );
}

/* ─── Inline SVG icons for services ─── */
const icons = {
  roofing: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 21V8.25l8.25-6 8.25 6V21M8.25 21V13.5h7.5V21" />
    </svg>
  ),
  hvac: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  windows: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75zM12 3.75v16.5M3.75 12h16.5" />
    </svg>
  ),
  outdoor: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 4.5V21H3V7.5L12 3zM3 10.5h18M8.25 21V10.5M15.75 21V10.5" />
    </svg>
  ),
  insulation: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  paint: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
};

/* ─── Review data ─── */
const reviews = [
  {
    text: "They replaced our entire roof in two days. The crew was professional, cleaned up everything, and our energy bill dropped immediately. Best contractor experience we've ever had.",
    name: "Maria G.",
    city: "Fresno",
  },
  {
    text: "Our HVAC was struggling with the valley heat. Home Energy installed a new system with $0 down. The difference is incredible — our house actually stays cool now.",
    name: "James T.",
    city: "Clovis",
  },
  {
    text: "We got new Anlin windows throughout the house. The noise reduction alone was worth it. Professional installation and the financing made it painless.",
    name: "Sarah L.",
    city: "Fresno",
  },
  {
    text: "Built us a beautiful patio cover that completely transformed our backyard. From design to completion they were communicative, on time, and the quality is outstanding.",
    name: "Robert & Linda K.",
    city: "Madera",
  },
  {
    text: "Home Energy replaced all our windows and the difference in our energy bill was immediate. From the estimate to install, everything was smooth and professional.",
    name: "David R.",
    city: "Madera",
  },
  {
    text: "We needed a new patio cover and they delivered beyond expectations. The alumawood looks incredible and we basically live outside now. Great financing options too.",
    name: "Angela M.",
    city: "Clovis",
  },
];

/* ─── Google "G" icon ─── */
function GoogleG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}


/* ═══════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════ */
export default function HomePage() {
  const footerSentinel = useRef<HTMLDivElement>(null);
  const mobileCta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = footerSentinel.current;
    const bar = mobileCta.current;
    if (!sentinel || !bar) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.classList.toggle("hidden", entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ════════════════ 1. HERO — Full-bleed background ════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero/hero-home.png"
          alt="Home Energy Construction — premium roofing and home improvement in Fresno, CA"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay — left darker for text, right lets image through */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/40" />
        {/* Orange radial glow top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          {/* Glassmorphism card */}
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
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
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

            {/* Headline — 56px desktop, 36px mobile */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] mb-6">
              Fresno&apos;s Trusted Home{" "}
              <span className="text-orange">Upgrade</span> Experts.
            </h1>

            {/* Subheadline */}
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Roofing. HVAC. Windows. Outdoor Living. All with $0 down
              financing.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <CTAButton href="#estimate">Get Free Estimate</CTAButton>
              <CTAButton variant="outline" href="tel:5597976081">
                Call (559) 797-6081
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 2. TRUST BAR — Clean logo bar ════════════════ */}
      <Section className="bg-white py-6 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
            {/* Owens Corning */}
            <Image
              src="/images/logos/owens-preferred-logo.png"
              alt="Owens Corning Preferred Contractor"
              width={180}
              height={55}
              className="h-[50px] md:h-[55px] w-auto opacity-85"
            />
            {/* BBB */}
            <Image
              src="/images/logos/bbb-logo.png"
              alt="BBB A+ Accredited Business"
              width={180}
              height={55}
              className="h-[50px] md:h-[55px] w-auto opacity-85"
            />
            {/* CA Licensed */}
            <div className="flex items-center gap-2 opacity-85">
              <svg className="w-7 h-7 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <div className="leading-tight">
                <div className="text-navy text-sm font-bold">CA Licensed</div>
                <div className="text-gray-text text-xs">#1086515</div>
              </div>
            </div>
            {/* Anlin */}
            <Image
              src="/images/logos/anlin-logo.png"
              alt="Anlin Certified Partner"
              width={180}
              height={55}
              className="h-[50px] md:h-[55px] w-auto opacity-85"
            />
            {/* Financing Available */}
            <div className="flex items-center gap-2 opacity-85">
              <svg className="w-7 h-7 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="leading-tight">
                <div className="text-navy text-sm font-bold">Financing</div>
                <div className="text-gray-text text-xs">Available</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════ 3. SERVICES GRID ════════════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Complete Home Improvement.{" "}
              <span className="text-orange">One Trusted Team.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={icons.roofing}
              title="Roofing"
              description="Full roof replacements and repairs with Owens Corning certified materials and lifetime warranties."
              image="/images/roofing/roofing-crew.png"
            />
            <ServiceCard
              icon={icons.hvac}
              title="HVAC"
              description="Energy-efficient heating and cooling systems built to handle Central Valley's extreme temperatures."
              image="/images/hvac/hvac-unit.png"
            />
            <ServiceCard
              icon={icons.windows}
              title="Windows & Doors"
              description="Premium Anlin windows and doors that reduce energy costs and enhance curb appeal."
              image="/images/windows/windows-interior.png"
            />
            <ServiceCard
              icon={icons.outdoor}
              title="Outdoor Living"
              description="Custom patios, pergolas, and gazebos that transform your backyard into a year-round retreat."
              image="/images/outdoor/outdoor-patio.png"
            />
            <ServiceCard
              icon={icons.insulation}
              title="Insulation"
              description="Upgraded insulation solutions that keep your home comfortable and your energy bills low."
              image="/images/about/insulation-interior.png"
            />
            <ServiceCard
              icon={icons.paint}
              title="Paint"
              description="Lifetime Plus exterior coating that protects and beautifies your home for decades."
              image="/images/about/paint-exterior.png"
            />
          </div>
        </div>
      </Section>

      {/* ════════════════ 4. WHY US ════════════════ */}
      <Section className="relative py-24 md:py-32 bg-navy noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Text */}
            <div>
              <SectionLabel>Why Home Energy</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                20+ Years of Protecting Central Valley Homes
              </h2>
              <p className="text-gray-300 text-[15px] leading-relaxed">
                We&apos;re not a franchise or a faceless corporation. Home Energy
                Construction is a locally owned team that treats every project
                like it&apos;s our own home. From the first phone call to the
                final walk-through, you&apos;ll work with people who live in
                your community and stand behind every job.
              </p>
            </div>

            {/* Team photo */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden ring-2 ring-orange/30 shadow-2xl">
              <Image
                src="/images/about/team-photo.png"
                alt="Home Energy Construction team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Orange glow behind */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange/20 rounded-full blur-[60px] pointer-events-none" />
            </div>
          </div>

          {/* Feature cards with orange left border */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Premium Materials",
                desc: "Owens Corning & Anlin certified — only the best products go on your home.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                ),
              },
              {
                title: "Built for Valley Heat",
                desc: "Energy-efficient solutions engineered for 110° summers and year-round comfort.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.75 6.75 0 0012 15.75a6.75 6.75 0 003.362-10.536z" />
                  </svg>
                ),
              },
              {
                title: "$0 Down Financing",
                desc: "Multiple financing plans for every budget — because everyone deserves a better home.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-navy-light/50 border-l-4 border-l-orange rounded-xl p-6 flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Energy savings stat bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-navy-light/40 rounded-2xl p-8">
            {[
              { value: "30%", label: "Up to energy savings" },
              { value: "9%", label: "Increase in home value" },
              { value: "100s", label: "Of homes upgraded" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-orange text-3xl sm:text-4xl font-extrabold mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════ 5. BEFORE / AFTER ════════════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              See the Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <BeforeAfter
              beforeLabel="Before"
              afterLabel="After"
              caption="Complete roof replacement — Fresno, CA"
              beforeImage="/images/before-after/before-roof-1.png"
              afterImage="/images/before-after/after-roof-1.png"
            />
            <BeforeAfter
              beforeLabel="Before"
              afterLabel="After"
              caption="Full roof restoration — Clovis, CA"
              beforeImage="/images/before-after/before-roof-2.png"
              afterImage="/images/before-after/after-roof-2.png"
            />
          </div>
        </div>
      </Section>

      {/* ════════════════ 6. FINANCING ════════════════ */}
      <Section className="relative py-24 md:py-32 bg-navy noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <SectionLabel>Financing</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                A New Roof Shouldn&apos;t Break the Bank
              </h2>
              <p className="text-gray-300 text-lg mt-4">
                We offer multiple financing options so every family can afford
                the upgrades they need.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden ring-2 ring-orange/30 shadow-2xl">
              <Image
                src="/images/about/happy-homeowners.png"
                alt="Happy homeowners in front of their newly upgraded home"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange/20 rounded-full blur-[40px] pointer-events-none" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "$0 Down",
                desc: "Get started with nothing out of pocket",
                popular: true,
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
                  </svg>
                ),
              },
              {
                title: "Deferred Payments",
                desc: "Enjoy now, pay later — up to 18 months",
                popular: false,
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>
                ),
              },
              {
                title: "Low Monthly",
                desc: "Payments starting at $189/mo",
                popular: false,
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898M2.25 6l3 3m-3-3h3m-3 0V3" />
                  </svg>
                ),
              },
            ].map((plan) => (
              <div
                key={plan.title}
                className="relative bg-white rounded-2xl p-8 border-l-[3px] border-l-orange shadow-lg"
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 bg-orange text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-text text-[15px]">{plan.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton href="#estimate">
              See If You Qualify
            </CTAButton>
            <p className="text-gray-400 text-sm mt-3">
              Checking rates won&apos;t affect your credit score
            </p>
          </div>
        </div>
      </Section>

      {/* ════════════════ 7. REVIEWS ════════════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Real Reviews</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
              What Our Customers Say
            </h2>
            {/* Google rating block */}
            <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-full px-5 py-2.5 shadow-sm">
              <GoogleG className="w-6 h-6" />
              <span className="text-navy font-bold text-lg">4.7</span>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span className="text-gray-text text-sm">228+ reviews</span>
            </div>
          </div>

          <div className="overflow-hidden -mx-4 px-4">
            <div className="flex gap-6 reviews-carousel w-max">
              {/* Render reviews twice for seamless loop */}
              {[...reviews, ...reviews].map((r, i) => (
                <ReviewCard
                  key={`${r.name}-${i}`}
                  text={r.text}
                  name={r.name}
                  city={r.city}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════ 8. CTA BANNER ════════════════ */}
      <Section className="relative py-24 md:py-28 bg-navy-dark noise-overlay overflow-hidden">
        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(245,166,35,0.3) 40px, rgba(245,166,35,0.3) 41px)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-white/55 text-xl mb-10 max-w-xl mx-auto">
            $0 down. Free estimates. Flexible financing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="tel:5597976081">
              Call (559) 797-6081
            </CTAButton>
            <CTAButton variant="outline" href="#estimate">
              Get Free Estimate
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* ════════════════ 9. ESTIMATE FORM — Image background ════════════════ */}
      <section id="estimate" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/about/team-photo.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-navy-dark/90" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Response badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 bg-orange/20 border border-orange/30 text-orange rounded-full px-5 py-2 text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              We&apos;ll call you within the hour
            </span>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <SectionLabel>Free Estimate</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
                Get Your Free Estimate
              </h2>
              <p className="text-gray-text mt-3">
                No obligation. No pressure. Just honest answers.
              </p>
            </div>

            <form
              className="grid sm:grid-cols-2 gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition"
              />
              <select
                defaultValue=""
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition appearance-none bg-white"
              >
                <option value="" disabled>
                  Select a service...
                </option>
                <option>Roofing</option>
                <option>HVAC</option>
                <option>Windows &amp; Doors</option>
                <option>Outdoor Living</option>
                <option>Insulation</option>
                <option>Paint</option>
                <option>Multiple Services</option>
                <option>Not Sure</option>
              </select>
              <select
                defaultValue=""
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition appearance-none bg-white"
              >
                <option value="" disabled>
                  Interested in financing?
                </option>
                <option>Yes — $0 Down</option>
                <option>Yes — Low Monthly Payments</option>
                <option>Yes — Deferred Payments</option>
                <option>Not Sure Yet</option>
                <option>No — Paying Cash</option>
              </select>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-orange text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-lg shadow-orange/20 cursor-pointer"
                >
                  GET MY FREE ESTIMATE →
                </button>
                <p className="text-gray-text text-sm text-center mt-3">
                  No obligation. No pressure. Just honest answers.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer visibility sentinel */}
      <div ref={footerSentinel} className="h-1" />

      {/* ════════════════ MOBILE STICKY CTA BAR ════════════════ */}
      <div
        ref={mobileCta}
        className="mobile-cta-bar md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
      >
        <a
          href="tel:5597976081"
          className="flex-1 flex items-center justify-center gap-2 bg-orange text-white py-3 rounded-xl font-bold text-sm cta-press"
        >
          <span>📞</span>
          Call Now
        </a>
        <a
          href="#estimate"
          className="flex-1 flex items-center justify-center border-2 border-navy bg-white text-navy py-3 rounded-xl font-bold text-sm cta-press"
        >
          Free Estimate
        </a>
      </div>
    </>
  );
}
