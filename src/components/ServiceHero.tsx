"use client";

import Image from "next/image";
import CTAButton from "./CTAButton";
import GoogleG from "./GoogleG";

interface ServiceHeroProps {
  image: string;
  imageAlt: string;
  headlineWhite: string;
  headlineOrange: string;
  subtext: string;
  formAnchor?: string;
}

export default function ServiceHero({
  image,
  imageAlt,
  headlineWhite,
  headlineOrange,
  subtext,
  formAnchor = "#estimate",
}: ServiceHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/40" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div
          className="hero-glass-float max-w-2xl rounded-3xl p-8 sm:p-10 md:p-12"
          style={{
            background: "rgba(15, 29, 51, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Google review badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
            <GoogleG className="w-5 h-5" />
            <span className="text-orange text-sm font-bold">4.7</span>
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <span className="text-white/70 text-sm">228+ Reviews</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] mb-6">
            {headlineWhite}
            <br />
            <span className="text-orange">{headlineOrange}</span>
          </h1>

          <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            {subtext}
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton href={formAnchor}>Get Free Estimate</CTAButton>
            <CTAButton variant="outline" href="tel:+15592158516">
              Call (559) 215-8516
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
