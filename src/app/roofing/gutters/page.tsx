"use client";

import SubPageHero from "@/components/SubPageHero";
import TrustStrip from "@/components/TrustStrip";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import FAQ from "@/components/FAQ";
import CTAButton from "@/components/CTAButton";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CTABanner from "@/components/CTABanner";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Gutters", href: "/roofing/gutters" },
];

export default function GuttersPage() {
  return (
    <>
      <SubPageHero
        image="/images/roofing/roofing-crew.png"
        imageAlt="Rain gutter installation in Fresno"
        headlineWhite="Rain Gutters &"
        headlineOrange="Drainage"
        subtext="Protect your home's foundation, fascia, and landscaping with professional gutter systems."
        formAnchor="#gutters-estimate"
        breadcrumbs={crumbs}
      />
      <TrustStrip />

      {/* ── Gutter Systems ── */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>What We Install</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Professional Gutter <span className="text-orange">Solutions</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "5K Aluminum Gutters", desc: "Standard residential size. K-style profile with hidden hangers for a clean look. Ideal for most Central Valley homes.", points: ["Handles moderate rainfall", "Clean, seamless appearance", "Multiple color options"] },
              { title: "6K Aluminum Gutters", desc: "Larger capacity for homes with bigger rooflines or heavy water flow areas. Same clean K-style profile with hidden hangers.", points: ["40% more capacity than 5K", "Ideal for large or multi-story homes", "Handles heavy downpours"] },
            ].map((g) => (
              <div key={g.title} className="bg-white rounded-2xl p-8 border border-gray-100 card-lift">
                <h3 className="text-xl font-bold text-navy mb-3">{g.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed mb-4">{g.desc}</p>
                <ul className="space-y-2">
                  {g.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-navy">
                      <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Why Gutters Matter ── */}
      <Section className="py-20 md:py-28 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Protect Your Home</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">More Than Just <span className="text-orange">Rain Gutters</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Foundation Protection", desc: "Without gutters, water pools around your foundation causing cracks, settling, and costly structural damage." },
              { title: "Fascia & Roof Edge", desc: "Proper drainage protects your fascia boards from rot and your roof edge from water damage." },
              { title: "Landscaping & Curb Appeal", desc: "Controlled drainage prevents erosion and water staining on your home's exterior." },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-8 border border-gray-100 card-lift">
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{b.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Bundle & Save ── */}
      <Section className="relative py-20 md:py-28 bg-navy noise-overlay">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Add Gutters to Any <span className="text-orange">Roofing Project</span></h2>
          <p className="text-gray-300 text-[15px] leading-relaxed mb-8">
            Getting a new roof? Add gutters at the same time and save. We handle everything in one project — one crew, one timeline, one invoice.
          </p>
          <CTAButton href="#gutters-estimate">Get a Bundle Quote</CTAButton>
        </div>
      </Section>

      <FAQ headline="Gutter FAQ" items={[
        { q: "How much do new gutters cost?", a: "Most residential gutter installations range from $1,500-$4,000 depending on the size of your home and the system selected." },
        { q: "Do you offer gutter guards?", a: "We can discuss gutter protection options during your consultation." },
        { q: "Can you replace just the gutters without doing the roof?", a: "Absolutely. We install gutters as a standalone service as well as part of roofing projects." },
      ]} />

      <ReviewsCarousel />
      <CTABanner headline="Ready for New Gutters?" formAnchor="#gutters-estimate" />
      <LeadForm id="gutters-estimate" headline="Get Your Free Gutter Estimate" defaultService="Roofing" />
      <MobileStickyBar formAnchor="#gutters-estimate" />
    </>
  );
}
