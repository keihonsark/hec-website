"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/components/Section";
import FAQ from "@/components/FAQ";
import MobileStickyBar from "@/components/MobileStickyBar";
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel";
import { postToWebhook } from "@/lib/webhook";

/* ──────────────────────────────────────────────
   /offer — Grand Slam Offer landing page
   ────────────────────────────────────────────── */

/* ═══ Styled trust badges ═══ */
function BadgeOwensCorning() {
  return (
    <div className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-md border border-white/20">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E50064] to-[#A00046] flex items-center justify-center text-white font-extrabold text-xs">
        OC
      </div>
      <div className="leading-tight text-left">
        <div className="text-[10px] font-bold text-navy uppercase tracking-wide">Owens Corning</div>
        <div className="text-[9px] text-gray-text uppercase">Preferred Contractor</div>
      </div>
    </div>
  );
}

function BadgeBBB() {
  return (
    <div className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-md border border-white/20">
      <div className="w-7 h-7 rounded-full bg-[#005596] flex items-center justify-center text-white font-extrabold text-[10px]">
        BBB
      </div>
      <div className="leading-tight text-left">
        <div className="text-[10px] font-bold text-navy uppercase tracking-wide">A+ Rating</div>
        <div className="text-[9px] text-gray-text uppercase">Accredited</div>
      </div>
    </div>
  );
}

function BadgeGoogleGuaranteed() {
  return (
    <div className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-md border border-white/20">
      <svg className="w-7 h-7" viewBox="0 0 24 24">
        <path d="M12 2l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6l9-4z" fill="#1A8A48" />
        <path d="M9 12.5l2 2 4-4.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="leading-tight text-left">
        <div className="text-[10px] font-bold text-navy uppercase tracking-wide">Google</div>
        <div className="text-[9px] text-gray-text uppercase">Guaranteed</div>
      </div>
    </div>
  );
}

function BadgeReviews() {
  return (
    <div className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-md border border-white/20">
      <div className="flex items-center gap-0.5">
        <svg className="w-4 h-4 text-[#FFC107]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div className="leading-tight text-left">
        <div className="text-[10px] font-bold text-navy uppercase tracking-wide">4.7 ★ Rating</div>
        <div className="text-[9px] text-gray-text uppercase">228+ Reviews</div>
      </div>
    </div>
  );
}

function BadgeLicensed() {
  return (
    <div className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-md border border-white/20">
      <svg className="w-7 h-7 text-orange" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
      <div className="leading-tight text-left">
        <div className="text-[10px] font-bold text-navy uppercase tracking-wide">CA Licensed</div>
        <div className="text-[9px] text-gray-text uppercase">&amp; Insured</div>
      </div>
    </div>
  );
}

function TrustBadgeRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <BadgeOwensCorning />
      <BadgeBBB />
      <BadgeGoogleGuaranteed />
      <BadgeReviews />
      <BadgeLicensed />
    </div>
  );
}

/* ═══ Offer row with big bold value ═══ */
function OfferRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-white/10 last:border-b-0">
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
      <div className="flex-1">
        <span className="text-white text-[15px] sm:text-base font-medium">{label}</span>
        {note && (
          <p className="text-white/50 text-xs sm:text-sm mt-1">{note}</p>
        )}
      </div>
      <span className="text-orange text-sm sm:text-base font-extrabold uppercase tracking-wide text-right flex-shrink-0 mt-0.5">
        {value}
      </span>
    </div>
  );
}

