import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import OfferBanner from "@/components/OfferBanner";
import BeforeAfter from "@/components/BeforeAfter";
import ProcessSteps from "@/components/ProcessSteps";
import CredentialsGrid from "@/components/CredentialsGrid";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import FAQSection from "@/components/FAQSection";
import ServiceArea from "@/components/ServiceArea";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";
import { testimonials } from "@/data/testimonials";
import { buildServiceSchema, jsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Window Replacement Fresno CA | Energy-Efficient Vinyl Windows | HEC",
  description:
    "Top-rated window replacement in Fresno. Anlin Certified, BBB A+, 228+ five-star reviews. Energy-efficient vinyl windows built for Valley heat. Free estimates.",
  alternates: {
    canonical: `${SITE_URL}/windows/fresno`,
  },
};

const fresnoServiceSchema = buildServiceSchema({
  serviceType: "Window Replacement",
  name: "Window Replacement in Fresno, CA",
  description:
    "Energy-efficient vinyl windows built for Fresno's climate. Cut your AC bills, block UV, and upgrade your home's curb appeal.",
  path: "/windows/fresno",
  areaServed: {
    "@type": "City",
    name: "Fresno",
    addressRegion: "CA",
  },
});

const fresnoSteps = [
  { number: "01", title: "Free In-Home Estimate", description: "We measure every window, talk through your goals, and give you an exact quote — no pressure, no gimmicks." },
  { number: "02", title: "Custom Order", description: "Anlin manufactures your windows to spec. Custom sizes, frames, and glass for your home." },
  { number: "03", title: "Professional Install", description: "Our crew installs in 1-2 days. We protect floors, clean up daily, and treat your home like our own." },
  { number: "04", title: "Lifetime Warranty", description: "Anlin's lifetime warranty + HEC workmanship guarantee. Both transfer if you ever sell." },
];

