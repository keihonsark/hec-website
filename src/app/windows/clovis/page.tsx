import type { Metadata } from "next";
import CityWindowsPage, { CityWindowsConfig } from "@/components/CityWindowsPage";
import { buildServiceSchema, jsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Window Replacement Clovis CA | Anlin Certified Installers | HEC",
  description:
    "Replacement windows for Clovis homes — from Old Town to Harlan Ranch. Anlin Certified, BBB A+, 228+ five-star reviews, $0 down financing. Free in-home estimates.",
  alternates: {
    canonical: `${SITE_URL}/windows/clovis`,
  },
};

const schema = buildServiceSchema({
  serviceType: "Window Replacement",
  name: "Window Replacement in Clovis, CA",
  description:
    "Energy-efficient Anlin replacement windows for Clovis homes — fixing failed builder-grade glass, cooling second stories, and adding transferable warranty value.",
  path: "/windows/clovis",
  areaServed: { "@type": "City", name: "Clovis", addressRegion: "CA" },
});

const config: CityWindowsConfig = {
  cityName: "Clovis",
  heroLabel: "Clovis, California",
  heroDescription:
    "From Old Town bungalows to two-story homes in Harlan Ranch and Loma Vista — replacement windows sized, built, and installed for the way Clovis lives.",
  localCards: [
    {
      title: "Foggy Builder-Grade Glass",
      desc: "Many Clovis homes built in the '90s and 2000s came with builder-grade dual-pane windows that are now failing — fogged glass, broken seals, sticking sashes. Anlin replacements fix the problem permanently instead of patching it.",
    },
    {
      title: "Cool the Second Story",
      desc: "Two-story homes around Clovis cook upstairs every summer. Low-E glass with argon insulation cuts solar heat gain where it hits hardest, so upstairs bedrooms stay livable without running the AC all night.",
    },
    {
      title: "A Resale-Ready Upgrade",
      desc: "Clovis homes hold their value, and buyers notice windows. Anlin's Double Lifetime Warranty transfers to the next owner — a selling point your agent can put in the listing.",
    },
  ],
  coverageHeadline: "Serving Every Clovis Neighborhood",
  coverageParagraph:
    "We install throughout Clovis — Old Town, Harlan Ranch, Loma Vista, Buchanan Estates, and everywhere along the Herndon and Shaw corridors — plus neighboring Fresno, Sanger, and Madera. Whether it's a 1980s ranch with original aluminum frames or a 2005 two-story with fogged builder-grade glass, every window is measured and manufactured for your exact openings.",
  processSubtitle:
    "From measurement to install — most Clovis homes are done in 1-2 days.",
  faqTitle: "Clovis Window Replacement Questions, Answered",
  faq: [
    {
      question: "How much does window replacement cost in Clovis?",
      answer:
        "It depends on count, size, and style, but most Clovis homeowners land between $700 and $1,500 per window fully installed, with whole-home projects typically in the $8,000–$25,000 range. Your free in-home estimate gives you an exact number — not a ballpark.",
    },
    {
      question:
        "My dual-pane windows are foggy. Can I just replace the glass?",
      answer:
        "Fogging means the seal between the panes has failed and the insulating gas is gone — the window has lost most of its energy performance. A glass-only swap is a short-term patch with no real warranty. Full replacement restores the insulation and comes with Anlin's transferable Double Lifetime Warranty.",
    },
    {
      question: "Will new windows work with my HOA's exterior requirements?",
      answer:
        "Almost always. We use retrofit (insert) installation that preserves your existing stucco and exterior trim, and Anlin frames come in multiple colors. Nothing about the exterior profile changes dramatically, which keeps HOA review simple.",
    },
    {
      question: "Will new windows actually cool down our upstairs rooms?",
      answer:
        "That's where homeowners feel the biggest difference. Second-story and west-facing windows take the most direct sun in the Valley, and Low-E dual-pane glass blocks a large share of that solar heat before it enters the room. Cooler bedrooms, less AC runtime.",
    },
    {
      question: "How long does installation take?",
      answer:
        "Most Clovis homes are completed in 1–2 days. Insert installation is clean and quick — we protect your floors, remove the old windows, and haul everything away the same day.",
    },
    {
      question: "What financing do you offer?",
      answer:
        "Multiple programs including $0 down, 12-month same-as-cash, and longer terms with payments that fit your budget. Your consultant walks you through the options at the free estimate.",
    },
  ],
  areaCities: ["Clovis", "Fresno", "Sanger", "Madera", "Reedley"],
};

export default function ClovisWindowsPage() {
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
