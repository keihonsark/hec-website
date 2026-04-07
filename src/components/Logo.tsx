export default function Logo({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const textColor = dark ? "text-navy" : "text-white";
  const subColor = dark ? "text-gray-text" : "text-white/70";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Lightning bolt icon */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M20.5 3L8 20h9l-2 13L28 16h-9l1.5-13z"
          fill="#F5A623"
          stroke="#F5A623"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="leading-none">
        <div className="flex items-baseline gap-0">
          <span className={`${textColor} font-extrabold text-xl tracking-tight`}>
            HOME
          </span>
          <span className="text-orange font-extrabold text-xl tracking-tight ml-1">
            ENERGY
          </span>
        </div>
        <span className={`${subColor} text-[10px] font-semibold uppercase tracking-[0.2em] block mt-0.5`}>
          Construction
        </span>
      </div>
    </div>
  );
}
