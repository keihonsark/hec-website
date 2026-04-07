import Section from "./Section";
import CTAButton from "./CTAButton";

interface CTABannerProps {
  headline?: string;
  subtext?: string;
  formAnchor?: string;
}

export default function CTABanner({
  headline = "Ready to Upgrade Your Home?",
  subtext = "$0 down. Free estimates. Flexible financing.",
  formAnchor = "#estimate",
}: CTABannerProps) {
  return (
    <Section className="relative py-24 md:py-28 bg-navy-dark noise-overlay overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(245,166,35,0.3) 40px, rgba(245,166,35,0.3) 41px)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
          {headline}
        </h2>
        <p className="text-white/55 text-xl mb-10 max-w-xl mx-auto">
          {subtext}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton href="tel:5597976081">Call (559) 797-6081</CTAButton>
          <CTAButton variant="outline" href={formAnchor}>
            Get Free Estimate
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
