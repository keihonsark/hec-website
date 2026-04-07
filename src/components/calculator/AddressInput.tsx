"use client";

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    google?: typeof google;
    initGooglePlaces?: () => void;
  }
}

interface AddressInputProps {
  onSelect: (result: { lat: number; lng: number; address: string }) => void;
  loading?: boolean;
}

export default function AddressInput({ onSelect, loading }: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [ready, setReady] = useState(false);
  const [address, setAddress] = useState("");
  const selectedRef = useRef<{ lat: number; lng: number; address: string } | null>(null);

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps?.places) {
      setReady(true);
      return;
    }

    window.initGooglePlaces = () => setReady(true);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCE6KM3DxgCo3eEEQm7JPgBqa1bvdmjLq8&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete window.initGooglePlaces;
    };
  }, []);

  // Init autocomplete
  useEffect(() => {
    if (!ready || !inputRef.current || autocompleteRef.current) return;

    const ac = new window.google!.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "us" },
      types: ["address"],
      fields: ["geometry", "formatted_address"],
    });

    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (place.geometry?.location && place.formatted_address) {
        const result = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
        };
        selectedRef.current = result;
        setAddress(place.formatted_address);
      }
    });

    autocompleteRef.current = ac;
  }, [ready]);

  const handleSubmit = useCallback(() => {
    if (selectedRef.current) {
      onSelect(selectedRef.current);
    }
  }, [onSelect]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your home address..."
            className="w-full h-14 px-5 pr-10 rounded-xl border-2 border-white/20 bg-white text-navy text-base placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition shadow-lg"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text/40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !address}
          className="h-14 px-8 rounded-xl bg-orange text-white font-bold text-base hover:bg-orange-dark transition-colors cta-press shadow-lg shadow-orange/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        >
          {loading ? "Analyzing..." : "ANALYZE MY ROOF →"}
        </button>
      </div>
      <p className="text-white/40 text-xs mt-3 text-center">
        Powered by Google Maps
      </p>
    </div>
  );
}
