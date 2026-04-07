"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import AddressInput from "@/components/calculator/AddressInput";
import LoadingAnimation from "@/components/calculator/LoadingAnimation";
import SatelliteMap from "@/components/calculator/SatelliteMap";
import EstimateCard from "@/components/calculator/EstimateCard";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import {
  analyzeRoof,
  calculatePricing,
  SOLAR_COST_PER_PANEL,
  type RoofAnalysis,
  type PriceEstimate,
  type RoofSegmentInput,
} from "@/lib/pricingEngine";
import { generateRoofReport } from "@/lib/generateReport";

type PageState = "input" | "loading" | "results" | "error";

interface SolarSegment extends RoofSegmentInput {
  center?: { latitude: number; longitude: number } | null;
  boundingBox?: {
    sw: { latitude: number; longitude: number };
    ne: { latitude: number; longitude: number };
  } | null;
}

interface SolarData {
  center: { latitude: number; longitude: number };
  imageryDate?: { year: number; month: number; day: number };
  roofSegmentStats: SolarSegment[];
}

export default function EstimatePage() {
  const [state, setState] = useState<PageState>("input");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [analysis, setAnalysis] = useState<RoofAnalysis | null>(null);
  const [pricing, setPricing] = useState<PriceEstimate | null>(null);
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddressSelect = useCallback(
    async (result: { lat: number; lng: number; address: string }) => {
      setAddress(result.address);
      setCoords({ lat: result.lat, lng: result.lng });
      setState("loading");

      try {
        const res = await fetch(
          `/api/solar?lat=${result.lat}&lng=${result.lng}`
        );
        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.message || "Something went wrong.");
          setState("error");
          return;
        }

        setSolarData(data);
        const roofAnalysis = analyzeRoof(data.roofSegmentStats || []);
        const priceEstimate = calculatePricing(roofAnalysis);
        setAnalysis(roofAnalysis);
        setPricing(priceEstimate);

        // Delay to let loading animation finish
        setTimeout(() => setState("results"), 2000);
      } catch {
        setErrorMsg("Could not connect to the analysis service. Please try again.");
        setState("error");
      }
    },
    []
  );

  /* ════════ INPUT STATE ════════ */
  if (state === "input") {
    return (
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/hero-home.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
          priority
        />
        <div className="absolute inset-0 bg-navy-dark/92" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <SectionLabel>Free Roof Estimate</SectionLabel>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] mb-5">
            How Much Will Your
            <br />
            New Roof <span className="text-orange">Cost?</span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
            Enter your address to get an instant satellite roof analysis and
            cost estimate. No phone call needed.
          </p>

          <AddressInput onSelect={handleAddressSelect} />

          <p className="text-white/40 text-sm mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Free. Instant. No contact info required.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 opacity-60">
            <Image src="/images/logos/owens-preferred-logo.png" alt="Owens Corning" width={100} height={30} className="h-[28px] w-auto" />
            <Image src="/images/logos/bbb-logo.png" alt="BBB A+" width={100} height={30} className="h-[28px] w-auto" />
            <span className="text-white/60 text-sm font-semibold">4.7 ★ 228+ Reviews</span>
          </div>
        </div>
      </section>
    );
  }

  /* ════════ LOADING STATE ════════ */
  if (state === "loading") {
    return (
      <LoadingAnimation address={address} lat={coords.lat} lng={coords.lng} />
    );
  }

  /* ════════ ERROR STATE ════════ */
  if (state === "error") {
    return (
      <section className="relative min-h-[80vh] flex items-center bg-navy-dark">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center text-orange mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">{errorMsg}</h2>
          <p className="text-white/60 mb-8">
            No worries — you can still get a free estimate from our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton
              onClick={() => {
                setState("input");
                setErrorMsg("");
              }}
            >
              Try Another Address
            </CTAButton>
            <CTAButton variant="outline" href="tel:5597976081">
              Call (559) 797-6081
            </CTAButton>
          </div>
        </div>
      </section>
    );
  }

  /* ════════ RESULTS STATE — Gated Funnel ════════ */
  return (
    <ResultsFunnel
      address={address}
      coords={coords}
      analysis={analysis}
      pricing={pricing}
      solarData={solarData}
    />
  );
}

