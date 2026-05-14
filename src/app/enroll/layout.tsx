import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Enrollment — HEC Internal",
  robots: { index: false, follow: false },
};

export default function EnrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
