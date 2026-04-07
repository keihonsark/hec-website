"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import AddressInput from "@/components/calculator/AddressInput";
import LoadingAnimation from "@/components/calculator/LoadingAnimation";
import SatelliteMap from "@/components/calculator/SatelliteMap";
import RoofAnalysisCard from "@/components/calculator/RoofAnalysis";
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

interface SolarData {
  center: { latitude: number; longitude: number };
  imageryDate?: { year: number; month: number; day: number };
  roofSegmentStats: RoofSegmentInput[];
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

  /* ════════ RESULTS STATE ════════ */
  return (
    <>
      {/* Section A — Satellite Map */}
      <section className="bg-navy-dark pt-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SatelliteMap lat={coords.lat} lng={coords.lng} />
          <div className="text-center mt-4 pb-8">
            <p className="text-white font-semibold text-lg">{address}</p>
            {solarData?.imageryDate && (
              <p className="text-white/40 text-xs mt-1">
                Imagery from {solarData.imageryDate.month}/{solarData.imageryDate.year}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Section B — Roof Analysis */}
      <section className="bg-light-bg py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          {analysis && (
            <RoofAnalysisCard
              analysis={analysis}
              imageryDate={solarData?.imageryDate}
            />
          )}
        </div>
      </section>

      {/* Section C — Cost Estimate */}
      <section className="relative bg-navy noise-overlay py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Your Estimate</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Estimated Roofing Cost
            </h2>
          </div>

          {pricing && <EstimateCard estimate={pricing} />}

          <p className="text-white/40 text-xs text-center mt-8 max-w-2xl mx-auto">
            * Estimates based on satellite roof measurements. Actual cost
            determined by free in-person inspection. Pricing includes
            materials, labor, permits, and cleanup.
          </p>
        </div>
      </section>

      {/* Section D — Materials Breakdown */}
      {analysis && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <SectionLabel>Details</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
                Materials Estimate
              </h2>
              <p className="text-gray-text text-sm mt-2">
                Based on Owens Corning Duration architectural shingles
              </p>
            </div>

            {/* Roof measurements */}
            <h4 className="text-navy font-bold text-sm uppercase tracking-wider mb-3">
              Roof Measurements
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                { label: "Roofing squares (before waste)", value: `${analysis.roofingSquares} sq` },
                { label: `Waste factor — ${analysis.complexity} roof`, value: `${Math.round(analysis.wasteFactor * 100)}%` },
                { label: "Total squares with waste", value: `${analysis.totalSquaresWithWaste} sq` },
                { label: "Ridge", value: `${analysis.estimatedRidgeFt} lin ft` },
                ...(analysis.estimatedHipFt > 0 ? [{ label: "Hip", value: `${analysis.estimatedHipFt} lin ft` }] : []),
                ...(analysis.estimatedValleyFt > 0 ? [{ label: "Valley", value: `${analysis.estimatedValleyFt} lin ft` }] : []),
                { label: "Eave", value: `${analysis.estimatedEaveFt} lin ft` },
                { label: "Rake", value: `${analysis.estimatedRakeFt} lin ft` },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 px-4 bg-light-bg rounded-xl">
                  <span className="text-gray-text text-sm">{item.label}</span>
                  <span className="text-navy font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Material quantities */}
            <h4 className="text-navy font-bold text-sm uppercase tracking-wider mb-3">
              Estimated Material Quantities
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Shingle bundles (OC Duration)", value: `${analysis.shingleBundles} bundles`, note: "3 bundles/square" },
                { label: "Starter strip bundles", value: `${analysis.starterStripBundles} bundles`, note: "105 ft/bundle" },
                { label: "Hip & ridge cap bundles", value: `${analysis.hipRidgeBundles} bundles`, note: "20 ft/bundle" },
                { label: "Synthetic underlayment rolls", value: `${analysis.underlaymentRolls} rolls`, note: "~1,000 sq ft/roll" },
                { label: "Drip edge sections", value: `${analysis.dripEdgeSections} pcs`, note: "10 ft sections" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 px-4 bg-light-bg rounded-xl">
                  <div>
                    <span className="text-gray-text text-sm">{item.label}</span>
                    <span className="text-gray-text/50 text-xs ml-1.5">({item.note})</span>
                  </div>
                  <span className="text-navy font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section E — Lead Capture */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-orange to-orange-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark mb-3">
            Want Your Detailed Roof Report?
          </h2>
          <p className="text-navy-dark/70 text-lg mb-8 max-w-xl mx-auto">
            Get a PDF with your complete roof analysis, material
            recommendations, and financing options — plus $500 off your
            project.
          </p>

          <form
            className="max-w-lg mx-auto grid sm:grid-cols-2 gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-5 py-3.5 rounded-xl border border-navy-dark/20 text-navy placeholder:text-navy-dark/40 focus:outline-none focus:ring-2 focus:ring-navy/40 bg-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3.5 rounded-xl border border-navy-dark/20 text-navy placeholder:text-navy-dark/40 focus:outline-none focus:ring-2 focus:ring-navy/40 bg-white"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="sm:col-span-2 w-full px-5 py-3.5 rounded-xl border border-navy-dark/20 text-navy placeholder:text-navy-dark/40 focus:outline-none focus:ring-2 focus:ring-navy/40 bg-white"
            />
            <button
              type="submit"
              className="sm:col-span-2 w-full bg-navy-dark text-white font-bold text-lg py-4 rounded-xl hover:bg-navy transition-colors cta-press cursor-pointer"
            >
              DOWNLOAD REPORT + GET $500 OFF →
            </button>
          </form>
          <p className="text-navy-dark/50 text-sm mt-4">
            We&apos;ll also call you within 1 hour to schedule your free
            inspection.
          </p>
        </div>
      </section>

      {/* Section F — CTA */}
      <section className="relative py-20 md:py-28 bg-navy-dark noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready for Your Free Inspection?
          </h2>
          <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto">
            Your roof analysis is complete. The next step is a free in-person
            inspection to confirm measurements and provide your exact quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="tel:5597976081">
              Call (559) 797-6081
            </CTAButton>
            <CTAButton variant="outline" href="#estimate-form">
              Schedule Inspection
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