/* ═══ Reusable claim form section ═══ */
function ClaimFormSection({ id, background = "bg-navy" }: { id: string; background?: string }) {
  return (
    <section id={id} className={`relative ${background} py-10 md:py-14`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-orange/15 border border-orange/30 text-orange text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">
            Limited Time
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            Claim Your <span className="text-orange">$1,000 Discount</span>
          </h2>
          <p className="text-white/65 text-base sm:text-lg max-w-xl mx-auto">
            Fill out the form below and our team will call you to schedule your free roof inspection and lock in your discount.
          </p>
        </div>

        <LeadCaptureForm />

        <p className="text-white/60 text-center mt-5 text-sm">
          Or call now:{" "}
          <a href="tel:+15592158516" className="text-orange font-bold hover:underline">
            (559) 215-8516
          </a>{" "}
          — Our team is standing by
        </p>
      </div>
    </section>
  );
}

/* Current month name for scarcity line */
function currentMonthName(): string {
  return new Date().toLocaleString("en-US", { month: "long" });
}

/* ═══ Lead capture form ═══ */
function LeadCaptureForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const input = "w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition bg-white";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    await postToWebhook({
      type: "estimate_request",
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      service: "Roofing",
      message: "Grand Slam Offer page submission",
      source: "hecfresno.com",
      page: "/offer",
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center ring-4 ring-orange/20">
        <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center text-orange mx-auto mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold text-navy mb-2">You&apos;re all set!</h3>
        <p className="text-gray-text text-[15px]">
          Our team will call you within the hour to schedule your free inspection and lock in your $1,000 discount.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl ring-4 ring-orange/20">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input type="text" required placeholder="First Name" className={input} value={form.firstName}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
        <input type="text" required placeholder="Last Name" className={input} value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input type="tel" required placeholder="Phone" className={input} value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        <input type="email" required placeholder="Email" className={input} value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
      </div>
      <input type="text" required placeholder="Street Address" className={`${input} mb-5`} value={form.address}
        onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
      <button type="submit" disabled={submitting}
        className="w-full bg-orange text-white font-extrabold text-lg py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-lg shadow-orange/30 cursor-pointer disabled:opacity-70">
        {submitting ? "Submitting..." : "CLAIM MY $1,000 DISCOUNT →"}
      </button>
      <p className="text-gray-text text-xs text-center mt-3">
        No obligation. We&apos;ll call within the hour.
      </p>
    </form>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function OfferPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative py-16 md:py-20 overflow-hidden min-h-[520px] flex items-center">
        {/* Background home image */}
        <Image
          src="/images/hero/hero-home.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/95 via-navy-dark/85 to-navy/70" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-orange/15 border border-orange/40 text-orange text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
            Limited Time Offer
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-5">
            The Complete Roof
            <br />
            <span className="text-orange">Transformation Package</span>
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Everything You Need for a New Roof — Zero Surprises, Zero Out of Pocket
          </p>
          <a href="#claim"
            className="inline-flex items-center gap-2 bg-orange text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-xl shadow-orange/30 cursor-pointer">
            CLAIM YOUR $1,000 DISCOUNT →
          </a>
          <p className="text-orange text-sm font-semibold mt-4 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
            </span>
            Only 12 installation spots available in {currentMonthName()}
          </p>
          <div className="mt-10">
            <TrustBadgeRow />
          </div>
        </div>
      </section>

      {/* ═══ FORM (TOP) ═══ */}
      <ClaimFormSection id="claim" />

      {/* ═══ OFFER STACK ═══ */}
      <Section className="relative py-12 md:py-16 bg-navy-dark noise-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-orange text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">
              The Package
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Here&apos;s Everything <span className="text-orange">That&apos;s Included</span>
            </h2>
          </div>

          <div className="bg-navy-light/40 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl">
            <OfferRow label="Complete Roof Replacement (Owens Corning Duration shingles)" value="Core Package" />
            <OfferRow label="Free Satellite Roof Analysis" value="$500 Value" />
            <OfferRow label="Free In-Person Inspection" value="$400 Value" />
            <OfferRow label="$0 Down, 0% Interest for 12 Months" value="On Approved Credit" />
            <OfferRow
              label="Solar Panel Removal & Reinstall — We Handle Everything"
              value="We Handle It"
              note="R&R at $190/panel — no third-party coordination needed."
            />
            <OfferRow label="All Permits & City Inspections Included" value="$500+ Value" />
            <OfferRow label="Wood Rot & Decking Replacement Included" value="$1,500+ Value" />
            <OfferRow label="Complete Property Cleanup Guarantee" value="$500 Value" />
            <OfferRow label="Lifetime Manufacturer Warranty" value="OC Platinum" />
            <OfferRow label="Gutter Inspection & Assessment" value="$200 Value" />
            <OfferRow label="Priority Scheduling (Install within 2 weeks)" value="$500 Value" />
            <OfferRow label="$1,000 Off Full Roof Replacement" value="$1,000 Off" />
            <OfferRow label="$500 Referral Bonus Per Neighbor" value="$500 Each" />
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/50 text-sm uppercase tracking-[0.2em] font-semibold mb-3">
              Total Package Value
            </p>
            <p className="text-orange text-6xl sm:text-7xl font-extrabold leading-none mb-4">
              $5,600+
            </p>
            <p className="text-white/70 text-base sm:text-lg">
              In extras — <span className="font-semibold text-white">included at no additional cost</span>
            </p>
            <a href="#claim"
              className="inline-flex items-center gap-2 mt-8 bg-orange text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-xl shadow-orange/30 cursor-pointer">
              CLAIM THIS OFFER →
            </a>
          </div>
        </div>
      </Section>

      {/* ═══ COMPARISON ═══ */}
      <Section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-10">
            Why HEC vs <span className="text-orange">Everyone Else</span>
          </h2>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <div className="grid grid-cols-2">
              <div className="bg-gray-200 p-4 sm:p-5 text-center">
                <p className="text-gray-600 font-bold text-sm uppercase tracking-wider">Other Roofers</p>
              </div>
              <div className="bg-orange p-4 sm:p-5 text-center">
                <p className="text-white font-extrabold text-sm uppercase tracking-wider">HEC</p>
              </div>
            </div>
            {[
              { other: "Quote for roof only", hec: "Complete package — roof, permits, cleanup, warranty" },
              { other: "Surprise charges for wood rot", hec: "Wood replacement included" },
              { other: "You deal with solar company", hec: "We handle solar panel removal & reinstall" },
              { other: "60-90 day wait", hec: "Installed in 2 weeks" },
              { other: "Basic manufacturer warranty", hec: "Lifetime Owens Corning Platinum" },
              { other: "No financing help", hec: "$0 down, 0% for 12 months" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t border-gray-100">
                <div className="p-4 sm:p-5 bg-white text-gray-text text-sm leading-relaxed flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {row.other}
                </div>
                <div className="p-4 sm:p-5 bg-orange/5 text-navy text-sm font-semibold leading-relaxed flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {row.hec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FINANCING ═══ */}
      <Section className="py-12 md:py-16 bg-light-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-3">
            Affordable <span className="text-orange">Monthly Payments</span>
          </h2>
          <p className="text-gray-text text-center mb-10 max-w-xl mx-auto">
            Choose the plan that fits your budget. Most homeowners qualify for $0 down and 0% for a year.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "0% Interest", headline: "12 Months Same as Cash", desc: "No payments, no interest for a full year on approved credit." },
              { title: "As Low as $75/mo", headline: "15-Year Option", desc: "Rates as low as 7.9% APR to fit any budget." },
              { title: "$0 Down", headline: "Nothing Out of Pocket", desc: "Start your project today with zero money down." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-7 border-l-[3px] border-l-orange shadow-lg text-center">
                <p className="text-orange text-xs font-bold uppercase tracking-[0.2em] mb-2">{f.title}</p>
                <h3 className="text-xl font-extrabold text-navy mb-3">{f.headline}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-text/70 text-xs text-center mt-6">
            On approved credit. Terms vary by lender.
          </p>
        </div>
      </Section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <Section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-2">
              228+ Fresno Homeowners <span className="text-orange">Trust HEC</span>
            </h2>
            <p className="text-gray-text text-sm">4.7 stars across 228+ Google reviews</p>
          </div>

          <GoogleReviewsCarousel />

          <div className="text-center mt-8">
            <a href="https://www.google.com/search?q=home+energy+construction+fresno+reviews" target="_blank" rel="noopener noreferrer"
              className="text-orange font-semibold hover:underline">
              Read More Reviews on Google →
            </a>
          </div>
        </div>
      </Section>

      {/* ═══ BEFORE / AFTER ═══ */}
      <Section className="py-12 md:py-16 bg-light-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-3">
            Real Results from Real <span className="text-orange">Fresno Homeowners</span>
          </h2>
          <p className="text-gray-text text-center mb-10 text-sm">
            Photos from actual HEC projects in the Fresno area
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="grid grid-cols-2">
                  <div className="relative h-48 md:h-56">
                    {/* REPLACE: before/after photo set {n} */}
                    {n === 1 ? (
                      <Image src="/images/before-after/before-roof-1.png" alt="Before" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                    ) : (
                      <Image src="/images/before-after/before-roof-2.png" alt="Before" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                    )}
                    <span className="absolute top-2 left-2 bg-navy-dark/80 text-white text-xs font-bold uppercase px-2.5 py-0.5 rounded-full">Before</span>
                  </div>
                  <div className="relative h-48 md:h-56">
                    {n === 1 ? (
                      <Image src="/images/before-after/after-roof-1.png" alt="After" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                    ) : (
                      <Image src="/images/before-after/after-roof-2.png" alt="After" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                    )}
                    <span className="absolute top-2 left-2 bg-orange text-white text-xs font-bold uppercase px-2.5 py-0.5 rounded-full">After</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-gray-text text-sm font-medium">
                    {n === 1 ? "Complete roof replacement — Fresno, CA" : "Full roof restoration — Clovis, CA"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ PROBLEM (compressed) ═══ */}
      <Section className="py-8 md:py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy text-center mb-6">
            Your Old Roof Is <span className="text-orange">Costing You</span> Every Month
          </h2>
          <div className="grid sm:grid-cols-3 gap-3 mb-6 max-w-4xl mx-auto">
            {[
              { title: "Wasted Energy", desc: "Poor insulation forces your AC to work harder." },
              { title: "Hidden Damage", desc: "Small issues become expensive ones as damage spreads." },
              { title: "Incomplete Quotes", desc: "Other roofers leave out permits, cleanup, or wood replacement." },
            ].map((p) => (
              <div key={p.title} className="bg-light-bg rounded-xl px-4 py-3 flex items-start gap-3 border border-gray-100">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#F5A623" }} fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-bold text-navy mb-0.5">{p.title}</h3>
                  <p className="text-gray-text text-xs leading-snug">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-navy text-lg sm:text-xl font-semibold max-w-3xl mx-auto leading-snug">
            What if <span className="text-orange">one company</span> handled everything — with zero surprises?
          </p>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <FAQ
        label="FAQ"
        headline="Common Questions"
        items={[
          {
            q: "What's included in the Complete Roof Transformation Package?",
            a: "Everything you need for a new roof — premium Owens Corning Duration shingles, all permits and inspections, complete tear-off and cleanup, wood rot replacement, synthetic underlayment, new drip edge and flashing, proper ventilation, and lifetime manufacturer warranty. Plus free satellite analysis, free in-person inspection, solar panel removal and reinstall, and $0 down financing.",
          },
          {
            q: "How does $0 down financing work?",
            a: "We partner with multiple lenders to offer financing with no money down. On approved credit, you can get 0% interest for 12 months (same as cash) or extend payments over 15 years with rates as low as 7.9% APR. Checking your rate won't affect your credit score.",
          },
          {
            q: "Do you handle solar panels?",
            a: "Yes. Most roofers leave solar removal to you — we handle it all. Our crew coordinates with certified solar technicians to safely remove your panels, replace your roof, and reinstall the panels. $190 per panel included in your quote, no third parties to manage.",
          },
          {
            q: "How long does installation take?",
            a: "Most residential re-roofs are completed in 1-2 days. Larger homes or complex roofs may take 3-4 days. With priority scheduling, we can typically have your new roof installed within 2 weeks of signing.",
          },
          {
            q: "What about permits and inspections?",
            a: "Included. Every roof we install is fully permitted with the city and passes inspection. This protects you, your warranty, and your home's resale value. No shortcuts, no cash deals.",
          },
          {
            q: "What if my roof has wood rot or damage?",
            a: "Unlike other roofers who surprise you with change orders for damaged decking, we include wood replacement in our package. If we find rot or damaged plywood during tear-off, we replace it as part of the job — no surprise charges.",
          },
          {
            q: "Why is HEC more expensive than other quotes?",
            a: "We include everything other companies leave out — permits, wood replacement, solar handling, cleanup, and lifetime warranty. When you compare apples to apples, our total cost is often lower because there are zero surprise charges.",
          },
          {
            q: "Is the $1,000 discount real?",
            a: "Yes. This is a limited-time offer for homeowners who book their free satellite analysis through this page. The $1,000 comes off your final roofing package price and is locked in when you schedule your free inspection.",
          },
        ]}
      />

      {/* ═══ FORM (BOTTOM) ═══ */}
      <ClaimFormSection id="claim-bottom" background="bg-navy-dark" />

      <MobileStickyBar formAnchor="#claim" />
    </>
  );
}
