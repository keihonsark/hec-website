"use client";

import { useEffect, useRef } from "react";

interface SatelliteMapProps {
  lat: number;
  lng: number;
}

export default function SatelliteMap({ lat, lng }: SatelliteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !window.google?.maps) return;

    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng });
      return;
    }

    mapRef.current = new window.google.maps.Map(el, {
      center: { lat, lng },
      zoom: 20,
      mapTypeId: "satellite",
      disableDefaultUI: true,
      gestureHandling: "cooperative",
    });
  }, [lat, lng]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
    />
  );
}
