import type { PriceEstimate } from "@/lib/pricingEngine";

function formatPrice(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

interface EstimateCardProps {
  estimate: PriceEstimate;
}

const tiers = [
  {
    key: "low" as const,
    label: "Good",
    subtitle: "Standard Shingle",
    monthlyKey: "monthlyLow" as const,
    features: [
      "3-tab shingles",
      "Standard underlayment",
      "10-year workmanship warranty",
    ],
    recommended: false,
  },
  {
    key: "mid" as const,
    label: "Better",
    subtitle: "Owens Corning Duration",
    monthlyKey: "monthlyMid" as const,
    features: [
      "Architectural shingles",
      "Synthetic underlayment",
      "Lifetime manufacturer warranty",
      "Lifetime workmanship warranty",
    ],
    recommended: true,
  },
  {
    key: "high" as const,
    label: "Best",
    subtitle: "Premium / Tile",
    monthlyKey: "monthlyHigh" as const,
    features: [
      "Tile or premium materials",
      "Full system upgrade",
      "Maximum curb appeal",
      "Lifetime warranty",
    ],
    recommended: false,
  },
];

export default function EstimateCard({ estimate }: EstimateCardProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 items-stretch">
      {tiers.map((tier) => (
        <div
          key={tier.key}
          className={`relative bg-navy-light/60 rounded-2xl p-7 flex flex-col ${
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

          <div className="mb-4">
            <div className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">
              {tier.label}
            </div>
            <div className="text-white/50 text-xs">{tier.subtitle}</div>
          </div>

          <div
            className={`text-3xl font-extrabold mb-1 ${
              tier.recommended ? "text-orange" : "text-white"
            }`}
          >
            {formatPrice(estimate[tier.key])}
          </div>
          <div className="text-white/50 text-sm mb-6">
            ~{formatPrice(estimate[tier.monthlyKey])}/mo with $0 down
          </div>

          <ul className="space-y-2.5 flex-1">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                <svg
                  className="w-4 h-4 text-orange flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