/* ─────────────────────────────────────────
   RESULTS WIZARD — 4-step single-card flow
   ───────────────────────────────────────── */
function ResultsFunnel({
  address,
  coords,
  analysis,
  pricing: basePricing,
  solarData,
}: {
  address: string;
  coords: { lat: number; lng: number };
  analysis: RoofAnalysis | null;
  pricing: PriceEstimate | null;
  solarData: SolarData | null;
}) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  // Solar panel state
  const [solarAnswer, setSolarAnswer] = useState<"yes" | "no" | "notsure" | null>(null);
  const [solarPanelCount, setSolarPanelCount] = useState(20);

  const activePanelCount = solarAnswer === "yes" ? solarPanelCount : 0;
  const pricing =
    analysis && basePricing
      ? calculatePricing(analysis, activePanelCount)
      : basePricing;

  /* Store detailed data for CRM / PDF */
  if (typeof window !== "undefined" && analysis && pricing) {
    try {
      localStorage.setItem(
        "hec_roof_report",
        JSON.stringify({ address, coords, analysis, pricing, solarData, solarPanelCount: activePanelCount })
      );
    } catch { /* */ }
  }

  const handleGateSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.phone || !formData.email) return;
      setSubmitting(true);
      const code = `HEC-${Math.floor(1000 + Math.random() * 9000)}`;

      const leadData = {
        name: formData.name, phone: formData.phone, email: formData.email, address,
        roofAreaSqFt: analysis?.totalRoofAreaSqFt ?? 0, roofSegments: analysis?.segmentCount ?? 0,
        primaryPitch: analysis?.averagePitchRatio ?? "", complexity: analysis?.complexity ?? "",
        estimateLow: pricing?.low ?? 0, estimateMid: pricing?.mid ?? 0, estimateHigh: pricing?.high ?? 0,
        hasSolarPanels: solarAnswer === "yes" ? true : solarAnswer === "no" ? false : ("unknown" as const),
        solarPanelCount: activePanelCount, solarRemovalCost: activePanelCount * SOLAR_COST_PER_PANEL,
        totalEstimateLow: pricing?.totalLow ?? 0, totalEstimateMid: pricing?.totalMid ?? 0,
        totalEstimateHigh: pricing?.totalHigh ?? 0,
        couponCode: code, timestamp: new Date().toISOString(), source: "roof_calculator",
      };
      console.log("Lead captured:", leadData);

      setTimeout(() => {
        setCouponCode(code);
        setStep(4);
        setSubmitting(false);
      }, 1000);
    },
    [formData, address, analysis, pricing, solarAnswer, activePanelCount]
  );

  const inputClass =
    "w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition bg-white";

  const totalSteps = 4;

  function fmt(n: number) {
    return "$" + n.toLocaleString("en-US");
  }

  return (
    <>
      {/* ═══ Satellite Map (always visible) ═══ */}
      <section className="bg-navy-dark pt-4 pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SatelliteMap lat={coords.lat} lng={coords.lng} />
          <div className="text-center mt-4">
            <p className="text-white font-semibold text-lg">{address}</p>
            {analysis && (
              <p className="text-white/50 text-sm mt-1">
                {analysis.segmentCount} roof segments detected
                {solarData?.imageryDate ? ` · Imagery from ${solarData.imageryDate.month}/${solarData.imageryDate.year}` : ""}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ Wizard Card ═══ */}
      <section className="bg-light-bg py-10 md:py-16 min-h-[50vh]">
        <div className="max-w-[800px] mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2.5 pt-6 pb-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i + 1 === step
                      ? "w-8 bg-orange"
                      : i + 1 < step
                        ? "w-2 bg-orange/40"
                        : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-gray-text text-xs mb-4">
              Step {step} of {totalSteps}
            </p>

            {/* Step content area */}
            <div className="px-6 sm:px-10 pb-8">
              {/* ── STEP 1: We Found Your Roof ── */}
              {step === 1 && analysis && (
                <div key="s1" className="wizard-step text-center py-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-5">
                    We Found Your Roof!
                  </h2>
                  <div className="text-orange text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none mb-3">
                    {analysis.totalRoofAreaSqFt.toLocaleString()}
                    <span className="text-2xl sm:text-3xl text-gray-text ml-2">sq ft</span>
                  </div>
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-text mt-4 mb-2">
                    <span>Roof Type: <strong className="text-navy">{analysis.complexity}</strong></span>
                    <span>Primary Pitch: <strong className="text-navy">{analysis.averagePitchRatio}</strong></span>
                  </div>
                  <p className="text-gray-text/60 text-xs mb-8">
                    Based on satellite analysis of your property
                  </p>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-orange text-white font-bold text-base py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press cursor-pointer shadow-lg shadow-orange/20"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* ── STEP 2: Solar Panel Question ── */}
              {step === 2 && (
                <div key="s2" className="wizard-step py-6">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange mx-auto mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                      Does your home have solar panels?
                    </h2>
                  </div>

                  <div className="flex gap-3 mb-5">
                    {([
                      { value: "no" as const, label: "No" },
                      { value: "yes" as const, label: "Yes" },
                      { value: "notsure" as const, label: "Not Sure" },
                    ] as const).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSolarAnswer(opt.value)}
                        className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                          solarAnswer === opt.value
                            ? "bg-orange text-white shadow-md"
                            : "bg-light-bg text-navy border border-gray-200 hover:border-orange/40"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {solarAnswer === "no" && (
                    <p className="text-gray-text text-sm flex items-center gap-2 mb-6">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      Great — no additional costs for solar removal.
                    </p>
                  )}
                  {solarAnswer === "yes" && (
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-navy font-medium whitespace-nowrap">How many panels?</label>
                        <input type="number" min={1} max={100} value={solarPanelCount}
                          onChange={(e) => setSolarPanelCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                          className="w-20 px-3 py-2 rounded-lg border border-gray-200 text-navy text-center font-semibold focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange"
                        />
                      </div>
                      <p className="text-sm text-navy bg-orange/5 rounded-lg px-4 py-2.5 border border-orange/10">
                        Estimated solar removal &amp; reinstall: <strong className="text-orange">${(solarPanelCount * SOLAR_COST_PER_PANEL).toLocaleString()}</strong>
                      </p>
                    </div>
                  )}
                  {solarAnswer === "notsure" && (
                    <p className="text-gray-text text-sm flex items-start gap-2 mb-6">
                      <svg className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                      No worries — we&apos;ll count your panels during your free inspection.
                    </p>
                  )}

                  <button
                    onClick={() => setStep(3)}
                    disabled={solarAnswer === null}
                    className="w-full bg-orange text-white font-bold text-base py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press cursor-pointer shadow-lg shadow-orange/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    See My Estimate →
                  </button>
                </div>
              )}

              {/* ── STEP 3: Contact Gate ── */}
              {step === 3 && (
                <div key="s3" className="wizard-step py-6">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center text-orange mx-auto mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-navy mb-2">
                      Unlock Your Estimate + Get $500 Off
                    </h2>
                    <p className="text-gray-text text-sm">
                      Enter your info to see personalized pricing and download your free roof report.
                    </p>
                  </div>

                  <form onSubmit={handleGateSubmit} className="space-y-4">
                    <input type="text" placeholder="Full Name" required value={formData.name}
                      onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))} className={inputClass} />
                    <input type="tel" placeholder="Phone Number" required value={formData.phone}
                      onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))} className={inputClass} />
                    <input type="email" placeholder="Email Address" required value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))} className={inputClass} />
                    <button type="submit" disabled={submitting}
                      className="w-full bg-orange text-white font-bold text-base py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press cursor-pointer shadow-lg shadow-orange/20 disabled:opacity-70">
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Unlocking...
                        </span>
                      ) : "UNLOCK MY ESTIMATE →"}
                    </button>
                    <p className="text-gray-text text-xs text-center flex items-center justify-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      No spam. We&apos;ll call within 1 hour.
                    </p>
                  </form>
                </div>
              )}

              {/* ── STEP 4: Full Results ── */}
              {step === 4 && pricing && analysis && (
                <div key="s4" className="wizard-step py-6">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-navy text-center mb-6">
                    Your Estimated Cost
                  </h2>

                  {/* Pricing tiers stacked */}
                  <div className="space-y-4 mb-8">
                    {([
                      { label: "Good", sub: "Standard Shingle", price: pricing.low, monthly: pricing.monthlyLow, total: pricing.totalLow, totalMonthly: pricing.totalMonthlyLow, rec: false },
                      { label: "Better", sub: "Owens Corning Duration", price: pricing.mid, monthly: pricing.monthlyMid, total: pricing.totalMid, totalMonthly: pricing.totalMonthlyMid, rec: true },
                      { label: "Best", sub: "Premium / Tile", price: pricing.high, monthly: pricing.monthlyHigh, total: pricing.totalHigh, totalMonthly: pricing.totalMonthlyHigh, rec: false },
                    ] as const).map((tier) => {
                      const hasSolar = activePanelCount > 0 && pricing.solarCost > 0;
                      return (
                        <div key={tier.label} className={`rounded-xl p-5 ${tier.rec ? "bg-orange/5 border-2 border-orange" : "bg-light-bg border border-gray-100"}`}>
                          {tier.rec && <span className="text-orange text-xs font-bold uppercase tracking-wider">★ Recommended</span>}
                          <div className="flex items-baseline justify-between mt-1">
                            <div>
                              <span className="text-navy font-bold">{tier.label}</span>
                              <span className="text-gray-text text-sm ml-2">{tier.sub}</span>
                            </div>
                            <span className={`text-2xl font-extrabold ${tier.rec ? "text-orange" : "text-navy"}`}>{fmt(tier.total)}</span>
                          </div>
                          {hasSolar && (
                            <p className="text-gray-text text-xs mt-1">
                              Roof {fmt(tier.price)} + Solar R&R {fmt(pricing.solarCost)}
                            </p>
                          )}
                          {solarAnswer === "notsure" && (
                            <p className="text-gray-text/60 text-xs mt-1">* Solar removal not included</p>
                          )}
                          <p className="text-gray-text text-sm mt-1">~{fmt(tier.totalMonthly)}/mo with $0 down</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-6" />

                  {/* Coupon */}
                  <div className="bg-gradient-to-r from-orange to-orange-dark rounded-xl p-5 text-center mb-6">
                    <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">Your $500 Off Code</p>
                    <p className="text-white text-3xl font-extrabold font-mono tracking-wider mb-1">{couponCode}</p>
                    <p className="text-white/70 text-xs">Valid for 30 days</p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={async () => {
                        if (!analysis || !pricing || pdfLoading) return;
                        setPdfLoading(true);
                        try {
                          await generateRoofReport({
                            customerName: formData.name, email: formData.email, phone: formData.phone,
                            address, coords, analysis, pricing,
                            hasSolarPanels: solarAnswer === "yes" ? true : solarAnswer === "no" ? false : "unknown",
                            solarPanelCount: activePanelCount, couponCode,
                            imageryDate: solarData?.imageryDate ? { month: solarData.imageryDate.month, year: solarData.imageryDate.year } : undefined,
                          });
                        } finally {
                          setPdfLoading(false);
                        }
                      }}
                      disabled={pdfLoading}
                      className="w-full inline-flex items-center justify-center gap-3 bg-navy text-white font-bold text-base py-4 rounded-xl hover:bg-navy-dark transition-colors cta-press cursor-pointer shadow-lg disabled:opacity-70"
                    >
                      {pdfLoading ? (
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      )}
                      {pdfLoading ? "Generating Report..." : "DOWNLOAD ROOF REPORT (PDF)"}
                    </button>
                    <a
                      href="tel:5597976081"
                      className="w-full flex items-center justify-center gap-2 bg-orange text-white font-bold text-base py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press"
                    >
                      Call (559) 797-6081
                    </a>
                  </div>

                  <p className="text-gray-text text-xs text-center mt-5">
                    * Estimate based on satellite data. Final cost from free inspection.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
