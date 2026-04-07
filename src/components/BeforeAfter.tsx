"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterProps {
  beforeLabel: string;
  afterLabel: string;
  caption: string;
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfter({
  caption,
  beforeImage,
  afterImage,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setPosition(pct);
    },
    []
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updatePosition]);

  return (
    <div>
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden h-52 md:h-64 select-none cursor-col-resize"
        onMouseDown={(e) => {
          setDragging(true);
          updatePosition(e.clientX);
        }}
        onTouchStart={(e) => {
          setDragging(true);
          updatePosition(e.touches[0].clientX);
        }}
      >
        {/* BEFORE — full background */}
        <Image
          src={beforeImage}
          alt={`Before - ${caption}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover pointer-events-none"
          draggable={false}
        />
        <span className="absolute top-3 left-3 bg-navy-dark/80 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          Before
        </span>

        {/* AFTER — clipped overlay */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src={afterImage}
            alt={`After - ${caption}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover pointer-events-none"
            draggable={false}
          />
          {/* After label */}
          <div className="absolute top-3 right-3 z-10">
            <div className="w-6 h-[3px] bg-orange rounded-full mb-1" />
            <span className="bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
              After
            </span>
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="absolute inset-y-0 z-20 flex flex-col items-center justify-center"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-[3px] h-full bg-white/90" />
          <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-orange flex items-center justify-center">
            <svg
              className="w-5 h-5 text-orange"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7M9 19l7-7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-gray-text text-sm text-center mt-3">{caption}</p>
    </div>
  );
}
