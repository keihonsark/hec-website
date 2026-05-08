import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import CredentialsGrid from "@/components/CredentialsGrid";
import ProcessSteps from "@/components/ProcessSteps";
import ServiceArea from "@/components/ServiceArea";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";
import { buildServiceSchema, jsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home Improvement Financing | $0 Down Options | HEC",
  description:
    "Flexible financing for windows, roofing, HVAC and more. $0 down, deferred payments, low monthly plans. Soft credit pull, fast approval. Serving Fresno to Sacramento.",
  alternates: {
    canonical: `${SITE_URL}/financing`,
  },
};

const serviceSchema = buildServiceSchema({
  serviceType: "Home Improvement Financing",
  name: "Home Improvement Financing in Fresno, CA",
  description:
    "Flexible financing options for windows, roofing, HVAC, insulation, and more — $0 down, deferred payments, and low monthly plans available.",
  path: "/financing",
});

const financingOptions = [
  {
    title: "$0 Down",
    desc: "Start your home upgrade without paying anything upfront.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
      </svg>
    ),
  },
  {
    title: "Deferred Payments",
    desc: "Begin payments later — start enjoying your upgrade now.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Low Monthly",
    desc: "Spread project cost over manageable monthly payments.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898M2.25 6l3 3m-3-3h3m-3 0V3" />
      </svg>
    ),
  },
  {
    title: "Cash Discount",
    desc: "Pay in full and unlock savings on your project.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375M21 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const whyFinance = [
  "Soft credit pull won't impact your score",
  "Quick approval (often within minutes)",
  "Trusted financing partners",
  "No hidden fees, transparent terms",
];

const financingSteps = [
  { number: "01", title: "Apply", description: "Quick online application takes ~2 minutes." },
  { number: "02", title: "Get Approved", description: "Soft credit pull, no impact to your score." },
  { number: "03", title: "Project Completed", description: "Our team handles installation start to finish." },
  { number: "04", title: "Easy Payments", description: "Manageable monthly payments on your terms." },
];

const financingFAQ = [
  {
    question: "Will applying affect my credit score?",
    answer:
      "No. Initial pre-qualification uses a soft credit pull, which has zero impact on your credit score.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Most homeowners get a decision within minutes of applying.",
  },
  {
    question: "What credit score do I need?",
    answer:
      "Our financing partners work with a wide range of credit profiles. Even if you've been turned down elsewhere, it's worth checking.",
  },
  {
    question: "Can I pay off the loan early?",
    answer:
      "Yes — most plans allow early payoff with no penalty.",
  },
  {
    question: "What if I have bad credit?",
    answer:
      "We work with multiple financing partners to maximize approval odds. Apply to see what's available for your situation.",
  },
  {
    question: "Are there prepayment penalties?",
    answer:
      "No prepayment penalties on standard financing plans.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <Image
          src="/images/about/happy-homeowners.png"
          alt="Happy Central Valley homeowners financing their home upgrade with Home Energy Construction"
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
            <SectionLabel>Flexible Financing</SectionLabel>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] mb-6">
              Upgrade Your Home.{" "}
              <span className="text-orange">Pay On Your Terms.</span>
            </h1>
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Flexible financing options for windows, roofing, HVAC, insulation, and more — designed to fit your budget.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton href="#financing-form">See If You Qualify</CTAButton>
              <CTAButton variant="outline" href="tel:+15592158516">
                Call (559) 215-8516
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FINANCING OPTIONS GRID ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Your Options</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
              Choose the Plan That Fits You
            </h2>
            <p className="text-gray-text text-lg leading-relaxed">
              Multiple financing paths so every budget can move forward.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {financingOptions.map((opt) => (
              <div
                key={opt.title}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 card-lift hover:border-orange/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
                  {opt.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{opt.title}</h3>
                <p className="text-gray-text text-[15px] leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ WHY FINANCE WITH HEC ════════ */}
      <Section className="py-20 md:py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>Why Finance With HEC</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Built for Homeowners,{" "}
              <span className="text-orange">Not Lenders.</span>
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
            <ul className="space-y-5">
              {whyFinance.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange/10 text-orange flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-navy text-base sm:text-lg font-semibold leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ProcessSteps
        title="How Financing Works"
        subtitle="From application to first payment — straightforward and quick."
        steps={financingSteps}
      />

      <CredentialsGrid compact />

      <ReviewsCarousel />

      <FAQSection title="Financing Questions, Answered" items={financingFAQ} />

      {/* ════════ FINAL CTA + FORM ════════ */}
      <section
        id="financing-form"
        className="relative py-24 md:py-32 bg-navy-dark noise-overlay overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(245,166,35,0.3) 40px, rgba(245,166,35,0.3) 41px)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <SectionLabel>Pre-Qualification</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            Ready to See What{" "}
            <span className="text-orange">You Qualify For?</span>
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            Free, no-obligation pre-qualification. Soft credit pull only — no impact on your credit.
          </p>
        </div>
        <div className="relative">
          <LeadForm
            id="financing-estimate"
            headline="Get Pre-Qualified"
            defaultService="Not Sure"
          />
        </div>
      </section>

      <ServiceArea />

      <MobileStickyBar formAnchor="#financing-form" />
    </>
  );
}
