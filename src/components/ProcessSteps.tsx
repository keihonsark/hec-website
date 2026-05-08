import Section from "./Section";
import SectionLabel from "./SectionLabel";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title?: string;
  subtitle?: string;
  steps: Step[];
}

export default function ProcessSteps({
  title = "How It Works",
  subtitle,
  steps,
}: ProcessStepsProps) {
  return (
    <Section className="py-24 md:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-text text-lg leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Desktop connector line — runs through circle centers */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-orange/30"
          />

          {steps.map((step) => (
            <div key={step.number} className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-navy text-white flex items-center justify-center font-extrabold text-lg shadow-md ring-4 ring-light-bg">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
              <p className="text-gray-text text-[15px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
