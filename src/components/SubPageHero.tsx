"use client";

import Image from "next/image";
import CTAButton from "./CTAButton";

interface SubPageHeroProps {
  image: string;
  imageAlt: string;
  headlineWhite: string;
  headlineOrange: string;
  subtext: string;
  formAnchor?: string;
  breadcrumbs: { label: string; href: string }[];
}

export default function SubPageHero({
  image,
  imageAlt,
  headlineWhite,
  headlineOrange,
  subtext,
  formAnchor = "#estimate",
  breadcrumbs,
}: SubPageHeroProps) {
  return (
    <section className="relative h-[320px] md:h-[360px] flex items-end overflow-hidden">
      <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/75 to-navy-dark/40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-4">
          {breadcrumbs.map((bc, i) => (
            <span key={bc.href} className="flex items-center gap-1.5">
              {i > 0 && <span>/</span>}
              {i < breadcrumbs.length - 1 ? (
                <a href={bc.href} className="hover:text-orange transition-colors">{bc.label}</a>
              ) : (
                <span className="text-white/70">{bc.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
          {headlineWhite} <span className="text-orange">{headlineOrange}</span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg mb-6 max-w-xl">{subtext}</p>
        <div className="flex flex-wrap gap-3">
          <CTAButton href={formAnchor}>Get Free Estimate</CTAButton>
          <CTAButton variant="outline" href="tel:+15592158516">Call (559) 215-8516</CTAButton>
        </div>
      </div>
    </section>
  );
}
