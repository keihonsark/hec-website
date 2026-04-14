"use client";

import { useState } from "react";
import Section from "@/components/Section";
import FAQ from "@/components/FAQ";
import MobileStickyBar from "@/components/MobileStickyBar";
import { postToWebhook } from "@/lib/webhook";

/* ──────────────────────────────────────────────
   /offer — Grand Slam Offer landing page
   ────────────────────────────────────────────── */

function TrustInline() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/60 text-xs sm:text-sm font-medium">
      <span>Owens Corning Preferred Contractor</span>
      <span className="text-orange">•</span>
      <span>BBB A+ Rated</span>
      <span className="text-orange">•</span>
      <span>228+ Five-Star Reviews</span>
      <span className="text-orange">•</span>
      <span>CA Lic #1086515</span>
    </div>
  );
}

function OfferRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-white/10 last:border-b-0">
      <svg
        className="w-6 h-6 text-orange flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <span className="text-white text-[15px] sm:text-base font-medium flex-1">
        {label}
      </span>
      <span className="text-orange text-xs sm:text-sm font-bold uppercase tracking-wide text-right flex-shrink-0">
        {value}
      </span>
    </div>
  );
}

function LeadCaptureForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const input =
    "w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition bg-white";

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
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center text-orange mx-auto mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold text-navy mb-2">You&apos;re all set!</h3>
        <p className="text-gray-text text-[15px]">
          We&apos;ll call you within the hour to schedule your free satellite
          analysis and lock in your $1,000 discount.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl"
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text" required placeholder="First Name" className={input}
          value={form.firstName}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
        />
        <input
          type="text" required placeholder="Last Name" className={input}
          value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input
          type="tel" required placeholder="Phone" className={input}
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
        <input
          type="email" required placeholder="Email" className={input}
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <input
        type="text" required placeholder="Street Address" className={`${input} mb-5`}
        value={form.address}
        onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-orange text-white font-extrabold text-lg py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-lg shadow-orange/30 cursor-pointer disabled:opacity-70"
      >
        {submitting ? "Submitting..." : "GET MY FREE ROOF ANALYSIS →"}
      </button>
      <p className="text-gray-text text-xs text-center mt-3">
        No obligation. We&apos;ll call within the hour.
      </p>
    </form>
  );
}

