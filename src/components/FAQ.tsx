"use client";

import { useState } from "react";
import Section from "./Section";
import SectionLabel from "./SectionLabel";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  label?: string;
  headline?: string;
  items: FAQItem[];
}

export default function FAQ({
  label = "FAQ",
  headline = "Frequently Asked Questions",
  items,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="py-20 md:py-28 bg-light-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">{headline}</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-navy font-semibold text-[15px] pr-4 group-hover:text-orange transition-colors">{faq.q}</span>
                  <svg className={`w-5 h-5 text-orange flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 pb-5" : "max-h-0"}`}>
                  <p className="text-gray-text text-[15px] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
