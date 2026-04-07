import Image from "next/image";
import GoogleG from "./GoogleG";

export default function TrustStrip() {
  return (
    <section className="bg-white py-6 border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-10">
          <Image
            src="/images/logos/owens-preferred-logo.png"
            alt="Owens Corning Preferred Contractor"
            width={180}
            height={55}
            className="h-[50px] md:h-[55px] w-auto"
          />
          <div className="hidden sm:block w-px h-10 bg-gray-200 flex-shrink-0" />
          <Image
            src="/images/logos/bbb-logo.png"
            alt="BBB A+ Accredited Business"
            width={180}
            height={55}
            className="h-[50px] md:h-[55px] w-auto"
          />
          <div className="hidden sm:block w-px h-10 bg-gray-200 flex-shrink-0" />
          <Image
            src="/images/logos/anlin-logo.png"
            alt="Anlin Certified Partner"
            width={180}
            height={55}
            className="h-[50px] md:h-[55px] w-auto"
          />
          <div className="hidden sm:block w-px h-10 bg-gray-200 flex-shrink-0" />
          <div className="flex items-center gap-2">
            <svg className="w-7 h-7 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <div className="leading-tight">
              <div className="text-navy text-sm font-bold">CA Licensed</div>
              <div className="text-gray-text text-xs">#1086515</div>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-gray-200 flex-shrink-0" />
          <div className="flex items-center gap-2">
            <GoogleG className="w-6 h-6" />
            <span className="text-navy font-bold text-base">4.7</span>
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <span className="text-gray-text text-sm">228+</span>
          </div>
        </div>
      </div>
    </section>
  );
}
