"use client";

import { useState } from "react";
import type { RoofAnalysis as RoofAnalysisType } from "@/lib/pricingEngine";

interface RoofAnalysisProps {
  analysis: RoofAnalysisType;
  imageryDate?: { year: number; month: number; day: number };
}

export default function RoofAnalysis({
  analysis,
  imageryDate,
}: RoofAnalysisProps) {
  const [expanded, setExpanded] = useState(false);

  const imageryLabel = imageryDate
    ? `${imageryDate.month}/${imageryDate.year}`
    : null;

  const stats = [
    {
      label: "Total Roof Area",
      value: `${analysis.totalRoofAreaSqFt.toLocaleString()} sq ft`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      label: "Roof Segments",
      value: `${analysis.segmentCount} faces`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0L12 17.25 6.429 14.25m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
        </svg>
      ),
    },
    {
      label: "Primary Pitch",
      value: analysis.averagePitchRatio,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
        </svg>
      ),
    },
    {
      label: "Complexity",
      value: analysis.complexity,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-navy">Your Roof Analysis</h3>
        {imageryLabel && (
          <span className="text-gray-text text-xs">
            Imagery from {imageryLabel}
          </span>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-light-bg rounded-xl p-4 text-center"
          >
            <div className="text-orange mx-auto mb-2 flex justify-center">
              {s.icon}
            </div>
            <div className="text-navy font-extrabold text-lg">{s.value}</div>
            <div className="text-gray-text text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Segment breakdown */}
      {analysis.segments.length > 0 && (
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange transition-colors cursor-pointer"
          >
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            Roof Segment Breakdown ({analysis.segmentCount} segments)
          </button>

          {expanded && (
            <div className="mt-4 space-y-2">
              {analysis.segments.map((seg, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 px-3 bg-light-bg rounded-lg text-sm"
                >
                  <span className="font-medium text-navy">
                    Segment {i + 1}
                  </span>
                  <span className="text-gray-text">
                    {seg.areaSqFt.toLocaleString()} sq ft
                  </span>
                  <span className="text-gray-text">{seg.pitchRatio}</span>
                  <span className="text-gray-text">{seg.direction}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
