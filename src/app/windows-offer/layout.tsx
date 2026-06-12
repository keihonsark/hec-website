import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy 5 Windows, Get the 6th Free | Home Energy Construction Fresno",
  description:
    "Anlin replacement windows. Buy 5 windows, get the 6th free this June, with $0 down financing. Serving Fresno, Visalia, Hanford, Clovis & Sacramento. Free quote — call (559) 272-3992.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WindowsOfferLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide the global Footer for this paid-traffic landing page */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "body:has(#windows-offer-root) > footer{display:none!important}",
        }}
      />
      <div id="windows-offer-root">
        {children}
        <footer className="bg-[#0F1D33] text-white py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
              <span className="text-white/70">
                © 2026 Home Energy Construction · CA License #1086515
              </span>
              <span className="text-white/70">
                <a href="tel:+15592723992" className="hover:text-orange transition-colors">
                  (559) 272-3992
                </a>
              </span>
            </div>
            <div className="mt-3 text-center text-white/40 text-xs">
              Powered by{" "}
              <a
                href="https://sark.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-orange transition-colors"
              >
                SARK Agency
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
