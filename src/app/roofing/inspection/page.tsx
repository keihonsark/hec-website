"use client";

import SubPageHero from "@/components/SubPageHero";
import TrustStrip from "@/components/TrustStrip";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import FAQ from "@/components/FAQ";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CTABanner from "@/components/CTABanner";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Free Inspection", href: "/roofing/inspection" },
];

export default function InspectionPage() {
  return (
    <>
      <SubPageHero
        image="/images/roofing/roofing-crew.png"
        imageAlt="Roof inspection in Fresno"
        headlineWhite="Free Roof"
        headlineOrange="Inspection"
        subtext="No cost. No obligation. No pressure. Just an honest look at your roof from certified professionals."
        formAnchor="#inspection-estimate"
        breadcrumbs={crumbs}
      />
      <TrustStrip />

      {/* ── What We Inspect ── */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Thorough &amp; Honest</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">A Complete Roof <span className="text-orange">Health Check</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Shingle Condition", desc: "Checking for curling, cracking, granule loss, and missing shingles" },
              { title: "Flashing & Seals", desc: "Inspecting all flashing around chimneys, vents, pipes, and skylights" },
              { title: "Gutters & Drainage", desc: "Ensuring proper water flow and checking for damage or blockage" },
              { title: "Ventilation", desc: "Checking attic ventilation — poor airflow ruins roofs and drives up AC bills" },
              { title: "Structure", desc: "Looking for sagging, soft spots, or signs of water damage in the decking" },
              { title: "Overall Assessment", desc: "You get an honest evaluation with photos and recommendations" },
            ].map((item) => (
              <div key={item.title} className="bg-light-bg rounded-2xl p-7 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Why Get an Inspection ── */}
      <Section className="relative py-20 md:py-28 bg-navy noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-12">Catch Problems <span className="text-orange">Before They Cost You</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Prevent Costly Damage", desc: "A $200 repair today can prevent a $10,000 problem next year. Early detection saves money." },
              { title: "Protect Your Home Value", desc: "A well-maintained roof adds up to 9% to your home's resale value. Know where you stand." },
              { title: "Peace of Mind", desc: "No more wondering if your roof will make it through the next season. Know for sure." },
            ].map((b) => (
              <div key={b.title} className="bg-navy-light/50 border-l-4 border-l-orange rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── What to Expect ── */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel>No Pressure</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">What to Expect</h2>
          </div>
          <div className="space-y-0">
            {[
              "We inspect your roof — takes about 30-45 minutes",
              "You get a written report with photos and our honest recommendation",
              "If repairs or replacement are needed, we provide a detailed quote with financing options. If your roof is fine, we'll tell you that too.",
            ].map((step, i) => (
              <div key={i} className="flex gap-5 pb-8 relative">
                {i < 2 && <div className="absolute left-[19px] top-10 bottom-0 w-px bg-orange/20" />}
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-orange font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-gray-text text-[15px] leading-relaxed pt-2">{step}</p>
              </div>
            ))}
          </div>
          <div className="bg-orange/5 border border-orange/15 rounded-xl p-5 text-center mt-4">
            <p className="text-navy text-sm font-medium">We never pressure you into unnecessary work. Our reputation depends on honesty.</p>
          </div>
        </div>
      </Section>

      <FAQ headline="Roof Inspection FAQ" items={[
        { q: "Is the inspection really free?", a: "Yes. 100% free, no strings attached. We inspect your roof, give you our honest assessment, and you decide what to do next." },
        { q: "How long does an inspection take?", a: "About 30-45 minutes for a standard residential roof. We'll schedule a time that works for you." },
        { q: "Will you get on the roof?", a: "Yes, when safe to do so. We do a thorough hands-on inspection, not just a look from the ground." },
      ]} />

      <ReviewsCarousel />
      <CTABanner headline="Schedule Your Free Inspection" formAnchor="#inspection-estimate" />
      <LeadForm id="inspection-estimate" headline="Schedule Your Free Roof Inspection" defaultService="Roofing" serviceOptions={["Inspection", "Roof Repair", "Roof Replacement", "Not Sure"]} />
      <MobileStickyBar formAnchor="#inspection-estimate" />
    </>
  );
}
