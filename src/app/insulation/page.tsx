"use client";

import Image from "next/image";
import ServiceHero from "@/components/ServiceHero";
import TrustStrip from "@/components/TrustStrip";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import FinancingSection from "@/components/FinancingSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CTABanner from "@/components/CTABanner";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function InsulationPage() {
  return (
    <>
      <ServiceHero
        image="/images/about/insulation-interior.png"
        imageAlt="Insulation installation by Home Energy Construction in Fresno"
        headlineWhite="Save Money."
        headlineOrange="Stay Comfortable."
        subtext="GreenFiber insulation upgrades that reduce air infiltration, lower your energy bills, and keep your home at the perfect temperature."
        formAnchor="#insulation-estimate"
      />

      <TrustStrip />

      {/* ════════ KEY BENEFITS ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Insulation</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              The Upgrade You <span className="text-orange">Can Feel.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Up to 30% Energy Savings",
                desc: "Proper insulation dramatically reduces heating and cooling costs — you'll feel the difference on your next bill.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "GreenFiber Certified",
                desc: "We use GreenFiber cellulose insulation — made from recycled materials and designed for maximum thermal performance.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
              },
              {
                title: "Year-Round Comfort",
                desc: "No more hot rooms in summer or cold drafts in winter. Insulation keeps your whole home consistently comfortable.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
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

      {/* ════════ CONTENT ════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              How Insulation <span className="text-orange">Transforms</span> Your Home
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-text text-[15px] leading-relaxed mb-6">
                Most homes in the Central Valley are under-insulated by today&apos;s
                standards. Our team evaluates your attic, walls, and crawl spaces
                to identify where you&apos;re losing energy — then installs
                GreenFiber cellulose insulation to seal your home&apos;s thermal
                envelope.
              </p>
              <div className="space-y-4">
                {[
                  "Free home energy assessment",
                  "Attic, wall & crawl space insulation",
                  "GreenFiber cellulose — recycled & high-performance",
                  "Reduces air infiltration & drafts",
                  "Installed to meet or exceed Title 24 standards",
                  "Most jobs completed in one day",
                ].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-navy text-[15px] font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about/insulation-interior.png"
                alt="Insulation installation in Fresno home"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <FinancingSection formAnchor="#insulation-estimate" />
      <ReviewsCarousel />
      <CTABanner headline="Ready to Lower Your Energy Bills?" formAnchor="#insulation-estimate" />
      <LeadForm id="insulation-estimate" headline="Get Your Free Insulation Estimate" defaultService="Insulation" />
      <MobileStickyBar formAnchor="#insulation-estimate" />
    </>
  );
}