const climateCards = [
  {
    title: "Beat the Valley Heat",
    desc: "Fresno summers regularly hit 100°F+. Our energy-efficient vinyl windows reflect heat, reduce solar gain, and ease the load on your AC.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Cut Energy Bills",
    desc: "Older single-pane and aluminum windows leak energy year-round. New double-pane Low-E windows can significantly reduce heating and cooling costs.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Block UV, Protect Interiors",
    desc: "Strong Central Valley sun fades furniture, flooring, and artwork. Our windows include UV-blocking coatings standard.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const includedSpecs = [
  {
    title: "Anlin Certified Installation",
    desc: "Our installers are factory-trained and certified by Anlin to install their windows correctly the first time. That's the difference between a window that lasts decades and one that fails in five years.",
  },
  {
    title: "Lifetime Manufacturer Warranty",
    desc: "Anlin's transferable double lifetime warranty covers parts and labor. Sell your home and the warranty goes with it — adding real resale value.",
  },
  {
    title: "Low-E Glass Coating",
    desc: "Low-emissivity coating reflects heat back outside in summer and inside in winter. Critical for Central Valley energy efficiency.",
  },
  {
    title: "Energy Star Rated",
    desc: "Every standard window we install meets or exceeds Energy Star requirements for our climate zone — qualifying for federal credits where applicable.",
  },
  {
    title: "Custom Sizing",
    desc: "Each window is built to your home's exact specifications. No off-the-shelf compromises that leave gaps for air infiltration.",
  },
  {
    title: "Professional Removal & Disposal",
    desc: "We handle the full teardown of your old windows and dispose of them properly. No mess, no surprise charges.",
  },
];

const fresnoFAQ = [
  {
    question: "How much do replacement windows cost in Fresno?",
    answer:
      "Cost depends on window count, size, style, and frame material. Most Fresno homeowners spend somewhere between $700 and $1,500 per window for fully installed Anlin vinyl, with full-home projects typically running $8,000–$25,000. Free in-home estimates give you exact numbers for your home — no ballparks.",
  },
  {
    question: "Do new windows really lower energy bills in Fresno?",
    answer:
      "Yes. Fresno summers regularly hit 100°F+, and older single-pane or aluminum-frame windows let that heat pour in. Modern double-pane Low-E windows with argon gas insulation cut solar heat gain dramatically — most homeowners see 20–30% lower cooling bills, with bigger drops in homes that previously had original 1970s or 1980s windows.",
  },
  {
    question: "How long does a full home window replacement take?",
    answer:
      "Most Fresno homes are completed in 1–2 days depending on window count and size. We arrive on time, lay protective coverings inside, and clean up everything before we leave. You'll be enjoying your new windows the same week.",
  },
  {
    question: "Are your windows Energy Star rated?",
    answer:
      "Yes — all our standard windows meet or exceed Energy Star requirements for the Fresno climate zone. That's important for both energy savings and qualifying for federal energy efficiency tax credits where applicable.",
  },
  {
    question: "Do I qualify for energy efficiency rebates or tax credits?",
    answer:
      "Federal energy efficiency tax credits are available for qualifying Energy Star-rated windows, and local utility companies sometimes offer additional rebates. We'll point you to current programs during your free estimate so you can capture every available incentive. Tax credit eligibility depends on your individual situation — check with a tax professional.",
  },
  {
    question: "What window brands do you install?",
    answer:
      "We're an Anlin Certified installer. Anlin is a California-based manufacturer specifically engineered for Western U.S. climate conditions. They offer one of the strongest lifetime warranties in the industry — fully transferable if you ever sell your home.",
  },
];

const fresnoAreaCities = [
  "Fresno",
  "Clovis",
  "Madera",
  "Sanger",
  "Selma",
  "Reedley",
  "Kingsburg",
];
const fresnoAreaReviews = testimonials.filter((t) =>
  fresnoAreaCities.includes(t.city)
);

export default function FresnoWindowsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(fresnoServiceSchema) }}
      />

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <Image
          src="/images/windows/hero-house.png"
          alt="Window replacement project in Fresno by Home Energy Construction"
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
            <SectionLabel>Fresno, California</SectionLabel>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] mb-6">
              Window Replacement in{" "}
              <span className="text-orange">Fresno, CA</span>
            </h1>
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-6 max-w-lg">
              Energy-efficient vinyl windows built for Fresno&apos;s climate.
              Cut your AC bills, block UV, and upgrade your home&apos;s curb
              appeal.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-lg">
              228+ five-star reviews · BBB A+ rated · Anlin Certified ·
              Licensed CA #1086515
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton href="#fresno-windows-form">
                Get Free Estimate
              </CTAButton>
              <CTAButton variant="outline" href="tel:+15592158516">
                Call (559) 215-8516
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <OfferBanner
        offerText="Buy 5 Windows, Get the 6th FREE"
        subtext="June only. Stackable with $0 down financing."
        ctaHref="#fresno-windows-form"
      />

      {/* ════════ WHY FRESNO HOMEOWNERS — local relevance ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Fresno Homeowners Choose New Windows</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Built for{" "}
              <span className="text-orange">Fresno&apos;s Climate</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {climateCards.map((c) => (
              <div
                key={c.title}
                className="bg-white border border-gray-100 rounded-2xl p-8 card-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{c.title}</h3>
                <p className="text-gray-text text-[15px] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ LOCAL SERVICE AREA paragraph ════════ */}
      <Section className="py-20 md:py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Local Coverage</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-6">
            Serving Fresno &amp; the Surrounding Communities
          </h2>
          <p className="text-gray-text text-base sm:text-lg leading-relaxed">
            We serve Fresno and surrounding Central Valley communities —
            including Clovis, Madera, Sanger, Selma, Reedley, Kingsburg, and
            the Fig Garden, Sunnyside, Woodward Park, Bullard, and Old Fig
            Garden neighborhoods. Whether you live in a 1970s tract home with
            original aluminum frames or a newer build with failing dual-panes,
            we have a solution that fits.
          </p>
        </div>
      </Section>

      {/* ════════ REAL RESULTS ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
              See the Difference
            </h2>
            <p className="text-gray-text text-lg leading-relaxed">
              Premium Anlin windows transform energy efficiency and curb
              appeal — recent project from a Fresno-area home.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfter
              beforeLabel="Before"
              afterLabel="After"
              caption="Full window replacement — Fresno area home"
              beforeImage="/images/windows/before-windows.png"
              afterImage="/images/windows/after-windows.png"
            />
          </div>
        </div>
      </Section>

      {/* ════════ WHAT'S INCLUDED ════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
              Every Project, <span className="text-orange">Every Time.</span>
            </h2>
            <p className="text-gray-text text-lg leading-relaxed">
              Standard with every Fresno window installation — no upsells,
              no surprises.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedSpecs.map((spec) => (
              <div
                key={spec.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm card-lift"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange/10 text-orange flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <h3 className="text-base font-bold text-navy leading-tight">
                    {spec.title}
                  </h3>
                </div>
                <p className="text-gray-text text-[15px] leading-relaxed pl-10">
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <ProcessSteps
        subtitle="From measurement to install — most Fresno homes done in 1-2 days."
        steps={fresnoSteps}
      />

      <CredentialsGrid compact />

      <ReviewsCarousel reviews={fresnoAreaReviews} />

      <FAQSection
        title="Fresno Window Replacement Questions, Answered"
        items={fresnoFAQ}
      />

      <ServiceArea />

      {/* ════════ FINAL CTA + FORM ════════ */}
      <section
        id="fresno-windows-form"
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
          <SectionLabel>Free Estimate</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            Get Your Free{" "}
            <span className="text-orange">Fresno Window Estimate</span>
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            We&apos;ll measure every window, walk you through your options,
            and give you an exact quote — no obligation.
          </p>
        </div>
        <div className="relative">
          <LeadForm
            id="fresno-windows-estimate"
            headline="Get Your Free Estimate"
            defaultService="Windows & Doors"
          />
        </div>
      </section>

      <MobileStickyBar formAnchor="#fresno-windows-form" />
    </>
  );
}
