import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patio Covers & Outdoor Living Fresno | Home Energy Construction",
  description:
    "Custom patios, pergolas, and gazebos for Central Valley homes. Transform your backyard. Free estimates. Call (559) 215-8516.",
};

export default function OutdoorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
