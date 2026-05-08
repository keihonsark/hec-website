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

const paintFAQ = [
  {
    question: "How long does exterior painting take?",
    answer:
      "Most single-family homes are completed in 3-5 days, weather permitting. That includes prep work (sanding, caulking, priming), full painting, and cleanup. We don't cut corners on prep — that's where most paint jobs fail.",
  },
  {
    question: "What kind of paint do you use?",
    answer:
      "Premium exterior coatings with industrial-grade UV protection — engineered specifically for high-heat climates like Central Valley summers. Standard wall paint fades fast in our sun. Ours is built to last decades, not years.",
  },
  {
    question: "Will the paint hold up in Central Valley heat?",
    answer:
      "Yes — that's exactly what our coating is designed for. UV protection, color-fade resistance, and flexibility for thermal expansion. Our exterior paint commonly outlasts the standard 7-10 year painting cycle by 1.5-2x.",
  },
  {
    question: "What about prep work?",
    answer:
      "Prep is 70% of a quality paint job. We pressure wash, scrape loose paint, sand rough surfaces, caulk gaps, prime bare wood and stains, and mask everything that shouldn't get painted. No shortcuts.",
  },
  {
    question: "What's the warranty?",
    answer:
      "Lifetime Plus coating carries a transferable manufacturer warranty. HEC backs every paint job with our own workmanship warranty as well. We stand behind the work for the long haul.",
  },
];

const serviceSchema = buildServiceSchema({
  serviceType: "Exterior Painting",
  name: "Exterior Painting in Fresno, CA",
  description:
    "Premium exterior coatings engineered for Central Valley heat — protect and beautify your home for decades.",
  path: "/paint",
});

const benefits = [
  {
    title: "UV Protection",
    desc: "Blocks the Central Valley sun that fades and chalks lesser coatings.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Moisture Barrier",
    desc: "Seals stucco and siding against rain, sprinkler spray, and humidity.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-2.429 5.778-7.5 9-7.5 13.125a7.5 7.5 0 1015 0c0-4.125-5.071-7.347-7.5-13.125z" />
      </svg>
    ),
  },
  {
    title: "Increased Curb Appeal",
    desc: "A modern color refresh that adds resale value and turns heads.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 21V8.25l8.25-6 8.25 6V21M8.25 21V13.5h7.5V21" />
      </svg>
    ),
  },
];

const productHighlights = [
  "Industrial-grade durability — outlasts standard exterior paint by decades",
  "Color-fade resistance engineered for direct Central Valley sun exposure",
  "Transferable warranty that adds resale value when you sell your home",
  "Pairs perfectly with new windows for a complete exterior refresh",
];

const whyHec = [
  {
    title: "20+ Years Experience",
    desc: "Two decades of exterior projects across Fresno and the Central Valley.",
  },
  {
    title: "Prep Done Right",
    desc: "Sanding, priming, and caulking before a brush ever hits the wall.",
  },
  {
    title: "Trained Crews",
    desc: "In-house technicians — never day-labor subs you've never met.",
  },
  {
    title: "Financing Available",
    desc: "$0 down options and low monthly payments to fit any budget.",
  },
];

export default function PaintPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />
      <ServiceHero
        image="/images/about/paint-exterior.png"
        imageAlt="Freshly painted home exterior by Home Energy Construction"
        headlineWhite="Paint That"
        headlineOrange="Outlasts the Sun."
        subtext="Premium exterior coatings engineered for Central Valley heat — protect and beautify your home for decades."
        formAnchor="#paint-estimate"
      />

      <TrustStrip />

      {/* ════════ WHY PAINT MATTERS ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Paint Matters</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              More Than a Color.{" "}
              <span className="text-orange">A Shield for Your Home.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-gray-100 rounded-2xl p-8 card-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{b.title}</h3>
                <p className="text-gray-text text-[15px] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ WHAT WE USE ════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative h-72 md:h-[440px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
              <Image
                src="/images/about/paint-exterior.png"
                alt="Lifetime Plus exterior coating applied by Home Energy Construction"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <SectionLabel>What We Use</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-6">
                Lifetime Plus{" "}
                <span className="text-orange">Exterior Coating</span>
              </h2>
              <p className="text-gray-text text-[15px] leading-relaxed mb-8">
                Standard exterior paint fails fast in the Valley sun. Lifetime
                Plus is a thicker, ceramic-reinforced coating that bonds to
                stucco, wood, and fiber cement to deliver real long-term
                protection.
              </p>
              <ul className="space-y-4">
                {productHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-navy text-[15px] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════ WHY HEC ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Home Energy</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Paint Done Right.{" "}
              <span className="text-orange">From Prep to Finish.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyHec.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm card-lift"
              >
                <h3 className="text-lg font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-text text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CredentialsGrid compact />
      <FinancingSection formAnchor="#paint-estimate" />
      <ReviewsCarousel />
      <FAQSection title="Exterior Paint Questions, Answered" items={paintFAQ} />
      <CTABanner
        headline="Ready to Refresh Your Exterior?"
        formAnchor="#paint-estimate"
      />
      <LeadForm
        id="paint-estimate"
        headline="Get Your Free Paint Estimate"
        defaultService="Paint"
      />
      <MobileStickyBar formAnchor="#paint-estimate" />
    </>
  );
}
