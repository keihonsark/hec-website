import Section from "./Section";
import SectionLabel from "./SectionLabel";
import ReviewCard from "./ReviewCard";
import GoogleG from "./icons/GoogleG";
import { testimonials, type Testimonial } from "@/data/testimonials";

interface ReviewsCarouselProps {
  reviews?: Testimonial[];
  /** Hide the "See All Reviews" CTA at the bottom (e.g. on /reviews itself) */
  hideCta?: boolean;
}

export default function ReviewsCarousel({
  reviews,
  hideCta = false,
}: ReviewsCarouselProps) {
  const data = reviews ?? testimonials;

  return (
    <Section className="py-24 md:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Real Reviews</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
            What Our Customers Say
          </h2>
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-full px-5 py-2.5 shadow-sm">
            <GoogleG className="w-6 h-6" />
            <span className="text-navy font-bold text-lg">4.7</span>
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <span className="text-gray-text text-sm">228+ reviews</span>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-6 reviews-carousel w-max pl-4">
            {[...data, ...data].map((r, i) => (
              <ReviewCard
                key={`${r.name}-${i}`}
                text={r.text}
                name={r.name}
                city={r.city}
                service={r.service}
              />
            ))}
          </div>
        </div>

        {!hideCta && (
          <div className="text-center mt-12">
            <a
              href="/reviews"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-base tracking-wide bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white transition-colors cta-press"
            >
              See All 228+ Reviews →
            </a>
            <p className="text-gray-500 text-xs mt-3 uppercase tracking-wider font-semibold">
              Verified on Google Business Profile
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
