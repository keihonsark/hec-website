"use client";

import { useEffect, useRef } from "react";

export default function MobileStickyBar({
  formAnchor = "#estimate",
}: {
  formAnchor?: string;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const bar = barRef.current;
    if (!sentinel || !bar) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.classList.toggle("hidden", entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Place the sentinel just above the form */}
      <div ref={sentinelRef} className="h-1" />
      <div
        ref={barRef}
        className="mobile-cta-bar md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
      >
        <a
          href="tel:5597976081"
          className="flex-1 flex items-center justify-center gap-2 bg-orange text-white py-3 rounded-xl font-bold text-sm cta-press"
        >
          <span>📞</span>
          Call Now
        </a>
        <a
          href={formAnchor}
          className="flex-1 flex items-center justify-center border-2 border-navy bg-white text-navy py-3 rounded-xl font-bold text-sm cta-press"
        >
          Free Estimate
        </a>
      </div>
    </>
  );
}
