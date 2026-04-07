"use client";

import { useEffect, useRef, useState } from "react";

export interface MapSegment {
  areaMeters2: number;
  azimuthDegrees: number;
  pitchDegrees: number;
  center?: { latitude: number; longitude: number } | null;
  boundingBox?: {
    sw: { latitude: number; longitude: number };
    ne: { latitude: number; longitude: number };
  } | null;
  areaSqFt: number;
  pitchRatio: string;
  direction: string;
}

function directionColor(azimuth: number): string {
  const a = ((azimuth % 360) + 360) % 360;
  if (a >= 315 || a < 45) return "#3B82F6";
  if (a >= 45 && a < 135) return "#F59E0B";
  if (a >= 135 && a < 225) return "#EF4444";
  return "#F97316";
}

interface SatelliteMapProps {
  lat: number;
  lng: number;
  segments?: MapSegment[];
}

export default function SatelliteMap({ lat, lng, segments }: SatelliteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const polysRef = useRef<google.maps.Polygon[]>([]);
  const labelsRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoRef = useRef<google.maps.InfoWindow | null>(null);
  const [visible, setVisible] = useState(true);

  // Init map
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
      mapId: "roof-analysis",
    });
  }, [lat, lng]);

  // Draw segments
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !segments?.length) return;

    // Clean previous
    polysRef.current.forEach((p) => p.setMap(null));
    polysRef.current = [];
    labelsRef.current.forEach((m) => (m.map = null));
    labelsRef.current = [];
    infoRef.current?.close();

    const info = new google.maps.InfoWindow();
    infoRef.current = info;
    const bounds = new google.maps.LatLngBounds();

    segments.forEach((seg, i) => {
      if (!seg.boundingBox) return;

      const sw = seg.boundingBox.sw;
      const ne = seg.boundingBox.ne;
      const color = directionColor(seg.azimuthDegrees);

      const path = [
        { lat: sw.latitude, lng: sw.longitude },
        { lat: sw.latitude, lng: ne.longitude },
        { lat: ne.latitude, lng: ne.longitude },
        { lat: ne.latitude, lng: sw.longitude },
      ];

      path.forEach((p) => bounds.extend(p));

      const poly = new google.maps.Polygon({
        paths: path,
        fillColor: color,
        fillOpacity: 0.35,
        strokeColor: "#F5A623",
        strokeWeight: 2,
        strokeOpacity: 0.8,
        map: visible ? map : null,
      });

      poly.addListener("mouseover", () => {
        poly.setOptions({ fillOpacity: 0.6 });
      });

      poly.addListener("mouseout", () => {
        poly.setOptions({ fillOpacity: 0.35 });
        info.close();
      });

      poly.addListener("click", () => {
        const center = seg.center
          ? { lat: seg.center.latitude, lng: seg.center.longitude }
          : {
              lat: (sw.latitude + ne.latitude) / 2,
              lng: (sw.longitude + ne.longitude) / 2,
            };

        info.setContent(
          `<div style="font-family:system-ui;font-size:13px;line-height:1.5;color:#1B2D4F;min-width:140px">
            <strong>Segment ${i + 1}</strong><br/>
            Area: ${seg.areaSqFt.toLocaleString()} sq ft<br/>
            Pitch: ${seg.pitchRatio}<br/>
            ${seg.direction}
          </div>`
        );
        info.setPosition(center);
        info.open(map);
      });

      polysRef.current.push(poly);

      // Label for segments > 100 sq ft
      if (seg.areaSqFt > 100 && seg.center) {
        const labelEl = document.createElement("div");
        labelEl.style.cssText =
          "background:rgba(15,29,51,0.85);color:#fff;font-size:11px;font-weight:600;padding:2px 6px;border-radius:8px;white-space:nowrap;pointer-events:none";
        labelEl.textContent = `${seg.areaSqFt.toLocaleString()} sf`;

        if (google.maps.marker?.AdvancedMarkerElement) {
          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: visible ? map : null,
            position: { lat: seg.center.latitude, lng: seg.center.longitude },
            content: labelEl,
          });
          labelsRef.current.push(marker);
        }
      }
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, 60);
    }
  }, [segments, visible]);

  // Toggle visibility
  useEffect(() => {
    const map = visible ? mapRef.current : null;
    polysRef.current.forEach((p) => p.setMap(map));
    labelsRef.current.forEach((m) => (m.map = map));
    if (!visible) infoRef.current?.close();
  }, [visible]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      />

      {/* Toggle button */}
      {segments && segments.length > 0 && (
        <button
          onClick={() => setVisible((v) => !v)}
          className="absolute top-3 right-3 z-10 bg-navy/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/15 hover:bg-navy transition-colors cursor-pointer"
        >
          {visible ? "Hide Segments" : "Show Segments"}
        </button>
      )}

      {/* Legend */}
      {visible && segments && segments.length > 0 && (
        <div className="absolute bottom-3 left-3 z-10 bg-navy-dark/85 backdrop-blur-sm text-white text-[11px] rounded-xl px-3 py-2.5 border border-white/10 leading-relaxed">
          <div className="font-semibold text-white/80 mb-1">Segments by Direction</div>
          <div className="flex flex-col gap-0.5">
            <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5" style={{ background: "#3B82F6" }} />North</span>
            <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5" style={{ background: "#F59E0B" }} />East</span>
            <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5" style={{ background: "#EF4444" }} />South</span>
            <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5" style={{ background: "#F97316" }} />West</span>
          </div>
        </div>
      )}
    </div>
  );
}
