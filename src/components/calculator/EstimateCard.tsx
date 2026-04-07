import type { PriceEstimate } from "@/lib/pricingEngine";

function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

interface EstimateCardProps {
  estimate: PriceEstimate;
  solarPanelCount?: number;
}

const tiers = [
  {
    key: "low" as const,
    label: "Good",
    subtitle: "Standard Shingle",
    totalKey: "totalLow" as const,
    totalMonthlyKey: "totalMonthlyLow" as const,
    recommended: false,
  },
  {
    key: "mid" as const,
    label: "Better",
    subtitle: "Owens Corning Duration",
    totalKey: "totalMid" as const,
    totalMonthlyKey: "totalMonthlyMid" as const,
    recommended: true,
  },
  {
    key: "high" as const,
    label: "Best",
    subtitle: "Premium / Tile",
    totalKey: "totalHigh" as const,
    totalMonthlyKey: "totalMonthlyHigh" as const,
    recommended: false,
  },
];

export default function EstimateCard({
  estimate,
  solarPanelCount = 0,
}: EstimateCardProps) {
  const hasSolar = solarPanelCount > 0 && estimate.solarCost > 0;

  return (
    <div className="grid md:grid-cols-3 gap-6 items-stretch">
      {tiers.map((tier) => (
        <div
          key={tier.key}
          className={`relative bg-navy-light/60 rounded-2xl p-7 flex flex-col items-center text-center ${
            tier.recommended
              ? "ring-2 ring-orange md:scale-[1.03] shadow-xl shadow-orange/10"
              : "border border-white/10"
          }`}
        >
          {tier.recommended && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
              Recommended
            </span>
          )}

          <div className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1 mt-1">
            {tier.label}
          </div>
          <div className="text-white/40 text-xs mb-5">{tier.subtitle}</div>

          {hasSolar ? (
            <>
              <div className="text-white/70 text-sm mb-1">
                Roof: {fmt(estimate[tier.key])}
              </div>
              <div className="text-white/70 text-sm mb-2">
                Solar R&R ({solarPanelCount} panels): {fmt(estimate.solarCost)}
              </div>
              <div className="w-12 h-px bg-white/20 mb-2" />
              <div
                className={`text-3xl font-extrabold mb-1 ${
                  tier.recommended ? "text-orange" : "text-white"
                }`}
              >
                {fmt(estimate[tier.totalKey])}
              </div>
              <div className="text-white/50 text-sm">
                ~{fmt(estimate[tier.totalMonthlyKey])}/mo with $0 down
              </div>
            </>
          ) : (
            <>
              <div
                className={`text-3xl font-extrabold mb-1 ${
                  tier.recommended ? "text-orange" : "text-white"
                }`}
              >
                {fmt(estimate[tier.totalKey])}
              </div>
              <div className="text-white/50 text-sm">
                ~{fmt(estimate[tier.totalMonthlyKey])}/mo with $0 down
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
