"use client";

import { useEffect, useRef } from "react";
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
      { threshold: 0.12 }
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

/* ─── Service icon SVGs ─── */
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
];

/* ═══════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════ */
export default function HomePage() {
  /* Mobile sticky CTA: hide when footer visible */
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
      {/* ════════════════ 1. HERO ════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light">
        {/* Orange radial glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Review badge */}
              <div className="inline-flex items-center gap-2 border border-orange/40 rounded-full px-4 py-1.5 mb-7">
                <span className="text-sm">⭐</span>
                <span className="text-white/90 text-sm font-medium">
                  4.7 Stars · 228+ Google Reviews
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] mb-6">
                Fresno&apos;s Trusted Home{" "}
                <span className="text-orange">Upgrade</span> Experts.
              </h1>

              {/* Subheadline */}
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
                Roofing. HVAC. Windows. Outdoor Living. All with $0 down
                financing.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <CTAButton href="#estimate">Get Free Estimate</CTAButton>
                <CTAButton variant="outline" href="tel:5597976081">
                  Call (559) 797-6081
                </CTAButton>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                {[
                  { value: "20+", label: "Years" },
                  { value: "A+", label: "BBB" },
                  { value: "$0", label: "Down" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-orange text-2xl sm:text-3xl font-extrabold">
                      {stat.value}
                    </div>
                    <div className="text-white/50 text-xs uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="hidden md:block">
              {/* REPLACE: hero-home.png */}
              <div className="w-full aspect-[4/3] bg-navy-light/60 rounded-2xl flex items-center justify-center text-white/30 text-lg border border-white/5">
                HERO IMAGE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 2. TRUST BAR ════════════════ */}
      <Section className="bg-light-bg py-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              {
                label: "Owens Corning Preferred",
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ),
              },
              {
                label: "Licensed & Bonded",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
              {
                label: "BBB A+ Rated",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
              },
              {
                label: "Financing Available",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                label: "Anlin Window Partner",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75zM12 3.75v16.5" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-gray-text"
              >
                <span className="text-orange">{item.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════ 3. SERVICES GRID ════════════════ */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
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
            />
            <ServiceCard
              icon={icons.hvac}
              title="HVAC"
              description="Energy-efficient heating and cooling systems built to handle Central Valley's extreme temperatures."
            />
            <ServiceCard
              icon={icons.windows}
              title="Windows & Doors"
              description="Premium Anlin windows and doors that reduce energy costs and enhance curb appeal."
            />
            <ServiceCard
              icon={icons.outdoor}
              title="Outdoor Living"
              description="Custom patios, pergolas, and gazebos that transform your backyard into a year-round retreat."
            />
            <ServiceCard
              icon={icons.insulation}
              title="Insulation"
              description="Upgraded insulation solutions that keep your home comfortable and your energy bills low."
            />
            <ServiceCard
              icon={icons.paint}
              title="Paint"
              description="Lifetime Plus exterior coating that protects and beautifies your home for decades."
            />
          </div>
        </div>
      </Section>

      {/* ════════════════ 4. WHY US ════════════════ */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Why Home Energy</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              20+ Years of Protecting Central Valley Homes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Materials",
                desc: "Owens Corning & Anlin certified — only the best products go on your home.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                ),
              },
              {
                title: "Built for Valley Heat",
                desc: "Energy-efficient solutions engineered for 110° summers and year-round comfort.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.75 6.75 0 0012 15.75a6.75 6.75 0 003.362-10.536z" />
                  </svg>
                ),
              },
              {
                title: "$0 Down Financing",
                desc: "Multiple financing plans for every budget — because everyone deserves a better home.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center text-orange mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════ 5. BEFORE / AFTER ════════════════ */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              See the Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <BeforeAfter
              beforeLabel="BEFORE 1"
              afterLabel="AFTER 1"
              caption="Complete roof replacement — Fresno, CA"
            />
            <BeforeAfter
              beforeLabel="BEFORE 2"
              afterLabel="AFTER 2"
              caption="Patio cover installation — Clovis, CA"
            />
          </div>
        </div>
      </Section>

      {/* ════════════════ 6. FINANCING ════════════════ */}
      <Section className="py-20 md:py-28 bg-gradient-to-br from-orange to-orange-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark">
              A New Roof Shouldn&apos;t Break the Bank
            </h2>
            <p className="text-navy-dark/70 text-lg mt-4">
              We offer multiple financing options so every family can afford the
              upgrades they need.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "$0 Down",
                desc: "Get started with nothing out of pocket",
              },
              {
                title: "Deferred Payments",
                desc: "Enjoy now, pay later — up to 18 months",
              },
              {
                title: "Low Monthly",
                desc: "Payments starting at $189/mo",
              },
            ].map((plan) => (
              <div
                key={plan.title}
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
              >
                <h3 className="text-xl font-bold text-navy mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-text text-[15px]">{plan.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton variant="navy" href="#estimate">
              See If You Qualify
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* ════════════════ 7. REVIEWS ════════════════ */}
      <Section className="py-20 md:py-28 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>Real Reviews</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              What Our Customers Say
            </h2>
            <p className="text-gray-text mt-3">
              4.7 stars across 228+ Google reviews
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto scroll-row pb-4 -mx-4 px-4">
            {reviews.map((r) => (
              <ReviewCard
                key={r.name}
                text={r.text}
                name={r.name}
                city={r.city}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════ 8. CTA BANNER ════════════════ */}
      <Section className="py-20 md:py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-white/60 text-lg mb-8">
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

      {/* ════════════════ 9. ESTIMATE FORM ════════════════ */}
      <Section id="estimate" className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
                Service Needed
              </option>
              <option>Roofing</option>
              <option>HVAC</option>
              <option>Windows &amp; Doors</option>
              <option>Outdoor Living</option>
              <option>Insulation</option>
              <option>Paint</option>
              <option>Other</option>
            </select>
            <select
              defaultValue=""
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition appearance-none bg-white"
            >
              <option value="" disabled>
                Financing Interest
              </option>
              <option>Yes — $0 Down</option>
              <option>Yes — Low Monthly Payments</option>
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
      </Section>

      {/* Footer visibility sentinel */}
      <div ref={footerSentinel} className="h-1" />

      {/* ════════════════ MOBILE STICKY CTA BAR ════════════════ */}
      <div
        ref={mobileCta}
        className="mobile-cta-bar md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
      >
        <a
          href="tel:5597976081"
          className="flex-1 flex items-center justify-center gap-2 bg-orange text-white py-3 rounded-xl font-bold text-sm cta-press"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
        <a
          href="#estimate"
          className="flex-1 flex items-center justify-center bg-navy text-white py-3 rounded-xl font-bold text-sm cta-press"
        >
          Free Estimate
        </a>
      </div>
    </>
  );
}
