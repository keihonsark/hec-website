"use client";

import Image from "next/image";
import ServiceHero from "@/components/ServiceHero";
import TrustStrip from "@/components/TrustStrip";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import FinancingSection from "@/components/FinancingSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CTABanner from "@/components/CTABanner";
import CredentialsGrid from "@/components/CredentialsGrid";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";
import FAQSection from "@/components/FAQSection";
import { buildServiceSchema, jsonLd } from "@/lib/seo";

const hvacFAQ = [
  {
    question: "When should I replace my HVAC system?",
    answer:
      "Most systems last 12-15 years. If yours is older than that, struggling to keep up in 110° summers, requiring frequent repairs, or driving up your bills, replacement usually pays for itself within a few years through energy savings.",
  },
  {
    question: "How much does a new HVAC system cost?",
    answer:
      "A complete system replacement (AC + furnace) typically runs $8,000-$18,000 depending on size, efficiency rating, and home layout. Higher SEER (efficiency) units cost more upfront but save thousands over their lifetime in energy bills.",
  },
  {
    question: "What size system does my home need?",
    answer:
      "We perform a Manual J load calculation during your free estimate — factoring in square footage, insulation, window count, ceiling height, and sun exposure. Oversized systems cycle too often; undersized ones run constantly. Right-sizing matters.",
  },
  {
    question: "Do you service all brands?",
    answer:
      "We install and service all major brands including Carrier, Lennox, Trane, Goodman, and Rheem. We'll recommend the system that fits your home and budget — not whichever brand has the highest commission.",
  },
  {
    question: "How long does HVAC installation take?",
    answer:
      "Most full-system replacements are done in 1 day. Complex installs with new ductwork or commercial-grade equipment may take 2-3 days. Your home stays comfortable during the process.",
  },
  {
    question: "Do you offer financing on HVAC?",
    answer:
      "Yes — same financing options as our other services: $0 down, 0% APR plans, deferred payments, and low monthly terms. Many systems pay for themselves in energy savings within 4-7 years.",
  },
];

const serviceSchema = buildServiceSchema({
  serviceType: "HVAC Installation",
  name: "HVAC Installation in Fresno, CA",
  description:
    "Energy-efficient HVAC systems built for Central Valley's extreme temperatures. $0 down financing available.",
  path: "/hvac",
});

export default function HVACPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />
      <ServiceHero
        image="/images/hvac/hvac-unit.png"
        imageAlt="HVAC installation by Home Energy Construction in Fresno"
        headlineWhite="Stay Cool."
        headlineOrange="Stay Comfortable."
        subtext="Energy-efficient HVAC systems built for Central Valley's extreme temperatures. $0 down financing available."
        formAnchor="#hvac-estimate"
      />

      <TrustStrip />

      {/* ════════ KEY BENEFITS ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Home Energy</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              HVAC Done Right. <span className="text-orange">Every Time.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Built for 110° Summers",
                desc: "Our systems are sized and engineered specifically for Central Valley heat. Stay cool when it matters most.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Lower Energy Bills",
                desc: "Modern high-efficiency systems from Goodman and Rheem can cut your energy costs by up to 30%.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
              },
              {
                title: "$0 Down Financing",
                desc: "New HVAC system with nothing out of pocket. Multiple payment plans available for every budget.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
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

      {/* ════════ OUR HVAC SERVICES ════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Our HVAC Services</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Complete Heating &amp; Cooling Solutions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "AC Installation & Replacement",
                  "Furnace Installation & Replacement",
                  "Heat Pump Systems",
                  "Ductwork & Ventilation",
                  "Energy-Efficient Upgrades",
                  "Maintenance & Tune-Ups",
                ].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-navy text-[15px] font-medium">{s}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-text text-sm mt-6">
                All systems installed to Title 24 California energy standards.
              </p>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hvac/hvac-unit.png"
                alt="HVAC system installed by Home Energy Construction"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <CredentialsGrid compact />
      <FinancingSection formAnchor="#hvac-estimate" />
      <ReviewsCarousel />
      <FAQSection title="HVAC Questions, Answered" items={hvacFAQ} />
      <CTABanner headline="Ready for a New HVAC System?" formAnchor="#hvac-estimate" />
      <LeadForm id="hvac-estimate" headline="Get Your Free HVAC Estimate" defaultService="HVAC" />
      <MobileStickyBar formAnchor="#hvac-estimate" />
    </>
  );
}
