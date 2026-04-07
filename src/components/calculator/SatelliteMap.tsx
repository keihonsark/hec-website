"use client";

import { useEffect, useRef, useState } from "react";

interface SatelliteMapProps {
  lat: number;
  lng: number;
}

export default function SatelliteMap({ lat, lng }: SatelliteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [isSatellite, setIsSatellite] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !window.google?.maps) return;

    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng });
      return;
    }

    const map = new window.google.maps.Map(el, {
      center: { lat, lng },
      zoom: 20,
      mapTypeId: "satellite",
      disableDefaultUI: true,
      gestureHandling: "cooperative",
      mapId: "roof-analysis",
    });
    mapRef.current = map;

    // Pulsing marker
    const pin = document.createElement("div");
    pin.innerHTML = `
      <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center">
        <div style="position:absolute;inset:0;border-radius:50%;background:rgba(245,166,35,0.25);animation:markerPulse 2s ease-out infinite"></div>
        <div style="width:16px;height:16px;border-radius:50%;background:#F5A623;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);position:relative;z-index:1"></div>
      </div>
    `;

    if (google.maps.marker?.AdvancedMarkerElement) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat, lng },
        content: pin,
      });
    }
  }, [lat, lng]);

  // Toggle map type
  useEffect(() => {
    mapRef.current?.setMapTypeId(isSatellite ? "satellite" : "roadmap");
  }, [isSatellite]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      />

      {/* Map type toggle */}
      <button
        onClick={() => setIsSatellite((v) => !v)}
        className="absolute top-3 right-3 z-10 bg-navy/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/15 hover:bg-navy transition-colors cursor-pointer"
      >
        {isSatellite ? "Map" : "Satellite"}
      </button>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes markerPulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
