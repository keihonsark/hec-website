import GoogleG from "./icons/GoogleG";

interface ReviewCardProps {
  text: string;
  name: string;
  city: string;
  service?: string;
  /** When true, the card sizes for a grid layout instead of a fixed-width carousel slot */
  grid?: boolean;
}

function Stars() {
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-orange"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({
  text,
  name,
  city,
  service,
  grid = false,
}: ReviewCardProps) {
  const sizing = grid
    ? "w-full"
    : "min-w-[320px] max-w-[380px] flex-shrink-0";
  return (
    <div
      className={`relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 border-l-4 border-l-orange overflow-hidden ${sizing}`}
    >
      {/* Decorative quotation mark */}
      <span className="absolute top-3 right-14 text-orange/[0.07] text-[80px] font-serif leading-none pointer-events-none select-none">
        &ldquo;
      </span>
      {/* Google G — top right corner, signals verified Google source */}
      <span className="absolute top-4 right-4">
        <GoogleG className="w-5 h-5" />
      </span>

      {service && (
        <span className="inline-block bg-navy text-white text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-3">
          {service}
        </span>
      )}
      <Stars />
      <p className="relative text-gray-text italic text-[15px] leading-relaxed mb-5">
        &ldquo;{text}&rdquo;
      </p>
      <p className="text-navy font-semibold text-sm">
        — {name}, {city}
      </p>
      <p className="flex items-center gap-1.5 text-gray-500 text-xs mt-2">
        <span>Posted on Google</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </p>
    </div>
  );
}
