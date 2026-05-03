import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Save $500 on New Windows | Home Energy Construction Fresno",
  description:
    "Anlin-certified replacement windows. $500 off limited time. Serving Fresno, Clovis, Visalia, Madera and Central Valley. Free quote — call (559) 272-3992.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WindowsOfferLayout({ children }: { children: React.ReactNode }) {
  return children;
}
