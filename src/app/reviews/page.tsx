import type { Metadata } from "next";
import { Smile } from "lucide-react";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import GoogleG from "@/components/icons/GoogleG";
import ReviewCard from "@/components/ReviewCard";
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
    <span className="inline-flex gap-1">
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
    </span>
  );
}

const featuredReview = testimonials[0]; // Maria G., Fresno, Roofing
const backReview = testimonials[1]; // James T., Clovis, HVAC

const stats = [
  {
    value: "4.7 / 5",
    label: "Average Rating",
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
  },
  { value: "228+", label: "Google Reviews", isGoogle: true },
  {
    value: "95%+",
    label: "Satisfaction",
    icon: <Smile className="w-10 h-10" strokeWidth={1.75} />,
  },
  {
    value: "20+",
    label: "Cities Served",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

function MockGoogleReviewCard({
  initial,
  name,
  meta,
  timeAgo,
  text,
  helpful,
  avatarBg = "bg-orange",
  className = "",
  style,
}: {
  initial: string;
  name: string;
  meta: string;
  timeAgo: string;
  text: string;
  helpful: number;
  avatarBg?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-2xl p-6 ${className}`}
      style={style}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
            {initial}
          </div>
          <div className="leading-tight">
            <p className="text-navy font-semibold text-sm">{name}</p>
            <p className="text-gray-500 text-xs">{meta}</p>
          </div>
        </div>
        <GoogleG className="w-6 h-6 flex-shrink-0" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <StarRow size="w-4 h-4" />
        <span className="text-gray-500 text-xs">{timeAgo}</span>
      </div>
      <p className="text-gray-800 text-[15px] leading-relaxed mb-4">
        &ldquo;{text}&rdquo;
      </p>
      <p className="flex items-center gap-1.5 text-gray-500 text-xs">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
        </svg>
        Helpful ({helpful})
      </p>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reviewsSchema) }}
      />

      {/* ════════ HERO ════════ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B2D4F 0%, #0F1D33 100%)",
        }}
      >
        {/* Subtle orange radial glow top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <span className="inline-block text-orange text-sm font-bold uppercase tracking-[0.2em] mb-5">
                Google Reviews
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
                Trusted by 228+ Central Valley Homeowners
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <StarRow size="w-7 h-7" />
                <span className="text-orange text-4xl font-extrabold leading-none">
                  4.7
                </span>
              </div>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
                Real reviews from real homeowners across Fresno, Visalia,
                Sacramento, and surrounding communities. Every review verified
                on Google.
              </p>

              <div className="flex flex-wrap gap-3 mb-5">
                <a
                  href="/windows-offer"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-base tracking-wide bg-orange text-white hover:bg-orange-dark shadow-lg shadow-orange/20 transition-all duration-200 cta-press"
                >
                  Get Free Estimate
                </a>
                <a
                  href="https://www.google.com/search?q=Home+Energy+Construction+Fresno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-base tracking-wide border-2 border-white text-white hover:bg-white/10 transition-all duration-200 cta-press"
                >
                  See All Reviews on Google
                </a>
              </div>

              <p className="text-white/60 text-xs sm:text-sm">
                Verified on Google · BBB A+ Rated · 228+ Five-Star Reviews
              </p>
            </div>

            {/* RIGHT — Mock Google review cards */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Back card — absolute, peeks behind the front card */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  transform: "rotate(4deg) translate(2rem, 2rem)",
                  opacity: 0.55,
                  zIndex: 1,
                }}
                aria-hidden="true"
              >
                <MockGoogleReviewCard
                  initial={backReview.name.charAt(0)}
                  name={backReview.name}
                  meta="Local Guide · 23 reviews"
                  timeAgo="1 month ago"
                  text={backReview.text}
                  helpful={8}
                  avatarBg="bg-navy"
                />
              </div>
              {/* Front card — normal flow, on top */}
              <div className="relative z-10">
                <MockGoogleReviewCard
                  initial={featuredReview.name.charAt(0)}
                  name={featuredReview.name}
                  meta="Local Guide · 47 reviews · 12 photos"
                  timeAgo="2 weeks ago"
                  text={featuredReview.text}
                  helpful={12}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ STATS STRIP ════════ */}
      <section className="bg-[#0F1D33] py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-orange mb-3 inline-flex items-center justify-center">
                  {stat.isGoogle ? <GoogleG className="w-10 h-10" /> : stat.icon}
                </span>
                <div className="text-4xl lg:text-5xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-2 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FEATURED REVIEWS GRID ════════ */}
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
              <ReviewCard
                key={`${t.name}-${t.city}`}
                text={t.text}
                name={t.name}
                city={t.city}
                service={t.service}
                grid
              />
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

      {/* ════════ FINAL CTA — heading band ════════ */}
      <section className="relative py-20 md:py-24 bg-navy-dark noise-overlay overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(245,166,35,0.3) 40px, rgba(245,166,35,0.3) 41px)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            Ready to Join Our{" "}
            <span className="text-orange">Five-Star Customers?</span>
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            Free estimate. Honest answers. No high-pressure sales.
          </p>
        </div>
      </section>

      {/* ════════ LEAD FORM ════════ */}
      <LeadForm
        id="reviews-estimate"
        headline="Get Your Free Estimate"
        defaultService="Windows & Doors"
      />

      <MobileStickyBar formAnchor="#reviews-estimate" />
    </>
  );
}
