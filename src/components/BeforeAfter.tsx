import Image from "next/image";

interface BeforeAfterProps {
  beforeLabel: string;
  afterLabel: string;
  caption: string;
  beforeImage: string;
  afterImage: string;
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
        <div className="relative rounded-xl overflow-hidden h-52 md:h-64">
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
        <div className="relative rounded-xl overflow-hidden h-52 md:h-64">
          <Image
            src={afterImage}
            alt={`After - ${caption}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          <span className="absolute top-3 left-3 bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            After
          </span>
        </div>
      </div>
      <p className="text-gray-text text-sm text-center">{caption}</p>
    </div>
  );
}
