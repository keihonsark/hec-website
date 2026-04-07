import Image from "next/image";

export default function Logo({
  className = "",
  height = 40,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <div className={className}>
      <Image
        src="/images/logos/hec-logo.png"
        alt="Home Energy Construction"
        width={Math.round(height * 3.5)}
        height={height}
        className="h-auto w-auto"
        style={{ height, width: "auto" }}
      />
    </div>
  );
}
