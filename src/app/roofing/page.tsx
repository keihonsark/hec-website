"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import SectionLabel from "@/components/SectionLabel";
import ReviewCard from "@/components/ReviewCard";
import BeforeAfter from "@/components/BeforeAfter";
import { postToWebhook } from "@/lib/webhook";

function RoofingEstimateForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "", address: "", service: "", financing: "",
  });
  const inputCls =
    "w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postToWebhook({
      type: "estimate_request",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      message: form.financing ? `Financing interest: ${form.financing}` : "",
      service: form.service,
      address: form.address,
      source: "hecfresno.com",
      page: "/roofing",
    });
  };

  return (
    <form className="grid sm:grid-cols-2 gap-5" onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" required className={inputCls}
        value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
      <input type="text" placeholder="Last Name" required className={inputCls}
        value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
      <input type="tel" placeholder="Phone Number" className={inputCls}
        value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
      <input type="email" placeholder="Email" className={inputCls}
        value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
      <input type="text" placeholder="Street Address" className={`${inputCls} sm:col-span-2`}
        value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
      <select
        value={form.service}
        onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
        className={`${inputCls} appearance-none bg-white`}
      >
        <option value="" disabled>What do you need?</option>
        <option>Roof Replacement</option>
        <option>Roof Repair</option>
        <option>Storm Damage</option>
        <option>Inspection</option>
        <option>Not Sure</option>
      </select>
      <select
        value={form.financing}
        onChange={(e) => setForm((f) => ({ ...f, financing: e.target.value }))}
        className={`${inputCls} appearance-none bg-white`}
      >
        <option value="" disabled>Interested in financing?</option>
        <option>Yes — $0 Down</option>
        <option>Yes — Low Monthly</option>
        <option>Yes — Deferred</option>
        <option>Not Sure</option>
        <option>No — Paying Cash</option>
      </select>
      <div className="sm:col-span-2">
        <button type="submit"
          className="w-full bg-orange text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-lg shadow-orange/20 cursor-pointer">
          GET MY FREE ESTIMATE →
        </button>
        <p className="text-gray-text text-sm text-center mt-3">
          No obligation. No pressure. Just honest answers.
        </p>
      </div>
    </form>
  );
}

