import Image from "next/image";
import Section from "./Section";
import SectionLabel from "./SectionLabel";

const credentials = [
  {
    logo: "/images/logos/bbb-logo.png",
    title: "BBB A+ Rated",
    desc: "Top accreditation from the Better Business Bureau.",
  },
  {
    logo: "/images/logos/owens-preferred-logo.png",
    title: "Owens Corning Preferred Contractor",
    desc: "Top tier shingle warranty + workmanship.",
  },
  {
    logo: "/images/logos/anlin-logo.png",
    title: "Anlin Certified Dealer",
    desc: "Premium California-made energy-efficient windows.",
  },
  {
    logo: "/images/logos/CSLB_logo.png",
    title: "CA Licensed #1086515",
    desc: "Bonded, insured, and state licensed.",
  },
  {
    logo: "/images/logos/Energy_Star_logo.svg",
    title: "Energy Star Partner",
    desc: "Products that meet federal energy efficiency standards.",
  },
  {
    logo: "/images/logos/nfrc-logo.png",
    title: "NFRC Certified",
    desc: "Independent ratings on every window we install.",
  },
];

interface CredentialsGridProps {
  compact?: boolean;
}

export default function CredentialsGrid({ compact = false }: CredentialsGridProps) {
  const sectionPadding = compact ? "py-16 md:py-20" : "py-24 md:py-32";
  const headingClass = compact
    ? "text-2xl sm:text-3xl font-extrabold text-navy"
    : "text-3xl sm:text-4xl font-extrabold text-navy";
  const headerMargin = compact ? "mb-10" : "mb-14";
  const gridGap = compact ? "gap-5" : "gap-6";
  const cardPadding = compact ? "p-6" : "p-7";
  const logoBoxHeight = compact ? "h-16" : "h-20";
  const logoMaxHeight = compact ? "max-h-16" : "max-h-20";
  const titleClass = compact
    ? "text-base font-bold text-navy mb-2"
    : "text-lg font-bold text-navy mb-2";
  const descClass = compact
    ? "text-gray-text text-sm leading-relaxed"
    : "text-gray-text text-[15px] leading-relaxed";

  return (
    <Section className={`${sectionPadding} bg-light-bg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto ${headerMargin}`}>
          <SectionLabel>Credentials &amp; Trust</SectionLabel>
          <h2 className={headingClass}>Certified. Accredited. Proven.</h2>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
          {credentials.map((c) => (
            <div
              key={c.title}
              className={`bg-white border border-gray-100 rounded-2xl ${cardPadding} shadow-sm card-lift text-center`}
            >
              <div className={`${logoBoxHeight} flex items-center justify-center mb-5`}>
                <Image
                  src={c.logo}
                  alt={c.title}
                  width={200}
                  height={80}
                  className={`${logoMaxHeight} w-auto object-contain`}
                />
              </div>
              <h3 className={titleClass}>{c.title}</h3>
              <p className={descClass}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
