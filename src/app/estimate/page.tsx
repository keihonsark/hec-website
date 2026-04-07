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
  type RoofAnalysis,
  type PriceEstimate,
  type RoofSegmentInput,
} from "@/lib/pricingEngine";

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
   RESULTS FUNNEL — Teaser → Gate → Full
   ───────────────────────────────────────── */
function ResultsFunnel({
  address,
  coords,
  analysis,
  pricing,
  solarData,
}: {
  address: string;
  coords: { lat: number; lng: number };
  analysis: RoofAnalysis | null;
  pricing: PriceEstimate | null;
  solarData: SolarData | null;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const fullResultsRef = useRef<HTMLDivElement>(null);

  /* Store detailed data for CRM / PDF */
  if (typeof window !== "undefined" && analysis && pricing) {
    try {
      localStorage.setItem(
        "hec_roof_report",
        JSON.stringify({ address, coords, analysis, pricing, solarData })
      );
    } catch {
      /* localStorage may be unavailable */
    }
  }

  const handleGateSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.phone || !formData.email) return;

      setSubmitting(true);
      const code = `HEC-${Math.floor(1000 + Math.random() * 9000)}`;

      // Build lead data object
      const leadData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address,
        roofAreaSqFt: analysis?.totalRoofAreaSqFt ?? 0,
        roofSegments: analysis?.segmentCount ?? 0,
        primaryPitch: analysis?.averagePitchRatio ?? "",
        complexity: analysis?.complexity ?? "",
        estimateLow: pricing?.low ?? 0,
        estimateMid: pricing?.mid ?? 0,
        estimateHigh: pricing?.high ?? 0,
        couponCode: code,
        timestamp: new Date().toISOString(),
        source: "roof_calculator",
      };

      console.log("Lead captured:", leadData);

      setTimeout(() => {
        setCouponCode(code);
        setUnlocked(true);
        setSubmitting(false);

        // Scroll to full results after reveal
        setTimeout(() => {
          fullResultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }, 1000);
    },
    [formData, address, analysis, pricing]
  );

  const inputClass =
    "w-full px-5 py-3.5 rounded-xl border border-gray-200 text-navy placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition bg-white";

  return (
    <>
      {/* ═══ Satellite Map ═══ */}
      <section className="bg-navy-dark pt-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SatelliteMap lat={coords.lat} lng={coords.lng} />
          <div className="text-center mt-4 pb-6">
            <p className="text-white font-semibold text-lg">{address}</p>
            {analysis && (
              <p className="text-white/50 text-sm mt-2">
                {analysis.segmentCount} roof segments detected
                {solarData?.imageryDate
                  ? ` · Satellite imagery from ${solarData.imageryDate.month}/${solarData.imageryDate.year}`
                  : ""}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ Teaser: "We Found Your Roof!" ═══ */}
      {analysis && (
        <section className="relative bg-navy noise-overlay py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 fade-in-section visible">
              We Found Your Roof!
            </h2>
            <div className="text-orange text-6xl sm:text-7xl lg:text-[80px] font-extrabold leading-none mb-4 fade-in-section visible">
              {analysis.totalRoofAreaSqFt.toLocaleString()}
              <span className="text-3xl sm:text-4xl text-white/60 ml-2">
                sq ft
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/60 text-sm">
              <span>
                Roof Type:{" "}
                <strong className="text-white">{analysis.complexity}</strong>
              </span>
              <span>
                Primary Pitch:{" "}
                <strong className="text-white">
                  {analysis.averagePitchRatio}
                </strong>
              </span>
            </div>
            <p className="text-white/40 text-xs mt-4">
              Based on satellite analysis of your property
            </p>
          </div>
        </section>
      )}

      {/* ═══ GATE — shown when NOT unlocked ═══ */}
      {!unlocked && (
        <section className="relative bg-light-bg py-16 md:py-24 overflow-hidden">
          {/* Blurred fake pricing preview */}
          <div className="absolute inset-0 flex items-start justify-center pt-32 pointer-events-none select-none" aria-hidden="true">
            <div className="w-full max-w-5xl px-4 grid md:grid-cols-3 gap-6" style={{ filter: "blur(8px)" }}>
              {["Good", "Better", "Best"].map((tier) => (
                <div key={tier} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-gray-300 text-sm font-bold uppercase mb-2">{tier}</div>
                  <div className="text-navy text-3xl font-extrabold mb-1">$XX,XXX</div>
                  <div className="text-gray-300 text-sm">~$XXX/mo with $0 down</div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gate overlay */}
          <div className="relative z-10 max-w-lg mx-auto px-4 text-center">
            {/* Lock icon */}
            <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center text-orange mx-auto mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-3">
              Unlock Your Cost Estimate + Get $500 Off
            </h2>
            <p className="text-gray-text text-[15px] mb-8">
              Enter your info to see personalized pricing, monthly payments,
              and download your free roof report.
            </p>

            {/* Form card */}
            <form
              onSubmit={handleGateSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl text-left"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, name: e.target.value }))
                  }
                  className={inputClass}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, phone: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, email: e.target.value }))
                }
                className={`${inputClass} mb-5`}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-dark transition-colors cta-press shadow-lg shadow-orange/20 cursor-pointer disabled:opacity-70"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Unlocking...
                  </span>
                ) : (
                  "UNLOCK MY ESTIMATE →"
                )}
              </button>
              <p className="text-gray-text text-xs text-center mt-4 flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Your info is safe. No spam. We&apos;ll call within 1 hour.
              </p>
            </form>
          </div>
        </section>
      )}

      {/* ═══ FULL RESULTS — shown after unlock ═══ */}
      {unlocked && pricing && analysis && (
        <div ref={fullResultsRef}>
          {/* Cost Estimate */}
          <section className="relative bg-navy-dark noise-overlay py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <SectionLabel>Your Estimate</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Estimated Roofing Cost
                </h2>
              </div>

              <EstimateCard estimate={pricing} />

              <p className="text-white/40 text-xs text-center mt-8 max-w-2xl mx-auto">
                * Estimate based on satellite data. Final cost determined by
                free in-person inspection.
              </p>
            </div>
          </section>

          {/* $500 Off Coupon */}
          <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-orange to-orange-dark">
            <div className="max-w-xl mx-auto px-4 text-center">
              <h3 className="text-2xl font-extrabold text-navy-dark mb-4">
                Your $500 Off Coupon
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-xl mb-4">
                <div className="text-navy text-3xl sm:text-4xl font-extrabold tracking-wider font-mono mb-2">
                  {couponCode}
                </div>
                <p className="text-gray-text text-sm">
                  Show this code to your estimator or mention it when you call
                </p>
                <p className="text-gray-text/60 text-xs mt-1">
                  Valid for 30 days
                </p>
              </div>
            </div>
          </section>

          {/* Download PDF (placeholder) */}
          <section className="bg-white py-12 md:py-16">
            <div className="max-w-xl mx-auto px-4 text-center">
              <button
                onClick={() =>
                  alert(
                    "PDF report generation coming soon! We'll email your report within 24 hours."
                  )
                }
                className="inline-flex items-center gap-3 bg-navy text-white font-bold text-base px-8 py-4 rounded-xl hover:bg-navy-dark transition-colors cta-press cursor-pointer shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                DOWNLOAD ROOF REPORT (PDF)
              </button>
            </div>
          </section>

          {/* CTA */}
          <section className="relative py-20 md:py-28 bg-navy-dark noise-overlay">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready for Your Free Inspection?
              </h2>
              <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto">
                Your satellite estimate shows{" "}
                {analysis.totalRoofAreaSqFt.toLocaleString()} sq ft of roof
                area. The next step is a free in-person inspection for exact
                measurements and your final quote.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href="tel:5597976081">
                  Call (559) 797-6081
                </CTAButton>
                <CTAButton variant="outline" href="tel:5597976081">
                  Schedule Inspection
                </CTAButton>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
