import Section from "./Section";
import SectionLabel from "./SectionLabel";

const cities = [
  "Fresno",
  "Clovis",
  "Madera",
  "Visalia",
  "Hanford",
  "Tulare",
  "Selma",
  "Sanger",
  "Reedley",
  "Merced",
  "Modesto",
  "Stockton",
  "Roseville",
  "Sacramento",
  "Porterville",
  "Lemoore",
  "Kingsburg",
  "Parlier",
  "Dinuba",
  "Chowchilla",
];

export default function ServiceArea() {
  return (
    <Section className="relative py-24 md:py-32 bg-navy noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel>Service Area</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Serving the Entire Central Valley
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            From Porterville to Sacramento — and every city in between.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {cities.map((city) => (
            <div
              key={city}
              className="flex items-center justify-center gap-2 bg-navy-light/50 border border-white/10 rounded-xl px-4 py-3 hover:border-orange/40 transition-colors"
            >
              <svg
                className="w-4 h-4 text-orange flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-white text-sm font-medium">{city}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-white/70 text-sm sm:text-base mt-10 max-w-xl mx-auto">
          Don&apos;t see your city? We probably still serve you.{" "}
          <a
            href="tel:+15595765067"
            className="text-orange font-semibold hover:text-orange-dark transition-colors whitespace-nowrap"
          >
            Call (559) 576-5067
          </a>{" "}
          to confirm.
        </p>
      </div>
    </Section>
  );
}
