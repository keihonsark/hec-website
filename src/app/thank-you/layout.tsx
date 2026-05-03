import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Home Energy Construction",
  description: "Your request has been received. We'll be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
