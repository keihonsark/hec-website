"use client";

import { useEffect, useState } from "react";

const steps = [
  "Locating your property...",
  "Scanning roof with satellite data...",
  "Measuring roof segments...",
  "Calculating your estimate...",
];

interface LoadingAnimationProps {
  address: string;
  lat: number;
  lng: number;
}

export default function LoadingAnimation({
  address,
  lat,
  lng,
}: LoadingAnimationProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const durations = [1500, 2000, 1500, 1500];
    let timeout: NodeJS.Timeout;
    let current = 0;

    const advance = () => {
      current++;
      if (current < steps.length) {
        setStepIndex(current);
        timeout = setTimeout(advance, durations[current]);
      }
    };

    timeout = setTimeout(advance, durations[0]);
    return () => clearTimeout(timeout);
  }, []);

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=19&size=600x400&maptype=satellite&key=AIzaSyCE6KM3DxgCo3eEEQm7JPgBqa1bvdmjLq8`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-navy-dark">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Satellite map with scanning effect */}
        <div className="relative w-full max-w-md mx-auto aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-2xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapUrl}
            alt={`Satellite view of ${address}`}
            className="w-full h-full object-cover"
          />
          {/* Scanning line animation */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, transparent 45%, rgba(245,166,35,0.3) 50%, transparent 55%, transparent 100%)",
              animation: "scanLine 2s ease-in-out infinite",
            }}
          />
          {/* Orange border pulse */}
          <div className="absolute inset-0 border-2 border-orange/40 rounded-2xl animate-pulse" />
        </div>

        {/* Loading text */}
        <div className="h-8 flex items-center justify-center">
          <p
            key={stepIndex}
            className="text-white text-lg font-medium animate-pulse"
          >
            {steps[stepIndex]}
          </p>
        </div>

        <p className="text-white/40 text-sm mt-4">{address}</p>

        {/* Inline keyframe for scan line */}
        <style>{`
          @keyframes scanLine {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
        `}</style>
      </div>
    </div>
  );
}
