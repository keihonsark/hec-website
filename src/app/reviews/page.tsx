import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import GoogleG from "@/components/GoogleG";
import CredentialsGrid from "@/components/CredentialsGrid";
import ServiceArea from "@/components/ServiceArea";
import LeadForm from "@/components/LeadForm";
import MobileStickyBar from "@/components/MobileStickyBar";
import { testimonials } from "@/data/testimonials";
import { jsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home Energy Construction Reviews | 4.7 Stars, 228+ Google Reviews",
  description:
    "Read 228+ five-star reviews from homeowners across Fresno, Visalia, Sacramento and the Central Valley. BBB A+ rated, Owens Corning Preferred, Anlin Certified.",
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
};

const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Home Energy Construction",
  url: `${SITE_URL}/reviews`,
  telephone: "+15595765067",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.7,
    reviewCount: 228,
    bestRating: 5,
  },
  review: testimonials.slice(0, 10).map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", "name": t.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating ?? 5,
      bestRating: 5,
    },
    reviewBody: t.text,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "Home Energy Construction",
    },
  })),
};

function StarRow({ size = "w-5 h-5" }: { size?: string }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${size} text-orange`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const stats = [
  { value: "4.7 / 5", label: "Average Rating" },
  { value: "228+", label: "Google Reviews" },
  { value: "95%+", label: "Satisfaction" },
  { value: "20+", label: "Cities Served" },
];

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reviewsSchema) }}
      />

      {/* ════════ HERO ════════ */}
      <section className="relative bg-navy-dark noise-overlay py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Customer Reviews</SectionLabel>

          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="text-7xl sm:text-8xl font-extrabold text-orange leading-none">
              4.7
            </div>
            <StarRow size="w-7 h-7" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5">
            228+ Five-Star Reviews from{" "}
            <span className="text-orange">Central Valley Homeowners</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Real reviews from real homeowners across Fresno, Visalia, Sacramento, and surrounding areas.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 flex items-center gap-2">
              <Image
                src="/images/logos/bbb-logo.png"
                alt="BBB A+ Accredited Business"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 flex items-center gap-2.5">
              <GoogleG className="w-7 h-7" />
              <span className="text-white font-semibold text-sm">
                Google Reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ STATS STRIP ════════ */}
      <section className="bg-white py-10 md:py-14 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-extrabold text-navy">
                  {stat.value}
                </div>
                <div className="text-gray-text text-sm font-medium uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FEATURED REVIEWS ════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Featured Reviews</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={`${t.name}-${t.city}`}
                className="relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 border-l-4 border-l-orange overflow-hidden"
              >
                <span className="absolute top-3 right-5 text-orange/[0.07] text-[80px] font-serif leading-none pointer-events-none select-none">
                  &ldquo;
                </span>
                {t.service && (
                  <span className="inline-block bg-navy text-white text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-3">
                    {t.service}
                  </span>
                )}
                <StarRow />
                <p className="relative text-gray-text italic text-[15px] leading-relaxed my-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-navy font-semibold text-sm">
                  — {t.name}, {t.city}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ GOOGLE REVIEWS CTA ════════ */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-light-bg border border-gray-200 rounded-full px-5 py-2.5 mb-6">
            <GoogleG className="w-5 h-5" />
            <span className="text-navy font-bold">4.7</span>
            <StarRow size="w-3.5 h-3.5" />
            <span className="text-gray-text text-sm">228+ reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4">
            Read Every Review on Google
          </h2>
          <p className="text-gray-text text-base mb-8 max-w-xl mx-auto">
            We let our customers speak for us. See the full collection of verified reviews on our Google Business Profile.
          </p>
          <a
            href="https://www.google.com/search?q=Home+Energy+Construction+Fresno"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-base tracking-wide bg-orange text-white hover:bg-orange-dark shadow-lg shadow-orange/20 transition-all duration-200 cta-press"
          >
            See All Reviews on Google →
          </a>
          <p className="text-gray-text text-xs mt-4 uppercase tracking-wider font-semibold">
            Verified Google Business Profile
          </p>
        </div>
      </section>

      <CredentialsGrid compact />

      <ServiceArea />

      {/* ════════ FINAL CTA + FORM ════════ */}
      <section
        id="reviews-estimate"
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            Ready to Join Our{" "}
            <span className="text-orange">Five-Star Customers?</span>
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            Free estimate. Honest answers. No high-pressure sales.
          </p>
        </div>
        <div className="relative">
          <LeadForm
            id="reviews-form"
            headline="Get Your Free Estimate"
            defaultService="Windows & Doors"
          />
        </div>
      </section>

      <MobileStickyBar formAnchor="#reviews-estimate" />
    </>
  );
}