export default function OfferPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-orange/15 border border-orange/30 text-orange text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
            Limited Time Offer
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-6">
            The Complete Roof
            <br />
            <span className="text-orange">Transformation Package</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Everything You Need for a New Roof — Zero Surprises, Zero Out of Pocket
          </p>
          <a
            href="#claim"
            className="inline-flex items-center gap-2 bg-orange text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-xl shadow-orange/30 cursor-pointer mb-10"
          >
            GET YOUR FREE ROOF ANALYSIS →
          </a>
          <TrustInline />
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <Section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-12">
            Your Old Roof Is <span className="text-orange">Costing You</span> Every Month
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                title: "Wasted Energy",
                desc: "Poor insulation and ventilation force your AC to work harder — you pay the difference every month.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
              },
              {
                title: "Hidden Damage",
                desc: "Small issues become expensive ones. Every month you wait, the damage spreads to decking, framing, and your interior.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                ),
              },
              {
                title: "Incomplete Quotes",
                desc: "Five different companies, five different estimates — each one leaving out permits, cleanup, or wood replacement.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25" />
                  </svg>
                ),
              },
            ].map((p) => (
              <div key={p.title} className="bg-light-bg rounded-2xl p-7 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-4">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{p.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-navy text-xl sm:text-2xl font-semibold max-w-3xl mx-auto leading-snug">
            What if <span className="text-orange">one company</span> handled everything — roof, permits, cleanup, warranty, financing — with zero surprises?
          </p>
        </div>
      </Section>

      {/* ═══ OFFER STACK ═══ */}
      <Section className="relative py-16 md:py-24 bg-navy-dark noise-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-5">
              The Package
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Here&apos;s Everything <span className="text-orange">That&apos;s Included</span>
            </h2>
          </div>

          <div className="bg-navy-light/40 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl">
            <OfferRow label="Complete Roof Replacement (Owens Corning Duration shingles)" value="Core Package" />
            <OfferRow label="Free Satellite Roof Analysis" value="Value: $500" />
            <OfferRow label="Free In-Person Inspection" value="Value: $400" />
            <OfferRow label="$0 Down, 0% Interest for 12 Months" value="On Approved Credit" />
            <OfferRow label="Solar Panel Removal & Reinstall Handled" value="$190/panel included" />
            <OfferRow label="All Permits & City Inspections Included" value="Value: $500+" />
            <OfferRow label="Wood Rot & Decking Replacement Included" value="No surprise charges" />
            <OfferRow label="Complete Property Cleanup Guarantee" value="Cleaner than we found it" />
            <OfferRow label="Lifetime Manufacturer Warranty" value="OC Platinum Protection" />
            <OfferRow label="Gutter Inspection & Assessment" value="Value: $200" />
            <OfferRow label="Priority Scheduling" value="Install within 2 weeks" />
            <OfferRow label="$1,000 Off Full Roof Replacement" value="Limited Time" />
            <OfferRow label="$500 Referral Bonus" value="Per neighbor you send" />
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/50 text-sm uppercase tracking-[0.2em] font-semibold mb-2">
              Total Package Value
            </p>
            <p className="text-orange text-5xl sm:text-6xl font-extrabold leading-none mb-4">
              $3,100+
            </p>
            <p className="text-white/60 text-sm">
              In extras, included — at no additional cost
            </p>
            <a
              href="#claim"
              className="inline-flex items-center gap-2 mt-8 bg-orange text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-xl shadow-orange/30 cursor-pointer"
            >
              CLAIM THIS OFFER →
            </a>
          </div>
        </div>
      </Section>

      {/* ═══ FINANCING ═══ */}
      <Section className="py-16 md:py-24 bg-light-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-4">
            Affordable <span className="text-orange">Monthly Payments</span>
          </h2>
          <p className="text-gray-text text-center mb-12 max-w-xl mx-auto">
            Choose the plan that fits your budget. Most homeowners qualify for $0 down and 0% for a year.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "0% Interest",
                headline: "12 Months Same as Cash",
                desc: "No payments, no interest for a full year on approved credit.",
              },
              {
                title: "As Low as $75/mo",
                headline: "15-Year Option",
                desc: "Rates as low as 7.9% APR to fit any budget.",
              },
              {
                title: "$0 Down",
                headline: "Nothing Out of Pocket",
                desc: "Start your project today with zero money down.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-8 border-l-[3px] border-l-orange shadow-lg text-center">
                <p className="text-orange text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  {f.title}
                </p>
                <h3 className="text-xl font-extrabold text-navy mb-3">
                  {f.headline}
                </h3>
                <p className="text-gray-text text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-text/70 text-xs text-center mt-8">
            On approved credit. Terms vary by lender.
          </p>
        </div>
      </Section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <Section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-2">
              228+ Fresno Homeowners <span className="text-orange">Trust HEC</span>
            </h2>
            <p className="text-gray-text text-sm">
              4.7 stars across 228+ Google reviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "They replaced our entire roof in two days. The crew was professional, cleaned up everything, and our energy bill dropped immediately. Best contractor experience we've ever had.", name: "Maria G.", city: "Fresno" },
              { text: "We got a new roof with zero down. The whole process from inspection to install was smooth. 20+ years in business for a reason.", name: "James T.", city: "Clovis" },
              { text: "Best roofing company in Fresno hands down. Fair pricing, quality work, and they actually answer the phone. Using them for windows next.", name: "Robert K.", city: "Madera" },
              { text: "Our old roof was leaking every winter. Home Energy came out, gave us an honest quote, and installed a beautiful new roof in two days.", name: "Patricia D.", city: "Clovis" },
            ].map((r) => (
              <div key={r.name} className="bg-light-bg rounded-2xl p-7 border-l-4 border-l-orange">
                <p className="text-gray-text italic text-[15px] leading-relaxed mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="text-navy font-semibold text-sm">
                  — {r.name}, {r.city}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.google.com/search?q=home+energy+construction+fresno+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange font-semibold hover:underline"
            >
              Read More Reviews on Google →
            </a>
          </div>
        </div>
      </Section>

      {/* ═══ COMPARISON ═══ */}
      <Section className="py-16 md:py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-12">
            Why HEC vs <span className="text-orange">Everyone Else</span>
          </h2>

          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            {/* Header */}
            <div className="grid grid-cols-2">
              <div className="bg-gray-100 p-5 text-center">
                <p className="text-gray-text font-bold text-sm uppercase tracking-wider">Other Roofers</p>
              </div>
              <div className="bg-navy p-5 text-center">
                <p className="text-white font-bold text-sm uppercase tracking-wider">HEC</p>
              </div>
            </div>
            {/* Rows */}
            {[
              { other: "Quote for roof only", hec: "Complete package — roof, permits, cleanup, warranty" },
              { other: "Surprise charges for wood rot", hec: "Wood replacement included" },
              { other: "You deal with solar company", hec: "We handle solar R&R" },
              { other: "60-90 day wait", hec: "Installed in 2 weeks" },
              { other: "Basic manufacturer warranty", hec: "Lifetime Owens Corning Platinum" },
              { other: "No financing help", hec: "$0 down, 0% for 12 months" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t border-gray-100">
                <div className="p-4 sm:p-5 text-gray-text text-sm leading-relaxed">
                  {row.other}
                </div>
                <div className="p-4 sm:p-5 bg-orange/5 text-navy text-sm font-semibold leading-relaxed flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {row.hec}
                </div>
              </div>
            ))}
          </div>
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
            q: "Is the $1,000 discount real?",
            a: "Yes. This is a limited-time offer for homeowners who book their free satellite analysis through this page. The $1,000 comes off your final roofing package price and is locked in when you schedule your free inspection.",
          },
        ]}
      />

      {/* ═══ FINAL CTA + FORM ═══ */}
      <section id="claim" className="relative py-16 md:py-24 bg-navy-dark noise-overlay overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-orange/15 border border-orange/30 text-orange text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
              Claim Your Offer
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Get Your <span className="text-orange">Free Satellite Roof Analysis</span>
            </h2>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              See your roof from space, get an instant estimate, and lock in your $1,000 discount.
            </p>
          </div>

          <LeadCaptureForm />

          <p className="text-white/60 text-center mt-6 text-sm">
            Or call now:{" "}
            <a href="tel:+15592158516" className="text-orange font-bold hover:underline">
              (559) 215-8516
            </a>{" "}
            — Our team is standing by
          </p>
        </div>
      </section>

      <MobileStickyBar formAnchor="#claim" />
    </>
  );
}
