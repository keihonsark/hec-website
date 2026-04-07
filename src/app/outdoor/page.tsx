"use client";

import ServiceHero from "@/components/ServiceHero";
import TrustStrip from "@/components/TrustStrip";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import FinancingSection from "@/components/FinancingSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CTABanner from "@/components/CTABanner";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function OutdoorPage() {
  return (
    <>
      <ServiceHero
        image="/images/outdoor/outdoor-patio.png"
        imageAlt="Custom patio cover by Home Energy Construction in Fresno"
        headlineWhite="Live"
        headlineOrange="Outside."
        subtext="Custom patios, pergolas, and gazebos that transform your backyard into a year-round retreat."
        formAnchor="#outdoor-estimate"
      />

      <TrustStrip />

      {/* ════════ KEY BENEFITS ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Home Energy</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Your Backyard, <span className="text-orange">Reimagined.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Designed",
                desc: "Every outdoor space is designed to fit your home's architecture and your family's lifestyle. No cookie-cutter solutions.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                ),
              },
              {
                title: "Beat the Valley Heat",
                desc: "Alumawood and solid roof patio covers provide real shade and real relief from Central Valley summers.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Increase Home Value",
                desc: "A well-designed outdoor living space adds usable square footage and significant value to your property.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-.001m5.94 0v5.94" />
                  </svg>
                ),
              },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-gray-100 rounded-2xl p-8 card-lift">
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">{c.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-2">{c.title}</h3>
                <p className="text-gray-text text-[15px] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ WHAT WE BUILD ════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>What We Build</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Outdoor Living <span className="text-orange">Solutions</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Alumawood Patio Covers",
                desc: "Durable, stylish shade structures in multiple colors and styles",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 4.5V21H3V7.5L12 3zM3 10.5h18" />
                  </svg>
                ),
              },
              {
                title: "Pergolas",
                desc: "Open-air designs that add character and filtered light",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M6 6.75V21M18 6.75V21M3 3h18" />
                  </svg>
                ),
              },
              {
                title: "Gazebos",
                desc: "Freestanding structures perfect for entertaining or relaxing",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l10 6v2H2V8l10-6zM4 10v11M20 10v11M4 21h16M8 10v11M16 10v11M12 10v11" />
                  </svg>
                ),
              },
              {
                title: "Solid Roof Covers",
                desc: "Full protection from sun and rain with a clean, finished look",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 21V8.25l8.25-6 8.25 6V21" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 card-lift">
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-text text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FinancingSection formAnchor="#outdoor-estimate" />
      <ReviewsCarousel />
      <CTABanner headline="Ready to Transform Your Backyard?" formAnchor="#outdoor-estimate" />
      <LeadForm id="outdoor-estimate" headline="Get Your Free Outdoor Living Estimate" defaultService="Outdoor Living" />
      <MobileStickyBar formAnchor="#outdoor-estimate" />
    </>
  );
}
