import type { Metadata } from "next";
import CityWindowsPage, { CityWindowsConfig } from "@/components/CityWindowsPage";
import { buildServiceSchema, jsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Window Replacement Hanford CA | Anlin Certified | Home Energy Construction",
  description:
    "Replacement windows for Hanford & Kings County homes. Recent Hanford-area installs, Anlin Double Lifetime Warranty, BBB A+, $0 down financing. Free estimates.",
  alternates: {
    canonical: `${SITE_URL}/windows/hanford`,
  },
};

const schema = buildServiceSchema({
  serviceType: "Window Replacement",
  name: "Window Replacement in Hanford, CA",
  description:
    "Anlin replacement windows for Hanford and Kings County — upgrading older homes from drafty single-pane glass to sealed, quiet, energy-efficient dual-pane windows.",
  path: "/windows/hanford",
  areaServed: { "@type": "City", name: "Hanford", addressRegion: "CA" },
});

const config: CityWindowsConfig = {
  cityName: "Hanford",
  heroLabel: "Hanford, California",
  heroDescription:
    "Kings County homes deserve better than drafty single-panes. We've already completed window projects for Hanford homeowners — yours can be next.",
  localCards: [
    {
      title: "Built for Older Homes",
      desc: "Hanford's housing stock runs older than much of the Valley — mid-century ranches and pre-war homes, many still on their original single-pane glass. Those are the homes where new windows change comfort and bills the most.",
    },
    {
      title: "Seal Out Ag Dust",
      desc: "Kings County dust works its way through every worn-out frame and failed seal. Anlin's triple-sealed construction closes the infiltration paths, keeping sills, curtains, and air noticeably cleaner.",
    },
    {
      title: "Quiet the Rail & Road",
      desc: "Between the rail corridor and busy crosstown streets, exterior noise carries straight through single-pane glass. STC-rated dual-pane windows cut that noise to a murmur.",
    },
  ],
  coverageHeadline: "Serving Hanford & All of Kings County",
  coverageParagraph:
    "From historic downtown Hanford and the China Alley district to newer homes off 12th Avenue, plus Lemoore, Armona, Kingsburg, and Selma — we cover all of Kings County. We've already installed windows for Hanford-area homeowners, and the free estimate works the same wherever you are: exact measurements, exact pricing, no pressure.",
  processSubtitle:
    "From measurement to install — most Hanford homes are done in 1-2 days.",
  faqTitle: "Hanford Window Replacement Questions, Answered",
  faq: [
    {
      question: "What do replacement windows cost in Hanford?",
      answer:
        "Most projects price between $700 and $1,500 per window installed, with full-home replacements generally running $8,000–$25,000 depending on count and style. We give you the exact figure at a free in-home estimate.",
    },
    {
      question: "Is it worth replacing original single-pane windows?",
      answer:
        "Single-pane glass is the single biggest energy hole in an older home — it does almost nothing against 100-degree summers. Upgrading to Low-E dual-pane is where homeowners see the largest comfort and cooling-cost improvements of any window project we do.",
    },
    {
      question: "Do new windows actually reduce train and traffic noise?",
      answer:
        "Yes. Dual-pane construction with STC-rated glass significantly dampens exterior noise compared to single-pane windows. It won't make a passing train silent, but homeowners consistently describe the difference as dramatic.",
    },
    {
      question: "Can you handle non-standard window openings in older homes?",
      answer:
        "Every Anlin window is custom-manufactured to your exact openings, so older homes with odd sizes or settled frames aren't a problem. Retrofit installation also preserves your existing trim and siding.",
    },
    {
      question: "How soon can you get to Hanford?",
      answer:
        "We're based in Fresno, about 30 minutes up Highway 43 — Hanford is squarely inside our core service area. Estimates are usually scheduled within days, and there's no travel charge.",
    },
    {
      question: "What financing options are available?",
      answer:
        "$0 down, 12-month same-as-cash, and longer-term plans with low monthly payments. Your consultant covers the details at the free estimate.",
    },
  ],
  areaCities: ["Hanford", "Visalia", "Selma", "Reedley", "Tulare"],
};

export default function HanfordWindowsPage() {
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
