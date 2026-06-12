import type { Metadata } from "next";
import CityWindowsPage, { CityWindowsConfig } from "@/components/CityWindowsPage";
import { buildServiceSchema, jsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Window Replacement Madera CA | Energy-Efficient Vinyl Windows | HEC",
  description:
    "Anlin replacement windows for Madera, Madera Ranchos & Chowchilla. Cut PG&E cooling bills, block wind-driven dust. BBB A+, 228+ five-star reviews. Free estimates.",
  alternates: {
    canonical: `${SITE_URL}/windows/madera`,
  },
};

const schema = buildServiceSchema({
  serviceType: "Window Replacement",
  name: "Window Replacement in Madera, CA",
  description:
    "Custom Anlin replacement windows for Madera County — in-town homes, ranch properties, and farmhouses. Lower PG&E cooling costs and block wind-driven dust.",
  path: "/windows/madera",
  areaServed: { "@type": "City", name: "Madera", addressRegion: "CA" },
});

const config: CityWindowsConfig = {
  cityName: "Madera",
  heroLabel: "Madera, California",
  heroDescription:
    "From in-town Madera to acreage in the Ranchos — custom-built Anlin windows that hold up to Valley heat, wind, and dust.",
  localCards: [
    {
      title: "Cut PG&E Cooling Costs",
      desc: "Madera summers run triple digits, and PG&E rates make every AC hour expensive. Low-E dual-pane glass blocks solar heat at the window, easing the load on your system through the worst of July and August.",
    },
    {
      title: "Made for Ranch Properties",
      desc: "Farmhouses and rancho homes rarely have standard window sizes — and many still have their original single panes. Every Anlin window is custom-manufactured to your exact openings, whatever the house's era.",
    },
    {
      title: "Block Wind-Driven Dust",
      desc: "Open land means wind, and wind means dust pushed through every gap in an aging frame. Triple-sealed Anlin construction shuts down the leaks that no amount of weatherstripping can fix.",
    },
  ],
  coverageHeadline: "Serving Madera County, Top to Bottom",
  coverageParagraph:
    "We install throughout Madera County — in-town Madera, Madera Ranchos, Madera Acres, Parkwood, and Chowchilla — plus Fresno and Clovis just down Highway 99. Plenty of Madera homes are still living with their original single-pane windows; those are the projects where summer comfort changes overnight.",
  processSubtitle:
    "From measurement to install — most Madera homes are done in 1-2 days.",
  faqTitle: "Madera Window Replacement Questions, Answered",
  faq: [
    {
      question: "How much is window replacement in Madera?",
      answer:
        "Typical pricing runs $700–$1,500 per window fully installed, and most whole-home projects land between $8,000 and $25,000. A free in-home estimate gets you the exact number for your home and window count.",
    },
    {
      question: "We still have single-pane windows. How big a difference will new ones make?",
      answer:
        "The biggest difference of any home we work on. Single-pane glass provides almost no insulation against Valley heat — upgrading to Low-E dual-pane with argon insulation transforms both comfort and cooling costs, especially in rooms that face west.",
    },
    {
      question: "Our farmhouse has odd window sizes. Is that a problem?",
      answer:
        "Not at all. Anlin custom-manufactures every window to your exact opening measurements, so non-standard sizes, settled frames, and older construction are routine for our installers.",
    },
    {
      question: "Do you charge extra to come out to Madera or the Ranchos?",
      answer:
        "No. Madera County is part of our core service area — estimates and installation are priced the same as anywhere else we work, with no travel fees.",
    },
    {
      question: "How long will installation take?",
      answer:
        "Most homes are complete in 1–2 days, including removal and haul-away of your old windows. Larger ranch properties may take an extra day — you'll know the exact timeline before we start.",
    },
    {
      question: "What warranty comes with the windows?",
      answer:
        "Anlin's Double Lifetime Warranty covers the windows for as long as you own the home — and transfers to the next owner if you sell. HEC's workmanship guarantee covers the installation itself.",
    },
  ],
  areaCities: ["Madera", "Fresno", "Clovis", "Sanger"],
};

export default function MaderaWindowsPage() {
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
