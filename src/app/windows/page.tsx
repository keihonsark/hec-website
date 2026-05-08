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
import OfferBanner from "@/components/OfferBanner";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";
import FAQSection from "@/components/FAQSection";
import ProcessSteps from "@/components/ProcessSteps";
import ServiceArea from "@/components/ServiceArea";
import { buildServiceSchema, jsonLd } from "@/lib/seo";

const windowsSteps = [
  { number: "01", title: "Free In-Home Estimate", description: "We measure every window, talk through your goals, and give you an exact quote — no pressure, no gimmicks." },
  { number: "02", title: "Custom Order", description: "Anlin manufactures your windows to spec. Custom sizes, frames, and glass for your home." },
  { number: "03", title: "Professional Install", description: "Our crew installs in 1-2 days. We protect floors, clean up daily, and treat your home like our own." },
  { number: "04", title: "Lifetime Warranty", description: "Anlin's lifetime warranty + HEC workmanship guarantee. Both transfer if you ever sell." },
];

const windowsFAQ = [
  {
    question: "How much do new windows cost?",
    answer:
      "Window replacement varies by size, frame, and style. Most full-home projects with our premium Anlin vinyl windows fall between $8,000 and $25,000 — but with $0 down financing, monthly payments start around $75. We provide a free in-home estimate so you get an exact number for your home, not a ballpark.",
  },
  {
    question: "How long does window replacement take?",
    answer:
      "Most jobs are completed in 1-2 days for a full home. We arrive on time, lay protective coverings inside, and clean up everything before we leave. You'll be enjoying your new windows the same week.",
  },
  {
    question: "Will new windows actually lower my energy bills?",
    answer:
      "Yes — typically by 20-30%. Anlin windows feature dual-pane low-E glass with argon gas insulation, which significantly reduces heat transfer. In Central Valley summers and winters, that translates to less HVAC strain and lower bills year-round.",
  },
  {
    question: "What window brand do you install?",
    answer:
      "We're a certified Anlin dealer. Anlin is a California-based manufacturer with one of the strongest lifetime warranties in the industry — fully transferable if you ever sell your home. Their windows are engineered specifically for Western U.S. climates.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes. We offer multiple financing options including $0 down, 0% interest for 12 months, deferred payment plans, and low monthly payment terms. Most homeowners qualify and we handle the application during your free estimate.",
  },
  {
    question: "What's the warranty?",
    answer:
      "Anlin's lifetime warranty covers the windows themselves — frames, glass, hardware. HEC backs every installation with our own workmanship warranty. Both transfer to a new owner if you ever sell.",
  },
];

const serviceSchema = buildServiceSchema({
  serviceType: "Window Replacement",
  name: "Window Replacement in Fresno, CA",
  description:
    "Premium Anlin windows and doors that reduce energy costs, block UV rays, and transform your home's comfort.",
  path: "/windows",
});

export default function WindowsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />
      <ServiceHero
        image="/images/windows/windows-interior.png"
        imageAlt="Anlin window replacement by Home Energy Construction in Fresno"
        headlineWhite="See the"
        headlineOrange="Difference."
        subtext="Premium Anlin windows and doors that reduce energy costs, block UV rays, and transform your home's comfort."
        formAnchor="#windows-estimate"
      />

      <TrustStrip />

      <OfferBanner
        offerText="$200 Off Per Window + $500 Off Sliding Doors"
        subtext="Limited time. Stackable with $0 down financing."
        ctaHref="#windows-estimate"
      />

      {/* ════════ KEY BENEFITS ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Anlin Windows</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Premium Windows. <span className="text-orange">Engineered for California.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "95% UV Protection",
                desc: "Anlin's exclusive Infinit-e Plus glass blocks up to 95% of UV rays, reducing fading and keeping your home cooler.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Noise Reduction",
                desc: "Sound Suppression Technology creates a noticeably quieter home — perfect for busy streets and neighborhoods.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                ),
              },
              {
                title: "Double Lifetime Warranty",
                desc: "Anlin's transferable double lifetime warranty covers parts and labor. These may be the last windows you ever buy.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
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

      {/* ════════ WHY ANLIN — CONTENT ════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Exclusive Anlin Partner</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              What Makes Anlin <span className="text-orange">Different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4">
                {[
                  "Dual or triple-pane with argon gas fill",
                  "Custom-built to your home's exact specifications",
                  "Made in California — faster lead times",
                  "Multiple frame colors, grid options, and hardware finishes",
                  "Blocks up to 95% of UV rays",
                  "Double lifetime transferable warranty",
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
                src="/images/windows/windows-interior.png"
                alt="Anlin windows installed in Fresno home"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ════════ COMPARISON ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>How Anlin Compares</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Not All Windows Are <span className="text-orange">Created Equal</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-sm font-bold text-gray-text uppercase tracking-wider">Feature</div>
              <div className="text-center text-sm font-bold text-orange uppercase tracking-wider">Anlin</div>
              <div className="text-center text-sm font-bold text-gray-text uppercase tracking-wider">Big Box</div>
            </div>
            {/* Rows */}
            {[
              { feature: "Energy-Efficient Glass", anlin: "Infinit-e Plus", bigbox: "Basic" },
              { feature: "Lifetime Warranty", anlin: "Double, Transferable", bigbox: "Limited" },
              { feature: "Noise Reduction", anlin: "Sound Suppression", bigbox: "—" },
              { feature: "Custom Built", anlin: "Exact Fit", bigbox: "Stock Sizes" },
              { feature: "Made in California", anlin: "Yes", bigbox: "—" },
              { feature: "Price to Value", anlin: "Excellent", bigbox: "$$$" },
            ].map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 gap-4 py-4 ${i < 5 ? "border-b border-gray-100" : ""}`}
              >
                <div className="text-navy font-medium text-[15px]">{row.feature}</div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 text-navy font-semibold text-sm">
                    <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {row.anlin}
                  </span>
                </div>
                <div className="text-center text-gray-text text-sm">{row.bigbox}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <ProcessSteps
        subtitle="From measurement to install — most homes done in 1-2 days."
        steps={windowsSteps}
      />
      <CredentialsGrid />
      <FinancingSection formAnchor="#windows-estimate" />
      <ReviewsCarousel />
      <FAQSection title="Window Replacement Questions, Answered" items={windowsFAQ} />
      <ServiceArea />
      <CTABanner headline="Ready for New Windows?" formAnchor="#windows-estimate" />
      <LeadForm id="windows-estimate" headline="Get Your Free Window Estimate" defaultService="Windows & Doors" />
      <MobileStickyBar formAnchor="#windows-estimate" />
    </>
  );
}
