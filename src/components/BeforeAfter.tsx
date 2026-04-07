interface BeforeAfterProps {
  beforeLabel: string;
  afterLabel: string;
  caption: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function BeforeAfter({
  beforeLabel,
  afterLabel,
  caption,
  beforeImage,
  afterImage,
}: BeforeAfterProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* BEFORE */}
        <div className="relative rounded-xl overflow-hidden">
          {beforeImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={beforeImage}
              alt={`Before - ${caption}`}
              className="w-full h-52 md:h-64 object-cover"
            />
          ) : (
            /* REPLACE: before-after image */
            <div className="w-full h-52 md:h-64 bg-navy-dark flex items-center justify-center text-white/60 text-sm font-medium">
              {beforeLabel}
            </div>
          )}
          <span className="absolute top-3 left-3 bg-navy-dark/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Before
          </span>
        </div>
        {/* AFTER */}
        <div className="relative rounded-xl overflow-hidden">
          {afterImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={afterImage}
              alt={`After - ${caption}`}
              className="w-full h-52 md:h-64 object-cover"
            />
          ) : (
            /* REPLACE: before-after image */
            <div className="w-full h-52 md:h-64 bg-navy-light flex items-center justify-center text-white/60 text-sm font-medium">
              {afterLabel}
            </div>
          )}
          <span className="absolute top-3 left-3 bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
            After
          </span>
        </div>
      </div>
      <p className="text-gray-text text-sm text-center">{caption}</p>
    </div>
  );
}
