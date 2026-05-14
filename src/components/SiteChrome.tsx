"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CHROMELESS_ROUTES = ["/enroll"];

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const chromeless = CHROMELESS_ROUTES.includes(pathname);

  if (chromeless) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[74px]">{children}</main>
      <Footer />
    </>
  );
}
