"use client";

import { useState } from "react";
import Section from "./Section";
import { jsonLd } from "@/lib/seo";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  items,
}: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-12">
            {title}
          </h2>
          <div className="space-y-4">
            {items.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:border-orange/40 transition-colors"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-navy font-bold text-base sm:text-lg pr-2">
                      {item.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full bg-orange/10 text-orange flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-orange/20" : ""
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-gray-text text-[15px] sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
