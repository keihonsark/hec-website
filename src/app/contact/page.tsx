"use client";

import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import LeadForm from "@/components/LeadForm";
import ServiceArea from "@/components/ServiceArea";
import MobileStickyBar from "@/components/MobileStickyBar";

const trustItems = [
  { label: "4.7 ★ · 228+ Reviews" },
  { label: "20+ Years Experience" },
  { label: "Owens Corning Preferred" },
  { label: "Anlin Certified Dealer" },
  { label: "BBB A+ Rated" },
  { label: "$0 Down Financing" },
];

export default function ContactPage() {
  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="relative bg-navy-dark noise-overlay py-24 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
            Let&apos;s Talk About{" "}
            <span className="text-orange">Your Project</span>
          </h1>
          <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Free estimates. Honest answers. No high-pressure sales.
          </p>
        </div>
      </section>

      {/* ════════ CONTACT + FORM ════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* LEFT — contact info */}
            <div>
              <SectionLabel>Get In Touch</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-8">
                Reach Us Directly
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-text text-sm font-semibold uppercase tracking-wide mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+15595765067"
                      className="text-navy text-2xl font-extrabold hover:text-orange transition-colors"
                    >
                      (559) 576-5067
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-text text-sm font-semibold uppercase tracking-wide mb-1">
                      Hours
                    </p>
                    <p className="text-navy text-base font-medium">
                      Mon – Sat: 8:00 AM – 6:00 PM
                    </p>
                    <p className="text-gray-text text-base">Sun: Closed</p>
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-text text-sm font-semibold uppercase tracking-wide mb-1">
                      Office
                    </p>
                    <p className="text-navy text-base font-medium">
                      7194 N Abby St
                    </p>
                    <p className="text-navy text-base font-medium">
                      Fresno, CA 93720
                    </p>
                  </div>
                </div>

                {/* Service area */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-text text-sm font-semibold uppercase tracking-wide mb-1">
                      Service Area
                    </p>
                    <p className="text-navy text-base font-medium">
                      Porterville to Sacramento — entire Central Valley
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — form */}
            <div id="contact-form">
              <LeadForm
                id="contact-form-lead"
                headline="Send Us a Message"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ════════ TRUST STRIP ════════ */}
      <Section className="py-16 bg-light-bg border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <SectionLabel>Why Homeowners Choose HEC</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Trusted Across the Central Valley
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm"
              >
                <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-navy text-sm font-semibold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <ServiceArea />

      <MobileStickyBar formAnchor="#contact-form" />
    </>
  );
}
