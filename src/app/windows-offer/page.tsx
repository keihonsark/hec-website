"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Thermometer, VolumeX, ShieldCheck } from "lucide-react";
import CredentialsGrid from "@/components/CredentialsGrid";
import { postToWebhook } from "@/lib/webhook";

const PHONE_DISPLAY = "559-272-3992";
const PHONE_HREF = "tel:+15592723992";

/* ──────────────────────────────────────────────
   /windows-offer — focused paid-traffic landing
   ────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: "What's the minimum project size?",
    a: "Our window replacement projects start at 5 windows. This lets us deliver the best pricing, warranty coverage, and installation efficiency for your home.",
  },
  {
    q: "How much will I actually save on my energy bill?",
    a: "It depends on your current windows. Older Central Valley homes with single-pane or aluminum-frame windows often see summer cooling bills drop 30-50% after upgrading to Anlin double-pane — the bigger the gap between your old windows and modern Anlin glass, the bigger the savings. Newer homes with existing double-pane windows typically see 10-25% in summer cooling savings.\n\nAnnual total energy savings vary based on home size, insulation, HVAC efficiency, and usage patterns. At your free in-home consultation, we'll review your last 3 months of PG&E bills and project specific monthly savings for your home — real numbers based on your home, your usage, and Central Valley climate data.\n\nResults vary based on home characteristics, climate, and usage patterns.",
  },
  {
    q: "How does the discount work?",
    a: "$200 is applied per window installed and $500 per sliding glass door. The more you replace, the more you save. Mention this offer when you book your free in-home consultation. Promotion ends May 31, 2026.",
  },
  {
    q: "What financing options do you offer?",
    a: "We offer multiple financing programs including 12 months same-as-cash, $0 down options, and longer-term plans. Your in-home consultant will walk you through what fits your budget.",
  },
  {
    q: "What window brand do you install?",
    a: "We are Anlin certified installers. Anlin is a California-based manufacturer known for industry-leading warranties and energy performance — ideal for Central Valley climate.",
  },
  {
    q: "How long does installation take?",
    a: "Most full-home window projects are completed in 1-2 days depending on size. We'll give you an exact timeline at your free consultation.",
  },
  {
    q: "What areas do you service?",
    a: "We serve homes from Porterville to Sacramento, including Fresno, Clovis, Madera, Visalia, Tulare, Hanford, and surrounding Central Valley communities.",
  },
];

/* ═══ FAQ schema for SEO ═══ */
function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ═══ Lead form ═══ */
function LeadForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    windowCount: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputCls =
    "w-full min-h-[48px] px-4 py-3 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition bg-white";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    const trimmedName = form.fullName.trim();
    const firstSpace = trimmedName.indexOf(" ");
    const firstName = firstSpace === -1 ? trimmedName : trimmedName.slice(0, firstSpace);
    const lastName = firstSpace === -1 ? "" : trimmedName.slice(firstSpace + 1).trim();
    const phoneDigits = form.phone.replace(/\D/g, "");

    const ok = await postToWebhook({
      type: "estimate_request",
      firstName,
      lastName,
      phone: phoneDigits,
      email: "",
      city: form.city,
      service: "Windows & Doors",
      financingInterest: "",
      message: `Windows count: ${form.windowCount}`,
      page: "/windows-offer",
    });
    if (ok) {
      router.push("/thank-you");
    } else {
      setError("Something went wrong. Please try again or call us directly.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-orange p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold text-navy mb-1 font-heading">
        Get Your Free Quote
      </h2>
      <p className="text-gray-text text-sm mb-5 leading-relaxed">
        Takes 30 seconds. We&apos;ll text within 1 hour to schedule your free in-home estimate. No spam, no pressure, no obligation.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text" name="fullName" placeholder="Full Name" required
          className={inputCls}
          value={form.fullName}
          onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
        />
        <input
          type="tel" name="phone" placeholder="Phone" required
          className={inputCls}
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
        <input
          type="text" name="city" placeholder="City" required
          className={inputCls}
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
        />
        <select
          name="windowCount" required
          className={`${inputCls} appearance-none`}
          value={form.windowCount}
          onChange={(e) => setForm((f) => ({ ...f, windowCount: e.target.value }))}
        >
          <option value="" disabled>How many windows?</option>
          <option>5-10</option>
          <option>11-20</option>
          <option>20+</option>
          <option>Not sure</option>
        </select>

        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full min-h-[52px] inline-flex items-center justify-center gap-2 bg-orange text-white font-extrabold text-base rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-lg shadow-orange/30 disabled:opacity-70"
        >
          {submitting ? "Submitting..." : (
            <>
              Claim My Estimate
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>
        <p className="text-gray-text text-xs text-center">
          🔒 Your info stays private. We&apos;ll text within 1 hour.
        </p>
      </form>
    </div>
  );
}

/* ═══ FAQ Accordion ═══ */
function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-200">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className="text-navy font-semibold text-[15px] sm:text-base pr-4 group-hover:text-orange transition-colors">
                {item.q}
              </span>
              <svg
                className={`w-5 h-5 text-orange flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[800px] pb-5" : "max-h-0"}`}>
              <div className="text-[#374151] text-[15px] leading-relaxed space-y-3">
                {item.a.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══ Google G icon ═══ */
function GoogleG({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/* ═══ Value stack row ═══ */
function ValueRow({ item, value }: { item: string; value: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 py-3 border-b border-dashed border-gray-200 last:border-0">
      <svg
        className="w-6 h-6 flex-shrink-0"
        style={{ color: "#F5A623" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <span className="text-navy font-bold text-[15px] sm:text-base flex-1 leading-snug">
        {item}
      </span>
      <span className="bg-orange text-navy font-semibold text-xs sm:text-sm rounded-full px-3 py-1 whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function WindowsOfferPage() {
  return (
    <>
      <FAQSchema />

      {/* ═══ HERO ═══ */}
      <section className="relative w-full md:min-h-[700px] overflow-hidden">
        {/* Background photo */}
        <Image
          src="/images/windows/hero-house.png"
          alt="Beautiful Fresno home with new Anlin windows"
          fill
          priority
          sizes="100vw"
          className="object-cover z-0"
          style={{ objectPosition: "center right" }}
        />

        {/* Dark overlay — vertical fade on mobile, lighter horizontal gradient on desktop */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#1B2D4F] via-[#1B2D4F]/80 to-[#1B2D4F]/60 md:bg-gradient-to-r md:from-[#1B2D4F] md:from-30% md:via-[#1B2D4F]/60 md:via-60% md:to-[#1B2D4F]/10" />

        {/* Content */}
        <div className="relative z-[2] max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* LEFT COLUMN — Content (no card, sits on overlay) */}
            <div className="space-y-6 text-white">
              <div className="inline-block bg-orange/20 border border-orange/40 text-orange text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                Limited Time Offer
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1]">
                Save <span className="text-[#F5A623]">$200</span> Per Window.
                <br />
                <span className="text-[#F5A623]">$500</span> Per Sliding Door.
              </h1>

              <p className="text-lg text-white/85 leading-relaxed max-w-xl">
                Anlin-certified replacement windows that cut cooling bills and keep Central Valley summers outside where they belong.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Anlin Certified Installer",
                  "BBB A+ Rated",
                  "4.7★ on Google (228+ reviews)",
                  "CA Licensed #1086515",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium text-[15px]">
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F5A623" }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="text-orange text-sm font-semibold flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
                </span>
                Offer ends May 31, 2026
              </div>
            </div>

            {/* RIGHT COLUMN — Form card */}
            <div id="quote-form" className="w-full">
              <LeadForm />
            </div>

          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-light-bg py-6 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="relative h-10 w-28">
                <Image
                  src="/images/logos/anlin-logo.png"
                  alt="Anlin Windows logo"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
              <span className="text-navy text-sm font-bold">Anlin Certified Installer</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="relative h-10 w-28">
                <Image
                  src="/images/logos/bbb-logo.png"
                  alt="BBB Accredited Business logo"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
              <span className="text-navy text-sm font-bold">BBB A+ Rated</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex items-center gap-2 h-10">
                <GoogleG size={28} />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#FFC107]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-navy text-sm font-bold">4.7★ Google · 228+ Reviews</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="relative h-10 w-28">
                <Image
                  src="/images/logos/CSLB_logo.png"
                  alt="California Contractors State License Board logo"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
              <span className="text-navy text-sm font-bold">CA Licensed #1086515</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOCAL FRESNO PROOF STRIP ═══ */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-center font-medium">
            <span className="text-gray-600">Recently serving:</span>{" "}
            <span className="text-[#1B2D4F]">Fresno · Clovis · Visalia · Hanford · Madera · Tulare · Sacramento</span>
          </p>
        </div>
      </section>

      {/* ═══ ENERGY SAVINGS ═══ */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-5 leading-tight">
              Why Central Valley Homeowners Are Replacing Their Windows Now
            </h2>
            <p className="text-[#374151] text-base sm:text-lg leading-relaxed">
              Fresno summers hit 110°F. Most homes were built with single-pane or aging aluminum-frame windows that lose massive amounts of cooling energy every month — driving PG&amp;E bills through the roof. Anlin double-pane windows with Low-E coatings and argon-gas insulation cut cooling loads 25-30% on average, and up to 50% for older single-pane homes. The result: a quieter, more comfortable home — and a noticeably smaller PG&amp;E bill every summer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: Thermometer, title: "Up to 50% Lower Summer Cooling Bills", desc: "Older single-pane homes see the biggest drop after upgrading to Anlin double-pane" },
              { Icon: VolumeX, title: "Significantly Quieter Home", desc: "Dual-pane construction reduces outside noise" },
              { Icon: ShieldCheck, title: "Double Lifetime Warranty", desc: "Anlin's Limited Double Lifetime Warranty backs every install" },
            ].map((c) => (
              <div key={c.title} className="bg-light-bg rounded-2xl p-7 border border-gray-100 text-center">
                <c.Icon size={48} color="#F5A623" strokeWidth={1.75} className="mx-auto mb-4" />
                <h3 className="text-lg font-bold text-navy mb-2">{c.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BEFORE / AFTER ═══ */}
      <section className="bg-white py-12 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3 leading-tight">
              See the Difference
            </h2>
            <p className="text-gray-text text-base sm:text-lg">
              Same house. Same wall. Before and after Anlin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/3]">
              <Image
                src="/images/windows/before-windows.png"
                alt="Old aluminum windows before replacement"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1">
                Before
              </span>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/3]">
              <Image
                src="/images/windows/after-windows.png"
                alt="New Anlin double-pane windows after installation"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-orange text-navy text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1">
                After
              </span>
            </div>
          </div>

          <p className="text-center text-[#374151] text-base sm:text-lg max-w-3xl mx-auto mt-8 leading-relaxed">
            Single-pane and old aluminum windows lose up to 30% of your home&apos;s cooling energy. Anlin double-pane windows eliminate that.
          </p>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="bg-light-bg py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-2">
              Real Reviews From Real Homeowners
            </h2>
            <p className="text-gray-text text-base">228+ five-star reviews on Google</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Elizabeth Myers",
                text: "We had our windows installed by Home Energy Construction and couldn't be happier. The installation was clean and efficient, and they treated our home with real care. The new windows look amazing and our home is quieter and more energy-efficient. Highly recommend them to anyone looking to upgrade their windows or improve their home's energy efficiency!",
              },
              {
                name: "Edward R.",
                text: "We recently had new windows and a sliding glass door installed, and the experience was absolutely fantastic from start to finish. The quality of the windows is top-notch — they not only look beautiful but also provide excellent insulation, significantly improving the comfort and energy efficiency of our home. We've noticed a dramatic difference in temperature consistency and noise reduction.",
              },
              {
                name: "Becky M.",
                text: "We are so thankful for the smooth transformation of our mom's 35-year-old home with the installation of Anlin windows, French doors, and screens. From start to finish, Tony presented a confident, informative review of beautiful windows. A team of 6 good men transformed old windows and sliders into a new, modern, breathtaking home! Complete professionals from beginning to end.",
              },
            ].map((r) => (
              <div key={r.name} className="bg-white rounded-2xl shadow-md border-l-4 border-orange p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#FFC107]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#374151] italic text-[15px] leading-relaxed mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="text-navy font-semibold text-sm mb-2">
                  — {r.name}
                </p>
                <div className="flex items-center gap-1.5 text-[#374151] text-xs font-medium">
                  <GoogleG size={14} />
                  <span>Verified Google Review</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SATISFACTION GUARANTEE ═══ */}
      <section className="bg-[#1B2D4F] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block text-orange text-xs font-bold uppercase tracking-[0.2em]">
            Our Promise to You
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 leading-tight">
            100% Satisfaction Guaranteed
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-4">
            If you&apos;re not 100% satisfied with your installation, we&apos;ll come back and make it right — free of charge. No paperwork. No runaround. We don&apos;t consider the job done until you&apos;re happy.
          </p>
          <p className="italic text-orange text-sm sm:text-base mt-6">
            Add that to Anlin&apos;s Double Lifetime Warranty and you&apos;re covered for life.
          </p>
        </div>
      </section>

      {/* ═══ CREW / TRUST ═══ */}
      <section className="bg-[#F8F9FA] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] order-1">
            <Image
              src="/images/windows/crew-install.png"
              alt="HEC install crew at work on a Fresno home"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          <div className="order-2">
            <span className="inline-block text-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Local Team. Zero Subcontractors.
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-5 leading-tight">
              When We Show Up, You&apos;ll Know It&apos;s Us.
            </h2>
            <p className="text-[#374151] text-base sm:text-lg leading-relaxed mb-6">
              Home Energy Construction has served the Central Valley for over a decade. Every window crew is HEC employees — never subcontractors — trained and certified on Anlin products. Fully insured, fully accountable to you — not a contractor middleman.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md">
              {[
                "Anlin Certified Dealer",
                "Owens Corning Preferred",
                "BBB A+ Rated",
                "CA Lic #1086515",
              ].map((pill) => (
                <span
                  key={pill}
                  className="border border-navy/20 text-navy font-semibold text-sm rounded-full px-4 py-2 text-center bg-white"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY ANLIN / PRODUCT DETAIL ═══ */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-block text-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Anlin Windows
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-6 leading-tight">
              Built for California Heat
            </h2>
            <ul className="space-y-3.5">
              {[
                "Triple-sealed frame — zero air infiltration",
                "Low-E glass blocks up to 99% of UV rays",
                "Dual-pane insulated glass — 40% better thermal performance",
                "ENERGY STAR® certified for Western US climate",
                "STC-rated for noise reduction",
                "Double Lifetime transferable warranty — adds resale value",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-[#374151] text-[15px] sm:text-base leading-snug">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5"
                    style={{ color: "#F5A623" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 md:order-2 relative rounded-xl overflow-hidden shadow-md aspect-[4/3]">
            <Image
              src="/images/windows/window-detail.png"
              alt="Anlin window frame and glass detail"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <section className="bg-[#F8F9FA] py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block text-orange text-xs font-bold uppercase tracking-[0.2em]">
            Tested. Certified. Verified.
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 leading-tight">
            Independently Tested. Industry Certified.
          </h2>
          <p className="text-[#374151] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mt-4">
            Every Anlin window we install is tested and certified by three independent authorities: the National Fenestration Rating Council (NFRC), the American Architectural Manufacturers Association (AAMA), and ENERGY STAR®. Anlin earns all three certificates of the AAMA Gold Label — Air/Water/Structural, Forced Entry Resistance, and Thermal Performance — the highest standard in the industry.
          </p>

          <div className="mt-12 flex flex-col md:flex-row md:justify-around items-center gap-10 md:gap-6">
            <div className="flex flex-col items-center">
              <div className="relative w-[180px] h-[80px] md:h-[100px]">
                <Image
                  src="/images/logos/nfrc-logo.png"
                  alt="National Fenestration Rating Council certification logo"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
              <span className="text-navy font-semibold text-sm mt-3">NFRC Certified</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-[180px] h-[80px] md:h-[100px]">
                <Image
                  src="/images/logos/aama-logo-blue.png"
                  alt="American Architectural Manufacturers Association Gold Label logo"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
              <span className="text-navy font-semibold text-sm mt-3">AAMA Gold Label</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-[180px] h-[80px] md:h-[100px]">
                <Image
                  src="/images/logos/Energy_Star_logo.svg"
                  alt="ENERGY STAR certified product logo"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
              <span className="text-navy font-semibold text-sm mt-3">ENERGY STAR® Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIFESTYLE FULL-BLEED ═══ */}
      <section className="relative w-full min-h-[320px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/windows/interior-light.png"
          alt="Sunlit interior with new Anlin windows"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Your Home. Cooler, Quieter, Worth More.
          </h2>
          <p className="text-white/85 text-base sm:text-lg mb-7 leading-relaxed">
            New windows are one of the highest-ROI upgrades you can make to a Central Valley home.
          </p>
          <a
            href="#quote-form"
            className="inline-flex items-center gap-2 bg-orange text-white font-extrabold text-base px-8 py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-xl shadow-orange/30 min-h-[52px]"
          >
            Get My Free Estimate
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ═══ PG&E BILL REVIEW ═══ */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-orange text-xs font-bold uppercase tracking-[0.2em]">
              Real Data. Real Numbers.
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 leading-tight">
              Bring Your Last 3 PG&amp;E Bills
            </h2>
            <p className="text-[#374151] text-base sm:text-lg leading-relaxed mt-4">
              At your free in-home consultation, our energy specialist will review your actual PG&amp;E bills and project exactly how much your cooling costs could drop with Anlin double-pane windows. No generic calculators. No marketing math. Real numbers based on your home, your usage, and Central Valley climate data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              { n: "1", title: "Bring Your Bills", desc: "Pull your last 3 months of PG&E statements. We need both summer and shoulder months to see your full usage pattern." },
              { n: "2", title: "We Analyze Usage", desc: "Our energy specialist reviews your actual cooling consumption, home size, current windows, and HVAC efficiency — line by line." },
              { n: "3", title: "Get Real Numbers", desc: "We project specific monthly savings for your home — not generic averages. You see real dollar amounts before you decide." },
            ].map((step) => (
              <div key={step.n} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-orange text-5xl font-extrabold leading-none mb-3">{step.n}</div>
                <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-orange text-navy font-extrabold text-base px-8 py-4 rounded-xl hover:bg-orange-dark hover:text-white transition-colors cta-press shadow-xl shadow-orange/30 min-h-[52px]"
            >
              Schedule My Free Bill Analysis
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          <p className="italic text-gray-500 text-sm mt-8 leading-relaxed text-center max-w-3xl mx-auto">
            Most homeowners see a measurable drop in their cooling-season bills the first summer after installation. Results vary based on home characteristics, climate, and usage patterns.
          </p>
        </div>
      </section>

      {/* ═══ SLIDING DOOR CALLOUT ═══ */}
      <section className="bg-[#FFF7E6] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-block text-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Don&apos;t Forget the Patio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-5 leading-tight">
              Save $500 On Every Sliding Glass Door
            </h2>
            <p className="text-[#374151] text-base sm:text-lg leading-relaxed mb-7">
              Most Fresno homes lose as much energy through sliding glass doors as they do through three windows combined. Upgrade yours to Anlin and seal the biggest gap in your home&apos;s envelope.
            </p>
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 border-2 border-orange text-orange bg-transparent hover:bg-orange hover:text-white font-extrabold text-base px-8 py-4 rounded-xl transition-colors cta-press min-h-[52px]"
            >
              Include a Sliding Door
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          <div className="order-1 md:order-2 relative rounded-xl overflow-hidden shadow-md aspect-[4/3]">
            <Image
              src="/images/windows/sliding-glass-door.png"
              alt="New Anlin sliding glass patio door"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ═══ VALUE STACK ═══ */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Everything Included When You Choose <span className="text-orange">HEC</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-light-bg rounded-2xl p-6 sm:p-8 border border-gray-100 mb-8">
            {[
              { item: "Free In-Home Consultation", value: "$299 value" },
              { item: "Free PG&E Bill Analysis & Energy Assessment", value: "$199 value" },
              { item: "$200 Off Per Window Installed", value: "instant savings" },
              { item: "$500 Off Per Sliding Glass Door", value: "instant savings" },
              { item: "Multiple Financing Options: 6-Month No Interest + 12-Month Same-As-Cash", value: "$0 down" },
              { item: "Anlin Double Lifetime Warranty (Transferable)", value: "$2,000+ value" },
              { item: "Old Windows Hauled Away Free", value: "$200 value" },
            ].map((row) => (
              <ValueRow key={row.item} item={row.item} value={row.value} />
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-orange text-navy rounded-xl p-6 text-center font-bold text-lg sm:text-xl mb-10 shadow-lg">
            Total Value: $4,698+ — Yours When You Book This Month
          </div>

          <div className="text-center">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-orange text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-xl shadow-orange/30 min-h-[52px]"
            >
              Get My Free Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <CredentialsGrid compact />

      {/* ═══ FAQ ═══ */}
      <section className="bg-light-bg py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-10">
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-navy py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Ready to Save On Your <span className="text-orange">New Windows?</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-8">
            Free in-home consultation. No obligation. Quote in under an hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4">
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center gap-2 bg-orange text-white font-extrabold text-base px-8 py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-xl shadow-orange/30 min-h-[52px]"
            >
              Get My Free Quote
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-extrabold text-base px-8 py-4 rounded-xl hover:bg-white/10 transition-colors cta-press min-h-[52px]"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-white/50 text-sm">Available 7 days a week</p>
        </div>
      </section>

      {/* Spacer to prevent the sticky bar from covering content on mobile */}
      <div className="md:hidden h-[60px]" aria-hidden="true" />

      {/* ═══ MOBILE STICKY CTA ═══ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[60px] flex shadow-2xl border-t border-gray-200">
        <a
          href="#quote-form"
          className="flex-1 flex items-center justify-center bg-orange text-navy font-bold text-sm cta-press"
        >
          Get Free Quote
        </a>
        <a
          href={PHONE_HREF}
          className="flex-1 flex items-center justify-center bg-navy text-white font-bold text-sm cta-press"
        >
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </>
  );
}
