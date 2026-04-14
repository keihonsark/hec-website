"use client";

import { useEffect, useState } from "react";
import GoogleG from "./GoogleG";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
  time: number;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    author_name: "Maria Gonzalez",
    rating: 5,
    text: "Home Energy replaced our 30-year-old roof in just two days. The crew was professional, cleaned up everything, and our energy bill dropped $40/month. Worth every penny.",
    relative_time_description: "a month ago",
    time: 0,
  },
  {
    author_name: "James Thompson",
    rating: 5,
    text: "We got quotes from four companies. HEC was the only one that included permits, cleanup, and wood replacement in their price. No surprises. Alex and his team are the real deal.",
    relative_time_description: "2 months ago",
    time: 0,
  },
  {
    author_name: "Robert Kim",
    rating: 5,
    text: "Zero out of pocket with their financing. New Owens Corning roof, they handled our solar panels, and the whole thing was done before we expected. Already referred two neighbors.",
    relative_time_description: "3 months ago",
    time: 0,
  },
  {
    author_name: "Patricia Davis",
    rating: 4,
    text: "Our old roof was leaking every winter. Home Energy came out, gave us an honest assessment, and had a new roof on in 48 hours. Professional from start to finish.",
    relative_time_description: "4 months ago",
    time: 0,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.round(rating) ? "text-[#FFC107]" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function truncate(text: string, max = 180) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "...";
}

export default function GoogleReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      active = false;
    };
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setStart((s) => (s + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(id);
  }, [reviews.length, paused]);

  const visibleCount = 3;
  const visible: (Review & { _key: string })[] = [];
  for (let i = 0; i < visibleCount; i++) {
    const r = reviews[(start + i) % reviews.length];
    visible.push({ ...r, _key: `${start}-${i}-${r.author_name}` });
  }

  const prev = () =>
    setStart((s) => (s - 1 + reviews.length) % reviews.length);
  const next = () => setStart((s) => (s + 1) % reviews.length);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Desktop: 3 cards visible */}
      <div className="hidden md:grid grid-cols-3 gap-5">
        {visible.map((r) => (
          <ReviewCard key={r._key} review={r} />
        ))}
      </div>

      {/* Mobile: 1 card visible */}
      <div className="md:hidden">
        <ReviewCard review={reviews[start % reviews.length]} />
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous review"
        className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-navy hover:text-orange hover:border-orange transition-colors cursor-pointer z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next review"
        className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-navy hover:text-orange hover:border-orange transition-colors cursor-pointer z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-light-bg rounded-2xl p-6 border-l-4 border-l-orange h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <GoogleG className="w-5 h-5" />
        <Stars rating={review.rating} />
      </div>
      <p className="text-gray-text italic text-[15px] leading-relaxed mb-4 flex-1">
        &ldquo;{truncate(review.text)}&rdquo;
      </p>
      <div className="flex items-baseline justify-between">
        <p className="text-navy font-semibold text-sm">— {review.author_name}</p>
        <p className="text-gray-text/60 text-xs">
          Posted on Google · {review.relative_time_description}
        </p>
      </div>
    </div>
  );
}
