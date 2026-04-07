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
  return (
    <div>
      <div className="relative grid grid-cols-2 mb-3">
        {/* BEFORE */}
        <div className="relative rounded-l-xl overflow-hidden h-52 md:h-64">
          <Image
            src={beforeImage}
            alt={`Before - ${caption}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          <span className="absolute top-3 left-3 bg-navy-dark/80 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            Before
          </span>
        </div>
        {/* AFTER */}
        <div className="relative rounded-r-xl overflow-hidden h-52 md:h-64">
          <Image
            src={afterImage}
            alt={`After - ${caption}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          {/* Orange accent line on After label */}
          <div className="absolute top-3 left-3 z-10">
            <div className="w-6 h-[3px] bg-orange rounded-full mb-1" />
            <span className="bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
              After
            </span>
          </div>
        </div>

        {/* Slider / drag handle (visual only) */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-[3px] h-full bg-white/80" />
          <div className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border-2 border-orange flex items-center justify-center">
            <svg className="w-4 h-4 text-orange" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M8 15l4 4 4-4" />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-gray-text text-sm text-center">{caption}</p>
    </div>
  );
}
