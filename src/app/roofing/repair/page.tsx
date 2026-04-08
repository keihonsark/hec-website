"use client";

import SubPageHero from "@/components/SubPageHero";
import TrustStrip from "@/components/TrustStrip";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import FAQ from "@/components/FAQ";
import FinancingSection from "@/components/FinancingSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CTABanner from "@/components/CTABanner";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Roof Repair", href: "/roofing/repair" },
];

export default function RepairPage() {
  return (
    <>
      <SubPageHero
        image="/images/roofing/roofing-crew.png"
        imageAlt="Roof repair professionals in Fresno"
        headlineWhite="Expert Roof"
        headlineOrange="Repair"
        subtext="Fix the problem before it gets worse. Fast, affordable repairs from Fresno's trusted roofing team."
        formAnchor="#repair-estimate"
        breadcrumbs={crumbs}
      />
      <TrustStrip />

      {/* ── Common Repairs ── */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>What We Fix</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">We Handle <span className="text-orange">It All</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Leak Repair", desc: "Locate and fix leaks before they cause interior damage. We trace every leak to its source." },
              { title: "Shingle Replacement", desc: "Replace cracked, curled, or missing shingles to restore your roof's protection." },
              { title: "Flashing Repair", desc: "Fix or replace flashing around chimneys, vents, and skylights — the most common leak points." },
              { title: "Tile Repair", desc: "Replace broken or cracked tiles. We handle individual tile replacement and valley cutbacks." },
              { title: "Gutter Damage", desc: "Repair or replace damaged gutters and fascia boards to protect your roof edge." },
              { title: "Emergency Repair", desc: "Urgent roof issues? Call us. We prioritize emergency repairs to protect your home." },
            ].map((r) => (
              <div key={r.title} className="bg-light-bg rounded-2xl p-7 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-3.19A1.5 1.5 0 015.25 10.7V6.79a1.5 1.5 0 01.786-1.32l5.384-3.19a1.5 1.5 0 011.56 0l5.384 3.19a1.5 1.5 0 01.786 1.32v3.91a1.5 1.5 0 01-.786 1.32l-5.384 3.19a1.5 1.5 0 01-1.56 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{r.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Repair vs Replace ── */}
      <Section className="py-20 md:py-28 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Honest Advice</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Should You <span className="text-orange">Repair or Replace?</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-navy mb-4">REPAIR might be right if:</h3>
              <ul className="space-y-3">
                {["Damage is isolated to one area", "Roof is less than 15 years old", "Budget is tight right now", "Only a few shingles are affected"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-text">
                    <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-navy mb-4">REPLACE might be better if:</h3>
              <ul className="space-y-3">
                {["Roof is 20+ years old", "Multiple areas showing damage", "Recurring leak issues", "You're planning to sell", "Energy bills are rising"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-text">
                    <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-gray-text text-sm text-center mt-8 max-w-xl mx-auto">
            Not sure? That&apos;s what our free inspection is for. We&apos;ll give you an honest recommendation — not a sales pitch.
          </p>
        </div>
      </Section>

      <FAQ headline="Roof Repair FAQ" items={[
        { q: "How much does a roof repair cost?", a: "Most repairs range from $300-$1,500 depending on the extent of damage. We provide a free inspection and quote before any work begins." },
        { q: "Can you fix a leak without replacing the whole roof?", a: "Often, yes. Many leaks are caused by damaged flashing or a small area of failed shingles. We'll find the source and fix it." },
        { q: "Do you repair tile roofs?", a: "Yes. We replace broken tiles, perform valley cutbacks to improve water flow, and repair underlayment on tile roofs." },
      ]} />

      <FinancingSection formAnchor="#repair-estimate" />
      <ReviewsCarousel />
      <CTABanner headline="Need a Roof Repair?" formAnchor="#repair-estimate" />
      <LeadForm id="repair-estimate" headline="Get Your Free Roof Repair Estimate" defaultService="Roofing" serviceOptions={["Roof Repair", "Roof Replacement", "Storm Damage", "Inspection", "Not Sure"]} />
      <MobileStickyBar formAnchor="#repair-estimate" />
    </>
  );
}
