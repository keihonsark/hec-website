import CTAButton from "./CTAButton";

interface OfferBannerProps {
  offerText: string;
  subtext?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function OfferBanner({
  offerText,
  subtext,
  ctaText = "Get My Free Estimate",
  ctaHref = "#estimate-form",
}: OfferBannerProps) {
  return (
    <section className="bg-navy-dark border-y border-orange/30 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8 text-center md:text-left">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="hidden sm:inline-flex flex-shrink-0 w-7 h-7 rounded-full bg-orange/15 text-orange items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <p className="text-white font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight leading-tight">
                {offerText}
              </p>
            </div>
            {subtext && (
              <p className="text-white/60 text-sm mt-1.5 sm:ml-10">
                {subtext}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            <CTAButton href={ctaHref}>{ctaText}</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
