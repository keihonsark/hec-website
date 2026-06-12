import type { Metadata } from "next";
import CityWindowsPage, { CityWindowsConfig } from "@/components/CityWindowsPage";
import { buildServiceSchema, jsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Window Replacement Tulare CA | Anlin Dual-Pane Windows | HEC",
  description:
    "Replacement windows for Tulare homes. Quiet Highway 99 noise, seal out dairy-country dust, cut summer cooling bills. Recent Tulare installs. Free estimates.",
  alternates: {
    canonical: `${SITE_URL}/windows/tulare`,
  },
};

const schema = buildServiceSchema({
  serviceType: "Window Replacement",
  name: "Window Replacement in Tulare, CA",
  description:
    "Anlin dual-pane replacement windows for Tulare homes — quieter rooms, cleaner air, lower summer cooling bills. Recently installed for Tulare homeowners.",
  path: "/windows/tulare",
  areaServed: { "@type": "City", name: "Tulare", addressRegion: "CA" },
});

const config: CityWindowsConfig = {
  cityName: "Tulare",
  heroLabel: "Tulare, California",
  heroDescription:
    "Anlin dual-pane windows for Tulare homes — quieter rooms, cleaner air, lower summer bills. Recently installed for homeowners right here in Tulare.",
  localCards: [
    {
      title: "Quiet the 99 Corridor",
      desc: "Highway 99, rail traffic, and ag equipment keep Tulare loud — and single-pane glass lets all of it inside. STC-rated dual-pane windows knock exterior noise down to a background murmur.",
    },
    {
      title: "Seal Out Dairy-Country Dust",
      desc: "Tulare sits in the heart of working ag country, and the dust that comes with it finds every gap in an aging window frame. Anlin's triple-sealed frames close those gaps permanently.",
    },
    {
      title: "Lower Summer Cooling Bills",
      desc: "Tulare summers stack triple-digit days for weeks. Low-E glass with argon insulation blocks solar heat before it gets in, so the AC cycles less during the most expensive hours of the day.",
    },
  ],
  coverageHeadline: "Serving Tulare & the Southern Valley",
  coverageParagraph:
    "We install across Tulare — from established neighborhoods near Bardsley Avenue and Tulare Western to newer homes on the north side — plus Visalia, Pixley, and the surrounding Tulare County communities. We've completed multiple window projects for Tulare homeowners already, and every estimate is free, in-home, and exact.",
  processSubtitle:
    "From measurement to install — most Tulare homes are done in 1-2 days.",
  faqTitle: "Tulare Window Replacement Questions, Answered",
  faq: [
    {
      question: "What's the cost of window replacement in Tulare?",
      answer:
        "Plan on $700–$1,500 per window fully installed for most projects, with complete homes typically running $8,000–$25,000. Window count, sizes, and style drive the final number — which is exactly what the free in-home estimate nails down.",
    },
    {
      question: "How much quieter will my house actually be?",
      answer:
        "Noticeably. Dual-pane STC-rated glass dampens highway, rail, and equipment noise dramatically compared to single-pane windows. It's one of the first things Tulare homeowners comment on after installation — often before the energy savings.",
    },
    {
      question: "Will new windows cut my summer electric bill?",
      answer:
        "If you're replacing single-pane or old aluminum-frame windows, yes — that's where the biggest cooling-cost gains live. Low-E coatings reflect solar heat back outside, reducing how hard your AC works through Tulare's long cooling season.",
    },
    {
      question: "Have you done work in Tulare before?",
      answer:
        "Yes — we've completed multiple window projects for Tulare homeowners, and Tulare sits well inside our core Central Valley service area. References and reviews are available at your estimate.",
    },
    {
      question: "How disruptive is installation?",
      answer:
        "Minimal. Most homes are done in 1–2 days using retrofit installation that preserves your existing trim and stucco. We protect floors, clean as we go, and haul away the old windows.",
    },
    {
      question: "What about financing?",
      answer:
        "We offer $0 down, 12-month same-as-cash, and longer-term options with low monthly payments. The consultant brings the details to your free estimate so you can compare.",
    },
  ],
  areaCities: ["Tulare", "Visalia", "Selma", "Hanford"],
};

export default function TulareWindowsPage() {
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
