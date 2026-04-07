"use client";

import Image from "next/image";
import SectionLabel from "./SectionLabel";

interface LeadFormProps {
  id?: string;
  headline?: string;
  defaultService?: string;
  serviceOptions?: string[];
}

const defaultServices = [
  "Roofing",
  "HVAC",
  "Windows & Doors",
  "Outdoor Living",
  "Insulation",
  "Paint",
  "Multiple Services",
  "Not Sure",
];

const financingOptions = [
  "Yes — $0 Down",
  "Yes — Low Monthly Payments",
  "Yes — Deferred Payments",
  "Not Sure Yet",
  "No — Paying Cash",
];

const inputClass =
  "w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition";

export default function LeadForm({
  id = "estimate",
  headline = "Get Your Free Estimate",
  defaultService = "",
  serviceOptions,
}: LeadFormProps) {
  const services = serviceOptions || defaultServices;

  return (
    <section id={id} className="relative py-24 md:py-32 overflow-hidden">
      <Image
        src="/images/about/team-photo.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy-dark/90" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-orange/20 border border-orange/30 text-orange rounded-full px-5 py-2 text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            We respond within 1 hour
          </span>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <SectionLabel>Free Estimate</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              {headline}
            </h2>
            <p className="text-gray-text mt-3">
              Fill out the form below and we&apos;ll call you within 24 hours.
            </p>
          </div>

          <form
            className="grid sm:grid-cols-2 gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="text" placeholder="Full Name" className={inputClass} />
            <input type="tel" placeholder="Phone Number" className={inputClass} />
            <input type="email" placeholder="Email" className={inputClass} />
            <input type="text" placeholder="Street Address" className={inputClass} />
            <select
              defaultValue={defaultService}
              className={`${inputClass} appearance-none bg-white`}
            >
              <option value="" disabled>
                Select a service...
              </option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              defaultValue=""
              className={`${inputClass} appearance-none bg-white`}
            >
              <option value="" disabled>
                Interested in financing?
              </option>
              {financingOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-orange text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-lg shadow-orange/20 cursor-pointer"
              >
                GET MY FREE ESTIMATE →
              </button>
              <p className="text-gray-text text-sm text-center mt-3">
                No obligation. No pressure. Just honest answers.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