/* ─── Scroll reveal ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useScrollReveal();
  return (
    <section id={id} ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </section>
  );
}

/* ─── Google G icon ─── */
function GoogleG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ─── Orange star SVG ─── */
function Star() {
  return (
    <svg className="w-3.5 h-3.5 text-orange" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ─── Review data (roofing-specific) ─── */
const reviews = [
  {
    text: "They replaced our entire roof in one day. The crew was professional, cleaned everything up, and our energy bill dropped immediately. Best contractor experience we've ever had.",
    name: "Maria G.",
    city: "Fresno",
  },
  {
    text: "We got a great deal on a new roof with zero down. The whole process from inspection to install was smooth. 20+ years in business for a reason.",
    name: "James T.",
    city: "Clovis",
  },
  {
    text: "Best roofing company in Fresno hands down. Fair pricing, quality work, and they actually answer the phone. Using them for windows next.",
    name: "Robert K.",
    city: "Madera",
  },
  {
    text: "Our old roof was leaking every winter. Home Energy came out, gave us an honest quote, and installed a beautiful new roof in two days. The financing made it possible.",
    name: "Patricia D.",
    city: "Clovis",
  },
];

/* ─── FAQ data ─── */
const faqs = [
  {
    q: "How do I know if my roof needs to be replaced?",
    a: "If your roof is over 15-20 years old, has visible damage like curling or missing shingles, or you're experiencing leaks, it's time for an inspection. We offer free, no-pressure inspections to give you an honest assessment.",
  },
  {
    q: "How much does a new roof cost in Fresno?",
    a: "Most residential roof replacements in the Fresno area range from $15,000 to $40,000 depending on size, materials, and complexity. We provide detailed quotes with no hidden fees — and with $0 down financing, you can get started with nothing out of pocket.",
  },
  {
    q: "What roofing materials do you use?",
    a: "We're an Owens Corning Preferred Contractor, which means we use premium Duration and TruDefinition shingles backed by manufacturer warranties. We also install tile, metal, and flat roofing systems.",
  },
  {
    q: "How long does a roof replacement take?",
    a: "Most residential roof replacements are completed in 1-2 days. Larger or more complex projects may take 3-4 days. We'll give you a clear timeline before any work begins.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes — we offer multiple financing options including $0 down, deferred payments up to 18 months, and low monthly payment plans. We work with multiple lenders to find the right fit for every credit profile.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="fade-in-section py-24 md:py-32 bg-light-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
            Common Questions About Roofing
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-navy font-semibold text-[15px] sm:text-base pr-4 group-hover:text-orange transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-orange flex-shrink-0">
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-60 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-text text-[15px] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ROOFING LANDING PAGE
   ═══════════════════════════════════════════ */
export default function RoofingPage() {
  const formSentinel = useRef<HTMLDivElement>(null);
  const mobileCta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = formSentinel.current;
    const bar = mobileCta.current;
    if (!sentinel || !bar) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.classList.toggle("hidden", entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/images/roofing/roofing-crew.png"
          alt="Home Energy Construction roofing crew installing a new roof in Fresno"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div
            className="hero-glass-float max-w-2xl rounded-3xl p-8 sm:p-10 md:p-12"
            style={{
              background: "rgba(15, 29, 51, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Google review badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
              <GoogleG className="w-5 h-5" />
              <span className="text-orange text-sm font-bold">4.7</span>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </span>
              <span className="text-white/70 text-sm">228+ Reviews</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold text-white leading-[1.05] mb-6">
              New Roof.
              <br />
              <span className="text-orange">$0 Down.</span>
            </h1>

            <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Fresno&apos;s trusted roofing experts. Premium Owens Corning
              materials. Flexible financing for every budget.
            </p>

            <div className="flex flex-wrap gap-4">
              <CTAButton href="#roofing-estimate">Get Free Estimate</CTAButton>
              <CTAButton variant="outline" href="tel:5597976081">
                Call (559) 797-6081
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ TRUST STRIP ════════════════ */}
      <section className="bg-white py-6 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-10">
            <Image
              src="/images/logos/owens-preferred-logo.png"
              alt="Owens Corning Preferred Contractor"
              width={180}
              height={55}
              className="h-[50px] md:h-[55px] w-auto"
            />
            <div className="hidden sm:block w-px h-10 bg-gray-200 flex-shrink-0" />
            <Image
              src="/images/logos/bbb-logo.png"
              alt="BBB A+ Accredited Business"
              width={180}
              height={55}
              className="h-[50px] md:h-[55px] w-auto"
            />
            <div className="hidden sm:block w-px h-10 bg-gray-200 flex-shrink-0" />
            <Image
              src="/images/logos/anlin-logo.png"
              alt="Anlin Certified Partner"
              width={180}
              height={55}
              className="h-[50px] md:h-[55px] w-auto"
            />
            <div className="hidden sm:block w-px h-10 bg-gray-200 flex-shrink-0" />
            {/* CA Licensed badge */}
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <div className="leading-tight">
                <div className="text-navy text-sm font-bold">CA Licensed</div>
                <div className="text-gray-text text-xs">#1086515</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-gray-200 flex-shrink-0" />
            {/* Google reviews badge */}
            <div className="flex items-center gap-2">
              <GoogleG className="w-6 h-6" />
              <span className="text-navy font-bold text-base">4.7</span>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span className="text-gray-text text-sm">228+</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ FINANCING HIGHLIGHT STRIP ════════════════ */}
      <Section className="relative overflow-hidden bg-navy-dark">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-orange/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white text-2xl sm:text-3xl font-extrabold">
                Payments starting at{" "}
                <span className="text-orange">$189/mo*</span>
              </p>
              <p className="text-white/50 text-sm mt-1">
                *Based on approved credit. Multiple plans available. $0 down
                options.
              </p>
            </div>
            <CTAButton
              href="#roofing-estimate"
              className="whitespace-nowrap flex-shrink-0"
            >
              Check Your Rate →
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* ════════════════ WHY HOME ENERGY FOR ROOFING ════════════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Home Energy</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              The Right Roof. <span className="text-orange">The Right Price.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Owens Corning Preferred */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 card-lift">
              <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Owens Corning Preferred</h3>
              <p className="text-gray-text text-[15px] leading-relaxed">
                We&apos;re a certified Preferred Contractor using the
                industry&apos;s most trusted roofing products, backed by
                manufacturer warranties.
              </p>
            </div>

            {/* Built for Central Valley Heat */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 card-lift">
              <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Built for Central Valley Heat</h3>
              <p className="text-gray-text text-[15px] leading-relaxed">
                Our roofing systems are designed for 110°F summers.
                Energy-efficient materials that keep your home cooler and your
                bills lower.
              </p>
            </div>

            {/* $0 Down */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 card-lift">
              <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">$0 Down, Payments Your Way</h3>
              <p className="text-gray-text text-[15px] leading-relaxed">
                No money down. Deferred payments. Low monthly options. We have a
                plan for every credit profile — get approved in minutes.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Your New Roof in <span className="text-orange">4 Simple Steps</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {/* Dotted connector line (desktop only) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] border-t-2 border-dashed border-orange/40 z-0" />

            {[
              {
                num: "1",
                title: "Free Inspection",
                desc: "We come to your home, inspect your roof, and give you an honest assessment — no pressure, no cost.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
              },
              {
                num: "2",
                title: "Custom Quote",
                desc: "Get a detailed quote with clear pricing and pick the payment plan that works for your budget.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25" />
                  </svg>
                ),
              },
              {
                num: "3",
                title: "Expert Installation",
                desc: "Our experienced crew installs your new roof with premium Owens Corning materials. Most jobs done in 1-2 days.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-3.19A1.5 1.5 0 015.25 10.7V6.79a1.5 1.5 0 01.786-1.32l5.384-3.19a1.5 1.5 0 011.56 0l5.384 3.19a1.5 1.5 0 01.786 1.32v3.91a1.5 1.5 0 01-.786 1.32l-5.384 3.19a1.5 1.5 0 01-1.56 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6.75M9.75 15l2.25 1.5 2.25-1.5" />
                  </svg>
                ),
              },
              {
                num: "4",
                title: "Enjoy & Relax",
                desc: "Your home is protected with a beautiful new roof, backed by manufacturer and workmanship warranties.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.75L11 14.25 14.5 10.5" />
                  </svg>
                ),
              },
            ].map((step) => (
              <div key={step.num} className="relative text-center z-10">
                <div className="relative w-20 h-20 rounded-full bg-navy flex flex-col items-center justify-center mx-auto mb-5 shadow-lg">
                  <span className="text-white/60 mb-0.5">{step.icon}</span>
                  <span className="text-orange text-lg font-extrabold leading-none">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-text text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton href="#roofing-estimate">Get Started — It&apos;s Free</CTAButton>
          </div>
        </div>
      </Section>

      {/* ════════════════ BEFORE / AFTER ════════════════ */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              See the Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <BeforeAfter
              beforeLabel="Before"
              afterLabel="After"
              caption="Complete roof replacement — Fresno, CA"
              beforeImage="/images/before-after/before-roof-1.png"
              afterImage="/images/before-after/after-roof-1.png"
            />
            <BeforeAfter
              beforeLabel="Before"
              afterLabel="After"
              caption="Full roof restoration — Clovis, CA"
              beforeImage="/images/before-after/before-roof-2.png"
              afterImage="/images/before-after/after-roof-2.png"
            />
          </div>
        </div>
      </Section>

      {/* ════════════════ FINANCING DEEP DIVE ════════════════ */}
      <Section className="relative py-24 md:py-32 bg-navy noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div>
              <SectionLabel>Flexible Financing</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                A New Roof Shouldn&apos;t Break the Bank
              </h2>
              <p className="text-gray-300 text-[15px] leading-relaxed">
                We believe every family deserves a safe, beautiful roof.
                That&apos;s why we offer multiple financing options — so you can
                protect your home now and pay on your terms.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden ring-2 ring-orange/30 shadow-2xl">
              <Image
                src="/images/about/happy-homeowners.png"
                alt="Happy homeowners with their new roof"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange/20 rounded-full blur-[40px] pointer-events-none" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: "$0 Down Payment",
                desc: "Get your new roof installed with nothing out of pocket today",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
                  </svg>
                ),
              },
              {
                title: "Deferred Payments",
                desc: "Don't pay a cent for up to 18 months",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                ),
              },
              {
                title: "Low Monthly Payments",
                desc: "Plans starting at $189/mo based on approved credit",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898M2.25 6l3 3m-3-3h3m-3 0V3" />
                  </svg>
                ),
              },
              {
                title: "All Credit Welcome",
                desc: "Multiple lender options — we'll work to find the right fit for you",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-navy-light/50 border-l-4 border-l-orange rounded-xl p-6 flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton href="#roofing-estimate">See If You Qualify</CTAButton>
            <p className="text-gray-400 text-sm mt-3">
              Checking rates won&apos;t affect your credit score
            </p>
          </div>
        </div>
      </Section>

      {/* ════════════════ REVIEWS ════════════════ */}
      <Section className="py-24 md:py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Real Reviews</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
              What Our Customers Say
            </h2>
            <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-full px-5 py-2.5 shadow-sm">
              <GoogleG className="w-6 h-6" />
              <span className="text-navy font-bold text-lg">4.7</span>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span className="text-gray-text text-sm">228+ reviews</span>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 reviews-carousel w-max pl-4">
              {[...reviews, ...reviews].map((r, i) => (
                <ReviewCard
                  key={`${r.name}-${i}`}
                  text={r.text}
                  name={r.name}
                  city={r.city}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════ OTHER SERVICES (cross-sell) ════════════════ */}
      <Section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>Full-Service Contractor</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              More Than Just Roofing
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "HVAC",
                href: "/hvac",
                desc: "Energy-efficient heating & cooling systems.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Windows",
                href: "/windows",
                desc: "Premium Anlin windows & doors.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75zM12 3.75v16.5M3.75 12h16.5" />
                  </svg>
                ),
              },
              {
                title: "Outdoor Living",
                href: "/outdoor",
                desc: "Patios, pergolas, and gazebos.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 4.5V21H3V7.5L12 3zM3 10.5h18M8.25 21V10.5M15.75 21V10.5" />
                  </svg>
                ),
              },
              {
                title: "Insulation",
                href: "/insulation",
                desc: "Lower your energy bills year-round.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
              },
            ].map((svc) => (
              <a
                key={svc.title}
                href={svc.href}
                className="group bg-light-bg rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange mx-auto mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-base font-bold text-navy mb-1">
                  {svc.title}
                </h3>
                <p className="text-gray-text text-sm mb-3">{svc.desc}</p>
                <span className="text-orange font-semibold text-sm group-hover:translate-x-1 inline-block transition-transform">
                  Learn More →
                </span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════ FAQ ════════════════ */}
      <FAQSection />

      {/* ════════════════ CTA BANNER ════════════════ */}
      <Section className="relative py-24 md:py-28 bg-navy-dark noise-overlay overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(245,166,35,0.3) 40px, rgba(245,166,35,0.3) 41px)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
            Ready for a New Roof?
          </h2>
          <p className="text-white/55 text-xl mb-10 max-w-xl mx-auto">
            $0 down. Free estimates. Flexible financing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="tel:5597976081">
              Call (559) 797-6081
            </CTAButton>
            <CTAButton variant="outline" href="#roofing-estimate">
              Get Free Estimate
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* ════════════════ LEAD CAPTURE FORM ════════════════ */}
      <div ref={formSentinel} className="h-1" />
      <section
        id="roofing-estimate"
        className="relative py-24 md:py-32 overflow-hidden"
      >
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
                Get Your Free Roofing Estimate
              </h2>
              <p className="text-gray-text mt-3">
                Fill out the form below and we&apos;ll call you within 24 hours.
              </p>
            </div>

            <RoofingEstimateForm />
          </div>
        </div>
      </section>

      {/* ════════════════ MOBILE STICKY CTA BAR ════════════════ */}
      <div
        ref={mobileCta}
        className="mobile-cta-bar md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
      >
        <a
          href="tel:5597976081"
          className="flex-1 flex items-center justify-center gap-2 bg-orange text-white py-3 rounded-xl font-bold text-sm cta-press"
        >
          <span>📞</span>
          Call Now
        </a>
        <a
          href="#roofing-estimate"
          className="flex-1 flex items-center justify-center border-2 border-navy bg-white text-navy py-3 rounded-xl font-bold text-sm cta-press"
        >
          Free Estimate
        </a>
      </div>
    </>
  );
}
