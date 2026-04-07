import Image from "next/image";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  image?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  href = "#",
  image,
}: ServiceCardProps) {
  return (
    <a
      href={href}
      className="card-lift block bg-white border border-gray-100 rounded-2xl overflow-hidden group"
    >
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 to-transparent" />
        </div>
      )}
      <div className="p-8">
        <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-navy mb-2 font-heading">
          {title}
        </h3>
        <p className="text-gray-text text-[15px] leading-relaxed mb-4">
          {description}
        </p>
        <span className="text-orange font-semibold text-sm group-hover:translate-x-1 inline-block transition-transform">
          Learn More →
        </span>
      </div>
    </a>
  );
}
