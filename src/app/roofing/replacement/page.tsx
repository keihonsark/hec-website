"use client";

import Image from "next/image";
import SubPageHero from "@/components/SubPageHero";
import TrustStrip from "@/components/TrustStrip";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import BeforeAfter from "@/components/BeforeAfter";
import FAQ from "@/components/FAQ";
import FinancingSection from "@/components/FinancingSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CTABanner from "@/components/CTABanner";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Roof Replacement", href: "/roofing/replacement" },
];

export default function ReplacementPage() {
  return (
    <>
      <SubPageHero
        image="/images/roofing/roofing-crew.png"
        imageAlt="Roof replacement crew in Fresno"
        headlineWhite="Complete Roof"
        headlineOrange="Replacement"
        subtext="Premium materials. Expert installation. $0 down financing. Most jobs done in 1-2 days."
        formAnchor="#replacement-estimate"
        breadcrumbs={crumbs}
      />
      <TrustStrip />

      {/* ── Know the Signs ── */}
      <Section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/before-after/before-roof-1.png"
                alt="Damaged roof showing signs of wear in Fresno"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Content */}
            <div>
              <SectionLabel>Know the Signs</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4">
                Is It Time for a <span className="text-orange">New Roof?</span>
              </h2>
              <p className="text-gray-text text-[15px] leading-relaxed mb-6">
                Most roofs in the Central Valley last 20-30 years depending on
                materials and maintenance. Heat, UV exposure, and age all take
                their toll. If your roof is showing any of these signs, it may be
                time for a full replacement rather than another patch job.
              </p>
              <div className="space-y-3">
                {[
                  "Roof is 20+ years old",
                  "Curling, cracking, or missing shingles",
                  "Visible wear or granule loss",
                  "Multiple leaks or recurring repairs",
                  "Sagging or uneven roofline",
                  "Rising energy bills",
                  "Planning to sell your home",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-navy text-[15px] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Before / After ── */}
      <Section className="py-14 md:py-20 bg-light-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              See the <span className="text-orange">Transformation</span>
            </h2>
          </div>
          <BeforeAfter
            beforeLabel="Before"
            afterLabel="After"
            caption="Complete roof replacement — Fresno, CA"
            beforeImage="/images/before-after/before-roof-1.png"
            afterImage="/images/before-after/after-roof-1.png"
          />
        </div>
      </Section>

      {/* ── Roofing Systems ── */}
      <Section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>Materials</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Built to Last.{" "}
              <span className="text-orange">Built for the Valley.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Asphalt */}
            <div className="relative bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative h-[200px]">
                <Image src="/images/hero/hero-home.png" alt="Asphalt shingle roof" fill sizes="33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/30 to-transparent" />
                <span className="absolute bottom-4 left-5 text-white font-extrabold text-lg tracking-wide">ASPHALT SHINGLE</span>
                <span className="absolute top-3 right-3 bg-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Most Popular</span>
              </div>
              <div className="border-t-[4px] border-orange" />
              <div className="p-6">
                <p className="text-gray-text text-sm leading-relaxed mb-4">
                  The most popular choice for Central Valley homes. Owens Corning
                  Duration and TruDefinition architectural shingles offer
                  excellent durability, energy efficiency, and curb appeal.
                </p>
                <ul className="space-y-2">
                  {["Lifetime manufacturer warranty", "Cool roof compliant", "Multiple color options"].map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-navy">
                      <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tile */}
            <div className="relative bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative h-[200px]">
                <Image src="/images/before-after/after-roof-2.png" alt="Tile roof" fill sizes="33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/30 to-transparent" />
                <span className="absolute bottom-4 left-5 text-white font-extrabold text-lg tracking-wide">TILE ROOFING</span>
              </div>
              <div className="border-t-[4px] border-navy" />
              <div className="p-6">
                <p className="text-gray-text text-sm leading-relaxed mb-4">
                  Classic California style. We handle full tile re-roofs, tile
                  lift &amp; lay, and tile-to-shingle conversions when tile is too
                  damaged or heavy.
                </p>
                <ul className="space-y-2">
                  {["40-50 year lifespan", "Excellent heat resistance", "Premium curb appeal"].map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-navy">
                      <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Flat */}
            <div className="relative bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative h-[200px] bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                <span className="text-white font-extrabold text-lg tracking-wide">FLAT / LOW-SLOPE</span>
              </div>
              <div className="border-t-[4px] border-navy-light" />
              <div className="p-6">
                <p className="text-gray-text text-sm leading-relaxed mb-4">
                  TPO single-ply membrane and modified bitumen systems for flat
                  roofs, patios, and porches. Energy-efficient, Title 24
                  compliant.
                </p>
                <ul className="space-y-2">
                  {["TPO heat-welded seams", "Energy efficient white membrane", "20+ year warranty"].map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-navy">
                      <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5-Step Process ── */}
      <Section className="py-14 md:py-20 bg-light-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Your Roof Replacement in{" "}
              <span className="text-orange">5 Steps</span>
            </h2>
          </div>
          <div className="relative">
            {/* Continuous vertical line */}
            <div className="absolute left-[23px] top-[24px] bottom-[24px] w-[2px] bg-orange/30 z-0" />

            {[
              { title: "Free Inspection", desc: "We inspect your entire roof system — decking, underlayment, flashing, ventilation — and give you an honest assessment." },
              { title: "Detailed Quote", desc: "You get a transparent quote with no hidden fees. We walk you through materials, timeline, and financing options." },
              { title: "Permits & Prep", desc: "We pull all required permits. Every re-roof we do is fully permitted and inspected — no shortcuts." },
              { title: "Installation", desc: "Our experienced crew tears off the old roof, replaces any damaged wood, and installs your new roof system. Most jobs completed in 1-2 days." },
              { title: "Final Inspection & Warranty", desc: "City inspection, thorough cleanup, and your warranty paperwork. We stand behind every job." },
            ].map((step, i) => (
              <div key={step.title} className="flex gap-5 pb-10 last:pb-0 relative">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center flex-shrink-0 z-10 shadow-lg ring-4 ring-light-bg">
                  <span className="text-orange font-extrabold text-base">{i + 1}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-navy mb-1">{step.title}</h3>
                  <p className="text-gray-text text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── What's Included ── */}
      <Section className="relative py-14 md:py-20 bg-navy noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10">
            Every Roof Replacement Includes:
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {[
              "Complete tear-off of old roofing",
              "Damaged wood replacement (as needed)",
              "Ice & water shield in valleys",
              "Synthetic underlayment",
              "New drip edge and flashing",
              "Ridge vents / proper ventilation",
              "Full cleanup and haul-away",
              "City permit and inspection",
              "Manufacturer warranty",
              "Workmanship warranty",
            ].map((item) => (
              <div
                key={item}
                className="bg-navy-light/50 rounded-[10px] px-4 py-3.5 flex items-center gap-3 hover:bg-navy-light/70 transition-colors"
              >
                <svg className="w-5 h-5 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FAQ
        headline="Roof Replacement FAQ"
        items={[
          { q: "How long does a roof replacement take?", a: "Most residential re-roofs are completed in 1-2 days. Larger homes or complex roofs may take 3-4 days." },
          { q: "Do I need to be home during the replacement?", a: "No. We just need access to your property. We'll coordinate everything with you beforehand." },
          { q: "Will you replace rotted wood under the roof?", a: "Yes. We inspect the decking during tear-off and replace any damaged plywood. This is quoted separately as a change order since damage isn't visible until the old roof is removed." },
          { q: "Is the job permitted and inspected?", a: "Always. Every re-roof we do is fully permitted with the city. This protects you, your warranty, and your home's value." },
        ]}
      />

      <FinancingSection formAnchor="#replacement-estimate" />
      <ReviewsCarousel />
      <CTABanner headline="Ready for a New Roof?" formAnchor="#replacement-estimate" />
      <LeadForm
        id="replacement-estimate"
        headline="Get Your Free Roof Replacement Estimate"
        defaultService="Roofing"
        serviceOptions={["Roof Replacement", "Roof Repair", "Storm Damage", "Inspection", "Not Sure"]}
      />
      <MobileStickyBar formAnchor="#replacement-estimate" />
    </>
  );
}
