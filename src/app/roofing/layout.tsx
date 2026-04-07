import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Roof $0 Down | Fresno Roofing | Home Energy Construction",
  description:
    "Fresno's trusted roofing contractor. Premium Owens Corning materials, $0 down financing, 228+ 5-star reviews. Free estimates. Call (559) 797-6081.",
};

export default function RoofingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
