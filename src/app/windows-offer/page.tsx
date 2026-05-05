"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    email: "",
    address: "",
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
    const ok = await postToWebhook({
      type: "estimate_request",
      lead_name: form.fullName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      city: form.city,
      service_needed: "Windows & Doors",
      source: "Website (Organic)",
      page_url: "/windows-offer",
      window_count: form.windowCount,
      submitted_at: new Date().toISOString(),
    });
    if (ok) {
      router.push("/thank-you");
    } else {
      setError("Something went wrong. Please try again or call us directly.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border-t-4 border-orange p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold text-navy mb-1 font-heading">
        Get Your Free Quote
      </h2>
      <p className="text-gray-text text-sm mb-5">
        Takes 30 seconds. No obligation.
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
          type="email" name="email" placeholder="Email" required
          className={inputCls}
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <input
          type="text" name="address" placeholder="Street Address" required
          className={inputCls}
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
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
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 pb-5" : "max-h-0"}`}>
              <p className="text-[#374151] text-[15px] leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
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
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-[55%_45%] gap-8 lg:gap-12 items-stretch">
          {/* Mobile-only: hero image first */}
          <div className="md:hidden">
            <div className="relative w-full h-[280px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/windows/hero-house.png"
                alt="Anlin replacement windows on a Central Valley home"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Left column: copy + form */}
          <div className="flex flex-col gap-7">
            <div>
              <span className="inline-block bg-orange/15 border border-orange/40 text-orange text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5">
                Limited Time Offer
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.05] mb-5">
                Save <span className="text-orange">$200</span> Per Window. <span className="text-orange">$500</span> Per Sliding Door.
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-6">
                Anlin-certified replacement windows that cut cooling bills and keep Central Valley summers outside where they belong.
              </p>

              <ul className="space-y-2.5 mb-5">
                {[
                  "Anlin Certified Installer",
                  "BBB A+ Rated",
                  "4.7★ on Google (228+ reviews)",
                  "CA Licensed #1086515",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white text-[15px]">
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F5A623" }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-orange text-sm font-semibold flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
                </span>
                Offer ends May 31, 2026
              </p>
            </div>

            <div id="quote-form">
              <LeadForm />
            </div>
          </div>

          {/* Right column: hero image (desktop only) */}
          <div className="hidden md:block relative rounded-xl overflow-hidden shadow-2xl self-stretch min-h-[600px]">
            <Image
              src="/images/windows/hero-house.png"
              alt="Anlin replacement windows on a Central Valley home"
              fill
              priority
              sizes="45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-light-bg py-6 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="flex flex-col items-center text-center gap-1">
              <svg className="w-7 h-7 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75zM12 3.75v16.5M3.75 12h16.5" />
              </svg>
              <span className="text-navy text-sm font-bold">Anlin Certified</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-7 h-7 rounded-full bg-[#005596] flex items-center justify-center text-white font-extrabold text-[10px]">BBB</div>
              <span className="text-navy text-sm font-bold">A+ Rated</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#FFC107]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-navy text-sm font-bold">4.7★ Google · 228+ Reviews</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <svg className="w-7 h-7 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-navy text-sm font-bold">CA Licensed #1086515</span>
            </div>
          </div>
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
              Single-pane and aging double-pane windows are the #1 source of summer heat gain in Fresno-area homes. Modern Anlin double-pane windows with Low-E coatings and argon-gas insulation cut cooling loads by 25-30% — meaning a quieter, more comfortable home and lower energy bills every month.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🌡️", title: "25-30% Lower Cooling Costs", desc: "Low-E + argon-gas insulation blocks summer heat" },
              { icon: "🔇", title: "Significantly Quieter Home", desc: "Dual-pane construction reduces outside noise" },
              { icon: "🛡️", title: "Lifetime Warranty", desc: "Anlin's industry-leading warranty backs every install" },
            ].map((c) => (
              <div key={c.title} className="bg-light-bg rounded-2xl p-7 border border-gray-100 text-center">
                <div className="text-4xl mb-3">{c.icon}</div>
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
                badge: "Local Guide",
                text: "We had our windows installed by Home Energy Construction and couldn't be happier. The installation was clean and efficient, and they treated our home with real care. The new windows look amazing and our home is quieter and more energy-efficient. Highly recommend them to anyone looking to upgrade their windows or improve their home's energy efficiency!",
              },
              {
                name: "Edward R.",
                badge: null,
                text: "We recently had new windows and a sliding glass door installed, and the experience was absolutely fantastic from start to finish. The quality of the windows is top-notch — they not only look beautiful but also provide excellent insulation, significantly improving the comfort and energy efficiency of our home. We've noticed a dramatic difference in temperature consistency and noise reduction.",
              },
              {
                name: "Becky M.",
                badge: null,
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
                <p className="text-navy font-semibold text-sm">
                  — {r.name}
                  {r.badge && <span className="text-orange text-xs font-bold ml-2 uppercase">{r.badge}</span>}
                </p>
              </div>
            ))}
          </div>
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
              Home Energy Construction has served the Central Valley for over a decade. Every window crew is HEC employees — never subcontractors — trained and certified on Anlin products. Branded uniforms, branded trucks, and a clean job site every time.
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
                "Lifetime transferable warranty — adds resale value",
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
              { item: "Free Energy Assessment", value: "$199 value" },
              { item: "$200 Off Per Window Installed", value: "instant savings" },
              { item: "$500 Off Per Sliding Glass Door", value: "instant savings" },
              { item: "12-Month Same-As-Cash Financing", value: "$0 down" },
              { item: "Lifetime Anlin Transferable Warranty", value: "$2,000+ value" },
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

      {/* ═══ MOBILE STICKY CTA ═══ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-3 py-2.5 flex gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <a
          href="#quote-form"
          className="flex-1 flex items-center justify-center bg-orange text-white py-3 rounded-xl font-bold text-sm cta-press min-h-[48px]"
        >
          Get Quote
        </a>
        <a
          href={PHONE_HREF}
          className="flex-1 flex items-center justify-center gap-1 bg-navy text-white py-3 rounded-xl font-bold text-sm cta-press min-h-[48px]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Call Now
        </a>
      </div>
    </>
  );
}
