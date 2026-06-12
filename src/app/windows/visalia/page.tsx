import type { Metadata } from "next";
import CityWindowsPage, { CityWindowsConfig } from "@/components/CityWindowsPage";
import { buildServiceSchema, jsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Window Replacement Visalia CA | Energy-Efficient Anlin Windows | HEC",
  description:
    "Anlin replacement windows for Visalia homes. Tame SCE summer bills, quiet the house, and keep Valley dust out. BBB A+, 228+ five-star reviews. Free estimates.",
  alternates: {
    canonical: `${SITE_URL}/windows/visalia`,
  },
};

const schema = buildServiceSchema({
  serviceType: "Window Replacement",
  name: "Window Replacement in Visalia, CA",
  description:
    "Energy-efficient Anlin replacement windows for Visalia homes — from historic districts to Shannon Ranch. Lower summer cooling costs and seal out Valley dust.",
  path: "/windows/visalia",
  areaServed: { "@type": "City", name: "Visalia", addressRegion: "CA" },
});

const config: CityWindowsConfig = {
  cityName: "Visalia",
  heroLabel: "Visalia, California",
  heroDescription:
    "From craftsman homes near downtown to newer builds in Shannon Ranch — energy-efficient Anlin windows that stand up to Visalia summers.",
  localCards: [
    {
      title: "Tame the Edison Summer Bill",
      desc: "Visalia runs on Southern California Edison rates, and July cooling costs add up fast. Low-E dual-pane glass cuts solar heat gain at the window, so your AC runs less during the hours that cost the most.",
    },
    {
      title: "Keep the Character, Lose the Drafts",
      desc: "Visalia's older neighborhoods are full of character homes with original wood or aluminum windows. Retrofit frames upgrade the glass and seal without gutting the look of the house.",
    },
    {
      title: "Shut Out Dust & Allergens",
      desc: "Between ag season and Valley air, dust and allergens find every gap in an old window frame. Anlin's triple-sealed frames close those gaps for good — cleaner sills, cleaner air.",
    },
  ],
  coverageHeadline: "Serving Visalia & Tulare County",
  coverageParagraph:
    "We install across Visalia — downtown and the historic districts, Green Acres, Plaza Park, Shannon Ranch, and out along Mooney Boulevard — plus Tulare, Exeter, Farmersville, and Hanford. Tulare County's mix of pre-war homes and 2000s subdivisions means no two projects are alike, so every window is measured and built to your home's exact openings.",
  processSubtitle:
    "From measurement to install — most Visalia homes are done in 1-2 days.",
  faqTitle: "Visalia Window Replacement Questions, Answered",
  faq: [
    {
      question: "What does window replacement cost in Visalia?",
      answer:
        "Most Visalia projects run $700–$1,500 per window fully installed depending on size, style, and frame, with whole-home replacements typically between $8,000 and $25,000. The free in-home estimate prices your exact windows — no surprises later.",
    },
    {
      question: "Will new windows lower my Edison bill?",
      answer:
        "If you're cooling through old single-pane or aluminum-frame windows, yes — that's where the biggest gains are. Modern Low-E dual-pane glass blocks a large share of solar heat before it enters the house, and most homeowners replacing older windows see a meaningful drop in summer cooling costs. We'll review your actual usage at the estimate.",
    },
    {
      question: "Can you replace windows in an older or historic Visalia home?",
      answer:
        "Yes — it's a specialty. Retrofit installation upgrades the glass and frame while preserving original trim, siding, and the overall look of the home. Custom sizing means odd or non-standard openings aren't a problem.",
    },
    {
      question: "Do new windows really keep dust out?",
      answer:
        "Old frames leak air — and in the Valley, air carries dust. Anlin's triple-sealed frame design eliminates the infiltration paths, which is why homeowners notice cleaner sills and less dusting within weeks of installation.",
    },
    {
      question: "How long does the installation take?",
      answer:
        "Most Visalia homes are finished in 1–2 days. We confirm your timeline at the estimate, protect your floors during install, and haul away the old windows when we're done.",
    },
    {
      question: "Why Anlin windows?",
      answer:
        "Anlin is a California manufacturer engineered specifically for Western climates like ours, with one of the strongest warranties in the industry — a Double Lifetime Warranty that transfers if you sell your home. We're a certified Anlin installer.",
    },
  ],
  areaCities: ["Visalia", "Tulare", "Hanford", "Reedley", "Selma"],
};

export default function VisaliaWindowsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <CityWindowsPage config={config} />
    </>
  );
}
