"use client";

import { useEffect, useRef, useState } from "react";

interface SatelliteMapProps {
  lat: number;
  lng: number;
}

const MARKER_SVG = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" fill="#F5A623" stroke="#fff" stroke-width="3" />
  <path d="M24 14l8 6v10H16V20l8-6z" fill="#fff"/>
  <rect x="21" y="25" width="6" height="5" rx="0.5" fill="#F5A623"/>
</svg>
`)}`;

export default function SatelliteMap({ lat, lng }: SatelliteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);
  const [isSatellite, setIsSatellite] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !window.google?.maps) return;

    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng });
      if (markerRef.current?.setPosition) {
        markerRef.current.setPosition({ lat, lng });
      }
      return;
    }

    const map = new window.google.maps.Map(el, {
      center: { lat, lng },
      zoom: 20,
      mapTypeId: "satellite",
      disableDefaultUI: true,
      gestureHandling: "cooperative",
    });
    mapRef.current = map;

    // Standard marker with custom orange house icon
    markerRef.current = new google.maps.Marker({
      map,
      position: { lat, lng },
      icon: {
        url: MARKER_SVG,
        scaledSize: new google.maps.Size(48, 48),
        anchor: new google.maps.Point(24, 24),
      },
      title: "Your home",
    });
  }, [lat, lng]);

  useEffect(() => {
    mapRef.current?.setMapTypeId(isSatellite ? "satellite" : "roadmap");
  }, [isSatellite]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      />
      <button
        onClick={() => setIsSatellite((v) => !v)}
        className="absolute top-3 right-3 z-10 bg-navy/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/15 hover:bg-navy transition-colors cursor-pointer"
      >
        {isSatellite ? "Map" : "Satellite"}
      </button>
    </div>
  );
}
